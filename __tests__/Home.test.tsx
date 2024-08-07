/**
 * @jest-environment jsdom
 */
import { render, screen } from "@testing-library/react";

it("renders homepage ", () => {
    render(<h1>Welcome to <a href="https://nextjs.org">Next.js!</a></h1>);
    const heading = screen.getByRole("heading", {name: /welcome to next\.js!/i,});
    expect(heading).toBeInTheDocument();
});
