package ec.sasf.prueba.cesar.aulestia.web.controller;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import ec.sasf.prueba.cesar.aulestia.persistence.entity.VentaEntity;
import ec.sasf.prueba.cesar.aulestia.service.VentaService;
import ec.sasf.prueba.cesar.aulestia.service.dto.VentaDto;

@RestController
@RequestMapping("/ventas")
@CrossOrigin("*")
public class VentaController {
    private final VentaService ventaService;

    public VentaController(VentaService ventaService) {
        this.ventaService = ventaService;
    }

    @PostMapping
    public ResponseEntity<VentaEntity> add(@RequestBody VentaDto dto) {
        return ResponseEntity.ok(ventaService.add(dto));
    }

}
