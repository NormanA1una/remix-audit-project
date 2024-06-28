import "./style.css";
import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import Card from "~/components/Card";
import FormComponent from "~/components/Form";
import Paragraph from "~/components/Typography/Paragraph";
import Small from "~/components/Typography/Small";

const Contact = ({ lng }: { lng: string }) => {
  const [continueForm, setContinueForm] = useState(false);
  const [showAlert, setShowAlert] = useState(false);
  const [alertAnimation, setAlertAnimation] = useState(false);

  const { data: dataClient } = useQuery({
    queryKey: ["countryDataClient"],
    queryFn: () => fetch(`https://ipapi.co/country/`).then((res) => res.text()),
  });

  const { data: countryClient } = useQuery({
    queryKey: ["countryClientName"],
    queryFn: () =>
      fetch(`https://ipapi.co/country_name/`).then((res) => res.text()),
  });

  return (
    <div id="contact-form" className="div-container-form">
      <Card
        variant="dark"
        formDimension={true}
        classNames="card-contact-custom"
      >
        <div className="div-into-card-form">
          <div className={`${alertAnimation ? "hidden" : ""} alert-active`}>
            <div className="div-bg-form"></div>
            {continueForm && (
              <div className="div-text-before-form">
                <Paragraph style={{ color: "#57BEEA", fontWeight: 700 }}>
                  {lng === "es" ? "Política de privacidad" : "Privacy policies"}
                </Paragraph>

                <Small style={{ color: "#D2CFCF" }}>
                  {lng === "es"
                    ? "Todos los datos y archivos procesados en nuestro sitio son revisados de manera segura por personal autorizado. Nadie fuera de nuestra organización puede acceder a sus datos, ni vendemos o compartimos su información con terceros. Todos los datos subidos a nuestro sitio se utilizan únicamente para fines de cotización y traducción."
                    : "All data and files processed on our site is securely reviewed by authorized staff. No one outside of our organization can access your data, nor do we sell or share your data with third parties. All data uploaded to our site is used merely for quotation and translation purposes."}
                </Small>
              </div>
            )}
          </div>

          <FormComponent
            continueForm={continueForm}
            setContinueForm={setContinueForm}
            country={dataClient?.toLowerCase()}
            countryName={countryClient}
            showAlert={showAlert}
            setShowAlert={setShowAlert}
            alertAnimation={alertAnimation}
            setAlertAnimation={setAlertAnimation}
            variant="dark"
            lng={lng}
          />
        </div>
      </Card>
    </div>
  );
};

export default Contact;
