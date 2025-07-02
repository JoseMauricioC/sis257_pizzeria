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
          <RouterLink to="/" class="navbar-brand brand-container">
            <div class="brand-content">
              <span class="pizza-icon glowing-pizza-icon" role="img" aria-label="Pizza icon">🍕</span>
              <div class="brand-text">
                <span class="pizzeria-nombre">Pizzeria</span>
                <small class="pizzeria-slogan">Fusión de Sabores</small>
              </div>
            </div>
          </RouterLink>

          <RouterLink
            v-if="!authStore.token"
            to="login"
            class="btn custom-btn mobile-auth-btn d-lg-none ms-auto me-4"
          >
            <i class="bi bi-box-arrow-in-right me-2"></i>
            Iniciar Sesión
          </RouterLink>
          <a v-else @click="authStore.logout()" class="btn custom-btn mobile-auth-btn d-lg-none ms-auto me-4">
            <i class="bi bi-box-arrow-right me-2"></i>
            Salir
          </a>

          <button
            class="navbar-toggler custom-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarNav"
            aria-controls="navbarNav"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span class="navbar-toggler-icon custom-toggler-icon"></span>
          </button>

          <div class="collapse navbar-collapse" id="navbarNav">
            <ul class="navbar-nav align-items-lg-center ms-auto me-lg-5">
              <template v-if="authStore.token">
                <li class="nav-item">
                  <RouterLink to="/" class="nav-link click-scroll">
                    <i class="bi bi-house-door me-2"></i>
                    Inicio
                  </RouterLink>
                </li>
                <li class="nav-item">
                  <RouterLink to="/ventas" class="nav-link click-scroll">
                    <i class="bi bi-cart-check me-2"></i>
                    Ventas
                  </RouterLink>
                </li>
                <li class="nav-item">
                  <RouterLink to="/producto" class="nav-link click-scroll">
                    <i class="bi bi-box-seam me-2"></i>
                    Productos
                  </RouterLink>
                </li>
                <li class="nav-item">
                  <RouterLink to="/cliente" class="nav-link click-scroll">
                    <i class="bi bi-people me-2"></i>
                    Clientes
                  </RouterLink>
                </li>
                <li class="nav-item">
                  <RouterLink to="/proveedor" class="nav-link click-scroll">
                    <i class="bi bi-truck me-2"></i>
                    Proveedores
                  </RouterLink>
                </li>
                <li class="nav-item user-item">
                  <a class="nav-link user-link">
                    <div class="user-avatar">
                      <i class="bi bi-person-circle"></i>
                    </div>
                    <span class="user-name">{{ authStore.user }}</span>
                  </a>
                </li>
              </template>
            </ul>

            <RouterLink v-if="!authStore.token" to="login" class="btn custom-btn desktop-auth-btn d-lg-block d-none">
              <i class="bi bi-box-arrow-in-right me-2"></i>
              Iniciar Sesión
            </RouterLink>
            <a v-else @click="authStore.logout()" class="btn custom-btn desktop-auth-btn d-lg-block d-none">
              <i class="bi bi-box-arrow-right me-2"></i>
              Salir
            </a>
          </div>
        </div>
      </nav>
    </header>
  </div>
</template>

<style scoped>
/* Navbar Base Styles */
.navbar {
  background: linear-gradient(135deg, #e7a553 0%, #ebb5b5 50%, #f38840 100%);
  backdrop-filter: blur(10px);
  box-shadow: 0 4px 20px rgba(255, 140, 0, 0.3);
  border-bottom: 2px solid rgba(255, 255, 255, 0.1);
  padding: 1rem 0;
  transition: all 0.3s ease;
  position: relative;
  overflow: hidden;
}

.navbar::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: url('data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 20"><defs><linearGradient id="grad" x1="0%25" y1="0%25" x2="100%25" y2="0%25"><stop offset="0%25" style="stop-color:rgba(255,255,255,0.1);stop-opacity:1" /><stop offset="100%25" style="stop-color:rgba(255,255,255,0);stop-opacity:1" /></linearGradient></defs><polygon fill="url(%23grad)" points="0,0 100,0 85,20 0,20"/></svg>') repeat-x;
  background-size: 200px 100%;
  opacity: 0.3;
  animation: shimmer 3s infinite linear;
}

@keyframes shimmer {
  0% {
    transform: translateX(-100%);
  }
  100% {
    transform: translateX(100%);
  }
}

