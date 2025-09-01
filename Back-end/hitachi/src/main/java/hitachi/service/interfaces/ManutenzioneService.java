package hitachi.service.interfaces;

import hitachi.model.Manutenzione;

import java.util.List;
import java.util.Optional;




public interface ManutenzioneService {

    List<Manutenzione> findAll();

    Optional<Manutenzione> findById(Long id);

    List<Manutenzione> findByEseguitoDa(String username);

    Manutenzione save(Manutenzione manutenzione);

    void deleteById(Long id);
}
