import { useQuery, useQueryClient } from "@tanstack/react-query";
import { AxiosResponse } from "axios";
import { useEffect } from "react";

import type { User } from "../../../../shared/types";
import { axiosInstance, getJWTHeader } from "../../../apiCallInstance";
import { queryKeys } from "../../../react-query/constants";
import {
  clearStoredUser,
  getStoredUser,
  setStoredUser,
} from "../../../user-storage";

async function getUser(
  user: User | null,
  signal: AbortSignal,
): Promise<User | null> {
  if (!user) return null;
  const { data }: AxiosResponse<{ user: User }> = await axiosInstance.get(
    `/user/${user.id}`,
    {
      headers: getJWTHeader(user),
      signal,
    },
  );
  return data.user;
}

interface UseUser {
  user: User | null;
  updateUser: (user: User) => void;
  clearUser: () => void;
}

export function useUser(): UseUser {
  const queryClient = useQueryClient();
  // TODO: call useQuery to update user data from server
  // const newUser = getStoredUser();
  // console.log("before api call");
  let { data: user } = useQuery({
    queryKey: [queryKeys.user],
    queryFn: ({ signal }) => getUser(user, signal),
    initialData: getStoredUser,
    staleTime: 0, // 10 minutes
    gcTime: 1000,
  });

  useEffect(() => {
    if (!user) {
      clearStoredUser();
    } else {
      setStoredUser(user);
    }
  }, [user]);

  // meant to be called from useAuth
  function updateUser(newUser: User): void {
    // console.log("updateUser call");
    queryClient.setQueryData([queryKeys.user], newUser);
    user = newUser;
  }

  // meant to be called from useAuth
  function clearUser() {
    // TODO: reset user to null in query cache
    queryClient.setQueryData([queryKeys.user], null);
    user = null;
    queryClient.removeQueries({
      queryKey: [queryKeys.appointments, queryKeys.user],
    });
  }

  return { user, updateUser, clearUser };
}
