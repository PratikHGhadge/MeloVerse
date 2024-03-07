"use client";
import { sidebarLinks } from "./../constants";
import { Link } from "react-router-dom";
import { useLocation } from "react-router-dom";
function Bottombar() {
  const pathname = useLocation();
  return (
    <>
      <section className="bottombar">
        <div className="bottombar_container">
          {sidebarLinks.map((link, index) => {
            const isActive =
              (pathname.pathname === link.route && link.route.length > 1) ||
              pathname.pathname === link.route;
            return (
              <div key={index} className="text-white">
                <Link
                  to={link.route}
                  className={`bottombar_link ${isActive && "bg-primary-500"}`}
                >
                  <img
                    src={link.imgURL}
                    alt="sidebarlogos"
                    width={24}
                    height={24}
                  ></img>
                  <p className="text-subtle-medium text-light-1 max-sm:hidden">
                    {link.label}
                  </p>
                </Link>
              </div>
            );
          })}
        </div>
      </section>
    </>
  );
}
export default Bottombar;
