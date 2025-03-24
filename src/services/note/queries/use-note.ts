// src/services/note/queries/use-get-note.ts
import { useQuery } from '@tanstack/react-query';
import { getNoteById } from '../api';

export const useGetNote = (id: string) => {
  return useQuery({
    queryKey: ['note', id],
    queryFn: () => getNoteById(id),
    enabled: !!id,
  });
};