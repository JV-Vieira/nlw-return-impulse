import { ArrowLeft, Camera } from "phosphor-react";
import { FormEvent, useState } from "react";
import { FeedbackType, feedbackTypes } from "..";
import { CloseButton } from "../../CloseButton";
import { SreenshotButton } from "../SreenshotButton";

interface FeedbackContentStepProps {
  feedbackType: FeedbackType;
  onFeedbackRestartRequest: () => void;
  onFeedbackSent: () => void;
}

export function FeedbackContentStep({
  feedbackType,
  onFeedbackRestartRequest,
  onFeedbackSent,
}: FeedbackContentStepProps) {
  const [screenshot, setScreenshot] = useState<string | null>(null);
  const [comment, setComment] = useState("");

  const feedbackTypeInfo = feedbackTypes[feedbackType];
  //feedbackTypes: o objeto que contem todas as opões de feedback e esta sendo exportada // o array vai pegar apenas do selecionado

  //quando utiliza tipescript vc prefira informar qual tipo de evento, que vem de dentro do react
  function handleSubmitFeedback(event: FormEvent) {
    event.preventDefault();
    console.log({
      screenshot,
      comment,
    });
    onFeedbackSent();
  }

  return (
    <>
      <header>
        <button
          type="button"
          className="top-5 left-5 absolute text-zinc-400 hover:text-zinc-100"
          onClick={onFeedbackRestartRequest}
        >
          <ArrowLeft weight="bold" className="w-4 h-4" />
        </button>

        <span className="text-xl leading-6 flex-1 flex justify-center items-center gap-2">
          <img
            src={feedbackTypeInfo.image.source}
            alt={feedbackTypeInfo.image.alt}
            className="w-10 h-10"
          />
          {feedbackTypeInfo.title}
        </span>
        <CloseButton />
      </header>

      <form onSubmit={handleSubmitFeedback} className="my-4 w-full">
        <textarea
          className="min-w-[304px]  w-full min-h-[112px] tex-sm placeholder-zinc-400 text-zinc-400 border-zinc-600 bg-transparent rounded-md focus:border-brand-500   focus:ring-brand-500 focus:ring-1 focus:outline-none resize-none scrollbar scrollbar-thumb-zinc-700 scrollbar-track-transparent scrollbar-thin"
          placeholder="Conte com detalhes o que está acontecendo"
          onChange={(event) => setComment(event.target.value)}
        />
        <footer className="flex gap-2 mt-2">
          <SreenshotButton
            screenshot={screenshot}
            //o screenshot vai receber a foto
            onScreenshotTook={setScreenshot}
          />

          <button
            type="submit"
            disabled={comment.length === 0}
            className="p-2 bg-brand-500 rounded-md border-transparent flex-1 flex justify-center items-center text-sm hover:bg-brand-300 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-zinc-900 focus:ring-brand-500 transition-colors disabled:opacity-50 disabled:hover:bg-brand-500 disabled:opacity-50 disabled:hover:bg-brand-500"
          >
            Enviar Feedback
          </button>
        </footer>
      </form>
    </>
  );
}
