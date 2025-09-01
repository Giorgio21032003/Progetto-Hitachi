package hitachi.controller;


import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.Parameter;
import io.swagger.v3.oas.annotations.tags.Tag;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.responses.ApiResponses;

import hitachi.model.Manutenzione;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import hitachi.service.interfaces.ManutenzioneService;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/manutenzioni")
@Tag(name = "Manutenzione", description = "API per la gestione delle manutenzioni")
public class ManutenzioneController {

  @Autowired
  private final ManutenzioneService manutenzioneService;

    public ManutenzioneController(ManutenzioneService manutenzioneService) {
        this.manutenzioneService = manutenzioneService;
    }


    @Operation(summary = "Recupera tutte le manutenzioni")
  @GetMapping
  public List<Manutenzione> getAllManutenzioni() {
    return manutenzioneService.findAll();
  }

  @Operation(summary = "Recupera una manutenzione per ID")
  @ApiResponses(value = {
          @ApiResponse(responseCode = "200", description = "Manutenzione trovata"),
          @ApiResponse(responseCode = "404", description = "Manutenzione non trovata")
  })
  @GetMapping("/{id}")
  public ResponseEntity<Manutenzione> getManutenzioneById(
          @Parameter(description = "ID della manutenzione da recuperare") @PathVariable Long id) {

    Optional<Manutenzione> manutenzione = manutenzioneService.findById(id);
    return manutenzione.map(ResponseEntity::ok)
            .orElseGet(() -> ResponseEntity.notFound().build());
  }


  @Operation(summary = "Recupera una manutenzione per Utente")
  @ApiResponses(value = {
          @ApiResponse(responseCode = "200", description = "Manutenzione trovata"),
          @ApiResponse(responseCode = "404", description = "Manutenzione non trovata")
  })
  @GetMapping("/all/{username}")
  public List<Manutenzione> getManutenzioneByUser(
          @Parameter(description = "ID della manutenzione da recuperare") @PathVariable String username) {

    List<Manutenzione> manutenzioni = manutenzioneService.findByEseguitoDa(username);
    return manutenzioni;
  }

  @Operation(summary = "Crea una nuova manutenzione")
  @PostMapping
  public Manutenzione createManutenzione(
          @Parameter(description = "Dettagli della manutenzione da creare") @RequestBody Manutenzione manutenzione) {
    return manutenzioneService.save(manutenzione);
  }

  @Operation(summary = "Aggiorna una manutenzione esistente")
  @ApiResponses(value = {
          @ApiResponse(responseCode = "200", description = "Manutenzione aggiornata"),
          @ApiResponse(responseCode = "404", description = "Manutenzione non trovata")
  })
  @PutMapping("/{id}")
  public ResponseEntity<Manutenzione> updateManutenzione(
          @Parameter(description = "ID della manutenzione da aggiornare") @PathVariable Long id,
          @Parameter(description = "Dettagli aggiornati della manutenzione") @RequestBody Manutenzione manutenzioneDetails) {

    Optional<Manutenzione> manutenzioneOptional = manutenzioneService.findById(id);

    if (!manutenzioneOptional.isPresent()) {
      return ResponseEntity.notFound().build();
    }

    Manutenzione manutenzione = manutenzioneOptional.get();
    manutenzione.setDescrizione(manutenzioneDetails.getDescrizione());
    manutenzione.setDataManutenzione(manutenzioneDetails.getDataManutenzione());
    manutenzione.setEseguitoDa(manutenzioneDetails.getEseguitoDa());
    manutenzione.setDispositivo(manutenzioneDetails.getDispositivo());

    Manutenzione updated = manutenzioneService.save(manutenzione);
    return ResponseEntity.ok(updated);
  }


  @Operation(summary = "Aggiorna una manutenzione esistente")
  @ApiResponses(value = {
          @ApiResponse(responseCode = "200", description = "Manutenzione aggiornata"),
          @ApiResponse(responseCode = "404", description = "Manutenzione non trovata")
  })
  @PutMapping("/manutentata/{id}")
  public ResponseEntity<Manutenzione> updateManutentata(
          @Parameter(description = "ID della manutenzione da aggiornare") @PathVariable Long id) {

    Optional<Manutenzione> manutenzioneOptional = manutenzioneService.findById(id);

    if (!manutenzioneOptional.isPresent()) {
      return ResponseEntity.notFound().build();
    }

    Manutenzione manutenzione = manutenzioneOptional.get();
    manutenzione.setStato("Manutentata");

    Manutenzione updated = manutenzioneService.save(manutenzione);
    return ResponseEntity.ok(updated);
  }

  @Operation(summary = "Elimina una manutenzione per ID")
  @ApiResponses(value = {
          @ApiResponse(responseCode = "204", description = "Manutenzione eliminata"),
          @ApiResponse(responseCode = "404", description = "Manutenzione non trovata")
  })
  @DeleteMapping("/{id}")
  public ResponseEntity<Void> deleteManutenzione(
          @Parameter(description = "ID della manutenzione da eliminare") @PathVariable Long id) {

    Optional<Manutenzione> manutenzioneOptional = manutenzioneService.findById(id);
    if (!manutenzioneOptional.isPresent()) {
      return ResponseEntity.notFound().build();
    }
    manutenzioneService.deleteById(id);
    return ResponseEntity.noContent().build();
  }
}
