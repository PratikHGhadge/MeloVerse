import React, { useState, useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import API from "../services/API";
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
  const [posts, setPosts] = useState<Post[]>([]);
  const getPosts = async () => {
    const data: any = await API.get<Post[]>("/post/get-posts");
    return data.data;
  };
  const { isLoading, error, data } = useQuery({
    queryKey: [],
    queryFn: getPosts,
    staleTime: 10000,
  });

  useEffect(() => {
    if (data) {
      setPosts(data);
    }
  }, [data]);

  if (error) return <p>Error fetching posts: {error.message}</p>;

  return (
    <>
      <div className="bg-black">
        {isLoading ? (
          <Spinner></Spinner>
        ) : (
          <div className="container mx-auto px-4 py-8">
            {" "}
            {/* Center content with padding */}
            <h2 className="text-3xl text-white font-bold mb-4">Posts</h2>
            {posts &&
              posts.map((post: Post) => (
                <div
                  key={post._id}
                  className="bg-gray-700 hover:bg-gray-900 rounded-lg p-4 mb-4 shadow-md " // Post container styling
                >
                  <div className="flex items-center mb-2">
                    <img
                      className="w-10 h-10 rounded-full mr-2"
                      // Assuming you have a default avatar image path
                      src="/assets/userpng.png"
                      alt="User avatar"
                    />
                    <p className="text-white text-lg font-semibold">
                      {post.user.userName}
                    </p>
                  </div>
                  <h3 className="text-white text-xl font-bold mb-2">
                    {post.title}
                  </h3>
                  <p className="text-white text-base">{post.content}</p>
                  {/* Image display */}
                  <img
                    src={`http://localhost:3000/${post.poster}`} // Construct image URL
                    alt={post.title} // Add appropriate alt attribute
                    onError={(event) => {
                      //   event.target.src = "/default-image.png"; // Optional: Default image on error
                    }}
                    className="w-full rounded-lg mt-4" // Image styling
                  />
                </div>
              ))}
          </div>
        )}{" "}
        {/* Set background color to black */}
      </div>
    </>
  );
};

export default Posts;
