import { PropsWithChildren } from "react";
import { Header } from "./Header";
import { Sidebar } from "./Sidebar";

export const DashboardLayout = ({ children }: PropsWithChildren) => {
  return (
    <main className="grid grid-cols-[1fr] md:grid-cols-[250px_1fr] h-screen w-full">
      <div className="hidden md:flex col-span-1 bg-white border-r-2 border-indigo-100">
        <Sidebar />
      </div>
      <div className="grid sm:grid-rows-[100px_1fr] h-full w-full">
        <Header />
        <div className="col-span-1 h-full sm:h-[calc(100vh-100px)] overflow-hidden">
          {children}
        </div>
      </div>
    </main>
  );
};
