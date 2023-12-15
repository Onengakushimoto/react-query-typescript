import {
  fireEvent,
  // act,
  // fireEvent,
  screen,
  waitForElementToBeRemoved,
} from "@testing-library/react";
// import userEvent from "@testing-library/user-event";
import { MemoryRouter } from "react-router-dom";

import { mockUser } from "../../../mocks/mockData";
import { renderWithQueryClient } from "../../../test-utils";
import { Calendar } from "../Calendar";

// mocking useUser to mimic a logged-in user
jest.mock("../../user/hooks/useUser", () => ({
  __esModule: true,
  useUser: () => ({ user: mockUser }),
}));

test("Reserve appointment", async () => {
  // const user = userEvent.setup();
  const { unmount } = renderWithQueryClient(
    <MemoryRouter>
      <Calendar />
    </MemoryRouter>,
  );
  // find all the appointments
  const appointments = await screen.findAllByRole("button", {
    name: /\d\d? [ap]m\s+(scrub|facial|massage)/i,
  });

  // click on the first one to reserve
  fireEvent.click(appointments[0]);

  // check for the toast alert
  const alertToast = await screen.findByText(
    "You have reserved an appointment!!",
  );
  expect(alertToast).toBeInTheDocument();

  // close alert to keep state clean and wait for it to disappear
  const alertCloseButton = screen.getByRole("button", { name: "Close" });
  // alertCloseButton.click();
  fireEvent.click(alertCloseButton);

  await waitForElementToBeRemoved(alertToast);
  unmount();
});

test("Cancel appointment", async () => {
  // const user = userEvent.setup();
  const { unmount } = renderWithQueryClient(
    <MemoryRouter>
      <Calendar />
    </MemoryRouter>,
  );
  const appointments = await screen.findAllByRole("button", {
    name: /\d\d? [ap]m\s+(scrub|facial|massage)/i,
  });
  // click on the first one to reserve
  fireEvent.click(appointments[0]);
  // check for the toast alert
  const alertToast = await screen.findByText(
    "You have reserved an appointment!!",
  );
  expect(alertToast).toBeInTheDocument();
  // close alert to keep state clean and wait for it to disappear
  const alertCloseButton = screen.getByRole("button", { name: "Close" });
  // alertCloseButton.click();
  fireEvent.click(alertCloseButton);
  await waitForElementToBeRemoved(alertToast);

  const cancelButtons = await screen.findAllByRole("button", {
    name: /cancel appointment/i,
  });
  expect(cancelButtons).toHaveLength(2);
  fireEvent.click(cancelButtons[0]);
  const alertToastCancel = await screen.findByText(
    "You have cancelled the appointment!",
  );
  expect(alertToastCancel).toBeInTheDocument();

  const alertCloseButton1 = screen.getByRole("button", { name: "Close" });
  // alertCloseButton.click();
  fireEvent.click(alertCloseButton1);
  await waitForElementToBeRemoved(alertToastCancel);
  unmount();
});
