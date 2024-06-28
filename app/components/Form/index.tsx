import "./style.css";
import "react-international-phone/style.css";

import { useNavigate } from "@remix-run/react";
import { Controller, useForm } from "react-hook-form";
import {
  ChangeEvent,
  Dispatch,
  SetStateAction,
  useEffect,
  useRef,
  useState,
} from "react";
import { MultiSelect } from "react-multi-select-component";
import {
  ChevronDownIcon,
  ChevronUpIcon,
  QuestionMarkIcon,
} from "@radix-ui/react-icons";
import { yupResolver } from "@hookform/resolvers/yup";
import { FileUploader } from "react-drag-drop-files";
import { PhoneInput, PhoneInputRefType } from "react-international-phone";
import { useRemixFetcher } from "~/hooks/use-remix-fetcher";
import { contactSchema } from "~/utils/lib/schemas";

import H2 from "../Typography/H2";
import Small from "../Typography/Small";
import Button from "../Button";
import Title from "../Typography/Title";
import Paragraph from "../Typography/Paragraph";
import SelectItem from "./SelectItem";

import * as Select from "@radix-ui/react-select";
import * as Tooltip from "@radix-ui/react-tooltip";

const options = [
  { label: "Standard translation", value: "Standard translation" },
  { label: "ID", value: "ID" },
  { label: "Diploma", value: "Diploma" },
  {
    label: "Technical Translation",
    value: "Technical Translation",
  },
];

type FormComponentProps = {
  country?: string;
  countryName?: string;
  continueForm: boolean;
  setContinueForm: React.Dispatch<React.SetStateAction<boolean>>;
  showAlert: boolean;
  setShowAlert: React.Dispatch<React.SetStateAction<boolean>>;
  alertAnimation: boolean;
  setAlertAnimation: Dispatch<SetStateAction<boolean>>;
  variant?: "dark" | "light";
  lng: string;
};

type FormDataContact = {
  fullName: string;
  email: string;
  address: string;
  phoneNumber: string;
  services: string[] | undefined;
  language: string;
  notes: string | undefined;
  file: File | undefined;
  expedite: boolean;
};

const fileTypes = ["JPG", "PNG", "PDF", "JPEG", "DOCX", "TXT"];

