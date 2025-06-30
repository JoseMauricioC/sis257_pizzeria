<script setup lang="ts">
import { RouterView } from 'vue-router'
import '@/assets/js/jquery.min.js'
import '@/assets/js/bootstrap.min.js'
import '@/assets/js/jquery.sticky.js'
import '@/assets/js/click-scroll.js'
import '@/assets/js/custom.js'
import MainHeader from './components/MainHeader.vue'
import MainFooter from './components/MainFooter.vue'
//import { RouterLink, RouterView } from 'vue-router'
// import HelloWorld from './components/HelloWorld.vue'
// import { useAuthStore } from "@/stores/index";
// const authStore = useAuthStore();
</script>

<template>
  <main>
    <MainHeader/>
    <RouterView />
  </main>
    <MainFooter/>
  <!-- <header>
    <img alt="Vue logo" class="logo" src="@/assets/logo.svg" width="125" height="125" /> 

    <div class="wrapper">
       <HelloWorld :msg="'SIS257' + (authStore.user ? ' - Hola ' + authStore.user : '')" />
      <nav>
	<RouterLink to="/">Inicio</RouterLink>
	<RouterLink v-if="!authStore.token" to="/login" >Iniciar Sesión</RouterLink>
	<span v-else>
        <RouterLink to="/">Home</RouterLink>
        <RouterLink to="/about">About</RouterLink>
        <RouterLink to="/ventas">Ventas</RouterLink>
        <RouterLink to="/producto">Productos</RouterLink>
        <RouterLink to="/cliente">Clientes</RouterLink>
	  <a @click="authStore.logout()" class="text-danger">Salir</a>
	</span>
  </nav>
    </div>
  </header> -->

</template>

<style>
@import '@/assets/css/bootstrap.min.css';
@import '@/assets/css/bootstrap-icons.css';
@import '@/assets/css/templatemo-festava-live.css';
/*header {
  line-height: 1.5;
  max-height: 100vh;
}

.logo {
  display: block;
  margin: 0 auto 2rem;
}

nav {
  width: 100%;
  font-size: 12px;
  text-align: center;
  margin-top: 2rem;
}

nav a.router-link-exact-active {
  color: var(--color-text);
}

nav a.router-link-exact-active:hover {
  background-color: transparent;
}

nav a {
  display: inline-block;
  padding: 0 1rem;
  border-left: 1px solid var(--color-border);
}

nav a:first-of-type {
  border: 0;
}

@media (min-width: 1024px) {
  header {
    display: flex;
    place-items: center;
    padding-right: calc(var(--section-gap) / 2);
  }

  .logo {
    margin: 0 2rem 0 0;
  }

  header .wrapper {
    display: flex;
    place-items: flex-start;
    flex-wrap: wrap;
  }

  nav {
    text-align: left;
    margin-left: -1rem;
    font-size: 1rem;

    padding: 1rem 0;
    margin-top: 1rem;
  }
}*/
</style>
