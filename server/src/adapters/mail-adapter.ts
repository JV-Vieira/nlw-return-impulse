export interface SendMailData{
  subject:string;
  body:string;
}

export interface MailAdapter {
  sendMail: (data: SendMailData) => Promise<void>; //send é o metodo do que vai fazer
}