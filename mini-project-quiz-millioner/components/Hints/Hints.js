import { questions } from '../../root/getQuastions.js';
import { quastionsCard } from './../Questions/Questions.js';
import { popap } from './../Popap/Popap.js';
class Hints {
   constructor(questions, hintsPage) {
      this.hintsPage = document.querySelector(hintsPage);
      this.questions = questions.questions;
   }
   fiftyFifty(prompt) {
      const answers = document.querySelectorAll('.quiz-quastions__item');
      prompt.classList.add('disabled');
      let answersSome = this.questions.find(question => question.id == quastionsCard.current);
      const trueAnswer = answersSome.answer;
      const falseAnswers = answersSome.someAnswer.filter(answer => answer !== trueAnswer);
      const random = falseAnswers[Math.floor(Math.random() * falseAnswers.length)];
      for (let index = 0; index < answers.length; index++) {
         const answer = answers[index];
         if (answer.innerText === random || answer.innerText === trueAnswer) {
            continue;
         }
         answer.remove();
      }
   }
   phone() {
      const answers = document.querySelectorAll('.quiz-quastions__item');
      let answersSome = this.questions.find(question => question.id == quastionsCard.current).someAnswer;
      const answersRandom = answersSome[Math.floor(Math.random() * answersSome.length)];
      popap.usePhone(answersRandom);
   }
   chooseHint(event) {
      const prompt = event.currentTarget;
      const typePrompt = prompt.dataset.type;
      if (typePrompt) {
         if (typePrompt === 'fifty-fifty') {
            prompt.classList.add('disabled');
            this.fiftyFifty(prompt);
         } else if (typePrompt === 'phone') {
            prompt.classList.add('disabled');
            this.phone()
         }
      }

   }
   setup() {
      const prompt = document.querySelectorAll('[data-get="prompt"]');
      prompt.forEach(prompt => prompt.addEventListener('click', (e) => this.chooseHint(e), { once: true }));
   }
   render() {
      let hints = `
      <div class="page-hint__body">
         <div class="page-hints__item"  data-get="prompt" data-type="fifty-fifty">
            <img src="img/50.jpg" alt="50/50">
         </div>
         <div class="page-hints__item"  data-get="prompt" data-type="phone">
            <img src="img/phone.jpg" alt="phone">
         </div>
         <div class="page-hints__item"  data-type="health">
            <img src="img/continue.png" alt="continue">
         </div>
      </div>
      `;
      this.hintsPage.innerHTML = hints;
      this.setup();
   }
};

export const hints = new Hints(questions, '#hints');
