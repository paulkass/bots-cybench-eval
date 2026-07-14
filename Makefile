.PHONY: all paper clean

all: paper

paper: paper.pdf

paper.pdf: paper.tex frontier-template.sty assets/frontier-logo.png placeins.sty references.bib
	latexmk -pdf -interaction=nonstopmode -halt-on-error paper.tex

clean:
	latexmk -C paper.tex
