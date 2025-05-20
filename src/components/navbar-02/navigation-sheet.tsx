import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Menu } from "lucide-react";
import { Logo } from "./logo";
import { NavMenu } from "./nav-menu";
import { Title } from "../ui/Title";

export const NavigationSheet = () => {
  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button variant="outline" size="icon">
          <Menu />
        </Button>
      </SheetTrigger>
      <SheetContent className="max-w-[200px]">
        <div className="flex flex-col gap-4 p-4">
          <Title size="small" />
          <NavMenu orientation="vertical" />
        </div>
      </SheetContent>
    </Sheet>
  );
};
