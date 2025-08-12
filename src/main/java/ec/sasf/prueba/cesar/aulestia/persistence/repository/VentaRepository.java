package ec.sasf.prueba.cesar.aulestia.persistence.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import ec.sasf.prueba.cesar.aulestia.persistence.entity.VentaEntity;

public interface VentaRepository extends JpaRepository<VentaEntity, Long> {
    List<VentaEntity> findByClienteIdEquals(Long id);
}
