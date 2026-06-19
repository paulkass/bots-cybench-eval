.PHONY: paper paper-anonymous supplement clean

paper: paper.pdf

paper-anonymous: paper-anonymous.pdf

supplement: paper-supplement.pdf

paper.pdf: paper.tex arxiv.sty references.bib
	latexmk -pdf -interaction=nonstopmode -halt-on-error paper.tex

paper-anonymous.pdf: paper.tex arxiv.sty references.bib
	latexmk -pdf -interaction=nonstopmode -halt-on-error -jobname=paper-anonymous -pdflatex='pdflatex %O "\\def\\anonymous{1}\\input{%S}"' paper.tex

paper-supplement.pdf: supplement.tex
	latexmk -pdf -interaction=nonstopmode -halt-on-error -jobname=paper-supplement supplement.tex

clean:
	latexmk -C paper.tex
	latexmk -C -jobname=paper-anonymous paper.tex
	latexmk -C -jobname=paper-supplement supplement.tex
