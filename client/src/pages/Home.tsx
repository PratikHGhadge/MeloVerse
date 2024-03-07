import React from "react";
import { useMutation, useQuery } from "@tanstack/react-query";
import API from "../services/API";

import Layout from "../components/Layout";
function Home() {
   
  return (
    <div>
      <Layout>{"this is posts page"}</Layout>
    </div>
  );
}

export default Home;
