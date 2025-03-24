import { useMutation, useQueryClient } from '@tanstack/react-query';
import { deleteNote } from '../api';

export const useDeleteNote = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: deleteNote,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['notes'] });
      // Anda bisa menggunakan console.log atau alternatif lain
      console.log('Note deleted successfully');
    },
    onError: (error: Error) => {
      console.error('Error deleting note:', error.message);
    },
  });
};