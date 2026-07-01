# Submission readiness notes

Current target: CAMLIS 2026. Prefer a double-blind, PMLR-formatted full paper: minimum 10 pages, aim for no more than 20 pages excluding references. Use the max-4-page extended abstract route only if the scope must shrink.

Experimental/source-artifact repo: `~/projects/inspect-cyber-eval/`. Treat this repository as the paper-writing workspace and verify quantitative claims against that repo's logs, tables, and charts before submission.

## CAMLIS target requirements

- Submit through Microsoft CMT: `https://cmt3.research.microsoft.com/CAMLIS2026/Submission/Index`.
- Scope: applied AI/ML, data science, statistics, or analytics for real-world information security problems.
- Framing: research contribution, not a vendor/product showcase.
- Review: double-blind; remove author/research-group identifiers and cite own prior work in third person.
- Format: PMLR template.
- Presentation outcomes: talk or poster; talks are about 20 minutes plus up to 5 minutes Q&A and may be recorded.
- Proceedings: full papers may be considered for PMLR proceedings if sufficiently novel and not in dual-submission conflict.
- AI policy: AI assistance is acceptable for proofreading/readability; purely AI-generated submissions are desk-rejected.
- Key CFP dates recorded from CAMLIS site: opens April 7, closes June 26, notifications July 31.

## Build target

- Submission PDF: `make paper` → `paper.pdf`
- Clean generated artifacts: `make clean`

Generated PDFs and LaTeX build files are ignored by git.

## Required checks before submission

```bash
make paper
pdfinfo paper.pdf | grep -E 'Title|Author|Pages|Page size'
grep -n "Citation.*undefined\|Reference.*undefined\|Overfull\|! LaTeX Error" paper.log || true
git diff --check
```

Expected state for CAMLIS review: `paper.pdf` builds successfully, uses the PMLR template, is anonymized for double-blind review, respects the page target, and has no undefined citations or LaTeX errors. If appendices are used, confirm how CAMLIS/PMLR counts them before submission.

## Current submission choices

- Style: PMLR via the `jmlr` class with local support files for reproducible builds on the current TeX install.
- Draft author list: Paul Kassianik and Yaron Singer. Remove author identifiers before double-blind review submission; restore only if camera-ready instructions allow/require it.
- Artifact policy: submit `paper.pdf` only. Do not submit source, code, raw logs, or provenance files unless a later venue requires them.
- Provenance: keep `tables/provenance.md` as an internal audit aid, with local machine paths sanitized to logical source paths; the reviewer-facing aggregate version is the appendix in `paper.tex`.

## Additional experiment policy

No additional experiments are planned for this submission; existing logs now support uncertainty, robustness, the Claude Opus 4.8 Cybench sanity check, and BOTSv1 no-tools contamination probes. If an extra run is explicitly approved later, prioritize perturbed BOTSv1 questions or a prerequisite-context ablation, run it through Inspect, and stay within the `$500` budget. Do not run BOTS v2/v3 for this submission cycle; only Cybench or BOTSv1 follow-up runs are in scope, and BOTS runs must use the approved non-prod Kubernetes `pk-bots-eval` setup.
