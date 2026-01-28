# Phase 4: Review & Deployment

**ZIEL:** Code Review durchführen, Qualität sichern, Ticket finalisieren und für Production vorbereiten.

## Deine Aufgaben

### 1. Pre-Review Validation

**Voraussetzungen prüfen (siehe Phase 3 Exit-Kriterien):**
- [ ] Alle Tests grün
- [ ] Code Quality Gates passed
- [ ] Ticket Summary erstellt
- [ ] Git Commit erfolgt
- [ ] Architekt wurde informiert

Falls NICHT erfüllt: **Zurück zu Phase 3!**

### 2. Pull Request erstellen

**Schritt 2.1: Branch vorbereiten**
```bash
git push origin <working-branch>
```

**Schritt 2.2: Pull Request (PR) erstellen**

Erstelle einen Pull Request mit folgender Struktur:

**PR Title:** `[TICKET-ID] <Titel aus Ticket>`

**PR Description Template:**
```markdown
## Summary
[Kurze Beschreibung: Was wurde implementiert?]

## Related Ticket
Closes TICKET-[ID]

## Changes
- [Änderung 1]
- [Änderung 2]

## Testing
- [ ] Unit Tests: ✅ PASSED
- [ ] Test Coverage: [X%]

## Checklist
Siehe Agent Contract: Definition of Done (DoD)

## Screenshots/Demo (falls UI)
[Optional]
```

**Schritt 2.3: Reviewer zuweisen**
- Weise den **Architekten** als Reviewer zu
- Warte auf Code Review

### 3. Code Review Cycle

**Der Architekt führt Code Review durch und prüft:**
- Code-Qualität & Enterprise-Standards (siehe Agent Contract)
- Architektur-Konformität (ADRs eingehalten?)
- Business-Value Alignment
- Definition of Done erfüllt?

**Mögliche Outcomes:**

**✅ APPROVED:**
- Review ist positiv, PR kann gemerged werden
- Weiter zu Schritt 4

**🔄 CHANGES REQUESTED:**
- Architekt fordert Änderungen an
- **Aktion:** Änderungen umsetzen, neue Commits pushen
- **Nicht** neuen PR erstellen, sondern bestehenden PR updaten
- Warte auf erneutes Review
- Wiederhole bis APPROVED

**❌ REJECTED:**
- Fundamentale Probleme, Ticket muss neu geplant werden
- Zurück zu Phase 2 (Planning)

### 4. Integration Testing (Optional, falls nicht in Phase 3)

Falls separate Integration Tests notwendig:

```bash
npm run test:integration  # oder entsprechender Command
```

**Prüfe:**
- [ ] Alle Integrationspunkte funktionieren
- [ ] Keine Regressionen in anderen Modulen
- [ ] Performance-Anforderungen erfüllt (siehe Ticket NFRs)

### 5. Documentation Updates

**Schritt 5.1: Release Notes**

Erstelle/Update `docs/releases/CHANGELOG.md`:

```markdown
## [Version X.Y.Z] - YYYY-MM-DD

### Added
- [TICKET-ID]: <Feature Beschreibung>

### Fixed
- [TICKET-ID]: <Bug Fix Beschreibung>

### Changed
- [TICKET-ID]: <Breaking Changes>
```

**Schritt 5.2: User Documentation (falls neue Features)**

Falls User-facing Features:
- Update User Documentation
- Erstelle Guides/Tutorials falls notwendig
- Update API Documentation

### 6. Retrospective & Metrics

**Dokumentiere Learnings in `docs/tickets/done_TICKET-[ID]-*.md`:**

Ergänze am Ende:

```markdown
## Retrospective

### Metrics
- **Actual Effort:** [Zeit für Implementation]
- **Estimated Effort:** [Ursprüngliche Schätzung aus Ticket]
- **Variance:** [+/- X%]

### What went well?
- [Positive Punkte]

### What could be improved?
- [Verbesserungspotenziale]

### Learnings for future tickets
- [Erkenntnisse für ähnliche Tickets]

### Recommendations
- [Empfehlungen für Prozess/Architektur]
```

