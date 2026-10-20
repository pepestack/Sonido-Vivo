import { describe, it, expect } from 'vitest'
import {
  sinErrores,
  validarClave,
  validarCorreoOpcional,
  validarCorreoPermitido,
  validarObligatorio,
  validarUsuario,
} from './validaciones'

describe('validarUsuario', () => {
  const valido = {
    rut: '111111111',
    nombre: 'Ana',
    apellido: 'Pérez',
    correo: 'ana@duoc.cl',
    contrasena: '1234',
    region: 'Región de Valparaíso',
    comuna: 'Viña del Mar',
    direccion: 'Calle 1',
    rol: 'Cliente',
  }

  it('no devuelve errores para un usuario válido', () => {
    expect(sinErrores(validarUsuario(valido))).toBe(true)
  })

  it('rechaza un RUN inválido', () => {
    expect(validarUsuario({ ...valido, rut: '123' }).rut).not.toBe('')
  })

  it('rechaza un RUN que ya está en uso', () => {
    const errores = validarUsuario(valido, { rutEnUso: () => true })
    expect(errores.rut).toBe('Ya existe un usuario con este RUN')
  })

  it('exige el rol salvo que se oculte', () => {
    const sinRol = { ...valido, rol: '' }
    expect(validarUsuario(sinRol).rol).toBe('Selecciona un rol')
    expect(validarUsuario(sinRol, { ocultarRol: true }).rol).toBe('')
  })

  it('aplica la regla de correos permitidos', () => {
    expect(validarUsuario({ ...valido, correo: 'ana@sonidovivo.cl' }).correo).not.toBe('')
  })
})

describe('validarClave', () => {
  it('acepta entre 4 y 10 caracteres', () => {
    expect(validarClave('abcd')).toBe('')
    expect(validarClave('abcdefghij')).toBe('')
  })

  it('exige la contraseña', () => {
    expect(validarClave('')).toBe('La contraseña es requerida')
  })

  it('rechaza menos de 4 y más de 10 caracteres', () => {
    expect(validarClave('abc')).not.toBe('')
    expect(validarClave('abcdefghijk')).not.toBe('')
  })
})

describe('validarCorreoPermitido', () => {
  it('acepta duoc.cl, profesor.duoc.cl y gmail.com', () => {
    expect(validarCorreoPermitido('a@duoc.cl')).toBe('')
    expect(validarCorreoPermitido('a@profesor.duoc.cl')).toBe('')
    expect(validarCorreoPermitido('a@gmail.com')).toBe('')
  })

  it('rechaza otros dominios, incluido sonidovivo.cl', () => {
    expect(validarCorreoPermitido('a@sonidovivo.cl')).not.toBe('')
    expect(validarCorreoPermitido('a@hotmail.com')).not.toBe('')
  })

  it('rechaza más de 100 caracteres', () => {
    const largo = `${'a'.repeat(95)}@duoc.cl`
    expect(validarCorreoPermitido(largo)).toBe('Máximo 100 caracteres')
  })
})

describe('validarCorreoOpcional', () => {
  it('acepta el campo vacío', () => {
    expect(validarCorreoOpcional('')).toBe('')
  })

  it('si tiene texto, exige un dominio permitido', () => {
    expect(validarCorreoOpcional('a@hotmail.com')).not.toBe('')
    expect(validarCorreoOpcional('a@gmail.com')).toBe('')
  })
})

describe('validarObligatorio', () => {
  it('no devuelve error si el campo tiene texto', () => {
    expect(validarObligatorio('hola')).toBe('')
  })

  it('devuelve el mensaje por defecto si el campo está vacío', () => {
    expect(validarObligatorio('')).toBe('Este campo es obligatorio')
  })

  it('trata un campo con solo espacios como vacío', () => {
    expect(validarObligatorio('   ')).toBe('Este campo es obligatorio')
  })

  it('usa el mensaje propio si se le pasa uno', () => {
    expect(validarObligatorio('', 'Falta el RUT')).toBe('Falta el RUT')
  })
})
