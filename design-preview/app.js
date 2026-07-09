const choices = {
  technical: {
    name: "Branded Technical Report",
    description: "Closest to the FAIR pattern: an unmistakable academic paper with only a restrained lab signature.",
    note: "The paper keeps a conventional scholarly structure and uses Frontier identity only as a restrained visual layer.",
  },
  journal: {
    name: "Journal Article",
    description: "A formal single-column article with classical typography, a structured abstract, and wide figures.",
    note: "The release reads like an archival journal article while the Frontier theme stays in the journal furniture and accents.",
  },
  working: {
    name: "Working Paper Series",
    description: "A traditional institutional working paper with a separate title page and conservative scholarly body.",
    note: "The Frontier identity defines the series cover, while the interior remains a conventional academic paper.",
  },
};

const storageKey = "frontier-paper-format";
const radios = [...document.querySelectorAll('input[name="paper-format"]')];
const previews = [...document.querySelectorAll("[data-preview]")];
const nameTargets = [...document.querySelectorAll("[data-selected-name]")];
const descriptionTarget = document.querySelector("[data-selected-description]");
const noteTarget = document.querySelector("[data-decision-note]");
const saveTarget = document.querySelector("[data-save-state]");
const copyButton = document.querySelector("[data-copy-choice]");

function validChoice(value) {
  return Object.prototype.hasOwnProperty.call(choices, value) ? value : null;
}

function choiceFromUrl() {
  return validChoice(new URL(window.location.href).searchParams.get("format"));
}

function storedChoice() {
  try {
    return validChoice(window.localStorage.getItem(storageKey));
  } catch {
    return null;
  }
}

function saveChoice(id) {
  try {
    window.localStorage.setItem(storageKey, id);
  } catch {
    // The live selection still works when browser storage is unavailable.
  }
}

function applyChoice(id, announce = true) {
  const selected = validChoice(id) || "technical";
  const choice = choices[selected];
  document.body.dataset.selected = selected;

  radios.forEach((radio) => {
    const active = radio.value === selected;
    radio.checked = active;
    radio.closest(".format-option").classList.toggle("is-selected", active);
  });
  previews.forEach((preview) => {
    const active = preview.dataset.preview === selected;
    preview.hidden = !active;
    preview.classList.toggle("is-active", active);
  });
  nameTargets.forEach((target) => { target.textContent = choice.name; });
  descriptionTarget.textContent = choice.description;
  noteTarget.textContent = choice.note;
  saveChoice(selected);

  const url = new URL(window.location.href);
  if (url.searchParams.get("format") !== selected) {
    url.searchParams.set("format", selected);
    window.history.replaceState(null, "", url);
  }

  if (announce) saveTarget.textContent = `${choice.name} selected · saved locally`;
}

async function copySelection() {
  const selected = radios.find((radio) => radio.checked)?.value || "technical";
  const text = `Selected paper direction: ${choices[selected].name}\nPreview: ${window.location.href}`;

  try {
    await navigator.clipboard.writeText(text);
  } catch {
    const helper = document.createElement("textarea");
    helper.value = text;
    helper.setAttribute("readonly", "");
    helper.style.position = "fixed";
    helper.style.opacity = "0";
    document.body.appendChild(helper);
    helper.select();
    document.execCommand("copy");
    helper.remove();
  }

  const original = copyButton.firstChild.textContent;
  copyButton.firstChild.textContent = "Copied ";
  window.setTimeout(() => { copyButton.firstChild.textContent = original; }, 1600);
}

radios.forEach((radio) => {
  radio.addEventListener("change", () => applyChoice(radio.value));
});
copyButton.addEventListener("click", copySelection);

applyChoice(choiceFromUrl() || storedChoice() || "technical", false);
window.addEventListener("pageshow", () => {
  applyChoice(choiceFromUrl() || storedChoice() || "technical", false);
});
