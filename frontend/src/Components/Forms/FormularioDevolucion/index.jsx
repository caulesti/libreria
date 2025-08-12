import { useForm } from 'react-hook-form'
import { useMemo } from 'react'

export default function FormularioDevolucion() {
  const {
    register,
    handleSubmit,
    setError,
    formState: { errors, isSubmitting }
  } = useForm({
    defaultValues: { alquilerId: '' }
  })

  const errClass = useMemo(
    () => (hasErr) =>
      `border rounded px-3 py-2 text-sm outline-none font-medium text-slate-700 w-full ${hasErr ? 'border-red-500' : 'border-slate-300 focus:border-slate-500'}`,
    []
  )

  const onSubmit = handleSubmit(async ({ alquilerId }) => {
    if (alquilerId === '' || alquilerId === null || alquilerId === undefined) {
      setError('alquilerId', { type: 'required', message: 'Obligatorio' })
      return
    }

    try {
      const res = await fetch(`http://localhost:8080/alquileres/${alquilerId}/devolucion`, {
        method: 'PUT',
        headers: { Accept: 'application/json' } // sin body
      })
      if (!res.ok) throw new Error(`Error ${res.status}`)
      const json = await res.json() // si tu endpoint retorna 204, quita esta línea
      console.log('Devuelto:', json)
      alert('✅ Devolución registrada')
    } catch (e) {
      console.error(e)
      alert('❌ Error al registrar la devolución')
    }
  })

  return (
    <main className="container mx-auto max-w-3xl py-8">
      <form onSubmit={onSubmit} className="grid gap-6 border border-slate-200 rounded-lg p-6 bg-white">
        <header className="space-y-1">
          <h1 className="text-2xl font-bold">Registrar devolución</h1>
          <p className="text-slate-500">Ingrese el ID del alquiler</p>
        </header>

        <div className="grid sm:grid-cols-2 gap-4">
          <div>
            <label className="text-sm font-semibold text-slate-700">ID del alquiler</label>
            <input
              type="number"
              step="1"
              className={errClass(!!errors.alquilerId)}
              placeholder="1"
              {...register('alquilerId', {
                required: 'Obligatorio',
                valueAsNumber: true,
                min: { value: 1, message: 'Debe ser mayor a 0' }
              })}
            />
            {errors.alquilerId && <p className="text-red-600 text-sm mt-1">{errors.alquilerId.message}</p>}
          </div>
        </div>

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
