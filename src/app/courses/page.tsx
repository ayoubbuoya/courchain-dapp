"use client";

import Footer from "@/components/footer/footer";
import Header from "@/components/header/header";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { Course } from "@/lib/types";
import { useCoursesStore } from "@/stores/courses";
import { FilterIcon, SearchIcon, StarIcon } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { SheetTrigger, SheetContent, Sheet } from "@/components/ui/sheet";
import {
  PaginationPrevious,
  PaginationItem,
  PaginationLink,
  PaginationEllipsis,
  PaginationNext,
  PaginationContent,
  Pagination,
  PaginationButton,
} from "@/components/ui/pagination";

import {
  AccordionTrigger,
  AccordionContent,
  AccordionItem,
  Accordion,
} from "@/components/ui/accordion";
import { fromYoctoToNear } from "@/lib/utils";
import { useLoadingStore } from "@/stores/loading";
import Loading from "@/components/loading";
import { Input } from "@/components/ui/input";

export default function CoursesPage() {
  const { allCourses } = useCoursesStore();
  const { isLoading } = useLoadingStore();
  const pathname = usePathname();
  const { replace } = useRouter();
  const searchParams = useSearchParams();
  const perPage = 6;
  const [isCoursesSectionLoading, setIsCoursesSectionLoading] = useState(false);
  const [categories, setCategories] = useState<string[]>([]);
  const [levels, setLevels] = useState<string[]>([]);
  const [prices, setPrices] = useState<string[]>([]);
  const [courses, setCourses] = useState<Course[]>(allCourses);
  const currentPage = Number(searchParams.get("p")) || 1;
  const start = (currentPage - 1) * perPage;
  const end = start + perPage;
  const [TotalPages, setTotalPages] = useState<number>(0);

  useEffect(() => {
    setIsCoursesSectionLoading(true);
    console.log("Search params changed : ", searchParams.toString());

    const search = searchParams.get("search");
    const categories = searchParams.getAll("category");
    const levels = searchParams.getAll("level");
    const prices = searchParams.getAll("price");

    // filter all courses
    const filteredCourses = allCourses.filter((course) => {
      if (
        search &&
        !course.title.toLowerCase().includes(search.toLowerCase())
      ) {
        return false;
      }
      if (
        categories.length > 0 &&
        !categories.includes(course.category.toLowerCase())
      ) {
        return false;
      }
      if (levels.length > 0 && !levels.includes(course.level.toLowerCase())) {
        return false;
      }
      if (
        prices.length > 0 &&
        ((prices.includes("free") &&
          fromYoctoToNear(course.price).toString() !== "0") ||
          (prices.includes("paid") &&
            fromYoctoToNear(course.price).toString() === "0"))
      ) {
        return false;
      }
      return true;
    });

    console.log("Filtered courses : ", filteredCourses);

    setTotalPages(Math.ceil(filteredCourses.length / perPage));
    setCategories(searchParams.getAll("category") || []);
    setLevels(searchParams.getAll("level") || []);
    setPrices(searchParams.getAll("price") || []);
    setCourses(filteredCourses.slice(start, end));
    setIsCoursesSectionLoading(false);
  }, [searchParams, allCourses]);

  if (isLoading) {
    <Loading />;
  }

  const addNewSearchParams = (paramName: string, paramValue: string) => {
    setIsCoursesSectionLoading(true);
    const params = new URLSearchParams(searchParams);
    params.append(paramName, paramValue);
    params.delete("p");
    replace(`${pathname}?${params.toString()}`);
  };

  const removeSearchParams = (paramName: string, paramValue: string) => {
    setIsCoursesSectionLoading(true);
    const params = new URLSearchParams(searchParams);

    const keyValues = params.getAll(paramName);
    params.delete(paramName);

    for (let index = 0; index < keyValues.length; index++) {
      if (keyValues[index] !== paramValue) {
        params.append(paramName, keyValues[index]);
      }
    }
    params.delete("p");
    replace(`${pathname}?${params.toString()}`);
  };

  const handleLevelsChange = (newLevel: string, checked: boolean | string) => {
    if (
      (typeof checked === "string" && checked === "true") ||
      checked === true
    ) {
      // add level to the list
      setLevels((prev) => [...prev, newLevel]);
      // add it to the url
      addNewSearchParams("level", newLevel);
    } else {
      // remove level from the list
      setLevels((prev) => prev.filter((l) => l !== newLevel));
      // remove it from the url
      removeSearchParams("level", newLevel);
    }
  };

  const handleCategoryChange = (
    category: string,
    checked: boolean | string
  ) => {
    if (
      (typeof checked === "string" && checked === "true") ||
      checked === true
    ) {
      // add category to the list
      setCategories((prev) => [...prev, category]);
      // add it to the url
      addNewSearchParams("category", category);
    } else {
      // remove category from the list
      setCategories((prev) => prev.filter((c) => c !== category));
      // remove it from the url
      removeSearchParams("category", category);
    }
  };

  const handlePriceChange = (price: string, checked: boolean | string) => {
    if (
      (typeof checked === "string" && checked === "true") ||
      checked === true
    ) {
      // add price to the list
      setPrices((prev) => [...prev, price]);
      // add it to the url
      addNewSearchParams("price", price);
    } else {
      // remove price from the list
      setPrices((prev) => prev.filter((p) => p !== price));
      // remove it from the url
      removeSearchParams("price", price);
    }
  };

  const handlePageChange = (page: number) => {
    setIsCoursesSectionLoading(true);
    const params = new URLSearchParams(searchParams);
    params.delete("p");
    params.set("p", page.toString());
    replace(`${pathname}?${params.toString()}`);
  };

  const handleSearch = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsCoursesSectionLoading(true);
    const searchVal = (e.target as HTMLFormElement).search.value;
    const params = new URLSearchParams(searchParams);
    params.delete("search");
    params.set("search", searchVal);
    params.delete("p");
    replace(`${pathname}?${params.toString()}`);
  };

  return (
    <>
      <Header />
      <div className="flex w-full h-full min-h-screen font-poppins">
        <div className="lg:block lg:w-64 lg:shrink-0 lg:border-r lg:bg-white">
          <div className="sticky top-0 flex-col hidden h-full p-6 lg:flex gap-9">
            <h2 className="text-2xl font-bold tracking-wider font-poppins text-aqua-blue">
              Filters
            </h2>
            <Accordion
              type="multiple"
              defaultValue={["category", "level", "price"]}
            >
              <AccordionItem value="category">
                <AccordionTrigger className="text-lg text-aqua-blue">
                  Category
                </AccordionTrigger>
                <AccordionContent>
                  <div className="grid gap-2">
                    <Label className="flex items-center gap-2 text-base font-medium text-schemes-secondary font-poppins">
                      <Checkbox
                        checked={categories.includes("artificial intelligence")}
                        onCheckedChange={(checked) => {
                          handleCategoryChange(
                            "artificial intelligence",
                            checked
                          );
                        }}
                        id="category-development"
                      />
                      Artificial Intelligence
                    </Label>
                    <Label className="flex items-center gap-2 text-base font-medium text-schemes-secondary font-poppins">
                      <Checkbox
                        checked={categories.includes("web development")}
                        onCheckedChange={(checked) => {
                          handleCategoryChange("web development", checked);
                        }}
                        id="category-web-development"
                      />
                      Web Development
                    </Label>
                    <Label className="flex items-center gap-2 text-base font-medium text-schemes-secondary font-poppins">
                      <Checkbox
                        checked={categories.includes("blockchain")}
                        onCheckedChange={(checked) => {
                          handleCategoryChange("blockchain", checked);
                        }}
                        id="category-blockchain"
                      />
                      Blockchain
                    </Label>
                    <Label className="flex items-center gap-2 text-base font-medium text-schemes-secondary font-poppins">
                      <Checkbox
                        checked={categories.includes("computer science")}
                        onCheckedChange={(checked) => {
                          handleCategoryChange("computer science", checked);
                        }}
                        id="category-marketing"
                      />
                      Computer Science
                    </Label>
                    <Label className="flex items-center gap-2 text-base font-medium text-schemes-secondary font-poppins">
                      <Checkbox
                        checked={categories.includes("photography")}
                        onCheckedChange={(checked) => {
                          handleCategoryChange("photography", checked);
                        }}
                        id="category-photography"
                      />
                      Photography
                    </Label>
                  </div>
                </AccordionContent>
              </AccordionItem>
              <AccordionItem value="level">
                <AccordionTrigger className="text-lg text-aqua-blue">
                  Level
                </AccordionTrigger>
                <AccordionContent>
                  <div className="grid gap-2">
                    <Label className="flex items-center gap-2 text-base font-medium text-schemes-secondary font-poppins">
                      <Checkbox
                        checked={levels.includes("beginner")}
                        onCheckedChange={(checked) => {
                          handleLevelsChange("beginner", checked);
                        }}
                        id="level-beginner"
                      />
                      Beginner
                    </Label>
                    <Label className="flex items-center gap-2 text-base font-medium text-schemes-secondary font-poppins">
                      <Checkbox
                        checked={levels.includes("intermediate")}
                        onCheckedChange={(checked) => {
                          handleLevelsChange("intermediate", checked);
                        }}
                        id="level-intermediate"
                      />
                      Intermediate
                    </Label>
                    <Label className="flex items-center gap-2 text-base font-medium text-schemes-secondary font-poppins">
                      <Checkbox
                        checked={levels.includes("advanced")}
                        onCheckedChange={(checked) => {
                          handleLevelsChange("advanced", checked);
                        }}
                        id="level-advanced"
                      />
                      Advanced
                    </Label>
                  </div>
                </AccordionContent>
              </AccordionItem>
              <AccordionItem value="price">
                <AccordionTrigger className="text-lg text-aqua-blue">
                  Price
                </AccordionTrigger>
                <AccordionContent>
                  <div className="grid gap-2">
                    <Label className="flex items-center gap-2 text-base font-medium text-schemes-secondary font-poppins">
                      <Checkbox
                        checked={prices.includes("free")}
                        onCheckedChange={(checked) => {
                          handlePriceChange("free", checked);
                        }}
                        id="price-free"
                      />
                      Free
                    </Label>
                    <Label className="flex items-center gap-2 text-base font-medium text-schemes-secondary font-poppins">
                      <Checkbox
                        checked={prices.includes("paid")}
                        onCheckedChange={(checked) => {
                          handlePriceChange("paid", checked);
                        }}
                        id="price-paid"
                      />
                      Paid
                    </Label>
                  </div>
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          </div>
        </div>
        <div className="flex-1">
          <div className="flex items-center justify-between border-b bg-[#45a1be]/10 p-4 lg:p-6">
            <h1 className="capitalize text-2xl font-poppins tracking-wider font-semibold text-aqua-blue">
              Explore Our Courses
            </h1>
            <div className="flex items-center gap-4">
              <form className="flex-1" onSubmit={handleSearch}>
                <div className="relative">
                  <SearchIcon className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-500 dark:text-gray-400" />
                  <Input
                    id="search"
                    className="pl-8 outline-none focus-visible:outline-aqua-blue focus-visible:ring-aqua-blue sm:w-[300px] md:w-[200px] lg:w-80"
                    placeholder="Search courses..."
                    type="search"
                  />
                  <input type="submit" className="hidden" />
                </div>
              </form>
              <Sheet>
                <SheetTrigger asChild>
                  <Button
                    className="flex items-center gap-2 px-4 py-2 text-lg font-medium lg:hidden justify-normal font-poppins "
                    variant="outline"
                  >
                    <FilterIcon className="w-5 h-5 text-aqua-blue" />
                    Filters
                  </Button>
                </SheetTrigger>
                <SheetContent className="w-full max-w-md" side="left">
                  <div className="sticky top-0 flex flex-col h-full gap-6 p-6">
                    <h2 className="text-lg font-semibold text-aqua-blue">
                      Filters
                    </h2>
                    <Accordion collapsible type="single">
                      <AccordionItem value="category">
                        <AccordionTrigger className="text-base text-aqua-blue">
                          Category
                        </AccordionTrigger>
                        <AccordionContent>
                          <div className="grid gap-2">
                            <Label className="flex items-center gap-2 text-base font-medium text-schemes-secondary font-poppins">
                              <Checkbox id="category-development" />
                              Development
                              {
                                "\n                                              "
                              }
                            </Label>
                            <Label className="flex items-center gap-2 text-base font-medium text-schemes-secondary font-poppins">
                              <Checkbox id="category-design" />
                              Design
                              {
                                "\n                                              "
                              }
                            </Label>
                            <Label className="flex items-center gap-2 text-base font-medium text-schemes-secondary font-poppins">
                              <Checkbox id="category-business" />
                              Business
                              {
                                "\n                                              "
                              }
                            </Label>
                            <Label className="flex items-center gap-2 text-base font-medium text-schemes-secondary font-poppins">
                              <Checkbox id="category-marketing" />
                              Marketing
                              {
                                "\n                                              "
                              }
                            </Label>
                            <Label className="flex items-center gap-2 text-base font-medium text-schemes-secondary font-poppins">
                              <Checkbox id="category-photography" />
                              Photography
                              {
                                "\n                                              "
                              }
                            </Label>
                          </div>
                        </AccordionContent>
                      </AccordionItem>
                      <AccordionItem value="level">
                        <AccordionTrigger className="text-base text-aqua-blue">
                          Level
                        </AccordionTrigger>
                        <AccordionContent>
                          <div className="grid gap-2">
                            <Label className="flex items-center gap-2 text-base font-medium text-schemes-secondary font-poppins">
                              <Checkbox id="level-beginner" />
                              Beginner
                              {
                                "\n                                              "
                              }
                            </Label>
                            <Label className="flex items-center gap-2 text-base font-medium text-schemes-secondary font-poppins">
                              <Checkbox id="level-intermediate" />
                              Intermediate
                              {
                                "\n                                              "
                              }
                            </Label>
                            <Label className="flex items-center gap-2 text-base font-medium text-schemes-secondary font-poppins">
                              <Checkbox id="level-advanced" />
                              Advanced
                              {
                                "\n                                              "
                              }
                            </Label>
                          </div>
                        </AccordionContent>
                      </AccordionItem>
                      <AccordionItem value="price">
                        <AccordionTrigger className="text-base text-aqua-blue">
                          Price
                        </AccordionTrigger>
                        <AccordionContent>
                          <div className="grid gap-2">
                            <Label className="flex items-center gap-2 text-base font-medium text-schemes-secondary font-poppins">
                              <Checkbox id="price-free" />
                              Free
                              {
                                "\n                                              "
                              }
                            </Label>
                            <Label className="flex items-center gap-2 text-base font-medium text-schemes-secondary font-poppins">
                              <Checkbox id="price-paid" />
                              Paid
                              {
                                "\n                                              "
                              }
                            </Label>
                          </div>
                        </AccordionContent>
                      </AccordionItem>
                    </Accordion>
                  </div>
                </SheetContent>
              </Sheet>
            </div>
          </div>
          <div className="grid grid-cols-1 gap-6 p-4 sm:grid-cols-2 md:grid-cols-3 lg:p-6 ">
            {isCoursesSectionLoading && (
              <div className="h-full mb-4 bg-gray-100 rounded-lg animate-pulse sm:col-span-2 md:col-span-3">
                <div className="h-full bg-gray-200 rounded-t-lg"></div>
                <div className="p-4">
                  <div className="h-4 mb-2 bg-gray-200 rounded-lg"></div>
                  <div className="h-4 mb-2 bg-gray-200 rounded-lg"></div>
                  <div className="h-4 mb-2 bg-gray-200 rounded-lg"></div>
                </div>
              </div>
            )}
            {!isCoursesSectionLoading &&
              courses.map((course) => (
                <div
                  key={course.id}
                  className="group relative overflow-hidden rounded-lg border border-[#45a1be]/20 bg-white shadow-sm transition-all hover:shadow-md  "
                >
                  <Link
                    className="absolute inset-0 z-10"
                    href={`/course/${course.id}`}
                  >
                    <span className="sr-only">View course</span>
                  </Link>
                  <img
                    alt="Course thumbnail"
                    className="object-cover w-full h-40"
                    height={225}
                    src={course.picture || "/course-placeholder.svg"}
                    style={{
                      aspectRatio: "400/225",
                      objectFit: "cover",
                    }}
                    width={400}
                  />
                  <div className="p-4">
                    <h3 className="text-lg font-semibold tracking-tight text-aqua-blue">
                      {course.title}
                    </h3>
                    <p className="mt-2 text-sm text-gray-500 ">
                      {course.description}
                    </p>
                    <div className="flex items-center justify-between mt-4">
                      <div className="flex items-center gap-1 text-sm font-medium text-aqua-blue">
                        <StarIcon className="h-4 w-4 fill-[#45a1be]" />
                        4.8
                      </div>
                      <div className="text-sm font-medium text-aqua-blue">
                        {fromYoctoToNear(course.price) + " NEAR"}
                      </div>
                    </div>
                  </div>
                </div>
              ))}

            {!isCoursesSectionLoading && courses.length === 0 && (
              <div className="col-span-3 flex items-center justify-center p-4 bg-white rounded-lg border border-[#45a1be]/20 h-full">
                <p className="text-xl font-medium capitalize font-poppins text-aqua-blue">
                  No courses found
                </p>
              </div>
            )}
          </div>
          <div className="flex items-center justify-center p-4 bg-white border-y lg:p-6">
            <Pagination>
              <PaginationContent>
                <PaginationItem>
                  <PaginationPrevious
                    className={`${currentPage === 1 ? "hidden" : ""}`}
                    onClick={() => {
                      handlePageChange(currentPage - 1);
                    }}
                  >
                    Previous
                  </PaginationPrevious>
                </PaginationItem>
                {[...Array(TotalPages)].map((_, index) => {
                  // Show only up to 4 pages or all pages if total pages <= 4
                  if (
                    TotalPages <= 4 ||
                    (currentPage <= 2 && index < 3) ||
                    (currentPage >= TotalPages - 1 &&
                      index >= TotalPages - 3) ||
                    index === 1 ||
                    index === TotalPages - 2 ||
                    index === currentPage - 1 ||
                    index === currentPage ||
                    index === currentPage - 2 ||
                    index === currentPage + 1
                  ) {
                    return (
                      <PaginationItem key={index}>
                        <PaginationButton
                          onClick={() => {
                            handlePageChange(index + 1);
                          }}
                          isActive={currentPage === index + 1}
                        >
                          {index + 1}
                        </PaginationButton>
                      </PaginationItem>
                    );
                  } else if (index === 2 || index === TotalPages - 3) {
                    // Add pagination ellipsis
                    return (
                      <PaginationItem key={index}>
                        <PaginationEllipsis />
                      </PaginationItem>
                    );
                  }
                  return null;
                })}

                <PaginationItem>
                  <PaginationNext
                    className={`${
                      currentPage === TotalPages ||
                      courses.length === 0 ||
                      isCoursesSectionLoading
                        ? "hidden"
                        : ""
                    }`}
                    onClick={() => {
                      handlePageChange(currentPage + 1);
                    }}
                  >
                    Next
                  </PaginationNext>
                </PaginationItem>
              </PaginationContent>
            </Pagination>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}
