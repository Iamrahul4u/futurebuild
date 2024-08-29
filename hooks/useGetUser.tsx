import { getUserId, signout } from "@/app/actions/auth.action";
import React, { useEffect, useState } from "react";

const useGetUser = () => {
  const [user, setUser] = useState<string>("");

  useEffect(() => {
    async function verifyUser() {
      try {
        const getUser: any = await getUserId();
        if (!getUser.user.id) {
          await signout();
          return { error: "Failed to fetch user" };
        }
        setUser(getUser?.user?.id);
      } catch (error) {
        return { error: "Failed to fetch user" };
      }
    }
    verifyUser();
  }, []);
  return user;
};

export default useGetUser;
