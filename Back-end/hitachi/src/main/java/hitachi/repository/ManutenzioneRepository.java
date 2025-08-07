package hitachi.repository;


import hitachi.model.Manutenzione;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface ManutenzioneRepository extends JpaRepository<Manutenzione, Long> {
    // puoi aggiungere query custom qui se serve
}
