import { useState } from "react";
import { Formik, Form, Field } from "formik";
import { motion } from "framer-motion";
import { Link, useNavigate } from "react-router-dom";
import { useMutation, useQuery } from "@tanstack/react-query";
import { postValidationSchema } from "../validations/validationsSchema";
import API from "../services/API";
import toast from "react-hot-toast";
import Layout from "../components/Layout";
import CustomErrorMsg from "../components/shared/CustomErrorMsg";
interface Post {
  title: string;
  content: string;
}

const initialValues = {
  title: "",
  content: "",
};

function CreatePost() {
  const [poster, setPoster] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const navigate = useNavigate();
  const getCurrentUser = async () => {
    const data = await API.get("/api/v1/auth/currentuser");
    return data.data;
  };

  const { data } = useQuery({
    queryKey: [],
    queryFn: getCurrentUser,
    // staleTime: 10000,
  });

  const mutation = useMutation({
    mutationFn: async (values: any) => {
      const data = API.post("/api/v1/post/create-post", values, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      return data;
    },
    onSuccess: () => {
      toast.success("Post created successfully!");
      navigate("/home");
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });

  const handleImageChange = (event: any) => {
    const file = event.target.files[0];
    setPoster(file);
    setImagePreview(URL.createObjectURL(file) as string | null);
  };

  const onSubmitPost = async (values: Post) => {
    try {
      const formData = new FormData();
      formData.append("poster", poster!!);
      formData.append("title", values.title);
      formData.append("content", values.content);
      console.log(JSON.stringify(data));
      formData.append("user", data.user.id);
      await mutation.mutateAsync(formData);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <Layout>
      <p className="mb-8 ml-2 text-bold font-bold text-heading3-bold text-light-1 max-xs:hidden text-bold">
        Create Post
      </p>
      {/* {console.log(data) as any} */}
      <div>
        <Formik
          initialValues={initialValues}
          onSubmit={onSubmitPost}
          validationSchema={postValidationSchema}
        >
          <Form className="space-y-6 bg-gray-700 hover:bg-gray-900 p-8 rounded-lg text-white">
            {/* Title Field */}
            <div>
              <label htmlFor="title" className="block text-sm font-medium ">
                Title
              </label>
              <div className="mt-1 ">
                <Field
                  id="title"
                  name="title"
                  type="text"
                  required
                  className="appearance-none bg-slate-700 block w-full  px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-custom-darkblue1 focus:border-custom-darkblue1 sm:text-sm"
                />
                <CustomErrorMsg name={"title"} />
              </div>
            </div>

            {/* Content Field */}
            <div>
              <label htmlFor="content" className="block text-sm font-medium ">
                Content
              </label>
              <div className="mt-1">
                <Field
                  id="content"
                  name="content"
                  type="text"
                  as="textarea"
                  rows={5}
                  required
                  className="appearance-none block w-full bg-slate-700 px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-custom-darkblue1 focus:border-custom-darkblue1 sm:text-sm"
                />
                <CustomErrorMsg name={"content"} />
              </div>
            </div>

            {/* File Upload Field (if needed) */}
            <div>
              <label htmlFor="poster" className="block text-sm font-medium ">
                Poster (Image)
              </label>
              <div className="mt-1">
                <input
                  id="poster"
                  name="poster"
                  type="file"
                  onChange={handleImageChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-custom-darkblue1 focus:border-custom-darkblue1 sm:text-sm"
                />
                <CustomErrorMsg name={"poster"} />
              </div>
              {imagePreview && (
                <img
                  src={imagePreview}
                  alt="Post preview"
                  className="w-full mt-4"
                />
              )}
            </div>

            {/* Submit Button */}
            <div className="flex items-center justify-between">
              <div className="text-sm">
                <Link
                  to={"/home"}
                  className="font-medium text-bg-primary-500 hover:text-custom-darkred4"
                >
                  Back to Home
                </Link>
              </div>

              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <button
                  type="submit"
                  className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-gradient-to-r bg-primary-500 hover:bg-custom-darkred41"
                >
                  Create Post
                </button>
              </motion.div>
            </div>
          </Form>
        </Formik>
      </div>
    </Layout>
  );
}

export default CreatePost;
