import { useForm } from "react-hook-form";
import { useMutation, useQueryClient } from "react-query";
import * as apiClient from "../fetching/api-clients";
import { useAppContext } from "../contexts/AppContext";
import { useNavigate } from "react-router-dom";

export type SignInFormData = {
  email: string;
  password: string;
};

const SignIn = () => {
  const { showToast } = useAppContext();
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<SignInFormData>();

  const mutation = useMutation(apiClient.signin, {
    onSuccess: async () => {
      showToast({ message: "Sign in Successful!", type: "SUCCESS" });
      await queryClient.invalidateQueries("validateToken");
      navigate("/");
    },
    onError: (error: Error) => {
      showToast({ message: error.message, type: "ERROR" });
    },
  });

  const inputStyles = `border rounded w-full py-1 px-2 font-normal`;
  const labelStyles = `text-gray-700 text-sm font-bold flex-1`;

  const onSubmit = handleSubmit((data) => {
    mutation.mutate(data);
    console.log(data);
  });

  return (
    <form className="flex flex-col gap-5" onSubmit={onSubmit}>
      <h2 className="font-bold text-3xl">Sign In</h2>
      <label className={labelStyles}>
        Email
        <input
          type="email"
          className={inputStyles}
          {...register("email", { required: "This field is required" })}
        />
        {errors.email && (
          <span className="text-red-500">{errors.email.message}</span>
        )}
      </label>
      <label className={labelStyles}>
        Password
        <input
          type="password"
          className={inputStyles}
          {...register("password", {
            required: "This field is required",
            minLength: {
              value: 6,
              message: "Password must contain at least be 6 characters",
            },
          })}
        />
        {errors.password && (
          <span className="text-red-500">{errors.password.message}</span>
        )}
      </label>
      <div className="w-full flex justify-between mt-3">
        <p className="text-sm">
          New user ? <span className="underline">Sign up here</span>
        </p>
        <button
          className="py-1  px-2 bg-blue-800 hover:bg-blue-600 text-white "
          type="submit"
        >
          Login
        </button>
      </div>
    </form>
  );
};

export default SignIn;
