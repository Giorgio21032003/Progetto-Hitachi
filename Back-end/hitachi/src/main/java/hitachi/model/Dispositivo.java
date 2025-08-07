package hitachi.model;

import jakarta.persistence.*;
import lombok.Data;

import java.time.LocalDateTime;
import java.util.List;

@Entity
@Table(name = "dispositivo")
@Data
public class Dispositivo {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String nome;

    private String stato;

    private String posizione;

    @ManyToOne
    @JoinColumn(name = "tipo_dispositivo_id", nullable = false)
    private TipoDispositivo tipoDispositivo;

    @Column(name = "creato_il")
    private LocalDateTime creatoIl;

    @OneToMany(mappedBy = "dispositivo")
    private List<Manutenzione> manutenzioni;

    @PrePersist
    protected void onCreate() {
        this.creatoIl = LocalDateTime.now();
    }

    // Getters and Setters
}
