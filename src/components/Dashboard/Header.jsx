import React from "react";
import Logo from "../../assets/logo.png";

const Header = () => {
  return (
    <header className="bg-white">
      <div className="container mx-auto flex items-center px-2 pt-4">
        {/* Left side logo */}
        <div className="flex-shrink-0">
          <img src={Logo} alt="Logo" className="h-14 w-auto" />
        </div>
      </div>
    </header>
  );
};

export default Header;
