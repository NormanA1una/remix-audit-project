import { ActionFunction, json } from "@remix-run/node";
import { sendEmail } from "~/utils/mailers.server";

export const action: ActionFunction = async ({ request }) => {
  const formData = await request.formData();

  const fileData = new FormData();

  const urlApi = process.env.URL_UPLOAD_API;

  const formDataObject: { [key: string]: string | File | string[] } = {};

  for (const [key, value] of formData.entries()) {
    if (value instanceof File) {
      formDataObject[key] = value;
    } else {
      formDataObject[key] = value;
    }
  }

  formDataObject.services = (formDataObject.services as string).split(",");

  fileData.append("file", formDataObject.file as File);

  try {
    const upload = await fetch(`${urlApi}`, {
      headers: {
        ContentType: "multipart/form-data",
      },
      method: "POST",
      body: fileData,
    }).then((res) => res.json());

    if (!upload.data.fileName) {
      return json({ success: false });
    }

    const path = await fetch(`${urlApi}/${upload.data.fileName}`).then(
      (res) => res.url
    );

    const messageService = await sendEmail(formDataObject, path).then((res) =>
      res.json()
    );

    return json({ success: true, message: messageService.message });
  } catch (e) {
    return json({ error: e, success: false });
  }
};
