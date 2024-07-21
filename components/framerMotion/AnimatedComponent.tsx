"use client";
import React, { useEffect, useRef, useState } from "react";
import {
  AnimatePresence,
  delay,
  motion,
  useAnimationControls,
  useInView,
} from "framer-motion";

const AnimatedComponent = () => {
  const ref = useRef(null);
  const isInview = useInView(ref);
  useEffect(() => {}, [isInview]);
  return (
    <div className="w-full">
      <div className="h-[150vh] w-full"></div>
      <motion.div
        className="h-[50vh] bg-black w-full"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 1 }}
      ></motion.div>
      <motion.div
        ref={ref}
        className="h-[50vh] bg-red-700 w-full"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 1 }}
      ></motion.div>
    </div>
  );
};

export default AnimatedComponent;
