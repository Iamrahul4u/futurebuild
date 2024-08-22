import React from "react";
import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "@/components/ui/card";

import { Button } from "@/components/ui/button";
import {
  Table,
  TableHeader,
  TableRow,
  TableHead,
  TableBody,
  TableCell,
} from "@/components/ui/table";
import Link from "next/link";
import SelectOptions from "@/components/shared/SelectOptions";
import {
  MessageCircleIcon,
  MessageSquareDotIcon,
  MessageSquareIcon,
  MessagesSquareIcon,
} from "lucide-react";
import prisma from "@/prisma";
export default async function Page({ params }: { params: { jobId: string } }) {
  const res = await prisma.applicant.findMany({
    where: {
      jobId: params.jobId,
    },
    include: {
      user: {
        select: {
          email: true,
          firstName: true,
          media: {
            where: {
              mediaName: "Resume",
            },
            select: {
              url: true,
            },
          },
        },
      },
    },
  });
  return (
    <Card className="mt-8">
      <CardHeader>
        <CardTitle>Applicants</CardTitle>
        <CardDescription>
          View the list of applicants for this job posting.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Name</TableHead>
              <TableHead>Email</TableHead>
              <TableHead>Resume</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Chat</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {res.map((applicant: any) => (
              <TableRow key={applicant.id}>
                <TableCell>{applicant.user.firstName}</TableCell>
                <TableCell>{applicant.user.email}</TableCell>
                <TableCell>
                  <Button variant="link" className="underline">
                    <Link
                      href={applicant.user.media[0]?.url ?? "#"}
                      target="_blank"
                    >
                      {applicant.user.media[0]?.url
                        ? "View Resume"
                        : "No Resume Uploaded"}
                    </Link>
                  </Button>
                </TableCell>
                <TableCell>
                  <SelectOptions
                    applicantId={applicant.id}
                    defaultValue={applicant.approvalStatus}
                  />
                </TableCell>
                <TableCell>
                  <Link href={`/chat/${applicant.userId}/${applicant.jobId}`}>
                    <MessagesSquareIcon />
                  </Link>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
}
