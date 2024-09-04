import { render, screen } from "@testing-library/vue";
import { describe, it, expect } from "vitest";
import TestView from "../../views/TestView.vue";

describe("TestView", () => {
  const viewText = "test Text";
  it("render correctly text", async () => {
    const viewId = "viewId";
    render(TestView, {
      props: { element: "span", id: viewId },
      slots: { default: viewText },
    });

    const view = await screen.findByText(viewText);

    expect(view.id).toBe(viewId);
    expect(view.innerHTML).toBe(viewText);
    expect(view.nodeName).toBe("SPAN");
  });
});
