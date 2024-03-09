import React from "react";
import { Formik, Form, Field } from "formik";
import { motion } from "framer-motion";
import CustomErrorMsg from "./components/shared/CustomErrorMsg";
import { signUpValidateYupSchema } from "./validations/validationsSchema";
import { Link, useNavigate } from "react-router-dom";
import { useMutation } from "@tanstack/react-query";
import API from "./services/API";
import toast from "react-hot-toast";
const initialValues = {
  userName: "",
  email: "",
  password: "",
  ConfirmPassword: "",
};
function App() {
  const navigate = useNavigate();

  const mutation = useMutation({
    mutationFn: (values: {
      userName: string;
      email: string;
      password: string;
      ConfirmPassword: string;
    }) => {
      return API.post("/api/v1/auth/register", values);
    },
    onSuccess: (data, variables, context) => {
      toast.success("User registered successfully!");
      navigate("/login");
    },
    onError: (error, variables, context) => {
      toast.error(error.message);
    },
  });

  const onSubmit = async (values: {
    userName: string;
    email: string;
    password: string;
    ConfirmPassword: string;
  }) => {
    if (values.password !== values.ConfirmPassword) {
      alert("Please Enter same password");
    }
    try {
      mutation.mutate(values);
    } catch (error) {
      console.error(error);
    }
  };
  return (
    <>
      <div className="pt-20 h-[100vh] sm:mx-auto sm:w-full sm:max-w-md mx-2">
        <div className="bg-white shadow rounded-3xl ">
          <div className="min-h-auto py-10 bg-gray-50 px-2 rounded-3xl flex flex-col justify-center sm:px-6 ">
            <div className="sm:mx-auto sm:w-full sm:max-w-md ">
              <h2 className="mb-6  py-4  rounded-lg bg-gray-100 text-center text-gray-700 text-3xl font-bold ">
                <p className="text-heading3-bold text-black-1 max-xs:hidden text-bold">
                  Sign up to MELOVERSE
                </p>
              </h2>
            </div>
            <Formik
              initialValues={initialValues}
              onSubmit={onSubmit}
              validationSchema={signUpValidateYupSchema}
            >
              <Form className="space-y-6" action="#" method="POST">
                <div>
                  <label
                    htmlFor="email"
                    className="block text-sm font-medium text-gray-700"
                  >
                    user name
                  </label>
                </div>
                <div className="mt-1">
                  <Field
                    id="name"
                    name="name"
                    type="string"
                    autoComplete="name"
                    required
                    className="appearance-none block w-full  px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-custom-darkblue1 focus:border-custom-darkblue1 sm:text-sm"
                  />
                  <CustomErrorMsg name={"name"} />
                </div>
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
                      className="appearance-none block w-full  px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-custom-darkblue1 focus:border-custom-darkblue1 sm:text-sm"
                    />
                    <CustomErrorMsg name={"email"} />
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
                    <CustomErrorMsg name={"password"} />
                  </div>
                </div>
                <div>
                  <label
                    htmlFor="password"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Confirm Password
                  </label>
                  <div className="mt-1">
                    <Field
                      id="ConfirmPassword"
                      name="ConfirmPassword"
                      type="password"
                      autoComplete="current-password"
                      required
                      className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-custom-darkblue1 focus:border-custom-darkblue1 sm:text-sm"
                    />
                    <CustomErrorMsg name={"ConfirmPassword"} />
                  </div>
                </div>

                <div className="flex items-center justify-between">
                  <div className="text-sm">
                    <Link
                      to={"/forgot-password"}
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
                    className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-gradient-to-r bg-primary-500 hover:bg-custom-darkred41"
                  >
                    Sign in
                  </button>
                </motion.div>
              </Form>
            </Formik>

            <p className="mt-6 text-center text-sm text-gray-600">
              Or{" "}
              <Link
                to={"/login"}
                className="font-medium text-black hover:bg-primary-500"
              >
                have an account Login
              </Link>
            </p>
            <div className="mt-6">
              {/* <div className="relative">
                  <div className="absolute inset-0 flex items-center">
                    <div className="w-full border-t border-gray-300" />
                  </div>
                  <div className="relative flex justify-center text-sm">
                    <span className="px-2 bg-white text-gray-500">
                      Or continue with
                    </span>
                  </div>
                </div> */}

              {/* <div className="mt-6 w">
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
                      fill="blueviolet"
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

export default App;
