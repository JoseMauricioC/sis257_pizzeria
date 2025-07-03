<script setup lang="ts">
import { defineProps, computed } from 'vue'
import Dialog from 'primevue/dialog'
import Button from 'primevue/button'

const props = defineProps<{
  mostrar: boolean
  venta: any
}>()

const emit = defineEmits(['close'])

const total = computed(() =>
  props.venta?.detalleVenta?.reduce((acc: number, d: any) => acc + Number(d.subtotal), 0)
)
</script>

<template>
  <Dialog
    v-model:visible="props.mostrar"
    header="Detalle de Venta"
    class="producto-dialog"
    :style="{ width: '38rem' }"
    modal
    :closable="false"
  >
    <template #header>
      <div class="dialog-header-custom">
        <div class="header-icon">
          <i class="pi pi-eye"></i>
        </div>
        <h3 class="header-title">Detalle de Venta</h3>
      </div>
    </template>

    <div v-if="venta" class="dialog-content">
      <div class="info-section">
        <div class="info-row">
          <div class="info-label">
            <i class="pi pi-user"></i> 
            Cliente:
          </div>
          <div class="info-value">{{ venta.cliente?.nombre || '-' }}</div>
        </div>
        <div class="info-row">
          <div class="info-label">
            <i class="pi pi-user-edit"></i> 
            Vendedor:
          </div>
          <div class="info-value">{{ venta.usuario?.usuario || '-' }}</div>
        </div>
        <div class="info-row">
          <div class="info-label">
            <i class="pi pi-calendar"></i> 
            Fecha:
          </div>
          <div class="info-value">{{ venta.fecha }}</div>
        </div>
      </div>

      <div class="detalle-section">
        <h4 class="section-title">
          <i class="pi pi-list"></i>
          Productos Vendidos
        </h4>
        <div class="detalle-table-wrapper">
          <table class="detalle-table">
            <thead>
              <tr>
                <th>Producto</th>
                <th>Cantidad</th>
                <th>Precio Unitario</th>
                <th>Subtotal</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="(item, idx) in venta.detalleVenta" :key="idx" class="table-row">
                <td class="product-name">{{ item.producto?.nombre || '-' }}</td>
                <td class="quantity">{{ item.cantidad }}</td>
                <td class="price">Bs {{ item.precioUnitario }}</td>
                <td class="subtotal">Bs {{ item.subtotal }}</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      <div class="total-section">
        <div class="total-venta">
          <span class="total-label">Total de la Venta:</span>
          <span class="total-monto">Bs {{ total }}</span>
        </div>
      </div>
    </div>

    <template #footer>
      <div class="dialog-footer-custom">
        <Button 
          label="Cerrar" 
          icon="pi pi-times" 
          class="btn-cerrar" 
          @click="emit('close')" 
        />
      </div>
    </template>
  </Dialog>
</template>

