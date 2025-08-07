package hitachi.model;

import jakarta.persistence.*;
import lombok.Data;

import java.time.LocalDateTime;

@Entity
@Table(name = "manutenzione")
@Data
public class Manutenzione {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne
    @JoinColumn(name = "dispositivo_id", nullable = false)
    private Dispositivo dispositivo;

    private String descrizione;

    @Column(name = "data_manutenzione")
    private LocalDateTime dataManutenzione;

    @Column(name = "eseguito_da")
    private String eseguitoDa;

    @PrePersist
    protected void onCreate() {
        this.dataManutenzione = LocalDateTime.now();
    }

    // Getters and Setters
}
