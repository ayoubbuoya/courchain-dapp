"use client";

import Link from "next/link";
import { useState } from "react";

export default function HowToStartSection() {
  const [howToStart, setHowToStart] = useState(0);
  return (
    <section className="max-h-screen py-8">
      <div className="w-[75%] mx-auto ">
        <h1 className="uppercase tracking-[-0.1rem] text-aqua-blue font-capriola font-normal text-[2.5rem]  ">
          Comment commencer ?
        </h1>
        <div className="border-b-2 flex justify-around items-center my-12 w-[95%] mx-auto">
          <button
            onClick={() => setHowToStart(0)}
            className={`text-dimgray-100 font-poppins text-2xl text-center py-3 px-6 ${
              howToStart === 0
                ? "border-b-2 border-b-black font-semibold"
                : "font-normal"
            }`}
          >
            Préparez votre cv
          </button>
          <button
            onClick={() => setHowToStart(1)}
            className={`text-dimgray-100 font-poppins text-2xl text-center py-3 px-6 ${
              howToStart === 1
                ? "border-b-2 border-b-black font-semibold"
                : "font-normal"
            }`}
          >
            Record your video
          </button>
          <button
            onClick={() => setHowToStart(2)}
            className={`text-dimgray-100 font-poppins text-2xl text-center py-3 px-6 ${
              howToStart === 2
                ? "border-b-2 border-b-black font-semibold"
                : "font-normal"
            }`}
          >
            Record your video
          </button>
        </div>
        {howToStart === 0 ? (
          <div className="flex flex-wrap justify-around gap-2">
            <div className="w-[40%] min-w-[25rem] flex flex-col justify-around text-left">
              <h1 className="uppercase font-capriola font-normal tracking-[-0.1rem] text-4xl text-aqua-blue ">
                Header 1
              </h1>
              <p
                style={{ color: "#2D2F31" }}
                className="font-normal font-poppins text-xl  "
              >
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec
                ullamcorper mattis lorem non. Ultrices praesent amet ipsum justo
                massa. Eu dolor aliquet risus gravida nunc at feugiat consequat
                purus. Non massa enim vitae duis mattis. Vel in ultricies vel
                fringilla.
              </p>
            </div>
            <div className="w-[40%] flex justify-center items-center">
              <img
                className="w-[23rem] object-cover "
                src="/young-man-pointing-on-contract@2x.png"
                alt=""
              />
            </div>
          </div>
        ) : howToStart === 1 ? (
          <div className="flex flex-wrap justify-around gap-2">
            <div className="w-[40%] min-w-[25rem] flex flex-col justify-around text-left">
              <h1 className="uppercase font-capriola font-normal tracking-[-0.1rem] text-4xl text-aqua-blue ">
                Header 2
              </h1>
              <p
                style={{ color: "#2D2F31" }}
                className="font-normal font-poppins text-xl  "
              >
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec
                ullamcorper mattis lorem non. Ultrices praesent amet ipsum justo
                massa. Eu dolor aliquet risus gravida nunc at feugiat consequat
                purus. Non massa enim vitae duis mattis. Vel in ultricies vel
                fringilla.
              </p>
            </div>
            <div className="w-[40%] flex justify-center items-center">
              <img
                className="w-[23rem] object-cover "
                src="/smiling-man-wearing-headset-with-microphone@2x.png"
                alt=""
              />
            </div>
          </div>
        ) : (
          <div className="flex flex-wrap justify-around gap-2">
            <div className="w-[40%] min-w-[25rem] flex flex-col justify-around text-left">
              <h1 className="uppercase font-capriola font-normal tracking-[-0.1rem] text-4xl text-aqua-blue ">
                Header 3
              </h1>
              <p
                style={{ color: "#2D2F31" }}
                className="font-normal font-poppins text-xl  "
              >
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec
                ullamcorper mattis lorem non. Ultrices praesent amet ipsum justo
                massa. Eu dolor aliquet risus gravida nunc at feugiat consequat
                purus. Non massa enim vitae duis mattis. Vel in ultricies vel
                fringilla.
              </p>
            </div>
            <div className="w-[40%] flex justify-center items-center">
              <img
                className="w-[20rem] object-cover "
                src="/young-man-with-laptop-on-chair@2x.png"
                alt=""
              />
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
