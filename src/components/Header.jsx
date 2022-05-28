import React from "react";

const Moon = () => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      className="h-6 w-6"
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
      strokeWidth={2}
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z"
      />
    </svg>
  );
};
const Sun = () => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      className="h-6 w-6"
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
      strokeWidth={2}
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z"
      />
    </svg>
  );
};

const Header = () => {
  const toggleDarkMode = () => {
    document.body.classList.toggle("bg-dark");
    alert("Dark Mode Button");
  };

  return (
    <nav className="bg-slate-50 shadow-sm shadow-slate-500/20 h-20 flex justify-between items-center px-10">
      <h2 className="text-2xl font-bold">Where in the world?</h2>
      <button onClick={() => toggleDarkMode()} className="btn">
        <Moon />
        <span className="spans">Dark Mode</span>
      </button>
    </nav>
  );
};

export default Header;
