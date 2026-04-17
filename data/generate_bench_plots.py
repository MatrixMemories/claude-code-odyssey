#!/usr/bin/env python3
"""
Benchmark plot generator for claude-code-guide-website.
Matches the neon-glass dark design system (bg #080c10, orange #d97757, cyan #38bdf8).
"""

from __future__ import annotations

import os
import re
import unicodedata

import matplotlib.patches as mpatches
import matplotlib.pyplot as plt
import numpy as np
import pandas as pd
from bs4 import BeautifulSoup
from matplotlib import patheffects
from matplotlib.colors import to_rgba

# ── Paths ─────────────────────────────────────────────────────────────────────
HERE = os.path.dirname(os.path.abspath(__file__))
HTML_PATH = os.path.join(HERE, "benchmarks_data.html")
OUTPUT_DIR = os.path.join(HERE, "outputs")
os.makedirs(OUTPUT_DIR, exist_ok=True)


# ── Data loading ──────────────────────────────────────────────────────────────
def load_data(path: str) -> pd.DataFrame:
    with open(path, "r", encoding="utf-8") as f:
        soup = BeautifulSoup(f.read(), "html.parser")

    headers = [th.get_text(strip=True) for th in soup.select("thead th")]
    rows = []
    for tr in soup.select("tbody tr"):
        cells = [td.get_text(strip=True) for td in tr.select("td")]
        rows.append(cells)

    df = pd.DataFrame(rows, columns=headers)

    # Strip parenthetical suffixes from model names (e.g. "(Thinking)")
    df["Model"] = df["Model"].str.replace(r"\s*\(.*?\)", "", regex=True).str.strip()

    # Numeric coercion
    for col in df.columns[1:]:
        df[col] = pd.to_numeric(df[col], errors="coerce")

    return df


# ── Company colour palette ────────────────────────────────────────────────────
COMPANY_COLORS: dict[str, str] = {
    "Anthropic":   "#d97757",   # terracotta – Claude brand anchor
    "Moonshot AI": "#e9e9f0",   # light – Kimi / Moonshot
    "Z.ai":    "#2563eb",   # blue – GLM
    "MiniMax":     "#e11d48",   # red – MiniMax
}

MODEL_COMPANY: dict[str, str] = {
    "Claude":  "Anthropic",
    "Kimi":    "Moonshot AI",
    "GLM":     "Z.ai",
    "MiniMax": "MiniMax",
}


def company_of(model: str) -> str:
    for prefix, company in MODEL_COMPANY.items():
        if prefix in model:
            return company
    return "Unknown"


def color_of(model: str) -> str:
    return COMPANY_COLORS.get(company_of(model), "#ffffff")


def glow_rgba(hex_color: str, alpha: float = 0.18) -> tuple:
    r, g, b, _ = to_rgba(hex_color)
    return (r, g, b, alpha)


# ── Design tokens (matching neon-glass.css) ───────────────────────────────────
BG       = "#080c10"
CARD_BG  = "#0d1117"
GRID_CLR = "#1a2a3a"
TX       = "#b8cce0"
HD       = "#ffffff"
MU       = "#4a6a8a"
ACC      = "#d97757"
BLUE     = "#38bdf8"

plt.rcParams.update({
    "font.family":       "DejaVu Sans",
    "text.color":        TX,
    "axes.labelcolor":   TX,
    "xtick.color":       MU,
    "ytick.color":       MU,
    "axes.edgecolor":    GRID_CLR,
    "figure.facecolor":  BG,
    "axes.facecolor":    CARD_BG,
    "axes.grid":         True,
    "grid.color":        GRID_CLR,
    "grid.linestyle":    "--",
    "grid.linewidth":    0.6,
    "grid.alpha":        0.8,
    "axes.axisbelow":    True,
    "legend.framealpha": 0.12,
    "legend.edgecolor":  GRID_CLR,
    "legend.labelcolor": TX,
    "figure.dpi":        150,
})


# ── Shared figure helpers ─────────────────────────────────────────────────────
def _gradient_topline(fig: plt.Figure) -> None:
    """Thin orange→cyan accent line across the top of the figure."""
    for frac, clr in enumerate([BLUE, BLUE]):
        x0 = 0.04 + frac * 0.46
        x1 = x0 + 0.46
        line = plt.Line2D([x0, x1], [0.975, 0.975],
                          transform=fig.transFigure,
                          color=clr, linewidth=1.8, solid_capstyle="round",
                          alpha=0.85)
        fig.add_artist(line)


