# Backlog & Priorisierung

## Priority 1: CRITICAL (Start Phase 3 immediately)

Tickets in dieser Priority müssen sequenziell abgearbeitet werden - sie bilden den Critical Path.

| Ticket | Title | Effort | Status | Est. Days |
|--------|-------|--------|--------|-----------|
| 001 | Project Setup & Monorepo | S | OPEN | 1 |
| 002 | CDK Infrastructure (S3 + CloudFront) | M | OPEN | 2-3 |
| 003 | Frontend Setup (Vite + React + TS) | S | OPEN | 1 |
| 013 | GitHub Actions CI/CD Pipeline | M | OPEN | 1-2 |

**Rationale:**
- TICKET-001: Foundation für alles andere
- TICKET-002: Infrastructure muss vor Deploy Pipeline existieren
- TICKET-003: Frontend braucht sein Setup bevor Komponenten gebaut werden
- TICKET-013: Deployment muss am Ende ready sein

---

## Priority 2: HIGH (Start after P1 Critical Path)

Diese Tickets bauen auf P1 auf und sind meistens parallel startbar.

| Ticket | Title | Effort | Status | Est. Days |
|--------|-------|--------|--------|-----------|
| 004 | Tailwind CSS & Theme System | S | OPEN | 1 |
| 005 | Layout Components (Header, Footer) | S | OPEN | 1 |
| 006 | Hero Section | M | OPEN | 2 |
| 010 | Quick Start Section | S | OPEN | 1 |
| 012 | Documentation | S | OPEN | 1 |

**Rationale:**
- TICKET-004: Styling System ist dependency für alle Components
- TICKET-005: Layout Components (Header/Footer) werden von vielen Sections benutzt
- TICKET-006, 010: Key User-Facing Sections
- TICKET-012: Documentation sollte kontinuierlich aktualisiert werden

---

## Priority 3: MEDIUM (Parallel work, nice-to-have)

Diese Tickets können parallel laufen nach P2.

| Ticket | Title | Effort | Status | Est. Days |
|--------|-------|--------|--------|-----------|
| 007 | Features Section | M | OPEN | 2 |
| 008 | Architecture Section | M | OPEN | 2 |
| 009 | Code Examples Section | M | OPEN | 2 |
| 011 | Animations (Framer Motion) | M | OPEN | 2 |

**Rationale:**
- Alle Dependencies (004, 005) sind erfüllt
- Können parallel ohne Blockade arbeiten
- Animations (011) kommt am Ende, wenn alle Sections existieren

---

## Work Ordering for Phase 3

Empfohlene Reihenfolge für Agent/Developer:

### Week 1: Infrastructure & Setup
```
Day 1:  TICKET-001 (Project Setup)
Day 2-3: TICKET-002 (CDK Infrastructure)
Day 2-3: TICKET-003 (Frontend Setup) [parallel with 002]
```

### Week 2: Styling & Layout
```
Day 4:  TICKET-004 (Tailwind Theme)
Day 5:  TICKET-005 (Header/Footer Components)
```

### Week 2-3: Frontend Sections (Parallel)
```
Day 6-7: TICKET-006 (Hero Section)
Day 6-7: TICKET-007 (Features Section) [parallel]
Day 6-7: TICKET-008 (Architecture Section) [parallel]
Day 6-7: TICKET-009 (Code Examples) [parallel]
Day 8:   TICKET-010 (Quick Start)
```

### Week 3: Polish & Deploy
```
Day 9:  TICKET-011 (Animations)
Day 10: TICKET-012 (Documentation)
Day 10: TICKET-013 (CI/CD Pipeline) [can start earlier if 002 done]
```

---

## Phase 2 Exit Criteria

✅ Alle Tickets sind erstellt
✅ Dependencies sind mapped
✅ Priorisierung ist klar
✅ Effort Estimates sind gemacht
✅ Contract-First Definition ist für alle Tickets vorhanden
✅ Backlog ist ready for implementation

**Next:** Architekt Review → Phase 3 Start
