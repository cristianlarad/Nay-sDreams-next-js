import { Button } from "@/components/ui/button";
import { Logo } from "./logo";
import { NavMenu } from "./nav-menu";
import { NavigationSheet } from "./navigation-sheet";
import { User2 } from "lucide-react";
import Image from "next/image";

const Navbar02Page = () => {
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

          <div className="flex items-center gap-3">
            <Button
              variant="link"
              className="hidden text-white sm:inline-flex bg-pink-500 hover:bg-pink-600"
            >
              <span className="flex items-center gap-2">
                <User2 /> Iniciar Sesión
              </span>
            </Button>

            {/* Mobile Menu */}
            <div className="md:hidden">
              <NavigationSheet />
            </div>
          </div>
        </div>
      </nav>
    </div>
  );
};

export default Navbar02Page;
