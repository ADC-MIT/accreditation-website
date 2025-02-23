'use server';

import { AccreditationDetails, TableDetails } from '@/types';

import { redirect } from 'next/navigation';

import { runtimeEnv } from '@/config/env';

import { AuthenticationError, getToken, handleApiResponse } from '@/lib/api';

export async function getNAACFields({
  slug,
}: {
  slug?: string;
}): Promise<AccreditationDetails> {
  try {
    const token = await getToken();
    const response = await fetch(
      `${runtimeEnv.BACKEND_URL}/fetch/naac/${slug || ''}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    const data = handleApiResponse(response);
    return data;
  } catch (error) {
    if (error instanceof AuthenticationError && error.expired) {
      redirect('/?session_expired=true');
    }
    console.error('Error fetching tickets:', error);
    throw error;
  }
}

export async function getNBAFields({
  slug,
}: {
  slug?: string;
}): Promise<AccreditationDetails> {
  try {
    const token = await getToken();
    const response = await fetch(
      `${runtimeEnv.BACKEND_URL}/fetch/nba/${slug || ''}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    const data = handleApiResponse(response);
    return data;
  } catch (error) {
    if (error instanceof AuthenticationError && error.expired) {
      redirect('/?session_expired=true');
    }
    console.error('Error fetching tickets:', error);
    throw error;
  }
}

export async function getNIRFFields({
  slug,
}: {
  slug?: string;
}): Promise<AccreditationDetails> {
  try {
    const token = await getToken();
    const response = await fetch(
      `${runtimeEnv.BACKEND_URL}/fetch/nirf/${slug || ''}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    const data = handleApiResponse(response);
    return data;
  } catch (error) {
    if (error instanceof AuthenticationError && error.expired) {
      redirect('/?session_expired=true');
    }
    console.error('Error fetching tickets:', error);
    throw error;
  }
}

export async function getTableFields({
  slug,
}: {
  slug: string;
}): Promise<TableDetails> {
  try {
    const token = await getToken();
    const response = await fetch(`${runtimeEnv.BACKEND_URL}/tables/${slug}`, {
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

export async function getExportData({
  accreditation,
  slug,
}: {
  accreditation: string;
  slug: string;
}): Promise<TableDetails> {
  try {
    const token = await getToken();
    const response = await fetch(
      `${runtimeEnv.BACKEND_URL}/fetch/${accreditation}/${slug}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

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
