package hitachi.controller;

import hitachi.model.Utente;
import hitachi.service.interfaces.UtenteService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.responses.ApiResponses;
import io.swagger.v3.oas.annotations.tags.Tag;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.util.Optional;

@RestController
@RequestMapping("/api/utenti")
@Tag(name = "Utenti", description = "API per la gestione delle utenti")
public class UtenteController {

    @Autowired
    private final UtenteService utenteService;

    public UtenteController(UtenteService utenteService) {
        this.utenteService = utenteService;
    }

    @Operation(summary = "Recupera un utente per username e password")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "Utente trovato"),
            @ApiResponse(responseCode = "404", description = "Utente non trovato")
    })
    @GetMapping("/login")
    public ResponseEntity<Utente> getUtenteByUsernamePassword(
            @RequestParam String username,
            @RequestParam String password) {

        Optional<Utente> utente = utenteService.findByUsernamePassword(username, password);
        return utente.map(ResponseEntity::ok)
                .orElseGet(() -> ResponseEntity.notFound().build());
    }

}
