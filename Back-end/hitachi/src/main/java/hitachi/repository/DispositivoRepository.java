package hitachi.repository;

import hitachi.model.Dispositivo;
import hitachi.model.Utente;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface DispositivoRepository extends JpaRepository<Dispositivo, Long> {

    @Query("SELECT d FROM Dispositivo d WHERE d.stato != 'in manutenzione'")
    List<Dispositivo> findByStatoTrue();
}
