interface MentorStep1Props {
  mentorExperience: string;
  setMentorExperience: (value: string) => void;
  mentorExperienceOther: string;
  setMentorExperienceOther: (value: string) => void;
}

export default function MentorStep1({
  mentorExperience,
  setMentorExperience,
  mentorExperienceOther,
  setMentorExperienceOther,
}: MentorStep1Props) {
  return (
    <div className="shadow-custom-green rounded-2xl backdrop-blur-[3.13rem] my-3 lg:my-8 custom-linear-border">
      <div className="px-2 py-2 lg:p-20">
        <div>
          <h1
            style={{
              WebkitTextStroke: "0.5px #E2B8E9",
            }}
            className="py-2 font-capriola font-normal text-center text-purple text-xl lg:text-left lg:text-3xl uppercase"
          >
            pARTAGEZ VOTRE EXPERTISE
          </h1>
        </div>
        <div className="flex flex-wrap justify-between items-center">
          <div className="flex justify-center items-center w-full lg:max-w-[55%]">
            <div>
              <p className="font-normal font-poppins text-base text-schemes-secondary lg:text-xl">
                {`On est curieux de savoir un peu plus sur vous, voilà pourquoi
                    on vous a préparer ces questions pour vous connaitre
                    d’avantage.`}
              </p>
              <div className="py-1 lg:py-4">
                <div
                  onClick={() => setMentorExperience("beginner")}
                  className="flex justify-start items-center gap-3 py-3"
                >
                  <div
                    className={`bg-[#F2F2F4] w-6 h-6 lg:w-7 lg:h-7 rounded-full cursor-pointer `}
                  >
                    {mentorExperience === "beginner" && (
                      <div className="bg-black mx-auto my-2 rounded-full w-2 h-2"></div>
                    )}
                  </div>
                  <label
                    htmlFor=""
                    className="font-normal font-poppins text-black text-sm lg:text-[1.06rem]"
                  >
                    Je suis débutant en enseignement{" "}
                  </label>
                </div>
                <div className="flex justify-start items-center gap-3 py-3">
                  <div
                    onClick={() => setMentorExperience("informal")}
                    className={`bg-[#F2F2F4] w-6 h-6 lg:w-7 lg:h-7 rounded-full cursor-pointer `}
                  >
                    {mentorExperience === "informal" && (
                      <div className="bg-black mx-auto my-2 rounded-full w-2 h-2"></div>
                    )}
                  </div>
                  <label
                    htmlFor=""
                    className="font-normal font-poppins text-black text-sm lg:text-sm lg:text-[1.06rem]"
                  >
                    {"J’ai déjà enseigné dans un contexte informel"}
                  </label>
                </div>
                <div className="flex justify-start items-center gap-3 py-3">
                  <div
                    onClick={() => setMentorExperience("professional")}
                    className={`bg-[#F2F2F4] w-6 h-6 lg:w-7 lg:h-7 rounded-full cursor-pointer `}
                  >
                    {mentorExperience === "professional" && (
                      <div className="bg-black mx-auto my-2 rounded-full w-2 h-2"></div>
                    )}
                  </div>
                  <label
                    htmlFor=""
                    className="font-normal font-poppins text-black text-sm lg:text-sm lg:text-[1.06rem]"
                  >
                    {"J’ai déjà enseigné dans un contexte professionnel"}
                  </label>
                </div>
                <div className="flex justify-start items-center gap-3 py-3">
                  <div
                    onClick={() => setMentorExperience("online")}
                    className={`bg-[#F2F2F4] w-6 h-6 lg:w-7 lg:h-7 rounded-full cursor-pointer `}
                  >
                    {mentorExperience === "online" && (
                      <div className="bg-black mx-auto my-2 rounded-full w-2 h-2"></div>
                    )}
                  </div>
                  <label
                    htmlFor=""
                    className="font-normal font-poppins text-black text-sm lg:text-[1.06rem]"
                  >
                    En ligne
                  </label>
                </div>

                <div className="flex justify-start items-center gap-3 py-3">
                  <div
                    onClick={() => setMentorExperience("other")}
                    className={`bg-[#F2F2F4] w-6 h-6 lg:w-7 lg:h-7 rounded-full cursor-pointer `}
                  >
                    {mentorExperience === "other" && (
                      <div className="bg-black mx-auto my-2 rounded-full w-2 h-2"></div>
                    )}
                  </div>
                  <label
                    htmlFor=""
                    className="font-normal font-poppins text-black text-sm lg:text-[1.06rem]"
                  >
                    Autres
                  </label>
                </div>
                {mentorExperience === "other" && (
                  <input
                    style={{
                      backgroundColor: "#F2F2F4",
                      color: "#99999B",
                    }}
                    onChange={(e) => setMentorExperienceOther(e.target.value)}
                    value={mentorExperienceOther}
                    placeholder="Exemple"
                    type="text"
                    className="my-2 px-4 rounded-lg w-[66%] h-12 font-inter font-normal text-sm lg:text-[1.06rem] outline-none"
                  />
                )}
              </div>
            </div>
          </div>
          <div className="min-w-[39%]">
            <img
              className="w-full xl:max-h-[22.88rem]"
              src="/Boy-studyin-remotely-with-tutor.svg"
              alt=""
            />
          </div>
        </div>
      </div>
    </div>
  );
}
