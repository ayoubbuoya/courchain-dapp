"use client";

import Header from "@/components/header/header";
import Footer from "@/components/footer/footer";
import Link from "next/link";
import { useEffect, useState } from "react";
import { useWalletStore } from "@/stores/wallet";
import { toast } from "react-toastify";
import { CONTRACTID } from "@/lib/config";
import { useCurrentUserStore } from "@/stores/currentUser";
import { utils } from "near-api-js";
import { fromNearToYocto, fromYoctoToNear } from "@/lib/utils";
import { Course } from "@/lib/types";

export default function CartPage() {
  const { wallet, signedAccountId } = useWalletStore();
  const { cartedCourses, setCartedCourses } = useCurrentUserStore();
  const [cartedCoursesPrice, setCartedCoursesPrice] = useState<number>(0);

  useEffect(() => {
    if (!wallet) {
      return;
    }

    if (!signedAccountId) {
      console.error("User not logged in");
      toast.error("Please login to your NEAR wallet to view course", {
        autoClose: 1000,
      });
      return;
    }

    async function fetchCartedCourses() {
      const fetchedCartedCourses = await wallet.viewMethod({
        contractId: CONTRACTID,
        method: "get_user_carted_courses",
        args: {
          account_id: signedAccountId,
        },
      });

      console.log("Fetched Carted Courses ", fetchedCartedCourses);
      setCartedCourses(fetchedCartedCourses);

      setCartedCoursesPrice(0);
      // calculate total fetchedCartedPrice
      await fetchedCartedCourses.map((course: Course) => {
        const coursePrice = fromYoctoToNear(course.price);
        setCartedCoursesPrice((prevPrice) => prevPrice + coursePrice);
      });
    }

    fetchCartedCourses();
  }, [wallet, signedAccountId]);

  const handleRemoveCourseFromCart = async (courseId: number) => {
    const loadingToastId = toast.loading("Removing course from cart...");

    if (!wallet) {
      toast.update(loadingToastId, {
        render: "Please login to your NEAR wallet to view course",
        type: "error",
        autoClose: 1000,
        isLoading: false,
      });
      return;
    }

    if (!signedAccountId) {
      console.error("User not logged in");
      toast.update(loadingToastId, {
        render: "Please login to your NEAR wallet to view course",
        type: "error",
        autoClose: 1000,
        isLoading: false,
      });
      return;
    }

    if (!cartedCourses) {
      toast.update(loadingToastId, {
        render: "No course found in cart",
        type: "error",
        autoClose: 1000,
        isLoading: false,
      });
      return;
    }

    try {
      const callResult = await wallet.callMethod({
        contractId: CONTRACTID,
        method: "remove_course_from_cart",
        args: {
          course_id: courseId,
        },
      });

      const success = Boolean(
        Buffer.from(callResult.status.SuccessValue, "base64").toString(
          "utf-8"
        ) === "true"
      );

      if (!success) {
        toast.update(loadingToastId, {
          render: "Error removing course from cart",
          type: "error",
          autoClose: 1000,
          isLoading: false,
        });
        return;
      }

      const updatedCartedCourses = cartedCourses.filter(
        (course) => course.id !== courseId
      );

      setCartedCourses(updatedCartedCourses);

      toast.update(loadingToastId, {
        render: "Course removed from cart",
        type: "success",
        autoClose: 1000,
        isLoading: false,
      });
    } catch (error) {
      console.error("Error removing course from cart", error);
      toast.update(loadingToastId, {
        render: "Error removing course from cart",
        type: "error",
        autoClose: 1000,
        isLoading: false,
      });
    }
  };

  const handleEnrollAllCartedCourses = async () => {
    const loadingToastId = toast.loading("Enrolling all courses...");

    if (!wallet) {
      toast.update(loadingToastId, {
        render: "Please login to your NEAR wallet to view course",
        type: "error",
        autoClose: 1000,
        isLoading: false,
      });
      return;
    }

    if (!signedAccountId) {
      console.error("User not logged in");
      toast.update(loadingToastId, {
        render: "Please login to your NEAR wallet to view course",
        type: "error",
        autoClose: 1000,
        isLoading: false,
      });
      return;
    }

    if (!cartedCourses) {
      toast.update(loadingToastId, {
        render: "No course found in cart",
        type: "error",
        autoClose: 1000,
        isLoading: false,
      });
      return;
    }

    // call calculate total price with fee
    const totalPrice = await wallet.viewMethod({
      contractId: CONTRACTID,
      method: "get_user_carted_courses_prices_with_fee",
      args: {
        account_id: signedAccountId,
      },
    });

    console.log("Total Price with Fee In YoctoNear", totalPrice);
    console.log("Total Price with Fee In Near", fromYoctoToNear(totalPrice));
    const deposit = BigInt(totalPrice) + BigInt(999999999);
    console.log("Deposit Value : ", deposit);

    await wallet.callMethod({
      contractId: CONTRACTID,
      method: "enroll_all_carted_courses",
      args: {
        enrolled_at: new Date().getTime(),
      },
      deposit,
    });
  };

  return (
    <>
      <Header />
      {!cartedCourses || (cartedCourses && cartedCourses.length === 0) ? (
        <main className="max-h-full min-h-screen tracking-wider text-center">
          <div className="lg:max-w-[40%] rounded-2xl shadow-custom-green translate-y-[15%] mx-auto custom-linear-border  ">
            <div className="w-full py-5">
              <h1 className=" font-poppins font-medium text-[1.563rem] mt-5 text-aqua-blue uppercase tracking-wider py-3 ">
                Course basket
              </h1>
              <p className="text-base font-normal text-dimgray-200 font-poppins ">
                your basket is empty
              </p>
              <div className="py-8 w-[60%] mx-auto flex items-center justify-center">
                <img
                  className="w-[75%] ml-4"
                  src="/shopping-credit-card@2x.png"
                  alt=""
                />
              </div>
              <div>
                <p className="text-sm font-normal text-dimgray-200 font-poppins ">
                  Keep browsing for more courses
                </p>
              </div>
              <div className="flex items-center justify-center py-6 text-center">
                <Link
                  href={"/courses/preview"}
                  className="w-[55%] py-3 rounded-full text-white font-poppins font-normal text-base bg-aqua-blue border-white border-2 hover:bg-slate-600  "
                >
                  Browse courses
                </Link>
              </div>
            </div>
          </div>
        </main>
      ) : (
        <main className="flex items-center justify-center min-h-screen">
          <div className="mx-auto xl:w-[80%] shadow-custom-green custom-linear-border rounded-2xl backdrop-blur-[3.13rem]">
            <div className="md:p-20 xl:py-5 ">
              <div className="flex flex-col items-center ">
                <h4 className="text-aqua-blue uppercase  font-poppins text-2xl leading-[2.39rem] font-medium text-left ">
                  Courses Basket
                </h4>
                <p className="text-base font-normal text-center font-poppins text-darkslategray-200">
                  you have {cartedCourses.length} courses on the basket
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 md:my-12 md:gap-10">
                <div className="md:col-span-2">
                  {cartedCourses.map((course) => (
                    <div
                      key={course.id}
                      className="my-4 custom-linear-border rounded-2xl"
                    >
                      <div className="flex justify-between px-5 py-4 md:px-8">
                        <div className="flex items-center h-full space-x-4">
                          <div className="">
                            <h4 className="text-lg font-medium font-poppins text-aqua-blue">
                              {course.title}
                            </h4>
                            <p className="text-sm font-semibold text-schemes-secondary font-poppins">
                              {course.mentor_id}
                            </p>
                            <div className="flex items-center gap-2">
                              <img
                                className="object-cover w-4 h-4"
                                src="/Time Circle.svg"
                                alt=""
                              />
                              <span className="text-sm font-normal font-poppins">
                                {course.duration}
                              </span>
                            </div>
                          </div>
                        </div>
                        <div className="flex flex-col items-end justify-between min-h-full ">
                          <p className="text-lg font-semibold text-gray-600">
                            {fromYoctoToNear(course.price) + "  NEAR"}
                          </p>
                          <button
                            onClick={() =>
                              handleRemoveCourseFromCart(course.id)
                            }
                          >
                            <img src="/trash.svg" alt="" />
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="">
                  <div className="py-4 border-b-2 border-aqua-blue">
                    <div className="flex flex-col items-start justify-between gap-4 ">
                      <h3 className="text-xl font-semibold text-left text-aqua-blue font-poppins ">
                        Total :
                      </h3>
                      <p className="text-xl font-medium  text-left text-schemes-secondary font-poppins ">
                        {cartedCoursesPrice + "    NEAR"}
                      </p>

                      <button
                        onClick={handleEnrollAllCartedCourses}
                        className="px-6 py-3 text-base font-normal text-left text-white capitalize border border-white rounded-full bg-aqua-blue font-poppins "
                      >
                        enroll all courses
                      </button>
                    </div>
                  </div>

                  <div className="pt-4 pl-2">
                    <div className="flex flex-col items-start justify-between gap-4 ">
                      <h3 className="capitalize text-xl font-semibold text-left text-aqua-blue font-poppins ">
                        Apply a promo code :
                      </h3>

                      <input
                        className="w-full px-4 py-2 outline-aqua-blue text-base font-normal text-left text-black capitalize border border-gray-200 rounded-lg bg-white font-poppins"
                        type="text"
                        placeholder="Enter promo code"
                      />

                      <button className="px-6 py-3 text-base font-normal text-left text-white capitalize border border-white rounded-full bg-aqua-blue font-poppins ">
                        Apply code
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </main>
      )}
      <Footer />
    </>
  );
}
