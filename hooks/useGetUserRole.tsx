"use client";
import { checkUserRole } from "@/app/actions/auth.action";
import React, { useEffect, useState } from "react";

const useGetUserRole = () => {
  const [role, setRole] = useState<string | undefined>(undefined);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    async function getUserRole() {
      const res: any = await checkUserRole();
      setRole(res.role);
      setLoading(false); // Set loading to false after fetching the role
    }
    getUserRole();
  }, []); // Add an empty dependency array to run the effect only once

  return { role, loading }; // Return both role and loading state
};

export default useGetUserRole;
