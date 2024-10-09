import { useState } from "react";
import { useUserQuery } from "../hooks/users";
import { EditUserForm } from "./edit-user-form";
import { Dialog, DialogContent, DialogTrigger } from "./ui/dialog";

export function ViewUserDetailsButton({ id }: { id: string }) {
  const [open, setOpen] = useState(false);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger>
        <button>View</button>
      </DialogTrigger>
      <DialogContent>
        <ViewUserDetails id={id} />
      </DialogContent>
    </Dialog>
  );
}

export function ViewUserDetails({ id }: { id: string }) {
  const [isEditing, setIsEditing] = useState(false);
  const { data, isLoading, isFetching } = useUserQuery(id);

  if (isLoading) return <div>Loading...</div>;
  if (!data) return <div>No data</div>;
  if (isFetching) return <div>Fetching...</div>;

  return (
    <div>
      <h1>ID: {data?.data.id}</h1>
      <h1>First Name: {data?.data.first_name}</h1>
      <h1>Last Name: {data?.data.last_name}</h1>
      <h1>Email: {data?.data.email}</h1>
      <h1>Role: {data?.data.role}</h1>
      <button onClick={() => setIsEditing(true)}>Edit</button>
      {isEditing && (
        <EditUserForm user={data?.data} closeEdit={() => setIsEditing(true)} />
      )}
    </div>
  );
}
