package ec.sasf.prueba.cesar.aulestia.web.controller;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import ec.sasf.prueba.cesar.aulestia.persistence.entity.LibroEntity;
import ec.sasf.prueba.cesar.aulestia.service.LibroService;
import ec.sasf.prueba.cesar.aulestia.service.dto.LibroDto;

@RestController
@RequestMapping("/libros")
@CrossOrigin("*")
public class LibroController {
    private final LibroService libroService;

    public LibroController(LibroService libroService) {
        this.libroService = libroService;
    }

    @PostMapping
    public ResponseEntity<LibroEntity> add(@RequestBody LibroDto dto) {
        return ResponseEntity.ok(libroService.add(dto));
    }

}
