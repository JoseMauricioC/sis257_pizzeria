<script setup lang="ts">
//import TheWelcome from '../components/TheWelcome.vue'
</script>

<template>
  <section
    class="home-slider owl-carousel img"
    style="background: linear-gradient(135deg, #ff8c00 0%, #ff6b35 50%, #ff4500 100%); min-height: 100vh;"
  >
    <div class="slider-item" style="background: linear-gradient(45deg, #ff8c00, #ff6b35);">
      <div class="overlay" style="background: rgba(0, 0, 0, 0.3)"></div>
      <div class="container">
        <div class="row slider-text align-items-center" data-scrollax-parent="true">
          <div class="col-md-6 col-sm-12 ftco-animate">
            <span class="subheading" style="color: #ff8c00; font-weight: bold;">Auténtica</span>
            <h1 class="mb-4" style="color: #fff; text-shadow: 2px 2px 4px rgba(0,0,0,0.7);">Cocina Italiana</h1>
            <p class="mb-4 mb-md-5" style="color: #fff; font-size: 1.1rem;">
              Somos una pizzería familiar con más de 20 años de experiencia, llevando los auténticos 
              sabores de Italia directamente a tu mesa con ingredientes frescos y recetas tradicionales.
            </p>
            <p>
              <a href="#" class="btn p-3 px-xl-4 py-xl-3" style="background-color: #ff8c00; border-color: #ff8c00; color: white; font-weight: bold;">Ordenar Ahora</a>
              <a href="#" class="btn btn-outline-light p-3 px-xl-4 py-xl-3" style="border-color: #ff8c00; color: #ff8c00; font-weight: bold;">Ver Menú</a>
            </p>
          </div>
          <div class="col-md-6 ftco-animate">
            <img src="@/assets/images/bg_1.png" class="img-fluid" alt="Pizza Italiana" />
          </div>
        </div>
      </div>
    </div>

    <div class="slider-item" style="background: linear-gradient(45deg, #ff6b35, #ff4500);">
      <div class="overlay" style="background: rgba(0, 0, 0, 0.3)"></div>
      <div class="container">
        <div class="row slider-text align-items-center" data-scrollax-parent="true">
          <div class="col-md-6 col-sm-12 order-md-last ftco-animate">
            <span class="subheading" style="color: #ff8c00; font-weight: bold;">Crujiente</span>
            <h1 class="mb-4" style="color: #fff; text-shadow: 2px 2px 4px rgba(0,0,0,0.7);">Pizza Artesanal</h1>
            <p class="mb-4 mb-md-5" style="color: #fff; font-size: 1.1rem;">
              Nuestras pizzas son elaboradas con masa madre fermentada 24 horas, quesos importados 
              de Italia y vegetales frescos. Cada pizza es una obra de arte culinaria horneada 
              en nuestro horno de leña tradicional.
            </p>
            <p>
              <a href="#" class="btn p-3 px-xl-4 py-xl-3" style="background-color: #ff8c00; border-color: #ff8c00; color: white; font-weight: bold;">Ordenar Ahora</a>
              <a href="#" class="btn btn-outline-light p-3 px-xl-4 py-xl-3" style="border-color: #ff8c00; color: #ff8c00; font-weight: bold;">Ver Menú</a>
            </p>
          </div>
          <div class="col-md-6 ftco-animate">
            <img src="@/assets/images/bg_2.png" class="img-fluid" alt="Pizza Artesanal" />
          </div>
        </div>
      </div>
    </div>

    <div class="slider-item" style="background: linear-gradient(45deg, #ff4500, #ff8c00);">
      <div class="overlay" style="background: rgba(0, 0, 0, 0.3)"></div>
      <div class="container">
        <div class="row slider-text align-items-center" data-scrollax-parent="true">
          <div class="col-md-6 col-sm-12 ftco-animate">
            <span class="subheading" style="color: #ff8c00; font-weight: bold;">Tradición</span>
            <h1 class="mb-4" style="color: #fff; text-shadow: 2px 2px 4px rgba(0,0,0,0.7);">Sabores Únicos</h1>
            <p class="mb-4 mb-md-5" style="color: #fff; font-size: 1.1rem;">
              Desde 2003, hemos sido el lugar favorito de las familias que buscan la mejor pizza 
              de la ciudad. Nuestro compromiso con la calidad y el servicio excepcional nos ha 
              convertido en una tradición en el barrio.
            </p>
            <p>
              <a href="#" class="btn p-3 px-xl-4 py-xl-3" style="background-color: #ff8c00; border-color: #ff8c00; color: white; font-weight: bold;">Ordenar Ahora</a>
              <a href="#" class="btn btn-outline-light p-3 px-xl-4 py-xl-3" style="border-color: #ff8c00; color: #ff8c00; font-weight: bold;">Ver Menú</a>
            </p>
          </div>
          <div class="col-md-6 ftco-animate">
            <img src="@/assets/images/pizzeria_14.png" class="img-fluid" alt="Tradición Italiana" />
          </div>
        </div>
      </div>
    </div>

    <div class="slider-item" style="background: linear-gradient(45deg, #ffa500, #ff6b35);">
      <div class="overlay" style="background: rgba(0, 0, 0, 0.3)"></div>
      <div class="container">
        <div class="row slider-text align-items-center" data-scrollax-parent="true">
          <div class="col-md-6 col-sm-12 order-md-last ftco-animate">
            <span class="subheading" style="color: #ff8c00; font-weight: bold;">Especialidad</span>
            <h1 class="mb-4" style="color: #fff; text-shadow: 2px 2px 4px rgba(0,0,0,0.7);">Pizza Napolitana</h1>
            <p class="mb-4 mb-md-5" style="color: #fff; font-size: 1.1rem;">
              Nuestra especialidad son las pizzas napolitanas auténticas, preparadas siguiendo 
              las técnicas tradicionales de Nápoles. Cada mordisco te transporta directamente 
              a las calles de Italia con sabores incomparables.
            </p>
            <p>
              <a href="#" class="btn p-3 px-xl-4 py-xl-3" style="background-color: #ff8c00; border-color: #ff8c00; color: white; font-weight: bold;">Ordenar Ahora</a>
              <a href="#" class="btn btn-outline-light p-3 px-xl-4 py-xl-3" style="border-color: #ff8c00; color: #ff8c00; font-weight: bold;">Ver Menú</a>
            </p>
          </div>
          <div class="col-md-6 ftco-animate">
            <img src="@/assets/images/f5.png" class="img-fluid" alt="Pizza Napolitana" />
          </div>
        </div>
      </div>
    </div>

    <div class="slider-item" style="background: linear-gradient(135deg, #ff8c00, #ff4500);">
      <div class="overlay" style="background: rgba(0, 0, 0, 0.4)"></div>
      <div class="container">
        <div
          class="row slider-text justify-content-center align-items-center"
          data-scrollax-parent="true"
        >
          <div class="col-md-7 col-sm-12 text-center ftco-animate">
            <span class="subheading" style="color: #fff; font-weight: bold; font-size: 1.2rem;">Bienvenidos</span>
            <h1 class="mb-4" style="color: #fff; text-shadow: 2px 2px 4px rgba(0,0,0,0.8);">Creamos la Pizza de Tus Sueños</h1>
            <p class="mb-4 mb-md-5" style="color: #fff; font-size: 1.2rem; text-shadow: 1px 1px 2px rgba(0,0,0,0.7);">
              Somos más que una pizzería, somos una familia que comparte la pasión por la buena comida. 
              Ven y descubre por qué nuestros clientes nos consideran su segundo hogar, donde cada pizza 
              es preparada con amor y los mejores ingredientes.
            </p>
            <p>
              <a href="#" class="btn p-3 px-xl-4 py-xl-3" style="background-color: #fff; border-color: #fff; color: #ff8c00; font-weight: bold; font-size: 1.1rem;">Ordenar Ahora</a>
              <a href="#" class="btn p-3 px-xl-4 py-xl-3" style="background-color: transparent; border: 2px solid #fff; color: #fff; font-weight: bold; font-size: 1.1rem;">Ver Menú</a>
            </p>
          </div>
        </div>
      </div>
    </div>
  </section>
  <section class="ftco-menu"></section>
  <!-- <main>
    <TheWelcome />
  </main> -->
</template>

<style scoped>
.btn:hover {
  transform: translateY(-2px);
  transition: all 0.3s ease;
  box-shadow: 0 4px 8px rgba(0,0,0,0.2);
}

.slider-item {
  position: relative;
}

.subheading {
  text-transform: uppercase;
  letter-spacing: 2px;
  font-size: 0.9rem;
}

.ftco-animate {
  animation: fadeInUp 1s ease-out;
}

@keyframes fadeInUp {
  from {
    opacity: 0;
    transform: translateY(30px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}
</style>