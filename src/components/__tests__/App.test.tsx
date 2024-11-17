import { render, screen } from "@testing-library/react";
import App from "../../App";
import { vi, describe, it, expect } from "vitest";
import React from "react";

vi.mock("@clerk/clerk-react", () => ({
  ClerkProvider: ({ children }: { children: React.ReactNode }) => (
    <>{children}</>
  ),
  SignedIn: ({ children }: { children: React.ReactNode }) => (
    <div data-testid="signed-in">{children}</div>
  ),
  SignedOut: ({ children }: { children: React.ReactNode }) => (
    <div data-testid="signed-out">{children}</div>
  ),
  SignIn: () => <div data-testid="sign-in">Sign In Component</div>,
  UserButton: () => <div data-testid="user-button">User Button</div>,
}));

describe("App", () => {
  it("renders both SignedIn and SignedOut states", () => {
    render(<App />);

    expect(screen.getByTestId("signed-in")).toBeInTheDocument();
    expect(screen.getByTestId("signed-out")).toBeInTheDocument();
    expect(screen.getByTestId("sign-in")).toBeInTheDocument();
  });
});
