"use client";
import Link from "next/link";
import { HeroHighlight, Highlight } from "../ui/hero-highlight";
import { motion } from "framer-motion";
import { cache, memo, useEffect, useMemo, useState } from "react";
import WordPullUp from "../magicui/word-pull-up";
import Image from "next/image";

export default function HeroSection() {
  const [carouselImages, setCarouselImages] = useState(0);
  useEffect(() => {
    if (window.innerWidth > 768) {
      const interval = setInterval(() => {
        setCarouselImages((prev) => (prev + 1) % CarouselImages.length);
      }, 3000);

      return () => clearInterval(interval);
    }
  }, []);
  const currentImage = CarouselImages[carouselImages];
  return (
    <HeroHighlight className="flex w-full items-start justify-start md:h-[90vh] md:items-center md:justify-center">
      <div className="container grid h-full items-center gap-8 px-4 lg:grid-cols-2">
        <div className="mt-4 flex h-full flex-col items-start justify-items-start space-y-4 pl-4 md:items-start md:justify-center">
          <motion.h1
            initial={{
              opacity: 0,
              y: 20,
            }}
            animate={{
              opacity: 1,
              y: [20, -5, 0],
            }}
            transition={{
              duration: 0.5,
              ease: [0.4, 0.0, 0.2, 1],
            }}
            className="font-mono max-w-xl text-4xl font-bold sm:text-7xl lg:text-8xl"
          >
            <span className="mb-2 pb-2">Build Your Future With</span>{" "}
            <Highlight className="mt-6 px-2 italic text-black">
              FUTUREBUILD
            </Highlight>
          </motion.h1>
          <div>
            <p className="mt-2 text-2xl font-semibold tracking-wide text-primary/70 sm:text-3xl md:text-balance lg:text-4xl">
              Discover your dream{" "}
              <span className="font-bold text-primary underline">
                <Link href="/jobs">job</Link>
              </span>
              , sharpen your{" "}
              <span className="font-bold text-primary underline">
                <Link href="/practice">skills</Link>
              </span>
              , and build a standout{" "}
              <span className="font-bold text-primary underline">
                <Link href="/resume/template">resume</Link>
              </span>{" "}
              with our comprehensive platform,Get personalized{" "}
              <span className="font-bold text-primary underline">
                <Link href="/roadmap">Roadmaps</Link>
              </span>{" "}
              powered by our
              <span className="text-white dark:text-black">✨</span>
              <span className="font-bold text-primary underline">
                <Link href="/resume/template">AI Assistant</Link>
              </span>
              .
            </p>
          </div>
        </div>
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
      </div>
    </HeroHighlight>
  );
}

const CarouselImages = [
  {
    src: "/homepage/Job offers-bro.svg",
    alt: "Find Job Offers",
  },
  {
    src: "/homepage/practice.webp",
    alt: "Practice Questions",
  },
  {
    src: "/homepage/build.webp",
    alt: "Build Resume With AI",
  },
  {
    src: "/homepage/roadmaps.webp",
    alt: "Roadmaps With AI",
  },
  {
    src: "/homepage/ask-question.webp",
    alt: "Ask Question",
  },
];
