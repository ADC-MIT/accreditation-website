'use server';

import { TableDetails } from '@/types';

import { redirect } from 'next/navigation';

import { runtimeEnv } from '@/config/env';

import { AuthenticationError, getToken, handleApiResponse } from '@/lib/api';

export async function getTableFields({
  slug,
}: {
  slug: string;
}): Promise<TableDetails> {
  try {
    const token = await getToken();
    slug = slug.replace(/-/g, '_');
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

export async function getTableData({
  slug,
  columns,
}: {
  slug: string;
  columns: string[];
}): Promise<TableDetails> {
  try {
    const token = await getToken();
    const columnsQuery = columns.join(',');
    const response = await fetch(
      `${runtimeEnv.BACKEND_URL}/tables/${slug}?columns=${columnsQuery}`,
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
