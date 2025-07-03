<script setup lang="ts">
import { ref, computed, watch } from 'vue'
import Dialog from 'primevue/dialog'
import Dropdown from 'primevue/dropdown'
import InputNumber from 'primevue/inputnumber'
import Button from 'primevue/button'
import http from '@/plugins/axios'
import type { Producto } from '@/models/producto'
import type { Cliente } from '@/models/cliente'
import type { Usuario } from '@/models/usuario'

const props = defineProps<{ mostrar: boolean }>()
const emit = defineEmits(['cerrar', 'ventaGuardada'])

const usuarios = ref<Usuario[]>([])
const clientes = ref<Cliente[]>([])
const productos = ref<Producto[]>([])

const idUsuario = ref<number>()
const idCliente = ref<number>()
const productoSeleccionado = ref<Producto | null>(null)
const cantidad = ref(1)

const detalle = ref<
  { producto: Producto; cantidad: number; precioUnitario: number; subtotal: number }[]
>([])

const total = computed(() => detalle.value.reduce((acc, item) => acc + item.subtotal, 0))

const dialogVisible = computed({
  get: () => props.mostrar,
  set: (val) => {
    if (!val) emit('cerrar')
  },
})

watch(
  () => props.mostrar,
  (nuevo) => {
    if (nuevo) {
      cargarDatos()
    }
  },
)

function cargarDatos() {
  Promise.all([http.get('/usuarios'), http.get('/clientes'), http.get('/productos')]).then(
    ([u, c, p]) => {
      usuarios.value = u.data
      clientes.value = c.data
      productos.value = p.data
    },
  )
  limpiarFormulario()
}

function limpiarFormulario() {
  idUsuario.value = undefined
  idCliente.value = undefined
  productoSeleccionado.value = null
  cantidad.value = 1
  detalle.value = []
}

const agregarProducto = () => {
  if (!productoSeleccionado.value) {
    alert('Debe seleccionar un producto')
    return
  }

  const yaExiste = detalle.value.find((item) => item.producto.id === productoSeleccionado.value!.id)
  if (yaExiste) {
    alert('Este producto ya fue agregado')
    return
  }

  detalle.value.push({
    producto: productoSeleccionado.value,
    cantidad: cantidad.value,
    precioUnitario: Number(productoSeleccionado.value.precio),
    subtotal: cantidad.value * Number(productoSeleccionado.value.precio),
  })

  productoSeleccionado.value = null
  cantidad.value = 1
}

async function registrarVenta() {
  if (!idUsuario.value || !idCliente.value || detalle.value.length === 0) {
    alert('Debe completar todos los campos y agregar al menos un producto')
    return
  }

  const venta = {
    idUsuario: idUsuario.value,
    idCliente: idCliente.value,
    fecha: new Date().toISOString(),
    total: total.value,
    detalleVenta: detalle.value.map((d) => ({
      idProducto: d.producto.id,
      cantidad: d.cantidad,
      precioUnitario: d.precioUnitario,
      subtotal: d.subtotal,
    })),
  }

  try {
    await http.post('/ventas', venta)
    emit('ventaGuardada')
    emit('cerrar')
    limpiarFormulario()
  } catch (error: any) {
    alert(error?.response?.data?.message || 'Ocurrió un error al registrar la venta')
  }
}
</script>

