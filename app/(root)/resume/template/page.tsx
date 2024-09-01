import { Templates } from "@/_constants/TemplateConfigurations";
import { Skeleton } from "@/components/ui/skeleton";
import Image from "next/image";
import Link from "next/link";
import { Suspense } from "react";

export default function Page() {
  return (
    <div className="flex h-screen flex-col items-center p-4">
      <div>
        <h1 className="text-2xl font-bold">Resume Template</h1>
        <div className="grid w-full grid-cols-2 justify-around gap-4">
          {Object.keys(Templates).map((template) => (
            <div key={template}>
              <Suspense fallback={<Skeleton className="h-[500px] w-[250px]" />}>
                <Image
                  src={Templates[template].image}
                  height={700}
                  width={350}
                  alt={template}
                />
              </Suspense>
              <Link href={`/resume/edit/${Templates[template].name}`}>
                <button className="mt-2 w-full rounded-md bg-blue-500 p-2 text-white">
                  Select
                </button>
              </Link>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
