const references = [
  {
    id: "jmlr",
    title: "JMLR Journal Article",
    family: "Journal",
    density: "Airy",
    filters: ["single", "journal"],
    sampleTitle: "Memory Gym: Towards Endless Tasks to Benchmark Memory Capabilities of Agents",
    description: "A calm single-column page with modest title scale, generous margins, running heads, and author–year citations.",
    sourceLabel: "Open the JMLR paper",
    source: "https://jmlr.org/papers/volume26/24-0043/24-0043.pdf",
    guide: "https://jmlr.org/format/format.html",
    preview: "assets/previews/jmlr.jpg",
    traits: ["Title restraint", "Single-column grid", "Running heads", "Abstract treatment", "Author–year citations"]
  },
  {
    id: "nature",
    title: "Nature Research Article",
    family: "Journal",
    density: "Editorial",
    filters: ["double", "journal"],
    sampleTitle: "A Benchmark of Expert-Level Academic Questions to Assess AI Capabilities",
    description: "Strong editorial hierarchy: broad title, compact author line, assertive summary paragraph, short sections, and figure-led pacing.",
    sourceLabel: "Open the Nature paper",
    source: "https://www.nature.com/articles/s41586-025-09962-4.pdf",
    guide: "https://www.nature.com/nature/for-authors/formatting-guide",
    preview: "assets/previews/nature.jpg",
    traits: ["Editorial title", "Summary paragraph", "Figure pacing", "Short subheads", "Numeric citations"]
  },
  {
    id: "neurips",
    title: "NeurIPS Conference Paper",
    family: "ML conference",
    density: "Compact",
    filters: ["single", "conference"],
    sampleTitle: "AgentDojo: A Dynamic Environment to Evaluate Prompt Injection Attacks and Defenses for LLM Agents",
    description: "The familiar machine-learning conference paper: a compact single-column measure, small abstract, economical title block, and disciplined hierarchy.",
    sourceLabel: "Open the NeurIPS paper",
    source: "https://proceedings.neurips.cc/paper_files/paper/2024/file/97091a5177d8dc64b1da8bf3e1f6fb54-Paper-Datasets_and_Benchmarks_Track.pdf",
    guide: "https://neurips.cc/Conferences/2026/MainTrackHandbook",
    preview: "assets/previews/neurips.jpg",
    traits: ["Compact single column", "Section hierarchy", "Dense equations", "Small abstract", "Neutral typography"]
  },
  {
    id: "pmlr",
    title: "PMLR Proceedings",
    family: "Proceedings",
    density: "Compact",
    filters: ["double", "conference"],
    sampleTitle: "MLAgentBench: Evaluating Language Agents on Machine Learning Experimentation",
    description: "A conventional proceedings page with centered title matter, compact two columns, serif body text, and minimal decoration.",
    sourceLabel: "Open the PMLR paper",
    source: "https://raw.githubusercontent.com/mlresearch/v235/main/assets/huang24y/huang24y.pdf",
    guide: "https://proceedings.mlr.press/assets/examples/pmlr-sample-double-column.pdf",
    preview: "assets/previews/pmlr.jpg",
    traits: ["Proceedings grid", "Centered title block", "Serif body", "Compact captions", "Low ornament"]
  },
  {
    id: "usenix",
    title: "USENIX Security Paper",
    family: "Security conference",
    density: "Dense",
    filters: ["double", "conference"],
    sampleTitle: "PentestGPT: Evaluating and Harnessing Large Language Models for Automated Penetration Testing",
    description: "A pragmatic security-paper format: 10-point two-column text, direct headings, economical first page, and room for technical figures.",
    sourceLabel: "Open the USENIX paper",
    source: "https://www.usenix.org/system/files/usenixsecurity24-deng.pdf",
    guide: "https://www.usenix.org/conferences/author-resources/paper-templates",
    preview: "assets/previews/usenix.jpg",
    traits: ["Security-paper tone", "Technical density", "Direct headings", "Wide figures", "Compact first page"]
  },
  {
    id: "acm",
    title: "ACM Proceedings",
    family: "Computing venue",
    density: "Structured",
    filters: ["double", "conference"],
    sampleTitle: "Generative Agents: Interactive Simulacra of Human Behavior",
    description: "A highly structured publication system with clear metadata, Libertine typography, classification furniture, and narrow columns.",
    sourceLabel: "Open the UIST paper",
    source: "https://arxiv.org/pdf/2304.03442",
    guide: "https://www.acm.org/publications/authors/submissions",
    preview: "assets/previews/acm.jpg",
    traits: ["Libertine type", "Metadata rail", "Narrow columns", "Strong captions", "Publication furniture"]
  },
  {
    id: "ieee",
    title: "IEEE Transactions",
    family: "Engineering journal",
    density: "Dense",
    filters: ["double", "journal"],
    sampleTitle: "MultiPL-E: A Scalable and Polyglot Approach to Benchmarking Neural Code Generation",
    description: "Classic engineering authority: narrow two-column measure, compact title block, indexed terms, numbered citations, and tight tables.",
    sourceLabel: "Open the IEEE TSE paper",
    source: "https://cdn.buttercms.com/6zC5r8SoQKyF7Ueg3dis",
    guide: "https://journals.ieeeauthorcenter.ieee.org/create-your-ieee-journal-article/authoring-tools-and-templates/tools-for-ieee-authors/ieee-article-templates/",
    preview: "assets/previews/ieee.jpg",
    traits: ["Engineering tone", "Narrow measure", "Index terms", "Numbered citations", "Table density"]
  },
  {
    id: "cvpr",
    title: "CVPR Figure-led Paper",
    family: "Vision conference",
    density: "Visual",
    filters: ["double", "conference"],
    sampleTitle: "OmniDocBench: Benchmarking Diverse PDF Document Parsing with Comprehensive Annotations",
    description: "Two-column academic structure optimized for a prominent first-page figure, multi-panel results, visual comparisons, and short captions.",
    sourceLabel: "Open the CVPR paper",
    source: "https://openaccess.thecvf.com/content/CVPR2025/papers/Ouyang_OmniDocBench_Benchmarking_Diverse_PDF_Document_Parsing_with_Comprehensive_Annotations_CVPR_2025_paper.pdf",
    guide: "https://cvpr.thecvf.com/Conferences/2026/AuthorGuidelines",
    preview: "assets/previews/cvpr.jpg",
    traits: ["Hero figure", "Multi-panel results", "Visual pacing", "Short captions", "Two-column grid"]
  },
  {
    id: "fair",
    title: "FAIR Technical Report",
    family: "Research lab",
    density: "Contemporary",
    filters: ["double", "lab"],
    sampleTitle: "The Llama 3 Herd of Models",
    description: "A normal academic paper first, with lab identity expressed quietly through affiliation, a contemporary type rhythm, and controlled color.",
    sourceLabel: "Open the Meta FAIR paper",
    source: "https://arxiv.org/pdf/2407.21783",
    guide: "https://ai.meta.com/research/publications/the-llama-3-herd-of-models/",
    preview: "assets/previews/fair.jpg",
    traits: ["Subtle lab identity", "Contemporary type", "Quiet accent color", "Large author group", "Technical-report scale"]
  },
  {
    id: "openai",
    title: "Institutional Technical Report",
    family: "Research lab",
    density: "Long-form",
    filters: ["single", "lab"],
    sampleTitle: "GPT-4 Technical Report",
    description: "A restrained long-form report: institutional authorship, conventional academic structure, modest title, and space for evaluations plus system cards.",
    sourceLabel: "Open the OpenAI paper",
    source: "https://cdn.openai.com/papers/gpt-4.pdf",
    preview: "assets/previews/openai.jpg",
    traits: ["Institutional authorship", "Modest title", "Long-form structure", "Evaluation tables", "Appendix system"]
  },
  {
    id: "working",
    title: "NBER-style Working Paper",
    family: "Working paper",
    density: "Bookish",
    filters: ["single"],
    sampleTitle: "The ABC's of Who Benefits from Working with AI: Ability, Beliefs, and Calibration",
    description: "A conservative title-page tradition with explicit series identity, large margins, long-form single-column reading, and minimal visual branding.",
    sourceLabel: "Open the NBER paper",
    source: "https://www.nber.org/system/files/working_papers/w33021/w33021.pdf",
    guide: "https://www.nber.org/papers",
    preview: "assets/previews/working.jpg",
    traits: ["Separate title page", "Series identity", "Bookish measure", "Large margins", "Long-form reading"]
  },
  {
    id: "tmlr",
    title: "TMLR Open-Review Journal",
    family: "ML journal",
    density: "Measured",
    filters: ["single", "journal"],
    sampleTitle: "AI Agents That Matter",
    description: "A roomy single-column journal style with horizontal title rules, centered metadata, a readable abstract measure, and restrained section hierarchy.",
    sourceLabel: "Open the TMLR paper",
    source: "https://arxiv.org/pdf/2407.01502",
    guide: "https://jmlr.org/tmlr/author-guide.html",
    preview: "assets/previews/tmlr.jpg",
    traits: ["Horizontal title rules", "Centered metadata", "Readable measure", "Open-review note", "Restrained hierarchy"]
  },
  {
    id: "iclr",
    title: "ICLR Conference Paper",
    family: "ML conference",
    density: "Open",
    filters: ["single", "conference"],
    sampleTitle: "InnoGym: Benchmarking the Innovation Potential of AI Agents",
    description: "A single-column conference page with small venue line, left-aligned title and authors, wide abstract inset, and generous vertical separation.",
    sourceLabel: "Open the ICLR paper",
    source: "https://arxiv.org/pdf/2512.01822",
    guide: "https://iclr.cc/Conferences/2026/AuthorGuide",
    preview: "assets/previews/iclr.jpg",
    traits: ["Left-aligned title", "Single-column conference", "Wide abstract inset", "Venue running line", "Generous spacing"]
  },
  {
    id: "acl",
    title: "ACL Proceedings Paper",
    family: "NLP conference",
    density: "Figure-led",
    filters: ["double", "conference"],
    sampleTitle: "SafeRAG: Benchmarking Security in Retrieval-Augmented Generation of Large Language Model",
    description: "A conventional two-column NLP paper that puts a compact motivating figure directly beside the abstract and keeps publication metadata in the footer.",
    sourceLabel: "Open the ACL paper",
    source: "https://aclanthology.org/2025.acl-long.230.pdf",
    guide: "https://github.com/acl-org/acl-style-files",
    preview: "assets/previews/acl.jpg",
    traits: ["Abstract beside figure", "Two-column NLP grid", "Compact affiliation block", "Footer metadata", "Colored citations"]
  },
  {
    id: "aaai",
    title: "AAAI Conference Paper",
    family: "AI conference",
    density: "Classical",
    filters: ["double", "conference"],
    sampleTitle: "AttackBench: Evaluating Gradient-based Attacks for Adversarial Examples",
    description: "A conservative two-column AI proceedings format with a centered title block, dense abstract, bold inline resource notes, and almost no ornament.",
    sourceLabel: "Open the AAAI paper",
    source: "https://ojs.aaai.org/index.php/AAAI/article/view/32263/34418",
    guide: "https://aaai.org/authorkit25/",
    preview: "assets/previews/aaai.jpg",
    traits: ["Classical proceedings", "Centered author block", "Dense first page", "Inline resource notes", "Minimal ornament"]
  },
  {
    id: "ndss",
    title: "NDSS Security Paper",
    family: "Security conference",
    density: "Technical",
    filters: ["double", "conference"],
    sampleTitle: "Safety Misalignment Against Large Language Models",
    description: "An engineering-heavy security format with a large centered title, two-column body, first-page system diagram, artifact badge, and formal publication footer.",
    sourceLabel: "Open the NDSS paper",
    source: "https://www.ndss-symposium.org/wp-content/uploads/2025-1089-paper.pdf",
    guide: "https://www.ndss-symposium.org/ndss2025/submissions/call-for-papers/",
    preview: "assets/previews/ndss.jpg",
    traits: ["Artifact badge", "First-page diagram", "Security venue footer", "Engineering typography", "Large centered title"]
  },
  {
    id: "elife",
    title: "eLife Research Article",
    family: "Science journal",
    density: "Editorial",
    filters: ["single", "journal"],
    sampleTitle: "Critique of Impure Reason: Unveiling the Reasoning Behaviour of Medical Large Language Models",
    description: "A strongly editorial journal page with a branded masthead, blue title and abstract accents, a factual metadata rail, and an airy reading column.",
    sourceLabel: "Open the eLife paper",
    source: "https://elifesciences.org/articles/106187.pdf",
    preview: "assets/previews/elife.jpg",
    traits: ["Journal masthead", "Metadata rail", "Colored abstract label", "Airy reading column", "Open-access marks"]
  },
  {
    id: "springer",
    title: "Springer Journal Article",
    family: "Interdisciplinary journal",
    density: "Conservative",
    filters: ["single", "journal"],
    sampleTitle: "Towards a Benchmark for Scientific Understanding in Humans and Machines",
    description: "A compact single-column journal article with strong publication metadata, sans-serif headings over a serif body, keywords, and a quiet publisher mark.",
    sourceLabel: "Open the Springer paper",
    source: "https://link.springer.com/content/pdf/10.1007/s11023-024-09657-1.pdf",
    guide: "https://link.springer.com/article/10.1007/s11023-024-09657-1",
    preview: "assets/previews/springer.jpg",
    traits: ["Mixed serif and sans", "DOI header", "Keywords line", "Compact journal page", "Publisher footer"]
  },
  {
    id: "deepmind",
    title: "DeepMind Research Report",
    family: "Research lab",
    density: "Academic",
    filters: ["single", "lab"],
    sampleTitle: "Evaluating Frontier Models for Dangerous Capabilities",
    description: "An academic single-column report with a very small lab wordmark, restrained rule, bold thesis paragraph, conventional sections, and subtle link color.",
    sourceLabel: "Open the DeepMind paper",
    source: "https://arxiv.org/pdf/2403.13793",
    guide: "https://deepmind.google/research/publications/78150/",
    preview: "assets/previews/deepmind.jpg",
    traits: ["Small lab wordmark", "Thesis paragraph", "Subtle link color", "Academic body", "Top and bottom rules"]
  },
  {
    id: "apple",
    title: "Apple Technical Report",
    family: "Research lab",
    density: "Visual",
    filters: ["single", "lab"],
    sampleTitle: "Apple Intelligence Foundation Language Models",
    description: "A contemporary lab report with an oversized sans-serif title, institutional authorship, broad single column, and a polished process figure on page one.",
    sourceLabel: "Open the Apple paper",
    source: "https://arxiv.org/pdf/2407.21075",
    preview: "assets/previews/apple.jpg",
    traits: ["Sans-serif title", "Institutional authorship", "First-page process figure", "Broad single column", "Contemporary spacing"]
  }
];

