import {
  UseMutateFunction,
  useMutation,
  useQueryClient,
} from "@tanstack/react-query";

import { Appointment } from "../../../../shared/types";
import { axiosInstance } from "../../../apiCallInstance";
import { queryKeys } from "../../../react-query/constants";
import { useCustomToast } from "../../app/hooks/useCustomToast";
import { useUser } from "../../user/hooks/useUser";

// for when we need functions for useMutation
async function setAppointmentUser(
  appointment: Appointment,
  userId: number | undefined,
): Promise<void> {
  if (!userId) return;
  const patchOp = appointment.userId ? "replace" : "add";
  const patchData = [{ op: patchOp, path: "/userId", value: userId }];
  await axiosInstance.patch(`/appointment/${appointment.id}`, {
    data: patchData,
  });
}

export function useReserveAppointment(): UseMutateFunction<
  void,
  unknown,
  Appointment,
  unknown
> {
  const { user } = useUser();
  const toast = useCustomToast();
  const queryClient = useQueryClient();

  const { mutate } = useMutation({
    mutationFn: (appointment: Appointment) =>
      setAppointmentUser(appointment, user?.id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [queryKeys.appointments] });
      toast({
        title: "You have reserved an appointment!!",
        status: "success",
      });
    },
  });

  return mutate;
}
