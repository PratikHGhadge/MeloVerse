import React, { useEffect } from "react";
import { useInfiniteQuery } from "@tanstack/react-query";
import API from "../services/API";
import { useInView } from "react-intersection-observer";
import { motion } from "framer-motion";
import Spinner from "../components/shared/Spinner";

interface Post {
  _id: string;
  user: {
    _id: string;
    userName: string;
  };
  poster: string;
  title: string;
  content: string;
  likeCount: number;
  commentCount: number;
  edited: boolean;
  createdAt: string;
  updatedAt: string;
  __v: number;
}

const Posts: React.FC = () => {
  const { ref, inView } = useInView();
  const fetchPosts = async ({ pageParam }: { pageParam: number }) => {
    const data = await API.get(`/api/v1/post/get-posts?page=${pageParam}`);
    return data.data;
  };
  const {
    data,
    status,
    error,
    fetchNextPage,
    isFetchingNextPage,
    hasNextPage,
  } = useInfiniteQuery({
    queryKey: ["posts"],
    queryFn: fetchPosts,
    initialPageParam: 1,
    getNextPageParam: (lastPage, allPages) => {
      const nextPage = lastPage.length ? allPages.length + 1 : undefined;
      return nextPage;
    },
  });

  useEffect(() => {
    if (inView && hasNextPage) {
      console.log("Fire!");
      fetchNextPage();
    }
  }, [inView, hasNextPage, fetchNextPage]);

  if (status === "pending") {
    return <Spinner></Spinner>;
  }

  if (status === "error") {
    return <p>Error: {error.message}</p>;
  }

  return (
    <>
      <div>
        <div className="container mx-auto px-4 py-8">
          <h2 className="text-3xl text-white font-bold mb-4">Posts</h2>
          {/* {console.log(data.pages) as any} */}
          {data.pages.map((posts: Post[]) =>
            posts.map((post: Post) => (
              <motion.div
                key={post._id}
                className="hover:bg-gray-700 bg-gray-900 rounded-lg p-4 mb-4 shadow-md "
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
              >
                <div
                  key={post._id}
                  className="hover:bg-gray-700 bg-gray-900 rounded-lg p-4 mb-4 shadow-md " // Post container styling
                >
                  <div className="flex items-center mb-2">
                    <img
                      className="w-10 h-10 rounded-full mr-2"
                      // Assuming you have a default avatar image path
                      src="/assets/userpng.png"
                      alt="User avatar"
                    />
                    <p className="text-white text-lg font-semibold">
                      {post?.user?.userName}
                    </p>
                  </div>
                  <h3 className="text-white text-xl font-bold mb-2">
                    {post.title}
                  </h3>
                  <p className="text-white text-base">{post.content}</p>
                  {/* Image display */}
                  <img
                    src={`${import.meta.env.VITE_BASE_URL}/${post.poster}`}
                    onError={(event) => {}}
                    className="w-full rounded-lg mt-4"
                  />
                </div>
              </motion.div>
            ))
          )}
          <div ref={ref}>{isFetchingNextPage && <Spinner></Spinner>}</div>
        </div>
      </div>
    </>
  );
};

export default Posts;
