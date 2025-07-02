<script setup lang="ts">
import { computed } from 'vue'
import { useAuthStore } from '@/stores'
import { useRoute } from 'vue-router'

const authStore = useAuthStore()
const route = useRoute()

const navbarBackgroundClass = computed(() => {
  return route.path !== '/' ? 'navbar-dark-bg' : ''
})
</script>

<template>
  <div>
    <header>
      <nav :class="['navbar navbar-expand-lg', navbarBackgroundClass]">
        <div class="container">
          <RouterLink to="/" class="navbar-brand">
            <span class="pizza-icon glowing-pizza-icon" role="img" aria-label="Pizza icon">🍕</span>
            <span class="pizzeria-nombre">Pizzeria</span><br /><small class="pizzeria-slogan"
              >Fusion de Sabores</small
            >
          </RouterLink>

          <RouterLink
            v-if="!authStore.token"
            to="login"
            class="btn custom-btn d-lg-none ms-auto me-4"
          >
            Iniciar Sesión
          </RouterLink>
          <a v-else @click="authStore.logout()" class="btn custom-btn d-lg-none ms-auto me-4">
            Salir
          </a>

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

          <div class="collapse navbar-collapse" id="navbarNav">
            <ul class="navbar-nav align-items-lg-center ms-auto me-lg-5">
              <template v-if="authStore.token">
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
                    <i class="bi-person custom-icon me-2"></i> {{ authStore.user }}
                  </a>
                </li>
              </template>
            </ul>

            <RouterLink v-if="!authStore.token" to="login" class="btn custom-btn d-lg-block d-none">
              Iniciar Sesión
            </RouterLink>
            <a v-else @click="authStore.logout()" class="btn custom-btn d-lg-block d-none">
              Salir
            </a>
          </div>
        </div>
      </nav>
    </header>
  </div>
</template>

<style scoped>
.navbar-dark-bg {
  background-color: black !important;
}

.navbar-collapse.show.navbar-dark-bg,
.navbar-collapse.collapsing.navbar-dark-bg {
  background-color: black !important;
}

.navbar-dark-bg .navbar-nav .nav-link {
  color: rgba(255, 255, 255, 0.75);
}

.navbar-dark-bg .navbar-nav .nav-link:hover,
.navbar-dark-bg .navbar-nav .nav-link.router-link-active {
  color: white;
}

.glowing-pizza-icon {
  font-size: 2.5rem; /* Ajusta el tamaño si es necesario */
  /* Propiedad clave para el efecto luminoso */
  text-shadow:
    0 0 5px orange,
    /* Sombra más cercana y sutil */ 0 0 10px darkorange,
    /* Sombra un poco más extendida */ 0 0 15px #ff6347,
    /* Sombra más fuerte y con un color más vibrante */ 0 0 20px #ffa500; /* Sombra más difusa para el resplandor general */
  animation: pulse-glow 2s infinite alternate; /* Animación opcional para un efecto pulsante */
}

/* Animación de pulso (opcional) */
@keyframes pulse-glow {
  from {
    text-shadow:
      0 0 5px orange,
      0 0 10px darkorange,
      0 0 15px #ff6347,
      0 0 20px #ffa500;
  }
  to {
    text-shadow:
      0 0 8px orange,
      0 0 15px darkorange,
      0 0 25px #ff6347,
      0 0 35px #ffa500;
  }
}

/* Puedes ajustar otros estilos del .pizza-icon si existen */
.pizza-icon {
  margin-right: 0.5rem; /* Espacio a la derecha del icono */
  vertical-align: middle; /* Alineación vertical */
}

.pizzeria-nombre {
  font-family: 'Pacifico', cursive;
  font-size: 20px;
  color: #c70700; /* Un rojo más oscuro y rico */
  text-shadow: 3px 3px 6px rgba(0, 0, 0, 0.4);
}

.pizzeria-slogan {
  font-family: 'Open Sans', sans-serif;
  font-size: 25px;
  
  color: orangered; /* Un morado oscuro o un color complementario */
  font-style: italic;
}
</style>
