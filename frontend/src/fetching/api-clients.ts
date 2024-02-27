import { RegisterFormData } from "../pages/Register";
import { SignInFormData } from "../pages/SignIn";
const DEV_BASE_URL = import.meta.env.VITE_DEV_BASE_URL || "";
const baseURL = DEV_BASE_URL;

export const register = async (formData: RegisterFormData) => {
  const response = await fetch(`${baseURL}/api/users/register`, {
    method: "POST",
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(formData),
  });
  const responseBody = await response.json();

  if (!response.ok) {
    throw new Error(responseBody.message);
  }
};

export const signin = async (formData: SignInFormData) => {
  const response = await fetch(`${baseURL}/api/users/login`, {
    method: "POST",
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(formData),
  });
  const responseBody = await response.json();
  if (!response.ok) {
    throw new Error(responseBody.message);
  }
  return responseBody;
};

export const validateToken = async () => {
  const response = await fetch(`${baseURL}/api/users/validate-token`, {
    credentials: "include",
  });
  if (!response.ok) {
    throw new Error("Token Invalid");
  }
  return response.json();
};

export const signOut = async () => {
  const response = await fetch(`${baseURL}/api/users/logout`, {
    credentials: "include",
    method: "POST",
  });
  if (!response.ok) {
    throw new Error("Error during sign out");
  }
};
