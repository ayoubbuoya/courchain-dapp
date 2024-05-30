"use client";

import SplitLayout from "@/components/dashboard/splitLayout";
import { useSession } from "next-auth/react";
import Link from "next/link";
import { useRef, useState } from "react";
import { toast } from "react-toastify";
import { Button } from "@/components/ui/button";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  Check,
  ChevronsUpDown,
  Circle,
  DeleteIcon,
  LucideIcon,
  Trash2,
} from "lucide-react";
import { cn, fromNearToYocto } from "@/lib/utils";
import {
  categories,
  levels,
  Category as CategoryType,
  CONTRACTID,
} from "@/lib/config";
import Image from "next/image";
import { useWalletStore } from "@/stores/wallet";

export default function ImportCourse() {
  const { wallet, signedAccountId } = useWalletStore();
  const [step, setStep] = useState<number>(1);
  const [title, setTitle] = useState<string>("");
  const [isCategoryOpen, setIsCategoryOpen] = useState<boolean>(false);
  const [isLevelOpen, setIsLevelOpen] = useState<boolean>(false);
  const [category, setCategory] = useState<string>("");
  const [level, setLevel] = useState<string>("");
  const [description, setDescription] = useState<string>("");
  const [requirements, setRequirements] = useState<string[]>(["", ""]);
  const [objectives, setObjectives] = useState<string[]>(["", ""]);
  const [selectedPicture, setSelectedPicture] = useState<string>("");
  const [pictureFile, setPictureFile] = useState<File | null>(null);
  const [pictureUrl, setPictureUrl] = useState<string>("");
  const [price, setPrice] = useState<number>(0);

  const pictureRef = useRef<HTMLInputElement>(null);

  const handleNext = async () => {
    if (title === "") {
      toast.error("Please enter a title for your course");
      return;
    }

    if (step === 2 && description === "") {
      toast.error("Please enter a description for your course");
      return;
    }

    if (step === 3) {
      if (!pictureFile) {
        toast.error("Please upload a picture for your course");
        return;
      }
      // upload picture to ipfs and get the url
      const loadingToast = toast.loading("Uploading picture to ipfs...");
      try {
        const data = new FormData();
        data.append("file", pictureFile);

        const response = await fetch("/api/video/upload/ipfs", {
          method: "POST",
          body: data,
        });

        if (!response.ok) {
          toast.update(loadingToast, {
            type: "error",
            render: "Error Saving Picture to IPFS",
            isLoading: false,
            autoClose: 1000,
          });
          return;
        }

        const { success, message, ipfsResponse } = await response.json();

        if (!success) {
          toast.update(loadingToast, {
            type: "error",
            render: message,
            isLoading: false,
            autoClose: 1000,
          });
          return;
        }

        const imageUrl: string =
          process.env.NEXT_PUBLIC_GATEWAY_URL + ipfsResponse.IpfsHash;

        console.log("Image URL: ", imageUrl);
        setPictureUrl(imageUrl);

        toast.update(loadingToast, {
          type: "success",
          render: "Image Upladed to IPFS Successfully",
          isLoading: false,
          autoClose: 1000,
        });
      } catch (error) {
        console.error("Error uploading picture to ipfs : ", error);
        toast.error("Error uploading picture to ipfs", {
          autoClose: 2000,
        });
        return;
      }
    }

    if (step === 4 && category === "") {
      toast.error("Please select a category for your course");
      return;
    }

    if (step === 5 && level === "") {
      toast.error("Please select a level for your course");
      return;
    }

    // check if teh first 2 requirements are empty
    if (step === 6 && (requirements[0] === "" || requirements[1] === "")) {
      toast.error("Please enter at least 2 requirements for your course", {
        autoClose: 2000,
      });
      return;
    }

    if (step === 7 && (objectives[0] === "" || objectives[1] === "")) {
      toast.error("Please enter at least 2 objectives for your course", {
        autoClose: 2000,
      });
      return;
    }

    setStep(step + 1);
  };

  const handlePrevious = () => {
    setStep(step - 1);
  };

  // Function to update requirements state for a specific index
  const updateRequirement = (index: number, newValue: string) => {
    const newRequirements = [...requirements];
    newRequirements[index] = newValue;
    console.log("New Requirements in update func : ", newRequirements);
    setRequirements(newRequirements);
  };

  // Function to handle the change in input for a specific requirement
  const handleChange = (
    event: React.ChangeEvent<HTMLInputElement>,
    index: number
  ) => {
    const newValue = event.target.value;
    updateRequirement(index, newValue);
  };

  const handleObjectiveChange = (
    event: React.ChangeEvent<HTMLInputElement>,
    index: number
  ) => {
    const newValue = event.target.value;
    const newObjectives = [...objectives];
    newObjectives[index] = newValue;
    setObjectives(newObjectives);
  };

  const handleUploadPicture = () => {
    const file = pictureRef.current?.files?.[0];
    if (!file) return;
    setPictureFile(file);

    const imgUrl = URL.createObjectURL(file);
    setSelectedPicture(imgUrl);
  };

  const handleCreateCourse = async () => {
    console.log("Creating Course...");
    // loggin all the data
    console.log("Title : ", title);
    console.log("Description : ", description);
    console.log("Category : ", category);
    console.log("Level : ", level);
    console.log("Requirements : ", requirements);
    console.log("Objectives : ", objectives);
    console.log("Price : ", price);
    console.log("Picture URL : ", pictureUrl);
    const loadingToast = toast.loading("Creating Course...");
    // create course
    try {
      await wallet.callMethod({
        contractId: CONTRACTID,
        method: "create_course",
        args: {
          title,
          description,
          category,
          level,
          duration: "0",
          requirements,
          objectives,
          price: fromNearToYocto(price),
          picture: pictureUrl,
          with_ai: false,
          created_at: new Date().getTime(),
        },
        callbackUrl: `${process.env.NEXT_PUBLIC_BASE_URL}/dashboard/mentor/courses`,
      });

      toast.update(loadingToast, {
        type: "success",
        render: "Course Created Successfully",
        isLoading: false,
        autoClose: 1000,
      });

      // back to /dashboard
      setTimeout(() => {
        window.location.href = "/dashboard";
      }, 1000);
    } catch (error) {
      console.error("Error creating course : ", error);
      toast.error("Error creating course", {
        autoClose: 2000,
      });
      return;
    }
  };

  return (
    <div className="h-screen w-full flex flex-col  justify-start">
      <header
        style={{
          boxShadow:
            "rgba(0, 0, 0, 0.08) 0px 2px 4px, rgba(0, 0, 0, 0.08) 0px 4px 12px",
        }}
        className=" top-0 flex items-center justify-between w-full  bg-white px-5 py-5"
      >
        <Link href={"/"} className="flex items-center gap-1  px-4">
          <img className="max-w-8" src="/group-1171274801-1@2x.png" alt="" />

          <img className="max-w-28" src="/courchain.svg" alt="" />
        </Link>
        <Link
          href={"/dashboard"}
          className="capitalize font-poppins font-medium text-lg text-schemes-secondary hover:text-aqua-blue hover:text-xl duration-200 "
        >
          Back to Dashboard
        </Link>
      </header>
      <div className="h-full w-full  flex items-center justify-center overflow-y-auto overflow-x-hidden">
        {step === 1 && (
          <div className="flex flex-col justify-around items-center gap-8">
            <h1 className="text-3xl text-center  text-purple font-capriola font-bold">
              What is the title of your course ?
            </h1>

            <div className="custom-linear-border my-4 rounded-md w-full p-0">
              <input
                type="text"
                className="w-full px-5 py-3 text-lg font-normal text-left border-none outline-none rounded-md font-poppins text-black placeholder:text-lg placeholder:font-poppins"
                placeholder="e.g. Create your first web3 dapp"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
              />
            </div>
          </div>
        )}

        {step === 2 && (
          <div className="flex flex-col justify-around items-center gap-6">
            <h1 className="text-3xl text-center  text-purple font-capriola font-bold">
              What is the description of your course ?
            </h1>

            <div className="custom-linear-border my-4 rounded-md w-full p-0">
              <textarea
                className="w-[55vw] h-[45vh] px-5 py-3 text-lg
                 font-medium text-left border-none outline-none rounded-md font-poppins text-schemes-secondary placeholder:text-lg placeholder:font-normal"
                placeholder="e.g. Learn how to build your first web3 dapp with solidity and web3.js"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
              />
            </div>
          </div>
        )}
        {/* step 3 to sleet course selectedPicture  */}
        {step === 3 && (
          <div className="flex flex-col justify-around items-center gap-5">
            <h1 className="text-3xl text-center  text-purple font-capriola font-bold">
              Upload a picture for your course
            </h1>

            <div className="custom-linear-border my-4 rounded-md max-w-[70%] p-0">
              <div className="px-10 pt-5">
                <input
                  ref={pictureRef}
                  onChange={handleUploadPicture}
                  accept="image/*"
                  type="file"
                  className="hidden w-full px-5 py-3 text-lg font-normal text-left border-none outline-none rounded-md font-poppins text-black placeholder:text-lg placeholder:font-poppins"
                />

                {/* <h5 className="capitalize">Picture preview</h5> */}
                <div className="flex flex-col items-center justify-around  gap-4">
                  <Image
                    src={selectedPicture || "/course-placeholder.svg"}
                    alt="Course Picture"
                    width={300}
                    height={200}
                    className="w-[60vw] object-cover h-[40vh] rounded-md"
                  />

                  <button
                    onClick={() => {
                      pictureRef.current?.click();
                    }}
                    className="font-poppins font-medium text-white text-lg bg-aqua-blue bg-opacity-85 py-2 px-5 rounded-xl mb-5 text-center w-full"
                  >
                    Click to upload your picture
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

        {step === 4 && (
          <div className="flex flex-col justify-around items-center gap-10">
            <h1 className="text-3xl text-center  text-purple font-capriola font-bold">
              What category best fits the knowledge you'll share ?
            </h1>

            <Popover open={isCategoryOpen} onOpenChange={setIsCategoryOpen}>
              <PopoverTrigger asChild>
                <Button
                  variant="outline"
                  role="combobox"
                  aria-expanded={isCategoryOpen}
                  className="w-full justify-between outline-aqua-blue focus-visible:ring-0 focus-visible:outline-aqua-blue"
                >
                  {category
                    ? categories.find((cat) => cat.value === category)?.label
                    : "Select Category..."}
                  <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-[30vw] p-0">
                <Command className="font-poppins ">
                  <CommandInput placeholder="Search category..." />
                  <CommandList>
                    <CommandEmpty>No category found.</CommandEmpty>
                    <CommandGroup>
                      {categories.map((cat) => (
                        <CommandItem
                          key={cat.value}
                          value={cat.value}
                          onSelect={(value) => {
                            setCategory(value === category ? "" : value);
                            setIsCategoryOpen(false);
                          }}
                        >
                          <Check
                            className={cn(
                              "mr-2 h-4 w-4",
                              category === cat.value
                                ? "opacity-100"
                                : "opacity-0"
                            )}
                          />
                          {cat.label}
                        </CommandItem>
                      ))}
                    </CommandGroup>
                  </CommandList>
                </Command>
              </PopoverContent>
            </Popover>
          </div>
        )}
        {/* step 3 to select level  */}
        {step === 5 && (
          <div className="flex flex-col justify-around items-center gap-10">
            <h1 className="text-3xl text-center  text-purple font-capriola font-bold">
              What level of knowledge will you share ?
            </h1>

            <Popover open={isLevelOpen} onOpenChange={setIsLevelOpen}>
              <PopoverTrigger asChild>
                <Button
                  variant="outline"
                  role="combobox"
                  aria-expanded={isLevelOpen}
                  className="w-full justify-between outline-aqua-blue focus-visible:ring-0 focus-visible:outline-aqua-blue"
                >
                  {level
                    ? levels.find((cat) => cat.value === level)?.label
                    : "Select Level..."}
                  <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-[30vw] p-0">
                <Command className="font-poppins ">
                  <CommandInput placeholder="Search level..." />
                  <CommandList>
                    <CommandEmpty>No level found.</CommandEmpty>
                    <CommandGroup>
                      {levels.map((cat) => (
                        <CommandItem
                          key={cat.value}
                          value={cat.value}
                          onSelect={(value) => {
                            setLevel(value === category ? "" : value);
                            setIsLevelOpen(false);
                          }}
                        >
                          <Check
                            className={cn(
                              "mr-2 h-4 w-4",
                              category === cat.value
                                ? "opacity-100"
                                : "opacity-0"
                            )}
                          />
                          {cat.label}
                        </CommandItem>
                      ))}
                    </CommandGroup>
                  </CommandList>
                </Command>
              </PopoverContent>
            </Popover>
          </div>
        )}
        {/* requirements */}
        {step === 6 && (
          <div className="flex flex-col md:flex-row w-full  px-10 items-center gap-8">
            <div className="h-full flex flex-col items-center justify-around gap-5">
              <h1 className="text-3xl text-center  text-purple font-capriola font-bold">
                What are the requirements or prerequisites for taking your
                course?
              </h1>

              <p className="text-base font-poppins font-normal text-schemes-secondary text-center">
                List the required skills learners should have prior to taking
                your course.
              </p>
            </div>

            <div className="mt-8 flex flex-col items-start gap-6 w-[70%] ">
              <div className="w-full flex items-center group">
                <input
                  type="text"
                  placeholder="e.g. Basic knowledge of blockchain and web3.js"
                  className="w-[95%]  text-base h-14 font-poppins font-normal outline-none  placeholder:text-base border-2 border-aqua-blue  px-5 rounded-l-sm "
                  value={requirements[0]}
                  onChange={(e) => handleChange(e, 0)}
                />
                <div className=" hidden group-hover:flex border-2 h-14 px-4  rounded-r-sm border-l-0 border-aqua-blue  items-center ">
                  <Trash2 className="w-6 h-6 text-aqua-blue  cursor-not-allowed" />
                </div>
              </div>

              <div className="w-full flex items-center group">
                <input
                  type="text"
                  placeholder="e.g. Basic knowledge of blockchain and web3.js"
                  className="w-[95%]  text-base h-14 font-poppins font-normal outline-none  placeholder:text-base border-2 border-aqua-blue  px-5 rounded-l-sm "
                  value={requirements[1]}
                  onChange={(e) => handleChange(e, 1)}
                />
                <div className=" hidden group-hover:flex border-2 h-14 px-4  rounded-r-sm border-l-0 border-aqua-blue  items-center ">
                  <Trash2 className="w-6 h-6 text-aqua-blue  cursor-not-allowed" />
                </div>
              </div>

              {requirements.length > 2 &&
                requirements.slice(2).map((req, index) => (
                  <div className="w-full flex items-center group">
                    <input
                      key={index}
                      type="text"
                      placeholder="e.g. Basic knowledge of blockchain and web3.js"
                      className="w-[95%]  text-base h-14 font-poppins font-normal outline-none  placeholder:text-base border-2 border-aqua-blue  px-5 rounded-l-sm "
                      value={req}
                      onChange={(e) => handleChange(e, index)}
                    />
                    <div className=" hidden group-hover:flex border-2 h-14 px-4  rounded-r-sm border-l-0 border-aqua-blue  items-center ">
                      <Trash2
                        onClick={() => {
                          const newRequirements = [...requirements];
                          newRequirements.splice(index, 1);
                          setRequirements(newRequirements);
                        }}
                        className="w-6 h-6 text-aqua-blue  cursor-pointer"
                      />
                    </div>
                  </div>
                ))}

              {requirements.length < 4 && (
                <button
                  onClick={() => setRequirements([...requirements, ""])}
                  className="font-poppins text-xl font-medium text-aqua-blue ml-2"
                >
                  Add more requirement
                </button>
              )}
            </div>
          </div>
        )}

        {step === 7 && (
          <div className="flex flex-col md:flex-row w-full  px-10 items-center gap-8">
            <div className="h-full flex flex-col items-center justify-around gap-5">
              <h1 className="text-3xl text-center  text-purple font-capriola font-bold">
                What will students learn in your course?
              </h1>

              <p className="text-base font-poppins font-normal text-schemes-secondary text-center">
                You must enter at least 2 learning objectives or outcomes that
                learners can expect to achieve after completing your course.
              </p>
            </div>

            <div className="mt-8 flex flex-col items-start gap-6 w-[70%] ">
              <div className="w-full flex items-center group">
                <input
                  type="text"
                  placeholder="e.g. Basic knowledge of blockchain and web3.js"
                  className="w-[95%]  text-base h-14 font-poppins font-normal outline-none  placeholder:text-base border-2 border-aqua-blue  px-5 rounded-l-sm "
                  value={objectives[0]}
                  onChange={(e) => handleObjectiveChange(e, 0)}
                />
                <div className=" hidden group-hover:flex border-2 h-14 px-4  rounded-r-sm border-l-0 border-aqua-blue  items-center ">
                  <Trash2 className="w-6 h-6 text-aqua-blue  cursor-not-allowed" />
                </div>
              </div>

              <div className="w-full flex items-center group">
                <input
                  type="text"
                  placeholder="e.g. Basic knowledge of blockchain and web3.js"
                  className="w-[95%]  text-base h-14 font-poppins font-normal outline-none  placeholder:text-base border-2 border-aqua-blue  px-5 rounded-l-sm "
                  value={objectives[1]}
                  onChange={(e) => handleObjectiveChange(e, 1)}
                />
                <div className=" hidden group-hover:flex border-2 h-14 px-4  rounded-r-sm border-l-0 border-aqua-blue  items-center ">
                  <Trash2 className="w-6 h-6 text-aqua-blue  cursor-not-allowed" />
                </div>
              </div>

              {objectives.length > 2 &&
                objectives.slice(2).map((req, index) => (
                  <div className="w-full flex items-center group">
                    <input
                      key={index}
                      type="text"
                      placeholder="e.g. Basic knowledge of blockchain and web3.js"
                      className="w-[95%]  text-base h-14 font-poppins font-normal outline-none  placeholder:text-base border-2 border-aqua-blue  px-5 rounded-l-sm "
                      value={req}
                      onChange={(e) => handleObjectiveChange(e, index + 2)}
                    />
                    <div className=" hidden group-hover:flex border-2 h-14 px-4  rounded-r-sm border-l-0 border-aqua-blue  items-center ">
                      <Trash2
                        onClick={() => {
                          const newObjectives = [...objectives];
                          newObjectives.splice(index + 2, 1);
                          setObjectives(newObjectives);
                        }}
                        className="w-6 h-6 text-aqua-blue  cursor-pointer"
                      />
                    </div>
                  </div>
                ))}

              {objectives.length < 4 && (
                <button
                  onClick={() => setObjectives([...objectives, ""])}
                  className="font-poppins text-xl font-medium text-aqua-blue ml-2"
                >
                  Add more objective
                </button>
              )}
            </div>
          </div>
        )}
        {/* step 8 to select price */}
        {step === 8 && (
          <div className="flex flex-col justify-around items-center gap-10">
            <h1 className="text-3xl text-center  text-purple font-capriola font-bold">
              What price do you want to set for your course ?
            </h1>

            <div className="custom-linear-border my-4 rounded-md w-full p-0">
              <input
                id="price"
                type="number"
                className="w-full text-lg py-2 font-poppins font-medium  text-schemes-secondary outline-none placeholder:text-base  px-5 border-none rounded-md "
                placeholder="e.g. 50"
                value={price}
                onChange={(e) => setPrice(Number(e.target.value))}
              />
            </div>
          </div>
        )}
      </div>
      <div
        style={{
          boxShadow:
            "rgba(0, 0, 0, 0.08) 0px -2px 4px, rgba(0, 0, 0, 0.08) 0px -4px 12px",
        }}
        className="flex items-center justify-between w-full  bg-white px-5 py-4"
      >
        <button
          onClick={handlePrevious}
          className="px-4 py-3 text-xl font-medium duration-500 bg-white border rounded-sm font-poppins text-aqua-blue border-aqua-blue hover:bg-aqua-blue hover:text-white "
        >
          Previous
        </button>
        {step === 8 ? (
          <button
            onClick={handleCreateCourse}
            className="px-4 py-3 text-xl font-medium text-white duration-500 border border-white rounded-sm  font-poppins bg-aqua-blue hover:bg-white hover:text-aqua-blue hover:border-aqua-blue"
          >
            Create Course
          </button>
        ) : (
          <button
            onClick={handleNext}
            className="px-4 py-3 text-xl font-medium text-white duration-500 border border-white rounded-sm  font-poppins bg-aqua-blue hover:bg-white hover:text-aqua-blue hover:border-aqua-blue"
          >
            Continue
          </button>
        )}
      </div>
    </div>
  );
}
