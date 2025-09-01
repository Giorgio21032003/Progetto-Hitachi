package hitachi.service.interfaces;

import hitachi.model.Manutenzione;
import hitachi.model.Utente;

import java.util.List;
import java.util.Optional;


public interface UtenteService {

    List<Utente> findAll();

    Optional<Utente> findById(Long id);

    Utente save(Utente utente);

    Optional<Utente> findByUsernamePassword(String username, String password);

    void deleteById(Long id);
}
