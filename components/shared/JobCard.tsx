import React from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../../components/ui/card";
import Image from "next/image";
import { Badge } from "../ui/badge";
import { Clock } from "lucide-react";
import Link from "next/link";
import { JobPost } from "@prisma/client";
import { JobPostOptionalDefaults } from "@/prisma/generated/zod";
import { formatNumber, formatTimeAgo } from "@/_utils/utils";
import { JobPostSelectType } from "@/types/zodValidations";
import AvatarComponent from "./AvatarComponent";

const JobCard = ({ details }: { details: JobPostSelectType }) => {
  const applicants = details?._count?.applicants;
  return (
    <Link href={`jobs/${details.id}`}>
      <Card className="cursor-pointer -space-y-3 border-[1px] border-solid border-black p-0 transition-all duration-300 hover:translate-x-[-4] hover:translate-y-[-4px] hover:rounded-md hover:shadow-[4px_4px_0px_black] active:translate-x-[0px] active:translate-y-[0px] dark:hover:shadow-[4px_4px_0px_gray]">
        <CardHeader className="flex flex-row items-center gap-4">
          <AvatarComponent url={details.postedBy?.media[0].url} />
          <div className="flex flex-col flex-wrap">
            <CardTitle className="line-clamp-1 text-base font-bold tracking-wide text-black dark:text-white">
              {details.jobTitle}
            </CardTitle>
            <div className="flex flex-row gap-2">
              <CardDescription className="flex flex-row text-xs">
                {details.organisationName}
              </CardDescription>
              <CardDescription className="line-clamp-1 flex flex-row text-xs">
                &#x2022;{" "}
                {applicants === 0
                  ? `${applicants} Applicants`
                  : applicants && applicants > 1
                    ? `${applicants} Applicant`
                    : `${applicants} Applicants`}
              </CardDescription>
            </div>
          </div>
        </CardHeader>
        <CardContent className="flex gap-2">
          <Badge className="rounded-md bg-purple-200 p-0 px-1 py-1 text-[12px] font-bold text-purple-900 transition-colors duration-300 ease-in-out hover:bg-white hover:outline">
            {details.whoCanApply}
          </Badge>
          <Badge className="rounded-md bg-green-200 p-0 px-1 py-1 text-[12px] font-bold text-green-900 transition-colors duration-300 ease-in-out hover:bg-white hover:outline">
            {details.modeOfWork}
          </Badge>
          <Badge className="rounded-md bg-orange-200 p-0 px-1 py-1 text-[12px] font-bold text-orange-600 transition-colors duration-300 ease-in-out hover:bg-white hover:outline">
            {details.jobType.replace("_", " ")}
          </Badge>
        </CardContent>
        <CardContent>
          <CardDescription className="line-clamp-5 font-semibold">
            {details.jobDescription}
          </CardDescription>
          <hr className="mx-auto w-52" />
        </CardContent>
        <CardFooter className="flex justify-between pb-0 text-xs">
          <p className="text-sm">
            <span>
              &#8377;{formatNumber(details.minSalary ?? 0)}-
              {formatNumber(details.maxSalary)}&nbsp;
            </span>
          </p>
          <CardDescription className="flex flex-row items-center gap-1 text-xs">
            <Clock size={12} />
            Posted {formatTimeAgo(details?.postedAt?.toISOString())}
          </CardDescription>
        </CardFooter>
      </Card>
    </Link>
  );
};

export default JobCard;
