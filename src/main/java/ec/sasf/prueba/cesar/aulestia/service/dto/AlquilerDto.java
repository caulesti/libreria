package ec.sasf.prueba.cesar.aulestia.service.dto;

import java.util.Date;

import lombok.Data;

@Data
public class AlquilerDto {
    
    private Long clienteId;
    
    private Long libroId;
    
    private Date fechaInicio;
    
    private Date fechaFin;
}
