<?php

namespace App\Models;

use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;
use Illuminate\Contracts\Auth\MustVerifyEmail;
use Laravel\Sanctum\HasApiTokens;

class User extends Authenticatable implements MustVerifyEmail
{
  use HasApiTokens, Notifiable;

  protected $fillable = [
    'name',
    'email',
    'password',
    'phone',
    'is_active',
  ];

  protected $hidden = [
    'password',
    'remember_token',
  ];

  protected function casts(): array
  {
    return [
      'email_verified_at' => 'datetime',
      'password' => 'hashed',
      'is_active' => 'boolean',
    ];
  }

  public function isAdmin(): bool
  {
    return $this->role === 'admin';
  }

  public function isManager(): bool
  {
    return $this->role === 'manager';
  }
}
