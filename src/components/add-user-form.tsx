import { CreateUser } from "@/data/users";
import { useCreateUserMutation } from "@/hooks/users";
import { cn } from "@/lib/utils";
import { SubmitHandler, useForm } from "react-hook-form";

export function AddUserForm({ closeModal }: { closeModal: () => void }) {
  const { mutateAsync } = useCreateUserMutation();
  const { register, handleSubmit, formState } = useForm<CreateUser>();

  const onSubmit: SubmitHandler<CreateUser> = async (data) => {
    await mutateAsync(data);
    closeModal();
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
        {formState.isSubmitting ? "Adding User..." : "Add User"}
      </button>
    </form>
  );
}
