"use server";
import { Resend } from 'resend';

const resend = new Resend(process.env.NEXT_PUBLIC_RESEND_API_KEY);

interface NotifyProprietorParams {
  subject: string;
  message: string;
  email: string;
}

export async function notifyProprietor({ email, subject, message }: NotifyProprietorParams) {
  try {
    const htmlContent = `
      <!DOCTYPE html>
      <html lang="en">
        <head>
          <meta charset="UTF-8" />
          <meta name="viewport" content="width=device-width, initial-scale=1.0" />
          <title>${subject}</title>
          <style>
            body {
              font-family: Arial, sans-serif;
              line-height: 1.6;
              color: #333;
              margin: 0;
              padding: 0;
              background-color: #f9f9f9;
            }
            .container {
              max-width: 600px;
              margin: 20px auto;
              padding: 20px;
              background: #fff;
              border: 1px solid #ddd;
              border-radius: 4px;
            }
            .header {
              font-size: 24px;
              font-weight: bold;
              color: #4CAF50;
              margin-bottom: 20px;
              text-align: center;
            }
            .message {
              font-size: 16px;
              margin: 20px 0;
              color: #555;
            }
            .footer {
              font-size: 14px;
              color: #666;
              text-align: center;
              margin-top: 20px;
              border-top: 1px solid #ddd;
              padding-top: 10px;
            }
            a {
              color: #4CAF50;
              text-decoration: none;
            }
          </style>
        </head>
        <body>
          <div class="container">
            <div class="header">${subject}</div>
            <div class="message">
              ${message}
            </div>
            <div class="footer">
              <p>Thank you for using Unihomes.</p>
              <p>
                Need help? <a href="mailto:unihomes2024@gmail.com">Contact Support</a>
              </p>
            </div>
          </div>
        </body>
      </html>
    `;

    const { data, error } = await resend.emails.send({
      from: 'Unihomes <noreply@unihomes.site>',
      to: email,
      subject: subject,
      html: htmlContent, // Raw HTML for the email content
    });

    console.log("Email sent");

    if (error) {
      throw new Error(JSON.stringify(error));
    }

    return data;
  } catch (error) {
    throw new Error(`Failed to send email: ${error}`);
  }
}
