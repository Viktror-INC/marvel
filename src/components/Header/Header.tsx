import React from "react";
import { Link } from "react-router-dom";
import Search from "../Search/Search";
import "./Header.scss";

// const menuList = [
//   { name: "Main", link: "/" },
//   { name: "Main", link: "/" },
// ];

export default function Header() {
  return (
    <header className="headerWrap">
      <div className="container">
        <nav className="headerInner">
          <Link to={`/`}>
            <h1>
              All Marvel Heroes <br />
              in one place
            </h1>
          </Link>
          <Link to={`/`}>
            <img
              className="headerHome"
              src="/images/header/home.png"
              width={25}
              height={25}
              alt="to main page"
            />
          </Link>
          <span className="headerTag">
            “With great power comes great responsibility”
          </span>
          <span className="headerTagDescription">
            Benjamin Parker (aka Uncle Ben)
          </span>
          <Search />
        </nav>
      </div>
    </header>
  );
}
