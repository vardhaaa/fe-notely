import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import { useSearchParams } from "react-router-dom";
import Header from "../components/Header";
import ModalContainer from "../components/ui/ModalContainer";
import EditNoteForm from "../components/form/EditNoteForm";
import { Note } from "../services/note/types";
import {NotesResponse} from "../services/note/types" // Make sure to import NotesResponse type
import { CardNote } from "../components/CardNote";
import { Pagination } from "../components/ui/Pagination";
import { useDeleteNote } from "../services/note/mutations/use-delete-note";
import { getNotes } from "../services/note/api"; // Import getNotes function

export default function Dashboard() {
  const [searchParams, setSearchParams] = useSearchParams();
  const page = parseInt(searchParams.get("page") || "1");
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [editingNote, setEditingNote] = useState<Note | null>(null);
  
  const { 
    data: notesResponse,
    isLoading, 
    isError,
    error
  } = useQuery<NotesResponse>({ // Specify the return type as NotesResponse
    queryKey: ["notes", page],
    queryFn: () => getNotes(page), // Call getNotes function with page number
  });

  const deleteMutation = useDeleteNote();

  const handleDelete = (id: string) => {
    if (window.confirm("Are you sure you want to delete this note?")) {
      deleteMutation.mutate(id);
    }
  };

  const handleEditNote = (note: Note) => {
    setEditingNote(note);
    setIsEditModalOpen(true);
  };

  const handleEditSuccess = () => {
    setIsEditModalOpen(false);
    setEditingNote(null);
  };

  const handlePageChange = (newPage: number) => {
    setSearchParams({ page: newPage.toString() });
  };

  if (isLoading) return <div className="text-center py-8">Loading notes...</div>;
  if (isError) return <div className="text-center py-8 text-red-500">Error: {(error as Error).message}</div>;

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <main className="container mx-auto px-4 py-8">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold text-gray-800">My Notes</h1>
        </div>
        
        {notesResponse?.data?.length ? (
          <>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {notesResponse.data.map((note: Note) => ( // Explicitly type note as Note
                <CardNote 
                  key={note.id} 
                  note={note} 
                  onEdit={() => handleEditNote(note)}
                  onDelete={() => handleDelete(note.id)}
                />
              ))}
            </div>

            <div className="mt-8">
              <Pagination 
                currentPage={page}
                totalPages={notesResponse.meta?.last_page || 1}
                onPageChange={handlePageChange}
              />
            </div>
          </>
        ) : (
          <div className="text-center py-12">
            <p className="text-gray-500 text-lg">You don't have any notes yet.</p>
          </div>
        )}

        <ModalContainer
          isOpen={isEditModalOpen}
          onClose={() => setIsEditModalOpen(false)}
        >
          {editingNote && (
            <EditNoteForm 
              initialData={{
                id: editingNote.id,
                title: editingNote.title,
                content: editingNote.content
              }}
              onSuccess={handleEditSuccess}
            />
          )}
        </ModalContainer>
      </main>
    </div>
  );
}