export default function ReasonsSection() {
  return (
    <section>
      <div className="flex items-center justify-center py-14">
        <h1 className=" uppercase text-aqua-blue font-capriola tracking-[-0.1rem] font-normal text-4xl  ">
          Voici des raisons pour devenir un mentor
        </h1>
      </div>
      <div className="grid grid-cols-3 gap-8 w-[75%] mx-auto my-8">
        <div className="relative px-6 py-10 border-2 rounded-lg border-aqua-blue border-b-purple border-l-purple">
          <img
            className="absolute top-[-2rem] right-[42%] "
            src="/frame-14.svg"
            alt=""
          />
          <h4 className="text-xl font-bold text-gray-800 font-poppins ">
            How long does it take to ship my order?
          </h4>
          <p className="mt-5 text-base font-medium text-gray-500 font-poppins ">
            Orders are usually shipped within 1-2 business days after placing
            the order.
          </p>
        </div>
        <div className="relative px-6 py-10 border-2 rounded-lg border-aqua-blue border-b-purple border-l-purple">
          <img
            className="absolute top-[-2rem] right-[42%] "
            src="/frame-14.svg"
            alt=""
          />
          <h4 className="text-xl font-bold text-gray-800 font-poppins ">
            How long does it take to ship my order?
          </h4>
          <p className="mt-5 text-base font-medium text-gray-500 font-poppins ">
            Orders are usually shipped within 1-2 business days after placing
            the order.
          </p>
        </div>
        <div className="relative px-6 py-10 border-2 rounded-lg border-aqua-blue border-b-purple border-l-purple">
          <img
            className="absolute top-[-2rem] right-[42%] "
            src="/frame-14.svg"
            alt=""
          />
          <h4 className="text-xl font-bold text-gray-800 font-poppins ">
            How long does it take to ship my order?
          </h4>
          <p className="mt-5 text-base font-medium text-gray-500 font-poppins ">
            Orders are usually shipped within 1-2 business days after placing
            the order.
          </p>
        </div>
      </div>
      <div className="w-[75%] mx-auto my-16">
        <div className="grid grid-cols-4 gap-4 px-14 py-8 text-center border-2 rounded-lg gap-y-2 border-aqua-blue border-b-purple border-l-purple">
          <h3 className="text-[2.5rem] font-semibold  text-aqua-blue font-poppins">
            Certificat
          </h3>
          <h3 className="text-[2.5rem] font-semibold  text-aqua-blue font-poppins">
            $10m
          </h3>
          <h3 className="text-[2.5rem] font-semibold  text-aqua-blue font-poppins">
            6 mois{" "}
          </h3>
          <h3 className="text-[2.5rem] font-semibold  text-aqua-blue font-poppins">
            Flexibilité
          </h3>
          <span className="text-base font-medium text-schemes-secondary font-poppins">
            Projects completed
          </span>
          <span className="text-base font-medium text-schemes-secondary font-poppins">
            APR
          </span>
          <span className="text-base font-medium text-schemes-secondary font-poppins">
            Hours Saved Annually
          </span>
          <span className="text-base font-medium text-schemes-secondary font-poppins">
            Unique Users
          </span>
        </div>
      </div>
    </section>
  );
}
