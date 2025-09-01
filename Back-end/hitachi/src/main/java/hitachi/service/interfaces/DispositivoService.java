package hitachi.service.interfaces;

import hitachi.model.Dispositivo;

import java.util.List;

public interface DispositivoService {

    List<Dispositivo> findAll();
    List<Dispositivo> findByStatoTrue();
}
