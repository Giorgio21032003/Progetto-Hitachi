package hitachi.repository;


import hitachi.model.Utente;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface UtenteRepository extends JpaRepository<Utente, Long> {
    // puoi aggiungere query custom qui se serve
    Optional<Utente> findByUsernameAndPasswordAndAttivoTrue(String username, String password);
}
