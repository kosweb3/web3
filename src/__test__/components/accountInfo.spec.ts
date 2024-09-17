import { render, screen, fireEvent } from "@testing-library/vue";
import "@testing-library/jest-dom";
import { expect, beforeEach, test, vi } from "vitest";
import { createTestingPinia } from "@pinia/testing";
import AccountInfo from "@/components/accountInfo.vue";

beforeEach(() => {
  Object.defineProperty(navigator, "clipboard", {
    value: {
      writeText: vi.fn().mockResolvedValue(Promise.resolve()),
    },
    writable: true,
  });
});

function renderAccountInfo(options = {}) {
  return render(AccountInfo, {
    global: {
      plugins: [
        createTestingPinia({
          initialState: {
            connectWallet: {
              account: "0x1234567890abcdef",
              balance: 1.5,
              ...options,
            },
          },
        }),
      ],
    },
  });
}

test("renders account info correctly", () => {
  renderAccountInfo();

  expect(screen.getByText("0x1234567890abcdef")).toBeInTheDocument();
  expect(screen.getByText("Balance: 1.5 ETH")).toBeInTheDocument();
});

test("copies account to clipboard and triggers notification", async () => {
  renderAccountInfo();

  const accountElement = screen.getByText("0x1234567890abcdef");
  await fireEvent.click(accountElement);

  expect(navigator.clipboard.writeText).toHaveBeenCalledWith(
    "0x1234567890abcdef"
  );
});
