import nodemailer from "nodemailer";
import type Mail from "nodemailer/lib/mailer";

export const sendEmail = async (data: any, downloadPath: any) => {
  let transporter = nodemailer.createTransport({
    service: "gmail",

    auth: {
      user: process.env.MY_EMAIL,
      pass: process.env.PASSWORD_EMAIL,
    },
  });

  const mailOptions: Mail.Options = {
    from: data.email,
    to: process.env.EMAIL_CLIENT,

    subject: `Information about service required.`,
    html: `<div>
    <p style="color: #050505; font-size: 36px; font-weight: 700;">Hello!</p>
    <p style="font-size: 24px; font-weight: 600; color: #050505;">
    I am interested in your translation service and would like a quote!
    </p>
    <p style="font-size: 24px; font-weight: 600; color: #050505;">
    Here are my Contact Details and the services i need:
    </p>
    
      <ul
      style="font-size: 24px; color: #050505;"
      >
        <li style="color: #050505;"><strong>Full Name:</strong> ${
          data.fullName
        }</li>
        <li style="color: #050505;"><strong>Email:</strong> ${data.email}</li>
        <li style="color: #050505;"><strong>Phone Number:</strong> ${
          data.phoneNumber
        }</li>
        <li style="color: #050505;"><strong>Services:</strong><ul>${data.services
          .map(
            (service: string, i: number) =>
              `<li style="color: #050505;" key=${i}>${service}</li>`
          )
          .join("")}</ul></li>
        <li style="color: #050505;"><strong>Translation Language:</strong> ${
          data.language
        }</li>
        <li style="color: #050505;"><strong>Notes:</strong> ${data.notes}</li>
      </ul>
      
      <p style="font-size: 24px; color: #050505; font-weight: 600;">Translation Expedite: ${
        data.expedite ? "Yes" : "No"
      }</p>

      <p style="font-size: 24px; color: #050505; font-weight: 600;">Thank you so much! I hope we talk soon! 🧾</p>

    </div>
  </div>`,
    attachments: [
      {
        filename: data.file.name,
        path: downloadPath,
      },
    ],
  };

  const message = await transporter.sendMail(mailOptions);
  const confirmRes = message.response.match(/\bOK\b/);
  const messageOk = confirmRes ? confirmRes[0] : undefined;

  if (messageOk === "OK") {
    return new Response(
      JSON.stringify({
        message: "success",
      }),
      { status: 200 }
    );
  } else {
    return new Response(
      JSON.stringify({
        message: "Failed to send email",
      }),
      { status: 500 }
    );
  }
};
