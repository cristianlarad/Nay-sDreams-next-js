import { NavigationMenuProps } from "@radix-ui/react-navigation-menu";
import { RiDashboard2Fill } from "@remixicon/react";
import { Home, PhoneCall, ShoppingCart, User2 } from "lucide-react";
import Link from "next/link";

import { getCurrentUser } from "@/app/actions/auth";
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
} from "@/components/ui/navigation-menu";

export const NavMenu = async (props: NavigationMenuProps) => {
  const user = await getCurrentUser();
  const isAdmin = user?.isAdmin === true || user?.isAdmin === "true";
  return (
    <NavigationMenu {...props}>
      <NavigationMenuList className="gap-4 md:text-white  font-bold data-[orientation=vertical]:flex-col data-[orientation=vertical]:items-start">
        <NavigationMenuItem>
          <NavigationMenuLink asChild>
            <Link href="/" className="text-lg">
              <div className="flex items-center gap-x-2 ">
                <Home className="md:hidden text-black" />
                Inicio
              </div>
            </Link>
          </NavigationMenuLink>
        </NavigationMenuItem>
        <NavigationMenuItem>
          <NavigationMenuLink asChild>
            <Link href="/products" className="text-lg">
              <div className="flex items-center gap-x-2">
                <ShoppingCart className="md:hidden text-black" />
                Productos
              </div>
            </Link>
          </NavigationMenuLink>
        </NavigationMenuItem>
        <NavigationMenuItem>
          <NavigationMenuLink asChild>
            <Link href="/nosotros" className="text-lg">
              <div className="flex items-center gap-x-2">
                <User2 className="md:hidden text-black" />
                Nosotros
              </div>
            </Link>
          </NavigationMenuLink>
        </NavigationMenuItem>
        <NavigationMenuItem>
          <NavigationMenuLink asChild>
            <Link href="/contact" className="text-lg">
              <div className="flex items-center gap-x-2">
                <PhoneCall className="md:hidden text-black" />
                Contacto
              </div>
            </Link>
          </NavigationMenuLink>
        </NavigationMenuItem>
        {isAdmin && (
          <NavigationMenuItem>
            <NavigationMenuLink asChild>
              <Link href="/admin/pedidos" className="text-lg">
                <div className="flex items-center gap-x-2">
                  <RiDashboard2Fill className="md:hidden text-black" />
                  Pedidos
                </div>
              </Link>
            </NavigationMenuLink>
          </NavigationMenuItem>
        )}
      </NavigationMenuList>
    </NavigationMenu>
  );
};
