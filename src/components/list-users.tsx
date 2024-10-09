import { useUsersQuery } from "../hooks/users";
import { AddUserButton } from "./add-users-button";
import { ViewUserDetailsButton } from "./view-user-button";

export function ListUsers() {
  const { data, isLoading, isFetching } = useUsersQuery();

  if (isLoading) return <div>Loading...</div>;

  return (
    <div>
      <AddUserButton />
      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>First Name</th>
            <th>Last Name</th>
            <th>Email</th>
            <th>Role</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {data?.data.records.map((user) => (
            <tr key={user.id}>
              <td>{user.id}</td>
              <td>{user.first_name}</td>
              <td>{user.last_name}</td>
              <td>{user.email}</td>
              <td>{user.role}</td>
              <td className="flex flex-col gap-2">
                <ViewUserDetailsButton id={user.id} />
              </td>
            </tr>
          ))}
          {isFetching && (
            <tr>
              <td colSpan={2}>Fetching...</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}
