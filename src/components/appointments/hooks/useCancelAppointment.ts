import {
  UseMutateFunction,
  useMutation,
  useQueryClient,
} from "@tanstack/react-query";

import { Appointment } from "../../../../shared/types";
import { axiosInstance } from "../../../apiCallInstance";
import { queryKeys } from "../../../react-query/constants";
import { useCustomToast } from "../../app/hooks/useCustomToast";

// for when server call is needed
async function removeAppointmentUser(appointment: Appointment): Promise<void> {
  const patchData = [{ op: "remove", path: "/userId" }];
  await axiosInstance.patch(`/appointment/${appointment.id}`, {
    data: patchData,
  });
}

// TODO: update return type
export function useCancelAppointment(): UseMutateFunction<
  void,
  unknown,
  Appointment,
  unknown
> {
  const toast = useCustomToast();
  const queryClient = useQueryClient();

  const { mutate } = useMutation({
    mutationFn: removeAppointmentUser,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [queryKeys.appointments] });
      toast({
        title: "You have cancelled the appointment!",
        status: "warning",
      });
    },
  });
  return mutate;
}
