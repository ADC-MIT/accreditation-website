'use server';

import { redirect } from 'next/navigation';

import { FormList } from '@/types/input';

import { runtimeEnv } from '@/config/env';

import { AuthenticationError, getToken, handleApiResponse } from '@/lib/api';

export async function getForms(): Promise<FormList> {
  try {
    const token = await getToken();
    const response = await fetch(`${runtimeEnv.BACKEND_URL}/forms/`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    const data = await handleApiResponse(response);
    return data;
  } catch (error) {
    if (error instanceof AuthenticationError && error.expired) {
      redirect('/?session_expired=true');
    }
    console.error('Error fetching tickets:', error);
    throw error;
  }
}
