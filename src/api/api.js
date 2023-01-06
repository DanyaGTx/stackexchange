import questions from './services/questions.js'
import answers from './services/answers.js'
import { apiRoot } from './instance.js'

const api = {
  questions: questions(apiRoot),
  answers: answers(apiRoot),
}
export { api }