<style scoped>
/* Diálogo principal */
.producto-dialog {
  border-radius: 20px !important;
  overflow: hidden !important;
  box-shadow: 0 20px 60px rgba(234, 88, 12, 0.15), 0 0 0 1px rgba(251, 146, 60, 0.1) !important;
  background: linear-gradient(135deg, #fff 0%, #fff7ed 100%) !important;
}

:deep(.producto-dialog .p-dialog-header) {
  background: linear-gradient(135deg, #ea580c 0%, #fb923c 50%, #f97316 100%) !important;
  border: none !important;
  padding: 0 !important;
  border-radius: 0 !important;
}

:deep(.producto-dialog .p-dialog-content) {
  padding: 2rem !important;
  background: linear-gradient(135deg, #fff 0%, #fff7ed 100%) !important;
}

:deep(.producto-dialog .p-dialog-footer) {
  background: linear-gradient(135deg, #fff 0%, #fff7ed 100%) !important;
  border: none !important;
  padding: 1.5rem 2rem !important;
  border-top: 2px solid rgba(251, 146, 60, 0.2) !important;
}

/* Header personalizado */
.dialog-header-custom {
  display: flex;
  align-items: center;
  gap: 1rem;
  padding: 1.5rem 2rem;
  background: linear-gradient(135deg, #ea580c 0%, #fb923c 50%, #f97316 100%);
  color: white;
  width: 100%;
  position: relative;
}

.dialog-header-custom::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: linear-gradient(45deg, transparent 0%, rgba(255, 255, 255, 0.1) 50%, transparent 100%);
  pointer-events: none;
}

.header-icon {
  background: rgba(255, 255, 255, 0.2);
  border: 2px solid rgba(255, 255, 255, 0.3);
  border-radius: 50%;
  width: 55px;
  height: 55px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.5rem;
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.2);
  backdrop-filter: blur(10px);
}

.header-title {
  font-size: 1.5rem;
  font-weight: 700;
  margin: 0;
  text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.3);
  letter-spacing: 0.5px;
}

/* Contenido del diálogo */
.dialog-content {
  display: flex;
  flex-direction: column;
  gap: 2rem;
}

/* Sección de información */
.info-section {
  background: linear-gradient(135deg, #ffedd5 0%, #fed7aa 100%);
  padding: 1.5rem;
  border-radius: 15px;
  border: 2px solid #fb923c;
  box-shadow: 0 4px 15px rgba(251, 146, 60, 0.1);
  position: relative;
  overflow: hidden;
}

.info-section::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  width: 4px;
  height: 100%;
  background: linear-gradient(to bottom, #ea580c, #fb923c);
}

.info-row {
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-size: 1.05rem;
  margin-bottom: 1rem;
  padding: 0.5rem 0;
  border-bottom: 1px solid rgba(251, 146, 60, 0.2);
}

.info-row:last-child {
  margin-bottom: 0;
  border-bottom: none;
}

.info-label {
  font-weight: 700;
  color: #c2410c;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  min-width: 130px;
}

.info-label i {
  font-size: 1.1rem;
  color: #ea580c;
}

.info-value {
  color: #7c2d12;
  font-weight: 600;
  background: rgba(255, 255, 255, 0.7);
  padding: 0.5rem 1rem;
  border-radius: 8px;
  border: 1px solid rgba(251, 146, 60, 0.3);
}

/* Sección de detalles */
.detalle-section {
  background: linear-gradient(135deg, #fff 0%, #ffedd5 100%);
  padding: 1.5rem;
  border-radius: 15px;
  border: 2px solid #fb923c;
  box-shadow: 0 4px 15px rgba(251, 146, 60, 0.1);
}

.section-title {
  font-size: 1.2rem;
  font-weight: 700;
  color: #c2410c;
  margin-bottom: 1rem;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  text-align: center;
  justify-content: center;
  background: linear-gradient(90deg, #ea580c, #fb923c);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}

.section-title i {
  color: #ea580c;
  -webkit-text-fill-color: #ea580c;
}

.detalle-table-wrapper {
  border-radius: 12px;
  overflow: hidden;
  box-shadow: 0 4px 15px rgba(251, 146, 60, 0.15);
  border: 2px solid #fed7aa;
}

.detalle-table {
  width: 100%;
  border-collapse: collapse;
  background: white;
}

.detalle-table th {
  background: linear-gradient(135deg, #ea580c 0%, #fb923c 100%);
  color: white;
  font-weight: 700;
  padding: 1rem 0.8rem;
  text-align: center;
  font-size: 0.95rem;
  text-shadow: 1px 1px 2px rgba(0, 0, 0, 0.2);
  border-bottom: 3px solid #c2410c;
}

.detalle-table td {
  padding: 0.8rem;
  text-align: center;
  font-size: 0.95rem;
  border-bottom: 1px solid #fed7aa;
  color: #7c2d12;
  font-weight: 500;
}

.table-row {
  transition: all 0.3s ease;
}

.table-row:nth-child(even) {
  background-color: #fff7ed;
}

.table-row:hover {
  background: linear-gradient(135deg, #fed7aa 0%, #fb923c 20%);
  color: white;
  transform: scale(1.02);
}

.product-name {
  font-weight: 600;
  color: #c2410c;
}

.table-row:hover .product-name {
  color: white;
}

.quantity {
  font-weight: 700;
  color: #ea580c;
}

.table-row:hover .quantity {
  color: white;
}

.price, .subtotal {
  font-weight: 600;
  color: #7c2d12;
}

.table-row:hover .price,
.table-row:hover .subtotal {
  color: white;
}

/* Sección de total */
.total-section {
  background: linear-gradient(135deg, #ffedd5 0%, #fed7aa 100%);
  padding: 1.5rem;
  border-radius: 15px;
  border: 2px solid #fb923c;
  box-shadow: 0 4px 15px rgba(251, 146, 60, 0.15);
  position: relative;
  overflow: hidden;
}

.total-section::before {
  content: '';
  position: absolute;
  top: 0;
  right: 0;
  width: 4px;
  height: 100%;
  background: linear-gradient(to bottom, #ea580c, #fb923c);
}

.total-venta {
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 1rem;
}

.total-label {
  font-size: 1.3rem;
  font-weight: 700;
  color: #c2410c;
  text-shadow: 1px 1px 2px rgba(0, 0, 0, 0.1);
}

.total-monto {
  font-size: 1.8rem;
  font-weight: 800;
  color: white;
  background: linear-gradient(135deg, #ea580c 0%, #fb923c 100%);
  padding: 0.5rem 1.5rem;
  border-radius: 25px;
  box-shadow: 0 4px 15px rgba(234, 88, 12, 0.3);
  text-shadow: 1px 1px 2px rgba(0, 0, 0, 0.2);
}

/* Footer y botón */
.dialog-footer-custom {
  display: flex;
  justify-content: center;
  gap: 1rem;
  align-items: center;
}

.btn-cerrar {
  background: linear-gradient(135deg, #ea580c 0%, #fb923c 100%) !important;
  border: 2px solid #c2410c !important;
  color: white !important;
  padding: 0.8rem 2rem !important;
  border-radius: 25px !important;
  font-weight: 700 !important;
  transition: all 0.3s ease !important;
  font-size: 1rem !important;
  text-shadow: 1px 1px 2px rgba(0, 0, 0, 0.2) !important;
  box-shadow: 0 4px 15px rgba(234, 88, 12, 0.3) !important;
}

.btn-cerrar:hover {
  background: linear-gradient(135deg, #c2410c 0%, #ea580c 100%) !important;
  border-color: #7c2d12 !important;
  transform: translateY(-3px) !important;
  box-shadow: 0 8px 25px rgba(234, 88, 12, 0.4) !important;
}

.btn-cerrar:active {
  transform: translateY(-1px) !important;
}

/* Responsive */
@media (max-width: 768px) {
  :deep(.producto-dialog) {
    width: 95vw !important;
    max-width: 95vw !important;
    margin: 1rem !important;
  }

  .dialog-header-custom {
    padding: 1rem 1.5rem !important;
    flex-direction: column !important;
    text-align: center !important;
    gap: 0.5rem !important;
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
    padding: 1rem !important;
  }

  :deep(.producto-dialog .p-dialog-footer) {
    padding: 1rem !important;
  }

  .info-row {
    flex-direction: column !important;
    align-items: flex-start !important;
    gap: 0.5rem !important;
  }

  .info-value {
    align-self: stretch !important;
    text-align: center !important;
  }

  .total-venta {
    flex-direction: column !important;
    gap: 0.8rem !important;
    text-align: center !important;
  }

  .total-label {
    font-size: 1.1rem !important;
  }

  .total-monto {
    font-size: 1.5rem !important;
  }

  .detalle-table th,
  .detalle-table td {
    font-size: 0.8rem !important;
    padding: 0.5rem 0.3rem !important;
  }

  .btn-cerrar {
    width: 100% !important;
    justify-content: center !important;
  }
}

@media (max-width: 480px) {
  .detalle-table th,
  .detalle-table td {
    font-size: 0.7rem !important;
    padding: 0.4rem 0.2rem !important;
  }

  .section-title {
    font-size: 1rem !important;
  }

  .info-label {
    font-size: 0.9rem !important;
  }

  .info-value {
    font-size: 0.9rem !important;
  }
}
</style>