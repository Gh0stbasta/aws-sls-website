# Agent Workflow

Ein strukturiertes **Grundgerüst für KI-gesteuerte Softwareentwicklung**, in dem der **Architekt (Mensch)** die KI als ausführenden Coder leitet und den Rahmen setzt. 

Die KI arbeitet nach einem klaren **4-Phasen-Workflow** und scannt bei jedem Durchlauf die hinterlegten Regeln, um mit frischem Kontext an die Leitplanken erinnert zu werden. Issues und Tickets werden sequenziell vom KI-Agent abgearbeitet – der Mensch behält das Steuer.

## 📋 Struktur

### Workflow-Phasen
Das System gliedert sich in 4 durcheinanderfolgende Phasen:

- **[agentContract.md](workflow/agentContract.md)** – Agent-Vertrag: Die 3 Gesetze, DoD, Enterprise-Standards, Governance
- **[01_discovery.md](workflow/01_discovery.md)** – Requirements Engineering, Scope Definition, ADRs, Risks
- **[02_planning.md](workflow/02_planning.md)** – Backlog-Planung, Ticket-Zerlegung, Dependency Mapping
- **[03_implementation.md](workflow/03_implementation.md)** – Contract-First Implementation, Code Quality Gates
- **[04_review.md](workflow/04_review.md)** – Code Review, Testing, Deployment, Retrospective

### Dokumente & Templates
- **[docs/templates/TICKET_TEMPLATE.md](docs/templates/TICKET_TEMPLATE.md)** – Template für Tickets mit Contract Definition
- **[docs/templates/ADR_TEMPLATE.md](docs/templates/ADR_TEMPLATE.md)** – Template für Architecture Decision Records

### Ordnerstruktur
```
docs/
├── discovery/          # Phase 1: Requirements, Scope, Risk Assessment
├── planning/           # Phase 2: Backlog, Dependency Graph
├── tickets/            # Phase 3: Ticket-Dateien (done_TICKET-[ID].md)
├── adrs/               # Architecture Decision Records
├── releases/           # Phase 4: Release Notes, Changelog
└── templates/          # Templates für TICKET, ADR
```

## 🏗️ Wie es funktioniert

1. **Regeln hinterlegen:** Der Architekt definiert die Arbeitsweise, Standards und Leitplanken als Dokumentation im Projekt
2. **KI-Agent scannt:** Bei jedem Durchlauf liest die KI diese Regeln und wird mit frischem Kontext erinnert
3. **Tickets abarbeiten:** Issues werden sequenziell vom KI-Agent ausgeführt – immer eine Aufgabe nach der anderen
4. **Mensch leitet:** Der Architekt behält die Kontrolle, genehmigt Architekturentscheidungen und deponiert neue Anforderungen
5. **Feedback-Loop:** Nach jedem Ticket: Review → Retrospective → Lessons Learned → Verbesserung der Workflows

## 🎯 Kernprinzipien

### 3 eiserne Gesetze (siehe agentContract.md)

1. **Human Dispatch Protocol** – Nur der Mensch entscheidet, welche Tickets bearbeitet werden
2. **Strict Phase Locking** – Jede Phase hat klare Ein- und Ausgangskriterien; keine Phase ohne Prerequisite
3. **Definition of Done (DoD)** – 9 erfüllte Kriterien vor Ticket-Abschluss

### Enterprise-Level Code-Standards (siehe agentContract.md)

- **Modularität:** Code < 500 Zeilen pro File, lose Kopplung
- **Architektur:** SOLID, Clean Architecture, Design Patterns
- **Lesbarkeit:** Selbstdokumentierender Code, aussagekräftige Namen
- **Performance:** Effiziente Algorithmen, Bottleneck-Dokumentation
- **Fehlerbehandlung:** Explizit, keine Silent Failures

### DevContainer & Versionskontrolle

- **DevContainer:** Isolierte, reproduzierbare Entwicklungsumgebung (PFLICHT Phase 3)
- **Git:** Conventional Commits, Working Branch Strategy, Checkpoints pro Ticket

## 🚀 Schnelstart für neues Projekt

1. **Kopiere diesen Ordner** als Basis für dein Projekt
2. **Aktualisiere `agentContract.md`** – Passe Enterprise-Standards an dein Tech-Stack an
3. **Phase 1 starten:** Discovery durchführen → `docs/discovery/requirements.md` füllen
4. **ADRs erstellen:** Technische Entscheidungen dokumentieren → `docs/adrs/`
5. **Phase 2:** Backlog planen, Tickets erstellen → `docs/planning/backlog.md`
6. **Phase 3:** "Bearbeite TICKET-[ID]" → KI-Agent implementiert
7. **Phase 4:** Code Review, Testing, Deployment

## 📊 Ticket-Größen (für KI-Agents)

| Größe | KI Effort | Human Effort | Best für |
|-------|-----------|-------------|----------|
| **XS** | ~10 min | ~1-2 h | Bug Fixes, kleine Configs |
| **S** | ~30 min | ~3-4 h | Single Endpoint, Unit Tests |
| **M** | ~1 h | ~4-8 h | Multi-Endpoint Features |
| **L** | ~4 h | ~1-2 Tage | Komplexe Features → **AUFTEILEN!** |

⚠️ **Hinweis:** XS-Tickets bevorzugen – höchste Erfolgsquote für KI-Agents.

## ⚠️ Wichtige Grenzen & Hinweise

### KI-Agent Realität
- **Nicht autonom:** KI benötigt Steuerung und Feedback vom Architekten
- **Junior Developer Mentalität:** Code muss vor Production validiert werden
- **Business-Value Validierung:** Jedes Ticket muss auf echten Business-Value überprüft werden

### Projektspezifische Anpassung
- **Template, kein Standard:** Passe dieses Gerüst an dein Projekt und dein Team an
- **Experimentieren:** Finde die beste Arbeitsweise für deinen Projekttyp
- **Continuous Improvement:** Dokumentiere Learnings → zukünftige Tickets verbessern

### Kalibrierung
- Ticket-Größen sind **Startwerte**, nicht Absoluta
- Starte mit 2-3 Tickets, miss tatsächliche Zeiten
- Aktualisiere Tabelle basierend auf empirischen Daten
- Retrospektiven dokumentieren (siehe Phase 4)

## 📚 Weitere Ressourcen

- **Agent Contract:** [workflow/agentContract.md](workflow/agentContract.md) – Zentrale Governance
- **Phase 1 Details:** [workflow/01_discovery.md](workflow/01_discovery.md)
- **Phase 2 Details:** [workflow/02_planning.md](workflow/02_planning.md)
- **Phase 3 Details:** [workflow/03_implementation.md](workflow/03_implementation.md)
- **Phase 4 Details:** [workflow/04_review.md](workflow/04_review.md)

---

**Version:** 2.0  
**Letzte Aktualisierung:** Januar 2026  
**Status:** Production-Ready

