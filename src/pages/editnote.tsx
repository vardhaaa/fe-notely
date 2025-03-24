// src/pages/EditNotePage.tsx
import { useParams, Navigate } from 'react-router-dom';
import EditNoteForm from '../components/form/EditNoteForm';
import { useGetNote } from '../services/note/queries/use-note';

export default function EditNotePage() {
  const { id } = useParams<{ id: string }>();
  const { data: noteResponse, isLoading, isError } = useGetNote(id || '');

  if (!id) {
    return <Navigate to="/" replace />;
  }

  if (isLoading) return <div className="text-center py-8">Loading note...</div>;
  if (isError) return <div className="text-center py-8 text-red-500">Error loading note</div>;
  if (!noteResponse?.data) return <div className="text-center py-8">Note not found</div>;

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold mb-6">Edit Note</h1>
      <EditNoteForm 
        initialData={{
          id: noteResponse.data.id,
          title: noteResponse.data.title,
          content: noteResponse.data.content
        }}
        onSuccess={() => window.location.href = '/'} 
      />
    </div>
  );
}