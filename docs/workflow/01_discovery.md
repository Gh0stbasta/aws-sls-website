# Phase 1: Discovery & Architecture

**ZIEL:** Das Problem vollständig verstehen, Geschäftsziele klären und technische Leitplanken fixieren. Erst wenn dieser Phase EXIT-Kriterien erfüllt sind, darf Phase 2 starten.

## Deine Aufgaben

### 1. Requirements Engineering (Strukturiert)

Lies den initialen User-Input und führe ein strukturiertes Discovery Interview durch.

**Zu klärende Fragen:**

**Business & Ziele:**
- Was ist das Geschäftsziel? Welchen Business-Value soll das Projekt liefern?
- Wer sind die Endnutzer/Stakeholder?
- Was sind die Top 3 Success Criteria für dieses Projekt?
- Gibt es Hard Deadline oder Budget Limits?

**Funktionale Anforderungen:**
- Welche User Stories / Use Cases sind MUST-HAVE?
- Was ist explizit OUT OF SCOPE?
- Welche integrierten Systeme/APIs sind notwendig?

**Non-Functional Requirements (NFRs):**
- Performance: Wie schnell muss das System sein? (z.B. <200ms Response Time)
- Skalierbarkeit: Wie viele concurrent users/requests?
- Verfügbarkeit/Zuverlässigkeit: SLA-Anforderungen?
- Sicherheit: Welche Compliance-Standards (GDPR, SOC2, etc.)?
- Data: Wie viel Datenvolumen? Welche Retention-Policy?

**Stakeholder & Kontext:**
- Wer genehmigt/reviewt Architekturentscheidungen? (der Architekt)
- Gibt es Legacy-Systeme, die integriert werden müssen?
- Team-Größe und Skill-Level?

**Aktion:** Dokumentiere alle Antworten in `docs/discovery/requirements.md`. Stelle Fragen, bis du keine Unklarheiten mehr hast. **Der Architekt muss alle kritischen Anforderungen genehmigen**, bevor du weitermachst.

### 2. Scope Definition

Erstelle ein explizites **In-Scope / Out-of-Scope** Dokument.

- **In Scope:** Alle MUST-HAVE Features und Anforderungen
- **Out of Scope:** Features, die NICHT Teil dieses Projekts sind
- **Future Scope:** Nice-to-have Features für später

Speichern unter: `docs/discovery/scope.md`

### 3. Architecture Decision Records (ADRs)

Bevor wir Tickets schreiben, müssen alle technologischen Entscheidungen geklärt sein.

**ADR-000 – Agile Prozess & Standards** (PFLICHT)
Dokumentiert:
- Arbeitsweise (4-Phasen-Workflow, Phase Locking, Human Dispatch)
- Code-Qualitätsstandards (500-Zeilen-Limit, Enterprise-Level Code)
- Definition of Done
- Referenz zum Agent Contract

**Weitere ADRs, falls notwendig:**
- **ADR-001:** Programmiersprache & Framework (z.B. "Warum TypeScript + React?")
- **ADR-002:** Datenbankwahl (z.B. "Warum PostgreSQL statt MongoDB?")
- **ADR-003:** Authentication & Authorization Strategie
- **ADR-004:** API Design Pattern (z.B. REST vs. GraphQL)
- **ADR-005:** Caching Strategie
- **ADR-006:** Logging & Monitoring Strategie
- Etc.

**ADR Template:** Verwende [docs/templates/ADR_TEMPLATE.md](../../templates/ADR_TEMPLATE.md)

**Aktion:** Erstelle alle notwendigen ADRs in `docs/adrs/`. **Der Architekt muss jede ADR genehmigen** bevor es weitergeht.

### 4. Technical Constraints & Infrastructure

Definiere die technischen Rahmenbedingungen:

- **Infrastruktur:** Cloud (AWS/GCP/Azure) oder On-Premise?
- **Deployment:** Containerized (Docker/Kubernetes)? Serverless?
- **Data Storage:** Wo werden Daten gespeichert? Backups?
- **External Dependencies:** Welche Third-Party Services sind notwendig? (z.B. Payment, Email, Analytics)
- **Development Environment:** DevContainer Anforderungen? Was muss installiert sein?

Speichern unter: `docs/discovery/infrastructure.md`

### 5. Risk Assessment

Identifiziere potenzielle Risiken und Mitigation Strategien:

- **Technical Risks:** z.B. "Neue Technologie, niemand hat Erfahrung"
- **Business Risks:** z.B. "Tight Deadline könnte Quality gefährden"
- **Integration Risks:** z.B. "Third-Party API könnte unreliable sein"
- **Data Risks:** z.B. "Große Datenmengen könnten zu Performance Issues führen"

Für jedes Risiko: **Mitigation Strategy** definieren.

Speichern unter: `docs/discovery/risks.md`

### 6. Initial Data Model & API Sketch

Skizziere eine erste Version des **Data Model** und der **API**:

- Entity Relationship Diagram (ERD) oder Entity List
- Erste API Endpoints (z.B. `/users`, `/products`, etc.)
- Nur Skizze – wird in Phase 2 verfeinert

Speichern unter: `docs/discovery/data-model.md` und `docs/discovery/api-sketch.md`

### 7. CI/CD & Testing Strategy

Überlege, wie Code gebaut, getestet und deployed wird:

- **Testing Levels:** Unit Tests, Integration Tests, E2E Tests
- **CI/CD Pipeline:** GitHub Actions, GitLab CI, etc.
- **Deployment Strategy:** Dev, Staging, Production Environments
- **Rollback Strategy:** Wie handlest du Deployment-Fehler?

Speichern unter: `docs/discovery/ci-cd-strategy.md`

### 8. Approval Gate (WICHTIG!)

Vor dem Exit aus Phase 1 **muss der Architekt explizit approval geben**:

- ✅ Alle Anforderungen sind dokumentiert und klar
- ✅ ADRs sind genehmigt
- ✅ Scope ist klar definiert (In/Out)
- ✅ Risiken sind identifiziert
- ✅ Technische Architektur ist skizziert

**Aktion:** Erstelle ein `docs/discovery/APPROVAL.md` Dokument mit Genehmigung des Architekten.

## Exit-Kriterium

✅ Requirements vollständig dokumentiert und genehmigt  
✅ Scope klar definiert (In/Out/Future)  
✅ Alle kritischen ADRs erstellt und genehmigt  
✅ Infrastructure & Technical Constraints definiert  
✅ Risk Assessment abgeschlossen  
✅ Data Model & API Sketch vorhanden  
✅ CI/CD & Testing Strategy definiert  
✅ **Architekt hat Phase 1 explizit freigegeben**

Du bist bereit für Phase 2 (Planning).
