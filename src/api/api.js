import { apiRoot } from './instance.js'
import answers from './services/answers.js'
import questions from './services/questions.js'

const api = {
  questions: questions(apiRoot),
  answers: answers(apiRoot),
}
export { api }