<template>
  <div class="dialog-container">
    <Dialog
      v-model:visible="dialogVisible"
      header="Registrar Nueva Venta"
      class="producto-dialog"
      :style="{ width: '40rem' }"
      modal
      :closable="false"
    >
      <template #header>
        <div class="dialog-header-custom">
          <div class="header-icon">
            <i class="pi pi-shopping-cart"></i>
          </div>
          <h3 class="header-title">Registrar Nueva Venta</h3>
        </div>
      </template>

      <div class="dialog-content">

        <div class="field-container">
          <label class="field-label">
            <i class="pi pi-user field-icon"></i>
            Usuario
          </label>
          <div class="input-wrapper">
            <Dropdown
              v-model="idUsuario"
              :options="usuarios"
              optionLabel="usuario"
              optionValue="id"
              class="styled-input"
              placeholder="Seleccionar usuario"
            />
          </div>
        </div>

        <div class="field-container">
          <label class="field-label">
            <i class="pi pi-users field-icon"></i>
            Cliente
          </label>
          <div class="input-wrapper">
            <Dropdown
              v-model="idCliente"
              :options="clientes"
              optionLabel="nombre"
              optionValue="id"
              class="styled-input"
              placeholder="Seleccionar cliente"
            />
          </div>
        </div>

        <div class="field-container">
          <label class="field-label">
            <i class="pi pi-list field-icon"></i>
            Detalle de Venta
          </label>
          <div class="input-wrapper">
            <div class="detalle-producto-row">
              <Dropdown
                v-model="productoSeleccionado"
                :options="productos"
                optionLabel="nombre"
                placeholder="Seleccionar producto"
                class="styled-input"
              />
              <InputNumber
                v-model="cantidad"
                :min="1"
                class="styled-input-number cantidad-input"
                placeholder="Cantidad"
                showButtons
              />
              <Button
                label="Agregar"
                icon="pi pi-plus"
                class="btn-agregar"
                @click="agregarProducto"
              />
            </div>
          </div>
        </div>

        <div class="detalle-table-wrapper">
          <table class="detalle-table">
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
                <td>Bs {{ item.precioUnitario }}</td>
                <td>Bs {{ item.subtotal.toFixed(2) }}</td>
                <td>
                  <Button
                    icon="pi pi-trash"
                    class="btn-eliminar"
                    @click="detalle.splice(index, 1)"
                    severity="danger"
                    rounded
                  />
                </td>
              </tr>
              <tr v-if="detalle.length === 0">
                <td colspan="5" class="no-productos">No hay productos agregados</td>
              </tr>
            </tbody>
          </table>
        </div>

        <div class="total-venta">
          <span>Total:</span>
          <span class="total-monto">Bs {{ total.toFixed(2) }}</span>
        </div>
      </div>

      <template #footer>
        <div class="dialog-footer-custom">
          <Button
            type="button"
            label="Cancelar"
            icon="pi pi-times"
            class="btn-cancelar"
            @click="emit('cerrar')"
          />
          <Button
            type="button"
            label="Registrar Venta"
            icon="pi pi-save"
            class="btn-guardar"
            @click="registrarVenta"
          />
        </div>
      </template>
    </Dialog>
  </div>
</template>

<style scoped>
.dialog-container {
  position: relative;
}

