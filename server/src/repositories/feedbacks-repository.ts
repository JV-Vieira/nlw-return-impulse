//Esse arquivo que vai dizer para o resto da aplicação quais são as operações que a gente pode realizar no banco de dados, mas ele não vai implementar
//quem vai fazer isso sera o prisma-feedbacks-repository
export interface FeedbackCreateData {
  type: string;
  comment: string;
  screenshot?:string;
}
export interface FeedbackRepository{
  create: (data: FeedbackCreateData) => Promise<void>; //create metodo do que vai ser feito nesse serviço
}
// Essa é uma interface que pertence a camada de dados 
