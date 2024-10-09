import { createLazyFileRoute } from "@tanstack/react-router";
import { ListUsers } from "../components/list-users";

export const Route = createLazyFileRoute("/users")({
  component: Users,
});

function Users() {
  return (
    <div className="flex flex-col gap-2">
      <div className="flex flex-col gap-2 items-center">
        <h1>User Lists</h1>
        <ListUsers />
      </div>
      <div className="flex flex-col gap-2">
        <h1>User Details</h1>
        {/* <UserDetails /> */}
      </div>
    </div>
  );
}