/* Dialog Principal con Tonos Naranjas */
:deep(.producto-dialog) {
  border-radius: 25px !important;
  overflow: hidden !important;
  box-shadow:
    0 25px 80px rgba(255, 140, 0, 0.25),
    0 0 0 1px rgba(255, 165, 0, 0.15) !important;
  background: linear-gradient(135deg, #fff8f0 0%, #fef5e7 100%) !important;
}

:deep(.producto-dialog .p-dialog-header) {
  background: linear-gradient(135deg, #ff8c00 0%, #ff7f00 25%, #ff6347 50%, #ff4500 75%, #e85d00 100%) !important;
  border: none !important;
  padding: 0 !important;
  border-radius: 0 !important;
}

:deep(.producto-dialog .p-dialog-content) {
  padding: 2rem !important;
  background: linear-gradient(135deg, #fff8f0 0%, #fef5e7 100%) !important;
}

:deep(.producto-dialog .p-dialog-footer) {
  background: linear-gradient(135deg, #fff8f0 0%, #fef5e7 100%) !important;
  border: none !important;
  padding: 1.5rem 2rem !important;
  border-top: 1px solid rgba(255, 140, 0, 0.2) !important;
}

/* Header Personalizado */
.dialog-header-custom {
  display: flex;
  align-items: center;
  gap: 1rem;
  padding: 1.5rem 2rem;
  background: linear-gradient(135deg, #ff8c00 0%, #ff7f00 25%, #ff6347 50%, #ff4500 75%, #e85d00 100%);
  color: white;
  width: 100%;
}

.header-icon {
  background: rgba(255, 255, 255, 0.25);
  border: 2px solid rgba(255, 255, 255, 0.3);
  border-radius: 50%;
  width: 55px;
  height: 55px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.6rem;
  box-shadow: 
    0 4px 15px rgba(0, 0, 0, 0.2),
    inset 0 1px 0 rgba(255, 255, 255, 0.3);
}

.header-title {
  font-size: 1.5rem;
  font-weight: 700;
  margin: 0;
  text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.3);
}

/* Contenido del Diálogo */
.dialog-content {
  display: flex;
  flex-direction: column;
  gap: 1.8rem;
}

.field-container {
  display: flex;
  flex-direction: column;
  gap: 0.7rem;
}

.field-label {
  display: flex;
  align-items: center;
  gap: 0.7rem;
  font-weight: 700;
  color: #d2691e;
  font-size: 1rem;
  margin-bottom: 0.5rem;
}

.field-icon {
  color: #ff6347;
  font-size: 1.2rem;
  text-shadow: 1px 1px 2px rgba(255, 99, 71, 0.3);
}

.input-wrapper {
  position: relative;
}

/* Inputs con Estilo Naranja */
:deep(.styled-input) {
  width: 100% !important;
  padding: 1.2rem 1.5rem !important;
  border: 2px solid #ffd4a3 !important;
  border-radius: 15px !important;
  font-size: 1rem !important;
  transition: all 0.3s ease !important;
  background: linear-gradient(145deg, #fff8f0, #fef5e7) !important;
  box-shadow: 0 3px 12px rgba(255, 140, 0, 0.1) !important;
  color: #8b4513 !important;
}

:deep(.styled-input:focus) {
  border-color: #ff8c00 !important;
  box-shadow:
    0 0 0 3px rgba(255, 140, 0, 0.15),
    0 5px 20px rgba(255, 140, 0, 0.2) !important;
  outline: none !important;
  background: linear-gradient(145deg, #fff, #fff8f0) !important;
}

:deep(.styled-input:hover) {
  border-color: #ffa500 !important;
  box-shadow: 0 4px 15px rgba(255, 165, 0, 0.15) !important;
}

/* Dropdown específico */
:deep(.styled-input .p-dropdown-label) {
  color: #8b4513 !important;
  font-weight: 500 !important;
}

:deep(.styled-input .p-dropdown-trigger) {
  color: #ff8c00 !important;
}

/* Input Number */
:deep(.styled-input-number) {
  width: 100% !important;
}

:deep(.styled-input-number .p-inputnumber-input) {
  width: 100% !important;
  padding: 1.2rem 1.5rem !important;
  border: 2px solid #ffd4a3 !important;
  border-radius: 15px !important;
  font-size: 1rem !important;
  transition: all 0.3s ease !important;
  background: linear-gradient(145deg, #fff8f0, #fef5e7) !important;
  box-shadow: 0 3px 12px rgba(255, 140, 0, 0.1) !important;
  color: #8b4513 !important;
  font-weight: 500 !important;
}

:deep(.styled-input-number .p-inputnumber-input:focus) {
  border-color: #ff8c00 !important;
  box-shadow:
    0 0 0 3px rgba(255, 140, 0, 0.15),
    0 5px 20px rgba(255, 140, 0, 0.2) !important;
  outline: none !important;
  background: linear-gradient(145deg, #fff, #fff8f0) !important;
}

:deep(.styled-input-number .p-inputnumber-input:hover) {
  border-color: #ffa500 !important;
  box-shadow: 0 4px 15px rgba(255, 165, 0, 0.15) !important;
}

:deep(.styled-input-number .p-inputnumber-button) {
  background: linear-gradient(45deg, #ff8c00, #ff7f00) !important;
  border: none !important;
  color: white !important;
  width: 45px !important;
  transition: all 0.3s ease !important;
  box-shadow: 0 2px 8px rgba(255, 140, 0, 0.3) !important;
}

:deep(.styled-input-number .p-inputnumber-button:hover) {
  background: linear-gradient(45deg, #ff7f00, #ff6347) !important;
  transform: scale(1.05) !important;
  box-shadow: 0 4px 12px rgba(255, 140, 0, 0.4) !important;
}

:deep(.styled-input-number .p-inputnumber-button-up) {
  border-radius: 0 15px 0 0 !important;
}

:deep(.styled-input-number .p-inputnumber-button-down) {
  border-radius: 0 0 15px 0 !important;
}

/* Fila de Detalle de Producto */
.detalle-producto-row {
  display: flex;
  gap: 1.2rem;
  align-items: center;
}

.cantidad-input {
  max-width: 130px;
}

.btn-agregar {
  background: linear-gradient(45deg, #ff8c00, #ff7f00) !important;
  border: none !important;
  color: white !important;
  font-weight: 700 !important;
  border-radius: 15px !important;
  padding: 0.8rem 1.8rem !important;
  font-size: 1rem !important;
  box-shadow: 0 5px 15px rgba(255, 140, 0, 0.3) !important;
  transition: all 0.3s ease !important;
  text-shadow: 1px 1px 2px rgba(0, 0, 0, 0.2) !important;
}

.btn-agregar:hover {
  background: linear-gradient(45deg, #ff7f00, #ff6347) !important;
  transform: translateY(-3px) !important;
  box-shadow: 0 8px 20px rgba(255, 140, 0, 0.4) !important;
}

/* Tabla de Detalle */
.detalle-table-wrapper {
  margin-top: 1.5rem;
  border-radius: 18px;
  overflow: hidden;
  box-shadow: 0 4px 20px rgba(255, 140, 0, 0.12);
  border: 1px solid #ffd4a3;
}

.detalle-table {
  width: 100%;
  border-collapse: collapse;
  background: linear-gradient(145deg, #fff8f0, #fef5e7);
}

.detalle-table th,
.detalle-table td {
  padding: 1rem 0.8rem;
  text-align: center;
  font-size: 1rem;
}

.detalle-table th {
  background: linear-gradient(90deg, #ff8c00 0%, #ff7f00 50%, #ff6347 100%);
  color: white;
  font-weight: 700;
  border-bottom: 3px solid #ff4500;
  text-shadow: 1px 1px 2px rgba(0, 0, 0, 0.3);
}

.detalle-table td {
  border-bottom: 1px solid #ffd4a3;
  color: #8b4513;
  font-weight: 500;
}

.detalle-table tbody tr:hover {
  background: linear-gradient(145deg, #fff, #fff8f0);
}

.no-productos {
  color: #ff6347;
  font-style: italic;
  font-size: 1.1rem;
  padding: 2rem 0;
  font-weight: 600;
}

.btn-eliminar {
  background: linear-gradient(45deg, #ff4500, #dc143c) !important;
  border: none !important;
  color: white !important;
  width: 42px !important;
  height: 42px !important;
  border-radius: 15px !important;
  box-shadow: 0 4px 12px rgba(255, 69, 0, 0.3) !important;
  transition: all 0.3s ease !important;
}

.btn-eliminar:hover {
  transform: translateY(-2px) !important;
  box-shadow: 0 6px 18px rgba(255, 69, 0, 0.4) !important;
  background: linear-gradient(45deg, #dc143c, #b22222) !important;
}

/* Total de Venta */
.total-venta {
  display: flex;
  justify-content: flex-end;
  align-items: center;
  gap: 1.5rem;
  font-size: 1.3rem;
  font-weight: 700;
  margin-top: 2rem;
  padding: 1rem 1.5rem;
  background: linear-gradient(135deg, #fff8f0, #fef5e7);
  border-radius: 15px;
  border: 2px solid #ffd4a3;
  color: #d2691e;
}

.total-monto {
  font-size: 1.8rem;
  color: #ff4500;
  text-shadow: 1px 1px 2px rgba(255, 69, 0, 0.3);
}

/* Footer del Diálogo */
.dialog-footer-custom {
  display: flex;
  justify-content: flex-end;
  gap: 1.2rem;
  align-items: center;
}

.btn-cancelar {
  background: linear-gradient(145deg, #fff8f0, #fef5e7) !important;
  border: 2px solid #ffd4a3 !important;
  color: #d2691e !important;
  padding: 0.9rem 2rem !important;
  border-radius: 25px !important;
  font-weight: 600 !important;
  transition: all 0.3s ease !important;
  font-size: 1rem !important;
  box-shadow: 0 3px 10px rgba(255, 140, 0, 0.1) !important;
}

.btn-cancelar:hover {
  border-color: #ff8c00 !important;
  color: #ff6347 !important;
  background: linear-gradient(145deg, #fff, #fff8f0) !important;
  transform: translateY(-2px) !important;
  box-shadow: 0 5px 15px rgba(255, 140, 0, 0.15) !important;
}

.btn-guardar {
  background: linear-gradient(45deg, #ff8c00, #ff7f00) !important;
  border: none !important;
  color: white !important;
  padding: 0.9rem 2.5rem !important;
  border-radius: 25px !important;
  font-weight: 700 !important;
  font-size: 1rem !important;
  box-shadow: 0 6px 20px rgba(255, 140, 0, 0.35) !important;
  transition: all 0.3s ease !important;
  position: relative;
  overflow: hidden;
  text-shadow: 1px 1px 2px rgba(0, 0, 0, 0.2) !important;
}

.btn-guardar:hover {
  background: linear-gradient(45deg, #ff7f00, #ff6347) !important;
  transform: translateY(-3px) !important;
  box-shadow: 0 8px 25px rgba(255, 140, 0, 0.45) !important;
}

.btn-guardar:active {
  transform: translateY(-1px) !important;
}

.btn-guardar::before {
  content: '';
  position: absolute;
  top: 0;
  left: -100%;
  width: 100%;
  height: 100%;
  background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.3), transparent);
  transition: left 0.6s ease;
}

.btn-guardar:hover::before {
  left: 100%;
}

/* Responsive Design */
@media (max-width: 768px) {
  :deep(.producto-dialog) {
    width: 98vw !important;
    max-width: 98vw !important;
  }
  
  .dialog-header-custom {
    padding: 1.2rem 1.5rem !important;
  }
  
  .header-icon {
    width: 45px !important;
    height: 45px !important;
    font-size: 1.3rem !important;
  }
  
  .header-title {
    font-size: 1.3rem !important;
  }
  
  :deep(.producto-dialog .p-dialog-content) {
    padding: 1.5rem !important;
  }
  
  :deep(.producto-dialog .p-dialog-footer) {
    padding: 1.2rem 1.5rem !important;
  }
  
  .dialog-footer-custom {
    flex-direction: column !important;
    gap: 0.8rem !important;
  }
  
  .btn-cancelar, .btn-guardar {
    width: 100% !important;
    justify-content: center !important;
  }
  
  .detalle-producto-row {
    flex-direction: column;
    gap: 0.8rem;
  }
  
  .detalle-table th, .detalle-table td {
    font-size: 0.9rem;
    padding: 0.8rem 0.4rem;
  }
  
  .total-venta {
    font-size: 1.1rem;
    flex-direction: column;
    gap: 0.5rem;
  }
  
  .total-monto {
    font-size: 1.5rem;
  }
}

/* Override para elementos específicos con tema naranja */
:deep(.p-dropdown-panel .p-dropdown-items .p-dropdown-item) {
  color: #8b4513 !important;
  transition: all 0.2s ease !important;
}

:deep(.p-dropdown-panel .p-dropdown-items .p-dropdown-item:hover) {
  background: linear-gradient(145deg, #fff8f0, #ffd4a3) !important;
  color: #d2691e !important;
}

:deep(.p-dropdown-panel .p-dropdown-items .p-dropdown-item.p-highlight) {
  background: linear-gradient(145deg, #ff8c00, #ff7f00) !important;
  color: white !important;
}

:deep(.p-dropdown-panel) {
  border: 2px solid #ffd4a3 !important;
  border-radius: 12px !important;
  box-shadow: 0 5px 20px rgba(255, 140, 0, 0.2) !important;
  background: linear-gradient(145deg, #fff8f0, #fef5e7) !important;
}
</style>