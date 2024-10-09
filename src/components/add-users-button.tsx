import { useState } from "react";
import { AddUserForm } from "./add-user-form";
import { Dialog, DialogContent, DialogTitle, DialogTrigger } from "./ui/dialog";

export function AddUserButton() {
  const [open, setOpen] = useState(false);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger>
        <button>+ Add User</button>
      </DialogTrigger>
      <DialogContent>
        <DialogTitle>Add User</DialogTitle>
        <AddUserForm closeModal={() => setOpen(false)} />
      </DialogContent>
    </Dialog>
  );
}
