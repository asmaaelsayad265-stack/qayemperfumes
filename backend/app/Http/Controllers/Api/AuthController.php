<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Validation\ValidationException;

class AuthController extends Controller
{
  private function getAbilitiesForRole(string $role): array
  {
    return match ($role) {
      'admin' => [
        'products:manage',
        'orders:manage',
        'customers:manage',
        'inventory:manage',
        'categories:manage',
        'reviews:manage',
        'settings:manage',
        'analytics:view',
      ],
      'manager' => [
        'products:manage',
        'orders:manage',
        'customers:manage',
        'inventory:manage',
        'categories:manage',
        'reviews:manage',
        'analytics:view',
      ],
      default => [],
    };
  }

  public function login(Request $request)
  {
    $request->validate([
      'email' => 'required|email',
      'password' => 'required',
      'device_name' => 'nullable|string|max:255',
    ]);

    if (!Auth::attempt($request->only('email', 'password'))) {
      throw ValidationException::withMessages([
        'email' => ['Invalid credentials provided.'],
      ]);
    }

    $user = Auth::user();
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
    $request->user()->currentAccessToken()->delete();

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
    $user->currentAccessToken()->delete();
    $token = $user->createToken('api-token', $abilities)->plainTextToken;

    return response()->json([
      'token' => $token,
      'token_type' => 'Bearer',
    ]);
  }
}