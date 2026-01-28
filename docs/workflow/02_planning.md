# Phase 2: Planning & Backlog Creation

**ZIEL:** Den Projektumfang aus Phase 1 in ein strukturiertes, geprioritiertes Backlog von Tickets überführen. Jedes Ticket muss eine klare Architektur-Basis haben und Contract-First definiert sein.

## Deine Aufgaben

### 1. Requirement Breakdown (Domain-Driven)

Zerlege die Requirements basierend auf **Domains/Komponenten** (nicht willkürlich):

**Vorgehen:**
- Referenziere die **Data Model & API Sketch** aus Phase 1
- Identifiziere logische **Komponenten/Module** (z.B. Authentication Module, User Service, Payment Service)
- Zerlege jede Komponente in **User Stories** oder **Features**
- Achte auf **Abhängigkeiten** (z.B. DB Schema vor API Endpoints, Auth vor Protected Routes)

**Ticket-Größen Richtlinie (T-Shirt Sizing):**

| Größe | KI Agent Effort | Human Effort (ca.) | Beispiele |
|-------|----------------|-------------------|-----------|
| **XS** | ~10 min | ~1-2 Stunden | Bug Fix, kleine Config-Änderung, Doku-Update |
| **S** | ~30 min | ~3-4 Stunden | Single Endpoint, einfache Funktion, Unit Tests |
| **M** | ~1 Stunde | ~4-8 Stunden | Feature mit mehreren Endpoints, Integration |
| **L** | ~4 Stunden | ~1-2 Tage | Komplexe Feature über mehrere Komponenten – **AUFTEILEN empfohlen!** |
| **XL** | ~8 Stunden | ~2-4 Tage | **Nur in Ausnahmefällen!** Besser in kleinere Tickets aufteilen |

**📊 Legende & Hinweise:**

⚠️ **Diese Zeiten sind Richtwerte**, nicht empirisch belegt. Jedes Projekt sollte eigene Benchmarks etablieren:
- Starte mit 2-3 Tickets unterschiedlicher Größe
- Miss die tatsächliche Durchlaufzeit (inklusive Review-Schleifen)
- Kalibriere die Tabelle projektspezifisch

**✅ Best Practice für KI Agents:**
- **Bevorzuge XS-Tickets** (10-30 min) – höchste Erfolgsquote, geringste Fehleranfälligkeit
- XS-Tickets ermöglichen schnelle Feedback-Zyklen und präzise Checkpoints
- Größere Features in mehrere XS/S Tickets aufteilen statt ein L-Ticket

**Faustregeln:**
- KI-Agenten sind **schneller** bei klar strukturierten, repetitiven Aufgaben
- KI-Agenten sind **langsamer** bei Architektur-Entscheidungen, Debugging komplexer Edge Cases
- Human Effort beinhaltet Code-Review, Testing, Dokumentation – KI Effort nur reine Implementation

Ziel: **Jedes Ticket sollte in maximal 1 Sprint (2 Wochen) abgeschlossen sein.**

### 2. Dependency Mapping

Erstelle eine explizite **Dependency Chain**:

```
TICKET-001 (Auth Module) 
├── TICKET-002 (Login Endpoint) [depends on 001]
├── TICKET-003 (Protected Middleware) [depends on 001]
    └── TICKET-004 (User API) [depends on 003]
```

Speichere unter: `docs/planning/dependency-graph.md`

**Rule:** Tickets dürfen nur gestartet werden, wenn ihre Dependencies abgeschlossen sind.

### 3. Architektur-Kontext definieren

Bevor Tickets geschrieben werden, stelle sicher dass Referenzen zu Phase 1 klar sind:

- **Welche Komponente/Module wird betroffen?** (aus Data Model & API Sketch)
- **Welche ADRs sind relevant?** (siehe `docs/adrs/`)
- **Welche Patterns/Standards?** (siehe Agent Contract: Enterprise-Level Code-Standards)

Dies wird im Ticket-Template referenziert.

### 4. Ticket-Dateien erstellen

Erstelle für jedes Ticket eine Datei: `docs/tickets/TICKET-[ID]-[Kurztitel].md`

**Template:** Kopiere das Template von [docs/templates/TICKET_TEMPLATE.md](../../templates/TICKET_TEMPLATE.md)

---

## 🏗️ Ticket Template Reference

Siehe: [docs/templates/TICKET_TEMPLATE.md](../../templates/TICKET_TEMPLATE.md)

Jedes Ticket muss folgende Abschnitte enthalten:
- Context & Architecture
- User Story
- **Contract Definition** (ZUERST!)
- Acceptance Criteria
- Requirements (Definition of Done)
- Implementation Plan
- Dependencies
- Notes

---

### 5. Priorisierung & Ordering

Erstelle ein **geprioritiertes Backlog**:

```
Priority 1 (CRITICAL - Start Phase 3 immediately)
├── TICKET-001: Database Schema Setup
├── TICKET-002: Authentication Module

Priority 2 (HIGH - Start after P1)
├── TICKET-003: User API Endpoints
├── TICKET-004: Protected Middleware

Priority 3 (MEDIUM - Can be parallel)
├── TICKET-005: Logging & Monitoring
```

Speichere unter: `docs/planning/backlog.md`

**Priorisierungs-Kriterien:**
- Abhängigkeiten (muss andere Tickets unblockieren)
- Business Value (welche Feature bringt den meisten Value?)
- Risk (riskante Tickets früher implementieren)

### 6. Architektur Review Gate

Bevor der Mensch das Backlog genehmigt, **muss ein Architektur Review stattfinden**:

**Checkliste für Architekt:**

- [ ] Tickets basieren auf Phase 1 Requirements?
- [ ] Dependency Chain ist korrekt?
- [ ] Tickets referenzieren relevante ADRs?
- [ ] Contract-First Ansatz ist in jedem Ticket definiert?
- [ ] Ticket-Größen sind realistisch? (Keine XL Tickets)
- [ ] Priorisierung macht Business Sense?
- [ ] Acceptance Criteria sind testbar und konkret?

**Aktion:** Erstelle `docs/planning/ARCHITECTURE-REVIEW.md` mit Genehmigung.

### 7. Genehmigung durch Architekt

Der Mensch (Architekt) muss **explizit approve**:

```
✅ Alle Tickets sind gut strukturiert
✅ Architektur ist konsistent mit ADRs
✅ Contract-First ist durchgängig definiert
✅ Backlog ist priorisiert und ready for implementation
✅ Dependencies sind korrekt mapped
```

Erst dann darf Phase 3 (Implementation) starten.

## Exit-Kriterium

✅ Alle Tickets existieren als Dateien in `docs/tickets/`  
✅ Jedes Ticket hat einen klaren Contract (API/Interface definiert)  
✅ Dependency Graph ist dokumentiert  
✅ Backlog ist priorisiert  
✅ Ticket-Größen sind realistisch (max M, kein XL)  
✅ Acceptance Criteria sind testbar und konkret  
✅ **Architekt hat Phase 2 explizit freigegeben**  

Du bist bereit für Phase 3 (Implementation). Der Mensch wird dir explizit sagen: "Bearbeite TICKET-[ID]".
