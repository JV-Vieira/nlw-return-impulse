import { MailAdapter } from "../adapters/mail-adapter";
import { FeedbackRepository } from "../repositories/feedbacks-repository";
// import { PrismaFeedbackRepository } from "../repositories/prisma/prisma-feedbacks-repository"; //posso tirar a importação

interface SubmitFeedbackUseCaseRequest {
  type: string,
  comment: string,
  screenshot?: string; //em TypeScript se um dado for opcional a ? vem antes de falar a tipagem ?:
}

//Quando se depende da interface e não da implementação
export class SubmitFeedbackUseCase { //então iremos fazer assim:
  constructor(
    private feedbacksRepository: FeedbackRepository, //e o tipo desse repositorio sera nosso contrato/FeedbackRepository
    private mailAdapter: MailAdapter, 
    ){}

  async execute(request: SubmitFeedbackUseCaseRequest) {
    const { type, comment, screenshot} = request; //Agora para Salvar se não tivesse utilizando o principio de denpencia aqui dentro assim

    if(!type){
      throw new Error('Type is required.')
    }

    if(!comment){
      throw new Error('Type is required.')
    }

    if (screenshot && !screenshot.startsWith('data:image/png;base64')){
      throw new Error('Invalid screenshot format.')
    }
    // const prismaFeedbackRepository = new PrismaFeedbackRepository(); //Agora não vou instacinar mais o prismaFeedbackRepository e sim o this.feedbackRepository

    // await prismaFeedbackRepository.create({ 
    await this.feedbacksRepository.create({
      type,
      comment,
      screenshot,
    })// Mas a aplicação estaria totalmente aclopado ao Prisma e se um dia quisse trocar não iria dar para fazer, e iria dar trabalho para alterar
 
    await this.mailAdapter.sendMail({
      subject: 'Novo feedback',
      body: [ 
      `<div style='font-family: sans-serif; font-size:16px; color: #111;'>`, //css
      `<p>Tipo do feedback: ${type}<p>`, //<p> São os paragrafos ${type} oq sera enviado
      `<p>Comentário: ${comment}<p>`,
      screenshot ? `<img src="${screenshot}" />` : ``, //se tiver screenshot vai mostrar 
    ].join('\n')
    })
  }
}
      // Essa interface pertence a camada de aplicação, a camada que lida com regra de negocio da aplicação.
  // Aqui sera onde o feedback sera salvo e depois enviar o email.

//Agora dentro do meu services não tenho mais uma referencia ao prisma, pq a classe feedbacksRepository não depende mais do prisma