def _style_ax(ax: plt.Axes) -> None:
    ax.spines["top"].set_visible(False)
    ax.spines["right"].set_visible(False)
    ax.spines["left"].set_color(GRID_CLR)
    ax.spines["bottom"].set_color(GRID_CLR)


def _style_legend(legend) -> None:
    """Apply a styled box to any legend."""
    frame = legend.get_frame()
    frame.set_facecolor(CARD_BG)
    frame.set_edgecolor(ACC)
    frame.set_linewidth(0.9)
    frame.set_alpha(0.92)


class _GradBarHandler:
    """
    Custom legend handle renderer: mini gradient bar with neon cap,
    matching the plot bar style.
    """
    def __init__(self, color: str) -> None:
        self.color = color

    def legend_artist(self, legend, orig_handle, fontsize, handlebox):
        x0, y0 = handlebox.xdescent, handlebox.ydescent
        w,  h  = handlebox.width,    handlebox.height
        r, g, b = to_rgba(self.color)[:3]
        n = 28  # gradient slices
        for k in range(n):
            t = k / (n - 1)
            c = (r * (0.06 + 0.94 * t),
                 g * (0.06 + 0.94 * t),
                 b * (0.06 + 0.94 * t),
                 0.92)
            rect = plt.Rectangle(
                [x0, y0 + k * h / n], w, h / n + 0.4,
                facecolor=c, edgecolor="none",
                transform=handlebox.get_transform(),
            )
            handlebox.add_artist(rect)
        # Neon cap on top
        cap = plt.Line2D(
            [x0, x0 + w], [y0 + h, y0 + h],
            color=self.color, linewidth=1.8,
            transform=handlebox.get_transform(), alpha=0.95,
        )
        handlebox.add_artist(cap)
        return rect   # last artist is the return value


def _figure_atmosphere(fig: plt.Figure) -> None:
    """
    Subtle radial glow in figure corners, matching the website's
    --atmosphere CSS variable (ACC top-left, BLUE bottom-right).
    """
    W, H = 300, 200
    xs = np.linspace(0, 1, W)[np.newaxis, :]   # (1, W)
    ys = np.linspace(0, 1, H)[:, np.newaxis]   # (H, 1) — 0=bottom, 1=top

    r_a, g_a, b_a, _ = to_rgba(ACC)
    r_b, g_b, b_b, _ = to_rgba(BLUE)

    d_a = np.sqrt((xs - 0.14) ** 2 + (ys - 0.82) ** 2)
    a_a = np.clip(0.16 - d_a * 0.42, 0, None)

    d_b = np.sqrt((xs - 0.88) ** 2 + (ys - 0.18) ** 2)
    a_b = np.clip(0.13 - d_b * 0.38, 0, None)

    img = np.zeros((H, W, 4))
    img[..., 0] = r_a * a_a + r_b * a_b
    img[..., 1] = g_a * a_a + g_b * a_b
    img[..., 2] = b_a * a_a + b_b * a_b
    img[..., 3] = np.clip(a_a + a_b, 0, 1)
    np.clip(img, 0, 1, out=img)

    ax_bg = fig.add_axes([0, 0, 1, 1], zorder=-10)
    ax_bg.imshow(img, aspect="auto", extent=[0, 1, 0, 1],
                 transform=fig.transFigure, origin="lower",
                 interpolation="bilinear")
    ax_bg.set_axis_off()
    ax_bg.patch.set_alpha(0)


def _company_legend_outside(ax: plt.Axes, **kw) -> None:
    """Place company colour legend (gradient handles, colored text) to the right."""
    patches = [
        mpatches.Patch(facecolor=c, label=name, edgecolor="none")
        for name, c in COMPANY_COLORS.items()
    ]
    handler_map = {p: _GradBarHandler(c) for p, c in zip(patches, COMPANY_COLORS.values())}
    defaults = dict(fontsize=8.5, loc="upper left",
                    bbox_to_anchor=(1.06, 1), borderaxespad=0,
                    frameon=True, framealpha=0.92,
                    handler_map=handler_map)
    leg = ax.legend(handles=patches, **{**defaults, **kw})
    _style_legend(leg)
    for text, clr in zip(leg.get_texts(), COMPANY_COLORS.values()):
        text.set_color(clr)


