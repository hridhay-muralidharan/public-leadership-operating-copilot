const workstreams = window.COPILOT_WORKSTREAMS;
const steps = window.COPILOT_STEPS;

let selected = "Citizen Intake";
let currentStep = 0;
let appliedThrough = -1;
let state = createInitialState();
let lastFocusedElement = null;

const els = {
  navWorkbench: document.getElementById("navWorkbench"),
  navProduct: document.getElementById("navProduct"),
  navDetails: document.getElementById("navDetails"),
  productView: document.getElementById("productView"),
  workbenchView: document.getElementById("workbenchView"),
  detailsView: document.getElementById("detailsView"),
  scenarioTitle: document.getElementById("scenarioTitle"),
  stepCounter: document.getElementById("stepCounter"),
  confirmState: document.getElementById("confirmState"),
  promptMeta: document.getElementById("promptMeta"),
  promptText: document.getElementById("promptText"),
  backBtn: document.getElementById("backBtn"),
  confirmBtn: document.getElementById("confirmBtn"),
  nextBtn: document.getElementById("nextBtn"),
  resetBtn: document.getElementById("resetBtn"),
  readinessLabel: document.getElementById("readinessLabel"),
  readinessScore: document.getElementById("readinessScore"),
  readinessBar: document.getElementById("readinessBar"),
  updatedCount: document.getElementById("updatedCount"),
  riskCount: document.getElementById("riskCount"),
  affectedList: document.getElementById("affectedList"),
  workstreamList: document.getElementById("workstreamList"),
  detailTitle: document.getElementById("detailTitle"),
  detailStatus: document.getElementById("detailStatus"),
  loggedEvidence: document.getElementById("loggedEvidence"),
  missingEvidence: document.getElementById("missingEvidence"),
  risksFlagged: document.getElementById("risksFlagged"),
  decisionsMade: document.getElementById("decisionsMade"),
  nextQuestions: document.getElementById("nextQuestions"),
  updateModal: document.getElementById("updateModal"),
  modalTitle: document.getElementById("modalTitle"),
  modalSummary: document.getElementById("modalSummary"),
  modalInterpretation: document.getElementById("modalInterpretation"),
  modalUpdates: document.getElementById("modalUpdates"),
  closeModalBtn: document.getElementById("closeModalBtn"),
  knowMoreBtn: document.getElementById("knowMoreBtn"),
  continueBtn: document.getElementById("continueBtn")
};

function createInitialState() {
  const initial = {};
  workstreams.forEach((name) => {
    initial[name] = {
      status: "not_started",
      note: "No input applied yet.",
      logged: [],
      missing: [],
      risks: [],
      decisions: [],
      questions: []
    };
  });
  return initial;
}

function statusLabel(status) {
  return status.replaceAll("_", " ").replace(/\b\w/g, (char) => char.toUpperCase());
}

function addUnique(list, item) {
  if (!list.includes(item)) list.push(item);
}

function applyUpdate(target, update) {
  if (update.status) target.status = update.status;
  if (update.note) target.note = update.note;
  ["logged", "missing", "risks", "decisions", "questions"].forEach((field) => {
    if (update[field]) update[field].forEach((item) => addUnique(target[field], item));
  });
}

function rebuildState() {
  state = createInitialState();
  for (let index = 0; index <= appliedThrough; index += 1) {
    Object.entries(steps[index].updates).forEach(([name, update]) => applyUpdate(state[name], update));
  }
}

function createElement(tag, className, text) {
  const element = document.createElement(tag);
  if (className) element.className = className;
  if (text !== undefined) element.textContent = text;
  return element;
}

function routeTo(route) {
  const view = route || "product";
  els.productView.classList.toggle("active", view === "product");
  els.workbenchView.classList.toggle("active", view === "demo");
  els.detailsView.classList.toggle("active", view === "details");
  els.navProduct.classList.toggle("active", view === "product");
  els.navWorkbench.classList.toggle("active", view === "demo");
  els.navDetails.classList.toggle("active", view === "details");
  window.scrollTo(0, 0);
}

function handleRoute() {
  const route = window.location.hash.replace("#/", "") || "workbench";
  routeTo(route);
}

function getReadiness() {
  if (appliedThrough < 0) return { score: 0, label: "Intake pending" };
  return { score: steps[appliedThrough].readiness, label: steps[appliedThrough].label };
}

function countUpdatedWorkstreams() {
  return Object.values(state).filter((item) => item.status !== "not_started").length;
}

function countRisks() {
  return Object.values(state).reduce((total, item) => total + item.risks.length, 0);
}

function renderChips(container, names) {
  container.innerHTML = "";
  names.forEach((name) => container.appendChild(createElement("span", "chip", name)));
}

