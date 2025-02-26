"use client";

import { DashboardContent } from "@/components/page/Dashboard/DashboardContent";
import { getUserByEmail } from "@/lib/actions/users";
import { useSession } from "next-auth/react";
import { useCallback, useEffect } from "react";

export default function Dashboard() {
  const session = useSession();

  const handleUpdateAuth = useCallback(async () => {
    const user = await getUserByEmail(session.data?.user.email as string);
    session.update({ userId: user?.id, ...user });
  }, []);

  useEffect(() => {
    if (session.data?.user.email) {
      handleUpdateAuth();
    }
  }, []);

  return <DashboardContent />;
}
