#!/usr/bin/env python3
"""Render the six figures in the paper's shared chart style.

The four scaling figures digitize only the coloured trajectory pixels from the
paper's audited source PNGs in ``chart_sources``.  Those snapshots remain the
numerical authority; axes, labels, legends, grids, and typography are rebuilt
here.  This avoids silently substituting newer predecessor-repo runs.  The two
bar figures use the exact values reported in paper.tex.
"""
from pathlib import Path
import json
import numpy as np
from PIL import Image
import matplotlib as mpl
import matplotlib.pyplot as plt
from matplotlib.lines import Line2D

ROOT = Path(__file__).resolve().parents[1]
OUT, SRC = ROOT / "figures", Path(__file__).with_name("chart_sources")
FONT = "/usr/share/texmf/fonts/opentype/public/lm/lmsans10-regular.otf"
FOREST, LEAF, OLIVE, INK = "#1F5137", "#567461", "#6E711C", "#151A16"
MUTED, RULE, WASH = "#606A63", "#C9D0C8", "#F2F5EA"
BLUE, RUST, PURPLE = "#2563A8", "#A64B35", "#756187"
SOL, FABLE, LUNA = "#7A5AF8", "#C24164", "#D97706"
TAB = {"blue": (31,119,180), "orange": (255,127,14), "green": (44,160,44),
       "red": (214,39,40), "purple": (148,103,189), "brown": (140,86,75),
       "pink": (227,119,194)}
COLORS = {"Opus 4.8": FOREST, "Opus 4.7": LEAF, "GPT-5.5": OLIVE,
          "GPT-5.5 high": "#A17818", "DeepSeek Flash": BLUE,
          "DeepSeek Flash $4.20": "#4E7F9F", "DeepSeek Pro": RUST,
          "Kimi K2.6": PURPLE, "GPT-5.6 Sol": SOL,
          "GPT-5.6 Luna": LUNA, "Fable 5": FABLE}
DISPLAY = {"Opus 4.8": "Claude Opus 4.8", "Opus 4.7": "Claude Opus 4.7",
           "DeepSeek Flash": "DeepSeek v4 Flash",
           "DeepSeek Flash $4.20": "DeepSeek v4 Flash $4.20",
           "DeepSeek Pro": "DeepSeek v4 Pro", "Fable 5": "Claude Fable 5"}
MARKERS = {"Opus 4.8": "o", "Opus 4.7": "s", "GPT-5.5": "^",
           "GPT-5.5 high": "v", "DeepSeek Flash": "D",
           "DeepSeek Flash $4.20": "X", "DeepSeek Pro": "<", "Kimi K2.6": ">",
           "GPT-5.6 Sol": "X", "GPT-5.6 Luna": "s", "Fable 5": "P"}
HEADLINE_LINESTYLES = {
    "Opus 4.8": "-", "GPT-5.5": (0, (5, 2)),
    "DeepSeek Flash": (0, (3, 1)), "GPT-5.6 Sol": (0, (1, 1)),
    "GPT-5.6 Luna": (0, (5, 1, 1, 1)), "Fable 5": (0, (3, 1, 1, 1)),
}
HEADLINE_DISPLAY = {"GPT-5.6 Luna": "GPT-5.6 Luna (Cybench)",
                    "Fable 5": "Claude Fable 5 (BOTS v1)"}
MODEL_FAMILIES = [
    ["Opus 4.8", "Opus 4.7"],
    ["GPT-5.5", "GPT-5.5 high"],
    ["DeepSeek Flash", "DeepSeek Flash $4.20", "DeepSeek Pro"],
    ["Kimi K2.6"],
]

mpl.font_manager.fontManager.addfont(FONT)
mpl.rcParams.update({"font.family": "Latin Modern Sans", "font.size": 8.2,
    "axes.labelcolor": INK, "axes.edgecolor": INK, "text.color": INK,
    "xtick.color": MUTED, "ytick.color": MUTED, "axes.linewidth": .65,
    "figure.facecolor": "white", "savefig.facecolor": "white"})
LEGEND_BOX = {"frameon": True, "fancybox": False, "framealpha": .96,
              "facecolor": "white", "edgecolor": RULE}


