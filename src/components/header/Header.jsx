import React, { useState, useEffect } from "react";
import { HiOutlineSearch } from "react-icons/hi";
import { SlMenu } from "react-icons/sl";
import { VscChromeClose } from "react-icons/vsc";
import { useNavigate, useLocation } from "react-router-dom";

import "./header.scss";

import ContentWrapper from "../contentWrapper/ContentWrapper";
import logo from "../../assets/logo_light.png";

const Header = () => {
  const [show, setShow] = useState("top");
  const [lastScrollY, setLastScrollY] = useState(0);
  const [mobileMenu, setMobileMenu] = useState(false);
  const [query, setQuery] = useState("");
  const [showSearch, setShowSearch] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    scrollTo(0, 0);
  }, [location]);

  const controlNavBar = () => {
    if (scrollY > 200) {
      if (scrollY > lastScrollY) setShow("hide");
      else setShow("show");
    } else setShow("top");
    setLastScrollY(scrollY);
  };

  useEffect(() => {
    addEventListener("scroll", controlNavBar);
    return () => removeEventListener("scroll", controlNavBar);
  }, [lastScrollY]);

  const openSearch = () => {
    setShowSearch(true);
    setMobileMenu(false);
  };
  const openMiobileMenu = () => {
    setMobileMenu(true);
    setShowSearch(false);
  };
  const handleNavigation = (type) => {
    type === "movie" ? navigate("/explore/movie") : navigate("/explore/tv");
    setMobileMenu(false);
  };
  const handleSearch = () => {
    if (query.trim().length > 0) {
      navigate(`/search/${query.trim()}`);
      setTimeout(() => {
        setShowSearch(false);
      }, 1000);
    }
  };

  return (
    <header className={`header ${mobileMenu ? "mobileView" : ""} ${show}`}>
      <ContentWrapper>
        <div
          className="logo"
          onClick={() => {
            navigate("/");
            setMobileMenu(false);
          }}
        >
          <img src={logo} alt="logo image" />
        </div>
        <ul className="menuItems">
          <li className="menuItem" onClick={() => handleNavigation("movie")}>
            Movies
          </li>
          <li className="menuItem" onClick={() => handleNavigation("tv")}>
            TV Shows
          </li>
          <li className="menuItem">
            <HiOutlineSearch onClick={openSearch} />
          </li>
        </ul>
        <div className="mobileMenuItems">
          <HiOutlineSearch onClick={openSearch} />
          {mobileMenu ? (
            <VscChromeClose onClick={() => setMobileMenu(false)} />
          ) : (
            <SlMenu onClick={openMiobileMenu} />
          )}
        </div>
      </ContentWrapper>
      {showSearch && (
        <div className="searchBar">
          <ContentWrapper>
            <div className="searchInput">
              <input
                type="text"
                placeholder="Search for a movie or tv show...."
                onKeyUp={(e) => {
                  if (e.key === "Enter") {
                    handleSearch();
                  }
                }}
                onChange={(e) => setQuery(e.target.value)}
                autoFocus
              />
              <VscChromeClose onClick={() => setShowSearch(false)} />
            </div>
          </ContentWrapper>
        </div>
      )}
    </header>
  );
};

export default Header;
