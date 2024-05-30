import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuPortal,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import Link from "next/link";

export default function ExploreButton() {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <button className="flex items-center justify-start gap-2 overflow-hidden bg-white-900 px-4 py-1.5 border-[1px] border-aqua-blue border-solid rounded-3xl  text-aqua-blue text-base text-center cursor-pointer outline-aqua-blue  ">
          <img
            className="overflow-hidden max-w-6 shrink-0"
            alt=""
            src="/iconparkoutlinedown.svg"
          />
          <span className="text-base font-normal font-roboto">Explore</span>
        </button>
      </DropdownMenuTrigger>

      <DropdownMenuContent className="md:min-w-64">
        <DropdownMenuLabel className="capitalize font-poppins font-medium text-xl text-black">
          browse courses
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuGroup className="mt-2">
          <DropdownMenuItem className="bg-explore-button-gradient ">
            <span className="font-poppins font-medium text-base text-dimgray-800">
              By Level :
            </span>
          </DropdownMenuItem>
        </DropdownMenuGroup>
        <DropdownMenuGroup className="px-1.5 mt-2">
          <DropdownMenuItem className="pb-1">
            <Link
              href="/courses?level=beginner"
              className="font-poppins font-normal text-base text-schemes-secondary"
            >
              Beginner
            </Link>
          </DropdownMenuItem>

          <DropdownMenuItem className="pb-1">
            <Link
              href="/courses?level=intermediate"
              className="font-poppins font-normal text-base text-schemes-secondary"
            >
              Intermediate
            </Link>
          </DropdownMenuItem>

          <DropdownMenuItem className="pb-1">
            <Link
              href="/courses?level=advanced"
              className="font-poppins font-normal text-base text-schemes-secondary"
            >
              Advanced
            </Link>
          </DropdownMenuItem>
        </DropdownMenuGroup>
        <DropdownMenuSeparator />
        <DropdownMenuGroup className="">
          <DropdownMenuItem className="bg-explore-button-gradient ">
            <span className="font-poppins font-medium text-base text-dimgray-800">
              By Category :
            </span>
          </DropdownMenuItem>
        </DropdownMenuGroup>
        <DropdownMenuGroup className="px-1.5 mt-2">
          <DropdownMenuItem className="pb-1">
            <Link
              href="/courses?category=Computer Science"
              className="font-poppins font-normal text-base text-schemes-secondary"
            >
              Computer Science
            </Link>
          </DropdownMenuItem>

          <DropdownMenuItem className="pb-1">
            <Link
              href="/courses?category=Data Science"
              className="font-poppins font-normal text-base text-schemes-secondary"
            >
              Data Science
            </Link>
          </DropdownMenuItem>
          <DropdownMenuItem className="pb-1">
            <Link
              href="/courses?category=Artificial Intelligence"
              className="font-poppins font-normal text-base text-schemes-secondary"
            >
              Artificial Intelligence
            </Link>
          </DropdownMenuItem>
          <DropdownMenuItem className="pb-1">
            <Link
              href="/courses?category=Blockchain"
              className="font-poppins font-normal text-base text-schemes-secondary"
            >
              Blockchain
            </Link>
          </DropdownMenuItem>
          <DropdownMenuItem className="pb-1">
            <Link
              href="/courses?category=Machine Learning"
              className="font-poppins font-normal text-base text-schemes-secondary"
            >
              Machine Learning
            </Link>
          </DropdownMenuItem>

          <DropdownMenuItem className="pb-1">
            <Link
              href="/courses?category=Web Development"
              className="font-poppins font-normal text-base text-schemes-secondary"
            >
              Web Development
            </Link>
          </DropdownMenuItem>

          <DropdownMenuItem className="pb-1">
            <Link
              href="/courses?category=Mobile Development"
              className="font-poppins font-normal text-base text-schemes-secondary"
            >
              Mobile Development
            </Link>
          </DropdownMenuItem>

          <DropdownMenuItem className="pb-1">
            <Link
              href="/courses?category=Game Development"
              className="font-poppins font-normal text-base text-schemes-secondary"
            >
              Game Development
            </Link>
          </DropdownMenuItem>
        </DropdownMenuGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
