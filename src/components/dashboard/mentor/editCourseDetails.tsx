import { useWalletStore } from "@/stores/wallet";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  ArrowUpCircle,
  CheckCircle2,
  Circle,
  HelpCircle,
  LucideIcon,
  XCircle,
} from "lucide-react";
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
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { CONTRACTID } from "@/lib/config";
import { FullCourse } from "@/lib/types";
import { cn, fromNearToYocto, fromYoctoToNear } from "@/lib/utils";
import { useState } from "react";
import { toast } from "react-toastify";

type Category = {
  value: string;
  label: string;
  icon: LucideIcon;
};

const categories: Category[] = [
  {
    value: "web development",
    label: "Web Development",
    icon: Circle,
  },
  {
    value: "blockchain",
    label: "Blockchain",
    icon: Circle,
  },
  {
    value: "cloud computing",
    label: "Cloud Computing",
    icon: Circle,
  },
  {
    value: "cybersecurity",
    label: "Cybersecurity",
    icon: Circle,
  },
  {
    value: "artificial intelligence",
    label: "Artificial Intelligence",
    icon: Circle,
  },
  {
    value: "machine learning",
    label: "Machine Learning",
    icon: Circle,
  },
  {
    value: "software development",
    label: "Software Development",
    icon: Circle,
  },
  {
    value: "game development",
    label: "Game Development",
    icon: Circle,
  },
  {
    value: "mobile development",
    label: "Mobile Development",
    icon: Circle,
  },
  {
    value: "data science",
    label: "Data Science",
    icon: Circle,
  },
  {
    value: "design",
    label: "Design",
    icon: Circle,
  },
];

export default function EditCourseDetails({ course }: { course: FullCourse }) {
  const [title, setTitle] = useState(course.title);
  const [description, setDescription] = useState(course.description);
  const [price, setPrice] = useState(fromYoctoToNear(course.price));
  const { wallet, signedAccountId } = useWalletStore();
  const [open, setOpen] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState<Category | null>(
    categories.find(
      (cat) => cat.value.toLowerCase() === course.category.toLowerCase()
    ) || null
  );

  const handleUpdateCourseDetails = async () => {
    const loadingToast = toast.loading("Updating course details...");
    try {
      console.log("Price in yocto", fromNearToYocto(price));
      const response = await wallet.callMethod({
        contractId: CONTRACTID,
        method: "update_course_details",
        args: {
          course_id: course.id,
          title,
          description,
          price: fromNearToYocto(price),
          category: selectedCategory?.value || course.category,
          updated_at: new Date().getTime(),
        },
      });

      const success = Boolean(
        Buffer.from(response.status.SuccessValue, "base64").toString(
          "utf-8"
        ) === "true"
      );

      if (!success) {
        toast.update(loadingToast, {
          type: "error",
          render: "An error occurred while updating course details",
          autoClose: 1000,
          isLoading: false,
        });
      }

      toast.update(loadingToast, {
        type: "success",
        render: "Course details updated successfully",
        autoClose: 1000,
        isLoading: false,
      });

      // refresh the page
      setTimeout(() => {
        window.location.reload();
      }, 500);
    } catch (error) {
      console.error(error);
      toast.update(loadingToast, {
        type: "error",
        render: "An error occurred while updating course details",
        autoClose: 1000,
        isLoading: false,
      });
    }
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button className="bg-aqua-blue outline-aqua-blue text-white rounded-full px-5 py-2 font-poppins duration-700 font-normal text-[0.88rem] leading-5 text-center hover:bg-white hover:text-aqua-blue hover:border hover:border-aqua-blue ">
          Edit Course Details
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[38%]">
        <DialogHeader>
          <DialogTitle className="text-xl font-medium capitalize text-aqua-blue font-poppins ">
            Edit course details
          </DialogTitle>
          <DialogDescription className="text-schemes-secondary">
            Make changes to your course details here. Click save when you're
            done.
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="grid items-center grid-cols-4 gap-4">
            <Label
              htmlFor="title"
              className="text-base font-normal text-right text-aqua-blue font-poppins "
            >
              Course Title
            </Label>
            <input
              id="title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="col-span-3 outline-aqua-blue py-3 border border-aqua-blue rounded-lg px-3 font-poppins font-normal text-[0.8rem] leading-5 text-schemes-primary"
            />
          </div>
          <div className="grid items-center grid-cols-4 gap-4">
            <Label
              htmlFor="description"
              className="text-base font-normal text-right text-aqua-blue font-poppins "
            >
              Description
            </Label>
            <textarea
              id="description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="col-span-3 outline-aqua-blue py-3 border border-aqua-blue rounded-lg px-3 font-poppins font-normal text-[0.8rem] leading-5 text-schemes-primary"
            />
          </div>
          {/* Price Field */}
          <div className="grid items-center grid-cols-4 gap-4">
            <Label
              htmlFor="price"
              className="text-base font-normal text-right text-aqua-blue font-poppins "
            >
              Course Price
            </Label>
            <input
              id="price"
              type="number"
              value={price}
              onChange={(e) => setPrice(parseFloat(e.target.value))}
              className="col-span-3 outline-aqua-blue py-3 border border-aqua-blue rounded-lg px-3 font-poppins font-normal text-[0.8rem] leading-5 text-schemes-primary"
            />
          </div>
          <div className="grid items-center grid-cols-4 gap-4">
            <Label
              htmlFor="category"
              className="capitalize text-base font-normal text-right text-aqua-blue font-poppins "
            >
              category
            </Label>
            <Popover open={open} onOpenChange={setOpen}>
              <PopoverTrigger asChild>
                <Button
                  variant="outline"
                  size="sm"
                  className="col-span-3 justify-start text-schemes-secondary focus-within:outline-aqua-blue focus-visible:ring-aqua-blue  font-poppins text-sm outline-aqua-blue border-aqua-blue rounded-lg"
                >
                  {selectedCategory ? (
                    <>
                      <selectedCategory.icon className="mr-2 h-4 w-4 shrink-0" />
                      {selectedCategory.label}
                    </>
                  ) : (
                    <>+ Set Category</>
                  )}
                </Button>
              </PopoverTrigger>
              <PopoverContent className="p-0" side="right" align="start">
                <Command>
                  <CommandInput placeholder="Change status..." />
                  <CommandList>
                    <CommandEmpty>No results found.</CommandEmpty>
                    <CommandGroup>
                      {categories.map((cat) => (
                        <CommandItem
                          key={cat.value}
                          value={cat.value}
                          onSelect={(value) => {
                            setSelectedCategory(
                              categories.find(
                                (priority) => priority.value === value
                              ) || null
                            );
                            setOpen(false);
                          }}
                        >
                          <cat.icon
                            className={cn(
                              "mr-2 h-4 w-4",
                              cat.value === selectedCategory?.value
                                ? "opacity-100"
                                : "opacity-40"
                            )}
                          />
                          <span>{cat.label}</span>
                        </CommandItem>
                      ))}
                    </CommandGroup>
                  </CommandList>
                </Command>
              </PopoverContent>
            </Popover>
          </div>
        </div>
        <DialogFooter>
          <Button
            type="button"
            onClick={handleUpdateCourseDetails}
            className=" bg-aqua-blue outline-aqua-blue text-white rounded-lg px-5 py-2 font-poppins font-normal text-[0.88rem] leading-5 duration-700 text-center hover:bg-white hover:text-aqua-blue hover:border hover:border-aqua-blue"
          >
            Save changes
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
