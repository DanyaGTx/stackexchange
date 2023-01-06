import { createRouter, createWebHistory } from 'vue-router'

import IssuesPage from '../pages/IssuesPage.vue'
import IssuePage from '../pages/IssuePage.vue'

const router = createRouter( {
    history: createWebHistory(),
    mode: 'history',
    routes: [
        { path: '/', redirect: { name: 'questions' }},
        { path: '/questions', name: 'questions', alias: '/', component:  IssuesPage},
        { path: '/questions/:id', name: 'question-details', component: IssuePage },
        { path: '/:pathMatch(.*)*', redirect: { name: 'questions' }}
    ],
} )
export default router
