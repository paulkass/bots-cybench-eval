# AGENTS.md

Guidance for agents working in this paper repository.

## Project purpose

This repository is for drafting a paper about the evaluation findings produced in:

- `~/projects/inspect-cyber-eval/`

Treat that directory as the experimental/source-artifact repository. Treat this repository as the paper-writing workspace.

## Source-of-truth artifacts

Before making substantive claims, inspect the relevant source artifacts in `~/projects/inspect-cyber-eval/`:

- `CLAUDE.md` — repository architecture, evaluation commands, and operational caveats.
- `README.md` — high-level setup and result-viewing workflow.
- `charts/README.md` — chart methodology, invariants, non-invariants, source-log audit, and cost-accounting caveats.
- `charts/cybench_cost_table.csv` and `charts/cybench_cost_table.md` — tabulated chart inputs.
- `charts/*.png` / `charts/*.html` — generated result visualizations and reports.
- `logs/*.eval` — raw Inspect evaluation logs; use these as the highest-fidelity source when verifying scores, costs, model settings, sample outcomes, or transcripts.
- `bots/README.md` — BOTS benchmark details, sandbox behavior, and dataset notes.

Do not treat prose summaries as sufficient evidence for paper claims when raw logs or generated tables are available.

## Messaging direction sources

Use these documents for narrative framing, audience, and slide-derived messaging direction:

- Notion: [Evaluating Models for Security Operations](https://app.notion.com/p/Evaluating-Models-for-Security-Operations-3806c323786880faa4a2cfde52eefb2d)
- Notion: [Actual Deck](https://app.notion.com/p/Actual-Deck-3826c3237868805a8c13e4917ebbb71f?source=copy_link)
- `~/projects/inspect-cyber-eval/docs/actual-deck.odp` — local OpenDocument presentation corresponding to the deck messaging.

Treat these as messaging and positioning guidance, not evidence for numeric claims. When drafting paper prose, align framing with these documents where appropriate, but continue to verify quantitative and methodological claims against the source-of-truth artifacts above.

## Working rules

- Do not modify `~/projects/inspect-cyber-eval/` unless the user explicitly asks; read from it for evidence.
- Do not rerun benchmarks or launch Docker/Kubernetes workloads unless explicitly requested.
- Do not copy large raw `.eval` logs, datasets, `.env` files, or secrets into this paper repo unless explicitly requested.
- Preserve provenance for every quantitative claim: record the source file path, log filename, chart/table row, and any relevant caveat.
- If adding agent-only plans, notes, or research artifacts later, place them under `.agents/docs/` and keep `AGENTS.md` short.

## Paper-writing conventions

- Prefer precise benchmark names: Cybench, BOTS v1, BOTS v2, BOTS v3, Inspect.
- Distinguish benchmark results from harness/engineering findings.
- Be explicit about experimental non-invariants documented in `charts/README.md` (for example cost limits, provider routing, concurrency, missing/restored logs, and provider-specific cost accounting).
- Avoid overclaiming model-to-model comparisons unless the source methodology shows the run conditions were controlled enough for that claim.
- When citing costs, state whether numbers include only model-token costs or include priced external-tool calls.
- When discussing BOTS results, specify the version and scoring basis (`bots_points`, exact match, or another metric) rather than saying simply "BOTS score".

## Validation before finalizing text

Before saying a section, table, or figure is ready:

1. Re-check the source file(s) in `~/projects/inspect-cyber-eval/`.
2. Confirm all numeric values match the current table/log/report.
3. Confirm caveats from `charts/README.md` are reflected where relevant.
4. Confirm no secrets, API keys, raw private logs, or unnecessary large artifacts were added to this repo.
