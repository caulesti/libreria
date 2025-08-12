package ec.sasf.prueba.cesar.aulestia.persistence.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import ec.sasf.prueba.cesar.aulestia.persistence.entity.AlquilerEntity;

public interface AlquilerRepository extends JpaRepository<AlquilerEntity, Long> {
    
    List<AlquilerEntity> findByClienteIdEquals(Long id);
}
