package hitachi.repository;


import hitachi.model.Manutenzione;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface ManutenzioneRepository extends JpaRepository<Manutenzione, Long> {
    List<Manutenzione> findByEseguitoDa(String username);
    // puoi aggiungere query custom qui se serve
}
