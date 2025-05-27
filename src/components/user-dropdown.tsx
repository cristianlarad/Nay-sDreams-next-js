import { logout } from "@/app/[locale]/actions/auth";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/avatar";
import { Button } from "@/components/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "@/components/dropdown-menu";

export interface IUserProps {
  name: string;
  email: string;
}

export default function UserDropdown({ email, name }: IUserProps) {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" className=" p-0 hover:bg-transparent">
          <Avatar className="size-8">
            <AvatarImage
              src="/avatar.webp"
              width={32}
              height={32}
              alt="Profile image"
            />

            <AvatarFallback
              className="text-white font-medium"
              style={{
                backgroundColor: `hsl(${Math.floor(
                  Math.random() * 100
                )}, 70%, 50%)`,
              }}
            >
              {name.charAt(0).toUpperCase()}
            </AvatarFallback>
          </Avatar>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="max-w-64 p-2" align="end">
        <DropdownMenuLabel className="flex min-w-0 flex-col py-0 px-1 mb-2">
          <span className="truncate text-sm font-medium text-foreground mb-0.5">
            {name}
          </span>
          <span className="truncate text-xs font-normal text-muted-foreground">
            {email}
          </span>
        </DropdownMenuLabel>

        <DropdownMenuItem className="">
          <form action={logout}>
            <Button type="submit" variant="ghost" className=" ">
              <span>Cerrar Sesión</span>
            </Button>
          </form>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
