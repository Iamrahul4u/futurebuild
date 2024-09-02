import Link from "next/link";
import { Button } from "../ui/button";
import JobCardHome from "./JobCardHome";
import ElegantButton from "./ELegantButton";

export default function FeaturesSection() {
  return (
    <div className="container mt-24 flex h-full w-full flex-col items-center justify-center gap-4">
      <h2 className="font-mono mt-2 text-balance text-4xl font-bold tracking-tight sm:text-7xl">
        Featured Jobs
      </h2>
      <p className="text-2xl font-medium leading-6 tracking-wide text-primary/70">
        Find your dream job with us
      </p>
      <div className="flex h-full flex-col items-center justify-between gap-4 sm:justify-center md:flex-row">
        <JobCardHome
          title="Streamlit Developer"
          company="Netflix"
          location="Remote"
          salary="$200,000"
          companyLogo="/homepage/netflix.svg"
        />
        <JobCardHome
          title="Full Stack Developer"
          company="Google"
          location="On-site"
          salary="$150,000"
          companyLogo="/homepage/google.svg"
        />
        <JobCardHome
          title="Software Engineer"
          company="Myntra"
          location="Hybrid"
          salary="$70,000"
          companyLogo="/homepage/myntra.svg"
        />
        <JobCardHome
          title="Marketing Manager"
          company="Amazon"
          location="On-site"
          salary="$120,000"
          companyLogo="/homepage/amazon.svg"
        />
      </div>
      <div className="flex items-center justify-center">
        <ElegantButton text="View More Jobs" link="/jobs" />
      </div>
    </div>
  );
}
