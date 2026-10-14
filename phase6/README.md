# EduFace (static HTML edition) - Phase 6: Help, self-test and compliance documents

A complete copy: everything from phases 1-5 is included, plus the additions below.

## What this phase contains
- Built-in help: staff training guide, privacy checklist, accuracy test plan, deployment notes
- Self-test page that runs the app's own checks in your browser
- Demo data loader for training (never on a live school)

## Run it
1. Double-click **start.bat** (or run `.\serve.ps1 -Open` in PowerShell). It starts a tiny web server on this computer only and opens http://localhost:8080.
2. First time: create the school and administrator. Nothing needs installing; no internet is needed.
3. Stop it with Ctrl+C in the black window.

## Important
- All data is stored **in this browser on this computer**. A different browser, profile or computer sees nothing. Clearing browser data deletes everything (use Backup).
- Each phase uses its own browser database (`EduFace-phase6`), so phases do not interfere with each other.
- The camera works only on http://localhost or https, which is why start.bat is used instead of opening index.html directly.

## Database schema (MySQL)
The `db/` folder holds the MySQL 8 schema (`V001`-`V003` scripts and `SCHEMA.md`). This browser edition does not use it; it is the database design for a server-backed version.
