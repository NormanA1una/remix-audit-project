import "./style.css";
import NavigationLinks from "./NavigationLinks";
import LeftContentNavbar from "./LeftContent";
import RightContentNavbar from "./RightContent";
import SideNav from "./Mobile";

type NavbarProps = {
  pathNames: {
    name: string;
    nameSpanish: string;
    pathName: string;
  }[];
  lng: string;
  currentPath: string;
};

const Navbar = ({ pathNames, lng, currentPath }: NavbarProps) => {
  return (
    <header
      className={currentPath !== "/" ? "navbar-style-light" : "navbar-style"}
    >
      {/* Logo section */}
      <LeftContentNavbar currentPath={currentPath} />

      {/* Navigation */}
      <NavigationLinks
        lng={lng}
        pathNames={pathNames}
        currentPath={currentPath}
      />

      {/* Button for contact */}
      <RightContentNavbar lng={lng} currentPath={currentPath} />
      <SideNav pathNames={pathNames} lng={lng} currentPath={currentPath} />
    </header>
  );
};

export default Navbar;
