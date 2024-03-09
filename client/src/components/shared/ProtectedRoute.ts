import { useQuery } from "@tanstack/react-query";
import API from "../../services/API";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

function ProtectedRoute({ children }: { children: React.ReactNode }) {
  const navigate = useNavigate();
  // get user current
  const getCurrentUser = async () => {
    const data = await API.get("/api/v1/auth/currentuser");
    return data;
  };

  const { error, data } = useQuery({
    queryKey: [],
    queryFn: getCurrentUser,
    // staleTime: 10000,
  });
  if (error) {
    toast.error("user is unauthorized");
    localStorage.clear();
    navigate("/login");
  }
  if (localStorage.getItem("token")) {
    return children;
  } else {
    navigate("/login");
  }
}


export default ProtectedRoute;
