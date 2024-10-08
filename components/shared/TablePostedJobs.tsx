import React, { memo } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../ui/table";
import Link from "next/link";

interface TablePostedJobsProps {
  details: any[];
}

const TablePostedJobs = memo(function TablePostedJobs({
  details,
}: TablePostedJobsProps) {
  return (
    <Table className="relative h-full">
      <TableHeader>
        <TableRow>
          <TableHead className="">Title</TableHead>
          <TableHead className="text-right">Applicants</TableHead>
          <TableHead className="text-right">Details</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody className="overflow-y-scroll">
        {details.map((detail: any) => (
          <TableRow key={detail.id}>
            <TableCell className="font-medium">{detail.jobTitle}</TableCell>
            <TableCell className="text-right">
              {detail._count.applicants}
            </TableCell>
            <TableCell className="text-right">
              <Link
                href={`/view/${detail.id}`}
                className="duration-400 no-underline transition-all ease-in-out hover:underline"
              >
                View
              </Link>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
});

export default TablePostedJobs;
