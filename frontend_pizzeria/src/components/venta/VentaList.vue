<template>
  <div>
    <h3>Lista de Ventas</h3>

    <div v-for="venta in ventas" :key="venta.id" class="venta-box">
      <h4>Venta #{{ venta.id }} - {{ formatFecha(venta.fecha) }}</h4>
      <p><strong>Cliente:</strong> {{ venta.cliente?.nombre }} {{ venta.cliente?.apellido }}</p>
      <p><strong>Vendedor:</strong> {{ venta.usuario?.usuario }}</p>
      <p><strong>Total:</strong> Bs {{ venta.total.toFixed(2) }}</p>

      <table>
        <thead>
          <tr>
            <th>Producto</th>
            <th>Cantidad</th>
            <th>Precio Unitario</th>
            <th>Subtotal</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="d in venta.detalles" :key="d.id">
            <td>{{ d.producto?.nombre }}</td>
            <td>{{ d.cantidad }}</td>
            <td>Bs {{ d.precio_unitario.toFixed(2) }}</td>
            <td>Bs {{ d.subtotal.toFixed(2) }}</td>
          </tr>
        </tbody>
      </table>

      <hr />
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import axios from '@/plugins/axios'

const ventas = ref([])

async function cargarVentas() {
  const res = await axios.get('/ventas')
  ventas.value = res.data
}

function formatFecha(fecha: string) {
  return new Date(fecha).toLocaleString()
}

onMounted(cargarVentas)
</script>

<style scoped>
.venta-box {
  border: 1px solid #ccc;
  padding: 1rem;
  margin-bottom: 1rem;
  border-radius: 10px;
  background-color: #f9f9f9;
}

table {
  width: 100%;
  border-collapse: collapse;
  margin-top: 0.5rem;
}

th,
td {
  border: 1px solid #ddd;
  padding: 0.5rem;
  text-align: left;
}

thead {
  background-color: #eee;
}
</style>
