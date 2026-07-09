# bots-cybench-eval paper

LaTeX source for the submission draft **“Offensive CTFs and SOC Investigations Stress Different Agent Behaviors.”** The paper summarizes experiments and findings from the separate source evaluation repository, with detailed provenance for quantitative claims recorded in `tables/provenance.md`.

## Requirements

The builds use standard TeX Live recommended packages and fonts. On Debian or
Ubuntu, install them with:

```bash
sudo apt-get install texlive-latex-recommended texlive-fonts-recommended
```

## Build

```bash
make paper
```

This writes `paper.pdf` locally. The appendix is part of `paper.tex` and the same PDF. Generated PDFs and LaTeX build artifacts are ignored by git.

## Earlier branded preprint variants (superseded)

The repository retains the initial light-green/yellow preprint experiments for
comparison. They are superseded by the selected journal article below and are
not the recommended branded deliverable.

Choose one of three font systems:

- `make branded FONT=palatino` — warm, editorial Palatino with matching math;
- `make branded FONT=times` — compact, familiar academic Times with matching
  math;
- `make branded FONT=modern` — crisp, neutral Latin Modern.

The selected build is written as `branded-<font>.pdf`. To render all three for
side-by-side review, run `make font-previews`.

Brand colors, title treatment, headings, abstract block, captions, and running
heads live in `paper-template.sty`. The small wrapper files select fonts without
duplicating manuscript content. Keep using `make paper` for the venue submission.

### Selected journal article

The selected non-PMLR direction is a restrained academic journal article. Build
it with:

```bash
make journal
```

This writes `journal.pdf`. Its title, abstract, author block, numbered sections,
captions, citations, and references follow conventional academic structure;
Frontier styling is limited to the research masthead, rules, section numerals,
running heads, and link colors. The PMLR submission remains `make paper`.

### Vision-board Frontier paper

The vision-board synthesis combines a JMLR-like single-column reading measure,
NeurIPS-like compact hierarchy, restrained FAIR/OpenAI institutional treatment,
and DeepMind-like wordmark and rules. Build it with:

```bash
make frontier
```

This writes `frontier.pdf`. The title is deliberately modest and left-aligned;
branding is limited to a small research masthead, a pale abstract field, running
heads, caption labels, link colors, and a short yellow rule terminus.

### Format chooser website

To compare non-PMLR publication directions and save a local selection, run:

```bash
make preview-site
```

Then open `http://127.0.0.1:4173/`. The static site is in `design-preview/`, has
no external dependencies, and stores the selected direction only in browser
local storage.

### Academic paper vision board

To gather multiple academic references and turn them into a reusable design
brief, run:

```bash
make vision-board
```

Then open `http://127.0.0.1:4174/`. The board includes 20 journal, conference,
working-paper, and research-lab references shown through first-page previews of
actual papers. Each preview expands for closer inspection and links to the full
paper; format guides are secondary links. Select several references, mark the
traits to borrow, add a typographic direction and notes, then copy or download
the generated Markdown brief. Selections remain in browser local storage.

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
