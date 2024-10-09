import { UpdateUser, User } from "@/data/users";
import { useUpdateUserMutation } from "@/hooks/users";
import { cn } from "@/lib/utils";
import { SubmitHandler, useForm } from "react-hook-form";

export type EditUserFormProps = {
  user: User;
  closeEdit: () => void;
};

export function EditUserForm({ user, closeEdit }: EditUserFormProps) {
  const { id, ...currentUserData } = user;
  const { mutateAsync } = useUpdateUserMutation({
    onSuccess: () => {
      window.alert("User updated successfully");
      closeEdit();
    },
  });
  const { register, handleSubmit, formState } = useForm<UpdateUser>({
    defaultValues: currentUserData,
  });

  const onSubmit: SubmitHandler<UpdateUser> = async (data) => {
    await mutateAsync({ id, payload: data });
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-2">
      <input
        className="p-2 border border-gray-300 rounded-md"
        placeholder="Enter First Name"
        {...register("first_name")}
      />
      <input
        className="p-2 border border-gray-300 rounded-md"
        placeholder="Enter Last Name"
        {...register("last_name")}
      />
      <input
        className="p-2 border border-gray-300 rounded-md"
        placeholder="Enter Email"
        {...register("email")}
      />
      <button
        className={cn(
          "p-2 bg-blue-500 text-white",
          formState.isSubmitting && "opacity-50 cursor-not-allowed"
        )}
        type="submit"
      >
        {formState.isSubmitting ? "Updating User..." : "Update User"}
      </button>
    </form>
  );
}