const storageKey = "frontier-paper-vision-board-v1";
const state = loadState();

const grid = document.querySelector("#reference-grid");
const boardList = document.querySelector("#board-list");
const emptyBoard = document.querySelector("#empty-board");
const selectionCount = document.querySelector("#selection-count");
const notes = document.querySelector("#direction-notes");
const status = document.querySelector("#action-status");
const previewDialog = document.querySelector("#paper-preview-dialog");

function loadState() {
  const fallback = { selected: {}, type: [], notes: "" };
  try {
    const parsed = JSON.parse(localStorage.getItem(storageKey));
    return parsed && typeof parsed === "object" ? { ...fallback, ...parsed } : fallback;
  } catch {
    return fallback;
  }
}

function saveState() {
  state.notes = notes.value;
  state.type = [...document.querySelectorAll("#type-options input:checked")].map(input => input.value);
  localStorage.setItem(storageKey, JSON.stringify(state));
}

function renderLibrary() {
  grid.innerHTML = references.map(ref => {
    const selected = Boolean(state.selected[ref.id]);
    const chosenTraits = state.selected[ref.id] || [];
    return `
      <article class="reference-card ${selected ? "is-selected" : ""}" data-id="${ref.id}" data-filters="${ref.filters.join(" ")}">
        <button class="card-select" type="button" aria-label="${selected ? "Remove" : "Add"} ${ref.title}" aria-pressed="${selected}"></button>
        <div class="preview-stage">
          <button class="preview-open" type="button" data-preview="${ref.id}" aria-label="Enlarge the first page of ${ref.sampleTitle}">
            <img src="${ref.preview}" alt="First page of ${ref.sampleTitle}" />
            <span>View first page</span>
          </button>
        </div>
        <div class="card-copy">
          <div class="card-meta"><span>${ref.family}</span><span>${ref.density}</span></div>
          <h3>${ref.title}</h3>
          <p class="sample-title"><span>Actual sample</span><br />${ref.sampleTitle}</p>
          <p class="card-description">${ref.description}</p>
          <a class="source-link" href="${ref.source}" target="_blank" rel="noreferrer">${ref.sourceLabel} ↗</a>
          ${ref.guide ? `<a class="source-link" href="${ref.guide}" target="_blank" rel="noreferrer">Guide</a>` : ""}
        </div>
        <div class="trait-picker">
          <p>What should we borrow?</p>
          <div class="trait-options">
            ${ref.traits.map(trait => `
              <label class="trait-option">
                <input type="checkbox" value="${trait}" ${chosenTraits.includes(trait) ? "checked" : ""} />
                <span>${trait}</span>
              </label>`).join("")}
          </div>
        </div>
      </article>`;
  }).join("");

  grid.querySelectorAll(".card-select").forEach(button => {
    button.addEventListener("click", () => toggleReference(button.closest(".reference-card").dataset.id));
  });
  grid.querySelectorAll(".preview-open").forEach(button => {
    button.addEventListener("click", () => openPaperPreview(button.dataset.preview));
  });
  grid.querySelectorAll(".trait-option input").forEach(input => {
    input.addEventListener("change", event => updateTraits(event.target.closest(".reference-card")));
  });
}

