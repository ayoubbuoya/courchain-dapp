import { authConfig } from "@/lib/auth";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";

export default async function DashboardPage() {
  const session = await getServerSession(authConfig);
  console.log("Session From Server : ", session);

  if (!session) {
    redirect("/login");
  }

  if (session) {
    if (session.user.role === "admin") {
      // redirect to admin dashboard
      redirect("/dashboard/admin");
    }

    if (session.user.role === "user" && session.isMentor) {
      // redirect to mentor dashboard
      redirect("/dashboard/mentor/");
    }

    if (session.user.role === "user" && !session.isMentor) {
      // redirect to user dashboard
      redirect("/dashboard/student");
    }
  }
}
