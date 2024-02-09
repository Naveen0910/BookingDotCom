import { RegisterFormData } from "../pages/Register";
const DEV_BASE_URL = "http://localhost:7000";
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

export const validateToken = async () => {
  const response = await fetch(`${baseURL}/api/users/validate-token`, {
    credentials: "include",
  });
  if (!response.ok) {
    throw new Error("Token Invalid");
  }
  return response.json();
};
