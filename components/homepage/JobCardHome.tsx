import Image from "next/image";

export default function JobCardHome({
  title,
  company,
  location,
  salary,
  companyLogo,
}: {
  title: string;
  company: string;
  location: string;
  salary: string;
  companyLogo: string;
}) {
  return (
    <article className="w-full max-w-xs rounded-lg bg-white p-2 text-gray-800 dark:bg-orange-200">
      <section className="rounded-t-lg bg-yellow-100 p-6 text-sm">
        <header className="flex items-center justify-between gap-4 font-bold">
          <span>{salary}</span>
          <div className="text-gray-800">
            <svg
              height="20"
              width="20"
              stroke="currentColor"
              stroke-width="1.5"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M17.593 3.322c1.1.128 1.907 1.077 1.907 2.185V21L12 17.25 4.5 21V5.507c0-1.108.806-2.057 1.907-2.185a48.507 48.507 0 0111.186 0z"
                stroke-linejoin="round"
                stroke-linecap="round"
              ></path>
            </svg>
          </div>
        </header>
        <p className="my-8 max-w-sm text-wrap pr-8 text-2xl font-semibold">
          {title}
        </p>
      </section>

      <footer className="flex flex-col gap-4 p-3 text-sm font-bold dark:bg-black dark:text-white md:flex-row md:items-center md:justify-between">
        <div className="flex items-center gap-3">
          <div className="flex-shrink-0">
            <Image src={companyLogo} alt={company} width={50} height={50} />
          </div>
          <div className="leading-tight">
            <p>{company}</p>
            <p>{location}</p>
          </div>
        </div>
      </footer>
    </article>
  );
}
