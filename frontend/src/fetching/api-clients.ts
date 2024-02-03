import { RegisterFormData } from "../pages/Register";
const DEV_BASE_URL = "http://localhost:7000";
const baseURL = DEV_BASE_URL;
console.log(baseURL);
export const register = async (formData: RegisterFormData) => {
  const response = await fetch(`${baseURL}/api/users/register`, {
    method: "POST",
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
