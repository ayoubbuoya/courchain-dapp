"use client";

import { Button } from "@/components/ui/button";
import { CardTitle, CardHeader, CardContent, Card } from "@/components/ui/card";

import { useState } from "react";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { Quizz, Answer, Question } from "@/lib/types";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { toast } from "react-toastify";
import { useWalletStore } from "@/stores/wallet";
import { CONTRACTID } from "@/lib/config";

export default function ShowMentorQuizz({
  currentQuizz,
}: {
  currentQuizz: Quizz;
}) {
  const { wallet } = useWalletStore();
  const [questions, setQuestions] = useState<Question[]>(
    currentQuizz.questions
  );
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
  const [isEditQuizz, setIsEditQuizz] = useState(false);

  const handleSaveQuizz = async () => {
    console.log("Quizz Title:", currentQuizz.title);
    console.log("Questions:", questions);

    const laodingToast = toast.loading("Saving Quizz...");

    await wallet.callMethod({
      contractId: CONTRACTID,
      method: "save_quizz_questions",
      args: {
        quizz_id: currentQuizz.id,
        questions: questions,
        with_ai: false,
      },
    });

    toast.dismiss(laodingToast);
    toast.success("Quizz Saved Successfully");
  };

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
  return (
    <div className="w-full">
      <Card className="font-poppins">
        <CardHeader className="w-full flex flex-row justify-between items-center">
          <CardTitle className="text-aqua-blue font-poppins">
            Quizz Preview
          </CardTitle>
          <Button
            onClick={() => {
              if (isEditQuizz) {
                handleSaveQuizz();
              } else {
                setIsEditQuizz(!isEditQuizz);
              }
            }}
            className="rounded-sm font-poppins font-semibold text-lg bg-aqua-blue hover:bg-aqua-blue"
          >
            {isEditQuizz ? "Save Quizz" : "Edit Quizz"}
          </Button>
        </CardHeader>
        <CardContent>
          {isEditQuizz ? (
            <div className="space-y-4">
              {questions.map((question, quesIndex) => (
                <div className="space-y-8 p-4 border-2 border-aqua-blue rounded-md ">
                  <div>
                    <div className="flex items-center justify-between">
                      <Label className="font-poppins" htmlFor="question-text">
                        Question Text
                      </Label>

                      <Button
                        onClick={() => {
                          // if questions array has only 2 questions toast error
                          if (questions.length <= 2) {
                            toast.error(
                              "A quizz must have at least 2 question"
                            );
                            return;
                          }
                          const newQuestions = [...questions];
                          newQuestions.splice(quesIndex, 1);
                          setQuestions(newQuestions);
                        }}
                        className="bg-red-500 hover:bg-red-600 text-white"
                      >
                        Delete
                      </Button>
                    </div>
                    <Textarea
                      className="h-20 mt-3 outline-none focus-visible:ring-0 focus-visible:outline-aqua-blue "
                      id="question-text"
                      placeholder="Enter the question"
                      value={question.text}
                      onChange={(e) => {
                        const newQuestions = [...questions];
                        newQuestions[quesIndex].text = e.target.value;
                        setQuestions(newQuestions);
                      }}
                    />
                  </div>
                  <div>
                    <Label className="font-poppins">Answers</Label>

                    <div className="grid grid-cols-2 gap-4 mt-3">
                      {question.answers.map((answer, index) => (
                        <div key={index} className="space-y-2">
                          <div className="flex items-center gap-2">
                            <Checkbox
                              checked={answer.is_correct}
                              onClick={() => {
                                const newQuestions = [...questions];
                                newQuestions[quesIndex].answers[
                                  index
                                ].is_correct =
                                  !newQuestions[quesIndex].answers[index]
                                    .is_correct;
                                setQuestions(newQuestions);
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
                              const newQuestions = [...questions];
                              newQuestions[quesIndex].answers[index].text =
                                e.target.value;
                              setQuestions(newQuestions);
                            }}
                          />
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="space-y-4">
              {currentQuizz.questions.map((question, quesIndex) => (
                <div
                  key={quesIndex}
                  className="border-2 border-aqua-blue rounded-md p-4 space-y-4"
                >
                  <p className="font-medium font-poppins text-lg">
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
          )}
        </CardContent>
      </Card>
      {isEditQuizz && (
        <Card className=" mt-6 font-poppins">
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
                              newAnswers.forEach((a) => (a.is_correct = false));
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
      )}
    </div>
  );
}
