"use client";

import Link from "next/link";
import { useState } from "react";

interface CourseMinCardProps {
  title: string;
  price: number;
  link: string;
}

export default function CourseMinCard({
  title,
  price,
  link,
}: CourseMinCardProps) {
  const [isHovered, setIsHovered] = useState(false);
  const splittedTitle = title.split(" ");
  return (
    <div className="custom-linear-border rounded-2xl overflow-hidden">
      <div className="w-full flex items-center justify-between px-2 md:px-4 py-[1.08rem] ">
        <div className="w-[50%] flex flex-col items-start justify-around font-poppins font-medium   ">
          <div
            className="w-full "
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
          >
            {!isHovered ? (
              <h4 className="text-aqua-blue text-xl pb-2 truncate">{title}</h4>
            ) : (
              <div className="flex justify-between items-center gap-1 text-aqua-blue text-xl pb-2 top-0 animate-horizontal-slide ">
                {splittedTitle.map((word, index) => (
                  <span key={index}>{word}</span>
                ))}
              </div>
            )}
          </div>
          <p className="text-base text-schemes-secondary">
            {price + "    NEAR"}{" "}
          </p>
        </div>
        <Link
          href={link}
          className="text-white font-poppins font-medium bg-aqua-blue rounded-3xl px-6 py-3"
        >
          Learn More
        </Link>
      </div>
    </div>
  );
}
