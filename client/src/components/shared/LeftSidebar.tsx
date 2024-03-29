import { Link } from "react-router-dom";
import { useLocation } from "react-router-dom";
import { sidebarLinks } from "../../constants";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

function LeftSidebar() {
  const navigate = useNavigate();
  const logout = () => {
    localStorage.clear();
    navigate("/login");
    toast.success("user logged out successfully.....");
  };
  const pathname = useLocation();
  return (
    <section className="custom-scrollbar leftsidebar">
      <div className="flex w-full flex-1 flex-col gap-6 px-6">
        {sidebarLinks.map((link, index) => {
          const isActive =
            (pathname.pathname === link.route && link.route.length > 1) ||
            pathname.pathname === link.route;
          return (
            <div key={index} className="text-white">
              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Link
                  to={link.route}
                  className={`leftsidebar_link ${isActive && "bg-primary-500"}`}
                >
                  <img
                    src={link.imgURL}
                    alt="sidebarlogos"
                    width={24}
                    height={24}
                  ></img>
                  <p className="max-lg:hidden text-light-1"> {link.label} </p>
                </Link>
              </motion.div>
            </div>
          );
        })}
        <div className="mt-10">
          <button onClick={logout}>
            <div className="flex cursor-pointer gap-4 p-4">
              <img
                src="/assets/logout.svg"
                alt="logout"
                width={24}
                height={24}
              ></img>
              <p className="text-light-1">Logout</p>
            </div>
          </button>
        </div>
      </div>
    </section>
  );
}
export default LeftSidebar;
