import React from "react";

const Header = () => {
  const toggleDarkMode = () => {
    // document.body.classList.toggle("bg-dark");
    alert("Dark Mode Button");
  };

  return (
    <nav className="bg-slate-50 shadow-sm shadow-slate-500/20 h-20 flex justify-between items-center px-10">
      <h2 className="text-2xl font-bold">Where in the world?</h2>
      <button onClick={() => toggleDarkMode()}>{"<mode>"}</button>
    </nav>
  );
};

export default Header;
