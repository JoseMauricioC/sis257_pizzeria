<script setup lang="ts">
import { ref, onMounted } from 'vue'
import http from '@/plugins/axios'

import Button from 'primevue/button'
import DataTable from 'primevue/datatable'
import Column from 'primevue/column'

import VentaForm from '@/components/venta/VentaForm.vue'
import type { Venta } from '@/models/venta'

const ventas = ref<Venta[]>([])
const mostrarFormulario = ref(false)

async function cargarVentas() {
  try {
    const response = await http.get('/ventas')
    ventas.value = response.data
  } catch (error) {
    console.error('Error al cargar ventas:', error)
  }
}

onMounted(cargarVentas)
</script>
<template>
  <div class="m-6">
    <h1>Listado de Ventas</h1>

    <Button
      label="Registrar nueva venta"
      icon="pi pi-plus"
      @click="mostrarFormulario = true"
      class="mb-4"
    />

    <!-- Mostrar formulario -->
    <VentaForm
      :mostrar="mostrarFormulario"
      @cerrar="mostrarFormulario = false"
      @venta-registrada="cargarVentas"
    />

    <!-- Tabla de ventas -->
    <DataTable :value="ventas" v-if="ventas.length">
      <Column field="id" header="ID" />
      <Column field="fecha" header="Fecha" />
      <Column field="total" header="Total Bs." />
      <Column field="cliente.nombre" header="Cliente" />
      <Column field="usuario.usuario" header="Usuario" />
    </DataTable>
  </div>
</template>
