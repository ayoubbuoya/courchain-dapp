import LoginForm from "../../components/login/LoginForm";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import Header from "@/components/header/header";
// import Footer from "@/components/footer/footer";
import Link from "next/link";
import GoogleAuthButton from "@/components/googleAuthButton";

export default async function LoginPage() {
  const session = await getServerSession();

  if (session) {
    redirect("/");
  }

  return (
    <>
      <Header />
      <main className="min-h-screen tracking-normal text-center">
        <div
          className={`custom-linear-border shadow-custom-green rounded-xl w-[90%] sm:w-[80%] md:w-[60%] lg:w-[55%] xl:w-[43%] 2xl:w-[42%] mx-auto mt-8 md:mt-[13%]  font-bold backdrop-blur-[3.13rem]`}
        >
          <h1 className="font-poppins font-semibold md:text-[1.56rem] md:leading-[2.38rem] text-lg  mt-8 text-aqua-blue  ">
            Sign into your account
          </h1>

          <div className="flex items-center justify-center">
            <div className="flex flex-wrap items-center justify-center gap-1 text-base font-normal text-center font-poppins">
              <span className="text-dimgray-200">
                You do not have an account ?
              </span>
              <Link
                href={"/register"}
                className="text-[0.9rem] font-normal underline decoration-aqua-blue decoration-1 text-aqua-blue "
              >
                Create an account
              </Link>
            </div>
          </div>

          <div className="w-[85%] md:w-[53%] mx-auto mt-5 mb-8 ">
            <GoogleAuthButton />
          </div>
        </div>
      </main>
      {/* <Footer /> */}
    </>
  );
}
