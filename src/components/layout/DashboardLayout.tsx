import { Header } from "../Header/Header";
import { Sidebar } from "../Sidebar";

export const DashboardLayout = () => {
  return (
    <main className="grid grid-cols-[1fr] sm:grid-cols-[250px_1fr] h-screen w-full">
      <div className="hidden sm:flex col-span-1 bg-white border-r-2 border-indigo-100">
        <Sidebar />
      </div>
      <div className="grid grid-rows-[100px_1fr] h-full w-full">
        <Header />
        <div className="col-span-1"></div>
      </div>
    </main>
  );
};
