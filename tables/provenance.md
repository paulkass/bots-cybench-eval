# Paper provenance notes

Companion provenance for `paper.tex`. This file preserves source mapping for quantitative claims without copying raw logs into the paper. Source-of-truth artifacts live in a separate source evaluation repository, referenced below as `source-eval-repo/`. Raw `.eval` logs should not be copied into this paper repository or submitted as artifacts without a separate sanitization pass.

Audit state when this note was updated: paper repository base commit `572b687` plus paper edits; source repository commit `b731f1b` (`charts: add Opus 4.8 and decontamination controls`). Record final commit hashes and chart/report checksums again before any public release.

## Source artifacts inspected

- `source-eval-repo/CLAUDE.md`
- `source-eval-repo/README.md`
- `source-eval-repo/bots/README.md`
- `source-eval-repo/bots/bots.py`
- `source-eval-repo/agents/bots_scoring.py`
- `source-eval-repo/charts/README.md`
- `source-eval-repo/charts/cybench_cost_table.csv`
- `source-eval-repo/charts/cybench_cost_table.md`
- `source-eval-repo/charts/cybench_report.html`
- `source-eval-repo/charts/botsv1_report.html`
- `source-eval-repo/charts/botsv1_decontamination.csv`
- `source-eval-repo/charts/botsv1_decontamination.md`
- `source-eval-repo/charts/make_report.py`
- `source-eval-repo/charts/make_botsv1_report.py`
- `source-eval-repo/charts/botsv1_tool_costs.py`

## Cybench table provenance

Source table: `source-eval-repo/charts/cybench_cost_table.csv`.

| Paper row | Source log(s) | Notes |
|---|---|---|
| GPT-5.5 + autocompact | `logs/2026-05-14T21-03-03-00-00_cybench_BX35J4hLm3ysoLizzwAD48.eval` | Successful run; chart cost also aggregates same-day failed retries. |
| DeepSeek v4 Flash + autocompact ($2.10 cap) | `logs/2026-05-19T16-35-07-00-00_cybench_NNuvY6MXYTSRkaAARLBZwT.eval` | Same model/solver as lower-cap row, higher per-sample cap. |
| Claude Opus 4.8 + autocompact | `logs/2026-06-23T19-08-17-00-00_cybench_YFhtUWESgt8vbFNpCB5hRY.eval` | `cost_limit=2.10`; k8s sandbox on `non-prod`/`pk-bots-eval`; successful retry log carries cumulative usage from the partial 2026-06-22 run. |
| Claude Opus 4.7 + autocompact | `logs/2026-05-26T06-06-51-00-00_cybench_nhMeY9ziwx7dguUqQbVYkG.eval` | Cost computed from Anthropic token counts/rates where API did not populate `total_cost`. |
| DeepSeek v4 Flash + autocompact ($0.80 cap) | `logs/2026-05-14T03-39-12-00-00_cybench_YysW3bBz56oRtEaQUFQnED.eval` | Phase-B autocompact run. |
| Kimi K2.6 + autocompact | `logs/2026-05-18T18-00-18-00-00_cybench_MGadcz7L9SsafZCWfb3FMY.eval` | Constrained OpenRouter providers; source log records `$0.85` cost limit. |
| DeepSeek v4 Pro + autocompact | `logs/2026-05-15T23-44-23-00-00_cybench_VWFUUdor5Useewi4zjrRdo.eval` | 38 challenges because `chunky` was excluded after deterministic sandbox-init failure; solved value in paper follows generated chart's 39-challenge normalization. |
| GPT-5.4 Mini + autocompact | `logs/2026-05-15T06-49-32-00-00_cybench_FJTzVLJ9wmDDWQxm3wWAEh.eval` | `$0.80` cost limit; high refusal rate. |

### Cybench robustness and caveats

- The rows are not a controlled model-only experiment.
- Cost limits, OpenRouter routing, concurrency, and one challenge denominator varied.
- GPT-5.5 and DeepSeek v4 Pro cost rows include same-day failed-retry overhead in the charted cost totals.
- Reported `solved` is fractional pass@1 (mean correctness over three epochs), not an integer challenge count.
- Challenge-level bootstrap intervals from existing logs: GPT-5.5 94.0% [87.2, 99.2], DeepSeek Flash $2.10 cap 86.3% [76.9, 94.9], Claude Opus 4.8 74.4% [61.5, 86.3], Claude Opus 4.7 70.9% [59.0, 82.9], DeepSeek Flash $0.80 cap 64.1% [50.4, 76.9], Kimi K2.6 55.6% [41.0, 70.1], DeepSeek Pro 43.9% [29.8, 57.9], GPT-5.4 Mini 29.1% [16.2, 42.7]. Intervals resample challenge IDs and retain three epochs per challenge.
- Paired challenge-level bootstrap contrasts: DeepSeek Flash $2.10 minus $0.80 = +22.2 percentage points [12.8, 32.5]; GPT-5.5 minus DeepSeek Flash $2.10 = +7.7 percentage points [1.7, 15.4]; GPT-5.5 minus Claude Opus 4.8 = +19.7 percentage points [9.4, 30.8]; DeepSeek Flash $2.10 minus Claude Opus 4.8 = +12.0 percentage points [1.7, 23.1]; Claude Opus 4.8 minus Opus 4.7 = +3.4 percentage points [-9.4, 16.2].

