import { useForm } from 'react-hook-form'
import { useMemo } from 'react'

const PHONE_EC = /^(?:\+593|0)?9\d{8}$|^(?:\+593|0)?[2-7]\d{7}$/
const CEDULA_EC = /^\d{10}$/
const URL_RX = /^(https?:\/\/)([\w\-]+\.)+[\w\-]+(\/[\w\-._~:/?#[\]@!$&'()*+,;=]*)?$/i

export default function FormularioCliente() {
  const {
    register,
    handleSubmit,
    watch,
    setError,
    formState: { errors, isSubmitting }
  } = useForm({
    defaultValues: {
      
    }
  })

  const password = watch('password')

  const errClass = useMemo(
    () => (hasErr) =>
      `border rounded px-3 py-2 text-sm outline-none font-medium text-slate-700 w-full ${hasErr ? 'border-red-500' : 'border-slate-300 focus:border-slate-500'}`,
    []
  )

  const onSubmit = handleSubmit(async (data) => {
    if (data.password !== data.password2) {
      setError('password2', { type: 'validate', message: 'Las contraseñas no coinciden' })
      return
    }

    // Normalizaciones básicas
    const payload = {
      ...data,
      nombre: (data.nombre || '').trim(),
      apellido: (data.apellido || '').trim(),
      email: (data.email || '').trim().toLowerCase(),
      telefono: (data.telefono || '').trim(),
      cedula: (data.cedula || '').trim(),
      urlSitio: (data.urlSitio || '').trim(),
      direccion: (data.direccion || '').trim(),
      fechaInicio: data.fechaInicio ? `${data.fechaInicio}T00:00:00` : null,
      fechaFin: data.fechaFin ? `${data.fechaFin}T00:00:00` : null,
      monto: data.monto !== undefined && data.monto !== '' ? Number(data.monto) : undefined,
      cantidad: data.cantidad !== undefined && data.cantidad !== '' ? Number(data.cantidad) : undefined
    }

    try {
      const res = await fetch('http://localhost:8080/clientes', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      })
      if (!res.ok) throw new Error(`Error ${res.status}`)
      const json = await res.json()
      console.log('Creado:', json)
      alert('✅ Envío exitoso')
    } catch (e) {
      console.error(e)
      alert('❌ Error al enviar')
    }
  })

  return (
    <main className="container mx-auto max-w-3xl py-8">
      <form onSubmit={onSubmit} className="grid gap-6 border border-slate-200 rounded-lg p-6 bg-white">
        <header className="space-y-1">
          <h1 className="text-2xl font-bold">Ingresar cliente</h1>
          <p className="text-slate-500">Complete los siguientes campos</p>
        </header>

        {/* Nombre y apellido */}
        <div className="grid sm:grid-cols-2 gap-4">
          <div>
            <label className="text-sm font-semibold text-slate-700">Nombre</label>
            <input
              className={errClass(!!errors.nombre)}
              placeholder="Juan"
              {...register('nombre', {
                required: 'El nombre es requerido',
                minLength: { value: 2, message: 'Mínimo 2 caracteres' },
                maxLength: { value: 60, message: 'Máximo 60 caracteres' }
              })}
            />
            {errors.nombre && <p className="text-red-600 text-sm mt-1">{errors.nombre.message}</p>}
          </div>
          <div>
            <label className="text-sm font-semibold text-slate-700">Cédula (EC)</label>
            <input
              inputMode="numeric"
              className={errClass(!!errors.cedula)}
              placeholder="10 dígitos"
              {...register('cedula', {
                required: 'La cédula es requerida',
                pattern: { value: CEDULA_EC, message: 'Debe tener 10 dígitos' }
              })}
            />
            {errors.cedula && <p className="text-red-600 text-sm mt-1">{errors.cedula.message}</p>}
          </div>
        </div>

        {/* Email y teléfono */}
        <div className="grid sm:grid-cols-2 gap-4">
          <div>
            <label className="text-sm font-semibold text-slate-700">Correo</label>
            <input
              type="email"
              className={errClass(!!errors.email)}
              placeholder="correo@dominio.com"
              {...register('email', {
                required: 'El correo es requerido',
                pattern: { value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/, message: 'Correo no válido' }
              })}
            />
            {errors.email && <p className="text-red-600 text-sm mt-1">{errors.email.message}</p>}
          </div>
        </div>

        {/* Botones */}
        <div className="flex gap-3">
          <button
            type="submit"
            disabled={isSubmitting}
            className="bg-stone-800 text-white py-2 px-4 rounded-md font-medium disabled:opacity-60"
          >
            {isSubmitting ? 'Enviando...' : 'Enviar'}
          </button>
          <button type="button" onClick={() => window.history.back()} className="underline font-medium">
            Cancelar
          </button>
        </div>
      </form>
    </main>
  )
}
