import Header from "@/components/header/header";
import Footer from "@/components/footer/footer";
import FAQSection from "@/components/mentor/FAQSection";
import Hero from "@/components/mentor/hero";
import HowToStartSection from "@/components/mentor/howToStartSection";
import MentorMain from "@/components/mentor/mentorMain";
import ReasonsSection from "@/components/mentor/reasonsSection";
import { getServerSession } from "next-auth";
import Link from "next/link";

export default async function MentorPage() {
  const session = await getServerSession();
  return (
    <>
      <Header />
      <main className="min-h-screen tracking-normal text-left">
        <MentorMain />
      </main>
      <Footer />
    </>
  );
}
