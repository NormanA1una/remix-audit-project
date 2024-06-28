import { useState } from "react";
import "./style.css";
import Card from "~/components/Card";
import Paragraph from "~/components/Typography/Paragraph";
import Small from "~/components/Typography/Small";
import FormComponent from "~/components/Form";
import { useQuery } from "@tanstack/react-query";

const ContactServices = () => {
  const [continueForm, setContinueForm] = useState(false);
  const [showAlert, setShowAlert] = useState(false);
  const [alertAnimation, setAlertAnimation] = useState(false);

  let variantForm = "light";

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
    <div id="contact-form" className="div-container-form-services">
      <Card
        variant="basic"
        formDimension={true}
        classNames="card-contact-custom"
      >
        <div className="div-into-form-services">
          <div
            className={`${
              alertAnimation ? "hidden" : ""
            } alert-active-services`}
          >
            <div className="div-bg-form-services"></div>
            {continueForm && (
              <div className="div-text-before-form-services">
                <Paragraph style={{ color: "#57BEEA", fontWeight: 700 }}>
                  Privacy policies
                </Paragraph>

                <Small
                  style={{
                    color: variantForm === "dark" ? "#D2CFCF" : "#53545F",
                  }}
                >
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
            variant={"light"}
          />
        </div>
      </Card>
    </div>
  );
};

export default ContactServices;
