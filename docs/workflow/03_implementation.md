# Phase 3: Implementation Loop

**ZIEL:** Ein spezifisch zugewiesenes Ticket nach Contract-First Methode abarbeiten. Produktionsreifer, wartbarer Code.

## Deine Aufgaben

### 1. Wait for Dispatch (WICHTIG!)

- Tue **nichts**, bis der Mensch explizit sagt: **"Bearbeite TICKET-[ID]"**.

**Start-Routine:**
1. Öffne `docs/tickets/TICKET-[ID]-*.md`
2. Lies das **gesamte Ticket** gründlich
3. Ändere Status auf `IN_PROGRESS`
4. Trage `AI Engineer` als Assignee ein
5. Initial Commit: `git commit -m "chore(ticket-[ID]): start implementation"`

### 2. Contract Validation

**Schritt 2.1: Contract Review**
- Lies den "Contract Definition" Abschnitt im Ticket
- Überprüfe: Ist das Interface/API klar definiert?
- Überprüfe: Sind Input/Output/Error Cases dokumentiert?

**Schritt 2.2: Contract Approval**
- **WENN Contract unklar:** STOPP! Frag den Architekten.
- **WENN Contract klar:** Dokumentiere im Ticket:
  ```markdown
  ## Contract Approval
  ✅ Contract reviewed by AI Engineer
  Date: [YYYY-MM-DD]
  ```

### 3. Implementation

**Schritt 3.1: Implementiere den Contract**

Arbeite die Checklisten aus dem Ticket ab:

1. **Implementiere Interface/API** gemäß Contract Definition
2. **Implementiere Business-Logik**
3. **Halte Enterprise-Standards ein** (siehe Agent Contract: Enterprise-Level Code-Standards)

**Schritt 3.2: Verify Implementation**

Schreibe Tests zur Verifikation:

- Teste alle Acceptance Criteria aus dem Ticket
- Teste Edge Cases (null, undefined, empty, invalid input)
- Teste Error Cases
- Führe Tests aus → Müssen BESTEHEN

**Schritt 3.3: Refactor**

- Code Duplication entfernen (DRY)
- Komplexität reduzieren
- Naming verbessern
- Tests erneut ausführen → Müssen grün bleiben

### 4. Code Quality Gates

#### 4.1 Linting & Type Checking
```bash
npm run lint
npm run type-check  # falls TypeScript/typed language
```

#### 4.2 Test Coverage
```bash
npm run test:coverage
```
**Erwartung:** >= 80% Coverage

#### 4.3 File Size Check
- **Jedes File < 500 Zeilen Code** (siehe Agent Contract: Dateigröße)
- Falls > 500 Zeilen: AUFTEILEN!

#### 4.4 Performance Validation (falls NFRs im Ticket)
- Benchmarks laufen lassen
- Ergebnisse dokumentieren

#### 4.5 Security Check
- Keine Secrets im Code
- SQL Injection Prevention (Parameterized Queries)
- Input Validation
- `npm audit` (keine kritischen Vulnerabilities)

### 5. Self-Review Checkliste

Siehe Agent Contract: Definition of Done (DoD) für vollständige Liste.

**Zusätzliche Checks:**
- [ ] Alle Acceptance Criteria getestet
- [ ] Edge Cases getestet
- [ ] Error Cases getestet

**Security:**
- [ ] Keine Secrets im Code
- [ ] Input Validation implementiert

**Documentation:**
- [ ] Contract/API dokumentiert (Docstrings)
- [ ] README.md für neue Module

### 6. Continuous Documentation

**Sofort aktualisieren:**

- **Neuer Ordner?** → `README.md` mit Zweck, Verwendung, Dependencies
- **Neues Script/Command?** → `commands.md` aktualisieren
- **Neue Konfiguration?** → Dokumentieren

### 7. Ticket Summary

Öffne `docs/tickets/TICKET-[ID]-*.md` und **hänge am Ende** an:

```markdown
---

## Implementation Summary

**Completed:** [YYYY-MM-DD]
**Implemented by:** AI Engineer

### Übersicht
[Was wurde umgesetzt? Welche Files erstellt/geändert?]

### Technical Decisions
[Design Patterns? Warum?]

### Probleme & Lösungen
[Herausforderungen und wie gelöst?]

### Test Results
- Test Coverage: [X%]
- All Tests: ✅ PASSED
- Performance: [Falls gemessen]

### Code Quality Metrics
- Files Changed: [Anzahl]
- Lines of Code: [Anzahl]
- Max File Size: [X Zeilen]
```

**Dann:**
- Status auf `DONE`
- Datei umbenennen: `docs/tickets/done_TICKET-[ID]-*.md`

### 8. Git Commit

**Schritt 8.1: Stage & Commit**

Format: Conventional Commits (siehe Agent Contract: Versionskontrolle)

```bash
git add .
git commit -m "feat(scope): subject

- Detail 1
- Detail 2
- Test coverage: X%

Closes TICKET-[ID]"
```

**Schritt 8.2: Verify**
```bash
git log --oneline -1
```

### 9. Architekt Notification

Informiere den Architekten:

> "TICKET-[ID] ist fertig. Status: DONE. Alle Tests grün. Bereit für Review."

Warte auf Feedback.

## Exit-Kriterium

✅ Contract validiert  
✅ Alle Tests grün  
✅ Test Coverage >= 80%  
✅ Code Quality Gates passed  
✅ Self-Review Checkliste abgearbeitet  
✅ Ticket Summary erstellt  
✅ Git Commit erfolgt  
✅ Architekt informiert

Warte auf das nächste Human Dispatch.

