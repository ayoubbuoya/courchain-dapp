import { useRef, useState } from "react";
import { Button } from "./ui/button";
import { Slider } from "./ui/slider";
import { PauseIcon } from "lucide-react";
import { secondesToVideoDuration } from "@/lib/utils";

export default function VideoPlayer({
  currentLesson,
}: {
  currentLesson: {
    video_url: string;
  };
}) {
  const videoRef = useRef<any>(null);
  const [playing, setPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [videoTime, setVideoTime] = useState(0);
  const [progress, setProgress] = useState(0);

  console.log("currenTime : ", currentTime);
  console.log("videoTime : ", videoTime);
  console.log("progress : ", progress);

  const videoHandler = (control: string) => {
    console.log("control", control);
    if (control === "play") {
      videoRef.current.play();
      setPlaying(true);
      var vid = document.getElementById("video1") as HTMLVideoElement;
      setVideoTime(videoRef.current.duration);
    } else if (control === "pause") {
      videoRef.current.pause();
      setPlaying(false);
    }
  };

  const fastForward = () => {
    videoRef.current.currentTime += 5;
  };

  const revert = () => {
    videoRef.current.currentTime -= 5;
  };

  if (playing) {
    window.setInterval(function () {
      if (!videoRef.current) return;

      setCurrentTime(videoRef.current?.currentTime);
      setProgress((videoRef.current?.currentTime / videoTime) * 100);
    }, 1000);
  }

  return (
    <div className="min-h-[70%] md:mt-10">
      <video
        className="w-full h-full  rounded-2xl outline-none border border-gray-300 "
        src={currentLesson.video_url}
        controls
        autoPlay
      />
    </div>
  );

  /* return (
    <div className="w-full min-h-[60%] rounded-2xl flex items-center justify-center">
      <div className="w-full relative rounded-2xl overflow-hidden">
        <div className="">
          <video
            ref={videoRef}
            className="w-full h-full p-1 rounded-2xl "
            src={currentLesson.video_url}
          />
        </div>
        <div className="absolute inset-x-0 bottom-0 p-4">
          <div className="flex items-center justify-between text-white bg-black">
            <div className="flex items-center min-w-[80%] gap-2">
              <Button className="w-8 h-8" size="icon" variant="ghost">
                {playing ? (
                  <PauseIcon
                    onClick={() => videoHandler("pause")}
                    className="w-5 h-5 fill-white"
                  />
                ) : (
                  <PlayIcon
                    onClick={() => videoHandler("play")}
                    className="w-5 h-5 fill-white"
                  />
                )}
              </Button>
              <Slider
                value={[currentTime]}
                className="w-full"
                step={videoTime / currentTime}
                onValueChange={(value) => {
                  videoRef.current.currentTime = value;
                }}
              />
              <div className="text-sm">
                {
                    currentTime
                }
              </div>
            </div>
            <div className="flex items-center gap-2">
              <Button
                className="w-8 h-8 hover:bg-black/50"
                size="icon"
                variant="ghost"
              >
                <Volume2Icon className="w-5 h-5 fill-white" />
              </Button>
              <Button
                className="w-8 h-8 hover:bg-black/50"
                size="icon"
                variant="ghost"
              >
                <MaximizeIcon className="w-5 h-5 fill-white" />
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  ); */
}

function MaximizeIcon(props: any) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M8 3H5a2 2 0 0 0-2 2v3" />
      <path d="M21 8V5a2 2 0 0 0-2-2h-3" />
      <path d="M3 16v3a2 2 0 0 0 2 2h3" />
      <path d="M16 21h3a2 2 0 0 0 2-2v-3" />
    </svg>
  );
}

function PlayIcon(props: any) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <polygon points="6 3 20 12 6 21 6 3" />
    </svg>
  );
}

function Volume2Icon(props: any) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5" />
      <path d="M15.54 8.46a5 5 0 0 1 0 7.07" />
      <path d="M19.07 4.93a10 10 0 0 1 0 14.14" />
    </svg>
  );
}
