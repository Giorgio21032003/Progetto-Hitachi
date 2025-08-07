package hitachi.model;

import jakarta.persistence.*;
import lombok.Data;

import java.util.List;

@Entity
@Table(name = "tipo_dispositivo")
@Data
public class TipoDispositivo {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String nome;

    private String descrizione;

    @OneToMany(mappedBy = "tipoDispositivo")
    private List<Dispositivo> dispositivi;


}
