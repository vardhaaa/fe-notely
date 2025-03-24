import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { noteFormSchema, NoteFormType } from "../../lib/schema";
import { UpdateNoteParams } from "../../services/note/types";
import { useUpdateNote } from "../../services/note/mutations/use-edit-note";
import { InputField } from "../ui/InputField";
import Button from "../ui/Button";

interface EditNoteFormProps {
  initialData: {
    id: string;
    title: string;
    content: string;
  };
  onSuccess: () => void;
}

export default function EditNoteForm({ initialData, onSuccess }: EditNoteFormProps) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<NoteFormType>({
    resolver: zodResolver(noteFormSchema),
    defaultValues: {
      title: initialData.title,
      content: initialData.content
    }
  });

  const { mutate, isPending } = useUpdateNote();

  const onSubmit = (formData: NoteFormType) => {
    const updateData: UpdateNoteParams = {
      id: initialData.id,
      ...formData
    };
    mutate(updateData, {
      onSuccess: () => onSuccess()
    });
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      <InputField<NoteFormType>
        label="Title"
        name="title"
        register={register}
        errors={errors}
        className="border-black p-2"
      />
      <InputField<NoteFormType>
        label="Content"
        name="content"
        register={register}
        errors={errors}
        textArea
        rows={4}
        className="border-black p-2"
      />
      <Button 
        type="submit" 
        isLoading={isPending}
        className="w-full"
      >
        Update Note
      </Button>
    </form>
  );
}