## BOTSv1 table provenance

Source report: `source-eval-repo/charts/botsv1_report.html`.

| Paper row | Source log | Notes |
|---|---|---|
| Claude Opus 4.8 | `logs/2026-06-15T04-30-45-00-00_botsv_iusRJmJKvQTdrAcnhqVFU3.eval` | Cost limit `$2.10`; high/default reasoning effort; k8s `chart`. |
| GPT-5.5 high effort | `logs/2026-06-15T06-09-42-00-00_botsv_VYcxyGse2gyga8MGcsWNYg.eval` | Cost limit `$2.10`; high reasoning effort; k8s `chart`. |
| GPT-5.5 | `logs/2026-06-14T21-12-20-00-00_botsv_6cHBshKy4Xxt82no2geqK3.eval` | Cost limit `$2.10`; medium/default reasoning effort; k8s `chart`. |
| DeepSeek v4 Pro | `logs/2026-06-14T23-14-52-00-00_botsv_nKdSUbcTJe6XrzyRvsmgvV.eval` | Cost limit `$2.10`; k8s `chart`. |
| DeepSeek v4 Flash ($4.20 cap) | `logs/2026-06-15T04-59-44-00-00_botsv_9LMvv2EkysNTH3VtjK2mxm.eval` | Higher per-sample cap; k8s `chart-bots-data-2`. |
| DeepSeek v4 Flash | `logs/2026-06-14T23-07-00-00-00_botsv_kndnbzEAcciuAjoNMDxPaj.eval` | Cost limit `$2.10`; k8s `chart-bots-data-2`. |
| GPT-5.4 Mini | `logs/2026-06-14T21-12-18-00-00_botsv_fa7uxP9AX2ndw96Zreuguf.eval` | Cost limit `$2.10`; k8s `chart`. |

### BOTSv1 robustness and caveats

- Official warm-up q1 is excluded by task default; full runs contain 31 scored questions.
- Twenty-three of 31 scored questions have explicit prerequisite dependencies and receive prerequisite context in the prompt; this measures follow-up investigation with known case state, not cold-start reconstruction.
- Rows use three epochs and mean reduction, so points are reduced back to the single-epoch point scale (10,300 possible).
- Primary metric is `bots_points`; binary `includes` is secondary.
- Tool costs include Brave Search and non-cache WhoisXMLAPI DRS credits where transcript events show a charged provider call. VirusTotal public API, DNS, and live WHOIS/RDAP are treated as zero marginal cost.
- Tool-adjusted cost excludes Kubernetes/Splunk infrastructure, free-tier effects, and enterprise pricing variation.
- Question-level bootstrap intervals from existing logs: Claude Opus 4.8 93.9% [82.7, 99.5], GPT-5.5 high effort 81.4% [67.4, 94.1], GPT-5.5 81.0% [64.1, 96.4], DeepSeek v4 Pro 77.8% [61.0, 93.1], DeepSeek Flash $4.20 cap 73.9% [53.2, 91.9], DeepSeek Flash $2.10 cap 73.0% [52.7, 91.1], GPT-5.4 Mini 27.5% [14.9, 42.3]. Intervals resample question IDs and retain three epochs and official point weights per question.
- Paired question-level bootstrap contrasts: Claude Opus 4.8 minus GPT-5.5 = +12.8 percentage points [0.9, 27.4]; Claude Opus 4.8 minus GPT-5.5 high effort = +12.5 percentage points [2.4, 23.7]; DeepSeek Flash $4.20 minus $2.10 = +0.9 percentage points [-4.9, 6.9].
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
| DeepSeek v4 Flash no-tools attempts | `logs/2026-06-23T23-02-47-00-00_botsv_czbzdhrvvc4M5ScvGAem9B.eval`, `logs/2026-06-23T23-09-56-00-00_botsv_Ceycej2VdhBaq4xz5oftMU.eval` | Blocked before scored samples by OpenRouter `401 User not found`; omitted from chart rather than scored as zero. |

The no-tools solver registers no Splunk, web, bash, Python, or other tools. `prereq_context=true` appends official prerequisite question/answer context for dependent questions; `false` uses only the official question text. These probes support the claim that BOTSv1 absolute scores are contaminated by public-answer memorization or leakage.

## Additional experiment recommendation

No additional experiments are planned for this submission. Existing Cybench and BOTSv1 logs now support the uncertainty, paired-contrast, prerequisite-context, hint/miss-loss, and Claude Opus 4.8 Cybench checks summarized in the `paper.tex` appendix. If future experiments are explicitly approved, keep them to Cybench or BOTSv1 and run them through Inspect under the applicable operational constraints. The highest-value conditional follow-ups are a BOTSv1 contamination probe (answer-before-query audit or perturbed questions) or a `prereq_context=false` ablation for the top model. Do not run BOTS v2/v3 for this submission cycle.
