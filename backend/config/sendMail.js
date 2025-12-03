import SibApiV3Sdk from "@sendinblue/client";

const client = new SibApiV3Sdk.TransactionalEmailsApi();
client.setApiKey(
  SibApiV3Sdk.TransactionalEmailsApiApiKeys.apiKey,
  process.env.BREVO_API_KEY
);

 const sendEmail = async (to, subject, html) => {
  try {
    await client.sendTransacEmail({
      sender: { email: "habibsharkar6@gmail.com", name: "My App" },
      to: [{ email: to }],
      subject: subject,
      htmlContent: html,
    });
  } catch (error) {
    console.log("Brevo Error:", error);
    throw error;
  }
};
export default sendEmail;
