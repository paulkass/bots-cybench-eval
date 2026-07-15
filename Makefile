.PHONY: all charts paper clean

all: paper

charts:
	uv run --with 'matplotlib==3.11.0' --with 'pillow==12.3.0' --with 'numpy==2.5.1' python scripts/generate_charts.py

paper: paper.pdf

paper.pdf: paper.tex jmlr.cls jmlrutils.sty algorithm2e.sty placeins.sty references.bib
	latexmk -pdf -interaction=nonstopmode -halt-on-error paper.tex

clean:
	latexmk -C paper.tex
