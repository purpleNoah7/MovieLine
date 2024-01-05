"use client";

import { MotionConfig, motion, AnimatePresence, delay } from "framer-motion";
import Link from "next/link";
const variants = {
  open: { opacity: 1, x: 0 },
  closed: { opacity: 0, x: -10 },
};
function CardMovie({ link, img, movieName, years, index }) {
  const delay = index;
  return (
    <MotionConfig>
      <AnimatePresence>
        <motion.div
          initial="closed"
          animate="open"
          variants={variants}
          transition={{ duration: 0.6, delay: delay * 0.1 }}
        >
          <Link href={`/movies/${link}`}>
            <div className="flex flex-col w-[auto] ">
              <div>
                <img
                  src={img}
                  className=" rounded-xl w-[300px]"
                  alt={movieName}
                />
              </div>
              <div className="grid grid-cols-1 mx-auto my-0">
                <h2 className="font-bold text-center">{movieName}</h2>
                <span className="text-center font-light">{years}</span>
              </div>
            </div>
          </Link>
        </motion.div>
      </AnimatePresence>
    </MotionConfig>
  );
}

export default CardMovie;
