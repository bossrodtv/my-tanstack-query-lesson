import { axiosInstance } from "@/utils/http";

export type User = {
  id: string;
  created_at: string;
  updated_at: string;
  deleted_at: string;
  email: string;
  first_name: string;
  last_name: string;
  role: "USER" | "ADMIN";
};

export type CreateUser = Omit<
  User,
  "id" | "created_at" | "updated_at" | "deleted_at" | "role"
>;
export type UpdateUser = Partial<CreateUser> & Pick<User, "role">;

export type ListResponse = {
  total_pages: number;
  current_page: number;
  next_page: number;
  previous_page: number;
  records: User[];
  total_records: number;
};

export async function getUsersData() {
  return await axiosInstance.get<ListResponse>("/users");
}

export async function getUserData(id: string) {
  return await axiosInstance.get<User>(`/users/${id}`);
}

export async function createUserData(createPayload: CreateUser) {
  return await axiosInstance.post<User>("/users", {
    ...createPayload,
    role: "USER",
  });
}

export type UpdateUserPayload = {
  id: string;
  payload: UpdateUser;
};

export async function updateUserData(updateUserPayload: UpdateUserPayload) {
  return await axiosInstance.put<User>(
    `/users/${updateUserPayload.id}`,
    updateUserPayload.payload
  );
}
