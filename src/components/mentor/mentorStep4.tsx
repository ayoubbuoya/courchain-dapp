interface MentorStep4Props {
  courseCategory: string;
  setCourseCategory: (value: string) => void;
  courseCategoryOther: string;
  setCourseCategoryOther: (value: string) => void;
}

export default function MentorStep4({
  courseCategory,
  setCourseCategory,
  courseCategoryOther,
  setCourseCategoryOther,
}: MentorStep4Props) {
  return (
    <div className="shadow-custom-green backdrop-blur-[3.13rem] custom-linear-border rounded-2xl my-3 lg:my-8">
      <div className="px-2 py-1 lg:p-20">
        <div>
          <h1
            style={{
              WebkitTextStroke: "0.5px #E2B8E9",
            }}
            className="uppercase text-purple font-capriola font-normal text-xl text-center lg:text-left lg:text-[1.88rem] lg:leading-[1.88rem] py-2"
          >
            la catégorie et domaine de vos cours
          </h1>
        </div>
        <div className="flex items-center flex-wrap justify-between ">
          <div className="w-full lg:max-w-[55%] 2xl:max-w-[49%] flex justify-center items-center ">
            <div>
              <p className="text-base font-normal text-schemes-secondary font-poppins lg:text-xl">
                {`On est curieux de savoir un peu plus sur vous, voilà pourquoi
                          on vous a préparer ces questions pour vous connaitre
                          d’avantage.`}
              </p>
              <div className="py-1 lg:py-4">
                <div
                  onClick={() => setCourseCategory("idk")}
                  className="flex items-center gap-3 justify-start py-3 "
                >
                  <div
                    className={`bg-[#F2F2F4] w-6 h-6 lg:w-7 lg:h-7 rounded-full cursor-pointer `}
                  >
                    {courseCategory === "idk" && (
                      <div className="w-2 h-2 bg-black rounded-full mx-auto my-2"></div>
                    )}
                  </div>
                  <label
                    htmlFor=""
                    className="text-black font-poppins text-sm lg:text-[1.06rem] font-normal"
                  >
                    Intelligence artificielle & Design
                  </label>
                </div>
                <div className="flex items-center gap-3 justify-start py-3 ">
                  <div
                    onClick={() => setCourseCategory("2d/w")}
                    className={`bg-[#F2F2F4] w-6 h-6 lg:w-7 lg:h-7 rounded-full cursor-pointer `}
                  >
                    {courseCategory === "2d/w" && (
                      <div className="w-2 h-2 bg-black rounded-full mx-auto my-2"></div>
                    )}
                  </div>
                  <label
                    htmlFor=""
                    className="text-black font-poppins text-sm lg:text-[1.06rem] font-normal"
                  >
                    Blockchain & E-Business
                  </label>
                </div>

                <div className="flex items-center gap-3 justify-start py-3 ">
                  <div
                    onClick={() => setCourseCategory("other")}
                    className={`bg-[#F2F2F4] w-6 h-6 lg:w-7 lg:h-7 rounded-full cursor-pointer `}
                  >
                    {courseCategory === "other" && (
                      <div className="w-2 h-2 bg-black rounded-full mx-auto my-2"></div>
                    )}
                  </div>
                  <label
                    htmlFor=""
                    className="text-black font-poppins text-sm lg:text-[1.06rem] font-normal"
                  >
                    Autres domaines
                  </label>
                </div>
                {courseCategory === "other" && (
                  <input
                    style={{
                      backgroundColor: "#F2F2F4",
                      color: "#99999B",
                    }}
                    onChange={(e) => setCourseCategoryOther(e.target.value)}
                    value={courseCategoryOther}
                    placeholder="Exemple"
                    type="text"
                    className="w-[85%] mx-auto md:mx-0 md:w-[66%] my-2 h-12 font-inter font-normal outline-none  text-[1.06rem]  rounded-lg px-4"
                  />
                )}
              </div>
            </div>
          </div>
          <div className="w-[85%] mb-4 mx-auto lg:w-[39%] lg:m-0">
            <img
              className="w-full xl:max-h-[17.88rem]"
              src="/laptop-with-open-article.svg"
              alt=""
            />
          </div>
        </div>
      </div>
    </div>
  );
}
