import { Link } from "react-router-dom";

function Topbar() {
  return (
    <nav className="topbar">
      <Link
        to="/home"
        className="flex items-center gap-4 border border-white px-4 rounded-lg"
      >
        {/* <img src={"/assets/logo.svg"} alt="logo" width={28} height={28}></img> */}
        <p className="text-heading3-bold text-light-1 max-xs:hidden text-bold">
          MELOVERSE
        </p>
      </Link>
      <div className="flex items-center gap-1">
        <div className="block md:hidden text-white"></div>
      </div>
    </nav>
  );
}
export default Topbar;
