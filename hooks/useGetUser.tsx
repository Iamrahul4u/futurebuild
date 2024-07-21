import { getUserId } from "@/app/actions/auth.action";
import React, { useEffect, useState } from "react";

const useGetUser = () => {
  const [user, setUser] = useState<string | null>(null);

  useEffect(() => {
    async function verifyUser() {
      try {
        const getUser: any = await getUserId();
        setUser(getUser.user.id);
      } catch (error) {
        console.error("Failed to fetch user", error);
      }
    }
    verifyUser();
  }, []);
  return user;
};

export default useGetUser;
