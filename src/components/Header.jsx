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
    <header className="flex items-center justify-between px-6 py-3 bg-white shadow-md">
      <img src={Logo} alt="Logo" className="w-logo-width h-logo-auto" />
      <div className="flex items-center space-x-4">
        <Menubar>
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
