# ADR-000: Agile Process & Development Standards

**Date:** 2026-01-28  
**Status:** ACCEPTED

---

## Context

Dieses Projekt folgt einem strukturierten **4-Phasen-Workflow** für KI-gesteuerte Softwareentwicklung. Der Mensch (Architekt) leitet, die KI (Agent) führt aus.

Es ist essenziell, dass klare Regeln, Standards und Prozesse definiert sind, bevor Code geschrieben wird.

---

## Decision

Wir folgen dem **Agent Workflow** mit strikten Phasen und Enterprise-Level Code-Standards.

### 4-Phasen-Workflow

1. **Phase 1: Discovery & Architecture**
   - Requirements Engineering
   - Scope Definition
   - ADRs (Architecture Decision Records)
   - Risk Assessment

2. **Phase 2: Planning & Backlog**
   - Requirement Breakdown
   - Ticket-Erstellung (Contract-First)
   - Dependency Mapping
   - Priorisierung

3. **Phase 3: Implementation**
   - Ticket-basierte Entwicklung
   - Contract-First Development
   - Code Quality Gates
   - DevContainer-Pflicht

4. **Phase 4: Review & Deployment**
   - Code Review
   - Testing & Validation
   - Deployment
   - Retrospective

### Die 3 ehernen Gesetze

1. **Human Dispatch Protocol:**
   - KI entscheidet niemals selbst, welches Ticket bearbeitet wird
   - Expliziter Befehl erforderlich: "Bearbeite TICKET-[ID]"
   - Immer nur ein Ticket gleichzeitig

2. **Strict Phase Locking:**
   - Kein Code ohne Ticket (Phase 3 benötigt Phase 2)
   - Keine Tickets ohne Architektur (Phase 2 benötigt Phase 1)
   - Exit-Kriterien jeder Phase müssen erfüllt sein

3. **Definition of Done (DoD):**
   - Contract-First Development vollständig umgesetzt
   - Alle Tests grün, aussagekräftige Coverage
   - Code lesbar, wartbar, Enterprise-Standards
   - Inline-Dokumentation (Warum-Kommentare)
   - README.md in neuen Ordnern
   - Git Commit mit Conventional Commits
   - Ticket-Summary erstellt
   - Architekten-Review durchgeführt

### Enterprise-Level Code-Standards

- **Modularität:** Wiederverwendbare, lose gekoppelte Module
- **Dateigröße:** Max. 500 Zeilen Code pro File
- **Software-Architektur:** SOLID, Clean Architecture, Design Patterns
- **Separation of Concerns:** Eine Verantwortlichkeit pro Komponente
- **Lesbarkeit:** Selbstdokumentierender Code, aussagekräftige Namen
- **Performance:** Effiziente Algorithmen, dokumentierte Bottlenecks
- **Fehlerbehandlung:** Explizite Error Handling Strategien

### Development Environment

- **DevContainer-Pflicht:** Phase 3 erfolgt in isolierter Umgebung
- **Git als Checkpoint:** Commit nach jedem Ticket (Conventional Commits)
- **Working Branch:** Alle Changes im aktuellen Branch, Mensch mergt

---

## Rationale

**Warum dieser strikte Workflow?**

1. **Reproduzierbarkeit:** Jeder Schritt ist nachvollziehbar und wiederholbar
2. **Qualitätssicherung:** Klare Gates verhindern technische Schulden
3. **KI-Steuerung:** KI braucht klare Leitplanken für konsistente Ergebnisse
4. **Architektur-Kontrolle:** Mensch behält Kontrolle über kritische Entscheidungen
5. **Wartbarkeit:** Enterprise-Standards sichern langfristige Codequalität

**Considered Alternatives:**

1. **Ad-hoc Development** - Verworfen: Keine Struktur, hohe Fehlerrate bei KI
2. **Waterfall-Ansatz** - Verworfen: Zu unflexibel für iterative Entwicklung
3. **Pure Agile (ohne Phasen)** - Verworfen: KI benötigt klarere Struktur

---

## Consequences

### Positive

- ✅ Hohe Code-Qualität durch klare Standards
- ✅ Nachvollziehbare Architektur-Entscheidungen (ADRs)
- ✅ Reduziertes Risiko durch Phase Gates
- ✅ KI kann strukturiert arbeiten
- ✅ Mensch behält Kontrolle

### Negative

- ⚠️ Höherer initialer Aufwand (Dokumentation, ADRs)
- ⚠️ Weniger Flexibilität bei schnellen Änderungen
- ⚠️ Strikte Regeln können als "overhead" empfunden werden

### Risks

- **Risiko:** Entwickler ignorieren Phase-Locking und überspringen Gates
  - **Mitigation:** Automated Checks in CI/CD, Code Review Checkliste

- **Risiko:** Dokumentation wird nicht aktuell gehalten
  - **Mitigation:** DoD verlangt Dokumentations-Updates bei jedem Ticket

---

## References

- [Agent Contract (agentContract.md)](../workflow/agentContract.md)
- [Phase 1: Discovery (01_discovery.md)](../workflow/01_discovery.md)
- [Phase 2: Planning (02_planning.md)](../workflow/02_planning.md)
- [Phase 3: Implementation (03_implementation.md)](../workflow/03_implementation.md)
- [Phase 4: Review (04_review.md)](../workflow/04_review.md)

---

## Approval

**Architekt:** ✅ ACCEPTED  
**Datum:** 2026-01-28

Diese ADR ist die Grundlage für alle weiteren Architektur-Entscheidungen.
