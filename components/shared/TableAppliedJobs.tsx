import React, { memo } from "react";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "../ui/table";
import Link from "next/link";
import { z } from "zod";
import {
  UserAppliedJobsWithJobDetails,
  UserAppliedJobsWithJobDetailsType,
} from "@/types/zodValidations";

const UserAppliedJobsWithJobDetailsArray = z.array(
  UserAppliedJobsWithJobDetails,
);

const TableAppliedJobs = memo(function TableAppliedJobs({
  details,
}: {
  details: z.infer<typeof UserAppliedJobsWithJobDetailsArray>;
}) {
  return (
    <Table className="relative h-full">
      <TableHeader>
        <TableRow>
          <TableHead className="">Job Title</TableHead>
          <TableHead className="text-right">Posted By</TableHead>
          <TableHead className="text-right">Details</TableHead>
          <TableHead className="text-right">Status</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody className="overflow-y-scroll">
        {details.map((detail: UserAppliedJobsWithJobDetailsType) => (
          <TableRow key={detail.jobId}>
            <TableCell className="font-medium">
              {detail.jobPost.jobTitle}
            </TableCell>
            <TableCell className="text-right">
              {detail.jobPost.organisationName}
            </TableCell>
            <TableCell className="text-right">
              <Link
                href={`/jobs/${detail.jobId}`}
                className="duration-400 no-underline transition-all ease-in-out hover:underline"
              >
                View
              </Link>
            </TableCell>
            <TableCell className="text-right">
              {detail.approvalStatus}
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
});

export default TableAppliedJobs;