def _ascii_stem(s: str) -> str:
    """Filename-safe ASCII stem from a potentially unicode column name."""
    s = unicodedata.normalize("NFKD", s)
    s = s.encode("ascii", errors="ignore").decode("ascii")
    s = s.replace(" ", "_").replace("/", "-")
    s = re.sub(r"[_\-]{2,}", "_", s)
    return s[:32].strip("_")


def _safe_title(col: str) -> str:
    """Strip characters DejaVu can't render (e.g. mathematical italic tau)."""
    return unicodedata.normalize("NFKD", col).encode("ascii", errors="ignore").decode("ascii")


def save(fig: plt.Figure, stem: str) -> None:
    path = os.path.join(OUTPUT_DIR, f"bench_plot_{stem}.png")
    fig.savefig(path, dpi=150, bbox_inches="tight", facecolor=BG)
    plt.close(fig)
    safe = path.encode("ascii", errors="replace").decode("ascii")
    print(f"  saved -> {safe}")


# ── Value label helpers ───────────────────────────────────────────────────────
def _bar_labels(ax: plt.Axes, bars, fmt: str = "{:.1f}", yoffset: float = 0.8,
               colors: list | None = None) -> None:
    for i, bar in enumerate(bars):
        h = bar.get_height()
        c = colors[i] if colors is not None else TX
        # Ensure full-alpha colour for text (unpack RGBA tuple if needed)
        text_color = c if isinstance(c, str) else (*c[:3], 1.0)
        ax.text(bar.get_x() + bar.get_width() / 2, h + yoffset,
                fmt.format(h), ha="center", va="bottom",
                fontsize=7.5, color=text_color, fontfamily="monospace")


def _hbar_labels(ax: plt.Axes, bars, fmt: str = "{:.0f}", xoffset: float = 0.5,
                colors: list | None = None) -> None:
    for i, bar in enumerate(bars):
        w = bar.get_width()
        c = colors[i] if colors is not None else TX
        text_color = c if isinstance(c, str) else (*c[:3], 1.0)
        ax.text(w + xoffset, bar.get_y() + bar.get_height() / 2,
                fmt.format(w), ha="left", va="center",
                fontsize=7.5, color=text_color, fontfamily="monospace")


# ── Gradient bar helper ───────────────────────────────────────────────────────
def _draw_gradient_bar(ax: plt.Axes, xi: float, height: float, width: float,
                       hex_color: str, brightness: float = 1.0) -> None:
    """Vertical gradient bar: near-black at base → company colour at top."""
    if height <= 0:
        return
    import matplotlib.colors as mcolors
    r, g, b = to_rgba(hex_color)[:3]
    r, g, b = r * brightness, g * brightness, b * brightness
    cmap = mcolors.LinearSegmentedColormap.from_list(
        "_bar_grad",
        [(r * 0.06, g * 0.06, b * 0.06, 1.0),
         (r * 0.55, g * 0.55, b * 0.55, 1.0),
         (r,        g,        b,        0.92)],
    )
    gradient = np.linspace(0, 1, 256).reshape(256, 1)
    ax.imshow(
        gradient,
        extent=[xi - width / 2, xi + width / 2, 0, height],
        aspect="auto",
        origin="lower",
        cmap=cmap,
        zorder=3,
        interpolation="bilinear",
    )


def _color_xticklabels(ax: plt.Axes, models: list[str]) -> None:
    """Set each x-axis tick label to the company colour of its model."""
    ax.figure.canvas.draw()   # force tick labels to exist as Text objects
    for lbl, model in zip(ax.get_xticklabels(), models):
        lbl.set_color(color_of(model))


def _draw_gradient_barh(ax: plt.Axes, yi: float, width: float, height: float,
                        hex_color: str, brightness: float = 1.0) -> None:
    """Horizontal gradient bar: near-black at left → company colour at right."""
    if width <= 0:
        return
    import matplotlib.colors as mcolors
    r, g, b = to_rgba(hex_color)[:3]
    r, g, b = r * brightness, g * brightness, b * brightness
    cmap = mcolors.LinearSegmentedColormap.from_list(
        "_barh_grad",
        [(r * 0.06, g * 0.06, b * 0.06, 1.0),
         (r * 0.55, g * 0.55, b * 0.55, 1.0),
         (r,        g,        b,        0.92)],
    )
    gradient = np.linspace(0, 1, 256).reshape(1, 256)   # horizontal ramp
    ax.imshow(
        gradient,
        extent=[0, width, yi - height / 2, yi + height / 2],
        aspect="auto",
        origin="lower",
        cmap=cmap,
        zorder=3,
        interpolation="bilinear",
    )