const FormComponent = ({
  country,
  countryName,
  continueForm,
  setContinueForm,
  setShowAlert,
  showAlert,
  variant,
  alertAnimation,
  setAlertAnimation,
  lng,
}: FormComponentProps) => {
  const [selected, setSelected] = useState([]);
  const [triggerWidth, setTriggerWidth] = useState<number | null>(null);
  const [phoneInputWidth, setPhoneInputWidth] = useState<number | null>(null);
  const [textInput, setTextInput] = useState("");
  const [languageSelect, setLanguageSelect] = useState(false);
  const [file, setFile] = useState<File>();
  const [placeholderSent, setPlaceholderSent] = useState(false);
  const [sendingMessage, setSendingMessage] = useState(false);
  const [errorAlert, setErrorAlert] = useState(false);
  const [tooltipOpenMobile, setTooltipOpenMobile] = useState(false);

  const [changeInput, setChangeInput] = useState(false);

  const navigate = useNavigate();

  const triggerRef = useRef<HTMLButtonElement>(null);
  const phoneRef = useRef<PhoneInputRefType>(null);

  const valuesSelected = selected.map((item: any) => {
    return item.value;
  });

  const handleChangeText = (event: ChangeEvent<HTMLTextAreaElement>) => {
    setTextInput(event.target.value);
  };

  const handleChangeFile = (file: File) => {
    setFile(file);
  };

  const {
    handleSubmit,
    register,
    setValue,
    formState: { errors },
    reset,
    control,
    getValues,
    setError,
  } = useForm<FormDataContact>({
    defaultValues: {
      email: "",
      fullName: "",
      phoneNumber: "",
      services: [],
      language: "",
      notes: "",
      file: undefined,
      expedite: false,
    },
    resolver: yupResolver<any>(contactSchema),
    mode: "onChange",
  });

  /* Use effect for set vale Service */
  useEffect(() => {
    setValue("services", valuesSelected);
  }, [selected]);

  /* Use effect for set trigger width in MultiSelect */
  useEffect(() => {
    function handleResize() {
      if (triggerRef.current) {
        const width = triggerRef.current.offsetWidth;
        setTriggerWidth(width);
      }
    }
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  /* Use effect for set phone input width dropdown */
  useEffect(() => {
    function handleResize() {
      if (phoneRef.current) {
        const width = phoneRef.current.offsetWidth;
        setPhoneInputWidth(width + 45);
      }
    }
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  /* Use Effect for set style in multiselect input */
  useEffect(() => {
    const multiSelectItem = document.getElementsByClassName("multi-select-key");
    const dropdownContainer = multiSelectItem
      .item(0)
      ?.children.item(0) as Element;

    const dropdownHeadingValue = dropdownContainer.children
      .item(0)
      ?.children.item(0);

    const spanHeadingValue = dropdownContainer.children
      .item(0)
      ?.children.item(0)
      ?.children.item(0);

    if (variant === "dark") {
      return;
    }

    dropdownContainer.classList.remove("dropdown-container");
    spanHeadingValue?.classList.remove("gray");
    dropdownHeadingValue?.classList.remove("dropdown-heading-value");

    dropdownContainer.classList.add("dropdown-container-light");
    spanHeadingValue?.classList.add("gray-light");
    dropdownHeadingValue?.classList.add("dropdown-heading-value-light");
  }, []);

  const onSuccessAlert = () => {
    setSendingMessage(false);
    setShowAlert(true);
  };

  const onErrorAlert = () => {
    setSendingMessage(false);
    setShowAlert(false);
    setErrorAlert(true);
  };

  const fetcher = useRemixFetcher({
    onSuccess: () => onSuccessAlert(),
    onError: (e) => {
      console.log(e);
      onErrorAlert();
    },
    queryKey: "formSubmit",
  });

  const onSubmit = handleSubmit((_data, e) => {
    setValue("file", file);

    const formData = new FormData(e?.target);

    if (formData.get("address")) {
      return;
    }

    fetcher.submit(formData, {
      method: "POST",
      navigate: false,
      encType: "multipart/form-data",
      action: "/files/upload",
    });

    reset();
    setSelected([]);
    setTextInput("");
    setPlaceholderSent(true);
    setSendingMessage(true);
    setAlertAnimation(true);
    setValue("language", "");
    setFile(undefined);
    navigate({
      hash: "contact-form",
    });
  });

  const handleContinueForm = () => {
    const { email, fullName, phoneNumber } = getValues();
    const inputs = [
      {
        name: "fullName",
        type: "manual",
        message: "Full name is required",
      },
      {
        name: "email",
        type: "manual",
        message: "Email is required",
      },
      {
        name: "phoneNumber",
        type: "manual",
        message: "Phone number is required",
      },
    ];

    if (fullName !== "" && email !== "" && phoneNumber.length > 4) {
      setContinueForm(true);
    } else {
      inputs.forEach(({ message, name, type }) => {
        setError(name as "fullName" | "email" | "phoneNumber", {
          type: type,
          message: message,
        });
      });
    }

    return;
  };

  const customValueRenderer = (selected: any, _options: any) => {
    return selected.length
      ? selected.map(({ label }: any) => " ✔️ " + label)
      : "Select a service";
  };

  const ArrowRenderer = ({ expanded }: any) => (
    <>
      {expanded ? (
        <ChevronUpIcon
          className="ml-2"
          color={variant === "dark" ? "#FCFCFC" : "#151718"}
        />
      ) : (
        <ChevronDownIcon
          className="ml-2"
          color={variant === "dark" ? "#FCFCFC" : "#151718"}
        />
      )}
    </>
  );

  const sentAnotherQuote = () => {
    setContinueForm(false);
    setPlaceholderSent(false);
    setShowAlert(false);
    setAlertAnimation(false);
  };

  return (
    <>
      <div className="w-full">
        <div
          className={`${showAlert ? "hidden" : null} ${
            errorAlert ? "hidden" : null
          } spacing-form-title`}
        >
          <H2
            style={{
              color: variant === "dark" ? "#FCFCFC" : "#151718",
              textAlign: "center",
            }}
          >
            {continueForm
              ? sendingMessage
                ? null
                : lng === "es"
                ? "Agrega algunos detalles"
                : "Add a few details"
              : lng === "es"
              ? "Solicita una cotización"
              : "Request a quote"}
          </H2>
        </div>

        <fetcher.Form
          onSubmit={onSubmit}
          className="form-remix-style"
          onClick={() => {
            if (tooltipOpenMobile) {
              setTooltipOpenMobile(false);
            }
          }}
        >
          <div
            className={`first-part-form-style ${
              continueForm ? "first-part-form-inactive" : ""
            } `}
          >
            <div className="normal-input-spacing">
              <label htmlFor="fullName">
                <Small
                  style={{
                    color: variant === "dark" ? "#FFFFFF" : "#101828",
                    fontWeight: 700,
                  }}
                >
                  {lng === "es" ? "Nombre Completo *" : "Full Name *"}
                </Small>
              </label>
              <input
                id="fullName"
                type="text"
                {...register("fullName")}
                className={
                  variant === "dark" ? "input-name" : "input-name-light"
                }
              />
              <Small style={{ color: "#FDA29B" }}>
                {errors.fullName?.message}
              </Small>
            </div>

            <div className="normal-input-spacing">
              <label htmlFor="email">
                <Small
                  style={{
                    color: variant === "dark" ? "#FFFFFF" : "#101828",
                    fontWeight: 700,
                  }}
                >
                  {lng === "es" ? "Correo Electrónico *" : "Email *"}
                </Small>
              </label>
              <div className="divs-with-icons">
                <input
                  id="email"
                  type="email"
                  {...register("email")}
                  className={
                    variant === "dark"
                      ? "inputs-with-icon"
                      : "inputs-with-icon-light"
                  }
                />
                <div className="div-icon">
                  <img
                    src="/images/emailIcon.svg"
                    alt="Email input"
                    height={20}
                    width={20}
                  />
                </div>
              </div>
              <Small style={{ color: "#FDA29B" }}>
                {errors.email?.message}
              </Small>
            </div>

            <input type="hidden" {...register("address")} aria-hidden="true" />

            <div className="normal-input-spacing">
              <div className="flex justify-between h-[26px]">
                <label htmlFor="phoneNumber">
                  <Small
                    style={{
                      color: variant === "dark" ? "#FFFFFF" : "#101828",
                      fontWeight: 700,
                    }}
                  >
                    {lng === "es" ? "Número de teléfono *" : "Phone Number *"}
                  </Small>
                </label>
                <div>
                  {changeInput ? (
                    <>
                      {countryName && (
                        <Small
                          style={{
                            color: variant === "dark" ? "#FFFFFF" : "#101828",
                            fontWeight: 700,
                          }}
                        >
                          {countryName}
                        </Small>
                      )}
                    </>
                  ) : (
                    <Small>
                      <Button
                        variant="url"
                        onClick={() => setChangeInput(true)}
                      >
                        {lng === "es" ? "Detectar Ciudad" : "Detect Country"}
                      </Button>
                    </Small>
                  )}
                </div>
              </div>

              <Controller
                name="phoneNumber"
                control={control}
                render={({ field }) => {
                  return (
                    <>
                      {changeInput && (
                        <>
                          <PhoneInput
                            inputProps={{ id: "phoneNumber" }}
                            {...field}
                            ref={phoneRef}
                            value={field.value}
                            defaultCountry={country}
                            onChange={(phone) => {
                              field.onChange(phone);
                            }}
                            className="phone-container-custom"
                            inputClassName={
                              variant === "dark"
                                ? "input-phone-code"
                                : "input-phone-code-light"
                            }
                            countrySelectorStyleProps={{
                              buttonClassName:
                                variant === "dark"
                                  ? "buttom-classname-custom"
                                  : "buttom-classname-custom-light",
                              dropdownStyleProps: {
                                listItemStyle: {
                                  width: `${phoneInputWidth}px`,
                                },
                              },
                            }}
                          />
                          <Small style={{ color: "#FDA29B" }}>
                            {errors.phoneNumber?.message}
                          </Small>
                        </>
                      )}

                      {!changeInput && (
                        <>
                          <PhoneInput
                            {...field}
                            inputProps={{ id: "phoneNumber" }}
                            ref={phoneRef}
                            value={field.value}
                            onChange={(phone) => {
                              field.onChange(phone);
                            }}
                            className="phone-container-custom"
                            inputClassName={
                              variant === "dark"
                                ? "input-phone-code"
                                : "input-phone-code-light"
                            }
                            countrySelectorStyleProps={{
                              buttonClassName:
                                variant === "dark"
                                  ? "buttom-classname-custom"
                                  : "buttom-classname-custom-light",
                              dropdownStyleProps: {
                                listItemStyle: {
                                  width: `${phoneInputWidth}px`,
                                },
                              },
                            }}
                          />
                          <Small style={{ color: "#FDA29B" }}>
                            {errors.phoneNumber?.message}
                          </Small>
                        </>
                      )}
                    </>
                  );
                }}
              />
            </div>
          </div>

          <div
            className={`continue-part-style ${
              continueForm && !placeholderSent
                ? "continue-form-active"
                : "continue-form-inactive"
            }`}
          >
            <div className="normal-input-spacing">
              <label htmlFor="services">
                <Small
                  style={{
                    color: variant === "dark" ? "#FFFFFF" : "#101828",
                    fontWeight: 700,
                  }}
                >
                  {lng === "es"
                    ? "¿Qué tipo de traducción necesita? *"
                    : "What type of translation do you need? *"}
                </Small>
              </label>
              <input
                type="hidden"
                id="services"
                aria-hidden
                {...register("services")}
              />

              <MultiSelect
                className={
                  variant === "dark"
                    ? "multi-select-key"
                    : "multi-select-key text-variant-light"
                }
                disableSearch
                options={options}
                value={selected}
                onChange={setSelected}
                labelledBy="select"
                valueRenderer={customValueRenderer}
                ArrowRenderer={ArrowRenderer}
              />

              <Small style={{ color: "#FDA29B" }}>
                {errors.services?.message}
              </Small>
            </div>

            <div className="normal-input-spacing">
              <label htmlFor="language">
                <Small
                  style={{
                    color: variant === "dark" ? "#FFFFFF" : "#101828",
                    fontWeight: 700,
                  }}
                >
                  {lng === "es"
                    ? "¿Qué par de idiomas necesitas traducir?"
                    : "What language pair do you need translated? *"}
                </Small>
              </label>
              <Controller
                name="language"
                control={control}
                render={({ field: { ref, ...field } }) => {
                  useEffect(() => {
                    if (field.value.length === 0) {
                      setLanguageSelect(false);
                      return;
                    }
                    setLanguageSelect(true);
                  }, [field.value]);

                  return (
                    <>
                      <Select.Root {...field} onValueChange={field.onChange}>
                        <Select.Trigger
                          aria-label="Button trigger for select language translation"
                          ref={triggerRef}
                          className={`${
                            variant === "dark"
                              ? "select-trigger-custom-style"
                              : "select-trigger-light-style"
                          } ${
                            variant === "dark"
                              ? languageSelect
                                ? "select-text-active"
                                : "select-placeholder"
                              : languageSelect
                              ? "select-text-active-light"
                              : "select-placeholder-light"
                          } `}
                        >
                          <Select.Value placeholder="Select a Language" />

                          <Select.Icon>
                            <ChevronDownIcon />
                          </Select.Icon>
                        </Select.Trigger>

                        <Select.Portal>
                          <Select.Content
                            id="language"
                            position="popper"
                            align="center"
                            sideOffset={8}
                            className="select-container-style"
                            style={{
                              width: `${triggerWidth}px`,
                              maxWidth: "532px",
                              borderRadius: "0px 0px 8px 8px",
                            }}
                          >
                            <Select.Viewport className="p-[5px]">
                              <SelectItem value="English to Spanish">
                                {lng === "es"
                                  ? "Inglés a Español"
                                  : "English to Spanish"}
                              </SelectItem>
                              <SelectItem value="Spanish to English">
                                {lng === "es"
                                  ? "Español a Inglés"
                                  : "Spanish to English"}
                              </SelectItem>
                            </Select.Viewport>
                          </Select.Content>
                        </Select.Portal>
                      </Select.Root>
                      <Small style={{ color: "#FDA29B" }}>
                        {errors.language?.message}
                      </Small>
                    </>
                  );
                }}
              ></Controller>
            </div>

            <div className="especial-input-spacing">
              <label htmlFor="notes">
                <Small
                  style={{
                    color: variant === "dark" ? "#FFFFFF" : "#101828",
                    fontWeight: 700,
                  }}
                >
                  {lng === "es" ? "Notas" : "Notes"}
                </Small>
              </label>

              <textarea
                {...register("notes")}
                onChange={handleChangeText}
                id="notes"
                placeholder="Enter a descripcion"
                className={
                  variant === "dark" ? "text-area-custom" : "text-area-light"
                }
              ></textarea>
              <div className="flex gap-6">
                <Small
                  style={{
                    color:
                      textInput.length < 251
                        ? variant === "dark"
                          ? " #D0D5DD"
                          : "#475467"
                        : "#FDA29B",
                  }}
                >{`${textInput.length}/250 characters`}</Small>
                <Small style={{ color: "#FDA29B" }}>
                  {errors.notes?.message}
                </Small>
              </div>
            </div>

            <div className="especial-input-spacing">
              <label htmlFor="upload">
                <Small
                  style={{
                    color: variant === "dark" ? "#FFFFFF" : "#101828",
                    fontWeight: 700,
                  }}
                >
                  {lng === "es"
                    ? "Sube el archivo que necesites traducir"
                    : "Upload the files you need translated"}
                </Small>
              </label>
              <Controller
                name="file"
                control={control}
                render={({ field: { ref, ...field } }) => {
                  useEffect(() => {
                    setValue("file", file);
                  }, [file]);

                  return (
                    <FileUploader
                      {...field}
                      handleChange={handleChangeFile}
                      types={fileTypes}
                      id="upload"
                    >
                      <div
                        className={
                          variant === "dark"
                            ? "custom-content-uploader"
                            : "custom-content-uploader-light"
                        }
                      >
                        {file ? (
                          <Small
                            style={{
                              color: variant === "dark" ? "#D2CFCF" : "#53545F",
                              overflow: "hidden",
                              textOverflow: "ellipsis",
                              whiteSpace: "nowrap",
                            }}
                          >
                            {file ? file.name : ""}
                          </Small>
                        ) : (
                          <>
                            <svg
                              width="20"
                              height="20"
                              viewBox="0 0 20 20"
                              fill="none"
                              xmlns="http://www.w3.org/2000/svg"
                            >
                              <title>Plus signal</title>
                              <details>
                                plus signal in uploader input square
                              </details>
                              <path
                                d="M10.5 1C10.5 0.723858 10.2761 0.5 10 0.5C9.72386 0.5 9.5 0.723858 9.5 1V9.5H1C0.723858 9.5 0.5 9.72386 0.5 10C0.5 10.2761 0.723858 10.5 1 10.5H9.5V19C9.5 19.2761 9.72386 19.5 10 19.5C10.2761 19.5 10.5 19.2761 10.5 19V10.5H19C19.2761 10.5 19.5 10.2761 19.5 10C19.5 9.72386 19.2761 9.5 19 9.5H10.5V1Z"
                                fill={
                                  variant === "dark" ? "#57BEEA" : "#012F5B"
                                }
                              />
                            </svg>

                            <Small
                              style={{
                                color:
                                  variant === "dark" ? "#D2CFCF" : "#53545F",
                              }}
                            >
                              {lng === "es"
                                ? "Carga el Archivo"
                                : "Upload File"}
                            </Small>
                          </>
                        )}
                      </div>
                    </FileUploader>
                  );
                }}
              />
              <Small style={{ color: "#FDA29B" }}>{errors.file?.message}</Small>
            </div>

            <div className="flex items-center gap-2">
              <div>
                <input
                  id="expedite"
                  type="checkbox"
                  {...register("expedite")}
                />
              </div>
              <label htmlFor="expedite">
                <Small
                  style={{
                    color: variant === "dark" ? "#FFFFFF" : "#101828",
                    fontWeight: 700,
                  }}
                >
                  {lng === "es"
                    ? "Traducción Acelerada"
                    : "Translation Expedite"}
                </Small>
              </label>
              <Tooltip.Provider>
                <Tooltip.Root open={tooltipOpenMobile}>
                  <Tooltip.Trigger asChild>
                    <button
                      aria-label="Questiom symbol for trigger tooltip"
                      type="button"
                      onClick={() => setTooltipOpenMobile(!tooltipOpenMobile)}
                      className={`tooltip-button-trigger ${
                        tooltipOpenMobile
                          ? "tooltip-button-trigger-focus"
                          : null
                      }`}
                    >
                      <QuestionMarkIcon
                        height={13}
                        width={13}
                        className="text-[#FCFCFC]"
                      />
                    </button>
                  </Tooltip.Trigger>
                  <Tooltip.Portal>
                    <Tooltip.Content
                      sideOffset={5}
                      className="tooltip-content-card"
                    >
                      {lng === "es"
                        ? "Nuestro servicio de traducción urgente ofrece traducciones rápidas y confiables en un plazo de 12 a 24 horas. Ya sea un documento legal urgente o un informe empresarial con límite de tiempo, reciba su documento a tiempo por solo $10 adicionales por página."
                        : "Our expedited translation service delivers fast and reliable translations within 12 to 24 hours. Whether it's an urgent legal document or a time-sensitive business report, get your document delivered on time for just $10 extra per page."}
                      <Tooltip.Arrow className="fill-[#FCFCFC]" />
                    </Tooltip.Content>
                  </Tooltip.Portal>
                </Tooltip.Root>
              </Tooltip.Provider>
            </div>
          </div>

          {continueForm ? (
            <>
              {continueForm && !placeholderSent ? (
                <div>
                  {continueForm && (
                    <div className="md:hidden flex flex-col gap-2 mb-5">
                      <Paragraph style={{ color: "#57BEEA", fontWeight: 700 }}>
                        Privacy policies
                      </Paragraph>

                      <Small
                        style={{
                          color: variant === "dark" ? "#D2CFCF" : "#53545F",
                        }}
                      >
                        {lng === "es"
                          ? "Todos los datos y archivos procesados en nuestro sitio son revisados de manera segura por personal autorizado. Nadie fuera de nuestra organización puede acceder a sus datos, ni vendemos o compartimos su información con terceros. Todos los datos subidos a nuestro sitio se utilizan únicamente con fines de cotización y traducción."
                          : "All data and files processed on our site is securely reviewed by authorized staff. No one outside of our organization can access your data, nor do we sell or share your data with third parties. All data uploaded to our site is used merely for quotation and translation purposes."}
                      </Small>
                    </div>
                  )}

                  <Button
                    variant="contained"
                    color={variant === "dark" ? "main" : "dark"}
                    size="medium"
                    type="submit"
                  >
                    {lng === "es" ? "Obtén una cotización" : "Get a quote"}
                  </Button>
                </div>
              ) : null}
            </>
          ) : (
            <div>
              <Button
                className="button-continue-custom"
                variant="contained"
                color={variant === "dark" ? "main" : "dark"}
                size="large"
                type="button"
                onClick={() => {
                  handleContinueForm();
                }}
              >
                {lng === "es" ? "Continuar" : "Continue"}
              </Button>
            </div>
          )}
        </fetcher.Form>

        <div
          className={`sent-notification-style ${
            alertAnimation
              ? "sent-notification-active"
              : "sent-notification-inactive"
          } `}
        >
          <div className="h-[150px]">
            {sendingMessage ? (
              <img
                loading="lazy"
                src={
                  variant === "light"
                    ? "/images/loadingAnimationWhite.gif"
                    : "/images/loadingAnimation.gif"
                }
                alt="Loading animation before send message animation"
              />
            ) : (
              <img
                loading="lazy"
                src={
                  showAlert
                    ? variant === "light"
                      ? "/images/sentEmailGifWhite.gif"
                      : "/images/sentEmailGif.gif"
                    : variant === "light"
                    ? "/images/errorAnimationWhite.gif"
                    : "/images/errorAnimation.gif"
                }
                alt={
                  showAlert
                    ? "Animation of Email Sent"
                    : "Animation of Error sending email"
                }
              />
            )}
          </div>
          <div className="notification-titles">
            {sendingMessage ? (
              <Title
                style={{
                  color: variant === "dark" ? "#FCFCFC" : "#151718",
                  textAlign: "center",
                }}
              >
                {lng === "es"
                  ? "¡Enviando tus documentos!"
                  : "Submitting your documents!"}
              </Title>
            ) : (
              <>
                <Title
                  style={{
                    color: variant === "dark" ? "#FCFCFC" : "#151718",
                    textAlign: "center",
                  }}
                >
                  {showAlert
                    ? lng === "es"
                      ? "¡Gracias por enviar tus documentos!"
                      : "Thank you for submitting your documents!"
                    : lng === "es"
                    ? "Ups! Tenemos un problema en el envio de los documentos"
                    : "Ups! We had a problem sending the documents"}
                </Title>
                <Paragraph
                  style={{
                    color: variant === "dark" ? "#D2CFCF" : "#333333",
                    textAlign: "center",
                  }}
                >
                  {showAlert
                    ? lng === "es"
                      ? "Hemos recibido sus documentos y pronto nos pondremos en contacto con usted para proporcionarle una cotización. Esté atento a su correo electrónico."
                      : "We’ve received your documents and we’ll contact you soon to share a quotation. Keep an eye on your email."
                    : lng === "es"
                    ? "Estamos resolviendo el problema, por favor intente de nuevo en unos momentos."
                    : "We are solving the problem, please try again in a few moments."}
                </Paragraph>
              </>
            )}
          </div>
          <div className="spacing-button-other-quote">
            <Button
              size="medium"
              variant="contained"
              color={variant === "dark" ? "main" : "dark"}
              onClick={() => sentAnotherQuote()}
              className="w-full md:w-fit"
            >
              {showAlert
                ? lng === "es"
                  ? "Otra cotización"
                  : "Another quote"
                : lng === "es"
                ? "Regresar al formulario"
                : "Back to form"}
            </Button>
          </div>
        </div>
      </div>
    </>
  );
};

export default FormComponent;
