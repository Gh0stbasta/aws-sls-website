# TICKET-[ID]: [Prägnanter Titel]

**Status:** OPEN
**Assignee:** -
**Effort:** [XS|S|M|L] (T-Shirt Sizing)
**Priority:** [CRITICAL|HIGH|MEDIUM|LOW]

## Context & Architecture

**Komponente:** [z.B. "Authentication Module"]
**Betroffene Module:** [z.B. "src/auth/", "src/middleware/"]
**Relevante ADRs:** [z.B. "ADR-000, ADR-003"]
**Design Pattern:** [z.B. "Middleware Pattern für Auth Guards"]

## User Story

> "Als **[Rolle]**, möchte ich **[Aktion]**, damit **[Business Value]**."

## Contract Definition (MUSS ZUERST erfolgen!)

**Schnittstelle/API:**
```typescript
// Definiere die API/Interface ZUERST, bevor implementiert wird
interface AuthService {
  login(email: string, password: string): Promise<AuthToken>;
  logout(token: AuthToken): Promise<void>;
}

// Beispiel für REST Endpoint
POST /api/auth/login
Request: { email: string, password: string }
Response: { token: string, expiresIn: number }
```

**Data Contracts:**
- Input: [z.B. "email muss valid sein", "password min 8 chars"]
- Output: [z.B. "token ist JWT", "expiresIn in Sekunden"]
- Error Cases: [z.B. "401 if credentials invalid", "400 if input invalid"]

## Acceptance Criteria

*Konkrete Test Cases, nicht vague "muss funktionieren"*

- [ ] `POST /api/auth/login` akzeptiert valid credentials und returns JWT Token
- [ ] Token wird validiert auf Format und Expiry
- [ ] Invalid credentials geben 401 Unauthorized zurück
- [ ] SQL Injection ist nicht möglich (parameterized queries)
- [ ] Password wird gehashed (nie plain text in DB)
- [ ] Logging documented: Wer logged sich wann ein? (für Audit Trail)

## Requirements (Definition of Done)

### Funktional
- [ ] [Anforderung 1]
- [ ] [Anforderung 2]
- [ ] Alle Acceptance Criteria erfüllt

### Technisch / Non-Functional
- [ ] Test Coverage >= 80% (Unit + Integration Tests)
- [ ] Keine Linter-Fehler
- [ ] Type Safety (wenn TypeScript: keine `any` Types)
- [ ] Performance: [z.B. "Login Response < 200ms"]
- [ ] Security: [z.B. "Passwords gehashed", "CSRF Protection", "Rate Limiting"]
- [ ] Kein Code über 500 Zeilen pro File

### Dokumentation
- [ ] Contract/API dokumentiert (Docstring)
- [ ] Inline-Docs für komplexe Logik
- [ ] README.md für neue Module/Ordner
- [ ] commands.md aktualisiert (z.B. Test Commands)

## Implementation Plan (vom Agent in Phase 3 auszufüllen)

**Schritt 1: Contract Validation**
- [ ] Contract verifizieren mit Architekt
- [ ] Test Cases aus Contract ableiten

**Schritt 2: Implementation**
- [ ] [Implementierungsschritte]

**Schritt 3: Testing & Refactoring**
- [ ] Tests schreiben (Test-Driven)
- [ ] Code Review auf Modularity & Readability
- [ ] Optimierungen durchführen

## Dependencies

**Blockiert durch:**
- [ ] TICKET-[ID] (Beschreibung)

**Blockiert:**
- [ ] TICKET-[ID] (Beschreibung)

## Notes

[Zusätzliche Infos für den Agent]