# ── Plots 1–6: single-metric bar charts (descending) ─────────────────────────
# Resolved at runtime to avoid hard-coding the special-char tau column name.
BENCHMARK_COL_INDICES = list(range(1, 7))   # df.columns[1] .. df.columns[6]


def plot_single_metric(df: pd.DataFrame, col: str, plot_idx: int) -> None:
    sdf = df.sort_values(col, ascending=False).reset_index(drop=True)

    fig, ax = plt.subplots(figsize=(13, 6.5))
    fig.subplots_adjust(top=0.88, bottom=0.22, left=0.18, right=0.82)
    _style_ax(ax)

    bar_w = 0.55
    x_pos = np.arange(len(sdf))
    stroke = [patheffects.withStroke(linewidth=1.8, foreground=BG)]

    for xi, model, val in zip(x_pos, sdf["Model"], sdf[col]):
        clr = color_of(model)

        # Layered glow: wide diffuse → narrow bright
        ax.bar(xi, val, width=bar_w + 0.30, color=glow_rgba(clr, 0.06), zorder=1, edgecolor="none")
        ax.bar(xi, val, width=bar_w + 0.14, color=glow_rgba(clr, 0.13), zorder=2, edgecolor="none")

        # Gradient-filled bar body
        _draw_gradient_bar(ax, xi, val, bar_w, clr)

        # Neon cap: bright line across the bar top
        ax.plot(
            [xi - bar_w / 2 + 0.03, xi + bar_w / 2 - 0.03], [val, val],
            color=clr, linewidth=2.8, alpha=0.95, zorder=5,
            solid_capstyle="round",
        )

        # Value label — coloured, bold, with dark stroke for legibility
        ax.text(
            xi, val + 1.5, f"{val:.1f}",
            ha="center", va="bottom",
            fontsize=8, color=clr, fontweight="bold",
            fontfamily="monospace", zorder=6,
            path_effects=stroke,
        )

    # Subtle baseline accent
    ax.axhline(0, color=GRID_CLR, linewidth=1.2, zorder=0)

    ax.set_xlim(-0.6, len(sdf) - 0.4)
    ax.set_ylim(0, 105)
    ax.set_ylabel("Score (%)", fontsize=10)
    ax.set_title(_safe_title(col), fontsize=15, fontweight="bold", color=HD, pad=14)
    ax.set_xticks(x_pos)
    ax.set_xticklabels(sdf["Model"], rotation=30, ha="right", fontsize=9)
    _color_xticklabels(ax, list(sdf["Model"]))
    ax.set_yticks([0, 25, 50, 75, 100])   # align grid lines with tick marks
    ax.yaxis.set_tick_params(labelsize=8)
    ax.grid(axis="x", visible=False)

    _company_legend_outside(ax)
    _figure_atmosphere(fig)
    _gradient_topline(fig)
    save(fig, f"{plot_idx:02d}_{_ascii_stem(col)}")


