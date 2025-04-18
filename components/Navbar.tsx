"use client";

import {
  Navbar as HeroUINavbar,
  NavbarBrand,
  NavbarContent,
  NavbarItem,
  NavbarMenuToggle,
  NavbarMenu,
  NavbarMenuItem,
} from "@heroui/navbar";
import { Link } from "@heroui/link";
import { useState } from "react";

import { menuItems } from "@/constants";
import { usePathname } from "next/navigation";
import { useIsMounted } from "@/hooks/useIsMounted";

const Navbar = () => {
  const pathname = usePathname();
  const isMounted = useIsMounted();
  const [isOpen, setIsOpen] = useState(false);

  return (
    <HeroUINavbar onMenuOpenChange={setIsOpen}>
      <NavbarContent className="sm:!basis-1/3">
        <NavbarMenuToggle
          className="sm:hidden"
          aria-label={isOpen ? "Close menu" : "Open menu"}
        />
        <NavbarBrand className="title">
          <Link color="foreground" href="/">
            <h3 className="text-xl sm:text-2xl font-bold">Meme Handbook</h3>
          </Link>
        </NavbarBrand>
      </NavbarContent>
      <NavbarContent className="hidden sm:flex sm:!basis-2/3">
        {menuItems.map(({ label, link }) => (
          <NavbarItem key={label}>
            <Link
              size="lg"
              href={link}
              color={isMounted && pathname === link ? "primary" : "foreground"}
            >
              {label}
            </Link>
          </NavbarItem>
        ))}
      </NavbarContent>
      <NavbarMenu>
        {menuItems.map(({ label, link }) => (
          <NavbarMenuItem key={label}>
            <Link
              isBlock
              size="lg"
              className="w-full"
              href={link}
              color={isMounted && pathname === link ? "primary" : "foreground"}
            >
              {label}
            </Link>
          </NavbarMenuItem>
        ))}
      </NavbarMenu>
    </HeroUINavbar>
  );
};

export default Navbar;
