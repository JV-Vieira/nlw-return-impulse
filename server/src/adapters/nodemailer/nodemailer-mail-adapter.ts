import { MailAdapter, SendMailData } from "../mail-adapter";
import nodemailer from "nodemailer"

const transport = nodemailer.createTransport({
  host: "smtp.mailtrap.io",
  port: 2525,
  auth: {
    user: "db3ed4d86a7b93",
    pass: "0a8aaf10fa228d"
  }
});

export class NodemailerMailAdpter implements MailAdapter{
  
  async sendMail({subject, body}: SendMailData) {
    await transport.sendMail({ //aqui é a função onde o email será enviada
    from: 'Equipe Feedget <oi@feedget.com>', //Aqui onde quem vai enviar o email
    to: 'Joao Victor <joaovictorvieira@gmail.com>', //Aqui vai ser quem ira receber o email
    subject, //Titulo
    html: body,
     
  });

  };
} 