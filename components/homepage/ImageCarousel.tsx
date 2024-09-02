import WordPullUp from "../magicui/word-pull-up";
import Image from "next/image";
export default function ImageCarousel({
  currentImage,
}: {
  currentImage: { src: string; alt: string };
}) {
  return (
    <div className="hidden flex-col items-center justify-center md:flex">
      <WordPullUp
        key={currentImage.alt}
        className="text-4xl font-bold tracking-[-0.02em] text-black dark:text-white md:text-6xl md:leading-[5rem]"
        words={currentImage.alt}
      />
      <Image
        src={currentImage.src}
        alt={currentImage.alt}
        width={500}
        height={500}
      />
    </div>
  );
}
