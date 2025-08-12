package ec.sasf.prueba.cesar.aulestia.service.dto;

import java.util.List;

import ec.sasf.prueba.cesar.aulestia.persistence.entity.AlquilerEntity;
import ec.sasf.prueba.cesar.aulestia.persistence.entity.ClienteEntity;
import ec.sasf.prueba.cesar.aulestia.persistence.entity.VentaEntity;
import lombok.Data;

@Data
public class HistorialDto {

    private ClienteEntity cliente;

    private List<AlquilerEntity> alquileres;

    private List<VentaEntity> ventas;

}
