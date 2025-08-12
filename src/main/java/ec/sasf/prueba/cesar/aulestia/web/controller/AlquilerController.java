package ec.sasf.prueba.cesar.aulestia.web.controller;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import ec.sasf.prueba.cesar.aulestia.persistence.entity.AlquilerEntity;
import ec.sasf.prueba.cesar.aulestia.service.AlquilerService;
import ec.sasf.prueba.cesar.aulestia.service.dto.AlquilerDto;

@RestController
@RequestMapping("/alquileres")
@CrossOrigin("*")
public class AlquilerController {
    private final AlquilerService alquilerService;

    public AlquilerController(AlquilerService alquilerService) {
        this.alquilerService = alquilerService;
    }

    @PostMapping
    public ResponseEntity<AlquilerEntity> add(@RequestBody AlquilerDto dto) {
        return ResponseEntity.ok(alquilerService.add(dto));
    }

    @PutMapping("/{id}/devolucion")
    public ResponseEntity<AlquilerEntity> devolver(@PathVariable Long id) {
        return ResponseEntity.ok(alquilerService.devolver(id));
    }

}
