import { Formik, Form, Field } from "formik";
import { motion } from "framer-motion";
import CustomErrorMsg from "../components/shared/CustomErrorMsg";
import { LoginValidateYupSchema } from "./../validations/validationsSchema";
import { Link, useNavigate } from "react-router-dom";
import { useMutation } from "@tanstack/react-query";
import API from "../services/API";
import toast from "react-hot-toast";
const initialValues = { email: "", password: "" };

function Login() {
  const navigate = useNavigate();

  const mutation = useMutation({
    mutationFn: async (values: { email: string; password: string }) => {
      const data = await API.post("/api/v1/auth/login", values);
      return data;
    },
    onSuccess: async (data: any, variables, context) => {
      await localStorage.setItem("token", data?.data?.token);
      if (localStorage.getItem("token") !== "") {
        navigate("/home");
      }
      toast.success("User logged in successfully!");
    },
    onError: (error, variables, context) => {
      toast.error("something went wrong please try agin");
    },
  });

  const onSubmit = async (values: { email: string; password: string }) => {
    try {
      mutation.mutate(values);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <>
      <div className="pt-20 h-[100vh] sm:mx-auto sm:w-full mx-2  sm:max-w-md  bg-dark">
        <div className="bg-gray-50 shadow rounded-3xl px-4">
          <div className="min-h-auto py-10 bg-gray-50 rounded-3xl flex flex-col justify-center sm:px-6 ">
            <div className="sm:mx-auto sm:w-full sm:max-w-md ">
              <h2 className="mb-6  py-4  rounded-lg bg-gray-100 text-center text-gray-700 text-3xl font-bold ">
                <p className="text-heading3-bold text-black-1 max-xs:hidden text-bold">
                  Login to MELOVERSE
                </p>
              </h2>
            </div>
            <Formik
              initialValues={initialValues}
              onSubmit={onSubmit}
              validationSchema={LoginValidateYupSchema}
            >
              <Form className="space-y-6" action="#" method="POST">
                <div>
                  <label
                    htmlFor="email"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Email address
                  </label>
                  <div className="mt-1">
                    <Field
                      id="email"
                      name="email"
                      type="email"
                      autoComplete="email"
                      required
                      className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-custom-darkblue1 focus:border-custom-darkblue1 sm:text-sm"
                    />
                    <CustomErrorMsg name="email" />
                  </div>
                </div>

                <div>
                  <label
                    htmlFor="password"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Password
                  </label>
                  <div className="mt-1">
                    <Field
                      id="password"
                      name="password"
                      type="password"
                      autoComplete="current-password"
                      required
                      className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-custom-darkblue1 focus:border-custom-darkblue1 sm:text-sm"
                    />
                    <CustomErrorMsg name="password" />
                  </div>
                </div>

                <div className="flex items-center justify-between">
                  <div className="text-sm">
                    <Link
                      to="/forgot-password"
                      className="font-medium text-bg-primary-500 hover:text-custom-darkred4"
                    >
                      Forgot your password?
                    </Link>
                  </div>
                </div>

                <motion.div
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <button
                    type="submit"
                    className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white  bg-primary-500 hover:bg-custom-darkred4 "
                  >
                    Log in
                  </button>
                </motion.div>
              </Form>
            </Formik>

            <Link
              to="/"
              className="font-medium text-custom-blue hover:text-custom-darkblue1"
            >
              <p className="mt-6 text-center text-sm text-gray-600">
                Or Not have an account SignUp
              </p>
            </Link>

            <div className="mt-6">
              {/* <div className="relative">
                <div className="absolute inset-0 flex items-center">
                  <div className="border border-gray-300 w-full"></div>
                </div>
                <div className="relative flex item-center">
                  <span className="m-auto bg-white px-2 text-gray-500 text-sm">
                    Or continue with
                  </span>
                </div>
              </div>

              <div className="mt-6">
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <button className="w-full inline-flex justify-center py-2 px-4 border border-gray-300 rounded-md shadow-sm bg-white text-sm font-medium text-gray-500 hover:bg-gray-50">
                    <span className="sr-only">Sign in with Google</span>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="w-5 h-5"
                      viewBox="0 0 488 512"
                      fill="red"
                    >
                      <path d="M488 261.8C488 403.3 391.1 504 248 504 110.8 504 0 393.2 0 256S110.8 8 248 8c66.8 0 123 24.5 166.3 64.9l-67.5 64.9C258.5 52.6 94.3 116.6 94.3 256c0 86.5 69.1 156.6 153.7 156.6 98.2 0 135-70.4 140.8-106.9H248v-85.3h236.1c2.3 12.7 3.9 24.9 3.9 41.4z" />
                    </svg>
                  </button>
                </motion.div>
              </div> */}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
export default Login;
