import { render, screen } from "@testing-library/react";
import ItemCard from "../ItemCard";
import { Item } from "../../types";
import { describe, it, expect } from "vitest";
import React from "react";

describe("ItemCard", () => {
  const mockItem: Item = {
    id: 1,
    title: "Mountain Trek",
    category: "Adventure",
    description: "A challenging mountain hiking experience",
    imageUrl: "https://example.com/image.jpg",
  };

  it("renders item details correctly", () => {
    render(<ItemCard item={mockItem} />);

    expect(screen.getByText(mockItem.title)).toBeInTheDocument();
    expect(screen.getByText(mockItem.category)).toBeInTheDocument();
    expect(screen.getByText(mockItem.description)).toBeInTheDocument();
  });

  it("renders image with correct attributes", () => {
    render(<ItemCard item={mockItem} />);

    const image = screen.getByRole("img");
    expect(image).toHaveAttribute("src", mockItem.imageUrl);
    expect(image).toHaveAttribute("alt", mockItem.title);
  });

  it("applies hover styles to container", () => {
    render(<ItemCard item={mockItem} />);

    const container = screen.getByRole("img").closest(".group");
    expect(container).toHaveClass("hover:shadow-md");
  });
});
