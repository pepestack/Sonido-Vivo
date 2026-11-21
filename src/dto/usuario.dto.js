function datosPersonales(formulario) {
  const dto = {
    nombre: formulario.nombre.trim(),
    apellido: formulario.apellido.trim(),
    correo: formulario.correo.trim().toLowerCase(),
    region: formulario.region,
    comuna: formulario.comuna,
    direccion: formulario.direccion.trim(),
  }
  if (formulario.fechaNacimiento) dto.fechaNacimiento = formulario.fechaNacimiento
  return dto
}

export function crearRegistroRequestDto(formulario) {
  return {
    ...datosPersonales(formulario),
    rut: formulario.rut.replace(/[.-]/g, '').trim().toUpperCase(),
    contrasena: formulario.contrasena,
  }
}

export function crearUsuarioRequestDto(formulario) {
  return { ...crearRegistroRequestDto(formulario), rol: formulario.rol }
}

export function actualizarUsuarioRequestDto(formulario) {
  return { ...datosPersonales(formulario), rol: formulario.rol }
}

export function usuarioDesdeRespuesta(datos) {
  return {
    id: datos.id,
    rut: datos.rut ?? '',
    nombre: datos.nombre,
    apellido: datos.apellido,
    fechaNacimiento: datos.fecha_nacimiento ? String(datos.fecha_nacimiento).slice(0, 10) : '',
    correo: datos.correo,
    region: datos.region ?? '',
    comuna: datos.comuna ?? '',
    direccion: datos.direccion ?? '',
    rol: datos.rol,
    activo: datos.activo ?? true,
    creadoEn: datos.creado_en ?? null,
  }
}
