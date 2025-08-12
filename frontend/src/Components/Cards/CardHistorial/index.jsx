const CardHistorial = ({ historial }) => {
  if (!historial || !historial.cliente) return null;  // Agregado para manejar casos sin datos

  return (
    <div className="w-70 rounded-xl border border-slate-200 p-5 m-3 shadow-sm bg-white hover:shadow-lg transition-all duration-200">
      <div>
        <p className="font-semibold">Cliente: {historial.cliente.nombre}</p>
        
        {/* Alquileres */}
        {historial.alquileres && historial.alquileres.length > 0 ? (
          <div className="mt-4">
            <h3 className="font-semibold text-lg">Alquileres</h3>
            {historial.alquileres.map((alquiler) => (
              <div key={alquiler.alquilerId} className="text-sm text-slate-600">
                <span>Alquiler {alquiler.alquilerId}: </span>
                <span>Libro "{alquiler.libro.titulo}", </span>
                <span>multa de ${alquiler.multa}</span>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-sm text-slate-500">Sin alquileres registrados</p>
        )}

        {/* Ventas */}
        {historial.ventas && historial.ventas.length > 0 ? (
          <div className="mt-4">
            <h3 className="font-semibold text-lg">Ventas</h3>
            {historial.ventas.map((venta) => (
              <div key={venta.ventaId} className="text-sm text-slate-600">
                <span>Venta {venta.ventaId}: </span>
                <span>Libro "{venta.libro.titulo}", </span>
                <span>Cantidad {venta.cantidad}, </span>
                <span>Total ${venta.total}</span>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-sm text-slate-500">Sin ventas registradas</p>
        )}
      </div>
    </div>
  );
}

export default CardHistorial;
