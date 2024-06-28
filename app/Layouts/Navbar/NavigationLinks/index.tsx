import { NavLink } from "@remix-run/react";
import "./style.css";

type NavigationProps = {
  pathNames: {
    name: string;
    nameSpanish: string;
    pathName: string;
  }[];
  currentPath: string;
  lng: string;
};

export default function NavigationLinks({
  pathNames,
  currentPath,
  lng,
}: NavigationProps) {
  return (
    <nav className="hidden lg:block">
      <ul className="ul-style">
        {pathNames.map((pathName) => (
          <li key={pathName.name} className="group li-style-group">
            <NavLink
              className={({ isActive, isPending }) =>
                isActive
                  ? currentPath === "/"
                    ? "link-active"
                    : "link-active-light"
                  : isPending
                  ? "pending"
                  : ""
              }
              to={pathName.pathName}
            >
              {currentPath !== pathName.pathName ? (
                <span className="link-span-animated"></span>
              ) : (
                ""
              )}
              {lng === "en" ? pathName.name : pathName.nameSpanish}
            </NavLink>
          </li>
        ))}
      </ul>
    </nav>
  );
}
