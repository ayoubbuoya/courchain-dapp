import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { CONTRACTID } from "@/lib/config";
import { FullCourse, FullLesson, FullModule } from "@/lib/types";
import { useWalletStore } from "@/stores/wallet";
import { create } from "domain";
import { Pencil, Plus } from "lucide-react";
import { AppRouterInstance } from "next/dist/shared/lib/app-router-context.shared-runtime";
import Image from "next/image";
import {
  ReadonlyURLSearchParams,
  usePathname,
  useRouter,
  useSearchParams,
} from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { toast } from "react-toastify";

export default function RightSide({
  course,
  setCourse,
  lessonOrder,
  moduleOrder,
  currentLesson,
  quizzParam,
  setCurrentLesson,
  handleLessonOrderChange,
  handleModuleOrderChange,
  handleQuizzSelect,
}: {
  course: FullCourse | null;
  setCourse: (course: FullCourse) => void;
  lessonOrder: number;
  moduleOrder: number;
  quizzParam: string | null;
  currentLesson: FullLesson | null;
  setCurrentLesson: (lesson: FullLesson) => void;
  handleLessonOrderChange: (order: number) => void;
  handleModuleOrderChange: (order: number) => void;
  handleQuizzSelect: () => void;
}) {
  const { wallet } = useWalletStore();
  const [isAddModuleOpen, setIsAddModuleOpen] = useState<boolean>(false);
  const [isAddLessonOpen, setIsAddLessonOpen] = useState<boolean>(false);
  const [isEditLessonOpen, setIsEditLessonOpen] = useState<boolean>(false);
  const [isAddQuizzOpen, setIsAddQuizzOpen] = useState<boolean>(false);
  const [isEditQuizzOpen, setIsEditQuizzOpen] = useState<boolean>(false);
  const [moduleTitle, setModuleTitle] = useState<string>("");
  const [moduleDescription, setModuleDescription] = useState<string>("");
  const [lessonTitle, setLessonTitle] = useState<string>("");
  const [lessonDescription, setLessonDescription] = useState<string>("");
  const [quizzTitle, setQuizzTitle] = useState<string>("");
  const [quizzDescription, setQuizzDescription] = useState<string>("");

  const [modules, setModules] = useState<FullModule[]>(course?.modules || []);
  const [currentModuleLessons, setCurrentModuleLessons] = useState<
    FullLesson[]
  >(
    course && course.modules && course.modules.length > 0
      ? course?.modules[0].lessons
      : []
  );

  if (!course) {
    return null;
  }

  const dragLesson = useRef<number>(0);
  const draggedOverLesson = useRef<number>(0);

  const handleSort = () => {
    const currentModuleLessonsClone = [...currentModuleLessons];
    const temp = currentModuleLessonsClone[dragLesson.current];
    currentModuleLessonsClone[dragLesson.current] =
      currentModuleLessonsClone[draggedOverLesson.current];
    currentModuleLessonsClone[draggedOverLesson.current] = temp;
    setCurrentModuleLessons(currentModuleLessonsClone);
  };

  const handleCreateNewModule = async () => {
    if (!moduleTitle || !moduleDescription) {
      toast.error("Please fill in all fields");
      return;
    }

    if (!course) {
      toast.error("An error occurred. Please try again.");
      return;
    }

    const loadingToastId = toast.loading("Creating new  module...");

    await wallet.callMethod({
      contractId: CONTRACTID,
      method: "create_module",
      args: {
        course_id: course.id,
        title: moduleTitle,
        description: moduleDescription,
        status: "",
        with_ai: false,
        order:
          course.modules && course.modules.length > 0
            ? course.modules.length + 1
            : 1,
        created_at: new Date().getTime(),
      },
    });

    toast.update(loadingToastId, {
      render: "Module created successfully",
      type: "success",
      isLoading: false,
      autoClose: 3000,
    });
  };

  const handleSaveNewLesson = async (moduleId: number) => {
    if (!lessonTitle) {
      toast.error("PLease fill in title field");
      return;
    }

    const loadingToastId = toast.loading("Creating new lesson...");

    const order =
      course.modules[moduleOrder - 1].lessons.length > 0
        ? course.modules[moduleOrder - 1].lessons.length + 1
        : 1;

    console.log("order : ", order);

    await wallet.callMethod({
      contractId: CONTRACTID,
      method: "create_lesson",
      args: {
        module_id: moduleId,
        title: lessonTitle,
        description: lessonDescription,
        video_url: "",
        article: "",
        with_ai: false,
        order,
        created_at: new Date().getTime(),
      },
    });

    toast.update(loadingToastId, {
      render: "Lesson created successfully",
      type: "success",
      isLoading: false,
      autoClose: 3000,
    });
  };

  const handleSaveNewQuizz = async (moduleId: number) => {
    if (!quizzTitle) {
      toast.error("PLease fill in title field");
      return;
    }

    const loadingToastId = toast.loading("Creating new quizz...");

    await wallet.callMethod({
      contractId: CONTRACTID,
      method: "create_quizz",
      args: {
        module_id: moduleId,
        title: quizzTitle,
        description: quizzDescription,
        created_at: new Date().getTime(),
      },
    });

    toast.update(loadingToastId, {
      render: "Quizz created successfully",
      type: "success",
      isLoading: false,
      autoClose: 3000,
    });
  };

  const handleUpdateLessonDetails = async () => {
    console.log("currentLesson : ", currentLesson);
    if (!currentLesson) {
      toast.error("An error occurred. Please try again.");
      return;
    }
    const loadingToastId = toast.loading("Updating lesson details...");

    await wallet.callMethod({
      contractId: CONTRACTID,
      method: "update_lesson_details",
      args: {
        lesson_id: currentLesson.id,
        title: currentLesson.title,
        description: currentLesson.description,
        updated_at: new Date().getTime(),
      },
    });

    toast.update(loadingToastId, {
      render: "Lesson updated successfully",
      type: "success",
      isLoading: false,
      autoClose: 3000,
    });
  };

  const handleDeleteLesson = async () => {

    if (!currentLesson) {
      toast.error("An error occurred. Please try again.");
      return;
    }

    const loadingToastId = toast.loading("Deleting lesson...");

    await wallet.callMethod({
      contractId: CONTRACTID,
      method: "delete_lesson",
      args: {
        lesson_id: currentLesson.id,
      },
    });

    toast.update(loadingToastId, {
      render: "Lesson deleted successfully",
      type: "success",
      isLoading: false,
      autoClose: 3000,
    });
  }

  return (
    <div className="right-side pr-5">
      <div className="flex flex-col items-start justify-between gap-4">
        <div className="flex justify-between items-center w-full">
          <h1 className="text-2xl font-semibold text-purple">Course Content</h1>
          <Plus
            onClick={() => {
              setIsAddModuleOpen(true);
            }}
            size={26}
            className="cursor-pointer text-aqua-blue"
          />
        </div>
        <Dialog open={isAddModuleOpen} onOpenChange={setIsAddModuleOpen}>
          <DialogContent className="sm:max-w-[40%]">
            <DialogHeader>
              <DialogTitle className="text-xl font-medium capitalize text-aqua-blue font-poppins ">
                Create new module
              </DialogTitle>
              <DialogDescription className="text-schemes-secondary">
                Add a new module to your course. Click save when you're done.
              </DialogDescription>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="grid items-center grid-cols-4 gap-4">
                <Label
                  htmlFor="module-title"
                  className="text-base font-normal text-right text-aqua-blue font-poppins "
                >
                  Module Title
                </Label>
                <input
                  id="module-title"
                  value={moduleTitle}
                  onChange={(e) => setModuleTitle(e.target.value)}
                  className="col-span-3 outline-aqua-blue py-3 border border-aqua-blue rounded-lg px-3 font-poppins font-normal text-[0.8rem] leading-5 text-schemes-primary"
                />
              </div>
              <div className="grid items-center grid-cols-4 gap-4">
                <Label
                  htmlFor="module-description"
                  className="text-base font-normal text-right text-aqua-blue font-poppins "
                >
                  Description
                </Label>
                <textarea
                  id="module-description"
                  value={moduleDescription}
                  onChange={(e) => setModuleDescription(e.target.value)}
                  className="col-span-3 outline-aqua-blue py-3 border border-aqua-blue rounded-lg px-3 font-poppins font-normal text-[0.8rem] leading-5 text-schemes-primary"
                />
              </div>
            </div>
            <DialogFooter>
              <Button
                type="button"
                onClick={handleCreateNewModule}
                className=" bg-aqua-blue outline-aqua-blue text-white rounded-lg px-5 py-2 font-poppins font-normal text-[0.88rem] leading-5 duration-700 text-center hover:bg-white hover:text-aqua-blue hover:border hover:border-aqua-blue"
              >
                Save changes
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
        <Dialog open={isEditLessonOpen} onOpenChange={setIsEditLessonOpen}>
          <DialogContent className="sm:max-w-[40%]">
            <DialogHeader>
              <DialogTitle className="text-xl font-medium capitalize text-aqua-blue font-poppins ">
                Edit lesson
              </DialogTitle>
              <DialogDescription className="text-schemes-secondary">
                Edit this lesson. Click save when you're done.
              </DialogDescription>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="grid items-center grid-cols-4 gap-4">
                <Label
                  htmlFor="lesson-title"
                  className="text-base font-normal text-right text-aqua-blue font-poppins "
                >
                  Lesson Title
                </Label>
                <input
                  id="lesson-title"
                  value={currentLesson?.title}
                  onChange={(e) => {
                    if (!currentLesson) return;
                    setCurrentLesson({
                      ...currentLesson,
                      title: e.target.value,
                    });
                  }}
                  className="col-span-3 outline-aqua-blue py-3 border border-aqua-blue rounded-lg px-3 font-poppins font-normal text-[0.8rem] leading-5 text-schemes-primary"
                />
              </div>
              <div className="grid items-center grid-cols-4 gap-4">
                <Label
                  htmlFor="lesson-description"
                  className="text-base font-normal text-right text-aqua-blue font-poppins "
                >
                  Description
                </Label>
                <textarea
                  id="lesson-description"
                  value={currentLesson?.description}
                  onChange={(e) => {
                    if (!currentLesson) return;
                    setCurrentLesson({
                      ...currentLesson,
                      description: e.target.value,
                    });
                  }}
                  className="col-span-3 outline-aqua-blue py-3 border border-aqua-blue rounded-lg px-3 font-poppins font-normal text-[0.8rem] leading-5 text-schemes-primary"
                />
              </div>
            </div>
            <DialogFooter className=" w-full flex flex-row items-center justify-between sm:justify-between">
              <Button
                type="button"
                className=" bg-red-500 hover:bg-red-500 outline-red-500 text-white rounded-lg px-5 py-2 font-poppins font-normal text-[0.88rem] leading-5 duration-700 text-center "
                onClick={handleDeleteLesson}
              >
                Delete Lesson
              </Button>
              <Button
                type="button"
                className=" bg-aqua-blue outline-aqua-blue text-white rounded-lg px-5 py-2 font-poppins font-normal text-[0.88rem] leading-5 duration-700 text-center hover:bg-white hover:text-aqua-blue hover:border hover:border-aqua-blue"
                onClick={handleUpdateLessonDetails}
              >
                Save changes
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
        <Dialog open={isAddQuizzOpen} onOpenChange={setIsAddQuizzOpen}>
          <DialogContent className="sm:max-w-[40%]">
            <DialogHeader>
              <DialogTitle className="text-xl font-medium capitalize text-aqua-blue font-poppins ">
                Create new quizz
              </DialogTitle>
              <DialogDescription className="text-schemes-secondary">
                Add a new quizz to your course. Click save when you're done.
              </DialogDescription>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="grid items-center grid-cols-4 gap-4">
                <Label
                  htmlFor="quizz-title"
                  className="text-base font-normal text-right text-aqua-blue font-poppins "
                >
                  Quizz Title
                </Label>
                <input
                  id="quizz-title"
                  className="col-span-3 outline-aqua-blue py-3 border border-aqua-blue rounded-lg px-3 font-poppins font-normal text-[0.8rem] leading-5 text-schemes-primary"
                  value={quizzTitle}
                  onChange={(e) => setQuizzTitle(e.target.value)}
                />
              </div>
              <div className="grid items-center grid-cols-4 gap-4">
                <Label
                  htmlFor="quizz-description"
                  className="text-base font-normal text-right text-aqua-blue font-poppins "
                >
                  Description
                </Label>
                <textarea
                  id="quizz-description"
                  className="col-span-3 outline-aqua-blue py-3 border border-aqua-blue rounded-lg px-3 font-poppins font-normal text-[0.8rem] leading-5 text-schemes-primary"
                  value={quizzDescription}
                  onChange={(e) => setQuizzDescription(e.target.value)}
                />
              </div>
            </div>
            <DialogFooter>
              <Button
                type="button"
                onClick={() => {
                  handleSaveNewQuizz(course.modules[moduleOrder - 1].id);
                }}
                className=" bg-aqua-blue outline-aqua-blue text-white rounded-lg px-5 py-2 font-poppins font-normal text-[0.88rem] leading-5 duration-700 text-center hover:bg-white hover:text-aqua-blue hover:border hover:border-aqua-blue"
              >
                Save changes
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
        {course?.modules.map((module) => (
          <div
            key={module.id}
            className="w-full custom-linear-border rounded-2xl"
          >
            <div className="flex items-center space-x-4 p-3 rounded-2xl overflow-hidden w-full">
              <div className="w-full overflow-hidden">
                <div className="w-full overflow-hidden">
                  <div className="w-full overflow-hidden flex items-center justify-between">
                    <h2 className="text-lg font-semibold truncate text-aqua-blue">
                      {module.title}
                    </h2>
                    <button
                      onClick={() => handleModuleOrderChange(module.order)}
                      className="text-sm font-semibold text-aqua-blue"
                    >
                      <Image
                        width={20}
                        height={20}
                        className={`w-4 h-4 duration-1000 ${
                          module.order === moduleOrder
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
                {module.order === moduleOrder && (
                  <div className="w-full flex flex-col justify-between items-start gap-3 pl-5 py-4">
                    {module.lessons.map((lesson, index) => (
                      <div
                        key={lesson.id}
                        className="group w-full cursor-pointer flex justify-between items-center"
                      >
                        <h2
                          onClick={() => {
                            handleLessonOrderChange(lesson.order);
                          }}
                          className={`text-lg ${
                            lesson.order === lessonOrder && !quizzParam
                              ? "text-aqua-blue font-semibold"
                              : "text-dimgray-700 font-medium "
                          }`}
                        >
                          {lesson.title}
                        </h2>
                        <Pencil
                          size={24}
                          onClick={() => {
                            // goToEditLesson(module.order, lesson.order);
                            setIsEditLessonOpen(true);
                            setCurrentLesson(lesson);
                          }}
                          className="hidden group-hover:block text-aqua-blue"
                        />
                      </div>
                    ))}
                    {module.quizz && (
                      <div className="group w-full cursor-pointer flex justify-between items-center">
                        <h2
                          onClick={handleQuizzSelect}
                          className={`text-lg  ${
                            quizzParam === "true"
                              ? "text-aqua-blue font-semibold"
                              : "text-dimgray-700 font-medium"
                          } `}
                        >
                          {module.quizz.title}
                        </h2>
                        <Pencil
                          size={24}
                          onClick={() => {
                            // goToEditLesson(module.order, lesson.order);
                            setIsEditQuizzOpen(true);
                          }}
                          className="hidden group-hover:block text-aqua-blue"
                        />
                      </div>
                    )}

                    <div className="w-full cursor-pointer flex justify-start items-center gap-20 ">
                      <button
                        onClick={() => {
                          setIsAddLessonOpen(true);
                        }}
                        className={`text-lg  tracking-wider text-left capitalize   py-1 text-purple font-semibold`}
                      >
                        Add lesson
                      </button>

                      {!module.quizz && (
                        <button
                          onClick={() => {
                            setIsAddQuizzOpen(true);
                          }}
                          className="text-lg capitalize  tracking-wider text-left   py-1 text-purple font-semibold"
                        >
                          Add quizz
                        </button>
                      )}

                      <Dialog
                        open={isAddLessonOpen}
                        onOpenChange={setIsAddLessonOpen}
                      >
                        <DialogContent className="sm:max-w-[40%]">
                          <DialogHeader>
                            <DialogTitle className="text-xl font-medium capitalize text-aqua-blue font-poppins ">
                              Create new lesson
                            </DialogTitle>
                            <DialogDescription className="text-schemes-secondary">
                              Add a new lesson to your course. Click save when
                              you're done.
                            </DialogDescription>
                          </DialogHeader>
                          <div className="grid gap-4 py-4">
                            <div className="grid items-center grid-cols-4 gap-4">
                              <Label
                                htmlFor="lesson-title"
                                className="text-base font-normal text-right text-aqua-blue font-poppins "
                              >
                                Lesson Title
                              </Label>
                              <input
                                id="lesson-title"
                                value={lessonTitle}
                                onChange={(e) => setLessonTitle(e.target.value)}
                                className="col-span-3 outline-aqua-blue py-3 border border-aqua-blue rounded-lg px-3 font-poppins font-normal text-[0.8rem] leading-5 text-schemes-primary"
                              />
                            </div>
                            <div className="grid items-center grid-cols-4 gap-4">
                              <Label
                                htmlFor="lesson-description"
                                className="text-base font-normal text-right text-aqua-blue font-poppins "
                              >
                                Description
                              </Label>
                              <textarea
                                id="lesson-description"
                                value={lessonDescription}
                                onChange={(e) =>
                                  setLessonDescription(e.target.value)
                                }
                                className="col-span-3 outline-aqua-blue py-3 border border-aqua-blue rounded-lg px-3 font-poppins font-normal text-[0.8rem] leading-5 text-schemes-primary"
                              />
                            </div>
                          </div>
                          <DialogFooter>
                            <Button
                              type="button"
                              onClick={() => {
                                handleSaveNewLesson(module.id);
                              }}
                              className=" bg-aqua-blue outline-aqua-blue text-white rounded-lg px-5 py-2 font-poppins font-normal text-[0.88rem] leading-5 duration-700 text-center hover:bg-white hover:text-aqua-blue hover:border hover:border-aqua-blue"
                            >
                              Save changes
                            </Button>
                          </DialogFooter>
                        </DialogContent>
                      </Dialog>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
