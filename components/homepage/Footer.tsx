import { GithubIcon, MailIcon } from "lucide-react";

export default function Footer() {
  return (
    <div className="mt-20 flex flex-col items-center justify-center gap-4 p-4">
      <h1 className="text-2xl font-bold">End Of Page</h1>
      <p>Thank you for visiting my website</p>
      <div className="flex items-center justify-center gap-4">
        <p>Made with ❤️ by</p>
        <p>Rahul Gupta</p>
      </div>
      <div className="flex items-center justify-center gap-4">
        <p>Contact me at</p>
        <p>
          <MailIcon className="inline-block" />
          <a href="mailto:iamrahulgupta4u@gmail.com">
            iamrahulgupta4u@gmail.com
          </a>
        </p>
      </div>
    </div>
  );
}
