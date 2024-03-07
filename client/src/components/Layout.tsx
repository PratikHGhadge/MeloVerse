import Topbar from "./Topbar";
import Bottombar from "./Bottombar";
import LeftSidebar from "./LeftSidebar";
import RightSidebar from "./RightSidebar";
import "../index.css";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div>
      <body className="">
        <Topbar />
        <main className="flex flex-row">
          <LeftSidebar />
          <section className="main-container ">
            <div className="w-full   max-w-4xl">{children}</div>
          </section>
          <RightSidebar />
        </main>
        <Bottombar />
      </body>
    </div>
  );
}
