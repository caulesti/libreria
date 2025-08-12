import { useForm } from 'react-hook-form'
import { useMemo } from 'react'

const PHONE_EC = /^(?:\+593|0)?9\d{8}$|^(?:\+593|0)?[2-7]\d{7}$/
const CEDULA_EC = /^\d{10}$/
const URL_RX = /^(https?:\/\/)([\w\-]+\.)+[\w\-]+(\/[\w\-._~:/?#[\]@!$&'()*+,;=]*)?$/i

export default function FormularioUniversal() {
  const {
    register,
    handleSubmit,
    watch,
    setError,
    formState: { errors, isSubmitting }
  } = useForm({
    defaultValues: {
      genero: 'M',
      pais: '',
      aceptaTerminos: false
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
      const res = await fetch('http://localhost:8080/alquileres', {
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
          <h1 className="text-2xl font-bold">Formulario universal</h1>
          <p className="text-slate-500">React + Tailwind + react-hook-form (JS).</p>
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
            <label className="text-sm font-semibold text-slate-700">Apellido</label>
            <input
              className={errClass(!!errors.apellido)}
              placeholder="Pérez"
              {...register('apellido', {
                required: 'El apellido es requerido',
                minLength: { value: 2, message: 'Mínimo 2 caracteres' },
                maxLength: { value: 60, message: 'Máximo 60 caracteres' }
              })}
            />
            {errors.apellido && <p className="text-red-600 text-sm mt-1">{errors.apellido.message}</p>}
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
          <div>
            <label className="text-sm font-semibold text-slate-700">Teléfono</label>
            <input
              inputMode="tel"
              className={errClass(!!errors.telefono)}
              placeholder="+593..."
              {...register('telefono', {
                required: 'El teléfono es requerido',
                pattern: { value: PHONE_EC, message: 'Teléfono de Ecuador no válido' }
              })}
            />
            {errors.telefono && <p className="text-red-600 text-sm mt-1">{errors.telefono.message}</p>}
          </div>
        </div>

        {/* Cédula / URL */}
        <div className="grid sm:grid-cols-2 gap-4">
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
          <div>
            <label className="text-sm font-semibold text-slate-700">Sitio web</label>
            <input
              className={errClass(!!errors.urlSitio)}
              placeholder="https://ejemplo.com"
              {...register('urlSitio', {
                pattern: { value: URL_RX, message: 'URL no válida (incluye http/https)' }
              })}
            />
            {errors.urlSitio && <p className="text-red-600 text-sm mt-1">{errors.urlSitio.message}</p>}
          </div>
        </div>

        {/* Password y confirmación */}
        <div className="grid sm:grid-cols-2 gap-4">
          <div>
            <label className="text-sm font-semibold text-slate-700">Contraseña</label>
            <input
              type="password"
              className={errClass(!!errors.password)}
              {...register('password', {
                required: 'La contraseña es requerida',
                minLength: { value: 8, message: 'Mínimo 8 caracteres' },
                validate: (v) =>
                  (/[A-Z]/.test(v) && /[a-z]/.test(v) && /\d/.test(v)) || 'Debe incluir mayúscula, minúscula y número'
              })}
            />
            {errors.password && <p className="text-red-600 text-sm mt-1">{errors.password.message}</p>}
          </div>
          <div>
            <label className="text-sm font-semibold text-slate-700">Confirmar contraseña</label>
            <input
              type="password"
              className={errClass(!!errors.password2)}
              {...register('password2', { required: 'Confirme la contraseña' })}
            />
            {errors.password2 && <p className="text-red-600 text-sm mt-1">{errors.password2.message}</p>}
          </div>
        </div>

        {/* Fecha nac, género, país */}
        <div className="grid sm:grid-cols-3 gap-4">
          <div>
            <label className="text-sm font-semibold text-slate-700">Fecha de nacimiento</label>
            <input
              type="date"
              className={errClass(!!errors.fechaNacimiento)}
              {...register('fechaNacimiento', { required: 'La fecha es requerida' })}
            />
            {errors.fechaNacimiento && <p className="text-red-600 text-sm mt-1">{errors.fechaNacimiento.message}</p>}
          </div>
          <div>
            <span className="text-sm font-semibold text-slate-700">Género</span>
            <div className="flex gap-4 mt-2">
              <label className="flex items-center gap-2">
                <input type="radio" value="M" {...register('genero', { required: true })} /> M
              </label>
              <label className="flex items-center gap-2">
                <input type="radio" value="F" {...register('genero', { required: true })} /> F
              </label>
              <label className="flex items-center gap-2">
                <input type="radio" value="O" {...register('genero', { required: true })} /> Otro
              </label>
            </div>
            {errors.genero && <p className="text-red-600 text-sm mt-1">Seleccione una opción</p>}
          </div>
          <div>
            <label className="text-sm font-semibold text-slate-700">País</label>
            <select
              className={errClass(!!errors.pais)}
              {...register('pais', { required: 'El país es requerido' })}
            >
              <option value="">Seleccione...</option>
              <option value="EC">Ecuador</option>
              <option value="CO">Colombia</option>
              <option value="PE">Perú</option>
              <option value="MX">México</option>
              <option value="ES">España</option>
            </select>
            {errors.pais && <p className="text-red-600 text-sm mt-1">{errors.pais.message}</p>}
          </div>
        </div>

        {/* Dirección */}
        <div>
          <label className="text-sm font-semibold text-slate-700">Dirección</label>
          <textarea
            rows={3}
            className={errClass(!!errors.direccion)}
            placeholder="Calle, número, ciudad..."
            {...register('direccion', { maxLength: { value: 200, message: 'Máx. 200 caracteres' } })}
          />
          {errors.direccion && <p className="text-red-600 text-sm mt-1">{errors.direccion.message}</p>}
        </div>

        {/* Números */}
        <div className="grid sm:grid-cols-2 gap-4">
          <div>
            <label className="text-sm font-semibold text-slate-700">Monto (USD)</label>
            <input
              type="number"
              step="0.01"
              className={errClass(!!errors.monto)}
              placeholder="0.00"
              {...register('monto', {
                valueAsNumber: true,
                min: { value: 0, message: 'No puede ser negativo' },
                max: { value: 1000000, message: 'Demasiado alto' }
              })}
            />
            {errors.monto && <p className="text-red-600 text-sm mt-1">{errors.monto.message}</p>}
          </div>
          <div>
            <label className="text-sm font-semibold text-slate-700">Cantidad</label>
            <input
              type="number"
              className={errClass(!!errors.cantidad)}
              placeholder="1"
              {...register('cantidad', {
                valueAsNumber: true,
                min: { value: 1, message: 'Mínimo 1' },
                max: { value: 10000, message: 'Máximo 10000' }
              })}
            />
            {errors.cantidad && <p className="text-red-600 text-sm mt-1">{errors.cantidad.message}</p>}
          </div>
        </div>

        {/* Fechas para alquiler */}
        <div className="grid sm:grid-cols-3 gap-4">
          <div>
            <label className="text-sm font-semibold text-slate-700">Fecha inicio</label>
            <input
              type="date"
              className={errClass(!!errors.fechaInicio)}
              {...register('fechaInicio', { required: 'Requerida' })}
            />
            {errors.fechaInicio && <p className="text-red-600 text-sm mt-1">{errors.fechaInicio.message}</p>}
          </div>
          <div>
            <label className="text-sm font-semibold text-slate-700">Fecha fin</label>
            <input
              type="date"
              className={errClass(!!errors.fechaFin)}
              {...register('fechaFin', {
                required: 'Requerida',
                validate: (v, f) => !f.fechaInicio || v >= f.fechaInicio || 'Debe ser >= fecha inicio'
              })}
            />
            {errors.fechaFin && <p className="text-red-600 text-sm mt-1">{errors.fechaFin.message}</p>}
          </div>
          <div>
            <label className="text-sm font-semibold text-slate-700">Hora (opcional)</label>
            <input type="time" className={errClass(!!errors.horaEntrega)} {...register('horaEntrega')} />
          </div>
        </div>

        {/* Opcionales */}
        <div className="flex items-center gap-2">
          <input id="novedades" type="checkbox" {...register('novedades')} />
          <label htmlFor="novedades" className="text-sm text-slate-700">Quiero recibir novedades</label>
        </div>
        <div className="flex items-center gap-2">
          <input
            id="aceptaTerminos"
            type="checkbox"
            {...register('aceptaTerminos', { required: 'Debes aceptar los términos' })}
          />
          <label htmlFor="aceptaTerminos" className="text-sm text-slate-700">Acepto términos y condiciones</label>
        </div>
        {errors.aceptaTerminos && <p className="text-red-600 text-sm mt-1">{errors.aceptaTerminos.message}</p>}

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
