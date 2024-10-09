import {
  CreateUser,
  createUserData,
  getUserData,
  getUsersData,
  updateUserData,
  UpdateUserPayload,
  User,
} from "@/data/users";
import {
  useMutation,
  UseMutationOptions,
  useQuery,
  useQueryClient,
} from "@tanstack/react-query";
import { AxiosError } from "axios";

export function useUsersQuery() {
  return useQuery({
    queryKey: ["GET /users"],
    queryFn: getUsersData,
  });
}

export function useUserQuery(id: string) {
  return useQuery({
    queryKey: ["GET /users", id],
    queryFn: () => getUserData(id),
  });
}

export function useCreateUserMutation() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (createUserPayload: CreateUser) =>
      createUserData(createUserPayload),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["GET /users"] });
    },
  });
}

export type UpdateUserMutationArgs = UseMutationOptions<
  User,
  AxiosError,
  UpdateUserPayload
>;

export function useUpdateUserMutation(args?: UpdateUserMutationArgs) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (updateUserPayload: UpdateUserPayload) =>
      updateUserData(updateUserPayload),
    onSuccess: (data, params, context) => {
      args?.onSuccess?.(data.data, params, context);
      queryClient.invalidateQueries({ queryKey: ["GET /users", params.id] });
    },
  });
}
