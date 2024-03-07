import React from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import Layout from "./Layout";

function UnavilablePage() {
  return (
    <Layout>
      <div>
        <div>
          <main className=" min-h-[100vh] bg-gray-100 px-6 pt-6 ">
            <div className=" shadow-lg bg-white pb-24  mx-auto rounded-lg ">
              <div className="flex justify-center">
                <img
                  className="w-[20vw] py-10 "
                  src="/assets/emoji.png"
                  alt=""
                />
              </div>
              <div className="text-center">
                <h1 className=" text-5xl font-semibold leading-normal  text-black">
                  this feature is not available currently
                </h1>
                <div className="mt-10 flex items-center justify-center gap-x-6">
                  <motion.div
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <Link
                      to="/home"
                      className="w-full bg-primary-500 border border-transparent rounded-md shadow-sm py-3 px-4 text-base font-medium text-white bg-custom-darkblue2-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-50 "
                    >
                      go back to home
                    </Link>
                  </motion.div>
                </div>
              </div>
            </div>
          </main>
        </div>
      </div>
    </Layout>
  );
}

export default UnavilablePage;
