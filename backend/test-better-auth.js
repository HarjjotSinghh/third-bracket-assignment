#!/usr/bin/env node

// Simple test script to verify Better Auth integration
import fetch from 'node-fetch';

const BASE_URL = 'http://localhost:3000';

async function testBetterAuthIntegration() {
  console.log('🧪 Testing Better Auth Integration...\n');

  try {
    // Test 1: Health Check
    console.log('1. Testing server health...');
    const healthResponse = await fetch(`${BASE_URL}/health`);
    const healthData = await healthResponse.json();
    console.log('✅ Health check:', healthData.message);

    // Test 2: Better Auth Health
    console.log('\n2. Testing Better Auth health...');
    const authHealthResponse = await fetch(`${BASE_URL}/api/auth/ok`);
    if (authHealthResponse.ok) {
      console.log('✅ Better Auth is running');
    } else {
      console.log('❌ Better Auth health check failed');
    }

    // Test 3: Test Registration
    console.log('\n3. Testing user registration...');
    const registrationResponse = await fetch(`${BASE_URL}/api/auth/sign-up/email`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        name: 'Test User',
        email: 'test@example.com',
        password: 'password123',
      }),
    });

    if (registrationResponse.ok) {
      const registrationData = await registrationResponse.json();
      console.log('✅ Registration successful:', registrationData);
    } else {
      const errorData = await registrationResponse.json();
      console.log('⚠️ Registration response:', errorData);
    }

    // Test 4: Test Login
    console.log('\n4. Testing user login...');
    const loginResponse = await fetch(`${BASE_URL}/api/auth/sign-in/email`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        email: 'test@example.com',
        password: 'password123',
      }),
    });

    if (loginResponse.ok) {
      const loginData = await loginResponse.json();
      console.log('✅ Login successful:', loginData);

      // Extract cookies for session testing
      const cookies = loginResponse.headers.get('set-cookie');
      if (cookies) {
        console.log('🍪 Session cookies set');

        // Test 5: Test Session
        console.log('\n5. Testing session retrieval...');
        const sessionResponse = await fetch(`${BASE_URL}/api/auth/get-session`, {
          headers: {
            'Cookie': cookies,
          },
        });

        if (sessionResponse.ok) {
          const sessionData = await sessionResponse.json();
          console.log('✅ Session retrieved:', sessionData);
        } else {
          console.log('❌ Session retrieval failed');
        }

        // Test 6: Test Custom /me endpoint
        console.log('\n6. Testing custom /me endpoint...');
        const meResponse = await fetch(`${BASE_URL}/api/me`, {
          headers: {
            'Cookie': cookies,
          },
        });

        if (meResponse.ok) {
          const meData = await meResponse.json();
          console.log('✅ /me endpoint working:', meData);
        } else {
          console.log('❌ /me endpoint failed');
        }
      }
    } else {
      const loginError = await loginResponse.json();
      console.log('❌ Login failed:', loginError);
    }

    console.log('\n🎉 Better Auth integration test completed!');

  } catch (error) {
    console.error('❌ Test failed:', error.message);
    console.log('\n💡 Make sure the server is running with: npm run dev:official');
  }
}

// Run the test
testBetterAuthIntegration();