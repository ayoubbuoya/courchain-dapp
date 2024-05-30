import UsersOverview from "@/components/dashboard/admin/usersOverview";
import SplitLayout from "@/components/dashboard/splitLayout";
import { authConfig } from "@/lib/auth";
import initAdminBlockchainConnection from "@/lib/blockchain";
import { CONTRACTID } from "@/lib/config";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import { DataTable } from "./data-table";
import { columns } from "./columns";

export default async function AdminDashboardUsers() {
  const session = await getServerSession(authConfig);

  if (!session) {
    redirect("/login");
  }

  if (session.user.role !== "admin") {
    redirect("/dashboard");
  }

  const adminAccount = await initAdminBlockchainConnection();
  console.log("Admin Account : ", adminAccount);
  // get all users from blockchain
  const users = await adminAccount.viewFunction({
    contractId: CONTRACTID,
    methodName: "get_users",
  });

  // sort users by created_at
  const sortedUsers = users.sort(
    (a: { created_at: number }, b: { created_at: number }) =>
      b.created_at - a.created_at
  );

  console.log("Users : ", users);

  return (
    <div className="md:grid md:grid-cols-12">
      <SplitLayout session={session} />
      <main className="container min-h-screen pb-5 mx-auto md:px-5 md:col-span-11 md:pb-10">
        <div className="mt-4 md:mt-0 px-3 w-full md:px-0 md:max-w-[39%]">
          <h1 className="mb-1 text-2xl font-normal uppercase text-aqua-blue font-poppins md:text-3xl ">
            Users Overview
          </h1>
        </div>

        <UsersOverview users={sortedUsers} />

        <div className="mt-4 md:max-w-[85%] mx-auto ">
          <DataTable columns={columns} data={users} />
        </div>
      </main>
    </div>
  );
}
