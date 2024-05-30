"use client";

import { ColumnDef } from "@tanstack/react-table";
import { FullCourse, User } from "@/lib/types";
import { Checkbox } from "@/components/ui/checkbox";
import { ArrowUpDown, MoreHorizontal } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { useState } from "react";
import { Label } from "@/components/ui/label";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Input } from "@/components/ui/input";
import { toast } from "react-toastify";
import { useWalletStore } from "@/stores/wallet";
import { CONTRACTID } from "@/lib/config";
import Link from "next/link";

export const columns: ColumnDef<User>[] = [
  {
    id: "select",
    header: ({ table }) => (
      <Checkbox
        checked={
          table.getIsAllPageRowsSelected() ||
          (table.getIsSomePageRowsSelected() && "indeterminate")
        }
        onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
        aria-label="Select all"
      />
    ),
    cell: ({ row }) => (
      <Checkbox
        checked={row.getIsSelected()}
        onCheckedChange={(value) => row.toggleSelected(!!value)}
        aria-label="Select row"
      />
    ),
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: "account_id",
    header: ({ column }) => {
      return (
        <Button
          className="hover:bg-aqua-blue hover:bg-opacity-100 hover:text-white"
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Account ID
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
  },
  {
    accessorKey: "name",
    header: ({ column }) => {
      return (
        <Button
          className="hover:bg-aqua-blue hover:bg-opacity-100 hover:text-white"
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Name
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
    cell: ({ row }) => <div className="capitalize">{row.getValue("name")}</div>,
  },
  {
    accessorKey: "email",
    header: ({ column }) => {
      return (
        <Button
          className="hover:bg-aqua-blue hover:bg-opacity-100 hover:text-white"
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Email
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
    cell: ({ row }) => <div className="lowercase">{row.getValue("email")}</div>,
  },
  {
    accessorKey: "created_at",
    header: ({ column }) => {
      return (
        <Button
          className="hover:bg-aqua-blue hover:bg-opacity-100 hover:text-white"
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Created At
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
    cell: ({ row }) => (
      <div className="uppercase ">
        {new Date(row.getValue("created_at")).toISOString().split("T")[0]}
      </div>
    ),
  },
  {
    id: "actions",
    enableHiding: false,
    cell: ({ row }) => {
      const user = row.original;
      const [isEditUserOpen, setIsEditUserOpen] = useState(false);
      const [isDeleteUserOpen, setIsDeleteUserOpen] = useState(false);
      const { wallet, signedAccountId } = useWalletStore();
      const [name, setName] = useState(user.name);
      const [email, setEmail] = useState(user.email);
      const [username, setUsername] = useState(user.username);
      const [phone, setPhone] = useState(user.phone);

      const handleUpdateUserInfo = async (
        e: React.FormEvent<HTMLFormElement>
      ) => {
        e.preventDefault();
        // update user info
        const loadingToast = toast.loading("Updating user info...");
        if (!wallet) {
          toast.update(loadingToast, {
            type: "error",
            render: "Wallet not found",
            autoClose: 1000,
            isLoading: false,
          });
          return;
        }

        if (!signedAccountId) {
          toast.update(loadingToast, {
            type: "error",
            render: "Account not found",
            autoClose: 1000,
            isLoading: false,
          });
          return;
        }

        try {
          // Get updated info
          console.log("User Data : ", name, email, username, phone);

          await wallet.callMethod({
            contractId: CONTRACTID,
            method: "update_user_min_info_by_admin",
            args: {
              account_id: user.account_id,
              name,
              email,
              username,
              phone,
              updated_at: new Date().getTime(),
            },
          });

          toast.update(loadingToast, {
            type: "success",
            render: "User info updated successfully",
            autoClose: 1000,
            isLoading: false,
          });
        } catch (error) {
          console.error(error);
          toast.update(loadingToast, {
            type: "error",
            render: "An error occurred while updating user info",
            autoClose: 1000,
            isLoading: false,
          });
        }
      };

      const handleDeleteUser = async () => {}; // handle delete user

      return (
        <>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="h-8 w-8 p-0">
                <span className="sr-only">Open menu</span>
                <MoreHorizontal className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuLabel>Actions</DropdownMenuLabel>
              <DropdownMenuItem>
                <Link href={`/profile/${user.account_id}`}>View Profile</Link>
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem onClick={() => setIsEditUserOpen(true)}>
                Edit user
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => setIsDeleteUserOpen(true)}>
                Delete user
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>

          <Dialog open={isEditUserOpen} onOpenChange={setIsEditUserOpen}>
            <DialogContent className="sm:max-w-[35%]">
              <DialogHeader>
                <DialogTitle className="text-xl font-medium capitalize text-aqua-blue font-poppins ">
                  Edit user details
                </DialogTitle>
                <DialogDescription className="text-schemes-secondary">
                  Make changes to the user info here. Click save when you're
                  done.
                </DialogDescription>
              </DialogHeader>
              <form onSubmit={handleUpdateUserInfo}>
                <div className="grid gap-4 py-4">
                  <div className="grid items-center grid-cols-4 gap-4">
                    <Label
                      htmlFor="name"
                      className="capitalize text-base font-normal text-right text-aqua-blue font-poppins "
                    >
                      Name
                    </Label>
                    <input
                      id="name"
                      className="col-span-3 outline-aqua-blue py-3 border border-aqua-blue rounded-lg px-3 font-poppins font-normal text-[0.8rem] leading-5 text-schemes-primary"
                      defaultValue={user.name}
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                    />
                  </div>
                  <div className="grid items-center grid-cols-4 gap-4">
                    <Label
                      htmlFor="email"
                      className="capitalize text-base font-normal text-right text-aqua-blue font-poppins "
                    >
                      email
                    </Label>
                    <input
                      id="email"
                      className="col-span-3 outline-aqua-blue py-3 border border-aqua-blue rounded-lg px-3 font-poppins font-normal text-[0.8rem] leading-5 text-schemes-primary"
                      defaultValue={user.email}
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                    />
                  </div>
                  <div className="grid items-center grid-cols-4 gap-4">
                    <Label
                      htmlFor="username"
                      className="capitalize text-base font-normal text-right text-aqua-blue font-poppins "
                    >
                      username
                    </Label>
                    <input
                      id="username"
                      className="col-span-3 outline-aqua-blue py-3 border border-aqua-blue rounded-lg px-3 font-poppins font-normal text-[0.8rem] leading-5 text-schemes-primary"
                      defaultValue={user.username}
                      readOnly
                      disabled
                    />
                  </div>
                  <div className="grid items-center grid-cols-4 gap-4">
                    <Label
                      htmlFor="phone"
                      className="capitalize text-base font-normal text-right text-aqua-blue font-poppins "
                    >
                      phone
                    </Label>
                    <input
                      id="phone"
                      type="tel"
                      className="col-span-3 outline-aqua-blue py-3 border border-aqua-blue rounded-lg px-3 font-poppins font-normal text-[0.8rem] leading-5 text-schemes-primary"
                      defaultValue={user.phone}
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                    />
                  </div>
                  {/* <div className="grid grid-cols-4 items-center gap-4">
                  <Label
                    className="text-right capitalize text-base font-normal text-aqua-blue font-poppins"
                    htmlFor="picture"
                  >
                    Picture
                  </Label>
                  <div className="col-span-3 flex items-center gap-4 outline-aqua-blue py-3 border border-aqua-blue rounded-lg px-3  ">
                    <Avatar>
                      <AvatarImage alt="Profile picture" src={user.picture} />
                      <AvatarFallback>PD</AvatarFallback>
                    </Avatar>
                    <Input
                      className="  rounded-lg px-3 font-poppins font-normal text-[0.8rem] leading-5 text-schemes-primary"
                      id="picture"
                      type="file"
                    />
                  </div>
                </div> */}
                </div>
                <DialogFooter>
                  <Button
                    type="submit"
                    className=" bg-aqua-blue outline-aqua-blue text-white rounded-lg px-5 py-2 font-poppins font-normal text-[0.88rem] leading-5 duration-700 text-center hover:bg-white hover:text-aqua-blue hover:border hover:border-aqua-blue"
                  >
                    Save changes
                  </Button>
                </DialogFooter>
              </form>
            </DialogContent>
          </Dialog>
          <AlertDialog
            open={isDeleteUserOpen}
            onOpenChange={setIsDeleteUserOpen}
          >
            <AlertDialogContent>
              <AlertDialogHeader>
                <AlertDialogTitle className="text-xl font-medium capitalize text-aqua-blue font-poppins ">
                  Are you absolutely sure?
                </AlertDialogTitle>
                <AlertDialogDescription className="text-schemes-secondary font-poppins ">
                  This action cannot be undone. This will permanently delete
                  this account.
                </AlertDialogDescription>
              </AlertDialogHeader>
              <AlertDialogFooter>
                <AlertDialogCancel className="text-aqua-blue hover:text-aqua-blue outline-aqua-blue hover:outline-aqua-blue focus-visible:ring-aqua-blue ">
                  No
                </AlertDialogCancel>
                <AlertDialogAction
                  onClick={handleDeleteUser}
                  className="bg-aqua-blue hover:bg-aqua-blue outline-aqua-blue hover:outline-aqua-blue  focus-visible:ring-aqua-blue"
                >
                  Yes
                </AlertDialogAction>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>
        </>
      );
    },
  },
];
