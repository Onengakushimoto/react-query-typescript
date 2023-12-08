import { act, renderHook, waitFor } from "@testing-library/react";

import { AppointmentDateMap } from "../../../../shared/types";
import { createQueryClientWrapper } from "../../../test-utils";
import { useAppointments } from "../hooks/useAppointments";

// a helper function to get the total number of appointments from an AppointmentDateMap object
const getAppointmentCount = (appointments: AppointmentDateMap): number =>
  Object.values(appointments).reduce(
    (runningCount, appointmentsOnDate) =>
      runningCount + appointmentsOnDate.length,
    0,
  );

test("filter appointments by availalibility", async () => {
  const { result } = renderHook(() => useAppointments(), {
    wrapper: createQueryClientWrapper,
  });

  // wait for the appointments to populate
  await waitFor(() =>
    expect(getAppointmentCount(result.current.appointments)).toBeGreaterThan(0),
  );

  const filteredAppointmentLength = getAppointmentCount(
    result.current.appointments,
  );

  // set to filter to all appointments
  act(() => result.current.setShowAll(true));

  // wait for the appointments to show more than when filtered
  await waitFor(() =>
    expect(getAppointmentCount(result.current.appointments)).toBeGreaterThan(
      filteredAppointmentLength,
    ),
  );
});
