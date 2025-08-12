package ec.sasf.prueba.cesar.aulestia.persistence.entity;

import java.util.Date;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity
@Table(name = "ventas")
@Getter
@Setter
@NoArgsConstructor
public class VentaEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "venta_id")
    private Long ventaId;

    @Column(name = "cliente_id")
    private Long clienteId;

    @Column(name = "libro_id")
    private Long libroId;

    @ManyToOne
    @JoinColumn(name = "cliente_id", referencedColumnName = "cliente_id", insertable = false, updatable = false)
    private ClienteEntity cliente;
    
    @ManyToOne
    @JoinColumn(name = "libro_id", referencedColumnName = "libro_id", insertable = false, updatable = false)
    private LibroEntity libro;
    
    @Column(name = "fecha_venta")
    private Date fechaVenta;
    
    private Integer cantidad;
    
    private Double total;

}