# ── Plot 7+8: cost double bar (ascending by cumulative cost) ──────────────────
def plot_cost_double(df: pd.DataFrame) -> None:
    col_in  = "Cost per 1M input tokes"
    col_out = "Cost per 1M output tokes"

    cum = 0.75 * df[col_in] + 0.25 * df[col_out]
    sdf = df.assign(_cum=cum).sort_values("_cum", ascending=True).reset_index(drop=True)

    x = np.arange(len(sdf))
    w = 0.36          # bar width
    glow_w = w        # glow exactly equals bar width → shadows touch, don't overlap

    fig, ax = plt.subplots(figsize=(14, 6.5))
    fig.subplots_adjust(top=0.88, bottom=0.22, left=0.18, right=0.82)
    _style_ax(ax)

    model_colors = [color_of(m) for m in sdf["Model"]]
    stroke = [patheffects.withStroke(linewidth=1.8, foreground=BG)]

    for i, (model, v_in, v_out) in enumerate(
        zip(sdf["Model"], sdf[col_in], sdf[col_out])
    ):
        clr = color_of(model)

        # Glow for the pair (touching shadows, not overlapping)
        ax.bar(i - w / 2, v_in,  width=glow_w + 0.10, color=glow_rgba(clr, 0.07), zorder=1, edgecolor="none")
        ax.bar(i + w / 2, v_out, width=glow_w + 0.10, color=glow_rgba(clr, 0.07), zorder=1, edgecolor="none")
        ax.bar(i - w / 2, v_in,  width=glow_w,        color=glow_rgba(clr, 0.13), zorder=2, edgecolor="none")
        ax.bar(i + w / 2, v_out, width=glow_w,        color=glow_rgba(clr, 0.13), zorder=2, edgecolor="none")

        # Gradient bars: input full brightness, output 60 %
        _draw_gradient_bar(ax, i - w / 2, v_in,  w, clr, brightness=1.0)
        _draw_gradient_bar(ax, i + w / 2, v_out, w, clr, brightness=0.60)

        # Neon cap lines
        for xi, val in ((i - w / 2, v_in), (i + w / 2, v_out)):
            ax.plot(
                [xi - w / 2 + 0.02, xi + w / 2 - 0.02], [val, val],
                color=clr, linewidth=2.5, alpha=0.90, zorder=5,
                solid_capstyle="round",
            )

        # Value labels
        for xi, val in ((i - w / 2, v_in), (i + w / 2, v_out)):
            ax.text(
                xi, val + 0.08, f"${val:.2f}",
                ha="center", va="bottom",
                fontsize=7, color=clr, fontweight="bold",
                fontfamily="monospace", zorder=6,
                path_effects=stroke,
            )

    ax.axhline(0, color=GRID_CLR, linewidth=1.2, zorder=0)
    ax.set_xlim(-0.65, len(sdf) - 0.35)
    ax.set_ylim(0, 30)
    ax.set_ylabel("Price (USD / 1M tokens)", fontsize=10)
    ax.set_title("API Cost per 1M Tokens", fontsize=15, fontweight="bold", color=HD, pad=14)
    ax.set_xticks(x)
    ax.set_xticklabels(sdf["Model"], rotation=30, ha="right", fontsize=9)
    _color_xticklabels(ax, list(sdf["Model"]))
    ax.yaxis.set_tick_params(labelsize=8)
    ax.grid(axis="x", visible=False)

    # Legend: Input (left bar) / Output (right bar) only — no company entries
    type_patches = [
        mpatches.Patch(facecolor="#cccccc", label="Input  (left bar)",  edgecolor="none"),
        mpatches.Patch(facecolor="#555555", label="Output (right bar)", edgecolor="none"),
    ]
    leg = ax.legend(handles=type_patches, fontsize=8.5,
                    loc="upper left", bbox_to_anchor=(1.06, 1), borderaxespad=0,
                    frameon=True, framealpha=0.92)
    _style_legend(leg)

    _figure_atmosphere(fig)
    _gradient_topline(fig)
    save(fig, "07_cost_per_1M_tokens")


# ── Plot 9: TPS (ascending, horizontal) ──────────────────────────────────────
def plot_tps(df: pd.DataFrame) -> None:
    col = "TPS (Tokens per second)"
    sdf = df.sort_values(col, ascending=True).reset_index(drop=True)
    colors = [color_of(m) for m in sdf["Model"]]

    fig, ax = plt.subplots(figsize=(12, 6.5))
    fig.subplots_adjust(top=0.88, bottom=0.10, left=0.18, right=0.82)

    ax.spines["top"].set_visible(False)
    ax.spines["right"].set_visible(False)
    ax.spines["left"].set_color(GRID_CLR)
    ax.spines["bottom"].set_color(GRID_CLR)
    ax.grid(axis="x", color=GRID_CLR, linestyle="--", linewidth=0.6, alpha=0.8)
    ax.grid(axis="y", visible=False)
    ax.set_axisbelow(True)

    bar_h = 0.55
    y_pos = np.arange(len(sdf))
    stroke = [patheffects.withStroke(linewidth=1.8, foreground=BG)]

    for yi, model, val in zip(y_pos, sdf["Model"], sdf[col]):
        clr = color_of(model)

        # Layered glow
        ax.barh(yi, val, height=bar_h + 0.28, color=glow_rgba(clr, 0.06), zorder=1, edgecolor="none")
        ax.barh(yi, val, height=bar_h + 0.13, color=glow_rgba(clr, 0.13), zorder=2, edgecolor="none")

        # Gradient fill
        _draw_gradient_barh(ax, yi, val, bar_h, clr)

        # Neon cap at the right end of the bar
        ax.plot(
            [val, val],
            [yi - bar_h / 2 + 0.03, yi + bar_h / 2 - 0.03],
            color=clr, linewidth=2.8, alpha=0.95, zorder=5,
            solid_capstyle="round",
        )

        # Value label
        ax.text(
            val + 0.5, yi, f"{val:.0f} tok/s",
            ha="left", va="center",
            fontsize=7.5, color=clr, fontweight="bold",
            fontfamily="monospace", zorder=6,
            path_effects=stroke,
        )

    ax.axvline(0, color=GRID_CLR, linewidth=1.2, zorder=0)
    ax.set_yticks(y_pos)
    ax.set_yticklabels(sdf["Model"], fontsize=9.5)
    # Color y-tick labels to match model colors
    ax.figure.canvas.draw()
    for lbl, model in zip(ax.get_yticklabels(), sdf["Model"]):
        lbl.set_color(color_of(model))
    ax.set_xlabel("Tokens per second", fontsize=10)
    ax.set_title("Throughput — Tokens per Second (TPS)", fontsize=15,
                 fontweight="bold", color=HD, pad=14)
    ax.set_xlim(0, 120)
    ax.set_xticks([0, 20, 40, 60, 80, 100, 120])   # explicit ticks align with grid
    ax.xaxis.set_tick_params(labelsize=8)

    _company_legend_outside(ax)
    _figure_atmosphere(fig)
    _gradient_topline(fig)
    save(fig, "09_tps")


