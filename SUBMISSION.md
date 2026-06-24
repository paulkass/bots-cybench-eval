# Submission readiness notes

Current target: no specific venue, current `arxiv.sty` style, non-anonymous submission, 5 pages or fewer. Appendices/supplements are allowed, but no code artifact is planned for this submission.

## Build target

- Submission PDF: `make paper` → `paper.pdf`
- Optional supplement: `make supplement` → `paper-supplement.pdf`
- Optional anonymous build for future venues: `make paper-anonymous` → `paper-anonymous.pdf`
- Clean generated artifacts: `make clean`

Generated PDFs and LaTeX build files are ignored by git.

## Required checks before submission

```bash
make paper
make supplement
pdfinfo paper.pdf | grep -E 'Title|Author|Pages|Page size'
pdfinfo paper-supplement.pdf | grep -E 'Title|Author|Pages|Page size'
grep -n "undefined\|Citation.*undefined\|Overfull\|! LaTeX Error" paper.log paper-supplement.log || true
git diff --check
```

Expected state: `paper.pdf` builds successfully, is 5 pages or fewer in the current style, has author `Paul Kassianik`, and has no undefined citations or LaTeX errors. The supplement should build if the chosen venue allows appendices/supplemental PDFs.

## Current submission choices

- Style: keep current `arxiv.sty`.
- Anonymity: non-anonymous.
- Author/affiliation: `Paul Kassianik` / `Stealth Company`.
- Artifact policy: submit `paper.pdf`; include `paper-supplement.pdf` only if the venue permits supplemental/appendix PDFs. Do not submit source, code, raw logs, or provenance files unless a later venue requires them.
- Provenance: keep `tables/provenance.md` as an internal audit aid, with local machine paths sanitized to logical source paths; `supplement.tex` is the reviewer-facing sanitized aggregate version.

## If appendices or supplements are requested later

Use `supplement.tex` / `paper-supplement.pdf` for reviewer-facing aggregate provenance and uncertainty checks. Use `tables/provenance.md` only as an internal audit source. Do **not** include raw `.eval` logs, `.env` files, provider credentials, private transcripts, or secrets.

## Additional experiment policy

No additional experiments are planned for this submission; existing logs now support uncertainty, robustness, the Claude Opus 4.8 Cybench sanity check, and BOTSv1 no-tools contamination probes. If an extra run is explicitly approved later, prioritize perturbed BOTSv1 questions or a prerequisite-context ablation, run it through Inspect, and stay within the `$500` budget. Do not run BOTS v2/v3 for this submission cycle; only Cybench or BOTSv1 follow-up runs are in scope, and BOTS runs must use the approved non-prod Kubernetes `pk-bots-eval` setup.
