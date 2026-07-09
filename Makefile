.PHONY: paper journal frontier branded font-previews preview-site vision-board clean

FONT ?= palatino

paper: paper.pdf

journal: journal.pdf

frontier: frontier.pdf

branded: branded-$(FONT).pdf

font-previews: branded-palatino.pdf branded-times.pdf branded-modern.pdf

preview-site:
	python3 -m http.server 4173 --bind 127.0.0.1 --directory design-preview

vision-board:
	python3 -m http.server 4174 --bind 127.0.0.1 --directory vision-board

paper.pdf: paper.tex jmlr.cls jmlrutils.sty algorithm2e.sty placeins.sty references.bib
	latexmk -pdf -interaction=nonstopmode -halt-on-error paper.tex

journal.pdf: journal.tex paper.tex journal-template.sty figures/frontier-logo.png placeins.sty references.bib
	latexmk -pdf -interaction=nonstopmode -halt-on-error journal.tex

frontier.pdf: frontier.tex paper.tex frontier-template.sty figures/frontier-logo.png placeins.sty references.bib
	latexmk -pdf -interaction=nonstopmode -halt-on-error frontier.tex

branded-%.pdf: branded-%.tex paper.tex paper-template.sty figures/frontier-logo.png jmlr.cls jmlrutils.sty algorithm2e.sty placeins.sty references.bib
	latexmk -pdf -interaction=nonstopmode -halt-on-error $<

clean:
	latexmk -C paper.tex
	latexmk -C journal.tex
	latexmk -C frontier.tex
	latexmk -C branded-palatino.tex
	latexmk -C branded-times.tex
	latexmk -C branded-modern.tex
