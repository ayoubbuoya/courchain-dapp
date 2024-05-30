import Link from "next/link";

interface MentorStep5Props {
  courseCommunty: string;
  setCourseCommunty: (value: string) => void;
}

export default function MentorStep5({
  courseCommunty,
  setCourseCommunty,
}: MentorStep5Props) {
  return (
    <div className="shadow-custom-green backdrop-blur-[3.13rem] custom-linear-border rounded-2xl my-3 lg:my-8">
      <div className="px-2 py-1 lg:p-20">
        <div>
          <h1
            style={{
              WebkitTextStroke: "0.5px #E2B8E9",
            }}
            className="uppercase text-purple font-capriola font-normal text-xl text-center lg:text-left lg:text-[1.88rem] lg:leading-[1.88rem] py-2 "
          >
            la catégorie et domaine de vos cours
          </h1>
        </div>
        <div className="flex flex-wrap items-center justify-between">
          <div className="w-full lg:max-w-[55%] 2xl:max-w-[49%] flex justify-center items-center">
            <div>
              <p className="text-base font-normal text-schemes-secondary font-poppins lg:text-xl">
                {`On est curieux de savoir un peu plus sur vous, voilà pourquoi
                              on vous a préparer ces questions pour vous connaitre
                              d’avantage.`}
              </p>
              <div className="py-1 lg:py-4">
                <div
                  onClick={() => setCourseCommunty("idk")}
                  className="flex items-center justify-start gap-3 py-3 "
                >
                  <div
                    className={`bg-[#F2F2F4] w-6 h-6 lg:w-7 lg:h-7 rounded-full cursor-pointer`}
                  >
                    {courseCommunty === "idk" && (
                      <div className="w-2 h-2 mx-auto my-2 bg-black rounded-full"></div>
                    )}
                  </div>
                  <label
                    htmlFor=""
                    className="text-black font-poppins text-sm lg:text-[1.06rem] font-normal"
                  >
                    {"J’ai déjà des étudiants qui suivent mes cours"}
                  </label>
                </div>
                <div className="flex items-center justify-start gap-3 py-3 ">
                  <div
                    onClick={() => setCourseCommunty("2d/w")}
                    className={`bg-[#F2F2F4] w-6 h-6 lg:w-7 lg:h-7 rounded-full cursor-pointer  `}
                  >
                    {courseCommunty === "2d/w" && (
                      <div className="w-2 h-2 mx-auto my-2 bg-black rounded-full"></div>
                    )}
                  </div>
                  <label
                    htmlFor=""
                    className="text-black font-poppins text-sm lg:text-[1.06rem] font-normal"
                  >
                    {"J’ai des étudiants qui s’intéressent à mes cours "}
                  </label>
                </div>
                <div className="flex items-center justify-start gap-3 py-3 ">
                  <div
                    onClick={() => setCourseCommunty("none")}
                    className={`bg-[#F2F2F4] w-6 h-6 lg:w-7 lg:h-7 rounded-full cursor-pointer  `}
                  >
                    {courseCommunty === "none" && (
                      <div className="w-2 h-2 mx-auto my-2 bg-black rounded-full"></div>
                    )}
                  </div>
                  <label
                    htmlFor=""
                    className="text-black font-poppins text-sm lg:text-[1.06rem] font-normal"
                  >
                    {"J’ai aucun étudiant"}
                  </label>
                </div>
              </div>
            </div>
          </div>
          <div className="w-[85%] mb-4 mx-auto lg:w-[39%] lg:m-0">
            <img
              className="w-full xl:max-h-[19.13rem]"
              src="/young-man-panting-over-search.svg"
              alt=""
            />
          </div>
        </div>
        <div className="flex items-center justify-center py-4 md:justify-end md:py-0 md:mt-8 ">
          <Link
            href={"/ai-course-generator"}
            className="flex items-center justify-center gap-2 text-center bg-aqua-blue h-[2.75rem] rounded-full outline-none w-[90%] md:w-[35%] "
          >
            <img
              className="object-cover w-6 h-6 overflow-hidden "
              alt="add icon"
              src="/24px--plus@2x.png"
            />
            <span className="text-base font-normal text-white font-roboto ">
              Créer votre premier cours
            </span>
          </Link>
        </div>
      </div>
    </div>
  );
}
