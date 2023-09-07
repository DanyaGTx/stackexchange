export const routeNames = {
  questions: 'questions',
  questionDetails: 'question-details',
  about: 'about',
}

export const routes = [
  {
    path: '/',
    name: routeNames.questions,
    component: () => import('../views/IssuesPage.vue'),
  },
  {
    path: '/about',
    name: routeNames.about,
    component: () => import('../views/AboutPage.vue'),
  },
  {
    path: '/questions/:id',
    name: routeNames.questionDetails,
    component: () => import('../views/IssuePage.vue'),
  },
  { path: '/:pathMatch(.*)*', redirect: { name: routeNames.questions } },
]
