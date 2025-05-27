import Image from "next/image";

import { getCurrentUser } from "@/app/[locale]/actions/auth";

import { LocaleSwitcher } from "../LanguageSwitcher";
import { AuthDialog } from "../auth.ts/authDialog";
import UserDropdown from "../user-dropdown";

import { NavMenu } from "./nav-menu";
import { NavigationSheet } from "./navigation-sheet";

const Navbar02Page = async () => {
  const user = await getCurrentUser();

  return (
    <div className=" bg-background fixed w-full z-50">
      <nav className="h-16 shadow-2xs bg-pink-500 font-bold z-50">
        <div className="h-full flex items-center justify-between max-w-screen-xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-8">
            {/* Desktop Menu */}
            <div>
              <Image
                src="/logo.webp"
                alt="Logo"
                width={50}
                height={50}
                className="rounded-full"
              />
            </div>
            <NavMenu className="hidden md:block" />
          </div>
          <div className=" hidden md:flex items-center gap-3">
            <LocaleSwitcher />
            {user ? (
              <UserDropdown email={user.email} name={user.name} />
            ) : (
              <AuthDialog />
            )}
          </div>

          {/* Mobile Menu */}
          <div className="md:hidden flex items-center space-x-2">
            <LocaleSwitcher />

            {user ? (
              <UserDropdown email={user.email} name={user.name} />
            ) : (
              <AuthDialog />
            )}
            <NavigationSheet />
          </div>
        </div>
      </nav>
    </div>
  );
};

export default Navbar02Page;
