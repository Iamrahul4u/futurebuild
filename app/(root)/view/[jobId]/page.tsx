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
import prisma from "../../../../prisma/index";
import Link from "next/link";
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
            take: 1,
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
            </TableRow>
          </TableHeader>
          <TableBody>
            {res.map((applicant) => (
              <TableRow key={applicant.id}>
                <TableCell>{applicant.user.firstName}</TableCell>
                <TableCell>{applicant.user.email}</TableCell>
                <TableCell>
                  <Link href={applicant.user.media[0].url} target="_blank">
                    <Button variant="link" className="underline">
                      View Resume
                    </Button>
                  </Link>
                </TableCell>
                <TableCell>
                  <Badge variant="outline">Pending</Badge>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
}
