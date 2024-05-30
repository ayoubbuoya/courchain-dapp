import Link from "next/link";

interface CourseCardProps {
  title: string;
  price: number;
  mentor: string;
  rating: number;
  image: string;
  courseLink: string;
}

export default function CourseCard({
  title,
  price,
  mentor,
  rating,
  image,
  courseLink,
}: CourseCardProps) {
  return (
    <div className="w-full rounded-lg shadow  ">
      <img
        className="w-full h-[15rem] bg-cover bg-no-repeat rounded-t-lg"
        src={image}
      />

      <div className="py-2 min-h-[12rem]">
        <div className="flex items-center justify-between px-5 py-1 text-base font-medium card-body font-poppins text-darkslategray-300 ">
          <h4 className="leading-tight">{title}</h4>
          <span className="text-center price">{"$" + price}</span>
        </div>
        <div className="flex items-center justify-start px-5 text-base font-normal font-roboto text-dimgray-100">
          {mentor}
        </div>
        <div className="flex items-center justify-start px-5 py-2 font-normal font-roboto text-dimgray-100 text-[0.9rem] ">
          <span className="">(NB avis)</span>
          <div className="flex items-center justify-around px-4">
            <img src="/solid--star.svg" alt="star" />
            <img src="/solid--star.svg" alt="" />
            <img src="/solid--star.svg" alt="" />
            <img src="/solid--star.svg" alt="" />
            <img src="/solid--star.svg" alt="" />
          </div>
        </div>

        <div className="flex items-center justify-end px-3 mt-9 ">
          <Link
            href={courseLink}
            className="px-6 py-2 font-medium text-center rounded-full bg-aqua-blue font-poppins text-white-900"
          >
            Voir le Cours
          </Link>
        </div>
      </div>
    </div>
  );
}
