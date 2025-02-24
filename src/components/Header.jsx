import Logo from "../assets/Logo.png";

function Header() {
  return (
    <header>
      <img src={Logo} alt="Logo" className="w-logo-width h-logo-auto" />
    </header>
  );
}

export default Header;
