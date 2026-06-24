# Submission readiness notes

Current target: no specific venue, current `arxiv.sty` style, one consolidated author-visible PDF with appendices, and no code artifact planned.

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

Expected state: `paper.pdf` builds successfully, has author `Paul Kassianik`, includes the appendix in the same PDF, and has no undefined citations or LaTeX errors. If a venue imposes a strict main-text page limit, confirm how appendices are counted before submission.

## Current submission choices

- Style: keep current `arxiv.sty`.
- Author/affiliation: `Paul Kassianik` / `Stealth Company`.
- Artifact policy: submit `paper.pdf` only. Do not submit source, code, raw logs, or provenance files unless a later venue requires them.
- Provenance: keep `tables/provenance.md` as an internal audit aid, with local machine paths sanitized to logical source paths; the reviewer-facing aggregate version is the appendix in `paper.tex`.

## Additional experiment policy

No additional experiments are planned for this submission; existing logs now support uncertainty, robustness, the Claude Opus 4.8 Cybench sanity check, and BOTSv1 no-tools contamination probes. If an extra run is explicitly approved later, prioritize perturbed BOTSv1 questions or a prerequisite-context ablation, run it through Inspect, and stay within the `$500` budget. Do not run BOTS v2/v3 for this submission cycle; only Cybench or BOTSv1 follow-up runs are in scope, and BOTS runs must use the approved non-prod Kubernetes `pk-bots-eval` setup.
