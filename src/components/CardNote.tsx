import { Note } from "../services/note/types";
import  Button  from "../components/ui/Button";

interface CardNoteProps {
  note: Note;
  onEdit: () => void;
  onDelete: () => void;
}

export function CardNote({ note, onEdit, onDelete }: CardNoteProps) {
  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300 h-full flex flex-col">
      <div className="p-6 flex-grow">
        <h3 className="text-xl font-semibold text-gray-800 mb-2">{note.title}</h3>
        <p className="text-gray-600 mb-4 line-clamp-3">{note.content}</p>
      </div>
      <div className="p-4 border-t border-gray-100">
        <div className="flex justify-between items-center">
          <span className="text-sm text-gray-500">
            {new Date(note.createdAt).toLocaleDateString()}
          </span>
          <div className="flex space-x-2">
            <Button 
              variant="outline" 
              size="sm" 
              onClick={onEdit}
              className="text-blue-600 hover:bg-blue-50"
            >
              Edit
            </Button>
            <Button 
              variant="outline" 
              size="sm" 
              onClick={onDelete}
              className="text-red-600 hover:bg-red-50"
            >
              Delete
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}