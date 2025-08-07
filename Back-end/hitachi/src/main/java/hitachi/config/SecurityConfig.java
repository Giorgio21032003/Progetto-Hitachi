package hitachi.config;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.web.SecurityFilterChain;

@Configuration
public class SecurityConfig {

    @Bean
    public SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception {
        http
                .authorizeHttpRequests(auth -> auth
                        .requestMatchers(
                                "/swagger-ui/**",
                                "/swagger-ui.html",
                                "/v3/api-docs/**",
                                "/v3/api-docs.yaml",
                                "/v3/api-docs.yaml/**",
                                "/swagger-resources/**",
                                "/webjars/**"
                        ).permitAll() // Permetti Swagger senza login

                        .anyRequest().authenticated() // Per tutte le altre rotte serve login
                )
                .formLogin(form -> form.disable())  // Disabilita form login (se non vuoi form di login)
                .httpBasic(httpBasic -> httpBasic.disable()) // Disabilita Basic Auth popup
                .csrf(csrf -> csrf.disable()); // Disabilita CSRF per API REST

        return http.build();
    }
}
