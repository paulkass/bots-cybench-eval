.PHONY: paper clean

paper: paper.pdf

paper.pdf: paper.tex jmlr.cls jmlrutils.sty algorithm2e.sty placeins.sty references.bib
	latexmk -pdf -interaction=nonstopmode -halt-on-error paper.tex

clean:
	latexmk -C paper.tex
