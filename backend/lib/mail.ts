import { createTransport, getTestMessageUrl } from "nodemailer";

const transport = createTransport({
  host: process.env.MAIL_HOST,
  port: process.env.MAIL_PORT,
  auth: {
    user: process.env.MAIL_USER,
    pass: process.env.MAIL_PASS,
  },
});

function renderEmail(text: string) {
  return `
    <div style="
      border: 1px solid black;
      padding: 28px;
      font-family: sans-serif;
      line-height: 2;
      font-size: 28px;"
    >
      <h2>Hello There!</h2>
      <p>${text}</p>
      <p>Sick Fits</p›
    </div>
  `;
}

export async function sendPasswordResetEmail(
  resetToken: string,
  to: string
): Promise<void> {
  const info = await transport.sendMail({
    to,
    from: "test@example.com",
    subject: "Reset Your Password",
    html: renderEmail(`
      <a href="${process.env.FRONTEND_URL}/reset?token=${resetToken}">Click Here To Reset Your Password</a>
    `),
  });
  if (process.env.MAIL_USER.includes("ethereal.email")) {
    console.log(`Message Sent! Preview it at ${getTestMessageUrl(info)}`);
  }
}
