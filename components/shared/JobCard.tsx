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

const JobCard = ({ details }: { details: JobPost }) => {
  return (
    <Link href={`jobs/${details.id}`}>
      <Card className="-space-y-3    cursor-pointer  border-solid border-[1px] border-black dark:hover:shadow-[4px_4px_0px_gray] transition-all duration-300 hover:translate-x-[-4] hover:translate-y-[-4px] hover:rounded-md hover:shadow-[4px_4px_0px_black] active:translate-x-[0px] active:translate-y-[0px]  p-0">
        <CardHeader className="flex flex-row  gap-4  items-center  ">
          <Image
            src={
              "https://i.pinimg.com/736x/f6/97/4e/f6974e017d3f6196c4cbe284ee3eaf4e.jpg"
            }
            height={40}
            width={40}
            alt="company logo"
            className="h-12 w-12 object-cover rounded-full mb-2 "
          />
          <div className="flex flex-col flex-wrap">
            <CardTitle className=" line-clamp-1 text-base font-bold tracking-wide text-black dark:text-white">
              FullStack Developer
            </CardTitle>
            <div className="flex-row flex gap-2  ">
              <CardDescription className="flex text-xs flex-row">
                Company Name
              </CardDescription>
              <CardDescription className="flex text-xs flex-row">
                &#x2022; Applicants
              </CardDescription>
            </div>
          </div>
        </CardHeader>
        <CardContent className="flex gap-2 ">
          <Badge className="text-[12px] bg-purple-200 font-bold hover:bg-white hover:outline ease-in-out transition-colors duration-300 text-purple-900  p-0 px-1 py-1 rounded-md">
            Intermediate
          </Badge>
          <Badge className="text-[12px] bg-green-200 font-bold text-green-900 hover:bg-white hover:outline ease-in-out transition-colors duration-300 p-0 px-1 py-1 rounded-md">
            Full-Time
          </Badge>
          <Badge className="text-[12px] bg-orange-200 font-bold text-orange-600 hover:bg-white hover:outline ease-in-out transition-colors duration-300 p-0 px-1 py-1 rounded-md">
            Remote
          </Badge>
        </CardContent>
        <CardContent>
          <CardDescription className="line-clamp-3font-semibold">
            Netflix is a subscription-based streaming service that offers
            movies, TV shows, documentaries, anime, and games across various
            genres and languages.
          </CardDescription>
          <hr className="w-52 mx-auto " />
        </CardContent>
        <CardFooter className="pb-0 text-xs flex justify-between">
          <p className="text-sm">
            <span>&#8377;1-2&nbsp;</span>LPA
          </p>
          <CardDescription className="flex text-xs items-center gap-1 flex-row">
            <Clock size={12} />
            Posted 12 hours ago
          </CardDescription>
        </CardFooter>
      </Card>
    </Link>
  );
};

export default JobCard;
