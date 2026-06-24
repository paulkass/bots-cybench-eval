.PHONY: paper clean

paper: paper.pdf

paper.pdf: paper.tex arxiv.sty references.bib
	latexmk -pdf -interaction=nonstopmode -halt-on-error paper.tex

clean:
	latexmk -C paper.tex
