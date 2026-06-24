# Revision Roadmap: CTF→SOC Benchmarking Short Paper

A prioritized list of changes to strengthen the paper, ordered by leverage. P0 items
threaten the central thesis and should be addressed before submission; P1 items
materially improve rigor; P2 items are polish.

---

## P0 — Fixes the central thesis depends on

### 1. Run Opus 4.8 on Cybench (single highest-leverage fix) — addressed
- **Status:** Opus 4.8 has now been run on Cybench: 74.4% / 29.0 solved-equivalent challenges, below GPT-5.5 and the higher-budget DeepSeek v4 Flash row. Paper text, appendix, provenance, and figures were updated accordingly.
- **Residual:** A Claude 4.7-on-BOTSv1 run would further isolate version effects, but the high-leverage version-mismatch concern is no longer blocking the short-paper claim.

### 2. Add a contamination control for BOTSv1 — addressed, with bad news
- **Status:** Added no-tools memory-only probes for Claude Opus 4.8 and GPT-5.5, with and without prerequisite context, and included the results in the paper, appendix, and provenance. Both models score very high without tools, confirming substantial public-benchmark contamination.
- **Residual:** DeepSeek v4 Flash no-tools attempts were blocked by OpenRouter `401 User not found`; a perturbed-question probe would be the next stronger control if more experiment budget is approved.
- **Original problem:** BOTSv1 is a 2017 dataset, public on GitHub for ~9 years. The 93.9% headline + low tool use (603 calls) is exactly the signature of memorized answers and memorized SPL. *(SPL = Splunk Processing Language, the query language for Splunk searches.)*

### 3. Strengthen (or hedge) the one inferential test — mostly addressed
- **Status:** Paper now says the BOTSv1 paired bootstrap is over 31 scored questions; the appendix/provenance now include the Opus 4.8 Cybench interval and paired Cybench contrasts against GPT-5.5 and higher-budget DeepSeek Flash.
- **Residual:** Main text still keeps most cross-model Cybench uncertainty in the appendix to save space.
- **Problem:** The reordering's only uncertainty estimate is the BOTSv1 paired bootstrap:
  Claude over GPT-5.5 = **+12.8 pp, 95% CI [+0.9, +27.4]**, n=31. The lower bound nearly
  touches zero. *(Paired bootstrap = resampling the same question set many times to estimate a
  confidence interval; "pp" = percentage points.)*
- **Action:** Report n explicitly next to the CI; add the same bootstrap to the **Cybench**
  cross-model claims (currently bare point estimates) so rigor is symmetric across both families;
  soften any language implying the reorder is firmly established.

### 4. Resolve the prerequisite-injection tension — mostly addressed
- **Status:** Paper methodology now frames BOTSv1 as follow-up investigation with known case state, and Results mention the appendix's independent/dependent split (Claude 96.3% independent, 93.4% dependent).
- **Residual:** A `prereq_context=false` ablation would be stronger if a reviewer challenges this directly.
- **Problem:** The paper sells SOC work as pivoting/correlation, but injects prerequisite answers
  for **23 of 31 questions** ("incident follow-up with known case state"). For 74% of questions the
  agent is handed the output of the prior pivot — i.e., the thing being claimed as the hard part.
- **Action:** Either argue explicitly that follow-up-with-context is the right operationalization of
  SOC work, **or** report the **8 cold-start questions separately** so readers see performance on
  the reconstruction-heavy subset.

---

## P1 — Material rigor improvements

