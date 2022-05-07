import { SubmitFeedbackUseCase } from "./submit-feeeback-use-case"
//teste unitario

const createFeedbackSpy = jest.fn(); //essa é uma função espiã, ela não tem funcionalidade nenhuma mas dar para saber quando ela foi chamada
const sendMailSpy =jest.fn();

const submitFeedback = new SubmitFeedbackUseCase(
  { create: createFeedbackSpy },
  { sendMail: sendMailSpy}
)

describe('submit feedback', () => {
  it('should be able to submit a feedback', async () => { //espero que quando eu chamar essa função execute, passado os parametros:
    await expect(submitFeedback.execute({ 
      type: 'BUG',
      comment: 'example comment',
      screenshot: 'data:image/png;base64',
    })).resolves.not.toThrow(); //espero que função resolva e que não dispare nenhum erro.

    expect(createFeedbackSpy).toHaveBeenCalled(); //espero que a função createFeedbackSpy, seja chamada
    expect(sendMailSpy).toHaveBeenCalled();

  });

  it('should not be able to submit feedback without type', async () => {
    await expect(submitFeedback.execute({ //espero que não seja possivel enviar um feedback sem um type 
      type: '',
      comment: 'example comment',
      screenshot: 'data:image/png;base64',
    })).rejects.toThrow(); //espero que rejeite e espero que dispare um erro.
  });

  it('should not be able to submit feedback without comment', async () => {
    await expect(submitFeedback.execute({ //espero que não seja possivel enviar um feedback sem um type 
      type: 'BUG',
      comment: '',
      screenshot: 'data:image/png;base64',
    })).rejects.toThrow(); //espero que rejeite e espero que dispare um erro.
  });

  it('should not be able to submit feedback with invalid screenshot', async () => {
    await expect(submitFeedback.execute({ //espero que não seja possivel enviar um feedback sem um type 
      type: 'BUG',
      comment: 'example comment',
      screenshot: 'test.jpg',
    })).rejects.toThrow(); //espero que rejeite e espero que dispare um erro.
  });

});