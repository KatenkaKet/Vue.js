import { createRouter, createWebHistory} from 'vue-router'
import Home from '@/components/Home.vue';
import Corpuses from '@/components/Corpuses.vue';
import Room from '@/components/Room.vue';
import CreateCorpus from "@/components/CreateCorpus.vue";

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
  },
  {
    path: '/createCorpus',
    component: CreateCorpus,
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes
});

export default router;
