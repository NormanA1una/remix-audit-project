import "./style.css";

import H6Styling from "~/components/Typography/H6";
import Paragraph from "~/components/Typography/Paragraph";
import Small from "~/components/Typography/Small";

type FooterProps = {
  pathNames: {
    name: string;
    nameSpanish: string;
    pathName: string;
  }[];
  lng: string;
};

const Footer = ({ pathNames, lng }: FooterProps) => {
  return (
    <div className="footer-container">
      <div className="div-text-footer">
        <div className="conteiner-text-footer">
          <H6Styling
            variant="secondary"
            style={{ color: "#D2CFCF", fontWeight: 700 }}
          >
            {lng === "en" ? "Company" : "Compañia"}
          </H6Styling>

          <ul className="list-footer">
            {pathNames.map((pathName) => (
              <li key={pathName.name}>
                <a href={pathName.pathName}>
                  {lng === "en" ? pathName.name : pathName.nameSpanish}
                </a>
              </li>
            ))}
          </ul>
        </div>

        <div className="conteiner-text-footer">
          <H6Styling
            variant="secondary"
            style={{ color: "#D2CFCF", fontWeight: 700 }}
          >
            {lng === "en" ? "Contact" : "Contacto"}
          </H6Styling>

          <ul className="list-footer">
            <li>jbustamante@immigrationdocsllc.com</li>
            <li>+1 (305)330-2961</li>
          </ul>
        </div>

        <div className="conteiner-text-footer">
          <H6Styling
            variant="secondary"
            style={{ color: "#D2CFCF", fontWeight: 700 }}
          >
            {lng === "en" ? "Mailing address" : "Dirección de correo"}
          </H6Styling>

          <ul className="list-footer">
            <li className="max-w-[200px] leading-relaxed">
              175 SW 7th Street Suite 1517-724 Miami, FL 33130
            </li>
          </ul>
        </div>
      </div>

      <div className="div-logo-footer">
        <div>
          <img
            src="/images/logoDocLLC.svg"
            alt="Inmigrations Docs LLC dark logo in footer"
            height={42}
            width={130}
          />
        </div>

        <div>
          <Paragraph style={{ color: "#6D6D6D", fontWeight: 500 }}>
            {lng === "en"
              ? "We are giving our students the best and suitable services for building their bright future."
              : "Ofrecemos a nuestros estudiantes los mejores y más adecuados servicios para construir un futuro brillante."}
          </Paragraph>
        </div>

        <div>
          <ul className="container-social-media">
            <li>
              <img
                src="/images/fbIcon.svg"
                alt="Facebook"
                height={26}
                width={26}
              />
            </li>
            <li>
              <img
                src="/images/instaIcon.svg"
                alt="Instagram"
                height={32}
                width={32}
              />
            </li>
            <li>
              <img
                src="/images/linkedIcon.svg"
                alt="Linkedin"
                height={32}
                width={32}
              />
            </li>
          </ul>
        </div>

        <Small style={{ color: "#D2CFCF" }}>
          Copyright © ID LLC Inc. 2024 All Rights Reserved
        </Small>
      </div>
    </div>
  );
};

export default Footer;
