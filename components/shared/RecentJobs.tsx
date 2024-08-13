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
  const res = await prisma.jobPost.findMany({
    // cacheStrategy: { swr: 60, ttl: 60 },
  });

  return (
    <div className="mx-auto flex flex-col gap-4 overflow-y-scroll py-2 pr-4">
      {res.map((job) => (
        <Link key={job.id} href={`/jobs/${job.id}`}>
          <Card className="cursor-pointer -space-y-2 border-[1px] border-solid border-black p-0 transition-all duration-300 hover:translate-x-[-4] hover:translate-y-[-4px] hover:rounded-md hover:shadow-[4px_4px_0px_black] active:translate-x-[0px] active:translate-y-[0px] dark:hover:shadow-[4px_4px_0px_gray]">
            <CardHeader className="flex flex-row items-center gap-2">
              <Image
                src={
                  "https://i.pinimg.com/736x/f6/97/4e/f6974e017d3f6196c4cbe284ee3eaf4e.jpg"
                }
                height={20}
                width={20}
                alt="company logo"
                className="mb-2 h-10 w-10 rounded-full object-cover"
              />
              <div className="flex flex-col flex-wrap">
                <CardTitle className="line-clamp-1 text-base font-bold tracking-wide text-black dark:text-white">
                  {job.jobTitle}
                </CardTitle>
                <div className="flex flex-row gap-1">
                  <CardDescription className="line-clamp-1 flex w-24 flex-row text-xs">
                    {job.organisationName}
                  </CardDescription>
                  <CardDescription className="flex flex-row text-xs">
                    &#x2022; <span>Applicants</span>
                  </CardDescription>
                </div>
              </div>
            </CardHeader>
            <CardContent className="flex gap-2">
              <Badge className="rounded-md bg-purple-200 p-0 px-1 py-1 text-[10px] font-bold text-purple-900 transition-colors duration-300 ease-in-out hover:bg-white hover:outline">
                Intermediate
              </Badge>
              <Badge className="rounded-md bg-green-200 p-0 px-1 py-1 text-[10px] font-bold text-green-900 transition-colors duration-300 ease-in-out hover:bg-white hover:outline">
                Full-Time
              </Badge>
              <Badge className="rounded-md bg-orange-200 p-0 px-1 py-1 text-[10px] font-bold text-orange-600 transition-colors duration-300 ease-in-out hover:bg-white hover:outline">
                Remote
              </Badge>
            </CardContent>
            <CardContent>
              <CardDescription className="line-clamp-3 font-semibold">
                Netflix is a subscription-based streaming service that offers
                movies, TV shows, documentaries, anime, and games across various
                genres and languages.
              </CardDescription>
              <hr className="mx-auto w-52" />
            </CardContent>
            <CardFooter className="flex justify-between pb-0 text-xs">
              <p className="text-sm">
                <span>&#8377;1-2&nbsp;</span>LPA
              </p>
              <CardDescription className="flex flex-row items-center gap-1 text-xs">
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
