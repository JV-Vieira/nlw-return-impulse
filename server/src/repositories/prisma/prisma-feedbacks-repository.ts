import { prisma } from '../../prisma';
import { FeedbackCreateData, FeedbackRepository } from '../feedbacks-repository';

export class PrismaFeedbacksRepository implements FeedbackRepository { //toda função async é uma promise
  async create({type, comment, screenshot}: FeedbackCreateData) {
    await prisma.feedback.create({
      data:{
        type,
        comment,
        screenshot,
      }  
    });
  };
}

//Implementando o contrato