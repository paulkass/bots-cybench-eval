# Submission readiness notes

Current target: no specific venue, current `arxiv.sty` style, non-anonymous submission, 5 pages or fewer. Appendices/supplements are allowed, but no code artifact is planned for this submission.

## Build target

- Submission PDF: `make paper` → `paper.pdf`
- Optional anonymous build for future venues: `make paper-anonymous` → `paper-anonymous.pdf`
- Clean generated artifacts: `make clean`

Generated PDFs and LaTeX build files are ignored by git.

## Required checks before submission

```bash
make paper
pdfinfo paper.pdf | grep -E 'Title|Author|Pages|Page size'
grep -n "undefined\|Citation.*undefined\|Overfull\|! LaTeX Error" paper.log || true
git diff --check
```

Expected state: `paper.pdf` builds successfully, is 5 pages or fewer in the current style, has author `Paul Kassianik`, and has no undefined citations or LaTeX errors.

## Current submission choices

- Style: keep current `arxiv.sty`.
- Anonymity: non-anonymous.
- Author/affiliation: `Paul Kassianik` / `Stealth Company`.
- Artifact policy: PDF only; do not submit source, code, raw logs, or provenance files unless a later venue requires them.
- Provenance: keep `tables/provenance.md` as an internal audit aid, with local machine paths sanitized to logical source paths.

## If appendices or supplements are requested later

Use `tables/provenance.md` as the source for an appendix/supplement, but sanitize again before upload. Do **not** include raw `.eval` logs, `.env` files, provider credentials, private transcripts, or secrets.

## Additional experiment policy

No additional experiments are planned for this submission. If an extra run is explicitly approved later, it must be run through Inspect and stay within the remaining `$500` experiment budget. Do not run BOTS v2/v3 for this submission cycle; only Cybench or BOTSv1 follow-up runs are in scope, and BOTS runs must use the approved non-prod Kubernetes `pk-bots-eval` setup.
