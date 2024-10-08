import React, { useState } from "react";
import { NavLink, Link } from "react-router-dom";
import { BiSolidDashboard, BiLogOutCircle } from "react-icons/bi";
import { FaUserShield, FaBusAlt } from "react-icons/fa";
import { IoBus } from "react-icons/io5";
import { IoMdHome } from "react-icons/io";
import { BsBuildingsFill } from "react-icons/bs";
import { FaUser, FaRoute } from "react-icons/fa6";
import { MdPayment } from "react-icons/md";
import { BsMicrosoftTeams } from "react-icons/bs";

const Navbar = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  return (
    <nav className="bg-primary text-white top-0 left-0 w-full px-4 py-2">
      <div className="mx-auto flex items-center justify-between">
        <Link to="/" className="flex items-center ml-2">
          <IoBus className="text-2xl lg:mt-1" />
          <span className="text-white font-bold text-lg ml-2">Tap & Travel</span>
        </Link>
        <div className="lg:hidden">
          {/* Hamburger Icon */}
          <button
            className="text-white hover:text-gray-300 mt-2 focus:outline-none"
            onClick={toggleMobileMenu}
          >
            <svg
              className="w-6 h-6"
              fill="none"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path d="M4 6h16M4 12h16M4 18h16"></path>
            </svg>
          </button>
        </div>
        {/* Horizontal Menu for Large Screens */}
        <div className="hidden lg:flex space-x-6">
          <NavLink to="/" className="app-nav-li">
            <BiSolidDashboard />
            <span className="text-white hover:text-primary">Dashboard</span>
          </NavLink>
          <NavLink to="/newadmin" className="app-nav-li">
            <FaUserShield />
            <span className="text-white hover:text-primary">New Admin</span>
          </NavLink>
          <NavLink to="/" className="app-nav-li">
            <BsMicrosoftTeams />
            <span className="text-white hover:text-primary">About Us</span>
          </NavLink>
        </div>
      </div>
      {/* Mobile Menu */}
      <div
        className={`${
          isMobileMenuOpen ? "translate-x-0" : "translate-x-full"
        } fixed top-0 right-0 h-full w-1/2 bg-primary py-4 pl-1 transition-transform duration-300 ease-in-out transform z-50 lg:hidden`}
      >
        <div className="h-[80vh] grid grid-rows-[auto,auto]">
          <div>
          <ul className="space-y-4 w-full">
            <li className="app-side-li">
              <NavLink to="/" className="flex items-center gap-4">
                <IoMdHome />
                <span>Dashboard</span>
              </NavLink>
            </li>
            <li className="app-side-li">
              <NavLink to="/companies" className="flex items-center gap-4">
                <BsBuildingsFill />
                <span>Companies</span>
              </NavLink>
            </li>
            <li className="app-side-li">
              <NavLink to="/companies" className="flex items-center gap-4">
                <FaBusAlt />
                <span>Buses</span>
              </NavLink>
            </li>
            <li className="app-side-li">
              <NavLink to="/companies" className="flex items-center gap-4">
                <FaUser />
                <span>Users</span>
              </NavLink>
            </li>
            <li className="app-side-li">
              <NavLink to="/companies" className="flex items-center gap-4">
                <FaRoute />
                <span>Routes</span>
              </NavLink>
            </li>
            <li className="app-side-li">
              <NavLink to="/companies" className="flex items-center gap-4">
                <MdPayment />
                <span>Payments</span>
              </NavLink>
            </li>
      
          </ul>
          </div>
          <div className="px-4 flex flex-col-reverse">
            <NavLink to="/login" className="app-nav-li">
              <BiLogOutCircle />
              <span className="text-white hover:text-primary">Logout</span>
            </NavLink>
          </div>
        </div>
      </div>
      {/* Dark Overlay */}
      {isMobileMenuOpen && (
        <div
          className="fixed inset-0 bg-black opacity-50"
          onClick={toggleMobileMenu}
        ></div>
      )}
    </nav>
  );
};

export default Navbar;
