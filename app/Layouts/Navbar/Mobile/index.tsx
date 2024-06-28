import "./style.css";
import { NavLink } from "@remix-run/react";
import { useEffect, useState } from "react";
import Small from "~/components/Typography/Small";
import NavbarFlags from "../RightContent/Flag";
type SideNavProps = {
  pathNames: {
    name: string;
    nameSpanish: string;
    pathName: string;
  }[];
  lng: string;
  currentPath: string;
};

const SideNav = ({ pathNames, lng, currentPath }: SideNavProps) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
    if (!document.body.classList.contains("overflow-hidden") && isMenuOpen) {
      document.body.classList.add("overflow-hidden");
    } else {
      document.body.classList.remove("overflow-hidden");
    }
  }, [isMenuOpen]);

  return (
    <div className="principal-div">
      <button
        id="hamburguer-button"
        className={`hamburguer-btn-style`}
        role="button"
        aria-label="Trigger for hamburger button"
        onClick={() => setIsMenuOpen(!isMenuOpen)}
      >
        <div
          id="hamburguer-lines"
          className={`${
            currentPath !== "/" ? "lines-button-black" : "lines-button"
          } ${isMenuOpen ? "lines-button-active" : ""}`}
        >
          <div></div>
          <div></div>
          <div></div>
        </div>
      </button>

      <div
        id="navigation-h-menu"
        className={`offset-menu ${isMenuOpen ? "menu-active" : ""}`}
      >
        <div className="div-logo-mobile">
          <img
            src="/images/logoDocLLC.svg"
            alt="Inmigrations Docs LLC dark logo in mobile"
            width={84}
          />
        </div>
        <ul id="list-nav" className="ul-mobile">
          {pathNames.map((pathName) => (
            <li key={pathName.name}>
              <NavLink
                to={pathName.pathName}
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className={({ isActive, isPending }) =>
                  isActive ? "link-active-mobile" : isPending ? "pending" : ""
                }
              >
                {lng === "en" ? pathName.name : pathName.nameSpanish}
              </NavLink>
            </li>
          ))}
        </ul>
        <div className="ml-4">
          <NavbarFlags
            currentPath={currentPath}
            lng={lng}
            setIsMenuOpen={setIsMenuOpen}
          />
        </div>
      </div>

      <div
        id="bg-blur"
        className={`bg-blur-sidebar ${
          isMenuOpen ? "bg-blur-sidebar-active" : ""
        }`}
        onClick={() => setIsMenuOpen(!isMenuOpen)}
      ></div>
    </div>
  );
};

export default SideNav;
