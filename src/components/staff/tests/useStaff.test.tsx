import { act, renderHook, waitFor } from "@testing-library/react";

import { createQueryClientWrapper } from "../../../test-utils";
import { useStaff } from "../hooks/useStaff";

test("filter staff", async () => {
  // the magic happens here
  const { result } = renderHook(useStaff, {
    wrapper: createQueryClientWrapper,
  });
  await waitFor(() => expect(result.current.staff.length).toEqual(4));

  act(() => result.current.setFilter("scrub"));

  await waitFor(() => expect(result.current.staff.length).toEqual(2));
});
