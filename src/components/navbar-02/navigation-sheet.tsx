import { PopoverTrigger } from "@radix-ui/react-popover";
import { Menu } from "lucide-react";

import { Button } from "@/components/ui/button";

import { Popover, PopoverContent } from "../popover";
import { Title } from "../ui/Title";

import { NavMenu } from "./nav-menu";

export const NavigationSheet = () => {
  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button variant="outline" size="icon">
          <Menu />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="max-w-[200px]">
        <div className="flex flex-col gap-4 p-4">
          <Title size="small" />
          <NavMenu orientation="vertical" />
        </div>
      </PopoverContent>
    </Popover>
  );
};
