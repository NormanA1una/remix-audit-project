import { array, boolean, mixed, object, string } from "yup";

export const contactSchema = object().shape({
  fullName: string()
    .required("Full Name is required")
    .min(2, "The Full Name to contain at least two characters"),
  email: string().email().required("Email is required"),
  addres: string(),
  phoneNumber: string().required("Phone Number is required"),
  services: array(string()).min(1, "Services is required"),
  language: string().required("Language is required"),
  notes: string().max(250).required("Notes is required"),
  file: mixed().test("Required", "You need provide a file", (file) => {
    if (file) return true;
    return false;
  }),
  expedite: boolean(),
});
