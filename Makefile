FIGURES := figures/main_results_chart.png figures/gpt56_comparison_with_refusals.png \
	figures/botsv1_decontamination.png figures/cybench_scaling_panels.png \
	figures/botsv1_scaling_panels.png figures/tool_call_scaling_panels.png

ARXIV_FILES := paper.tex paper.bbl references.bib jmlr.cls jmlrutils.sty algorithm2e.sty placeins.sty $(FIGURES)

.PHONY: all charts paper arxiv clean

all: paper

charts:
	uv run --with 'matplotlib==3.11.0' --with 'pillow==12.3.0' --with 'numpy==2.5.1' python scripts/generate_charts.py

paper: paper.pdf

paper.pdf: paper.tex jmlr.cls jmlrutils.sty algorithm2e.sty placeins.sty references.bib $(FIGURES)
	latexmk -pdf -interaction=nonstopmode -halt-on-error paper.tex

arxiv: paper-arxiv.zip

paper-arxiv.zip: paper.pdf $(ARXIV_FILES)
	rm -f $@
	zip $@ $(ARXIV_FILES)

clean:
	latexmk -C paper.tex
