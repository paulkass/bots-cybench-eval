# bots-cybench-eval paper

LaTeX source for the submission draft **“Offensive CTFs and SOC Investigations Stress Different Agent Behaviors.”** The paper summarizes experiments and findings from the separate source evaluation repository, with detailed provenance for quantitative claims recorded in `tables/provenance.md`.

## Build

```bash
make paper
```

This writes `paper.pdf` locally. The appendix is part of `paper.tex` and the same PDF. Generated PDFs and LaTeX build artifacts are ignored by git.

## Clean

```bash
make clean
```

## Source provenance

- Quantitative results are sourced from the source evaluation repository's `charts/` artifacts and raw Inspect `.eval` logs.
- Detailed paper-to-source mapping lives in `tables/provenance.md`; reviewer-facing robustness checks are consolidated into the appendix in `paper.tex`.
- The figures in `figures/` are copied chart artifacts from the source project, not regenerated in this repo.
- Raw `.eval` logs and secrets should not be copied into this paper repo.

## Template provenance

`arxiv.sty` is vendored from [`kourgeorge/arxiv-style`](https://github.com/kourgeorge/arxiv-style), which is MIT licensed. The upstream license is included in `LICENSE-arxiv-style.txt`.
