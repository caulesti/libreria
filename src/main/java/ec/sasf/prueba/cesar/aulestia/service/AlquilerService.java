package ec.sasf.prueba.cesar.aulestia.service;

import java.time.Duration;
import java.util.Date;

import org.springframework.stereotype.Service;

import ec.sasf.prueba.cesar.aulestia.persistence.entity.AlquilerEntity;
import ec.sasf.prueba.cesar.aulestia.persistence.entity.LibroEntity;
import ec.sasf.prueba.cesar.aulestia.persistence.repository.AlquilerRepository;
import ec.sasf.prueba.cesar.aulestia.persistence.repository.ClienteRepository;
import ec.sasf.prueba.cesar.aulestia.persistence.repository.LibroRepository;
import ec.sasf.prueba.cesar.aulestia.service.dto.AlquilerDto;
import jakarta.transaction.Transactional;

@Service
public class AlquilerService {
    private final AlquilerRepository alquilerRepository;
    private final ClienteRepository clienteRepository;
    private final LibroRepository libroRepository;

    public AlquilerService(AlquilerRepository alquilerRepository, ClienteRepository clienteRepository, LibroRepository libroRepository) {
        this.alquilerRepository = alquilerRepository;
        this.clienteRepository = clienteRepository;
        this.libroRepository = libroRepository;
    }

    @Transactional
    public AlquilerEntity add(AlquilerDto dto) {
        AlquilerEntity alquiler = new AlquilerEntity();
        alquiler.setCliente(clienteRepository.findById(dto.getClienteId()).orElseThrow(() -> new IllegalArgumentException("Cliente no encontrado")));
        alquiler.setClienteId(dto.getClienteId());
        LibroEntity libro = libroRepository.findById(dto.getLibroId()).orElseThrow(()-> new IllegalArgumentException("Libro no encontrado"));
        if (libro.getStockDisponible() == 0 ) {
            throw new IllegalArgumentException("Libro no disponible");
        } else {
            libro.setStockDisponible(libro.getStockDisponible() - 1);
        }
        alquiler.setLibro(libro);
        alquiler.setLibroId(dto.getLibroId());
        alquiler.setFechaInicio(dto.getFechaInicio());
        alquiler.setFechaFin(dto.getFechaFin());
        alquiler.setFechaDevolucion(null);
        alquiler.setMulta(0.0);
        return alquilerRepository.save(alquiler);
    }

    @Transactional
    public AlquilerEntity devolver(Long id) {
        AlquilerEntity alquiler = alquilerRepository.findById(id).orElseThrow(() -> new IllegalArgumentException("Alquiler no encontrado"));
        
        Date ahora = new Date();
        alquiler.setFechaDevolucion(ahora);

        if (ahora.after(alquiler.getFechaFin())) {
            Long diasAtraso = Duration.between(alquiler.getFechaFin().toInstant(), ahora.toInstant()).toDays();    
            alquiler.setMulta(1.50 * diasAtraso);
        }
        
        alquiler.getLibro().setStockDisponible(alquiler.getLibro().getStockDisponible() + 1);
        return alquilerRepository.save(alquiler);
    }

}
