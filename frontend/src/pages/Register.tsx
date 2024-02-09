import { useForm } from "react-hook-form";
import { useMutation, useQueryClient } from "react-query";
import * as apiClients from "../fetching/api-clients";
import { useAppContext } from "../contexts/AppContext";
import { useNavigate } from "react-router-dom";

export type RegisterFormData = {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  confirmPassword: string;
};
const Register = () => {
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const { showToast } = useAppContext();
  const {
    register,
    watch,
    handleSubmit,
    formState: { errors },
  } = useForm<RegisterFormData>();

  const mutation = useMutation(apiClients.register, {
    onSuccess: async () => {
      showToast({ message: "Registration Successful", type: "SUCCESS" });
      await queryClient.invalidateQueries("validateToken");
      navigate("/");
    },
    onError: (error: Error) => {
      showToast({ message: error.message, type: "ERROR" });
    },
  });

  const onSubmit = handleSubmit((data) => {
    console.log(data);
    mutation.mutate(data);
  });
  // Styles
  const inputStyles = `border rounded w-full py-1 px-2 font-normal`;
  const labelStyles = `text-gray-700 text-sm font-bold flex-1`;
  return (
    <form className="flex flex-col" onSubmit={onSubmit}>
      <h2 className="font-bold text-3xl">Create an Account</h2>
      <div className="flex flex-col md:flex-row gap-5">
        <label className={labelStyles}>
          First Name
          <input
            className={inputStyles}
            {...register("firstName", { required: "This field is required" })}
          />
          {errors.firstName && (
            <span className="text-red-500">{errors.firstName.message}</span>
          )}
        </label>
        <label className={labelStyles}>
          Last Name
          <input
            className={inputStyles}
            {...register("lastName", { required: "This field is required" })}
          />
          {errors.lastName && (
            <span className="text-red-500">{errors.lastName.message}</span>
          )}
        </label>
      </div>
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
      <label className={labelStyles}>
        Confirm Password
        <input
          type="password"
          className={inputStyles}
          {...register("confirmPassword", {
            validate: (val) => {
              if (!val) {
                return "This field is required";
              } else if (watch("password") !== val) {
                return "Your passwords doesn't match";
              }
            },
          })}
        />
        {errors.confirmPassword && (
          <span className="text-red-500">{errors.confirmPassword.message}</span>
        )}
      </label>
      <div className="w-full flex justify-between mt-3">
        <p className="text-sm">
          Already registered ? <span className="underline">Sign in here</span>
        </p>
        <button
          className="py-1  px-2 bg-blue-800 hover:bg-blue-600 text-white "
          type="submit"
        >
          Create Account
        </button>
      </div>
    </form>
  );
};

export default Register;
