import { createRouter, createWebHistory } from "vue-router";
import HomeView from "../views/HomeView.vue";
import VoteView from "../views/VoteView.vue";
import VoteResultView from "../views/VoteResultView.vue";
import VoteRankingView from "../views/VoteRankingView.vue";
import Management from "../views/Management.vue";
import Login from "../views/LoginView.vue";
import Character from "../views/management/CharacterManager.vue";
import CharacterInfo from "../views/management/Character.id.vue";
import DocumentManager from "../views/management/DocumentManager.vue";
import CreateCharacter from "../views/management/CreateCharacter.vue";
import axios from "axios";
import { Auth, Service } from "../service/Repository";
import { API } from "../service/API";
// import Login from "../views/LoginView.vue";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      name: "home",
      component: HomeView,
      meta: { voteAt: true },
    },
    {
      path: "/vote",
      name: "vote",
      component: VoteView,
      meta: { voteAt: true },
    },
    {
      path: "/vote/result",
      name: "voteResult",
      component: VoteResultView,
      meta: { voteAt: true },
    },
    {
      path: "/vote/rank",
      name: "voteRank",
      component: VoteRankingView,
      meta: { voteAt: true },
    },

    {
      path: "/_admin",
      redirect: "/_admin/character",
    },
    {
      path: "/_admin",
      name: "manager",
      component: Management,
      meta: { requiresAuth: true },
      children: [
        {
          path: "character",
          name: "character",
          meta: { requiresAuth: true },
          component: Character,
        },
        {
          path: "character/:id",
          name: "characterInfo",
          meta: { requiresAuth: true },
          component: CharacterInfo,
        },
        {
          path: "create",
          name: "create",
          meta: { requiresAuth: true },
          component: CreateCharacter,
        },
        {
          path: "document",
          name: "document",
          meta: { requiresAuth: true },
          component: DocumentManager,
        },
      ],
    },

    {
      path: "/_admin/login",
      name: "login",
      component: Login,
    },
  ],
});

router.beforeEach(async (to, from, next) => {
  if (to.meta.requiresAuth) {
    const token = window.localStorage.getItem("Token");

    if (token) {
      API.defaults.headers.Authorization = "Bearer " + token;
      next();
    } else {
      next("/_admin/login");
    }
  } else {
    next();
  }
  // const result = await Service.GetDocumentSetting();
  // const voteEndDate = result.data.vote_at;

  if (to.meta.voteAt) {
  }
});

export default router;
