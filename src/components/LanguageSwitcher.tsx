"use client";

import Image from "next/image";
import { usePathname, useRouter } from "next/navigation";
import { useLocale } from "next-intl";
import { useTransition } from "react";

import { Button } from "./button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "./dropdown-menu";

export function LocaleSwitcher() {
  const [isPending, startTransition] = useTransition();
  const router = useRouter();
  const pathname = usePathname();
  const currentLocale = useLocale();

  const onSelectChange = (nextLocale: string) => {
    startTransition(() => {
      // Eliminar el locale actual de la ruta
      const newPath = `/${nextLocale}${pathname.replace(/^\/[a-z]{2}/, "")}`;
      router.push(newPath);
      router.refresh();
    });
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="link"
          size="sm"
          className="w-full justify-start"
          disabled={isPending}
        >
          <span className="text-white">
            {currentLocale === "es" ? (
              <Image src="/es.svg" alt="Spanish" width={20} height={20} />
            ) : (
              <Image src="/um.svg" alt="English" width={20} height={20} />
            )}
          </span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuItem
          onClick={() => onSelectChange("es")}
          disabled={currentLocale === "es"}
        >
          <span className="mr-2">
            <Image src="/es.svg" alt="Spanish" width={20} height={20} />
          </span>
          <span>Español</span>
        </DropdownMenuItem>
        <DropdownMenuItem
          onClick={() => onSelectChange("en")}
          disabled={currentLocale === "en"}
        >
          <span className="mr-2">
            <Image src="/um.svg" alt="English" width={20} height={20} />
          </span>
          <span>English</span>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
