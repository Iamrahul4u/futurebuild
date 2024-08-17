"use client";

import { LinkProps } from "next/link";
import Link from "next/link";
import React from "react";
import { Role } from "@prisma/client";
import { Card, CardContent } from "@/components/ui/card";
import { assisgnRoleToUser } from "@/app/actions/user.action";

interface RoleLinkProps extends LinkProps {
  role: Role;
  userId: string;
  icon: React.ReactNode;
  label: string;
}

const RoleLink: React.FC<RoleLinkProps> = ({
  role,
  userId,
  icon,
  label,
  href,
  ...props
}) => {
  const handleClick = async () => {
    await assisgnRoleToUser({ role, userId });
  };

  return (
    <Card className="h-44 w-64 flex-col items-center justify-center">
      <Link href={href} onClick={handleClick} {...props}>
        <CardContent className="flex h-full flex-col items-center justify-center gap-2 align-middle">
          {icon}
          {label}
        </CardContent>
      </Link>
    </Card>
  );
};

export default RoleLink;
