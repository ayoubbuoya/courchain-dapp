import { useSession } from "next-auth/react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function Sidebar({
  isSidebarOpen,
  setIsSidebarOpen,
}: {
  isSidebarOpen: boolean;
  setIsSidebarOpen: (value: boolean) => void;
}) {
  const pathname = usePathname();
  const { data: session } = useSession();

  return (
    <aside
      id="default-sidebar"
      className={`bg-mobile-sidebar-gradient md:bg-sidebar-gradient fixed top-0 left-0 z-40 w-[28%] sm:w-[15%] h-screen transition-transform bg-white border-r border-gray-200 md:translate-x-0 ${
        isSidebarOpen ? "translate-x-0" : "-translate-x-full"
      } md:static md:w-full md:row-span-2 h-full min-h-screen  md:h-full overflow-y-auto`}
    >
      <div className="px-1 ">
        <div className="flex justify-end my-2 md:hidden ">
          <Image
            src="/close-svgrepo-com.svg"
            alt="Close"
            width={30}
            height={30}
            onClick={() => setIsSidebarOpen(false)}
          />
        </div>

        <div className="flex items-center justify-center mt-2 mb-1 md:my-9">
          <Link href={"/"} className="">
            <Image
              src="/group-1171274801.svg"
              alt="Logo"
              width={45}
              height={45}
              className="w-10"
            />
          </Link>
        </div>

        {session && session.user.role === "user" && session.isMentor && (
          <ul className="flex flex-col items-center justify-around gap-1 mt-5 md:gap-8">
            <li>
              <Link
                href={"/dashboard/mentor"}
                className="flex flex-col items-center justify-center gap-1 px-1 py-3 group "
              >
                <svg
                  className="w-7 md:w-8"
                  width="35"
                  height="35"
                  viewBox="0 0 35 35"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    className={` group-hover:fill-aqua-blue ${
                      pathname === "/dashboard/mentor"
                        ? "fill-aqua-blue"
                        : "fill-schemes-secondary"
                    }`}
                    d="M13.723 18.958h3.529a1.458 1.458 0 0 0 1.035-.423l5.221-5.22a1.458 1.458 0 0 0 0-2.057l-3.529-3.5a1.458 1.458 0 0 0-2.056 0l-5.221 5.221c-.275.27-.432.636-.438 1.021v3.5a1.458 1.458 0 0 0 1.459 1.458zm1.458-4.375 3.777-3.733 1.459 1.458-3.763 3.734h-1.458l-.015-1.459zm15.444 5.834h-1.459V5.833h1.459a1.458 1.458 0 1 0 0-2.916H4.375a1.458 1.458 0 1 0 0 2.916h1.458v14.584H4.375a1.458 1.458 0 1 0 0 2.916H16.04v1.677l-6.635 4.375a1.459 1.459 0 0 0 .802 2.698c.287.004.567-.083.802-.248l5.031-3.325v2.115a1.458 1.458 0 1 0 2.917 0V28.51l5.031 3.325c.235.165.516.252.802.248a1.458 1.458 0 0 0 .803-2.668l-6.636-4.375v-1.707h11.667a1.458 1.458 0 0 0 0-2.916zm-4.375 0H8.75V5.833h17.5v14.584z"
                    // fill="#625B71"
                  />
                </svg>
                <span
                  className={`text-xs font-medium text-center group-hover:block font-poppins  ${
                    pathname === "/dashboard/mentor"
                      ? "text-aqua-blue"
                      : "md:hidden text-schemes-secondary group-hover:font-normal group-hover:text-aqua-blue"
                  }`}
                >
                  Dashboard
                </span>
              </Link>
            </li>
            <li>
              <Link
                href={"/dashboard/mentor/courses"}
                className="flex flex-col items-center justify-center gap-1 px-1 py-3 group "
              >
                <svg
                  width="33"
                  height="33"
                  viewBox="0 0 33 33"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                  className="w-7 md:w-8"
                >
                  <path
                    d="M30.25 4.125H22C20.5413 4.125 19.1424 4.70446 18.1109 5.73591C17.0795 6.76736 16.5 8.16631 16.5 9.625V28.875C16.5 27.781 16.9346 26.7318 17.7082 25.9582C18.4818 25.1846 19.531 24.75 20.625 24.75H30.25V4.125Z"
                    className={` group-hover:stroke-aqua-blue ${
                      pathname === "/dashboard/mentor/courses"
                        ? "stroke-aqua-blue"
                        : "stroke-schemes-secondary"
                    }`}
                    // stroke="#625B71"
                    strokeWidth="2.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <path
                    d="M2.75 4.125H11C12.4587 4.125 13.8576 4.70446 14.8891 5.73591C15.9205 6.76736 16.5 8.16631 16.5 9.625V28.875C16.5 27.781 16.0654 26.7318 15.2918 25.9582C14.5182 25.1846 13.469 24.75 12.375 24.75H2.75V4.125Z"
                    // stroke="#625B71"
                    className={` group-hover:stroke-aqua-blue ${
                      pathname === "/dashboard/mentor/courses"
                        ? "stroke-aqua-blue"
                        : "stroke-schemes-secondary"
                    }`}
                    strokeWidth="2.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
                <span
                  className={`text-xs font-medium text-center group-hover:block font-poppins  ${
                    pathname === "/dashboard/mentor/courses"
                      ? "text-aqua-blue"
                      : "md:hidden text-schemes-secondary group-hover:font-normal group-hover:text-aqua-blue"
                  }`}
                >
                  My courses
                </span>
              </Link>
            </li>
            {/* <li>
              <Link
                href={"/dashboard/mentor/stats"}
                className="flex flex-col items-center justify-center gap-1 px-1 py-3 group "
              >
                <svg
                  className="w-7 md:w-8"
                  width="35"
                  height="35"
                  viewBox="0 0 35 35"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    className="fill-schemes-secondary group-hover:fill-aqua-blue"
                    d="M30.625 20.417h-1.459V4.375a1.458 1.458 0 0 0-1.458-1.458H7.292a1.458 1.458 0 0 0-1.459 1.458v16.042H4.375a1.458 1.458 0 1 0 0 2.916H16.04v1.677l-6.635 4.375a1.459 1.459 0 0 0 .802 2.698c.287.004.567-.083.802-.248l5.031-3.325v2.115a1.458 1.458 0 1 0 2.917 0V28.51l5.031 3.325c.235.165.516.252.802.248a1.458 1.458 0 0 0 .803-2.668l-6.636-4.375v-1.707h11.667a1.458 1.458 0 0 0 0-2.916zm-4.375 0H8.75V5.833h17.5v14.584zM13.125 17.5a1.458 1.458 0 0 0 1.21-.656l1.94-2.917 1.648 1.663a1.458 1.458 0 0 0 1.181.422 1.458 1.458 0 0 0 1.065-.656l2.916-4.375a1.459 1.459 0 0 0-2.42-1.604l-1.94 2.917-1.648-1.663a1.457 1.457 0 0 0-1.181-.423 1.457 1.457 0 0 0-1.065.657l-2.917 4.375a1.459 1.459 0 0 0 .409 2.012c.235.165.515.251.802.248z"
                  />
                </svg>
                <span className="text-xs font-medium text-center md:hidden group-hover:block font-poppins text-schemes-secondary group-hover:font-normal group-hover:text-aqua-blue">
                  Statistiques
                </span>
              </Link>
            </li>

            <li>
              <Link
                href={"/me/messages"}
                className="flex flex-col items-center justify-center gap-1 px-1 py-3 group "
              >
                <svg
                  className="w-7 md:w-8"
                  width="35"
                  height="35"
                  viewBox="0 0 35 35"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    className="fill-schemes-secondary group-hover:fill-aqua-blue"
                    d="M24.791 10.208H10.208a1.458 1.458 0 1 0 0 2.917h14.583a1.458 1.458 0 1 0 0-2.917zm0 5.834H10.208a1.458 1.458 0 1 0 0 2.916h14.583a1.458 1.458 0 0 0 0-2.916zm2.917-13.125H7.292a4.375 4.375 0 0 0-4.375 4.375v14.583a4.375 4.375 0 0 0 4.375 4.375h16.902l5.395 5.41a1.459 1.459 0 0 0 1.036.423c.191.005.38-.035.554-.116a1.458 1.458 0 0 0 .904-1.342V7.292a4.375 4.375 0 0 0-4.375-4.375zm1.459 24.193-3.34-3.354a1.458 1.458 0 0 0-1.036-.423h-17.5a1.458 1.458 0 0 1-1.458-1.458V7.292a1.458 1.458 0 0 1 1.458-1.459h20.417a1.458 1.458 0 0 1 1.459 1.459V27.11z"
                  />
                </svg>
                <span className="text-xs font-medium text-center md:hidden group-hover:block font-poppins text-schemes-secondary group-hover:font-normal group-hover:text-aqua-blue">
                  Messages
                </span>
              </Link>
            </li>

            <li>
              <Link
                href={"/me/calendar"}
                className="flex flex-col items-center justify-center gap-1 px-1 py-3 group "
              >
                <svg
                  className="w-7 md:w-8"
                  width="35"
                  height="35"
                  viewBox="0 0 35 35"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    className="fill-schemes-secondary group-hover:fill-aqua-blue"
                    d="M17.5 20.417a1.458 1.458 0 1 0 0-2.917 1.458 1.458 0 0 0 0 2.917zm7.291 0a1.459 1.459 0 1 0 0-2.918 1.459 1.459 0 0 0 0 2.918zM17.5 26.25a1.458 1.458 0 1 0 0-2.917 1.458 1.458 0 0 0 0 2.917zm7.291 0a1.459 1.459 0 1 0 0-2.917 1.459 1.459 0 0 0 0 2.917zm-14.583-5.833a1.459 1.459 0 1 0 0-2.918 1.459 1.459 0 0 0 0 2.918zm17.5-14.584H26.25V4.375a1.458 1.458 0 1 0-2.917 0v1.458H11.667V4.375a1.458 1.458 0 1 0-2.917 0v1.458H7.292a4.375 4.375 0 0 0-4.375 4.375v17.5a4.375 4.375 0 0 0 4.375 4.375h20.416a4.375 4.375 0 0 0 4.375-4.375v-17.5a4.375 4.375 0 0 0-4.375-4.375zm1.459 21.875a1.458 1.458 0 0 1-1.459 1.459H7.292a1.458 1.458 0 0 1-1.459-1.459V14.583h23.334v13.125zm0-16.041H5.832v-1.459A1.458 1.458 0 0 1 7.291 8.75h20.417a1.458 1.458 0 0 1 1.459 1.458v1.459zM10.207 26.25a1.459 1.459 0 1 0 0-2.917 1.459 1.459 0 0 0 0 2.917z"
                    fill="#625B71"
                  />
                </svg>

                <span className="text-xs font-medium text-center md:hidden group-hover:block font-poppins text-schemes-secondary group-hover:font-normal group-hover:text-aqua-blue">
                  Calendrier
                </span>
              </Link>
            </li> */}
          </ul>
        )}

        {session && session.user.role === "user" && !session.isMentor && (
          <ul className="flex flex-col items-center justify-around gap-1 mt-5 md:gap-8">
            <li>
              <Link
                href={"/dashboard/student"}
                className="flex flex-col items-center justify-center gap-1 px-1 py-3 group"
              >
                <svg
                  width="33"
                  height="33"
                  viewBox="0 0 33 33"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                  className="w-7 md:w-8"
                >
                  <path
                    d="M30.25 4.125H22C20.5413 4.125 19.1424 4.70446 18.1109 5.73591C17.0795 6.76736 16.5 8.16631 16.5 9.625V28.875C16.5 27.781 16.9346 26.7318 17.7082 25.9582C18.4818 25.1846 19.531 24.75 20.625 24.75H30.25V4.125Z"
                    className={` group-hover:stroke-aqua-blue ${
                      pathname === "/dashboard/student"
                        ? "stroke-aqua-blue"
                        : "stroke-schemes-secondary"
                    }`}
                    // stroke="#625B71"
                    strokeWidth="2.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <path
                    d="M2.75 4.125H11C12.4587 4.125 13.8576 4.70446 14.8891 5.73591C15.9205 6.76736 16.5 8.16631 16.5 9.625V28.875C16.5 27.781 16.0654 26.7318 15.2918 25.9582C14.5182 25.1846 13.469 24.75 12.375 24.75H2.75V4.125Z"
                    // stroke="#625B71"
                    className={` group-hover:stroke-aqua-blue ${
                      pathname === "/dashboard/student"
                        ? "stroke-aqua-blue"
                        : "stroke-schemes-secondary"
                    }`}
                    strokeWidth="2.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
                <span
                  className={`text-xs font-medium text-center  group-hover:block font-poppins  group-hover:text-aqua-blue ${
                    pathname === "/dashboard/student"
                      ? "text-aqua-blue"
                      : "text-schemes-secondary md:hidden "
                  }`}
                >
                  My Courses
                </span>
              </Link>
            </li>
          </ul>
        )}

        {session && session.user.role === "admin" && (
          <ul className="flex flex-col items-center justify-around gap-1 mt-5 md:gap-8">
            <li>
              <Link
                href={"/dashboard/admin"}
                className="flex flex-col items-center justify-center gap-1 px-1 py-3 group"
              >
                <svg
                  width="33"
                  height="33"
                  viewBox="0 0 33 33"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                  className="w-7 md:w-8"
                >
                  <path
                    d="M30.25 4.125H22C20.5413 4.125 19.1424 4.70446 18.1109 5.73591C17.0795 6.76736 16.5 8.16631 16.5 9.625V28.875C16.5 27.781 16.9346 26.7318 17.7082 25.9582C18.4818 25.1846 19.531 24.75 20.625 24.75H30.25V4.125Z"
                    className={` group-hover:stroke-aqua-blue ${
                      pathname === "/dashboard/admin"
                        ? "stroke-aqua-blue"
                        : "stroke-schemes-secondary"
                    }`}
                    // stroke="#625B71"
                    strokeWidth="2.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <path
                    d="M2.75 4.125H11C12.4587 4.125 13.8576 4.70446 14.8891 5.73591C15.9205 6.76736 16.5 8.16631 16.5 9.625V28.875C16.5 27.781 16.0654 26.7318 15.2918 25.9582C14.5182 25.1846 13.469 24.75 12.375 24.75H2.75V4.125Z"
                    // stroke="#625B71"
                    className={` group-hover:stroke-aqua-blue ${
                      pathname === "/dashboard/admin"
                        ? "stroke-aqua-blue"
                        : "stroke-schemes-secondary"
                    }`}
                    strokeWidth="2.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
                <span
                  className={`text-xs font-medium text-center  font-poppins   ${
                    pathname === "/dashboard/admin"
                      ? "md:block text-aqua-blue"
                      : "md:hidden text-schemes-secondary group-hover:font-normal group-hover:text-aqua-blue group-hover:block"
                  }`}
                >
                  All Courses
                </span>
              </Link>
            </li>
            <li>
              <Link
                href={"/dashboard/admin/users"}
                className="flex flex-col items-center justify-center gap-1 px-1 py-3 group"
              >
                <svg
                  width="30"
                  height="30"
                  viewBox="0 0 30 30"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M28.75 26.25V23.75C28.7492 22.6422 28.3804 21.566 27.7017 20.6904C27.023 19.8148 26.0727 19.1895 25 18.9125"
                    className={` group-hover:stroke-aqua-blue ${
                      pathname === "/dashboard/admin/users"
                        ? "stroke-aqua-blue"
                        : "stroke-schemes-secondary"
                    }`}
                    strokeWidth="2.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <path
                    d="M21.25 26.25V23.75C21.25 22.4239 20.7232 21.1521 19.7855 20.2145C18.8479 19.2768 17.5761 18.75 16.25 18.75H6.25C4.92392 18.75 3.65215 19.2768 2.71447 20.2145C1.77678 21.1521 1.25 22.4239 1.25 23.75V26.25"
                    className={` group-hover:stroke-aqua-blue ${
                      pathname === "/dashboard/admin/users"
                        ? "stroke-aqua-blue"
                        : "stroke-schemes-secondary"
                    }`}
                    strokeWidth="2.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <path
                    d="M20 3.9125C21.0755 4.18787 22.0288 4.81337 22.7095 5.69039C23.3903 6.5674 23.7598 7.64604 23.7598 8.75625C23.7598 9.86646 23.3903 10.9451 22.7095 11.8221C22.0288 12.6991 21.0755 13.3246 20 13.6"
                    className={` group-hover:stroke-aqua-blue ${
                      pathname === "/dashboard/admin/users"
                        ? "stroke-aqua-blue"
                        : "stroke-schemes-secondary"
                    }`}
                    strokeWidth="2.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <path
                    d="M11.25 13.75C14.0114 13.75 16.25 11.5114 16.25 8.75C16.25 5.98858 14.0114 3.75 11.25 3.75C8.48858 3.75 6.25 5.98858 6.25 8.75C6.25 11.5114 8.48858 13.75 11.25 13.75Z"
                    className={` group-hover:stroke-aqua-blue ${
                      pathname === "/dashboard/admin/users"
                        ? "stroke-aqua-blue"
                        : "stroke-schemes-secondary"
                    }`}
                    strokeWidth="2.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>

                <span
                  className={`text-xs font-medium text-center  font-poppins   ${
                    pathname === "/dashboard/admin/users"
                      ? "md:block text-aqua-blue"
                      : "md:hidden text-schemes-secondary group-hover:font-normal group-hover:text-aqua-blue group-hover:block"
                  }`}
                >
                  All Users
                </span>
              </Link>
            </li>
          </ul>
        )}
      </div>
    </aside>
  );
}
