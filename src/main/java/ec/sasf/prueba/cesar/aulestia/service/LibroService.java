package ec.sasf.prueba.cesar.aulestia.service;

import org.springframework.stereotype.Service;

import ec.sasf.prueba.cesar.aulestia.persistence.entity.LibroEntity;
import ec.sasf.prueba.cesar.aulestia.persistence.repository.LibroRepository;
import ec.sasf.prueba.cesar.aulestia.service.dto.LibroDto;

@Service
public class LibroService {
    private final LibroRepository libroRepository;

    public LibroService(LibroRepository libroRepository) {
        this.libroRepository = libroRepository;
    }

    public LibroEntity add(LibroDto dto) {
        LibroEntity libro = new LibroEntity();
        libro.setTitulo(dto.getTitulo());
        libro.setAutor(dto.getAutor());
        libro.setPrecioVenta(dto.getPrecioVenta());
        libro.setPrecioAlquiler(dto.getPrecioAlquiler());
        libro.setStockDisponible(dto.getStockDisponible());
        libro.setActivo(true);
        return libroRepository.save(libro);
    }    

}
