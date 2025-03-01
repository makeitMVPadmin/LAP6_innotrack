import Logo from "../assets/Logo.png";
import { Button } from "./ui/button";
import house from "../assets/icons/house.svg";
import group from "../assets/icons/group.svg";
import groups from "../assets/icons/groups.svg";

function Header() {
  return (
    <header className="flex h-[5rem] items-center justify-between px-6 bg-white shadow-md">
      <img
        src={Logo}
        alt="Logo"
        className="flex w-[240px] justify-center items-center flex-shrink-0"
      />
      <div className="flex items-center space-x-10">
        <div className="flex items-center space-x-4">
          <div className="flex flex-col items-center">
            <span>
              <img src={house} alt="house icon" />
            </span>
            <p>Home</p>
          </div>
          <div className="flex flex-col items-center">
            <span>
              <img src={group} alt="group icon" />
            </span>
            <p>Communities</p>
          </div>
          <div className="flex flex-col items-center">
            <span>
              <img src={groups} alt="groups icon" />
            </span>
            <p>Coffee Chat</p>
          </div>
        </div>
        <div className="flex items-center space-x-4">
          <Button className="bg-gray-900] text-[#28363F] border-black border-l border-t border-r-2 border-b-2 rounded-lg shadow-customButton">
            Login
          </Button>
          <Button className="bg-[#0264D4] hover:bg-[#0264D4] border-black border-l border-t border-r-2 border-b-2 rounded-lg shadow-customButton">
            Sign Up
          </Button>
        </div>
      </div>
    </header>
  );
}

export default Header;