function renderWorkbench() {
  const step = steps[currentStep];
  const confirmed = appliedThrough >= currentStep;
  const readiness = getReadiness();

  els.scenarioTitle.textContent = step.title;
  els.stepCounter.textContent = `Input ${currentStep + 1} of ${steps.length}`;
  els.confirmState.textContent = confirmed ? "Confirmed" : "Awaiting confirmation";
  els.confirmState.className = confirmed ? "pill success" : "pill warning";
  els.promptMeta.textContent = confirmed ? "Confirmed" : "Awaiting confirmation";
  els.promptText.textContent = step.prompt;

  els.confirmBtn.disabled = confirmed;
  els.confirmBtn.textContent = confirmed ? "Confirmed" : "Confirm prompt";
  els.backBtn.disabled = currentStep === 0;
  els.nextBtn.disabled = currentStep >= steps.length - 1 || !confirmed;

  els.readinessLabel.textContent = readiness.label;
  els.readinessScore.textContent = `${readiness.score}%`;
  els.readinessBar.style.width = `${readiness.score}%`;
  els.updatedCount.textContent = String(countUpdatedWorkstreams());
  els.riskCount.textContent = String(countRisks());

  renderChips(els.affectedList, step.affected);
}

function renderDetails() {
  els.workstreamList.innerHTML = "";
  workstreams.forEach((name) => {
    const item = state[name];
    const button = document.createElement("button");
    button.type = "button";
    button.className = name === selected ? "workstream-button active" : "workstream-button";
    button.addEventListener("click", () => {
      selected = name;
      renderDetails();
    });

    const copy = createElement("span");
    copy.appendChild(createElement("strong", "", name));
    copy.appendChild(createElement("span", "", item.note));
    button.appendChild(copy);
    button.appendChild(createElement("span", `status ${item.status}`, statusLabel(item.status)));
    els.workstreamList.appendChild(button);
  });

  const item = state[selected];
  els.detailTitle.textContent = selected;
  els.detailStatus.textContent = statusLabel(item.status);
  els.detailStatus.className = `status ${item.status}`;
  renderList(els.loggedEvidence, item.logged);
  renderList(els.missingEvidence, item.missing);
  renderList(els.risksFlagged, item.risks);
  renderList(els.decisionsMade, item.decisions);
  renderList(els.nextQuestions, item.questions);
}

function renderList(element, items) {
  element.innerHTML = "";
  if (!items.length) {
    element.appendChild(createElement("li", "empty", "No entries yet."));
    return;
  }
  items.forEach((item) => element.appendChild(createElement("li", "", item)));
}

function render() {
  renderWorkbench();
  renderDetails();
}

function openModal(step) {
  lastFocusedElement = document.activeElement;
  els.modalTitle.textContent = step.title;
  els.modalSummary.textContent = `Confirmed input updated ${Object.keys(step.updates).length} workstreams and moved readiness to ${step.readiness}%.`;
  els.modalInterpretation.textContent = step.response;
  els.modalUpdates.innerHTML = "";

  Object.entries(step.updates).forEach(([name, update]) => {
    const row = createElement("div", "modal-row");
    const copy = createElement("span");
    copy.appendChild(createElement("strong", "", name));
    copy.appendChild(createElement("span", "", update.note || "Updated based on the confirmed prompt."));
    row.appendChild(copy);
    row.appendChild(createElement("span", `status ${update.status || "ready_for_review"}`, statusLabel(update.status || "updated")));
    els.modalUpdates.appendChild(row);
  });

  els.updateModal.hidden = false;
  els.closeModalBtn.focus();
}

function closeModal() {
  els.updateModal.hidden = true;
  if (lastFocusedElement) lastFocusedElement.focus();
}

function moveNext() {
  if (currentStep < steps.length - 1 && appliedThrough >= currentStep) {
    currentStep += 1;
    selected = steps[currentStep].select;
    render();
  }
}

els.confirmBtn.addEventListener("click", () => {
  appliedThrough = Math.max(appliedThrough, currentStep);
  selected = steps[currentStep].select;
  rebuildState();
  render();
  openModal(steps[currentStep]);
});

els.nextBtn.addEventListener("click", moveNext);

els.backBtn.addEventListener("click", () => {
  if (currentStep > 0) {
    currentStep -= 1;
    selected = steps[currentStep].select;
    render();
  }
});

els.resetBtn.addEventListener("click", () => {
  currentStep = 0;
  appliedThrough = -1;
  selected = "Citizen Intake";
  rebuildState();
  render();
});

els.closeModalBtn.addEventListener("click", closeModal);
els.knowMoreBtn.addEventListener("click", () => {
  closeModal();
  window.location.hash = "#/details";
});
els.continueBtn.addEventListener("click", () => {
  closeModal();
  moveNext();
});
els.updateModal.addEventListener("click", (event) => {
  if (event.target === els.updateModal) closeModal();
});
document.addEventListener("keydown", (event) => {
  if (event.key === "Escape" && !els.updateModal.hidden) closeModal();
});
window.addEventListener("hashchange", handleRoute);

if (!window.location.hash) window.location.hash = "#/product";
handleRoute();
rebuildState();
render();
