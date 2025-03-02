import { createRouter, createWebHistory} from 'vue-router'
import Home from '@/components/Home.vue';
import Corpuses from '@/components/Corpuses.vue';
import Room from '@/components/Room.vue';

const routes = [
  {
    path: '/',
    component: Home
  },
  {
    path: '/corpuses',
    component: Corpuses
  },
  {
    path: '/room',
    component: Room
  }
];

const router = createRouter({
  history: createWebHistory(),
  routes
});

export default router;
