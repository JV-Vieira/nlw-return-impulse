import express from 'express'
import { NodemailerMailAdpter } from './adapters/nodemailer/nodemailer-mail-adapter';
import { PrismaFeedbacksRepository } from './repositories/prisma/prisma-feedbacks-repository';
import { SubmitFeedbackUseCase } from './use-cases/submit-feeeback-use-case';

export const routes = express.Router()

routes.post('/feedbacks', async (req, res) => {
  const {type, comment, screenshot} = req.body

  const prismaFeedbacksRepository = new PrismaFeedbacksRepository ()
  const nodemailerAdapter = new NodemailerMailAdpter()

  const submitFeedbackUseCase = new SubmitFeedbackUseCase( //tem uma independencia que é o feedbacksRepository, mas não é ele que vai procurar pelo prisma. inversão de depencia
    prismaFeedbacksRepository,
    nodemailerAdapter
  )
  
  await submitFeedbackUseCase.execute({
    type,
    comment,
    screenshot, 
  })

  
  return res.status(201).send() //201 é o status de criação, e ({ data: feedback}) para mostrar os dados criados
});