.navbar-dark-bg {
  background: linear-gradient(135deg, #1a1a1a 0%, #2d2d2d 50%, #1a1a1a 100%) !important;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.5) !important;
  border-bottom: 2px solid #ddaf77 !important;
}

.navbar-dark-bg::before {
  background: linear-gradient(135deg, #ff8c00 0%, #ff7700 100%);
  opacity: 0.1;
  animation: none;
}

/* Brand Styles */
.brand-container {
  text-decoration: none;
  transition: transform 0.3s ease;
}

.brand-container:hover {
  transform: scale(1.05);
}

.brand-content {
  display: flex;
  align-items: center;
  gap: 0.75rem;
}

.brand-text {
  display: flex;
  flex-direction: column;
  line-height: 1.2;
}

.glowing-pizza-icon {
  font-size: 3rem;
  text-shadow:
    0 0 10px #ff8c00,
    0 0 20px #ff7700,
    0 0 30px #ff6600,
    0 0 40px #ff5500;
  animation: pulse-glow 2s infinite alternate;
  transition: all 0.3s ease;
}

.brand-container:hover .glowing-pizza-icon {
  text-shadow:
    0 0 15px #ff8c00,
    0 0 25px #ff7700,
    0 0 35px #ff6600,
    0 0 45px #ff5500;
  transform: rotate(5deg);
}

@keyframes pulse-glow {
  from {
    text-shadow:
      0 0 10px #ff8c00,
      0 0 20px #ff7700,
      0 0 30px #ff6600,
      0 0 40px #ff5500;
  }
  to {
    text-shadow:
      0 0 15px #ff8c00,
      0 0 25px #ff7700,
      0 0 35px #ff6600,
      0 0 45px #ff5500;
  }
}

.pizzeria-nombre {
  font-family: 'Pacifico', 'Georgia', serif;
  font-size: 1.8rem;
  font-weight: 700;
  color: white;
  text-shadow: 
    2px 2px 4px rgba(0, 0, 0, 0.3),
    0 0 10px rgba(255, 255, 255, 0.2);
  margin: 0;
}

.pizzeria-slogan {
  font-family: 'Open Sans', 'Arial', sans-serif;
  font-size: 0.9rem;
  color: #ffe0cc;
  font-style: italic;
  text-shadow: 1px 1px 2px rgba(0, 0, 0, 0.3);
  margin: 0;
  opacity: 0.95;
}

/* Navigation Links */
.navbar-nav {
  gap: 0.5rem;
}

.nav-link {
  color: white !important;
  font-weight: 500;
  font-size: 1rem;
  padding: 0.75rem 1rem !important;
  border-radius: 10px;
  transition: all 0.3s ease;
  display: flex;
  align-items: center;
  position: relative;
  overflow: hidden;
}

.nav-link::before {
  content: '';
  position: absolute;
  top: 0;
  left: -100%;
  width: 100%;
  height: 100%;
  background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.2), transparent);
  transition: left 0.5s ease;
}

.nav-link:hover::before {
  left: 100%;
}

.nav-link:hover {
  color: #ff8c00 !important;
  background: rgba(255, 255, 255, 0.15);
  transform: translateY(-2px);
  box-shadow: 0 4px 12px rgba(255, 140, 0, 0.3);
}

.nav-link.router-link-active {
  color: #ff8c00 !important;
  background: rgba(255, 255, 255, 0.2);
  box-shadow: 0 2px 8px rgba(255, 140, 0, 0.2);
}

.nav-link i {
  font-size: 1.1rem;
  opacity: 0.9;
}

/* Dark Background Navigation */
.navbar-dark-bg .nav-link {
  color: rgba(255, 255, 255, 0.8) !important;
}

.navbar-dark-bg .nav-link:hover {
  color: #ff8c00 !important;
  background: rgba(255, 140, 0, 0.1);
}

.navbar-dark-bg .nav-link.router-link-active {
  color: #ff8c00 !important;
  background: rgba(255, 140, 0, 0.15);
}

/* User Item */
.user-item {
  margin-left: 1rem;
}

.user-link {
  background: rgba(255, 255, 255, 0.1) !important;
  border: 1px solid rgba(255, 255, 255, 0.2) !important;
  border-radius: 25px !important;
  padding: 0.5rem 1rem !important;
  gap: 0.5rem;
}

