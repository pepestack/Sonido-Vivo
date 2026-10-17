import { useEffect, useState } from 'react'
import { Card, Form } from 'react-bootstrap'
import { Boton } from '../../atoms/Boton/Boton'
import { Imagen } from '../../atoms/Imagen/Imagen'
import { Titulo } from '../../atoms/Titulo/Titulo'
import { CampoFormulario } from '../../molecules/CampoFormulario/CampoFormulario'
import { useFormulario } from '../../../hooks/useFormulario'
import {
  sinErrores,
  validarLargoMaximo,
  validarObligatorio,
  validarPrecio,
  validarSku,
  validarStock,
  validarStockCritico,
} from '../../../utils/validaciones'

const productoVacio = {
  id: '',
  nombre: '',
  marca: '',
  modelo: '',
  descripcion: '',
  precio: '',
  stock: '',
  stockCritico: '',
  categoria: '',
  imagen: null,
  galeria: [],
}

// Formulario compartido para crear y editar productos.
// skuEnUso(sku): indica si el SKU ya pertenece a otro producto
// onEnviar(producto): recibe el producto validado y con los números convertidos
export function FormularioProducto(props) {
  const formulario = useFormulario(props.valoresIniciales ?? productoVacio)
  const valores = formulario.valores
  const errores = formulario.errores

  // vista previa del archivo elegido; solo vive mientras se edita, no se guarda
  const [vistaPrevia, setVistaPrevia] = useState(null)

  useEffect(() => {
    return () => {
      if (vistaPrevia) URL.revokeObjectURL(vistaPrevia)
    }
  }, [vistaPrevia])

  // Simula una subida: el producto guarda solo la ruta, y el archivo debe
  // estar en public/images/productos para que se vea en la tienda
  function manejarImagen(evento) {
    const archivo = evento.target.files[0]
    if (!archivo) return
    setVistaPrevia(URL.createObjectURL(archivo))
    formulario.setValores((actuales) => ({ ...actuales, imagen: `/images/productos/${archivo.name}` }))
  }

  function manejarEnvio(evento) {
    evento.preventDefault()
    const nuevos = {
      id: validarSku(valores.id, props.skuEnUso),
      nombre: validarObligatorio(valores.nombre, 'El nombre es requerido') || validarLargoMaximo(valores.nombre, 100),
      descripcion: validarLargoMaximo(valores.descripcion, 500),
      precio: validarPrecio(valores.precio),
      stock: validarStock(valores.stock),
      stockCritico: validarStockCritico(valores.stockCritico, valores.stock),
      categoria: validarObligatorio(valores.categoria, 'Selecciona una categoría'),
    }
    formulario.setErrores(nuevos)
    if (!sinErrores(nuevos)) return

    props.onEnviar({
      ...valores,
      id: valores.id.trim(),
      nombre: valores.nombre.trim(),
      precio: Number(valores.precio),
      stock: Number(valores.stock),
      stockCritico: valores.stockCritico === '' ? 0 : Number(valores.stockCritico),
    })
  }

  return (
    <Card className="shadow-sm border-0">
      <Card.Body className="p-4 p-md-5">
        <Titulo nivel={2} className="h3 fw-bold mb-4 text-primary">
          {props.titulo}
        </Titulo>
        <Form noValidate onSubmit={manejarEnvio}>
          <CampoFormulario
            id="id"
            etiqueta="Código de producto (SKU)"
            placeholder="Formato: AB000"
            requerido
            valor={valores.id}
            onChange={formulario.manejarCambio}
            error={errores.id}
          />
          <CampoFormulario
            id="nombre"
            etiqueta="Nombre de Producto"
            placeholder="Ej: Micrófono tipo"
            requerido
            valor={valores.nombre}
            onChange={formulario.manejarCambio}
            error={errores.nombre}
          />
          <CampoFormulario
            id="marca"
            etiqueta="Marca"
            placeholder="Ej: Squier"
            valor={valores.marca}
            onChange={formulario.manejarCambio}
          />
          <CampoFormulario
            id="modelo"
            etiqueta="Modelo"
            placeholder="Ej: Affinity PJ"
            valor={valores.modelo}
            onChange={formulario.manejarCambio}
          />
          <CampoFormulario
            id="descripcion"
            etiqueta="Descripción de Producto"
            tipo="textarea"
            filas={2}
            placeholder="Escriba la descripción aquí"
            valor={valores.descripcion}
            onChange={formulario.manejarCambio}
            error={errores.descripcion}
          />
          <CampoFormulario
            id="precio"
            etiqueta="Precio (Cifra)"
            tipo="number"
            placeholder="Escriba cifra sin puntos ni signo $"
            requerido
            valor={valores.precio}
            onChange={formulario.manejarCambio}
            error={errores.precio}
          />
          <CampoFormulario
            id="stock"
            etiqueta="Stock"
            tipo="number"
            placeholder="Mínimo 0, sin máximo"
            requerido
            valor={valores.stock}
            onChange={formulario.manejarCambio}
            error={errores.stock}
          />
          <CampoFormulario
            id="stockCritico"
            etiqueta="Stock Crítico"
            tipo="number"
            placeholder="Mínimo 0, sin máximo"
            valor={valores.stockCritico}
            onChange={formulario.manejarCambio}
            error={errores.stockCritico}
          />
          <CampoFormulario
            id="categoria"
            etiqueta="Categoría"
            tipo="select"
            placeholder="Selecciona la categoría"
            requerido
            opciones={props.categorias}
            valor={valores.categoria}
            onChange={formulario.manejarCambio}
            error={errores.categoria}
          />
          <CampoFormulario
            id="imagen"
            etiqueta="Subir Imagen del Producto"
            tipo="file"
            accept="image/*"
            onChange={manejarImagen}
            className="mb-1"
          />
          <Form.Text className="d-block mb-3 text-muted">
            La imagen debe estar en public/images/productos
          </Form.Text>
          {(vistaPrevia || valores.imagen) && (
            <div className="mb-3 text-center">
              <Imagen src={vistaPrevia ?? valores.imagen} alt="Vista previa" className="img-thumbnail producto-img" />
            </div>
          )}

          <div className="d-flex justify-content-between align-items-center">
            <Boton variante="outline-secondary" onClick={props.onCancelar}>
              {props.textoCancelar ?? 'Cancelar'}
            </Boton>
            <Boton variante="success" tipo="submit" className="px-4">
              Guardar Producto
            </Boton>
          </div>
        </Form>
      </Card.Body>
    </Card>
  )
}
