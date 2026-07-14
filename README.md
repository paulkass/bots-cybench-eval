# bots-cybench-eval paper

LaTeX source for **“Beyond Success Rate: Cost-Aware Evaluation of Offensive and Defensive Security Agents.”** The paper summarizes experiments from `~/projects/inspect-cyber-eval/`; quantitative-claim provenance is recorded in `tables/provenance.md`.

## Requirements

On Debian or Ubuntu:

```bash
sudo apt-get install latexmk texlive-latex-recommended texlive-fonts-recommended
```

## Build

```bash
make
```

This writes `paper.pdf`. The manuscript uses the official Frontier branded style from `~/frontier/branded-paper-template/`, vendored here as `frontier-template.sty` with its logo assets under `assets/`.

## Clean

```bash
make clean
```

Raw `.eval` logs, datasets, secrets, and generated PDFs should not be added to this repository.
