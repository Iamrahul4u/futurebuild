import Link from "next/link";
import { Badge } from "../ui/badge";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../../components/ui/card";
import Image from "next/image";
import { Clock } from "lucide-react";
import prisma from "@/prisma";

const RecentJobs = async () => {
  const res = await prisma.jobPost.findMany({});

  return (
    <div className="flex flex-col gap-4 overflow-y-scroll pr-4 mx-auto">
      {res.map((job) => (
        <Link key={job.id} href={`/jobs/${job.id}`}>
          <Card className="-space-y-2 cursor-pointer border-solid border-[1px] border-black transition-all duration-300 hover:translate-x-[-4] hover:translate-y-[-4px] hover:rounded-md hover:shadow-[4px_4px_0px_black] dark:hover:shadow-[4px_4px_0px_gray]  active:translate-x-[0px] active:translate-y-[0px] p-0">
            <CardHeader className="flex flex-row items-center gap-2">
              <Image
                src={
                  "https://i.pinimg.com/736x/f6/97/4e/f6974e017d3f6196c4cbe284ee3eaf4e.jpg"
                }
                height={20}
                width={20}
                alt="company logo"
                className="h-10 w-10 object-cover rounded-full mb-2 "
              />
              <div className="flex flex-col flex-wrap">
                <CardTitle className="line-clamp-1 text-base font-bold text-black dark:text-white tracking-wide">
                  {job.jobTitle}
                </CardTitle>
                <div className="flex-row flex gap-1">
                  <CardDescription className="flex text-xs flex-row line-clamp-1 w-24">
                    {job.organisationName}
                  </CardDescription>
                  <CardDescription className="flex text-xs flex-row">
                    &#x2022; <span>Applicants</span>
                  </CardDescription>
                </div>
              </div>
            </CardHeader>
            <CardContent className="flex gap-2">
              <Badge className="text-[10px] bg-purple-200 font-bold hover:bg-white hover:outline ease-in-out transition-colors duration-300 text-purple-900 p-0 px-1 py-1 rounded-md">
                Intermediate
              </Badge>
              <Badge className="text-[10px] bg-green-200 font-bold text-green-900 hover:bg-white hover:outline ease-in-out transition-colors duration-300 p-0 px-1 py-1 rounded-md">
                Full-Time
              </Badge>
              <Badge className="text-[10px] bg-orange-200 font-bold text-orange-600 hover:bg-white hover:outline ease-in-out transition-colors duration-300 p-0 px-1 py-1 rounded-md">
                Remote
              </Badge>
            </CardContent>
            <CardContent>
              <CardDescription className="line-clamp-3 font-semibold">
                Netflix is a subscription-based streaming service that offers
                movies, TV shows, documentaries, anime, and games across various
                genres and languages.
              </CardDescription>
              <hr className="w-52 mx-auto" />
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
      ))}
    </div>
  );
};

export default RecentJobs;
