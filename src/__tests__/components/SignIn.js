import React from "react";
import { render, fireEvent, waitFor } from "@testing-library/react-native";

const mockSignIn = jest.fn();
const mockNavigate = jest.fn();

jest.mock("../../hooks/useSignIn", () => () => [mockSignIn, {}]);
jest.mock("react-router-native", () => ({
  useNavigate: () => mockNavigate,
}));

import SignIn from "../../components/SignIn";

describe("SignIn", () => {
  it("calls signIn with username/password and navigates on success", async () => {
    mockSignIn.mockResolvedValue({ accessToken: "token" });

    const { getByPlaceholderText, getByText } = render(<SignIn />);

    fireEvent.changeText(getByPlaceholderText("Username"), "kalle");
    fireEvent.changeText(getByPlaceholderText("Password"), "password");
    fireEvent.press(getByText("Sign in"));

    await waitFor(() =>
      expect(mockSignIn).toHaveBeenCalledWith({
        username: "kalle",
        password: "password",
      })
    );

    expect(mockNavigate).toHaveBeenCalledWith("/", { replace: true });
  });
});
