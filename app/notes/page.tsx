import {
  QueryClient,
  HydrationBoundary,
  dehydrate,
} from '@tanstack/react-query';

import { connection } from 'next/server';

import { fetchNotes } from '@/lib/api';

import NotesClient from './Notes.client';

export default async function Notes() {
  await connection();

  const queryClient = new QueryClient();

  await queryClient.prefetchQuery({
    queryKey: ['notes', 1, ''],
    queryFn: () =>
      fetchNotes({
        page: 1,
        perPage: 12,
        search: '',
      }),
  });

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <NotesClient />
    </HydrationBoundary>
  );
}
