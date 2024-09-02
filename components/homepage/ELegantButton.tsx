import Link from "next/link";

export default function ElegantButton({
  text,
  link,
}: {
  text: string;
  link: string;
}) {
  return (
    <Link href={link}>
      <button className="relative overflow-hidden rounded-full border-2 border-gray-800 bg-gray-900 px-6 py-3 text-lg font-bold text-white transition-all ease-in-out hover:border-gray-500 hover:bg-gray-800">
        <span className="bg-gradient-radial hover:scale-400 absolute inset-0 scale-0 from-white/25 to-transparent transition-transform duration-500 ease-in-out"></span>
        {text}
      </button>
    </Link>
  );
}
