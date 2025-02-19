'use server';

import { decodeJwt } from 'jose';

import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';

import type { JwtPayload } from '@/types/auth';

import { runtimeEnv } from '@/config/env';

export async function login(username: string, password: string) {
  try {
    const formData = new FormData();
    formData.append('username', username);
    formData.append('password', password);

    const response = await fetch(`${runtimeEnv.BACKEND_URL}/auth/login`, {
      method: 'POST',
      body: formData,
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.error || 'Login failed');
    }

    const tokenPayload = decodeJwt(data.token) as JwtPayload;

    // Set the token in a secure, HTTP-only cookie
    const cookieStore = await cookies();
    cookieStore.set('JWT_TOKEN', data.token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'strict',
      expires: new Date(tokenPayload.exp * 1000),
      path: '/',
    });

    return { success: true };
  } catch (error) {
    console.error('Login error:', error);
    let errorMessage = 'Login failed';
    if (error instanceof Error) {
      errorMessage = error.message;
    }
    return { success: false, error: errorMessage };
  }
}

export async function logout() {
  const cookieStore = await cookies();

  cookieStore.delete('JWT_TOKEN');
  redirect('/login');
}

export async function checkAuth() {
  const cookieStore = await cookies();
  const token = cookieStore.get('JWT_TOKEN');

  return !!token;
}