def finish(fig, name):
    fig.savefig(OUT / f"{name}.png", dpi=300, bbox_inches="tight", facecolor="white")
    plt.close(fig)


def style(ax, xlabel, ylabel, *, xscale="linear", xlim=None, xticks=None):
    ax.set(xlabel=xlabel, ylabel=ylabel, ylim=(0, 100))
    if xscale == "log": ax.set_xscale("log")
    if xscale == "symlog": ax.set_xscale("symlog", linthresh=25)
    if xlim: ax.set_xlim(*xlim)
    if xticks: ax.set_xticks(xticks, [str(x) for x in xticks])
    ax.grid(axis="y", color=RULE, linewidth=.55, alpha=.75)
    ax.spines[["top", "right"]].set_visible(False)
    ax.tick_params(length=3, width=.65)


def handles(labels):
    return [Line2D([0], [0], color=COLORS[x], lw=2, marker=MARKERS[x],
                   markersize=4.2, markeredgecolor="white", markeredgewidth=.35,
                   label=DISPLAY.get(x, x)) for x in labels]


def family_legend(labels):
    """Lay out one model family per legend column."""
    present = set(labels)
    columns = [[label for label in family if label in present]
               for family in MODEL_FAMILIES]
    columns = [column for column in columns if column]
    rows = max(map(len, columns))
    ordered = []
    for column in columns:
        ordered.extend(column + [None] * (rows - len(column)))
    legend_handles, legend_labels = [], []
    for label in ordered:
        if label is None:
            legend_handles.append(Line2D([], [], linestyle="none", alpha=0))
            legend_labels.append("")
        else:
            legend_handles.extend(handles([label]))
            legend_labels.append(DISPLAY.get(label, label))
    return legend_handles, legend_labels, len(columns), rows


def digitized(name, crop, source_colors, *, source_alpha=1.0):
    """Return normalized trajectory point clouds from an audited raster crop.

    Core colors recover solid trajectories. Passing the source plot's alpha
    recovers its lighter dotted reference trajectories without inventing data.
    """
    a = np.asarray(Image.open(SRC / f"{name}.png").convert("RGB"), dtype=float)
    x0, y0, x1, y1 = crop
    panel = a[y0:y1 + 1, x0:x1 + 1]
    result = {}
    for label, old in source_colors.items():
        source = np.array(TAB[old], dtype=float)
        target = source_alpha * source + (1 - source_alpha) * 255
        dist = np.linalg.norm(panel - target, axis=2)
        yy, xx = np.where(dist < (34 if source_alpha == 1 else 24))
        # Keep every core trajectory pixel: thinning made nominally solid paths
        # visibly stippled at print size.
        result[label] = (xx / (x1-x0), 100 * (1 - yy / (y1-y0)))
    return result


