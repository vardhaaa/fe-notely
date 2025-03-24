// src/services/note/api.ts
import axios from '../axios';
import { Note } from '../note/types';
import { NotesResponse } from '../note/types';

export type ApiResponse<T> = {
  success: boolean;
  data?: T;
  message?: string;
  meta?: {
    total: number;
    page: number;
    last_page: number;
  };
};

// Get single note by ID
export const getNoteById = async (id: string): Promise<ApiResponse<Note>> => {
  const response = await axios.get(`/notes/${id}`);
  return response.data;
};

// Get notes with pagination
export const getNotes = async (page: number): Promise<NotesResponse> => {
  const response = await axios.get<ApiResponse<Note[]>>(`/notes?page=${page}`);
  console.log("API Response:", response.data); // Debugging
  
  return {
    data: response.data.data || [], // Pastikan data tidak undefined
    meta: response.data.meta || { total: 0, page, last_page: 1 }, // Pastikan meta tidak undefined
  };
};


// Delete note
export const deleteNote = async (id: string): Promise<ApiResponse<void>> => {
  const response = await axios.delete(`/notes/${id}`);
  return response.data;
};

// Update note
export const updateNote = async (data: {
  id: string;
  title: string;
  content: string;
}): Promise<ApiResponse<Note>> => {
  const response = await axios.put(`/notes/${data.id}`, {
    title: data.title,
    content: data.content,
  });
  return response.data;
};

// Create new note
export const createNote = async (data: {
  title: string;
  content: string;
}): Promise<ApiResponse<Note>> => {
  const response = await axios.post('/notes', data);
  return response.data;
};