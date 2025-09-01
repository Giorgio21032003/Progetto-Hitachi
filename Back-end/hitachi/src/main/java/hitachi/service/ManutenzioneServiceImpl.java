package hitachi.service;

import hitachi.model.Manutenzione;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import hitachi.repository.ManutenzioneRepository;
import hitachi.service.interfaces.ManutenzioneService;

import java.util.List;
import java.util.Optional;

@Service
public class ManutenzioneServiceImpl implements ManutenzioneService {

    private final ManutenzioneRepository manutenzioneRepository;

    @Autowired
    public ManutenzioneServiceImpl(ManutenzioneRepository manutenzioneRepository) {
        this.manutenzioneRepository = manutenzioneRepository;
    }

    @Override
    public List<Manutenzione> findAll() {
        return manutenzioneRepository.findAll();
    }

    @Override
    public Optional<Manutenzione> findById(Long id) {
        return manutenzioneRepository.findById(id);
    }

    @Override
    public List<Manutenzione> findByEseguitoDa(String username) { return manutenzioneRepository.findByEseguitoDa(username); }

    @Override
    public Manutenzione save(Manutenzione manutenzione) {
        return manutenzioneRepository.save(manutenzione);
    }

    @Override
    public void deleteById(Long id) {
        manutenzioneRepository.deleteById(id);
    }
}
