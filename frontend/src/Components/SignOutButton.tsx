import { useMutation, useQueryClient } from "react-query";
import * as apiClient from "../fetching/api-clients";
import { useAppContext } from "../contexts/AppContext";
import { useNavigate } from "react-router-dom";

const SignOutButton = () => {
  const { showToast } = useAppContext();
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  const mutation = useMutation(apiClient.signOut, {
    onSuccess: async () => {
      await queryClient.invalidateQueries("validateToken");
      navigate("/sign-in");
      showToast({ message: "Sign out Successfull", type: "SUCCESS" });
    },
    onError: (error: Error) => {
      showToast({ message: error.message, type: "ERROR" });
    },
  });

  const handleSignOut = () => {
    mutation.mutate();
  };
  return (
    <button
      onClick={handleSignOut}
      className="text-blue-600 px-3 font-bold bg-white hover:bg-gray-100"
    >
      Sign out
    </button>
  );
};

export default SignOutButton;
