import Topbar from "./shared/Topbar";
import Bottombar from "./shared/Bottombar";
import LeftSidebar from "./shared/LeftSidebar";
import RightSidebar from "./shared/RightSidebar";
import "../index.css";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div>
      <Topbar />
      <main className="flex flex-row">
        <LeftSidebar />
        <section className="main-container ">
          <div className="w-full   max-w-4xl">{children}</div>
        </section>
        <RightSidebar />
      </main>
      <Bottombar />
    </div>
  );
}
