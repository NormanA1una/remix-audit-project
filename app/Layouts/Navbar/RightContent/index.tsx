import NavbarFlags from "~/Layouts/Navbar/RightContent/Flag";
import Button from "../../../components/Button";
import "./style.css";
import { useLocation, useNavigate } from "@remix-run/react";

type RightContentNavbarProps = {
  lng: string;
  currentPath: string;
};

export default function RightContentNavbar({
  lng,
  currentPath,
}: RightContentNavbarProps) {
  const navigate = useNavigate();
  const location = useLocation();

  return (
    <div className="right-section-style">
      <Button
        variant="contained"
        color={currentPath === "/" ? "nav" : "dark"}
        size="medium"
        onClick={() =>
          navigate({
            hash:
              location.pathname === "/"
                ? "#contact-form"
                : location.pathname === "/service"
                ? "#contact-form-services"
                : "#contact-form-about",
          })
        }
      >
        {lng === "en" ? "Contact us!" : "Contáctanos!"}
      </Button>
      <NavbarFlags lng={lng} currentPath={currentPath} />
    </div>
  );
}
