<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Illuminate\Validation\ValidationException;
use App\Models\User;

class AuthController extends Controller
{
  private function getAbilitiesForRole(string $role): array
  {
    return match ($role) {
      'admin' => [
        'products:manage', 'orders:manage', 'customers:manage',
        'inventory:manage', 'categories:manage', 'reviews:manage',
        'settings:manage', 'analytics:view',
      ],
      'manager' => [
        'products:manage', 'orders:manage', 'customers:manage',
        'inventory:manage', 'categories:manage', 'reviews:manage',
        'analytics:view',
      ],
      default => [],
    };
  }

  public function login(Request $request)
  {
    $validated = $request->validate([
      'email' => 'required|email',
      'password' => 'required',
      'device_name' => 'nullable|string|max:255',
    ]);

    $user = User::where('email', $validated['email'])->first();

    // Check user existence and active status BEFORE password hashing to prevent timing attacks
    if (!$user || !$user->is_active) {
      throw ValidationException::withMessages([
        'email' => ['Invalid credentials provided.'],
      ]);
    }

    if (!Hash::check($validated['password'], $user->password)) {
      throw ValidationException::withMessages([
        'email' => ['Invalid credentials provided.'],
      ]);
    }

    $abilities = $this->getAbilitiesForRole($user->role);
    $token = $user->createToken($request->device_name ?? 'api-token', $abilities)->plainTextToken;

    return response()->json([
      'user' => $user,
      'token' => $token,
      'token_type' => 'Bearer',
    ]);
  }

  public function logout(Request $request)
  {
    $request->user()->currentAccessToken()?->delete();
    return response()->json(null, 204);
  }

  public function user(Request $request)
  {
    return response()->json($request->user());
  }

  public function refresh(Request $request)
  {
    $user = $request->user();
    $abilities = $this->getAbilitiesForRole($user->role);
    $user->currentAccessToken()?->delete();
    $token = $user->createToken('api-token', $abilities)->plainTextToken;
    return response()->json(['token' => $token, 'token_type' => 'Bearer']);
  }

  public function changePassword(Request $request)
  {
    $request->validate([
      'current_password' => 'required|string',
      'password' => ['required', 'string', 'min:8', 'confirmed'],
    ]);

    $user = $request->user();

    if (!Hash::check($request->current_password, $user->password)) {
      return response()->json(['message' => 'Current password is incorrect.'], 422);
    }

    $user->password = $request->password;
    $user->save();

    // Revoke all existing tokens to log out all devices
    $user->tokens()->delete();

    return response()->json(['message' => 'Password changed successfully. All sessions have been terminated.'], 200);
  }
}
