import { createRouter, createWebHistory } from "vue-router";
import HomeView from "../views/HomeView.vue";
import VoteView from "../views/VoteView.vue";
import Management from "../views/Management.vue";
import Login from "../views/LoginView.vue";
import Character from "../views/management/CharacterManager.vue";
import CharacterInfo from "../views/management/Character.id.vue";
import DocumentManager from "../views/management/DocumentManager.vue";
import CreateCharacter from "../views/management/CreateCharacter.vue";
// import Login from "../views/LoginView.vue";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      name: "home",
      component: HomeView,
    },
    {
      path: "/vote",
      name: "vote",
      component: VoteView,
    },
    {
      path: "/manager",
      name: "manager",
      component: Management,
      children: [
        {
          path: "character",
          name: "character",
          component: Character,
        },
        {
          path: "character/:id",
          name: "characterInfo",
          component: CharacterInfo,
        },
        {
          path: "create",
          name: "create",
          component: CreateCharacter,
        },
        {
          path: "document",
          name: "document",
          component: DocumentManager,
        },
      ],
    },
    {
      path: "/login",
      name: "login",
      component: Login,
    },
  ],
});

export default router;
