package ec.sasf.prueba.cesar.aulestia.service.dto;

import lombok.Data;

@Data
public class LibroDto {

    private String titulo;

    private String autor;
    
    private Double precioVenta;
    
    private Double precioAlquiler;
    
    private Integer stockDisponible;

}
