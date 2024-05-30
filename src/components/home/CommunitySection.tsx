export default function CommunitySection() {
  return (
    <section className="w-full pb-6 text-center shadow-custom-green md:py-12">
      <div className="my-8">
        <h1
          style={{ WebkitTextStroke: "1px #45A1BE" }}
          className="text-xl md:text-[2.5rem] md:leading-8 font-normal uppercase text-aqua-blue font-capriola  md:py-6 pt-8 "
        >
          notre communauté
        </h1>
        <p className="text-base md:text-[1.58rem] mt-2 md:mt-0 font-medium text-dimgray-800 font-poppins  ">
          Des cours immersives de la part de nos mentors qualifiés
        </p>
      </div>

      <div className="grid gap-8 md:grid-cols-2 xl:grid-cols-3 md:mt-16 md:mb-8">
        <div className="flex flex-col items-center justify-around">
          <div className="w-[60%]">
            <img
              className="object-cover w-full h-full"
              src="/happy-woman-makes-heart-shape-by-her-hand@2x.png"
              alt=""
            />
          </div>
          <div className="flex flex-col items-center justify-around">
            <span className="pb-2 text-xl font-normal text-aqua-blue font-capriola">
              Amani M.
            </span>
            <span className="w-2/3 text-lg font-normal text-gray-700 font-poppins">
              Blockchain Expert
            </span>
            <hr className="border-b-[2px] border-b-blue-500 border-solid w-1/2 my-2" />
            <button className="px-6 py-3 my-2 text-sm font-normal text-white rounded-full font-poppins bg-aqua-blue border-solid border-white border-[1px]">
              Reserver un cours
            </button>
            <button className="py-2 px-6 font-poppins font-normal border-aqua-blue border-[1px] border-solid rounded-full text-aqua-blue my-2">
              Voir son profile
            </button>
          </div>
        </div>
        <div className="flex flex-col items-center justify-around">
          <div className="w-[60%]">
            <img
              className="object-cover w-full h-full rounded-full"
              src="/happy-smiling-man-points-with-finger-to-left-side@2x.png"
              alt=""
            />
          </div>
          <div className="flex flex-col items-center justify-around">
            <span className="pb-2 text-xl font-normal text-aqua-blue font-capriola">
              Anis K.
            </span>
            <span className="w-2/3 text-lg font-normal text-gray-700 font-poppins">
              IA Expert
            </span>
            <hr className="border-b-[2px] border-b-blue-500 border-solid w-1/2 mt-5 mb-2" />
            <button className="px-6 py-3 my-2 text-sm font-normal text-white rounded-full font-poppins bg-aqua-blue border-solid border-white border-[1px]">
              Reserver un cours
            </button>
            <button className="py-2 px-6 font-poppins font-normal border-aqua-blue border-[1px] border-solid rounded-full text-aqua-blue my-2">
              Voir son profile
            </button>
          </div>
        </div>
        <div className="flex flex-col items-center justify-around">
          <div className=" w-[60%]">
            <img
              className="object-cover w-full h-full"
              src="/young-man-holding-laptop-and-pointing-up@2x.png"
              alt=""
            />
          </div>
          <div className="flex flex-col items-center justify-around">
            <span className="pb-2 text-xl font-normal text-aqua-blue font-capriola">
              Raouf S.
            </span>
            <span className="w-2/3 text-lg font-normal text-gray-700 font-poppins ">
              Blockchain & IA Expert
            </span>
            <hr className="border-b-[2px] border-b-blue-500 border-solid w-1/2 my-2" />
            <button className="px-6 py-3 my-2 text-sm font-normal text-white rounded-full font-poppins bg-aqua-blue border-solid border-white border-[1px]">
              Reserver un cours
            </button>
            <button className="py-2 px-6 font-poppins font-normal border-aqua-blue border-[1px] border-solid rounded-full text-aqua-blue my-2">
              Voir son profile
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
