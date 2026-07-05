<?php

namespace Tests\Feature;

use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\TestCase;

class SecurityHeadersTest extends TestCase
{
  use RefreshDatabase;

  public function test_api_responses_include_security_headers(): void
  {
    $this->getJson('/api/v1/products')
      ->assertOk()
      ->assertHeader('X-Content-Type-Options', 'nosniff')
      ->assertHeader('X-Frame-Options', 'DENY')
      ->assertHeader('Referrer-Policy', 'strict-origin-when-cross-origin')
      ->assertHeader('Permissions-Policy', 'camera=(), microphone=(), geolocation=(), payment=()');
  }
}
