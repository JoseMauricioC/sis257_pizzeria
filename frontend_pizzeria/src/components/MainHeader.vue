<script setup lang="ts">
import { useAuthStore } from '@/stores'
import { useRoute } from 'vue-router'

const authStore = useAuthStore()
const location = useRoute()
</script>

<template>
  <div>
    <!-- <header class="site-header">
      <div class="container">
        <div class="row">
          <div class="col-lg-12 col-12 d-flex flex-wrap">
            <p class="d-flex me-4 mb-0">
              <i class="bi-person custom-icon me-2"></i>
              <strong class="text-dark">Welcome to Music Festival 2023</strong>
            </p>
          </div>
        </div>
      </div>
    </header> -->
    <header class="site-header bg-light py-2">
      <div class="container">
        <div class="row">
          <div class="col-lg-12 col-12 d-flex flex-wrap align-items-center">
            <p class="d-flex me-4 mb-0">
              <i class="bi-pizza custom-icon me-2"></i>
              <strong class="text-dark">Bienvenido a Pizzería Fusión de Sabores</strong>
            </p>
            <p class="mb-0 ms-auto text-muted small">¡Abierto todos los días de 12:00 a 23:00!</p>
          </div>
        </div>
      </div>
    </header>

    <!--<header> -->
    <nav
      class="navbar navbar-expand-lg"
      :style="location.path != '/' ? 'background-color: black' : ''"
    >
      <div class="container">
        <RouterLink to="/" class="navbar-brand"
          ><span class="flaticon-pizza-1 mr-1"></span>Pizzeria<br /><small
            >Fusion de Sabores</small
          ></RouterLink
        >

        <RouterLink v-if="!authStore.token" to="login" class="btn custom-btn d-lg-none ms-auto me-4"
          >Iniciar Sesion</RouterLink
        >
        <a v-else @click="authStore.logout()" class="btn custom-btn d-lg-none ms-auto me-4"
          >Salir</a
        >

        <button
          class="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNav"
          aria-controls="navbarNav"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span class="navbar-toggler-icon"></span>
        </button>

        <div class="collapse navbar-collapse" id="navbarNav" style="background-color: black;">
          <ul class="navbar-nav align-items-lg-center ms-auto me-lg-5">
            <slot v-if="authStore.token">
              <li class="nav-item">
                <RouterLink to="/" class="nav-link click-scroll">Inicio</RouterLink>
              </li>

              <li class="nav-item">
                <RouterLink to="/ventas" class="nav-link click-scroll">Ventas</RouterLink>
              </li>

              <li class="nav-item">
                <RouterLink to="/producto" class="nav-link click-scroll">Productos</RouterLink>
              </li>

              <li class="nav-item">
                <RouterLink to="/cliente" class="nav-link click-scroll">Clientes</RouterLink>
              </li>

              <li class="nav-item">
                <RouterLink to="/proveedor" class="nav-link click-scroll">Proveedores</RouterLink>
              </li>

              <li class="nav-item">
                <a class="nav-link click-scroll">
                  <i class="bi-person custom-icon me-2"></i> {{ authStore.user }}</a
                >
              </li>
            </slot>
          </ul>

          <RouterLink v-if="!authStore.token" to="login" class="btn custom-btn d-lg-block d-none"
            >Iniciar Sesion</RouterLink
          >
          <a v-else @click="authStore.logout()" class="btn custom-btn d-lg-block d-none">Salir</a>
        </div>
      </div>
    </nav>
    <!-- </header>-->
  </div>
</template>

<style scoped></style>
