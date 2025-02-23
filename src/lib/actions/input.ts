'use server';

import { FormDetails, FormList } from '@/types';

import { redirect } from 'next/navigation';

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

export async function getFormFields({
  slug,
}: {
  slug: string;
}): Promise<FormDetails> {
  try {
    const token = await getToken();
    const response = await fetch(`${runtimeEnv.BACKEND_URL}/forms/${slug}`, {
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
