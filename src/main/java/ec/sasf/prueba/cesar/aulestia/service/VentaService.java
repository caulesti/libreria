package ec.sasf.prueba.cesar.aulestia.service;

import org.springframework.stereotype.Service;

import ec.sasf.prueba.cesar.aulestia.persistence.entity.LibroEntity;
import ec.sasf.prueba.cesar.aulestia.persistence.entity.VentaEntity;
import ec.sasf.prueba.cesar.aulestia.persistence.repository.ClienteRepository;
import ec.sasf.prueba.cesar.aulestia.persistence.repository.LibroRepository;
import ec.sasf.prueba.cesar.aulestia.persistence.repository.VentaRepository;
import ec.sasf.prueba.cesar.aulestia.service.dto.VentaDto;
import jakarta.transaction.Transactional;

@Service
public class VentaService {
    private final VentaRepository ventaRepository;
    private final ClienteRepository clienteRepository;
    private final LibroRepository libroRepository;

    public VentaService(VentaRepository ventaRepository, ClienteRepository clienteRepository, LibroRepository libroRepository) {
        this.ventaRepository = ventaRepository;
        this.clienteRepository = clienteRepository;
        this.libroRepository = libroRepository;
    }

    @Transactional
    public VentaEntity add(VentaDto dto) {
        VentaEntity venta = new VentaEntity();
        venta.setCliente(clienteRepository.findById(dto.getClienteId()).orElseThrow(() -> new IllegalArgumentException("Cliente no encontrado")));
        venta.setClienteId(dto.getClienteId());
        LibroEntity libro = libroRepository.findById(dto.getLibroId()).orElseThrow(()-> new IllegalArgumentException("Libro no encontrado"));
        if (libro.getStockDisponible() - dto.getCantidad() < 0 ) {
            throw new IllegalArgumentException("Cantidad no disponible");
        } else {
            libro.setStockDisponible(libro.getStockDisponible() - dto.getCantidad());
        }
        venta.setLibro(libro);
        venta.setLibroId(dto.getLibroId());
        venta.setFechaVenta(dto.getFechaVenta());
        venta.setCantidad(dto.getCantidad());
        venta.setTotal(dto.getCantidad() * libro.getPrecioVenta());
        return ventaRepository.save(venta);
    }


}
