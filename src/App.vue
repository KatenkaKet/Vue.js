<template>
  <Menubar :model="items">
    <template #start>
      <span>
        <img src="@/assets/logo.svg" alt="logo" width="50" />
      </span>
    </template>
    <template #item="{ item, props, hasSubmenu, root }">
      <router-link v-if="item.route" :to="item.route" class="flex items-center ml-6 p-4">
        <span :class="item.icon"/>
        <span class="ml-1">{{item.label}}</span>
      </router-link>
    </template>
    <template #end>
      <div class="flex items-center gap-2">
        <div v-if="isAuthenticated && user">
          <span class="pi pi-fw pi-user mr-4"/>{{user.name}}
          <Button @click="logout" class="ml-4 bg-[#FDE94C] hover:bg-[#f0d535]">Logout</Button>
        </div>
        <div v-else>
          <form @submit.prevent="login">
            <InputText v-model="email" type="email" id="email" required
                       placeholder="Email" class="m-2 sm:w-auto" />
            <InputText v-model="password" type="password" id="password" required
                       placeholder="password" class="m-2 sm:w-auto"  :class="{'p-invalid': authError}"/>
            <Button type="submit">Login</Button>
            <div class="ml-2">
              <small v-if="authError" class="error">{{authError}}</small>
            </div>
          </form>
        </div>
      </div>
    </template>
  </Menubar>
  <router-view></router-view>
</template>

<script>
import {useAuthStore} from "@/stores/authStore.js";
import Button from "primevue/button";
import Menubar from "primevue/menubar";
import InputText from "primevue/inputtext";
export default {
  components: {Button, Menubar, InputText},
  data(){
    return{
      email:"",
      password:"",
      authStore: useAuthStore(),
      items: [
        {
          label: "Главная",
          route: "/",
          icon: "pi pi-fw pi-home",
        },
        {
          label: "Корпусы",
          route: "/corpuses",
          icon: "pi pi-fw pi-building",
        },
        {
          label: "Комнаты",
          route: "/room",
          icon: "pi pi-fw pi-table"
        }
      ]
    };
  },
  computed:{
    isAuthenticated(){
      return this.authStore.isAuthenticated;
    },
    user(){
      return this.authStore.user;
    },
    authError(){
      return this.authStore.errorMessage;
    }
  },
  methods:{
    logout(){
      this.authStore.logout();
    },
    login(){
      this.authStore.login({email:this.email, password:this.password});
    }
  },
  mounted(){
    const token = localStorage.getItem("token");
    if(token){
      this.authStore.isAuthenticated = true;
      this.authStore.getUser();
    }
  }
};
</script>

<style scoped>
.error{
  color: red;
}

.p-button:hover {
  background-color: #fdc54c !important;
  border-color: #fdc54c !important;
}

.p-button{
  background-color: #fde94c;
  border-color: #fde94c;
  color: #992d2f;
}

</style>
