# bots-cybench-eval paper

LaTeX source for the independent research preprint **“Offensive CTFs and SOC Investigations Measure Different Agent Skills.”** The paper summarizes experiments and findings from `~/projects/inspect-cyber-eval/`, with provenance for quantitative claims recorded in the paper appendix.

## Build

```bash
make paper
```

This writes `paper.pdf` locally. Generated PDFs and LaTeX build artifacts are ignored by git.

## Clean

```bash
make clean
```

## Source provenance

- Quantitative results are sourced from `~/projects/inspect-cyber-eval/charts/` and raw Inspect `.eval` logs in `~/projects/inspect-cyber-eval/logs/`.
- The figures in `figures/` are copied chart artifacts from the source project, not regenerated in this repo.
- Raw `.eval` logs and secrets should not be copied into this paper repo.

## Template provenance

`arxiv.sty` is vendored from [`kourgeorge/arxiv-style`](https://github.com/kourgeorge/arxiv-style), which is MIT licensed. The upstream license is included in `LICENSE-arxiv-style.txt`.
