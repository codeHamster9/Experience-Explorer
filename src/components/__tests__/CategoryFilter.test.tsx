import { render, screen, fireEvent } from "@testing-library/react";
import CategoryFilter from "../CategoryFilter";
import { describe, vi, beforeEach, it, expect } from "vitest";
import React from "react";

describe("CategoryFilter", () => {
  const mockCategories = ["Adventure", "Relaxation", "Urban"];
  const mockOnChange = vi.fn();

  beforeEach(() => {
    mockOnChange.mockClear();
  });

  it("renders all categories", () => {
    render(
      <CategoryFilter
        categories={mockCategories}
        selectedCategory=""
        onChange={mockOnChange}
      />
    );

    expect(screen.getByText("All Categories")).toBeInTheDocument();
    mockCategories.forEach((category) => {
      expect(screen.getByText(category)).toBeInTheDocument();
    });
  });

  it("shows selected category", () => {
    render(
      <CategoryFilter
        categories={mockCategories}
        selectedCategory="Adventure"
        onChange={mockOnChange}
      />
    );

    expect(screen.getByDisplayValue("Adventure")).toBeInTheDocument();
  });

  it("calls onChange when selection changes", () => {
    render(
      <CategoryFilter
        categories={mockCategories}
        selectedCategory=""
        onChange={mockOnChange}
      />
    );

    fireEvent.change(screen.getByRole("combobox"), {
      target: { value: "Adventure" },
    });

    expect(mockOnChange).toHaveBeenCalledWith("Adventure");
  });

  it("renders filter icon", () => {
    render(
      <CategoryFilter
        categories={mockCategories}
        selectedCategory=""
        onChange={mockOnChange}
      />
    );
    expect(screen.getByTestId("filter")).toBeInTheDocument();
  });
});
