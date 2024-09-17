import { render, screen } from "@testing-library/vue";
import "@testing-library/jest-dom";
import { expect, test } from "vitest";
import HomeView from "@/views/HomeView.vue";
import { createTestingPinia } from "@pinia/testing";

test("renders HomeView with AccountInfo and title", async () => {
  render(HomeView, {
    global: {
      plugins: [createTestingPinia()],
    },
  });

  const heading = screen.getByText("WEB 3 project in progress...");
  expect(heading).toBeInTheDocument();

  const accountInfo = screen.getByTestId("account-info");
  expect(accountInfo).toBeInTheDocument();
});
