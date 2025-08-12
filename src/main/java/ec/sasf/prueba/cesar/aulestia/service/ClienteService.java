package ec.sasf.prueba.cesar.aulestia.service;

import org.springframework.stereotype.Service;

import ec.sasf.prueba.cesar.aulestia.persistence.entity.ClienteEntity;
import ec.sasf.prueba.cesar.aulestia.persistence.repository.AlquilerRepository;
import ec.sasf.prueba.cesar.aulestia.persistence.repository.ClienteRepository;
import ec.sasf.prueba.cesar.aulestia.persistence.repository.VentaRepository;
import ec.sasf.prueba.cesar.aulestia.service.dto.ClienteDto;
import ec.sasf.prueba.cesar.aulestia.service.dto.HistorialDto;

@Service
public class ClienteService {
    private final ClienteRepository clienteRepository;
    private final AlquilerRepository alquilerRepository;
    private final VentaRepository ventaRepository;

    public ClienteService(ClienteRepository clienteRepository, AlquilerRepository alquilerRepository, VentaRepository ventaRepository) {
        this.clienteRepository = clienteRepository;
        this.alquilerRepository = alquilerRepository;
        this.ventaRepository = ventaRepository;
    }

    public ClienteEntity add(ClienteDto dto) {
        ClienteEntity cliente = new ClienteEntity();
        cliente.setNombre(dto.getNombre());
        cliente.setCedula(dto.getCedula());
        cliente.setEmail(dto.getEmail());
        return clienteRepository.save(cliente);
    }
    
    public HistorialDto historial(Long id) {
        HistorialDto historial = new HistorialDto();
        historial.setCliente(clienteRepository.findById(id).orElseThrow(() -> new IllegalArgumentException("El cliente no existe")));
        historial.setAlquileres(alquilerRepository.findByClienteIdEquals(id));
        historial.setVentas(ventaRepository.findByClienteIdEquals(id));
        return historial;  
    }
}
