import { Sheet, SheetTrigger, SheetContent } from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { Input } from "@/components/ui/input";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuItem,
} from "@/components/ui/dropdown-menu";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import {
  Table,
  TableHeader,
  TableRow,
  TableHead,
  TableBody,
  TableCell,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import {
  ChartTooltipContent,
  ChartTooltip,
  ChartContainer,
} from "@/components/ui/chart";
import { Pie, PieChart, CartesianGrid, XAxis, Line, LineChart } from "recharts";
import DashboardNav from "@/components/shared/DashboardNav";
import prisma from "@/prisma";
import { redirect } from "next/navigation";
import TableList from "@/components/shared/TableList";
import { JobPost } from "@prisma/client";
import { z } from "zod";
import { UserWithJobs } from "@/types/zodValidations";
import { DialogCloseButton } from "@/components/shared/DialogCloseButton";
export default async function Page({ params }: { params: { userId: string } }) {
  const userDetails = prisma.user;
  if (!userDetails) {
    redirect("/authenticate/signin");
  }
  return (
    <div>
      <CardTitle>Settings</CardTitle>
      <div className="flex flex-col gap-2">
        <Card className="p-4">
          <CardTitle>Edit Your Profile</CardTitle>
          <Button>Edit Profile</Button>
        </Card>
        <Card className="p-4">
          <CardTitle>Delete Your Profile</CardTitle>
          <DialogCloseButton
            buttonText="Delete"
            description="Are You Sure You Want To Delete Your Account?"
            title="Delete Account"
            buttonVariant={"destructive"}
          />
        </Card>
      </div>
    </div>
  );
}
