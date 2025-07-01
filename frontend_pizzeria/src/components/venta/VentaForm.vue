<script setup lang="ts">
import { ref, onMounted, watch, computed } from 'vue'
import Dialog from 'primevue/dialog'
import Dropdown from 'primevue/dropdown'
import InputNumber from 'primevue/inputnumber'
import Button from 'primevue/button'
import http from '@/plugins/axios'
import type { Producto } from '@/models/producto'
import type { Cliente } from '@/models/cliente'
import type { Usuario } from '@/models/usuario'

const props = defineProps<{ mostrar: boolean }>()
const emit = defineEmits(['close', 'ventaGuardada'])

const visible = ref(false)
const usuarios = ref<Usuario[]>([])
const clientes = ref<Cliente[]>([])
const productos = ref<Producto[]>([])
const idUsuario = ref<number>()
const idCliente = ref<number>()
const productoSeleccionado = ref<Producto | null>(null)
const cantidad = ref(1)
//const detalle = ref([])
const detalle = ref<
  { producto: Producto; cantidad: number; precioUnitario: number; subtotal: number }[]
>([])

const agregarProducto = () => {
  if (!productoSeleccionado.value) {
    alert('Debe seleccionar un producto')
    return
  }

  //const yaExiste = detalle.value.find((item) => item.producto.id === productoSeleccionado.value.id)
  const yaExiste = productoSeleccionado.value
    ? detalle.value.find((item) => item.producto.id === productoSeleccionado.value!.id)
    : null
  if (yaExiste) {
    alert('Este producto ya fue agregado')
    return
  }

  const nuevoDetalle = {
    producto: productoSeleccionado.value,
    cantidad: cantidad.value,
    precioUnitario: productoSeleccionado.value.precio,
    subtotal: cantidad.value * productoSeleccionado.value.precio,
  }

  detalle.value.push(nuevoDetalle)
}

//const total = ref(0)
const total = computed(() => detalle.value.reduce((acc, item) => acc + item.subtotal, 0))

watch(
  () => props.mostrar,
  (nuevo) => {
    visible.value = nuevo
    if (nuevo) {
      cargarDatos()
    }
  },
)

function cargarDatos() {
  http.get('/usuarios').then((r) => (usuarios.value = r.data))
  http.get('/clientes').then((r) => (clientes.value = r.data))
  http.get('/productos').then((r) => (productos.value = r.data))
  limpiarFormulario()
}

function limpiarFormulario() {
  idUsuario.value = undefined
  idCliente.value = undefined
  productoSeleccionado.value = null
  cantidad.value = 1
  detalle.value = []
  //total.value = 0
}

const dialogVisible = computed({
  get: () => props.mostrar,
  set: (val) => {
    if (!val) emit('close')
  },
})

// async function registrarVenta() {
//   if (!idUsuario.value || !idCliente.value || detalle.value.length === 0) {
//     alert('Debe completar todos los campos y agregar al menos un producto')
//     return
//   }

//   const venta = {
//     idUsuario: idUsuario.value,
//     idCliente: idCliente.value,
//     //fecha: new Date(),
//     fecha: new Date().toLocaleDateString(),
//     total: total.value,
//     detalleVenta: detalle.value.map((d) => ({
//       idProducto: d.producto.id,
//       cantidad: d.cantidad,
//       precioUnitario: d.precioUnitario,
//       subtotal: d.subtotal,
//     })),
//   }

//   console.log('Datos a enviar:', venta)

//   try {
//     await http.post('/ventas', venta)
//     //const respuesta = await http.post('/ventas', venta)
//     //console.log('Respuesta del servidor:', respuesta)
//     emit('ventaGuardada')
//     emit('close')
//     limpiarFormulario()
//   } catch (error) {
//     console.error('Error al registrar venta:', error)
//     alert('Ocurrió un error al registrar la venta')
//   }
async function registrarVenta() {
  if (!idUsuario.value || !idCliente.value || detalle.value.length === 0) {
    alert('Debe completar todos los campos y agregar al menos un producto')
    return
  }

  const venta = {
    idUsuario: idUsuario.value,
    idCliente: idCliente.value,
    fecha: new Date(),
    total: total.value,
    detalleVenta: detalle.value.map((d) => ({
      idProducto: d.producto.id,
      cantidad: d.cantidad,
      precioUnitario: d.precioUnitario,
      subtotal: d.subtotal,
    })),
  }

  console.log('Datos a enviar:', venta) // Agrega esto

  try {
    const respuesta = await http.post('/ventas', venta)
    console.log('Respuesta exitosa:', respuesta) // Agrega esto
    emit('ventaGuardada')
    emit('close')
    limpiarFormulario()
  } catch (error) {
    console.error('Error completo:', error) // Ya lo tienes
    //console.error('Respuesta del servidor:', error.response?.data) // Agrega esto
    //console.error('Status:', error.response?.status) // Agrega esto
    alert('Ocurrió un error al registrar la venta')
  }
}
</script>

<template>
  <Dialog
    v-model:visible="visible"
    modal
    header="Registrar Nueva Venta"
    style="width: 55vw"
    @hide="emit('close')"
  >
    <div class="container">
      <div class="flex items-center gap-4 mb-4">
        <label>ID de Usuario:</label>
        <Dropdown
          v-model="idUsuario"
          :options="usuarios"
          optionLabel="usuario"
          optionValue="id"
          placeholder="Seleccionar usuario"
        />
      </div>
      <div class="flex items-center gap-4 mb-4">
        <label>ID de Cliente:</label>
        <Dropdown
          v-model="idCliente"
          :options="clientes"
          optionLabel="nombre"
          optionValue="id"
          placeholder="Seleccionar cliente"
        />
      </div>

      <h3 class="font-bold text-lg mt-4">Detalle de Venta</h3>

      <div class="flex gap-2 items-end">
        <div class="flex items-center gap-4 mb-4">
          <label>Producto:</label>
          <Dropdown
            v-model="productoSeleccionado"
            :options="productos"
            optionLabel="nombre"
            placeholder="Seleccionar producto"
            class="w-full"
          />
        </div>
        <div class="flex items-center gap-4 mb-4">
          <label>Cantidad:</label>
          <InputNumber v-model="cantidad" :min="1" />
        </div>

        <div class="flex items-center gap-4 mb-4">
          <Button label="Agregar Producto" @click="agregarProducto" />
        </div>
      </div>

      <table border="1" style="border-collapse: collapse; text-align: center">
        <thead>
          <tr>
            <th>Producto</th>
            <th>Cantidad</th>
            <th>Precio Unitario</th>
            <th>Subtotal</th>
            <th>Acción</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(item, index) in detalle" :key="index">
            <td>{{ item.producto.nombre }}</td>
            <td>{{ item.cantidad }}</td>
            <td>{{ item.precioUnitario }}</td>
            <td>{{ item.subtotal.toFixed(2) }}</td>
            <td>
              <button @click="detalle.splice(index, 1)">Eliminar</button>
            </td>
          </tr>
        </tbody>
      </table>
      <div class="flex items-center gap-4 mb-4">Total: {{ total.toFixed(2) }}</div>
      <div class="flex items-center gap-4 mb-4">
        <Button
          type="button"
          label="Cancelar Venta"
          icon="pi pi-times"
          severity="secondary"
          @click="dialogVisible = false"
        ></Button>
        <Button type="button" label="Registrar Venta" @click="registrarVenta"></Button>
      </div>
    </div>
  </Dialog>
</template>

<style scoped>
.container {
  display: flex;
  flex-direction: column;
}
</style>
