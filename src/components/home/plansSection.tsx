export default function PlansSection() {
  return (
    <section id="prices" className="container mx-auto px-6 md:px-0 py-2 ">
      <div className="w-full xl:w-[85%] ">
        <h1
          style={{
            WebkitTextStroke: "1px #e2b8e9",
          }}
          className="text-purple text-center sm:text-left font-capriola uppercase font-normal text-base sm:text-2xl md:text-[2.38rem] md:leading-normal pb-2 md:pb-4 lg:w-[70%]"
        >
          Accélérer votre croissance en développant vos compétences
        </h1>
        <p className="font-poppins text-sm md:text-xl text-dimgray-300 font-medium lg:w-[73%] ">
          {`Atteignez vos objectifs plus rapidement avec l'un de nos plans ou
            programmes.Essayez-en un gratuitement aujourd'hui`}
        </p>
      </div>
      <div className="grid place-items-center md:grid-cols-2 xl:grid-cols-3 gap-8 mx-auto py-5 md:py-12 ">
        <div className="custom-linear-border w-full min-h-[30rem] rounded-2xl bg-white bg-opacity-20 shadow-lg border-[2px] border-solid border-aqua-blue text-center ">
          <p className="py-6 text-xl font-medium text-black font-poppins mt-14">
            Basic Plan
          </p>
          <div className="inline font-medium text-dimgray-500 font-poppins">
            <span className="text-2xl">$</span>
            <span className="text-5xl">10</span>
            <span className="text-3xl">/mth</span>
          </div>
          <p className="py-6 text-xl font-medium text-dimgray-700 font-poppins">
            Billed annually
          </p>
          <div className="flex flex-col items-start justify-around pl-6 pr-2 text-base font-medium text-darkslategray-300 font-poppins ">
            <div className="flex items-center justify-start gap-2 py-1">
              <img src="/checkbox.svg" alt="" />
              <span>Complete documentation</span>
            </div>
            <div className="flex items-center justify-start gap-2 py-1">
              <img src="/checkbox.svg" alt="" />
              <span>Working materials in Figma</span>
            </div>
            <div className="flex items-center justify-start gap-2 py-1">
              <img src="/checkbox.svg" alt="" />
              <span>100GB cloud storage</span>
            </div>
            <div className="flex items-center justify-start gap-2 py-1">
              <img src="/checkbox.svg" alt="" />
              <span>500 team members</span>
            </div>
          </div>
          <div className="flex items-center justify-center py-5">
            <button className="px-5 py-3 font-normal text-center text-white rounded-full font-poppins bg-aqua-blue hover:bg-slate-600 ">
              Voir les cours inclus
            </button>
          </div>
        </div>
        <div className="custom-linear-border w-full min-h-[30rem] rounded-2xl bg-white bg-opacity-20 shadow-lg border-[2px] border-solid border-aqua-blue text-center ">
          <p className="py-6 text-xl font-medium text-black font-poppins mt-14">
            Basic Plan
          </p>
          <div className="inline font-medium text-dimgray-500 font-poppins">
            <span className="text-2xl">$</span>
            <span className="text-5xl">10</span>
            <span className="text-3xl">/mth</span>
          </div>
          <p className="py-6 text-xl font-medium text-dimgray-700 font-poppins">
            Billed annually
          </p>
          <div className="flex flex-col items-start justify-around pl-6 pr-2 text-base font-medium text-darkslategray-300 font-poppins ">
            <div className="flex items-center justify-start gap-2 py-1">
              <img src="/checkbox.svg" alt="" />
              <span>Complete documentation</span>
            </div>
            <div className="flex items-center justify-start gap-2 py-1">
              <img src="/checkbox.svg" alt="" />
              <span>Working materials in Figma</span>
            </div>
            <div className="flex items-center justify-start gap-2 py-1">
              <img src="/checkbox.svg" alt="" />
              <span>100GB cloud storage</span>
            </div>
            <div className="flex items-center justify-start gap-2 py-1">
              <img src="/checkbox.svg" alt="" />
              <span>500 team members</span>
            </div>
          </div>
          <div className="flex items-center justify-center py-5">
            <button className="px-5 py-3 font-normal text-center text-white rounded-full font-poppins bg-aqua-blue hover:bg-slate-600 ">
              Voir les cours inclus
            </button>
          </div>
        </div>
        <div className="custom-linear-border w-full min-h-[30rem] rounded-2xl bg-white bg-opacity-20 shadow-lg border-[2px] border-solid border-aqua-blue text-center ">
          <p className="py-6 text-xl font-medium text-black font-poppins mt-14">
            Basic Plan
          </p>
          <div className="inline font-medium text-dimgray-500 font-poppins">
            <span className="text-2xl">$</span>
            <span className="text-5xl">10</span>
            <span className="text-3xl">/mth</span>
          </div>
          <p className="py-6 text-xl font-medium text-dimgray-700 font-poppins">
            Billed annually
          </p>
          <div className="flex flex-col items-start justify-around pl-6 pr-2 text-base font-medium text-darkslategray-300 font-poppins ">
            <div className="flex items-center justify-start gap-2 py-1">
              <img src="/checkbox.svg" alt="" />
              <span>Complete documentation</span>
            </div>
            <div className="flex items-center justify-start gap-2 py-1">
              <img src="/checkbox.svg" alt="" />
              <span>Working materials in Figma</span>
            </div>
            <div className="flex items-center justify-start gap-2 py-1">
              <img src="/checkbox.svg" alt="" />
              <span>100GB cloud storage</span>
            </div>
            <div className="flex items-center justify-start gap-2 py-1">
              <img src="/checkbox.svg" alt="" />
              <span>500 team members</span>
            </div>
          </div>
          <div className="flex items-center justify-center py-5">
            <button className="px-5 py-3 font-normal text-center text-white rounded-full font-poppins bg-aqua-blue hover:bg-slate-600 ">
              Voir les cours inclus
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