# ── Plot 10: Scatter — Artificial Analysis Index vs CumulativeCost ────────────
# Per-model annotation offsets (xytext in points) tuned to avoid overlaps.
# Positive x = right of dot, negative x = left; positive y = above, negative y = below.
# Keep |x_offset| ≤ 50 so labels never exit the axes area.
_SCATTER_OFFSETS: dict[str, tuple[float, float]] = {
    # Right cluster — Claude (cost ≈7.5–10)
    "Claude Opus 4.6":   (  8,   8),   # (10, 53): up-right
    "Claude Opus 4.5":   (  8, -16),   # (10, 50): same x, push down
    "Claude Sonnet 4.6": (  8,   8),   # (7.5, 52): up-right; clear of Opus labels

    # Middle zone
    "GLM-5.1":           (  8,   8),   # (2.15, 51): up-right
    "GLM-5":             (  8, -16),   # (1.55, 50): same y-band as GLM-5.1, push down

    # Left-middle zone
    "Kimi K2.5":         (  8,   8),   # (1.2, 47)
    "Kimi K2":           (  8, -16),   # (1.075, 41): push down to clear GLM-4.7

    # GLM-4.7 sits between Kimi K2 and MiniMax M2.5 — push label left
    "GLM-4.7":           (  16,  0),   # (0.95, 42): -45 pts ≈ -0.7 data units

    # Left cluster — MiniMax (all cost ≈0.525)
    "MiniMax M2.7":      (-10,   16),   # (0.525, 50): top of cluster, up-right
    "MiniMax M2.5":      (-20,  16),   # (0.525, 42): mid cluster, down
    "MiniMax M2.1":      (  8, -20),   # (0.525, 39): bottom, further down
}


