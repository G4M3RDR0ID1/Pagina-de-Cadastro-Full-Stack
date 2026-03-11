package br.com.criandoapi.projeto.security;

import br.com.criandoapi.projeto.model.Usuario;
import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jws;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.security.Keys;

import jakarta.servlet.http.HttpServletRequest;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.stereotype.Component;

import java.util.Collections;
import java.util.Date;

import javax.crypto.SecretKey;

@Component
public class TokenUtil {

    private static final String HEADER = "Authorization";
    private static final String PREFIX = "Bearer ";

    @Value("${jwt.expiration}")
    private long expiration;

    @Value("${jwt.secret}")
    private String secretKey;

    @Value("${jwt.issuer}")
    private String issuer;

    /**
     * Gera token JWT
     */
    public String createToken(Usuario usuario) {

        SecretKey key = Keys.hmacShaKeyFor(secretKey.getBytes());

        String token = Jwts.builder()
                .subject(usuario.getNome())
                .issuer(issuer)
                .expiration(new Date(System.currentTimeMillis() + expiration))
                .signWith(key)
                .compact();

        return PREFIX + token;
    }

    /**
     * Verifica se token expirou
     */
    private boolean isExpiredValid(Date expiration) {
        return expiration.after(new Date());
    }

    private boolean isEmissorValid(String emissor) {
        return issuer.equals(emissor);
    }

    private boolean isSubjectValid(String username) {
        return username != null && !username.isEmpty();
    }

    /**
     * Valida token JWT
     */
    public Authentication validate(HttpServletRequest request) {

        String token = request.getHeader(HEADER);

        if (token == null || !token.startsWith(PREFIX)) {
            return null;
        }

        token = token.replace(PREFIX, "");

        SecretKey key = Keys.hmacShaKeyFor(secretKey.getBytes());

        Jws<Claims> jwsClaims = Jwts.parser()
                .verifyWith(key)
                .build()
                .parseSignedClaims(token);

        String username = jwsClaims.getPayload().getSubject();
        String issuerToken = jwsClaims.getPayload().getIssuer();
        Date expiration = jwsClaims.getPayload().getExpiration();

        if (isSubjectValid(username) &&
                isEmissorValid(issuerToken) &&
                isExpiredValid(expiration)) {

            return new UsernamePasswordAuthenticationToken(
                    username,
                    null,
                    Collections.emptyList()
            );
        }

        return null;
    }
}