.user-avatar {
  background: rgba(255, 255, 255, 0.2);
  border-radius: 50%;
  width: 35px;
  height: 35px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.user-avatar i {
  font-size: 1.5rem;
  color: white;
}

.user-name {
  font-weight: 600;
  color: white;
}

/* Custom Buttons */
.custom-btn {
  background: linear-gradient(135deg, #ff8c00, #ff7700);
  border: none;
  color: white;
  font-weight: 600;
  padding: 0.75rem 1.5rem;
  border-radius: 25px;
  transition: all 0.3s ease;
  box-shadow: 0 4px 15px rgba(255, 140, 0, 0.3);
  display: flex;
  align-items: center;
  text-decoration: none;
  position: relative;
  overflow: hidden;
}

.custom-btn::before {
  content: '';
  position: absolute;
  top: 0;
  left: -100%;
  width: 100%;
  height: 100%;
  background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.3), transparent);
  transition: left 0.5s ease;
}

.custom-btn:hover::before {
  left: 100%;
}

.custom-btn:hover {
  background: linear-gradient(135deg, #ff7700, #ff6600);
  transform: translateY(-3px);
  box-shadow: 0 6px 20px rgba(255, 140, 0, 0.4);
  color: white;
}

.custom-btn:active {
  transform: translateY(-1px);
}

.desktop-auth-btn {
  margin-left: 1rem;
}

.mobile-auth-btn {
  font-size: 0.9rem;
  padding: 0.6rem 1.2rem;
}

/* Custom Toggler */
.custom-toggler {
  border: 2px solid rgba(255, 255, 255, 0.3);
  border-radius: 8px;
  padding: 0.5rem;
  transition: all 0.3s ease;
}

.custom-toggler:hover {
  border-color: rgba(255, 255, 255, 0.6);
  background: rgba(255, 255, 255, 0.1);
}

.custom-toggler:focus {
  box-shadow: 0 0 0 3px rgba(255, 140, 0, 0.3);
}

.custom-toggler-icon {
  background-image: url('data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 30 30"><path stroke="white" stroke-linecap="round" stroke-miterlimit="10" stroke-width="2" d="M4 7h22M4 15h22M4 23h22"/></svg>') !important;
  width: 1.5rem;
  height: 1.5rem;
}

/* Responsive Design */
@media (max-width: 991px) {
  .navbar-collapse {
    background: rgba(0, 0, 0, 0.9);
    border-radius: 15px;
    margin-top: 1rem;
    padding: 1.5rem;
    border: 1px solid rgba(255, 140, 0, 0.3);
  }

  .navbar-dark-bg .navbar-collapse {
    background: rgba(0, 0, 0, 0.95);
  }

  .nav-link {
    margin: 0.25rem 0;
    justify-content: flex-start;
  }

  .user-link {
    justify-content: flex-start !important;
    margin-top: 1rem;
    border-top: 1px solid rgba(255, 140, 0, 0.3);
    padding-top: 1rem !important;
  }

  .pizzeria-nombre {
    font-size: 1.5rem;
  }

  .pizzeria-slogan {
    font-size: 0.8rem;
  }

  .glowing-pizza-icon {
    font-size: 2.5rem;
  }
}

@media (max-width: 576px) {
  .navbar {
    padding: 0.75rem 0;
  }

  .brand-content {
    gap: 0.5rem;
  }

  .pizzeria-nombre {
    font-size: 1.3rem;
  }

  .pizzeria-slogan {
    font-size: 0.75rem;
  }

  .glowing-pizza-icon {
    font-size: 2rem;
  }

  .mobile-auth-btn {
    font-size: 0.8rem;
    padding: 0.5rem 1rem;
  }
}

/* Scroll Effect */
.navbar {
  position: sticky;
  top: 0;
  z-index: 1000;
}

.navbar.scrolled {
  box-shadow: 0 6px 25px rgba(255, 140, 0, 0.4);
}

/* Animation for navbar items */
.nav-item {
  animation: fadeInUp 0.6s ease-out forwards;
  opacity: 0;
}

.nav-item:nth-child(1) { animation-delay: 0.1s; }
.nav-item:nth-child(2) { animation-delay: 0.2s; }
.nav-item:nth-child(3) { animation-delay: 0.3s; }
.nav-item:nth-child(4) { animation-delay: 0.4s; }
.nav-item:nth-child(5) { animation-delay: 0.5s; }
.nav-item:nth-child(6) { animation-delay: 0.6s; }

@keyframes fadeInUp {
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}
</style>