function openPaperPreview(id) {
  const ref = references.find(item => item.id === id);
  document.querySelector("#dialog-format").textContent = ref.title;
  document.querySelector("#dialog-title").textContent = ref.sampleTitle;
  const image = document.querySelector("#dialog-image");
  image.src = ref.preview;
  image.alt = `First page of ${ref.sampleTitle}`;
  document.querySelector("#dialog-paper-link").href = ref.source;
  previewDialog.showModal();
}

function toggleReference(id) {
  if (state.selected[id]) delete state.selected[id];
  else state.selected[id] = [];
  saveState();
  renderLibrary();
  renderBoard();
}

function updateTraits(card) {
  state.selected[card.dataset.id] = [...card.querySelectorAll(".trait-option input:checked")].map(input => input.value);
  saveState();
  renderBoard();
}

function renderBoard() {
  const selectedRefs = references.filter(ref => state.selected[ref.id]);
  selectionCount.textContent = selectedRefs.length;
  emptyBoard.hidden = selectedRefs.length > 0;
  boardList.innerHTML = selectedRefs.map(ref => {
    const traits = state.selected[ref.id];
    return `
      <article class="board-item">
        <div class="board-item-top">
          <h3>${ref.title}</h3>
          <button type="button" data-remove="${ref.id}" aria-label="Remove ${ref.title}">×</button>
        </div>
        <p class="board-traits">${traits.length ? traits.join(" · ") : "Choose traits on the reference card"}</p>
      </article>`;
  }).join("");
  boardList.querySelectorAll("[data-remove]").forEach(button => {
    button.addEventListener("click", () => toggleReference(button.dataset.remove));
  });
}

