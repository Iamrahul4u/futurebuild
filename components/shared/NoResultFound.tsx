import Link from "next/link";
import Image from "next/image";
export default function NoResultFound() {
  return (
    <div className="flex h-full w-full flex-col items-center justify-center bg-background px-4 py-12 sm:px-6 lg:px-8">
      <div className="mx-auto flex max-w-md flex-col items-center">
        <h1 className="mt-4 text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
          No result found
        </h1>
        <p className="mt-4 text-center text-muted-foreground">
          The search you performed did not return any results. Please try a
          different search.
        </p>
        <Image
          height={250}
          width={250}
          src={"/3d-fluency-see-no-evil-monkey-removebg-preview.png"}
          alt="Not-Found"
        />
      </div>
    </div>
  );
}
