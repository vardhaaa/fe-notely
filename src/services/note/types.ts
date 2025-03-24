// src/services/note/types.ts
export type NoteDTO = {
  title: string;
  content: string;
};

export type Note = {
  id: string;
  title: string;
  content: string;
  createdAt: string;
  updatedAt: string;
  userId: string;
};

export type Meta = {
  total: number;
  page: number;
  lastPage: number;  // Note: using lastPage not last_page
  hasNextPage: boolean;
  hasPrevPage: boolean;
};

export type Response<T = any> = {
  success: boolean;
  message: string;
  data?: T;
  meta?: Meta;
};

export type UpdateNoteParams = {
  id: string;
  title: string;
  content: string;
};

// Add this if you want to use NotesResponse specifically
export interface NotesResponse {
  data: Note[];
  meta: {
    total: number;
    page: number;
    last_page: number;
  };
}

