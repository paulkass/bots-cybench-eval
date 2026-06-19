# Paper provenance notes

Companion provenance for `paper.tex`. This file keeps detailed evidence out of the 5-page short-paper budget while preserving source mapping for quantitative claims. Source-of-truth artifacts live in a separate source evaluation repository, referenced below as `source-eval-repo/`. Raw `.eval` logs should not be copied into this paper repository or submitted as artifacts without a separate sanitization pass.

Audit state when this note was written: paper repository base commit `f390408` plus uncommitted submission-draft edits; source repository base commit `0cf3bd8` plus dirty chart/report artifacts (`charts/README.md`, `charts/botsv1_report.html`, `charts/cybench_report.html`, `charts/make_botsv1_chart.py`, `charts/make_botsv1_report.py`, `charts/make_report.py`, `charts/botsv1_tool_calls.png`, and `charts/cybench_tool_calls.png`). Record final commit hashes again before any public release.

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
- `source-eval-repo/charts/make_report.py`
- `source-eval-repo/charts/make_botsv1_report.py`
- `source-eval-repo/charts/botsv1_tool_costs.py`

## Cybench table provenance

Source table: `source-eval-repo/charts/cybench_cost_table.csv`.

| Paper row | Source log(s) | Notes |
|---|---|---|
| GPT-5.5 + autocompact | `logs/2026-05-14T21-03-03-00-00_cybench_BX35J4hLm3ysoLizzwAD48.eval` | Successful run; chart cost also aggregates same-day failed retries. |
| DeepSeek v4 Flash + autocompact ($2.10 cap) | `logs/2026-05-19T16-35-07-00-00_cybench_NNuvY6MXYTSRkaAARLBZwT.eval` | Same model/solver as lower-cap row, higher per-sample cap. |
| Claude Opus 4.7 + autocompact | `logs/2026-05-26T06-06-51-00-00_cybench_nhMeY9ziwx7dguUqQbVYkG.eval` | Cost computed from Anthropic token counts/rates where API did not populate `total_cost`. |
| DeepSeek v4 Flash + autocompact ($0.80 cap) | `logs/2026-05-14T03-39-12-00-00_cybench_YysW3bBz56oRtEaQUFQnED.eval` | Phase-B autocompact run. |
| Kimi K2.6 + autocompact | `logs/2026-05-18T18-00-18-00-00_cybench_MGadcz7L9SsafZCWfb3FMY.eval` | Constrained OpenRouter providers; source log records `$0.85` cost limit. |
| DeepSeek v4 Pro + autocompact | `logs/2026-05-15T23-44-23-00-00_cybench_VWFUUdor5Useewi4zjrRdo.eval` | 38 challenges because `chunky` was excluded after deterministic sandbox-init failure; solved value in paper follows generated chart's 39-challenge normalization. |
| GPT-5.4 Mini + autocompact | `logs/2026-05-15T06-49-32-00-00_cybench_FJTzVLJ9wmDDWQxm3wWAEh.eval` | `$0.80` cost limit; high refusal rate. |

### Cybench caveats

- The rows are not a controlled model-only experiment.
- Cost limits, OpenRouter routing, concurrency, and one challenge denominator varied.
- GPT-5.5 and DeepSeek v4 Pro cost rows include same-day failed-retry overhead in the charted cost totals.
- Reported `solved` is fractional pass@1 (mean correctness over three epochs), not an integer challenge count.

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

### BOTSv1 caveats

- Official warm-up q1 is excluded by task default; full runs contain 31 scored questions.
- Rows use three epochs and mean reduction, so points are reduced back to the single-epoch point scale (10,300 possible).
- Primary metric is `bots_points`; binary `includes` is secondary.
- Tool costs include Brave Search and non-cache WhoisXMLAPI DRS credits where transcript events show a charged provider call. VirusTotal public API, DNS, and live WHOIS/RDAP are treated as zero marginal cost.
- Tool-adjusted cost excludes Kubernetes/Splunk infrastructure, free-tier effects, and enterprise pricing variation.

## Additional experiment recommendation

No additional experiments are planned for this submission. Existing Cybench and BOTSv1 evidence is sufficient for a focused short paper. If future experiments are explicitly approved, keep them to Cybench or BOTSv1 and run them through Inspect under the applicable operational constraints. Do not run BOTS v2/v3 for this submission cycle.
