import {
  UseMutateFunction,
  useMutation,
  useQueryClient,
} from "@tanstack/react-query";
import { useCustomToast } from "components/app/hooks/useCustomToast";
import jsonpatch from "fast-json-patch";
import { queryKeys } from "react-query/constants";

import type { User } from "../../../../shared/types";
import { axiosInstance, getJWTHeader } from "../../../apiCallInstance";
import { useUser } from "./useUser";

// for when we need a server function
async function patchUserOnServer(
  newData: User | null,
  originalData: User | null,
): Promise<User | null> {
  if (!newData || !originalData) return null;
  // create a patch for the difference between newData and originalData
  const patch = jsonpatch.compare(originalData, newData);

  // send patched data to the server
  const { data } = await axiosInstance.patch(
    `/user/${originalData.id}`,
    { patch },
    {
      headers: getJWTHeader(originalData),
    },
  );
  return data.user;
}

// TODO: update type to UseMutateFunction type
export function usePatchUser(): UseMutateFunction<User, Error, User, unknown> {
  const { user, updateUser } = useUser();
  const toast = useCustomToast();
  const queryClient = useQueryClient();

  const { mutate: patchUser } = useMutation({
    mutationFn: (newUserData: User) => patchUserOnServer(newUserData, user),
    onSuccess: (userData: User | null) => {
      // updateUser(userData);
      toast({
        title: "User data updates successfully",
        status: "success",
      });
    },
    onMutate: async (newUserData: User | null) => {
      await queryClient.cancelQueries({ queryKey: [queryKeys.user] });
      const previousUserData: User = queryClient.getQueryData([queryKeys.user]);
      updateUser(newUserData);
      return { previousUserData };
    },
    onError: (error, newData, context) => {
      const { previousUserData } = context;
      if (previousUserData) {
        updateUser(previousUserData);
        toast({
          title: "Update failed! Restoreing previous value",
        });
      }
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: [queryKeys.user] });
    },
  });

  return patchUser;
}