function markdownBrief() {
  const selectedRefs = references.filter(ref => state.selected[ref.id]);
  const typeChoices = [...document.querySelectorAll("#type-options input:checked")].map(input => input.value);
  const lines = [
    "# Academic paper vision board",
    "",
    `Selected references: ${selectedRefs.length}`,
    ""
  ];
  selectedRefs.forEach(ref => {
    const traits = state.selected[ref.id];
    lines.push(`## ${ref.title}`);
    lines.push(`- Reference: ${ref.source}`);
    lines.push(`- Character: ${ref.description}`);
    lines.push(`- Borrow: ${traits.length ? traits.join(", ") : "Not specified yet"}`);
    lines.push("");
  });
  lines.push("## Overall direction");
  lines.push(`- Typography mood: ${typeChoices.length ? typeChoices.join(", ") : "Not specified"}`);
  lines.push(`- Notes: ${notes.value.trim() || "None"}`);
  lines.push("");
  lines.push("Please use this vision board to create a Frontier-themed academic paper template. Preserve academic conventions and use branding with restraint.");
  return lines.join("\n");
}

function showStatus(message) {
  status.textContent = message;
  window.clearTimeout(showStatus.timer);
  showStatus.timer = window.setTimeout(() => { status.textContent = ""; }, 2800);
}

