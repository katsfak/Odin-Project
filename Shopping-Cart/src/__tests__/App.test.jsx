import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { MemoryRouter } from "react-router-dom";
import { afterEach, describe, expect, it, vi } from "vitest";
import App from "../App.jsx";

const productsResponse = [
  {
    id: 1,
    title: "Backpack",
    price: 39.99,
    image: "https://example.com/backpack.png",
  },
];

describe("App", () => {
  afterEach(() => {
    vi.restoreAllMocks();
  });

  it("renders homepage content and navbar links", async () => {
    render(
      <MemoryRouter initialEntries={["/"]}>
        <App />
      </MemoryRouter>,
    );

    expect(
      screen.getByRole("heading", { name: /welcome to odin cart/i }),
    ).toBeInTheDocument();
    expect(screen.getByRole("link", { name: /home/i })).toBeInTheDocument();
    expect(screen.getByRole("link", { name: /shop/i })).toBeInTheDocument();
    expect(
      screen.getByRole("link", { name: /cart \(0\)/i }),
    ).toBeInTheDocument();
  });

  it("updates cart count in real time and supports cart quantity changes", async () => {
    const user = userEvent.setup();

    vi.spyOn(globalThis, "fetch").mockResolvedValue({
      ok: true,
      json: async () => productsResponse,
    });

    render(
      <MemoryRouter initialEntries={["/shop"]}>
        <App />
      </MemoryRouter>,
    );

    expect(
      await screen.findByRole("heading", { name: /shop/i }),
    ).toBeInTheDocument();
    expect(await screen.findByText("Backpack")).toBeInTheDocument();

    await user.click(
      screen.getByRole("button", {
        name: /increase quantity for backpack/i,
      }),
    );
    await user.click(
      screen.getByRole("button", {
        name: /increase quantity for backpack/i,
      }),
    );
    await user.click(screen.getByRole("button", { name: /add to cart/i }));

    expect(
      screen.getByRole("link", { name: /cart \(3\)/i }),
    ).toBeInTheDocument();

    await user.click(screen.getByRole("link", { name: /cart \(3\)/i }));

    expect(
      await screen.findByRole("heading", { name: /your cart/i }),
    ).toBeInTheDocument();
    expect(screen.getByText("Backpack")).toBeInTheDocument();

    await user.click(
      screen.getByRole("button", {
        name: /increase backpack in cart/i,
      }),
    );

    expect(
      screen.getByRole("link", { name: /cart \(4\)/i }),
    ).toBeInTheDocument();

    await user.click(
      screen.getByRole("button", {
        name: /remove/i,
      }),
    );

    await waitFor(() => {
      expect(
        screen.getByRole("link", { name: /cart \(0\)/i }),
      ).toBeInTheDocument();
      expect(screen.getByText(/your cart is empty/i)).toBeInTheDocument();
    });
  });
});
