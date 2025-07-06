import { NavigationMenuProps } from "@radix-ui/react-navigation-menu";
import { RiDashboard2Fill, RiPokerClubsFill } from "@remixicon/react";
import { Home, PhoneCall, ShoppingCart, User2, Video } from "lucide-react";
import Link from "next/link";
import { getTranslations } from "next-intl/server";

import { getCurrentUser } from "@/app/[locale]/actions/auth";
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
} from "@/components/ui/navigation-menu";

export const NavMenu = async (props: NavigationMenuProps) => {
  const t = await getTranslations("Navbar");
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
                {t("home")}
              </div>
            </Link>
          </NavigationMenuLink>
        </NavigationMenuItem>
        <NavigationMenuItem>
          <NavigationMenuLink asChild>
            <Link href="/products" className="text-lg">
              <div className="flex items-center gap-x-2">
                <ShoppingCart className="md:hidden text-black" />
                {t("products")}
              </div>
            </Link>
          </NavigationMenuLink>
        </NavigationMenuItem>
        <NavigationMenuItem>
          <NavigationMenuLink asChild>
            <Link href="/nosotros" className="text-lg">
              <div className="flex items-center gap-x-2">
                <User2 className="md:hidden text-black" />
                {t("about")}
              </div>
            </Link>
          </NavigationMenuLink>
        </NavigationMenuItem>
        <NavigationMenuItem>
          <NavigationMenuLink asChild>
            <Link href="/contact" className="text-lg">
              <div className="flex items-center gap-x-2">
                <PhoneCall className="md:hidden text-black" />
                {t("contact")}
              </div>
            </Link>
          </NavigationMenuLink>
        </NavigationMenuItem>
        <NavigationMenuItem>
          <NavigationMenuLink asChild>
            <Link href="/videos" className="text-lg">
              <div className="flex items-center gap-x-2">
                <Video className="md:hidden text-black" />
                {t("wrappers")}
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
        {isAdmin && (
          <NavigationMenuItem>
            <NavigationMenuLink asChild>
              <Link href="/admin/create" className="text-lg">
                <div className="flex items-center gap-x-2">
                  <RiPokerClubsFill className="md:hidden text-black" />
                  Crear
                </div>
              </Link>
            </NavigationMenuLink>
          </NavigationMenuItem>
        )}
      </NavigationMenuList>
    </NavigationMenu>
  );
};
