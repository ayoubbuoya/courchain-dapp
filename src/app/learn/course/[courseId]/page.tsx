"use client";

import { useEffect, useRef, useState } from "react";
import { useWalletStore } from "@/stores/wallet";
import { toast } from "react-toastify";
import { useSession } from "next-auth/react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { CONTRACTID } from "@/lib/config";
import Loading from "@/components/loading";
import SplitLayout from "@/components/dashboard/splitLayout";
import {
  FullEnrollment,
  FullLessonProgress,
  FullModuleProgress,
  FullQuizzProgress,
} from "@/lib/types";
import Image from "next/image";
import Markdown from "react-markdown";

import { Button } from "@/components/ui/button";
import { CardTitle, CardHeader, CardContent, Card } from "@/components/ui/card";

import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { Quizz, Answer, Question } from "@/lib/types";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import Link from "next/link";

export default function LearnCoursePage({
  params,
}: {
  params: {
    courseId: number;
  };
}) {
  const { courseId } = params;
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const quizzParam = searchParams.get("quizz") || null;
  const moduleOrder = Number(searchParams.get("module")) || 1;
  const lessonOrder = Number(searchParams.get("lesson")) || 1;
  const { wallet, signedAccountId } = useWalletStore();
  const { data: session } = useSession();
  const router = useRouter();
  const [enrollment, setEnrollment] = useState<FullEnrollment | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [currentLesson, setCurrentLesson] = useState<FullLessonProgress | null>(
    null
  );
  const [currentQuizz, setCurrentQuizz] = useState<FullQuizzProgress | null>(
    null
  );
  const [questions, setQuestions] = useState<Question[]>([]);
  const [watchedPercentage, setWatchedPercentage] = useState(0);
  const videoRef = useRef<HTMLVideoElement>(null);

  async function fetchCourseEnrollment() {
    // reset the state
    setIsLoading(true);
    setEnrollment(null);
    setCurrentLesson(null);
    setCurrentQuizz(null);
    setQuestions([]);

    const courseEnrollment = await wallet.viewMethod({
      contractId: CONTRACTID,
      method: "get_student_enrolled_course",
      args: {
        course_id: Number(courseId),
        student_id: signedAccountId,
      },
    });
    setIsLoading(false);

    console.log("Course Enrollment: ", courseEnrollment);

    if (!courseEnrollment) {
      await toast.error("You are not enrolled in this course", {
        autoClose: 1000,
      });
      router.push(`/course/${courseId}`);
      return;
    }

    setEnrollment(courseEnrollment);
    if (quizzParam && quizzParam === "true") {
      const quizz = courseEnrollment.modules[moduleOrder - 1].quizz;
      setCurrentQuizz(quizz);
      if (quizz) {
        // set questions from quizz but replace all answer.is_correct with false
        const quests = quizz.quizz.questions.map((question: Question) => {
          const answers = question.answers.map((answer) => {
            return { ...answer, is_correct: false };
          });
          return { ...question, answers };
        });
        setQuestions(quests);
      }
    } else {
      setCurrentLesson(
        courseEnrollment.modules[moduleOrder - 1].lessons[lessonOrder - 1]
      );
    }
  }

  useEffect(() => {
    const updateWatchedPercentage = () => {
      if (videoRef.current) {
        const { currentTime, duration } = videoRef.current;
        const percentage = (currentTime / duration) * 100;
        setWatchedPercentage(percentage);
      }
    };

    if (!videoRef.current) return;

    const interval = setInterval(updateWatchedPercentage, 1000); // Update every second

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    console.log("LearnCoursePage mounted");

    if (!wallet) return;

    if (!signedAccountId) {
      toast.error("Please connect wallet first");
      return;
    }

    if (signedAccountId) {
      console.log("signedAccountId", signedAccountId);
    }

    if (wallet && signedAccountId) {
      fetchCourseEnrollment();
    }

    return () => {
      console.log("LearnCoursePage unmounted");
      setEnrollment(null);
      setIsLoading(true);
    };
  }, [wallet, signedAccountId]);

  useEffect(() => {
    console.log("Module Order Changed: ", moduleOrder);
    setIsLoading(true);
    setCurrentLesson(null);
    setCurrentQuizz(null);
    setQuestions([]);

    if (wallet) {
      if (enrollment) {
        if (quizzParam && quizzParam === "true") {
          const quizz = enrollment.modules[moduleOrder - 1].quizz;
          setCurrentQuizz(quizz);
          if (quizz) {
            // set questions from quizz but replace all answer.is_correct with false
            const quests = quizz.quizz.questions.map((question: Question) => {
              const answers = question.answers.map((answer) => {
                return { ...answer, is_correct: false };
              });
              return { ...question, answers };
            });
            setQuestions(quests);
          }
        } else {
          setCurrentLesson(
            enrollment.modules[moduleOrder - 1].lessons[lessonOrder - 1]
          );
        }

        setIsLoading(false);
      } else {
        fetchCourseEnrollment();
      }
    }
  }, [searchParams]);

  if (isLoading) {
    return <Loading />;
  }

  const handleLessonOrderChange = (order: number) => {
    const params = new URLSearchParams(searchParams);
    params.set("lesson", order.toString());
    // remove the quizz param if it exists
    params.delete("quizz");
    router.replace(`${pathname}?${params.toString()}`);
  };

  const handleModuleOrderChange = (order: number) => {
    const params = new URLSearchParams(searchParams);
    params.set("module", order.toString());
    params.set("lesson", "1");
    // remove the quizz param if it exists
    params.delete("quizz");
    router.replace(`${pathname}?${params.toString()}`);
  };

  const handleQuizzSelect = () => {
    const params = new URLSearchParams(searchParams);
    params.set("quizz", "true");
    router.replace(`${pathname}?${params.toString()}`);
  };

  const handleMarkLessonAsCompleted = async () => {
    const loadingToast = toast.loading("Marking Lesson as Completed");

    if (!currentLesson) {
      toast.update(loadingToast, {
        render: "No lesson to mark as completed",
        type: "error",
        autoClose: 2000,
        isLoading: false,
      });
      return;
    }

    if (currentLesson.lesson.video_url && watchedPercentage < 100.0) {
      toast.update(loadingToast, {
        render: "Please watch the full video to mark as completed",
        type: "error",
        autoClose: 2000,
        isLoading: false,
      });
      return;
    }

    const callResult = await wallet.callMethod({
      contractId: CONTRACTID,
      method: "complete_lesson",
      args: {
        lesson_id: currentLesson.lesson.id,
      },
    });

    const success = Boolean(
      Buffer.from(callResult.status.SuccessValue, "base64").toString(
        "utf-8"
      ) === "true"
    );

    if (!success) {
      toast.update(loadingToast, {
        render: "Error marking lesson as completed",
        type: "error",
        autoClose: 2000,
        isLoading: false,
      });
      return;
    }

    toast.update(loadingToast, {
      render: "Lesson marked as completed",
      type: "success",
      autoClose: 2000,
      isLoading: false,
    });

    fetchCourseEnrollment();
  };

  const handleSubmitQuizz = async () => {
    const loadingToast = toast.loading("Submitting Quizz");
    console.log("Questions: ", questions);

    // check if all questions have been answered
    const answeredQuestions = questions.filter((question) => {
      return question.answers.some((answer) => answer.is_correct);
    });

    if (answeredQuestions.length < questions.length) {
      toast.update(loadingToast, {
        render: "Please answer all questions",
        type: "error",
        autoClose: 2000,
        isLoading: false,
      });
      return;
    }

    await wallet.callMethod({
      contractId: CONTRACTID,
      method: "submit_quizz",
      args: {
        quizz_id: currentQuizz?.quizz.id,
        submitted_questions: questions,
      },
    });

    toast.update(loadingToast, {
      render: "Quizz submitted successfully",
      type: "success",
      autoClose: 2000,
      isLoading: false,
    });

    fetchCourseEnrollment();
  };

  return (
    <div className="md:grid md:grid-cols-12">
      <SplitLayout session={session} />
      <main className="w-full min-h-screen py-5 md:px-5 md:col-span-11 md:py-10 ">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10 ">
          <div className="lef-side md:col-span-2">
            {enrollment?.status === "completed" ? (
              <div className="flex items-center justify-between max-w-[98%] mb-6">
                <h1 className="capitalize text-2xl font-poppins font-semibold text-purple">
                  {enrollment?.course.title}
                </h1>

                <Link
                  href={`/profile/${signedAccountId}?tab=certificates`}
                  className="text-aqua-blue font-poppins font-semibold text-xl hover:underline cursor-pointer capitalize"
                >
                  view certificates
                </Link>
              </div>
            ) : (
              <h1 className="mb-4 text-2xl font-semibold text-purple">
                {enrollment?.course.title}
              </h1>
            )}

            <div className="">
              {currentLesson?.lesson.video_url ? (
                <div className="w-full lg:max-w-[95%] mx-auto  flex flex-col  ">
                  <video
                    ref={videoRef}
                    className="w-full h-full"
                    src={currentLesson?.lesson.video_url}
                    controls
                    autoPlay
                    onEnded={() => {
                      setWatchedPercentage(100.0);
                    }}
                  />
                  {currentLesson?.status === "completed" ? (
                    <button className="w-full font-poppins font-medium py-2 mt-5 text-white bg-aqua-blue rounded-md">
                      Lesson Completed
                    </button>
                  ) : (
                    <button
                      onClick={handleMarkLessonAsCompleted}
                      className="w-full font-poppins font-medium py-2 mt-5 text-white bg-aqua-blue rounded-md"
                    >
                      Mark as Completed
                    </button>
                  )}
                </div>
              ) : currentLesson?.lesson.article ? (
                <div className="w-full xl:max-w-[88%] mx-auto overflow-x-hidden overflow-y-auto ">
                  <Markdown
                    children={
                      currentLesson?.lesson.article || "No Content Available"
                    }
                    components={{
                      strong: ({ node, ...props }) => (
                        <strong className="text-aqua-blue font-poppins font-medium text-xl">
                          {props.children}
                        </strong>
                      ),
                      p: ({ node, ...props }) => (
                        <p className="text-schemes-secondary font-poppins py-2 font-normal text-base">
                          {props.children}
                        </p>
                      ),
                      ul: ({ node, ...props }) => (
                        <ul className="list-disc list-inside">
                          {props.children}
                        </ul>
                      ),
                      li: ({ node, ...props }) => (
                        <li className="marker:text-purple text-schemes-secondary font-poppins font-normal text-base ">
                          {props.children}
                        </li>
                      ),
                      h1: ({ node, ...props }) => (
                        <h1 className="text-2xl font-semibold text-purple">
                          {props.children}
                        </h1>
                      ),
                      h2: ({ node, ...props }) => (
                        <h2 className="text-xl font-semibold text-purple">
                          {props.children}
                        </h2>
                      ),
                      h3: ({ node, ...props }) => (
                        <h3 className="text-lg font-semibold text-purple">
                          {props.children}
                        </h3>
                      ),
                      h4: ({ node, ...props }) => (
                        <h4 className="text-base font-semibold text-purple">
                          {props.children}
                        </h4>
                      ),
                      h5: ({ node, ...props }) => (
                        <h5 className="text-base font-semibold text-purple">
                          {props.children}
                        </h5>
                      ),
                      h6: ({ node, ...props }) => (
                        <h6 className="text-base font-semibold text-purple">
                          {props.children}
                        </h6>
                      ),

                      ol: ({ node, ...props }) => (
                        <ol className="list-decimal list-inside">
                          {props.children}
                        </ol>
                      ),
                      blockquote: ({ node, ...props }) => (
                        <blockquote className="border-l-4 border-aqua-blue pl-4">
                          {props.children}
                        </blockquote>
                      ),
                      code: ({ node, ...props }) => (
                        <code className="bg-gray-200 p-1">
                          {props.children}
                        </code>
                      ),
                      pre: ({ node, ...props }) => (
                        <pre className="bg-gray-200 p-1">{props.children}</pre>
                      ),
                    }}
                    className={`text-schemes-secondary font-poppins py-2 font-normal text-base`}
                  />
                  {currentLesson?.status === "completed" ? (
                    <button className="w-full font-poppins font-medium py-2 mt-5 text-white bg-aqua-blue rounded-md">
                      Lesson Completed
                    </button>
                  ) : (
                    <button
                      onClick={handleMarkLessonAsCompleted}
                      className="w-full font-poppins font-medium py-2 mt-5 text-white bg-aqua-blue rounded-md"
                    >
                      Mark as Completed
                    </button>
                  )}
                </div>
              ) : currentQuizz && !currentQuizz.is_correct ? (
                <div className="w-full xl:max-w-[88%] mx-auto overflow-x-hidden overflow-y-auto ">
                  <Card className="font-poppins">
                    <CardHeader className="w-full flex flex-row justify-between items-center">
                      <CardTitle className="capitalize text-aqua-blue font-poppins">
                        {currentQuizz.quizz.title}
                      </CardTitle>
                      <Button
                        onClick={handleSubmitQuizz}
                        className="capitalize rounded-sm font-poppins font-semibold text-lg bg-aqua-blue hover:bg-aqua-blue"
                      >
                        {currentQuizz.try_count > 0
                          ? "Resubmit Quizz"
                          : "Submit Quizz"}
                      </Button>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-6">
                        {questions.map((question, quesIndex) => {
                          // check if the question is a multiple choice question by checking if there more than one question.answer.is_correct === true
                          const isMultipleChoice =
                            currentQuizz.quizz.questions[
                              quesIndex
                            ].answers.filter((answer) => answer.is_correct)
                              .length > 1;
                          return (
                            <div
                              key={quesIndex}
                              className="border-2 border-aqua-blue rounded-md p-4 space-y-4"
                            >
                              <p className="font-medium font-poppins text-lg">
                                {question.text}
                              </p>

                              {isMultipleChoice ? (
                                <div className="grid grid-cols-2 gap-3">
                                  {question.answers.map((answer, index) => (
                                    <div
                                      key={index}
                                      className="flex items-center gap-2"
                                    >
                                      <Checkbox
                                        checked={answer.is_correct}
                                        onClick={() => {
                                          const newQuestions = [...questions];
                                          newQuestions[quesIndex].answers[
                                            index
                                          ].is_correct =
                                            !newQuestions[quesIndex].answers[
                                              index
                                            ].is_correct;
                                          setQuestions(newQuestions);
                                        }}
                                        className="text-aqua-blue"
                                      />
                                      <p className="text-aqua-blue font-poppins font-semibold">
                                        {answer.text}
                                      </p>
                                    </div>
                                  ))}
                                </div>
                              ) : (
                                <RadioGroup className="grid grid-cols-2 gap-3">
                                  {question.answers.map((answer, index) => (
                                    <div
                                      key={index}
                                      className="flex items-center gap-2"
                                    >
                                      <RadioGroupItem
                                        checked={answer.is_correct}
                                        onClick={() => {
                                          // reset all answers to false before setting the current answer to true
                                          const newQuestions = [...questions];
                                          newQuestions[
                                            quesIndex
                                          ].answers.forEach(
                                            (ans) => (ans.is_correct = false)
                                          );
                                          newQuestions[quesIndex].answers[
                                            index
                                          ].is_correct = true;
                                          setQuestions(newQuestions);
                                        }}
                                        value={answer.text}
                                      />
                                      <p className="text-aqua-blue font-poppins font-semibold">
                                        {answer.text}
                                      </p>
                                    </div>
                                  ))}
                                </RadioGroup>
                              )}
                            </div>
                          );
                        })}
                      </div>
                    </CardContent>
                  </Card>
                </div>
              ) : currentQuizz && currentQuizz.is_correct ? (
                <div className="w-full xl:max-w-[88%] mx-auto overflow-x-hidden overflow-y-auto ">
                  <Card className="font-poppins">
                    <CardHeader className="w-full flex flex-row justify-between items-center">
                      <CardTitle className="capitalize text-aqua-blue font-poppins">
                        {currentQuizz.quizz.title}
                      </CardTitle>
                      <Button className="capitalize rounded-sm font-poppins font-semibold text-lg bg-aqua-blue hover:bg-aqua-blue">
                        Quizz Completed
                      </Button>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-6">
                        {currentQuizz.quizz.questions.map(
                          (question, quesIndex) => {
                            return (
                              <div
                                key={quesIndex}
                                className="border-2 border-aqua-blue rounded-md p-4 space-y-4"
                              >
                                <p className="font-medium font-poppins text-lg">
                                  {question.text}
                                </p>

                                <div className="grid grid-cols-2 gap-3">
                                  {question.answers.map((answer, index) => (
                                    <div
                                      key={index}
                                      className="flex items-center gap-2"
                                    >
                                      <Checkbox
                                        checked={answer.is_correct}
                                        className="text-aqua-blue"
                                      />
                                      <p className="text-aqua-blue font-poppins font-semibold">
                                        {answer.text}
                                      </p>
                                    </div>
                                  ))}
                                </div>
                              </div>
                            );
                          }
                        )}
                      </div>
                    </CardContent>
                  </Card>
                </div>
              ) : null}
            </div>
          </div>
          <div className="right-side pr-5">
            <div className="flex flex-col items-start justify-between gap-4">
              <h1 className="text-2xl font-semibold text-purple">
                Course Content
              </h1>
              {enrollment?.modules.map((module) => (
                <div
                  key={module.id}
                  className="w-full custom-linear-border rounded-2xl"
                >
                  <div className="flex items-center space-x-4 p-3 rounded-2xl overflow-hidden w-full">
                    <div className="w-full overflow-hidden">
                      <div className="w-full overflow-hidden">
                        <div className="w-full overflow-hidden flex items-center justify-between">
                          <h2 className="text-lg font-semibold truncate text-aqua-blue">
                            {module.module.title}
                          </h2>
                          <button
                            onClick={() =>
                              handleModuleOrderChange(module.module.order)
                            }
                            className="text-sm font-semibold text-aqua-blue"
                          >
                            <Image
                              width={20}
                              height={20}
                              className={`w-4 h-4 duration-1000 ${
                                module.module.order === moduleOrder
                                  ? "transform rotate-180 "
                                  : ""
                              } `}
                              src="/down-arrow.svg"
                              alt=""
                            />
                          </button>
                        </div>
                        <p className="text-[0.9rem] font-poppins font-normal text-gray-500">
                          {module.status}
                        </p>
                      </div>
                      {module.module.order === moduleOrder && (
                        <div className="w-full flex flex-col justify-between items-start gap-3 pl-5 py-4">
                          {module.lessons.map((lesson) => (
                            <div
                              key={lesson.id}
                              className="w-full cursor-pointer flex justify-between items-baseline"
                              onClick={() => {
                                handleLessonOrderChange(lesson.lesson.order);
                              }}
                            >
                              <h2
                                className={`text-lg ${
                                  lesson.lesson.order === lessonOrder &&
                                  !quizzParam
                                    ? "text-aqua-blue font-semibold"
                                    : "text-dimgray-700 font-medium "
                                }`}
                              >
                                {lesson.lesson.title}
                              </h2>
                            </div>
                          ))}
                          {module.quizz && (
                            <div
                              key={module.quizz.id}
                              className="w-full cursor-pointer flex justify-between items-baseline"
                            >
                              <h2
                                onClick={handleQuizzSelect}
                                className={`text-lg ${
                                  quizzParam === "true"
                                    ? "text-aqua-blue font-semibold"
                                    : "text-dimgray-700 font-medium "
                                }`}
                              >
                                {module.quizz.quizz.title}
                              </h2>
                            </div>
                          )}
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
