"use client";
import { useState } from "react";

export default function FAQSection() {
  const [isFAQ1, setIsFAQ1] = useState(true);
  const [isFAQ2, setIsFAQ2] = useState(false);
  const [isFAQ3, setIsFAQ3] = useState(false);
  const [isFAQ4, setIsFAQ4] = useState(false);
  const [isFAQ5, setIsFAQ5] = useState(false);

  return (
    <section className="py-10 text-left md:py-8 ">
      <div className="grid md:grid-cols-3 font-poppins w-[90%] md:w-[70%] mx-auto md:my-12 gap-5 md:gap-20 ">
        <div className="flex flex-col justify-between h-full gap-3 xl:gap-32">
          <h1 className="text-xl md:text-5xl font-bold  text-aqua-blue ">
            Frequently Asked Questions
          </h1>
          <p className="text-base md:text-xl font-medium font-poppins text-dimgray-300">
            Flex is the only saas business platform that lets you run your
            business on one platform, seamlessly across all digital channels.
          </p>
        </div>

        <div className="flex flex-col justify-between w-full md:my-6 xl:my-0 md:col-span-2">
          <div
            className={`flex justify-between items-center w-full ${
              !isFAQ1 ? "my-[1.15rem]" : null
            }`}
          >
            <p className="text-lg md:text-xl font-bold text-dimgray-500 ">
              How long does it take to ship my order?
            </p>
            {isFAQ1 ? (
              <img
                onClick={() => setIsFAQ1(false)}
                className="cursor-pointer w-[2.2rem] "
                src="/down-arrow--24--outline@2x.png"
                alt=""
              />
            ) : (
              <img
                onClick={() => setIsFAQ1(true)}
                className="cursor-pointer w-[2.2rem] "
                src="/down-arrow--24--outline.svg"
                alt=""
              />
            )}
          </div>
          {isFAQ1 && (
            <p className="font-poppins w-[85%] mb-3 mt-1 font-medium text-base text-dimgray-300 py-1">
              Orders are usually shipped within 1-2 business days after placing
              the order.
            </p>
          )}
          <div
            className={`flex justify-between items-center w-full ${
              !isFAQ2 ? "my-[1.15rem]" : null
            }
          `}
          >
            <p className="text-lg md:text-xl font-bold text-dimgray-500 ">
              What payment methods do you accept?
            </p>
            {isFAQ2 ? (
              <img
                onClick={() => setIsFAQ2(false)}
                className="cursor-pointer w-[2.2rem] "
                src="/down-arrow--24--outline@2x.png"
                alt=""
              />
            ) : (
              <img
                onClick={() => setIsFAQ2(true)}
                className="cursor-pointer w-[2.2rem] "
                src="/down-arrow--24--outline.svg"
                alt=""
              />
            )}
          </div>
          {isFAQ2 && (
            <p className="font-poppins w-[85%] mb-3 mt-1 font-medium text-base text-dimgray-300 py-1">
              Orders are usually shipped within 1-2 business days after placing
              the order.
            </p>
          )}
          <div
            className={`flex justify-between items-center w-full ${
              !isFAQ3 ? "my-[1.15rem]" : null
            }
          `}
          >
            <p className="text-lg md:text-xl font-bold text-dimgray-500 ">
              What shipping options do you have?
            </p>
            {isFAQ3 ? (
              <img
                onClick={() => setIsFAQ3(false)}
                className="cursor-pointer w-[2.2rem] "
                src="/down-arrow--24--outline@2x.png"
                alt=""
              />
            ) : (
              <img
                onClick={() => setIsFAQ3(true)}
                className="cursor-pointer w-[2.2rem] "
                src="/down-arrow--24--outline.svg"
                alt=""
              />
            )}
          </div>
          {isFAQ3 && (
            <p className="font-poppins w-[85%] mb-3 mt-1 font-medium text-base text-dimgray-300 py-1">
              Orders are usually shipped within 1-2 business days after placing
              the order.
            </p>
          )}
          <div
            className={`flex justify-between items-center w-full ${
              !isFAQ4 ? "my-[1.15rem]" : null
            }
          `}
          >
            <p className="text-lg md:text-xl font-bold text-dimgray-500 ">
              How do I make changes to an existing order?
            </p>
            {isFAQ4 ? (
              <img
                onClick={() => setIsFAQ4(false)}
                className="cursor-pointer w-[2.2rem] "
                src="/down-arrow--24--outline@2x.png"
                alt=""
              />
            ) : (
              <img
                onClick={() => setIsFAQ4(true)}
                className="cursor-pointer w-[2.2rem] "
                src="/down-arrow--24--outline.svg"
                alt=""
              />
            )}
          </div>
          {isFAQ4 && (
            <p className="font-poppins w-[85%] mb-3 mt-1 font-medium text-base text-dimgray-300 py-1">
              Orders are usually shipped within 1-2 business days after placing
              the order.
            </p>
          )}
          <div
            className={`flex justify-between items-center w-full ${
              !isFAQ5 ? "my-[1.15rem]" : null
            }
          `}
          >
            <p className="text-lg md:text-xl font-bold text-dimgray-500 ">
              When will my order arrive?
            </p>
            {isFAQ5 ? (
              <img
                onClick={() => setIsFAQ5(false)}
                className="cursor-pointer w-[2.2rem] "
                src="/down-arrow--24--outline@2x.png"
                alt=""
              />
            ) : (
              <img
                onClick={() => setIsFAQ5(true)}
                className="cursor-pointer w-[2.2rem] "
                src="/down-arrow--24--outline.svg"
                alt=""
              />
            )}
          </div>
          {isFAQ5 && (
            <p className="font-poppins w-[85%] mb-3 mt-1 font-medium text-base text-dimgray-300 py-1">
              Orders are usually shipped within 1-2 business days after placing
              the order.
            </p>
          )}
        </div>
      </div>
    </section>
  );
}
