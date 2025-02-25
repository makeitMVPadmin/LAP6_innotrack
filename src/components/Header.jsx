import Logo from "../assets/Logo.png";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  Menubar,
  MenubarContent,
  MenubarItem,
  MenubarMenu,
  MenubarSeparator,
  MenubarShortcut,
  MenubarTrigger,
} from "@/components/ui/menubar";

function Header() {
  return (
    <header className="flex items-center justify-between px-6 bg-white shadow-md">
      <img
        src={Logo}
        alt="Logo"
        className="flex w-[366px] justify-center items-center flex-shrink-0"
      />
      <div className="flex items-center space-x-4">
        <Menubar className="rounded-[var(--radius)] border-t border-l border-r-2 border-b-2 border-[#28363F] bg-[var(--background)]">
          <MenubarMenu>
            <MenubarTrigger>Innotrack</MenubarTrigger>
            <MenubarTrigger>Hot Topics</MenubarTrigger>
            <MenubarTrigger>Home</MenubarTrigger>
          </MenubarMenu>
        </Menubar>

        <Avatar>
          <AvatarImage src="https://github.com/shadcn.png" alt="@shadcn" />
          <AvatarFallback>CN</AvatarFallback>
        </Avatar>
      </div>
    </header>
  );
}

export default Header;
