<script setup lang="ts">
import { ref, onMounted } from 'vue'
import Button from 'primevue/button'
import http from '@/plugins/axios'
import VentaForm from '@/components/venta/VentaForm.vue'

const ventas = ref([])
const mostrarFormulario = ref(false)

function abrirFormulario() {
  mostrarFormulario.value = true
}

function cerrarFormulario() {
  mostrarFormulario.value = false
}

async function cargarVentas() {
  ventas.value = await http.get('/ventas').then((res) => res.data)
}

function cuandoSeRegistraVenta() {
  cerrarFormulario()
  cargarVentas()
}

onMounted(cargarVentas)
</script>

<template>
  <div class="m-8">
    <div>
      <h1>Ventas</h1>
      <Button label="Registrar Nueva Venta" icon="pi pi-plus" @click="abrirFormulario" />
    </div>

    <table style="border-collapse: collapse; text-align: center" border="1">
      <thead>
        <tr>
          <th>Nro.</th>
          <th>Usuario</th>
          <th>Cliente</th>
          <th>Fecha</th>
          <th>Total</th>
          <th>Acciones</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(venta, index) in ventas" :key="venta.id">
          <td>{{ index + 1 }}</td>
          <td>{{ venta.usuario.usuario }}</td>
          <td>{{ venta.cliente.nombre + ' ' + venta.cliente.apellido }}</td>
          <td>{{ venta.fecha }}</td>
          <td>{{ venta.total }}</td>
          <td>
            <Button label="Detalles" text severity="info" />
            <Button label="Reporte" text severity="danger" />
          </td>
        </tr>
      </tbody>
    </table>

    <!-- Formulario como diálogo -->
    <VentaForm
      :mostrar="mostrarFormulario"
      @close="cerrarFormulario"
      @ventaGuardada="cuandoSeRegistraVenta"
    />
  </div>
</template>


