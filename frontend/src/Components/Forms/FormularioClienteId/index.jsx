import { useForm } from 'react-hook-form'
import { useMemo, useContext } from 'react'
import { Contexto } from "../../../Context"

export default function FormularioClienteId() {
  const contexto = useContext(Contexto)

  const {
    register,
    handleSubmit,
    setError,
    formState: { errors, isSubmitting }
  } = useForm({
    defaultValues: { clienteId: '' }
  })

  const errClass = useMemo(
    () => (hasErr) =>
      `border rounded px-3 py-2 text-sm outline-none font-medium text-slate-700 w-full ${
        hasErr ? 'border-red-500' : 'border-slate-300 focus:border-slate-500'
      }`,
    []
  )

  const onSubmit = handleSubmit(async ({ clienteId }) => {
    if (clienteId === '' || clienteId === null || clienteId === undefined) {
      setError('clienteId', { type: 'required', message: 'Obligatorio' })
      return
    }

    try {
      const res = await fetch(`http://localhost:8080/clientes/${clienteId}/historial`, {
        headers: { Accept: 'application/json' }
      })

      if (!res.ok) {
        const msg = await res.text().catch(() => '')
        throw new Error(`HTTP ${res.status} ${msg}`)
      }

      const data = await res.json()

      // Guarda en tu contexto (ajusta el setter según tu Context real)
      if (typeof contexto?.setHistorial === 'function') {
        contexto.setHistorial(data)
      }

      alert('✅ Historial cargado')
    } catch (e) {
      console.error(e)
      alert('❌ Error al consultar historial')
    }
  })

  return (
    <main className="container mx-auto max-w-3xl py-8">
      <form onSubmit={onSubmit} className="grid gap-6 border border-slate-200 rounded-lg p-6 bg-white">
        <header className="space-y-1">
          <h1 className="text-2xl font-bold">Buscar por el id del cliente</h1>
        </header>

        <div className="grid sm:grid-cols-2 gap-4">
          <div>
            <label className="text-sm font-semibold text-slate-700">ID del Cliente</label>
            <input
              type="number"
              step="1"
              className={errClass(!!errors.clienteId)}
              placeholder="1"
              {...register('clienteId', {
                required: 'Obligatorio',
                valueAsNumber: true,
                min: { value: 1, message: 'Debe ser mayor a 0' }
              })}
            />
            {errors.clienteId && <p className="text-red-600 text-sm mt-1">{errors.clienteId.message}</p>}
          </div>
        </div>

        <div className="flex gap-3">
          <button
            type="submit"
            disabled={isSubmitting}
            className="bg-stone-800 text-white py-2 px-4 rounded-md font-medium disabled:opacity-60"
          >
            {isSubmitting ? 'Consultando...' : 'Consultar'}
          </button>
          <button type="button" onClick={() => window.history.back()} className="underline font-medium">
            Cancelar
          </button>
        </div>
      </form>
    </main>
  )
}
