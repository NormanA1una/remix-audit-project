import Card from "~/components/Card";
import "./style.css";
import { useState } from "react";
import Paragraph from "~/components/Typography/Paragraph";
import Small from "~/components/Typography/Small";
import FormComponent from "~/components/Form";
import { useQuery } from "@tanstack/react-query";

const ContactAbout = () => {
  const [continueForm, setContinueForm] = useState(false);
  const [showAlert, setShowAlert] = useState(false);
  const [alertAnimation, setAlertAnimation] = useState(false);

  const { data: countryClient } = useQuery({
    queryKey: ["countryClientName"],
    queryFn: () =>
      fetch(`https://ipapi.co/country_name/`).then((res) => res.text()),
  });

  const { data: dataClient } = useQuery({
    queryKey: ["countryDataClient"],
    queryFn: () => fetch(`https://ipapi.co/country/`).then((res) => res.text()),
  });

  return (
    <div id="contact-form-about" className="div-container-form-about">
      <Card
        variant="dark"
        formDimension={true}
        classNames="card-contact-custom"
      >
        <div className="div-into-form-about">
          <div
            className={`${alertAnimation ? "hidden" : ""} alert-active-about`}
          >
            <div className="div-bg-form-about"></div>
            {continueForm && (
              <div className="div-text-before-form-about">
                <Paragraph style={{ color: "#57BEEA", fontWeight: 700 }}>
                  Privacy policies
                </Paragraph>

                <Small style={{ color: "#D2CFCF" }}>
                  All data and files processed on our site is securely reviewed
                  by authorized staff. No one outside of our organization can
                  access your data, nor do we sell or share your data with third
                  parties. All data uploaded to our site is used merely for
                  quotation and translation purposes.
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
          />
        </div>
      </Card>
    </div>
  );
};

export default ContactAbout;