import Vue from 'vue'
import Router from 'vue-router'
import Machine from '@/pages/Machine'

Vue.use(Router)

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      redirect: {name: 'machine'}
    },
    {
      path: '/machine',
      name: 'machine',
      component: Machine
    }

  ]
})
