import { PropsWithChildren } from "react";

export const DashboardLayout = ({ children }: PropsWithChildren) => {
  return (
    <section className="bg-white w-full h-svh flex items-center justify-center">
      {children}
    </section>
  );
};
