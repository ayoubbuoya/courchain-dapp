"use client";

import { Button } from "@/components/ui/button";
import { CardTitle, CardHeader, CardContent, Card } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { Quizz, Answer, Question } from "@/lib/types";
import React, { useState } from "react";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { set } from "mongoose";
import { toast } from "react-toastify";
import { useWalletStore } from "@/stores/wallet";
import { CONTRACTID } from "@/lib/config";

export default function AddQuizz({
  currentQuizz,
  quizzAddAction,
}: {
  currentQuizz: Quizz | null;
  quizzAddAction: string | null;
}) {
  const { wallet } = useWalletStore();
  const [questionText, setQuestionText] = useState("");
  const [isMultipleAnswers, setIsMultipleAnswers] = useState(false);
  const [answers, setAnswers] = useState<Answer[]>([
    {
      text: "",
      is_correct: true,
    },
    { text: "", is_correct: false },
    { text: "", is_correct: false },
    { text: "", is_correct: false },
  ]);
  const [questions, setQuestions] = useState<Question[]>([]);

  const handleSubmit = (event: any) => {
    event.preventDefault();
    console.log("Question Text:", questionText);
    console.log("Answers:", answers);
    console.log("Is Multiple Answers:", isMultipleAnswers);
    // check if the question text is empty
    if (questionText === "") {
      toast.error("Please enter the question text");
      return;
    }
    // check if there is at least one correct answer and all answers have text
    const correctAnswers = answers.filter((answer) => answer.is_correct);
    if (correctAnswers.length === 0) {
      toast.error("Please select at least one correct answer");
      return;
    }

    if (answers.some((answer) => answer.text === "")) {
      toast.error("Please fill in all answers");
      return;
    }

    // Add the question to the questions array
    const newQuestion: Question = {
      text: questionText,
      answers: answers,
    };

    setQuestions([...questions, newQuestion]);

    // Reset the form
    setQuestionText("");
    setAnswers([
      {
        text: "",
        is_correct: true,
      },
      { text: "", is_correct: false },
      { text: "", is_correct: false },
      { text: "", is_correct: false },
    ]);
    setIsMultipleAnswers(false);
  };

  const handleSaveQuizz = async () => {
    // Save the quizz to the database
    console.log("Quizz:", currentQuizz);
    console.log("Questions:", questions);

    // check if there are questions
    if (questions.length === 0 || questions.length < 2) {
      toast.error("Please add at least 2 question");
      return;
    }

    // check if all questions have at least one correct answer
    if (
      questions.some(
        (question) =>
          question.answers.filter((answer) => answer.is_correct).length === 0
      )
    ) {
      toast.error(
        "Please make sure all questions have at least one correct answer"
      );
      return;
    }

    // check if all answers have text
    if (
      questions.some((question) =>
        question.answers.some((answer) => answer.text === "")
      )
    ) {
      toast.error("Please make sure all answers have text");
      return;
    }

    // check if all questions have text
    if (questions.some((question) => question.text === "")) {
      toast.error("Please make sure all questions have text");
      return;
    }

    if (!currentQuizz) {
      toast.error("Please select a quizz to add questions to");
      return;
    }

    const loadingToast = toast.loading("Saving Quizz Questions...");

    // call the save quizz function to blockchain
    await wallet.callMethod({
      contractId: CONTRACTID,
      method: "save_quizz_questions",
      args: {
        quizz_id: currentQuizz?.id,
        questions: questions,
        with_ai: false,
        
      },
    });

    toast.dismiss(loadingToast);
    toast.success("Quizz Questions Saved Successfully");

    // reset the form
    setQuestions([]);
  };

  return (
    <div className="w-full min-h-[70vh] mt-8">
      {currentQuizz &&  (
        <div className="w-full">
          <div className="col-span-2 space-y-6">
            <Card className="font-poppins">
              <CardHeader>
                <CardTitle className="font-poppins text-aqua-blue">
                  Add a New Question
                </CardTitle>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleSubmit} className="space-y-8">
                  <div>
                    <Label className="font-poppins" htmlFor="question-text">
                      Question Text
                    </Label>
                    <Textarea
                      className="h-20 mt-3 outline-none focus-visible:ring-0 focus-visible:outline-aqua-blue "
                      id="question-text"
                      placeholder="Enter the question"
                      value={questionText}
                      onChange={(e) => setQuestionText(e.target.value)}
                    />
                  </div>
                  <div>
                    <Label className="font-poppins ">Answers</Label>

                    {isMultipleAnswers ? (
                      <div className="grid grid-cols-2 gap-4 mt-3">
                        {answers.map((answer, index) => (
                          <div key={index} className="space-y-2">
                            <div className="flex items-center gap-2">
                              <Checkbox
                                checked={answer.is_correct}
                                onClick={() => {
                                  const newAnswers = [...answers];
                                  newAnswers[index].is_correct =
                                    !newAnswers[index].is_correct;
                                  setAnswers(newAnswers);
                                }}
                                id="answer-1-correct"
                              />

                              <Label htmlFor="answer-1-correct">Correct</Label>
                            </div>
                            <Input
                              className="outline-none focus-visible:outline-aqua-blue focus-visible:ring-0"
                              placeholder="Answer 1"
                              value={answer.text}
                              onChange={(e) => {
                                const newAnswers = [...answers];
                                newAnswers[index].text = e.target.value;
                                setAnswers(newAnswers);
                              }}
                            />
                          </div>
                        ))}
                      </div>
                    ) : (
                      <RadioGroup className="grid grid-cols-2 gap-4 mt-3">
                        {answers.map((answer, index) => (
                          <div className="space-y-2">
                            <div className="flex items-center gap-2">
                              <RadioGroupItem
                                checked={answer.is_correct}
                                onClick={() => {
                                  const newAnswers = [...answers];
                                  newAnswers.forEach(
                                    (a) => (a.is_correct = false)
                                  );
                                  newAnswers[index].is_correct = true;
                                  setAnswers(newAnswers);
                                }}
                                value="answer-1"
                                id="answer-1-correct"
                              />
                              <Label htmlFor="answer-1-correct">Correct</Label>
                            </div>
                            <Input
                              className="outline-none focus-visible:outline-aqua-blue focus-visible:ring-0"
                              placeholder="Answer 1"
                              value={answer.text}
                              onChange={(e) => {
                                const newAnswers = [...answers];
                                newAnswers[index].text = e.target.value;
                                setAnswers(newAnswers);
                              }}
                            />
                          </div>
                        ))}
                      </RadioGroup>
                    )}
                  </div>
                  <div className="flex items-center gap-2">
                    <Checkbox
                      checked={isMultipleAnswers}
                      onClick={() => {
                        setIsMultipleAnswers(!isMultipleAnswers);
                        // reset all answers iscorrect field to false
                        const newAnswers = [...answers];
                        newAnswers.forEach((a) => (a.is_correct = false));
                        setAnswers(newAnswers);
                      }}
                      className="text-aqua-blue"
                      id="multiple-answers"
                    />
                    <Label htmlFor="multiple-answers">
                      Multiple Correct Answers
                    </Label>
                  </div>
                  <Button
                    className="w-full font-poppins bg-aqua-blue hover:bg-aqua-blue "
                    type="submit"
                  >
                    Add Question
                  </Button>
                </form>
              </CardContent>
            </Card>
            <Card className="font-poppins">
              <CardHeader className="w-full flex flex-row justify-between items-center">
                <CardTitle className="text-aqua-blue font-poppins">
                  Quizz Preview
                </CardTitle>
                <Button
                  onClick={handleSaveQuizz}
                  className="rounded-sm font-poppins font-semibold text-lg bg-aqua-blue hover:bg-aqua-blue"
                >
                  Save Quizz
                </Button>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {questions.map((question, quesIndex) => (
                    <div
                      key={quesIndex}
                      className="border rounded-md p-4 space-y-4"
                    >
                      <p className="font-medium font-poppins text-xl">
                        {question.text}
                      </p>
                      <div className="grid grid-cols-2 gap-3">
                        {question.answers.map((answer, index) => (
                          <div className="flex items-center gap-2">
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
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      )}
    </div>
  );
}
