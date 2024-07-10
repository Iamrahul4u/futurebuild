import React from "react";
import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
// { params }: { params: { jobid: string } }
export default async function Page() {
  return (
    <div className="grid grid-cols-[240px_1fr_240px] overflow-y-scroll pb-32 gap-6 w-full min-h-screen bg-muted/40 p-6">
      <div className="flex flex-col gap-4">
        <div className="sticky top-6 bg-background rounded-lg shadow-sm p-4">
          <h3 className="text-lg font-semibold">Recent Jobs</h3>
          <div className="mt-4 space-y-2">
            <Link
              href="#"
              className="flex items-center gap-3 text-sm"
              prefetch={false}
            >
              <div className="flex-1 truncate">Software Engineer</div>
              <Badge variant="outline" className="shrink-0">
                Full-time
              </Badge>
            </Link>
            <Link
              href="#"
              className="flex items-center gap-3 text-sm"
              prefetch={false}
            >
              <div className="flex-1 truncate">Product Designer</div>
              <Badge variant="outline" className="shrink-0">
                Part-time
              </Badge>
            </Link>
            <Link
              href="#"
              className="flex items-center gap-3 text-sm"
              prefetch={false}
            >
              <div className="flex-1 truncate">DevOps Engineer</div>
              <Badge variant="outline" className="shrink-0">
                Contract
              </Badge>
            </Link>
            <Link
              href="#"
              className="flex items-center gap-3 text-sm"
              prefetch={false}
            >
              <div className="flex-1 truncate">Data Analyst</div>
              <Badge variant="outline" className="shrink-0">
                Internship
              </Badge>
            </Link>
            <Link
              href="#"
              className="flex items-center gap-3 text-sm"
              prefetch={false}
            >
              <div className="flex-1 truncate">Frontend Developer</div>
              <Badge variant="outline" className="shrink-0">
                Full-time
              </Badge>
            </Link>
          </div>
        </div>
      </div>
      <div className="flex flex-col gap-6">
        <div className="bg-background rounded-lg shadow-sm p-6">
          <h1 className="text-2xl font-bold">Senior Software Engineer</h1>
          <div className="mt-2 flex items-center gap-2">
            <Badge variant="secondary">Full-time</Badge>
            <Badge variant="secondary">Remote</Badge>
            <Badge variant="secondary">$100k - $120k</Badge>
          </div>
          <div className="mt-6 prose text-muted-foreground">
            <p>
              We are seeking an experienced Senior Software Engineer to join our
              growing team. In this role, you will be responsible for designing,
              developing, and maintaining complex software systems. You will
              work closely with cross-functional teams to deliver high-quality,
              scalable, and efficient solutions.
            </p>
            <h2>Responsibilities:</h2>
            <ul>
              <li>
                Design and develop scalable, maintainable, and efficient
                software systems.
              </li>
              <li>
                Collaborate with product managers, designers, and other
                engineers to understand requirements and translate them into
                technical solutions.
              </li>
              <li>
                Write clean, well-documented, and testable code that adheres to
                best practices and coding standards.
              </li>
              <li>
                Participate in code reviews, pair programming, and knowledge
                sharing sessions to continuously improve the codebase and team's
                skills.
              </li>
              <li>
                Identify and address performance bottlenecks, security
                vulnerabilities, and technical debt.
              </li>
              <li>
                Stay up-to-date with the latest technologies, trends, and best
                practices in software engineering.
              </li>
            </ul>
            <h2>Requirements:</h2>
            <ul>
              <li>
                Bachelor's degree in Computer Science, Software Engineering, or
                a related field.
              </li>
              <li>
                7+ years of experience in software development, with a strong
                background in building scalable, high-performance applications.
              </li>
              <li>
                Proficient in at least one modern programming language (e.g.,
                JavaScript, Python, Java, C++).
              </li>
              <li>
                Extensive experience with web technologies (e.g., React,
                Angular, Vue.js, Node.js).
              </li>
              <li>
                Familiarity with agile software development methodologies and
                best practices.
              </li>
              <li>
                Excellent problem-solving, analytical, and communication skills.
              </li>
              <li>
                Ability to work independently and as part of a cross-functional
                team.
              </li>
            </ul>
            <p>
              If you're passionate about building innovative software solutions
              and want to join a dynamic and collaborative team, we'd love to
              hear from you.
            </p>
          </div>
        </div>
      </div>
      <div className="flex flex-col gap-4">
        <div className="sticky top-6 bg-background rounded-lg shadow-sm p-4">
          <h3 className="text-lg font-semibold">Job Details</h3>
          <div className="mt-4 space-y-2 text-sm">
            <div className="flex items-center justify-between">
              <span className="text-muted-foreground">Job Type:</span>
              <span>Full-time</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-muted-foreground">Location:</span>
              <span>Remote</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-muted-foreground">Salary Range:</span>
              <span>$100k - $120k</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-muted-foreground">Experience:</span>
              <span>7+ years</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-muted-foreground">Education:</span>
              <span>Bachelor's degree</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-muted-foreground">Posted:</span>
              <span>2 days ago</span>
            </div>
          </div>
          <div className="mt-4 space-y-2">
            <Button className="w-full">Apply Now</Button>
          </div>
        </div>
      </div>
    </div>
  );
}