document.querySelectorAll(".filter").forEach(button => {
  button.addEventListener("click", () => {
    document.querySelectorAll(".filter").forEach(item => item.classList.toggle("is-active", item === button));
    const filter = button.dataset.filter;
    grid.querySelectorAll(".reference-card").forEach(card => {
      card.hidden = filter !== "all" && !card.dataset.filters.split(" ").includes(filter);
    });
  });
});

notes.value = state.notes;
document.querySelectorAll("#type-options input").forEach(input => {
  input.checked = state.type.includes(input.value);
  input.addEventListener("change", saveState);
});
notes.addEventListener("input", saveState);

document.querySelector("#close-dialog").addEventListener("click", () => previewDialog.close());
previewDialog.addEventListener("click", event => {
  if (event.target === previewDialog) previewDialog.close();
});

document.querySelector("#copy-brief").addEventListener("click", async () => {
  try {
    await navigator.clipboard.writeText(markdownBrief());
    showStatus("Markdown brief copied. Paste it into our next message.");
  } catch {
    showStatus("Clipboard access was blocked; use Download .md instead.");
  }
});

document.querySelector("#download-brief").addEventListener("click", () => {
  const blob = new Blob([markdownBrief()], { type: "text/markdown;charset=utf-8" });
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.href = url;
  link.download = "paper-vision-board.md";
  document.body.appendChild(link);
  link.click();
  link.remove();
  URL.revokeObjectURL(url);
  showStatus("Downloaded paper-vision-board.md.");
});

document.querySelector("#clear-board").addEventListener("click", () => {
  state.selected = {};
  state.type = [];
  state.notes = "";
  notes.value = "";
  document.querySelectorAll("#type-options input").forEach(input => { input.checked = false; });
  saveState();
  renderLibrary();
  renderBoard();
  showStatus("Vision board cleared.");
});

renderLibrary();
renderBoard();
