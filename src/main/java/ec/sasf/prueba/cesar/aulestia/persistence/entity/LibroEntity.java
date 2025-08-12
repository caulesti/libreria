package ec.sasf.prueba.cesar.aulestia.persistence.entity;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity
@Table(name = "libros")
@Getter
@Setter
@NoArgsConstructor
public class LibroEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "libro_id")
    private Long libroId;

    private String titulo;

    private String autor;
    
    @Column(name = "precio_venta")
    private Double precioVenta;
    
    @Column(name = "precio_alquiler")
    private Double precioAlquiler;
    
    @Column(name = "stock_disponible")
    private Integer stockDisponible;
    
    private Boolean activo;

    
}