def marker_points(x, y, count=6):
    """Sample the digitized path sparsely without changing its geometry."""
    if not len(x): return np.empty((2, 0))
    points = []
    for target in np.linspace(.10, .90, count):
        center = np.quantile(x, target)
        near = np.argsort(np.abs(x - center))[:max(4, len(x) // 300)]
        points.append((np.median(x[near]), np.median(y[near])))
    return np.array(points).T


def scaling_figure(name, panels, labels, figsize=(7.25, 3.05), *, headline=False, clean=False):
    fig, axes = plt.subplots(1, 2, figsize=figsize)
    for ax, p in zip(axes, panels):
        cloud = digitized(name, p["crop"], p["series"])
        # BOTS v1's cost panel also contains alpha=.38 dotted model-token-only
        # companions. Faded antialias pixels from the solid paths have the same
        # composite color, so retain only reference pixels visibly above the
        # nearby solid trajectory (the token-only budget is never larger).
        if p.get("reference"):
            reference = digitized(name, p["crop"], p["series"], source_alpha=.38)
            for key, (u, y) in reference.items():
                solid_u, solid_y = cloud[key]
                bins = np.rint(solid_u * 1000).astype(int)
                ceiling = {}
                for b, value in zip(bins, solid_y):
                    ceiling[b] = max(value, ceiling.get(b, -np.inf))
                ref_bins = np.rint(u * 1000).astype(int)
                baseline = np.array([
                    max((ceiling.get(b + delta, -np.inf) for delta in range(-3, 4)))
                    for b in ref_bins
                ])
                keep = np.isfinite(baseline) & (y > baseline + 1.0)
                lo, hi = p["xlim"]
                x = 10 ** (np.log10(lo) + u[keep] * (np.log10(hi)-np.log10(lo)))
                ax.scatter(x, y[keep], s=.52, marker="s", linewidths=0,
                           color=COLORS[key], alpha=.62, rasterized=True)
        # Digitized x is mapped back through the source axis transform.
        series = []
        for key, (u, y) in cloud.items():
            lo, hi = p["xlim"]
            x = 10 ** (np.log10(lo) + u * (np.log10(hi)-np.log10(lo))) if p["log"] else lo + u*(hi-lo)
            series.append((key, x, y))
        series.extend((key, np.asarray(values["x"]), np.asarray(values["y"]))
                      for key, values in p.get("extra", {}).items())
        for key, x, y in series:
            if headline or clean:
                # Collapse the recovered line thickness to its centerline for a
                # crisp chart without changing the digitized geometry.
                ux, inverse = np.unique(x, return_inverse=True)
                uy = np.array([np.median(y[inverse == i]) for i in range(len(ux))])
                ax.plot(ux, uy, color=COLORS[key], linewidth=2.0 if headline else 1.55,
                        linestyle=HEADLINE_LINESTYLES[key] if headline else "-",
                        solid_capstyle="round", solid_joinstyle="round", zorder=3)
                mx, my = marker_points(ux, uy, 3)
            else:
                ax.scatter(x, y, s=.62, marker="s", linewidths=0,
                           color=COLORS[key], alpha=.98, rasterized=True)
                mx, my = marker_points(x, y)
            ax.plot(mx, my, linestyle="none", marker=MARKERS[key], markersize=4.0,
                    color=COLORS[key], markeredgecolor="white", markeredgewidth=.4,
                    zorder=4)
        style(ax, p["xlabel"], p["ylabel"],
              xscale=p.get("xscale", "log" if p["log"] else "linear"),
              xlim=p.get("plot_xlim", p["xlim"]), xticks=p.get("xticks"))
        if headline:
            ax.spines["bottom"].set_zorder(0)
        if p.get("reference"):
            ax.legend([Line2D([0],[0],color=MUTED,lw=1.5),
                       Line2D([0],[0],color=MUTED,lw=1.5,ls=":")],
                      ["Model + priced tools", "Model tokens only"],
                      loc="upper left", fontsize=7.2, handlelength=2.2,
                      **LEGEND_BOX)
    if headline:
        legend_order = ["Opus 4.8", "GPT-5.6 Sol", "GPT-5.5",
                        "GPT-5.6 Luna", "DeepSeek Flash", "Fable 5"]
        headline_handles = [
            Line2D([0], [0], color=COLORS[key], lw=2,
                   linestyle=HEADLINE_LINESTYLES[key], marker=MARKERS[key],
                   markersize=4.2, markeredgecolor="white", markeredgewidth=.35,
                   label=HEADLINE_DISPLAY.get(key, DISPLAY.get(key, key)))
            for key in legend_order
        ]
        fig.legend(headline_handles, [h.get_label() for h in headline_handles],
                   loc="lower center", ncol=3, frameon=False, fontsize=7.3,
                   handlelength=2.2, columnspacing=1.35)
        fig.subplots_adjust(left=.085, right=.99, top=.98, bottom=.29, wspace=.28)
    else:
        legend_handles, legend_labels, columns, rows = family_legend(labels)
        legend_position = {"bbox_to_anchor": (.5, -.03)} if clean else {}
        fig.legend(legend_handles, legend_labels, loc="lower center", ncol=columns,
                   handlelength=1.8, columnspacing=1.2, fontsize=7.6,
                   **legend_position, **LEGEND_BOX)
        bottom = .33 if clean else {1: .22, 2: .25, 3: .29, 4: .34}[rows]
        fig.subplots_adjust(left=.085, right=.99, top=.98, bottom=bottom, wspace=.30)
    finish(fig, name)


def main_results():
    original = ["Opus 4.8", "GPT-5.5", "DeepSeek Flash"]
    additions = json.loads((SRC / "main_results_additions.json").read_text())
    labels = original + ["GPT-5.6 Sol", "GPT-5.6 Luna", "Fable 5"]
    scaling_figure("main_results_chart", [
      dict(crop=(117,27,1037,477), series=dict(zip(original,["blue","orange","green"])),
           extra=additions["cybench_cost"], xlabel="Per-sample cost budget (USD)",
           ylabel="Challenges solved (%)", log=True, xlim=(4e-4,5), plot_xlim=(4e-4,7)),
      dict(crop=(1207,27,2128,477), series=dict(zip(original,["blue","orange","green"])),
           extra=additions["botsv1_tool_calls"], xlabel="Non-submit tool-call cap",
           ylabel="Answers correct (%)", log=False, xscale="symlog",
           xlim=(0,137), plot_xlim=(0,140), xticks=[0, 5, 10, 20, 50, 100, 140]),
    ], labels, (7.25,3.0), headline=True)


def cybench():
    labels=["GPT-5.5","DeepSeek Flash","Kimi K2.6","DeepSeek Pro","Opus 4.7","Opus 4.8"]
    src=["orange","blue","brown","pink","purple","red"]
    panels=[]
    # Crops and xlims are anchored on the source axis ticks (y=100 tick row 46.5,
    # y=0 spine row 490; cost decades at cols 246.5..1308.5, token decades at
    # cols 1733.7..2899.5) so digitized pixels land at true data coordinates.
    for crop,xlabel,xlim,plot_xlim in [
      ((63,47,1518,490),"Per-sample cost budget (USD)",(3.03e-4,3.91),None),
      ((1772,47,3194,490),"Cumulative tokens",(1.46e3,1.83e9),(1.4e3,1.2e9))]:
        panels.append(dict(crop=crop,series=dict(zip(labels,src)),xlabel=xlabel,
                           ylabel="Cybench solved (%)" if not panels else "",log=True,xlim=xlim,
                           **({"plot_xlim":plot_xlim} if plot_xlim else {})))
    scaling_figure("cybench_scaling_panels",panels,labels,clean=True)


def bots():
    labels=["Opus 4.8","GPT-5.5 high","GPT-5.5","DeepSeek Pro","DeepSeek Flash $4.20","DeepSeek Flash"]
    src=["blue","orange","green","red","purple","brown"]
    scaling_figure("botsv1_scaling_panels",[
      dict(crop=(131,101,935,676),series=dict(zip(labels,src)),xlabel="Per-sample budget (USD)",ylabel="BOTS points (% of max)",log=True,xlim=(.01,8),reference=True),
      dict(crop=(1502,101,2305,676),series=dict(zip(labels,src)),xlabel="Cumulative tokens",ylabel="BOTS points (% of max)",log=True,xlim=(.4,1e9)),
    ],labels)


def tool_calls():
    left = ["GPT-5.5", "Kimi K2.6", "DeepSeek Pro", "DeepSeek Flash", "Opus 4.8"]
    right = ["Opus 4.8", "GPT-5.5", "GPT-5.5 high", "DeepSeek Pro",
             "DeepSeek Flash", "DeepSeek Flash $4.20"]
    all_labels = ["Opus 4.8", "GPT-5.5", "GPT-5.5 high", "DeepSeek Flash",
                  "DeepSeek Flash $4.20", "DeepSeek Pro", "Kimi K2.6"]
    # Crops and xlims anchor on the source axis ticks (left: x=0 tick col 119.5,
    # 1.40625 px/call, y=100 row 53.5, y=0 row 497; right: x=0 tick col 1811.5,
    # 10.025 px/call, y=100 row 46.5, y=0 row 544) so pixels map to true data.
    LEFT_XLIM, RIGHT_XLIM = (0.36, 938.3), (0.05, 133.6)
    left_cloud = digitized("tool_call_scaling_panels", (120,54,1439,497),
                           dict(zip(left, ["orange", "brown", "pink", "blue", "red"])))
    right_cloud = digitized("tool_call_scaling_panels", (1812,47,3151,544),
                            dict(zip(right, ["blue", "green", "orange", "red", "brown", "purple"])))
    fig = plt.figure(figsize=(7.25, 5.5))
    grid = fig.add_gridspec(2, 2, width_ratios=(3.25, 1), hspace=.44, wspace=.18)
    axes = [fig.add_subplot(grid[0, 0]), fig.add_subplot(grid[1, :])]
    inset = fig.add_subplot(grid[0, 1])

    # ponytail: Figure 6 needs its own layout; the other scaling figures retain the shared renderer.
    for ax, cloud, xlim, ylabel in [
            (axes[0], left_cloud, LEFT_XLIM, "Cybench solved (%)"),
            (axes[1], right_cloud, RIGHT_XLIM, "BOTS v1 correct (%)")]:
        for key, (u, y) in cloud.items():
            x = xlim[0] + u * (xlim[1] - xlim[0])
            keep = x <= (120 if ax is axes[0] else xlim[1])
            ux, inverse = np.unique(x[keep], return_inverse=True)
            uy = np.array([np.median(y[keep][inverse == i]) for i in range(len(ux))])
            ax.plot(ux, uy, color=COLORS[key], linewidth=1.55,
                    solid_capstyle="round", solid_joinstyle="round")
            mx, my = marker_points(ux, uy, count=4)
            ax.plot(mx, my, linestyle="none", marker=MARKERS[key], markersize=3.8,
                    color=COLORS[key], markeredgecolor="white", markeredgewidth=.4, zorder=4)
        style(ax, "Non-submit tool-call cap", ylabel,
              xlim=(0, 120) if ax is axes[0] else xlim,
              xticks=[0, 20, 40, 60, 80, 100, 120])

    key = "DeepSeek Flash"
    u, y = left_cloud[key]
    x = LEFT_XLIM[0] + u * (LEFT_XLIM[1] - LEFT_XLIM[0])
    keep = x >= 120
    ux, inverse = np.unique(x[keep], return_inverse=True)
    uy = np.array([np.median(y[keep][inverse == i]) for i in range(len(ux))])
    inset.plot(ux, uy, color=COLORS[key], linewidth=1.35,
               solid_capstyle="round", solid_joinstyle="round")
    mx, my = marker_points(ux, uy, count=3)
    inset.plot(mx, my, linestyle="none", marker=MARKERS[key], markersize=3.2,
               color=COLORS[key], markeredgecolor="white", markeredgewidth=.35)
    inset.set(xlim=(120, 930), ylim=(45, 89), title="DeepSeek v4 Flash\n120–930 calls",
              xlabel="Tool-call cap")
    inset.set_xticks([120, 500, 900]); inset.set_yticks([50, 70, 85])
    inset.grid(axis="y", color=RULE, linewidth=.45, alpha=.75)
    inset.tick_params(labelsize=6.5, length=2, width=.55)
    inset.title.set_fontsize(7.0); inset.xaxis.label.set_size(7.0)
    for spine in inset.spines.values(): spine.set_color(MUTED); spine.set_linewidth(.6)

    legend_handles, legend_labels, columns, _ = family_legend(all_labels)
    fig.legend(legend_handles, legend_labels, loc="lower center", ncol=columns,
               handlelength=1.8, columnspacing=1.2, fontsize=7.6, **LEGEND_BOX)
    fig.subplots_adjust(left=.085, right=.99, top=.95, bottom=.22)
    finish(fig, "tool_call_scaling_panels")


def decontamination():
    models=["Claude Opus 4.8","GPT-5.5"]
    vals=[[93.9,74.8,50.0],[81.0,62.1,54.9]]
    labels=["Full agent + tools","No tools + context","No tools, question only"]
    colors=[FOREST,OLIVE,LEAF]
    fig,axs=plt.subplots(1,2,figsize=(7.25,2.55),sharey=True)
    for i,(ax,model,v) in enumerate(zip(axs,models,vals)):
        bars=ax.bar(range(3),v,color=colors,width=.62,
                    hatch=[None, "///", "xxx"], edgecolor=[FOREST, INK, INK], linewidth=.45)
        ax.bar_label(bars,labels=[f"{x:.1f}%" for x in v],padding=2,fontsize=8)
        style(ax,"", "BOTS points (%)" if i==0 else "")
        ax.set_xticks([]); ax.text(.5,-.12,model,transform=ax.transAxes,ha="center",weight="bold")
    fig.legend([mpl.patches.Patch(facecolor=c, hatch=h, edgecolor=INK, linewidth=.45)
                for c,h in zip(colors,[None,"///","xxx"])],labels,
               loc="lower center",ncol=3,fontsize=7.8,**LEGEND_BOX)
    fig.subplots_adjust(left=.09,right=.99,top=.93,bottom=.30,wspace=.16)
    finish(fig,"botsv1_decontamination")


def refusals():
    groups=[
        ("BOTS v1", ["Opus 4.8","GPT-5.6 Terra","GPT-5.6 Sol","Fable 5","GPT-5.6 Luna"],
         [93.9,92.1,91.4,88.4,83.7], [100*2/93,0,0,100*5/93,0],
         ["2/93","0/93","0/93","5/93","0/93"]),
        ("Cybench", ["GPT-5.5","GPT-5.6 Luna","Opus 4.8","GPT-5.6 Terra","GPT-5.6 Sol","Fable 5"],
         [94.1,79.5,76.2,65.8,9.4,0], [6.0,8.5,4.3,33.3,90.6,100],
         ["7/117","10/117","5/117","39/117","106/117","117/117"]),
    ]
    fig,axs=plt.subplots(1,2,figsize=(7.25,3.05))
    for i,(ax,(bench,names,perf,ref,counts)) in enumerate(zip(axs,groups)):
        y=np.arange(len(names)); ax.barh(y,perf,color=FOREST,height=.56)
        rates = np.asarray(ref)
        # BOTS v1 refusal events can coexist with earned points, so overlay the
        # hatch within the performance bar; Cybench refusals remain stacked failures.
        left = np.maximum(np.asarray(perf)-rates, 0) if bench == "BOTS v1" else perf
        ax.barh(y,rates,left=left,color=OLIVE,height=.56,hatch="///",
                edgecolor="white",linewidth=.3)
        ax.set(yticks=y,yticklabels=names,
               xlim=(0,100 if bench == "BOTS v1" else 118),
               xlabel="Performance (%)")
        ax.set_xticks(np.arange(0,101,20))
        ax.invert_yaxis()
        ax.grid(axis="x",color=RULE,lw=.55); ax.set_axisbelow(True); ax.spines[["top","right","left"]].set_visible(False); ax.tick_params(axis="y",length=0)
        for yi,(p,count,rate) in enumerate(zip(perf,counts,ref)):
            if bench == "BOTS v1":
                # Keep secondary refusal context inside the performance bar so
                # it cannot collide with the neighboring panel's model labels.
                ax.text(p-1.6,yi,f"{p:.1f}% · ref {count} ({rate:.1f}%)",ha="right",va="center",
                        fontsize=7.1,color="white")
            else:
                ax.text(101.5,yi,f"{p:.1f}% · ref {count}",va="center",
                        fontsize=7.4,color=MUTED)
    fig.legend([mpl.patches.Patch(color=FOREST),
                mpl.patches.Patch(facecolor=OLIVE,hatch="///")],
               ["Performance","Refusal events"],
               loc="lower center",ncol=3,fontsize=7.5,**LEGEND_BOX)
    fig.subplots_adjust(left=.14,right=.995,top=.92,bottom=.22,wspace=.36)
    finish(fig,"gpt56_comparison_with_refusals")


def main():
    OUT.mkdir(exist_ok=True)
    main_results(); cybench(); bots(); tool_calls(); decontamination(); refusals()
    names=["main_results_chart","cybench_scaling_panels","botsv1_scaling_panels","tool_call_scaling_panels","botsv1_decontamination","gpt56_comparison_with_refusals"]
    assert all((OUT/f"{n}.png").stat().st_size > 10_000 for n in names)
    print("Regenerated six paper charts")

if __name__ == "__main__": main()
