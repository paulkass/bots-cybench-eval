# Paper provenance notes

Companion provenance for `paper.tex`. This file preserves source mapping for quantitative claims without copying raw logs into the paper. Source-of-truth artifacts live in a separate source evaluation repository, referenced below as `source-eval-repo/`. Raw `.eval` logs should not be copied into this paper repository or submitted as artifacts without a separate sanitization pass.

Audit state when this note was updated: paper repository branch `main`; latest decontamination results from clean source branch `worktree-gpt56-evals` at `b769542` (`Chart expanded decontamination results`). Earlier paper rows retain their previously audited source artifacts.

## Source artifacts inspected

- `source-eval-repo/CLAUDE.md`
- `source-eval-repo/README.md`
- `source-eval-repo/bots/README.md`
- `source-eval-repo/bots/bots.py`
- `source-eval-repo/agents/bots_scoring.py`
- `source-eval-repo/agents/refusal_limit.py`
- `source-eval-repo/agents/react_autocompact.py`
- `source-eval-repo/agents/bots_react_autocompact.py`
- `source-eval-repo/docs/actual-deck.odp` (messaging/framing only)
- `source-eval-repo/charts/README.md`
- `source-eval-repo/charts/cybench_cost_table.csv`
- `source-eval-repo/charts/cybench_cost_table.md`
- `source-eval-repo/charts/cybench_report.html`
- `source-eval-repo/charts/cybench_tool_calls.png`
- `source-eval-repo/charts/botsv1_report.html`
- `source-eval-repo/charts/botsv1_cost_with_tools.png`
- `source-eval-repo/charts/botsv1_tool_calls.png`
- `source-eval-repo/charts/botsv1_decontamination.csv`
- `source-eval-repo/charts/botsv1_decontamination.md`
- `source-eval-repo/charts/make_botsv1_decontamination.py`
- `source-eval-repo/charts/make_report.py`
- `source-eval-repo/charts/make_botsv1_report.py`
- `source-eval-repo/charts/botsv1_tool_costs.py`
- Notion: [GPT-5.6 Cyber Evaluation Results](https://app.notion.com/p/3996c323786881a3b43bc874bf544f9a) (figure composition and narrative framing; values cross-checked against the source logs/reports above)

## Figure 1 scaling provenance

`figures/main_results_chart.png` retains the previously audited digitized trajectories for GPT-5.5, Claude Opus 4.8, and DeepSeek v4 Flash. The added trajectories are stored as compact numeric inputs in `scripts/chart_sources/main_results_additions.json`: GPT-5.6 Sol and Luna for both benchmarks, and Claude Fable 5 for BOTSv1. They were extracted read-only from the source logs listed in that file using `charts/make_report.py` for Cybench per-sample cost-budget curves and `charts/make_botsv1_report.py` for BOTSv1 non-submit tool-call-cap curves. The added runs use high reasoning effort.

## GPT-5.6 refusal figure provenance

`figures/gpt56_comparison_with_refusals.png` is a rasterized copy of the Notion page's `cyber-evals-comparison-with-refusals.svg` attachment.
The BOTSv1 panel uses the latest full-run rows in `charts/botsv1_report.html`; refusal labels are secondary counts over 93 sample-epochs and do not alter points.
The Cybench panel uses raw pass@1 and failed-refusal counts from `charts/cybench_report.html`: GPT-5.5 94.1% and 7/117, GPT-5.6 Luna 79.5% and 10/117, Claude Opus 4.8 76.2% and 5/117, GPT-5.6 Terra 65.8% and 39/117, GPT-5.6 Sol 9.4% and 106/117, and Claude Fable 5 0% and 117/117.
The Opus figure row comes from the latest July source log, while the paper's scaling/bootstrap appendix explicitly retains the earlier June run because those analyses were not recomputed.

## Evaluation run date appendix provenance

Appendix `Evaluation Run Dates` reads the UTC `created` timestamp from Inspect log headers using `inspect_ai.log.read_eval_log(..., header_only=True)`. Source logs are the same logs listed in the Cybench, BOTSv1, and BOTSv1 decontamination provenance tables below.

| Paper row | Source log(s) | Inspect `created` timestamp(s) |
|---|---|---|
| Cybench GPT-5.5, `$2.10` | `logs/2026-05-14T18-34-57-00-00_cybench_BX35J4hLm3ysoLizzwAD48.eval`; `logs/2026-05-14T20-45-04-00-00_cybench_BX35J4hLm3ysoLizzwAD48.eval`; `logs/2026-05-14T20-52-17-00-00_cybench_BX35J4hLm3ysoLizzwAD48.eval`; `logs/2026-05-14T21-03-03-00-00_cybench_BX35J4hLm3ysoLizzwAD48.eval` | `2026-05-14T18:34:57+00:00`; `2026-05-14T20:45:04+00:00`; `2026-05-14T20:52:17+00:00`; `2026-05-14T21:03:03+00:00` |
| Cybench GPT-5.6 Luna, high effort | `logs/2026-07-09T20-44-03-00-00_cybench_a8YJcmqfzGz4AviAk2LJW6.eval` | `2026-07-09T20:44:03+00:00` |
| Cybench GPT-5.6 Terra, high effort | `logs/2026-07-10T06-43-26-00-00_cybench_AZqG8zUtJtoFu48xYMRfg9.eval` | `2026-07-10T06:43:26+00:00` |
| Cybench GPT-5.6 Sol, high effort | `logs/2026-07-10T15-35-10-00-00_cybench_Far9ACWawnPSErx2NWGNNe.eval` | `2026-07-10T15:35:10+00:00` |
| Cybench Claude Fable 5, high effort | `logs/2026-07-13T18-04-21-00-00_cybench_7Pf8QumwJG3RYASBvpu8Py.eval` | `2026-07-13T18:04:21+00:00` |
| Cybench DeepSeek v4 Flash, `$2.10`; Cybench DeepSeek v4 Flash, `$0.80` retrospective | `logs/2026-05-19T16-35-07-00-00_cybench_NNuvY6MXYTSRkaAARLBZwT.eval` | `2026-05-19T16:35:07+00:00` |
| Cybench Claude Opus 4.8, `$2.10` | `logs/2026-07-13T18-17-02-00-00_cybench_LvdrqSKje9nkNpzeXCmCCB.eval` | `2026-07-13T18:17:02+00:00` |
| Cybench Claude Opus 4.8, `$2.10` (June scaling/bootstrap run) | `logs/2026-06-22T18-37-21-00-00_cybench_YFhtUWESgt8vbFNpCB5hRY.eval`; `logs/2026-06-23T19-08-17-00-00_cybench_YFhtUWESgt8vbFNpCB5hRY.eval` | `2026-06-22T18:37:21+00:00`; `2026-06-23T19:08:17+00:00` |
| Cybench DeepSeek v4 Pro, `$0.75` | `logs/2026-05-15T19-38-26-00-00_cybench_8YcazcCkyPBwkENiRQ2Pee.eval`; `logs/2026-05-15T23-35-01-00-00_cybench_JUTe7XGGcGJBQWg8ZnetYQ.eval`; `logs/2026-05-15T23-44-23-00-00_cybench_VWFUUdor5Useewi4zjrRdo.eval` | `2026-05-15T19:38:26+00:00`; `2026-05-15T23:35:01+00:00`; `2026-05-15T23:44:23+00:00` |
| BOTSv1 Claude Opus 4.8, full agent, `$2.10` | `logs/2026-06-15T04-30-45-00-00_botsv_iusRJmJKvQTdrAcnhqVFU3.eval` | `2026-06-15T04:30:45+00:00` |
| BOTSv1 GPT-5.6 Terra, high effort, `$2.10` | `logs/2026-07-13T19-54-58-00-00_botsv_Rd86YGL82fhwVe5rCXKEkz.eval` | `2026-07-13T19:54:58+00:00` |
| BOTSv1 GPT-5.6 Sol, high effort, `$2.10` | `logs/2026-07-13T19-55-19-00-00_botsv_RSnH45WLy7J55CRLx9Hinv.eval` | `2026-07-13T19:55:19+00:00` |
| BOTSv1 Claude Fable 5, high effort, `$2.10` | `logs/2026-07-13T18-19-40-00-00_botsv_nFuPAjYncJ5HePTm645po8.eval` | `2026-07-13T18:19:40+00:00` |
| BOTSv1 GPT-5.6 Luna, high effort, `$2.10` | `logs/2026-07-13T17-43-15-00-00_botsv_WisTKCkgrdwGWJuqMwpBUA.eval` | `2026-07-13T17:43:15+00:00` |
| BOTSv1 GPT-5.5 high effort, full agent, `$2.10` | `logs/2026-06-15T06-09-42-00-00_botsv_VYcxyGse2gyga8MGcsWNYg.eval` | `2026-06-15T06:09:42+00:00` |
| BOTSv1 GPT-5.5, full agent, `$2.10` | `logs/2026-06-14T21-12-20-00-00_botsv_6cHBshKy4Xxt82no2geqK3.eval` | `2026-06-14T21:12:20+00:00` |
| BOTSv1 DeepSeek v4 Pro, full agent, `$2.10` | `logs/2026-06-14T23-14-52-00-00_botsv_nKdSUbcTJe6XrzyRvsmgvV.eval` | `2026-06-14T23:14:52+00:00` |
| BOTSv1 DeepSeek v4 Flash, full agent, `$4.20` | `logs/2026-06-15T04-59-44-00-00_botsv_9LMvv2EkysNTH3VtjK2mxm.eval` | `2026-06-15T04:59:44+00:00` |
| BOTSv1 DeepSeek v4 Flash, full agent, `$2.10` | `logs/2026-06-14T23-07-00-00-00_botsv_kndnbzEAcciuAjoNMDxPaj.eval` | `2026-06-14T23:07:00+00:00` |
| BOTSv1 Claude Opus 4.8, no tools, `prereq_context=true` | `logs/2026-06-23T21-32-08-00-00_botsv_mTEKs37gYSuKc7S7KuT3ZX.eval` | `2026-06-23T21:32:08+00:00` |
| BOTSv1 Claude Opus 4.8, no tools, `prereq_context=false` | `logs/2026-06-23T21-51-42-00-00_botsv_2ASKgbtAgPUBBDuqReKCqH.eval` | `2026-06-23T21:51:42+00:00` |
| BOTSv1 GPT-5.5, no tools, `prereq_context=true` | `logs/2026-06-23T22-21-31-00-00_botsv_hRdzhJdiadJDPZs8SaC5ie.eval` | `2026-06-23T22:21:31+00:00` |
| BOTSv1 GPT-5.5, no tools, `prereq_context=false` | `logs/2026-06-23T22-43-04-00-00_botsv_NaJvXYaArgXZEXFgKjiKAV.eval` | `2026-06-23T22:43:04+00:00` |

## Cybench table provenance

Source table: `source-eval-repo/charts/cybench_cost_table.csv`.

| Paper row | Source log(s) | Notes |
|---|---|---|
| GPT-5.5 + autocompact | `logs/2026-05-14T21-03-03-00-00_cybench_BX35J4hLm3ysoLizzwAD48.eval` | Successful run; chart cost also aggregates same-day failed retries. |
| GPT-5.6 Luna + autocompact, high effort | `logs/2026-07-09T20-44-03-00-00_cybench_a8YJcmqfzGz4AviAk2LJW6.eval` | 79.49% raw pass@1; 8.5% refused; successful retry cost reconstructed from cumulative tokens. |
| GPT-5.6 Terra + autocompact, high effort | `logs/2026-07-10T06-43-26-00-00_cybench_AZqG8zUtJtoFu48xYMRfg9.eval` | 65.81% raw pass@1; 33.3% refused; `cost_limit=2.10`. |
| GPT-5.6 Sol + autocompact, high effort | `logs/2026-07-10T15-35-10-00-00_cybench_Far9ACWawnPSErx2NWGNNe.eval` | 9.40% raw pass@1; 90.6% refused; `cost_limit=2.10`. |
| Claude Fable 5 + autocompact, high effort | `logs/2026-07-13T18-04-21-00-00_cybench_7Pf8QumwJG3RYASBvpu8Py.eval` | 0% raw pass@1; all 117 sample-epochs ended `content_filter` before tool use; `cost_limit=2.10`. |
| DeepSeek v4 Flash + autocompact ($2.10 cap) | `logs/2026-05-19T16-35-07-00-00_cybench_NNuvY6MXYTSRkaAARLBZwT.eval` | Same model/solver as lower-cap row, higher per-sample cap. |
| Claude Opus 4.8 + autocompact | `logs/2026-07-13T18-17-02-00-00_cybench_LvdrqSKje9nkNpzeXCmCCB.eval` | Latest main-table/figure run; 76.15% raw pass@1, 5/117 failed refusals, `$94.5767` model cost, 23.8 mean non-submit tool calls; `cost_limit=2.10`. |
| Claude Opus 4.8 + autocompact (June run) | `logs/2026-06-23T19-08-17-00-00_cybench_YFhtUWESgt8vbFNpCB5hRY.eval` | Prior scaling/bootstrap run; `cost_limit=2.10`; successful retry carries cumulative usage from the partial 2026-06-22 run. |
| Claude Opus 4.7 + autocompact | `logs/2026-05-26T06-06-51-00-00_cybench_nhMeY9ziwx7dguUqQbVYkG.eval` | Cost computed from Anthropic token counts/rates where API did not populate `total_cost`. |
| DeepSeek v4 Flash + autocompact ($0.80 cap) | `logs/2026-05-14T03-39-12-00-00_cybench_YysW3bBz56oRtEaQUFQnED.eval` | Phase-B autocompact run. |
| Kimi K2.6 + autocompact | `logs/2026-05-18T18-00-18-00-00_cybench_MGadcz7L9SsafZCWfb3FMY.eval` | Constrained OpenRouter providers; source log records `$0.85` cost limit. |
| DeepSeek v4 Pro + autocompact | `logs/2026-05-15T23-44-23-00-00_cybench_VWFUUdor5Useewi4zjrRdo.eval` | 38 challenges because `chunky` was excluded after deterministic sandbox-init failure; solved value in paper follows generated chart's 39-challenge normalization. |

### Cybench robustness and caveats

- The rows are not a controlled model-only experiment.
- Cost limits, OpenRouter routing, concurrency, and one challenge denominator varied.
- GPT-5.5 and DeepSeek v4 Pro cost rows include same-day failed-retry overhead in the charted cost totals; GPT-5.6 Luna cost is reconstructed from cumulative retry tokens because its successful log ledger is incomplete.
- GPT-5.6/Fable results use raw pass@1, not the chart's refusal-adjusted counterfactual value. Fable's $1.6402 cost is dominated by cache-write tokens omitted from the compact CSV token columns.
- Reported `solved` is fractional pass@1 (mean correctness over three epochs), not an integer challenge count.
- Challenge-level bootstrap intervals from existing logs used in the visible appendix: GPT-5.5 94.0% [87.2, 99.2], DeepSeek Flash $2.10 cap 86.3% [76.9, 94.9], DeepSeek Flash $0.80 retrospective cap 76.1% [63.2, 87.2], the June Claude Opus 4.8 run 74.4% [61.5, 86.3], DeepSeek Pro 43.9% [29.8, 57.9]. Intervals resample challenge IDs and retain three epochs per challenge. Main-table and appendix percentages are independently rounded from logs; DeepSeek Pro's 43.85% is shown as 43.9% in the paper even though the source markdown table may display 43.8% under its formatter.
- Paired challenge-level bootstrap contrasts retained for model-ranking context: GPT-5.5 minus DeepSeek Flash $2.10 = +7.7 percentage points [1.7, 15.4]; GPT-5.5 minus Claude Opus 4.8 = +19.7 percentage points [9.4, 30.8]; DeepSeek Flash $2.10 minus Claude Opus 4.8 = +12.0 percentage points [1.7, 23.1].

## Refusal-accounting provenance

The methods subsection `Refusal accounting` follows the runtime detector in `agents/refusal_limit.py` and the two ReAct solver hooks in `agents/react_autocompact.py` and `agents/bots_react_autocompact.py` at source commit `0a630e4`.
Assistant text is NFKC-normalized, quote-folded, and lowercased before matching 11 case-insensitive apology, inability, policy, or fabrication patterns; only nonblank assistant messages without tool calls are eligible.
A provider `stop_reason="content_filter"` is also a refusal.
Both solvers use `refusal_limit(1)`, so a detection reaching the continuation hook stops the sample and scoring uses its current output.

Post-hoc reporting is benchmark-specific.
For Cybench, `charts/make_report.py` classifies a sample-epoch from its final assistant text or any content-filter model event, then retains only refused-and-unsolved epochs in the reported refusal count $R$; the refusal rate is $100R/N$ and three-epoch charts show $R/3$ challenge-equivalents.
Raw pass@1 remains $100S/N$: refused epochs are not removed from the denominator.
For BOTSv1, `charts/make_botsv1_report.py` scans any assistant message or content-filter event and reports $R/N$ independently of `bots_points` and binary `includes`.
Consequently, a transient refusal can coexist with points if a later or retried attempt answers correctly; this occurs in two Fable q114 epochs in `logs/2026-07-13T18-19-40-00-00_botsv_nFuPAjYncJ5HePTm645po8.eval`.
The Cybench chart's separate adjusted value is $(S+R)/N$, which gives failed refusals counterfactual credit; it is not attempted-only accuracy $S/(N-R)$ and is not reported in the paper.

## Scaling-headroom provenance

Source logs are the same shared-model rows listed in the Cybench and BOTSv1 provenance tables. Retrospective headroom values in `paper.tex` Table `tab:scaling-headroom` were computed read-only from existing `.eval` logs using the chart loaders in `source-eval-repo/charts/make_report.py` and `source-eval-repo/charts/make_botsv1_report.py`.

- Cybench cap rule: replay model-call ledger events for each sample epoch; if cumulative model cost crosses `$0.80`, score that sample epoch as unsolved. Bootstrap resamples challenge IDs and retains epochs.
- BOTSv1 cap rule: use per-sample model-token cost plus priced-tool cost; if total sample cost exceeds `$0.80`, score that sample epoch as zero BOTS points. Bootstrap resamples question IDs and retains epochs/official point weights.
- Cybench full minus `$0.80` retrospective cap, percentage-point deltas: GPT-5.5 +2.6 [0.0, 6.0], Claude Opus 4.8 +18.8 [10.3, 29.1], DeepSeek v4 Flash +10.3 [4.3, 17.1], DeepSeek v4 Pro +0.0 [0.0, 0.0].
- BOTSv1 full minus `$0.80` retrospective model+tool cap, percentage-point deltas after cached WhoisXMLAPI repricing: GPT-5.5 +6.9 [1.6, 13.6], Claude Opus 4.8 +2.6 [0.0, 7.1], DeepSeek v4 Flash +0.0 [0.0, 0.0], DeepSeek v4 Pro +4.0 [0.0, 9.6].
- Section 5 scaling figures are two-panel composites generated read-only from the source chart loaders and logs after removing the dropped row: Cybench uses `source-eval-repo/charts/make_report.py` cost/token series; BOTSv1 uses `source-eval-repo/charts/make_botsv1_report.py` model-plus-priced-tool cost/token series after cached WhoisXMLAPI repricing; the cross-benchmark tool-call figure combines the corresponding filtered tool-call charts. BOTSv1 scaling was regenerated from source HEAD `b73f0ea`.

## BOTSv1 table provenance

Source report: `source-eval-repo/charts/botsv1_report.html`.

| Paper row | Source log | Notes |
|---|---|---|
| Claude Opus 4.8 | `logs/2026-06-15T04-30-45-00-00_botsv_iusRJmJKvQTdrAcnhqVFU3.eval` | Cost limit `$2.10`; high/default reasoning effort; k8s `chart`. |
| GPT-5.6 Terra, high effort | `logs/2026-07-13T19-54-58-00-00_botsv_Rd86YGL82fhwVe5rCXKEkz.eval` | 9,485/10,300 points (92.1%); 95.7% binary; model+tools $33.66; 1,567 tool calls. |
| GPT-5.6 Sol, high effort | `logs/2026-07-13T19-55-19-00-00_botsv_RSnH45WLy7J55CRLx9Hinv.eval` | 9,416.7/10,300 points (91.4%); 97.8% binary; model+tools $44.29; 1,357 tool calls. |
| Claude Fable 5, high effort | `logs/2026-07-13T18-19-40-00-00_botsv_nFuPAjYncJ5HePTm645po8.eval` | 9,108.3/10,300 points (88.4%); 95.7% binary; 5/93 refusals; model+tools $32.04; 309 tool calls. |
| GPT-5.6 Luna, high effort | `logs/2026-07-13T17-43-15-00-00_botsv_WisTKCkgrdwGWJuqMwpBUA.eval` | 8,625/10,300 points (83.7%); 93.5% binary; model+tools $29.66; 1,867 tool calls. |
| GPT-5.5 high effort | `logs/2026-06-15T06-09-42-00-00_botsv_VYcxyGse2gyga8MGcsWNYg.eval` | Cost limit `$2.10`; high reasoning effort; k8s `chart`. |
| GPT-5.5 | `logs/2026-06-14T21-12-20-00-00_botsv_6cHBshKy4Xxt82no2geqK3.eval` | Cost limit `$2.10`; medium/default reasoning effort; k8s `chart`. |
| DeepSeek v4 Pro | `logs/2026-06-14T23-14-52-00-00_botsv_nKdSUbcTJe6XrzyRvsmgvV.eval` | Cost limit `$2.10`; k8s `chart`. |
| DeepSeek v4 Flash ($4.20 cap) | `logs/2026-06-15T04-59-44-00-00_botsv_9LMvv2EkysNTH3VtjK2mxm.eval` | Higher per-sample cap; k8s `chart-bots-data-2`. |
| DeepSeek v4 Flash | `logs/2026-06-14T23-07-00-00-00_botsv_kndnbzEAcciuAjoNMDxPaj.eval` | Cost limit `$2.10`; k8s `chart-bots-data-2`. |

### BOTSv1 robustness and caveats

- Official warm-up q1 is excluded by task default; full runs contain 31 scored questions.
- Twenty-three of 31 scored questions have explicit prerequisite dependencies and receive prerequisite context in the prompt; this measures follow-up investigation with known case state, not cold-start reconstruction. Appendix D's dependency chart is copied from benchmark metadata `depends_on` entries.
- Rows use three epochs and mean reduction, so points are reduced back to the single-epoch point scale (10,300 possible).
- Primary metric is `bots_points`; binary `includes` is secondary.
- Tool costs include Brave Search and WhoisXMLAPI DRS credits, including host-cache hits priced at the same DRS-credit value as fresh provider responses. VirusTotal public API, DNS, and live WHOIS/RDAP are treated as zero marginal cost.
- Tool-adjusted cost excludes Kubernetes/Splunk infrastructure, free-tier effects, and enterprise pricing variation.
- Question-level bootstrap intervals from existing logs used in the visible appendix: Claude Opus 4.8 93.9% [82.7, 99.5], GPT-5.5 high effort 81.4% [67.4, 94.1], GPT-5.5 81.0% [64.1, 96.4], DeepSeek v4 Pro 77.8% [61.0, 93.1], DeepSeek Flash $4.20 cap 73.9% [53.2, 91.9], DeepSeek Flash $2.10 cap 73.0% [52.7, 91.1]. Intervals resample question IDs and retain three epochs and official point weights per question.
- Paired question-level bootstrap contrasts retained for model-ranking/scaling context: Claude Opus 4.8 minus GPT-5.5 = +12.8 percentage points [0.9, 27.4]; Claude Opus 4.8 minus GPT-5.5 high effort = +12.5 percentage points [2.4, 23.7]; DeepSeek Flash $4.20 minus $2.10 = +0.9 percentage points [-4.9, 6.9]. GPT-5.6 and Fable intervals/scaling contrasts were not recomputed and are omitted from those appendix analyses.
- Sequential-context audit: Claude Opus 4.8 scores 1,445/1,500 on independent questions and 8,221.7/8,800 on dependent questions; GPT-5.5 scores 1,345/1,500 and 7,000/8,800 respectively.

## BOTSv1 decontamination probe provenance

Source table/chart: `source-eval-repo/charts/botsv1_decontamination.csv`, `source-eval-repo/charts/botsv1_decontamination.md`, and `source-eval-repo/charts/botsv1_decontamination.png`.

| Row | Source log | Notes |
|---|---|---|
| Claude Opus 4.8 full agent + tools | `logs/2026-06-15T04-30-45-00-00_botsv_iusRJmJKvQTdrAcnhqVFU3.eval` | Charted 3-epoch baseline: 9,666.7/10,300 points (93.9%), 96.8% binary accuracy, 603 non-submit tool events. |
| Claude Opus 4.8 no tools, `prereq_context=true` | `logs/2026-06-23T21-32-08-00-00_botsv_mTEKs37gYSuKc7S7KuT3ZX.eval` | Single epoch memory-only probe: 7,700/10,300 points (74.8%), 77.4% binary accuracy, 0 tool events, `$0.0515` model cost. |
| Claude Opus 4.8 no tools, `prereq_context=false` | `logs/2026-06-23T21-51-42-00-00_botsv_2ASKgbtAgPUBBDuqReKCqH.eval` | Single epoch memory-only probe: 5,150/10,300 points (50.0%), 58.1% binary accuracy, 0 tool events, `$0.0318` model cost. |
| GPT-5.5 full agent + tools | `logs/2026-06-14T21-12-20-00-00_botsv_6cHBshKy4Xxt82no2geqK3.eval` | Charted 3-epoch baseline: 8,345/10,300 points (81.0%), 90.3% binary accuracy, 1,481 non-submit tool events. |
| GPT-5.5 no tools, `prereq_context=true` | `logs/2026-06-23T22-21-31-00-00_botsv_hRdzhJdiadJDPZs8SaC5ie.eval` | Single epoch memory-only probe: 6,400/10,300 points (62.1%), 74.2% binary accuracy, 0 tool events, `$0.4553` model cost. |
| GPT-5.5 no tools, `prereq_context=false` | `logs/2026-06-23T22-43-04-00-00_botsv_NaJvXYaArgXZEXFgKjiKAV.eval` | Single epoch memory-only probe: 5,650/10,300 points (54.9%), 71.0% binary accuracy, 0 tool events, `$0.6940` model cost. |
| GPT-5.6 Luna no tools, `prereq_context=true` / `false` | `logs/2026-07-17T04-22-27-00-00_botsv_CQ4fUot8Ws3AQo7XZdy2cz.eval`; `logs/2026-07-17T05-55-04-00-00_botsv_HiUbvL2CYAbZAmSBhFKrUH.eval` | 1,950 (18.9%) / 1,350 (13.1%) points; 22.6% / 12.9% binary; 0 non-submit tool events. |
| GPT-5.6 Terra no tools, `prereq_context=true` / `false` | `logs/2026-07-17T05-55-04-00-00_botsv_PJ6FcFYHuq8qKgpaiCLRCn.eval`; `logs/2026-07-17T06-24-56-00-00_botsv_WwQZfo3EHGuV6XogqBnocP.eval` | 4,050 (39.3%) / 1,900 (18.4%) points; 38.7% / 19.4% binary; 0 non-submit tool events. |
| GPT-5.6 Sol no tools, `prereq_context=true` / `false` | `logs/2026-07-17T06-24-56-00-00_botsv_FdtZ2uSRzqV8HS5bPZJ3Ey.eval`; `logs/2026-07-17T06-54-08-00-00_botsv_EjSUdRbqiy3Jm7sxyoUw93.eval` | 7,950 (77.2%) / 5,200 (50.5%) points; 83.9% / 67.7% binary; 0 non-submit tool events. |
| Claude Fable 5 no tools, `prereq_context=true` / `false` | `logs/2026-07-17T06-54-07-00-00_botsv_BmNoeCD4L8fnZUMqbDcmBr.eval`; `logs/2026-07-17T07-22-40-00-00_botsv_JGpXGVV5nSmxq2HErbKNUG.eval` | 2,050 (19.9%) / 1,500 (14.6%) points; 38.7% / 29.0% binary; 0 non-submit tool events. |
| DeepSeek v4 Flash no-tools attempts | `logs/2026-06-23T23-02-47-00-00_botsv_czbzdhrvvc4M5ScvGAem9B.eval`, `logs/2026-06-23T23-09-56-00-00_botsv_Ceycej2VdhBaq4xz5oftMU.eval` | Blocked before scored samples by OpenRouter `401 User not found`; omitted from chart rather than scored as zero. |

The no-tools solver registers no Splunk, web, bash, Python, or other tools. `prereq_context=true` appends official prerequisite question/answer context for dependent questions; `false` uses only the official question text. Scores show a model-dependent direct answer-recovery signal; they do not identify whether the mechanism is memorization, training-data leakage, prior knowledge, or inference from the prompt.