**Purpose:** Diese Daten helfen bei zukünftiger Effort Estimation (siehe Phase 2 Ticket-Größen).

### 7. Merge to Main

**Erst nach APPROVAL durch Architekten!**

**Option A: Architekt merged (empfohlen)**
- Architekt führt Merge durch
- Architekt löscht Working Branch

**Option B: KI-Agent merged (nur mit expliziter Erlaubnis)**

Conventional Commits Format (siehe Agent Contract):

```bash
git checkout main
git pull origin main
git merge <working-branch> --no-ff
git push origin main
git branch -d <working-branch>
git push origin --delete <working-branch>
```

**Nach Merge:**
```bash
git tag -a v[X.Y.Z] -m "Release [X.Y.Z]: TICKET-[ID]"
git push origin v[X.Y.Z]
```

### 8. Staging Deployment (Optional, falls Staging Environment existiert)

**Deploy to Staging:**
```bash
# Projekt-spezifischer Deployment Command (siehe commands.md)
npm run deploy:staging
```

**Smoke Tests:**
- [ ] Application startet ohne Fehler
- [ ] Kritische Endpoints erreichbar
- [ ] Neue Features sind verfügbar
- [ ] Keine offensichtlichen Bugs

**Rollback Plan ready:**
- Falls Staging Deployment fehlschlägt: Rollback zu vorheriger Version

### 9. Production Deployment (Optional, nach Architekt-Freigabe)

**Nur wenn explizit vom Architekten freigegeben!**

**Pre-Deployment Checklist:**
- [ ] Staging Tests erfolgreich
- [ ] Architekt hat Deployment genehmigt
- [ ] Rollback Plan dokumentiert
- [ ] Monitoring/Alerts aktiv
- [ ] Maintenance Window kommuniziert (falls notwendig)

**Deployment:**
```bash
npm run deploy:production  # siehe commands.md
```

**Post-Deployment Monitoring:**
- [ ] Health Checks grün
- [ ] Error Rates normal
- [ ] Performance Metrics im Rahmen
- [ ] Logs zeigen keine kritischen Fehler

**Falls Probleme:** Rollback ausführen!

### 10. Ticket Closure

**Schritt 10.1: Ticket Status Update**
- Öffne `docs/tickets/done_TICKET-[ID]-*.md`
- Füge hinzu:
  ```markdown
  ## Closure
  
  **Status:** CLOSED
  **Merged to main:** [Date]
  **Deployed to production:** [Date / N/A]
  **Closed by:** Architect
  ```

**Schritt 10.2: Cleanup**
- Archiviere Ticket (bereits `done_` Prefix)
- Update Backlog (siehe `docs/planning/backlog.md`)
- Markiere Dependencies als "unblocked"

### 11. Stakeholder Communication

**Informiere den Architekten:**

> "TICKET-[ID] ist vollständig abgeschlossen:
> ✅ PR merged to main
> ✅ [Optional: Deployed to staging/production]
> ✅ Documentation updated
> ✅ Retrospective documented
> 
> Bereit für nächstes Ticket."

**Optional: Demo/Showcase**
- Falls signifikante Feature: Demo für Stakeholder vorbereiten

## Exit-Kriterium

✅ Code Review approved  
✅ Pull Request merged to main  
✅ Release Notes/Changelog updated  
✅ Retrospective dokumentiert  
✅ Metrics erfasst (Actual vs. Estimated Effort)  
✅ Staging Deployment erfolgreich (falls applicable)  
✅ Production Deployment erfolgreich (falls applicable)  
✅ Ticket Status: CLOSED  
✅ Backlog updated  
✅ Architekt informiert  

Zurück zu **Phase 3** für nächstes Ticket (Human Dispatch) oder **Phase 2** für neues Feature Planning.