def plot_scatter(df: pd.DataFrame) -> None:
    df = df.copy()
    df["CumulativeCost"] = (
        0.75 * df["Cost per 1M input tokes"] + 0.25 * df["Cost per 1M output tokes"]
    )

    x_col = "CumulativeCost"
    y_col = "Artificial Analysis Index"
    x = df[x_col]
    y = df[y_col]

    # x_mid = x.median()
    # y_mid = y.median()

    x_mid = 2
    y_mid = 45

    # Equal left/right outer margins; legend sits in the right margin
    fig, ax = plt.subplots(figsize=(14, 9))
    fig.subplots_adjust(top=0.90, bottom=0.12, left=0.18, right=0.82)
    _style_ax(ax)

    x_lo = max(0, x.min() - 0.4)
    x_hi = x.max() * 1.15
    y_lo = max(0, y.min() - 3)
    y_hi = min(100, y.max() + 6)

    # Tinted quadrant backgrounds
    QUAD_A = 0.06
    ax.fill_betweenx([y_mid, y_hi], x_lo,  x_mid, color=BLUE,      alpha=QUAD_A)
    ax.fill_betweenx([y_mid, y_hi], x_mid, x_hi,  color=ACC,       alpha=QUAD_A)
    ax.fill_betweenx([y_lo,  y_mid], x_lo, x_mid, color=MU,        alpha=QUAD_A)
    ax.fill_betweenx([y_lo,  y_mid], x_mid, x_hi, color="#e05555", alpha=QUAD_A)

    # Quadrant dividers
    ax.axvline(x_mid, color=GRID_CLR, linewidth=1.1, linestyle="--", zorder=2, alpha=0.9)
    ax.axhline(y_mid, color=GRID_CLR, linewidth=1.1, linestyle="--", zorder=2, alpha=0.9)

    # Quadrant corner labels
    qlkw = dict(fontsize=9.5, alpha=0.5, fontfamily="monospace", zorder=3)
    ax.text(x_lo + (x_mid - x_lo) * 0.04, y_hi - (y_hi - y_mid) * 0.04,
            "BEST VALUE",  color=BLUE,      ha="left",  va="top",    **qlkw)
    ax.text(x_hi - (x_hi - x_mid) * 0.04, y_hi - (y_hi - y_mid) * 0.04,
            "PREMIUM",     color=ACC,       ha="right", va="top",    **qlkw)
    ax.text(x_lo + (x_mid - x_lo) * 0.04, y_lo + (y_mid - y_lo) * 0.04,
            "BUDGET",      color=MU,        ha="left",  va="bottom", **qlkw)
    ax.text(x_hi - (x_hi - x_mid) * 0.04, y_lo + (y_mid - y_lo) * 0.04,
            "OVERPRICED",  color="#e07070", ha="right", va="bottom", **qlkw)

    # Glow halos
    for _, row in df.iterrows():
        c = color_of(row["Model"])
        ax.scatter(row[x_col], row[y_col],
                   c=[glow_rgba(c, 0.16)], s=500, zorder=3, edgecolors="none")

    # Main dots
    dot_colors = [color_of(m) for m in df["Model"]]
    ax.scatter(x, y, c=dot_colors, s=110, zorder=5,
               edgecolors=[glow_rgba(c, 0.35) for c in dot_colors], linewidths=1.0)

    # Annotations with stroke outline and per-model offset to avoid overlap
    stroke = [patheffects.withStroke(linewidth=2.8, foreground=BG)]
    for _, row in df.iterrows():
        xt, yt = _SCATTER_OFFSETS.get(row["Model"], (9, 4))
        ax.annotate(
            row["Model"],
            xy=(row[x_col], row[y_col]),
            xytext=(xt, yt),
            textcoords="offset points",
            fontsize=9, color=color_of(row["Model"]),
            zorder=6,
            path_effects=stroke,
        )

    ax.set_xlim(x_lo, x_hi)
    ax.set_ylim(y_lo, y_hi)
    ax.set_xlabel(
        "Cumulative Cost  (0.75 x input + 0.25 x output)  [USD / 1M tokens]",
        fontsize=10,
    )
    ax.set_ylabel("Artificial Analysis Index", fontsize=10)
    ax.set_title(
        "Quality vs Cost — Artificial Analysis Index",
        fontsize=15, fontweight="bold", color=HD, pad=14,
    )
    ax.xaxis.set_tick_params(labelsize=8)
    ax.yaxis.set_tick_params(labelsize=8)

    _company_legend_outside(ax, fontsize=9)
    _figure_atmosphere(fig)
    _gradient_topline(fig)
    save(fig, "10_scatter_quality_vs_cost")


# ── Main ──────────────────────────────────────────────────────────────────────
def main() -> None:
    print("Loading data ...")
    df = load_data(HTML_PATH)
    print(df.to_string(index=False).encode("ascii", errors="replace").decode("ascii"))
    print()

    print("Generating plots ...")

    # Plots 1-6: individual benchmark scores (descending)
    benchmark_cols = [df.columns[i] for i in BENCHMARK_COL_INDICES]
    for i, col in enumerate(benchmark_cols, start=1):
        plot_single_metric(df, col, i)

    # Plot 7+8: input & output cost side-by-side (ascending)
    plot_cost_double(df)

    # Plot 9: TPS horizontal bar (ascending)
    plot_tps(df)

    # Plot 10: scatter quality vs cost with 4 quadrants
    plot_scatter(df)

    print(f"\nAll plots saved to: {OUTPUT_DIR}")


if __name__ == "__main__":
    main()
