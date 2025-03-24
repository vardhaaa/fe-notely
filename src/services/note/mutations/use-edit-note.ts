import { useMutation } from "@tanstack/react-query";
import { updateNote } from "../api";
import { UpdateNoteParams } from "../types";

export function useUpdateNote() {
  return useMutation({
    mutationFn: (data: UpdateNoteParams) => updateNote(data),
  });
}