import { getUserByEmail } from "@/lib/actions/users";
import { useSession } from "next-auth/react";
import { useCallback, useEffect } from "react";

/**
 * Custom hook to update authentication data across all screens
 * This hook fetches the latest user data from the database and updates the session
 * @returns {Object} Object containing the updateAuth function and loading state
 */
export const useAuthUpdate = () => {
  const session = useSession();

  const updateAuth = useCallback(async () => {
    if (!session.data?.user.email) return;

    try {
      const user = await getUserByEmail(session.data.user.email);
      if (user) {
        session.update({ userId: user.id, ...user });
      }
    } catch (error) {
      console.error("Error updating auth:", error);
    }
  }, [session]);

  useEffect(() => {
    if (session.status === "authenticated" && session.data?.user.email) {
      updateAuth();
    }
  }, []);

  return {
    updateAuth,
    isLoading: session.status === "loading",
    session,
  };
};
