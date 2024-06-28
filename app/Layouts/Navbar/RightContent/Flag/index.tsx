import "./style.css";
import { Form, useLocation } from "@remix-run/react";
import { Dispatch, SetStateAction } from "react";
import Button from "~/components/Button";
import Small from "~/components/Typography/Small";

type NavbarFlagsProps = {
  lng: string;
  currentPath: string;
  setIsMenuOpen: Dispatch<SetStateAction<boolean>>;
};

const NavbarFlags = ({ lng, currentPath, setIsMenuOpen }: NavbarFlagsProps) => {
  const location = useLocation();

  return (
    <div className="div-lenguage-flags">
      <Form
        action={location.pathname}
        className="form-buttons-navbar"
        onClick={() => setIsMenuOpen(false)}
      >
        {lng !== "es" && (
          <>
            <Button
              variant="icon"
              type="submit"
              name="lng"
              value="es"
              className="button-navbar-custom"
            >
              <img
                src={"/images/spanishFlag.svg"}
                alt={"Flag referring to the Spanish language"}
              />
              <Small
                style={{ color: currentPath === "/" ? "#FCFCFC" : "#3E4348" }}
              >
                ES
              </Small>
            </Button>
          </>
        )}

        {lng !== "en" && (
          <>
            <Button
              variant="icon"
              type="submit"
              name="lng"
              value="en"
              className="button-navbar-custom"
            >
              <img
                src={"/images/englishFlag.svg"}
                alt={"Flag referring to the English language"}
              />
              <Small
                style={{ color: currentPath === "/" ? "#FCFCFC" : "#3E4348" }}
              >
                EN
              </Small>
            </Button>
          </>
        )}
      </Form>
    </div>
  );
};

export default NavbarFlags;
