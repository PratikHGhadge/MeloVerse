import { Link } from "react-router-dom";
import { Formik, Form, Field } from "formik";
import { motion } from "framer-motion";
import CustomErrorMsg from "./../components/shared/CustomErrorMsg";
import { emailValidateYupSchema } from "./../validations/validationsSchema";
import { useMutation } from "@tanstack/react-query";
import API from "../services/API";
import toast from "react-hot-toast";
const initialValues = { email: "" };

function ForgotPassword() {
  const mutation = useMutation({
    mutationFn: async (values: { email: string }) => {
      console.log(values);
      const data = await API.post("/api/v1/auth/forgot-password", values);
      return data;
    },
    onSuccess: async (data: any, variables, context) => {},
    onError: (error, variables, context) => {
      toast.error("something went wrong");
    },
  });
  const onSubmit = async (values: { email: string }) => {
    try {
      mutation.mutate(values);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <>
      <div className="mt-20 sm:mx-auto sm:w-full sm:max-w-md">
        <div className="bg-white shadow sm:rounded-lg ">
          <div className="min-h-auto py-10 bg-gray-50 flex flex-col justify-center sm:px-6">
            <div className="sm:mx-auto sm:w-full sm:max-w-md ">
              <h2 className="mb-6 text-center text-3xl font-extrabold text-gray-700">
                Send your email address
              </h2>
            </div>
            <Formik
              initialValues={initialValues}
              onSubmit={onSubmit}
              validationSchema={emailValidateYupSchema}
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

                <motion.div
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <button
                    type="submit"
                    className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white  bg-primary-500"
                  >
                    send email
                  </button>
                </motion.div>
              </Form>
            </Formik>

            <Link
              to="/login"
              className="font-medium text-custom-blue hover:text-custom-darkblue1"
            >
              <p className="mt-6 text-center text-sm text-gray-600">
                Go back to login page
              </p>
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}
export default ForgotPassword;
