import { useForm } from "react-hook-form";
import { InputField } from "../ui/InputField";
import { noteFormSchema, NoteFormType } from "../../lib/schema";
import { zodResolver } from "@hookform/resolvers/zod";
import Button from "../ui/Button";
import { useCreateNote } from "../../services/note/mutations/use-create-note";
import Show from "../show";

const CreateNoteFom = () => {

  const {
    register, handleSubmit, formState: { errors }, reset
  } = useForm<NoteFormType>({
    resolver: zodResolver(noteFormSchema),
  });

  const { mutate, isPending, isError, error } = useCreateNote();

  const onsubmit = (formData: NoteFormType) => {
    mutate(formData, {
      onSuccess: (data) => {
        if (data.success) {
          reset();
        }
      }
    })
  }

  return (
    <form onSubmit={handleSubmit(onsubmit)}>
      <h4 className="font-semibold mb-2 text-lg">Create Note</h4>
      <div className="flex flex-col gap-2">
        <InputField
          label="Title"
          name="title"
          placeholder="Title"
          register={register}
          errors={errors}
        />
        <InputField
          label="Content"
          name="content"
          placeholder="Content"
          register={register}
          errors={errors}
        />

        <Show when={isError}>
          <p className="text-red-500 text-md font-medium">{error?.message}</p>
        </Show>

        <Button
          type="submit"
          disabled={isPending}
          isLoading={isPending}
          onProcess="Creating..."
          className="bg-yellow-200">Create</Button>
      </div>
    </form>
  );
};

export default CreateNoteFom;
