package hitachi.controller;


import hitachi.model.Dispositivo;
import hitachi.service.interfaces.DispositivoService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.responses.ApiResponses;
import io.swagger.v3.oas.annotations.tags.Tag;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/api/dispositivi")
@Tag(name = "Dispositivo", description = "API per la gestione dei dispositivi")
public class DispositivoController {

    @Autowired
    private final DispositivoService dispositivoService;

    public DispositivoController(DispositivoService dispositivoService) {
        this.dispositivoService = dispositivoService;
    }


    @Operation(summary = "Recupera tutti i dispositivi")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "Dispositivi trovati"),
            @ApiResponse(responseCode = "404", description = "Dispositivi non trovati")
    })
    @GetMapping
    public List<Dispositivo> getAllDispositivi() {
        return dispositivoService.findAll();
    }


    @Operation(summary = "Recupera tutti i dispositivi attivi")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "Dispositivi trovati"),
            @ApiResponse(responseCode = "404", description = "Dispositivi non trovati")
    })
    @GetMapping("/attivi")
    public List<Dispositivo> getAllDispositiviAttivi() {
        return dispositivoService.findByStatoTrue();
    }
}