### 5. Demote "selective tool use" from mechanism to correlation (or test it)
- **Problem:** Tool volume is an *output* of each model's policy, not a manipulated variable.
  "Uses fewer tools" and "is the stronger model" are perfectly confounded across models. High
  counts (DeepSeek's ~4,450–4,938) may be a *symptom* of being lost, not a *cause* of failure.
  The Cybench side even cuts the other way (higher-budget DeepSeek used more calls and scored higher).
- **Action:** Run a **within-model tool-budget ablation** (cap/inflate budget for a fixed model,
  observe SOC score) — mirroring the DeepSeek budget ablation you already did on Cybench. Absent
  that, restate the claim as a correlation, not a mechanism.

### 6. Explain the points-vs-accuracy divergence
- **Problem:** Choosing `bots_points` over binary accuracy roughly doubles the headline gap:
  **12.9 pp on points (93.9 vs 81.0)** but **6.5 pp on accuracy (96.8 vs 90.3)**. The headline number
  depends entirely on that metric choice.
- **Action:** State *why* they diverge — differential hint usage (the penalty) or point-weighting of
  a few high-value questions — and report both metrics side by side.

### 7. Address cap-dependent cost and ranking confounds
- **Problem:** $/solve and $/point columns compare rows with **different imposed caps**, and the
  Cybench ranking carries different caps per row. Your own cleanest result shows budget alone moves
  DeepSeek Flash **+22.2 pp** — so a leaderboard with mixed caps is partly a *budget* ranking.
- **Action:** Re-run key comparisons at a **matched cap**, or clearly label every cost/ranking
  comparison as cap-conditional and avoid cross-row efficiency claims that the design can't support.

### 8. Scope the cost-accounting claims honestly
- **Problem:** "Cost accounting changes the question" overstates coverage. VirusTotal public / DNS /
  live WHOIS are treated as $0 (VT public is rate-limited ~4 req/min, 500/day in reality);
  Splunk/Kubernetes infra is excluded, yet Splunk ingest/licensing is plausibly the *dominant* real
  SOC cost. *(WHOIS/RDAP = protocols for looking up domain/IP registration data.)*
- **Action:** Add a sentence scoping the cost figure as "model + priced enrichment only," and note
  that free-but-rate-limited tools advantage whichever model leans on them.

### 9. Handle GPT-5.4 Mini's refusal rate
- **Problem:** A **60.7% refusal rate** under the one-refusal-abort rule means its 29.0% score mostly
  measures refusals, not capability — it shouldn't sit on the capability axis unqualified.
- **Action:** Footnote it, exclude it from capability-axis comparisons, or report a refusal-adjusted
  number.

### 10. Check the message_limit truncation confound
- **Problem:** `message_limit = 250` could truncate the highest-volume runs (DeepSeek), depressing
  scores for a reason unrelated to capability.
- **Action:** Report how many runs hit the cap; if non-trivial, note it as a confound on the
  high-volume models.

---

## P2 — Terminology and presentation

### 11. Fix the "pass@1" label
- Cybench uses 3 epochs with a mean reducer; "solved" is the mean of correct epochs. That is
  **avg@1** (average single-attempt success), not **pass@1** (≥1 of k attempts succeeds).
- Three different "3s" (3-attempt ReAct loop, 3 epochs, the metric) currently overlap — disambiguate
  retries vs. epochs vs. metric.

### 12. Report both denominators for DeepSeek v4 Pro (Figure 1)
- Pro ran 38 challenges (one sandbox-init failure) but is normalized to 39 → 43.8% instead of the
  actual-attempt 45.0% (17.1/38). Show both.

### 13. Use the inert GPT-5.5 "high effort" result
- +38.3 points / +0.4 pp at higher cost is a clean second data point for "compute scaling differs by
  task family." Currently unmentioned — worth one sentence in support of your argument.

### 14. Flag the APT-vs-ransomware split as a hypothesis
- The "long-horizon pivots + external enrichment" interpretation rests on **n=2** scenarios,
  post-hoc. Label it speculative. *(APT = Advanced Persistent Threat, a stealthy long-dwell intruder.)*

### 15. Balance the framing
- The paper is more skeptical of CTF→SOC extrapolation than of its own confounds (version mismatch,
  contamination, cap-dependent rankings). Given the SOC-automation commercial angle, even-handed
  caveating reads as more disinterested.

### 16. Clean template cruft
- "Short Paper Submission" appears twice in the title block; the date looks like a placeholder; the
  affiliation is a stub. Tidy before submission.

---

## Suggested new experiments (consolidated)

| # | Experiment | Resolves |
|---|------------|----------|
| A | Opus 4.8 on Cybench | Done for the blocking version-confound check (P0-1); 4.7 on BOTS is optional |
| B | No-tools memory-only probe | Done for Claude/GPT; confirms contamination (P0-2). Perturbed questions remain optional stronger follow-up. |
| C | Within-model tool-budget ablation on BOTSv1 | Selectivity as mechanism vs. correlation (P1-5) |
| D | Matched-cap re-run of key cost/ranking rows | Cap-dependent confounds (P1-7) |
| E | Cold-start (n=8) reported separately | Prerequisite-injection tension (P0-4) |

---

## One-line summary
The conceptual contribution (offensive vs. defensive as separate evaluation axes + cost-aware
methodology) is sound and under-served; the empirics need a version-matched Cybench run, a
contamination control, and honest labeling of cap-dependent comparisons before the reordering claim
can carry the weight the paper puts on it.
