/* =========================================================
   GESTÃO.DEV — BurndownChart Component (SVG, no deps)
   Phase 3 · src/components/board/BurndownChart.tsx

   Props drive the chart entirely — backend-ready.
   Ideal line:  linear from totalPoints → 0 over `days` steps.
   Real line:   array of daily remaining points (null = future).
   Status badge shown only when showStatus=true (mini-card use).
========================================================= */

import { useMemo } from 'react';
import s from './BurndownChart.module.css';

// ── Types ─────────────────────────────────────────────────
export type BurnStatus = 'late' | 'ahead' | 'on-track' | 'done' | 'planning';

interface BurndownChartProps {
  totalPoints: number;
  days: number;
  currentDay: number;
  color: string;
  real?: (number | null)[];
  mini?: boolean;
  showStatus?: boolean;
  progress?: number;         // optional % label beside status
}

// ── Helpers ───────────────────────────────────────────────
function hexId(color: string) {
  return color.replace(/[^a-z0-9]/gi, '');
}

export function computeBurnStatus(
  totalPoints: number,
  currentDay: number,
  days: number,
  real?: (number | null)[],
  sprintDone?: boolean,
  sprintPlanning?: boolean,
): BurnStatus {
  if (sprintDone) return 'done';
  if (sprintPlanning || !totalPoints || !real || real.length === 0) return 'planning';

  const currentReal = real[currentDay];
  if (currentReal === null || currentReal === undefined) return 'on-track';

  const ideal = totalPoints * (1 - currentDay / days);
  if (currentReal > ideal * 1.10) return 'late';
  if (currentReal < ideal * 0.90) return 'ahead';
  return 'on-track';
}

const STATUS_LABEL: Record<BurnStatus, string> = {
  late:      'Atrasada',
  ahead:     'Adiantada',
  'on-track': 'No prazo',
  done:      'Concluída',
  planning:  'Planejada — aguardando início',
};

const STATUS_CSS: Record<BurnStatus, string> = {
  late:      s.late,
  ahead:     s.ahead,
  'on-track': s.onTrack,
  done:      s.done,
  planning:  s.planning,
};

// ── Component ─────────────────────────────────────────────
export function BurndownChart({
  totalPoints,
  days,
  currentDay,
  color,
  real,
  mini = false,
  showStatus = false,
  progress,
}: BurndownChartProps) {
  const W = mini ? 300 : 400;
  const H = mini ? 72 : 160;
  const isPlanning = !totalPoints || !real || real.length === 0;
  const gradId = `bd-${hexId(color)}-${mini ? 'm' : 'f'}`;

  // Real line points (only non-null entries)
  const { realPolyline, realPolygon, endDot } = useMemo(() => {
    if (isPlanning || !real) return { realPolyline: '', realPolygon: '', endDot: null };

    const pts: { x: number; y: number }[] = [];
    real.forEach((v, i) => {
      if (v === null) return;
      const x = (i / days) * W;
      const y = (1 - v / totalPoints) * H;
      pts.push({ x, y });
    });

    if (pts.length === 0) return { realPolyline: '', realPolygon: '', endDot: null };

    const poly = pts.map((p) => `${p.x.toFixed(1)},${p.y.toFixed(1)}`).join(' ');
    const last = pts[pts.length - 1];
    const area = `${poly} ${last.x.toFixed(1)},${H} 0,${H}`;

    return {
      realPolyline: poly,
      realPolygon: area,
      endDot: last,
    };
  }, [real, totalPoints, days, W, H, isPlanning]);

  // Grid lines (full chart only)
  const gridLines = useMemo(() => {
    if (mini) return [];
    return [0.25, 0.5, 0.75].map((frac) => ({
      y: frac * H,
      label: Math.round(totalPoints * (1 - frac)),
    }));
  }, [mini, H, totalPoints]);

  return (
    <div className={mini ? s.mini : s.full}>
      <svg viewBox={`0 0 ${W} ${H}`} preserveAspectRatio="none" aria-hidden="true">
        <defs>
          <linearGradient id={gradId} x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%"   stopColor={color} stopOpacity="0.18" />
            <stop offset="100%" stopColor={color} stopOpacity="0" />
          </linearGradient>
        </defs>

        {/* Y-axis grid (full chart only) */}
        {gridLines.map((gl) => (
          <g key={gl.y}>
            <line x1="0" y1={gl.y} x2={W} y2={gl.y}
              stroke="rgba(255,255,255,0.04)" strokeWidth="0.5" />
            <text x="4" y={gl.y - 3} fill="rgba(255,255,255,0.2)"
              fontSize="7" fontFamily="monospace">
              {gl.label}
            </text>
          </g>
        ))}

        {/* Ideal line */}
        <line
          x1="0" y1="0" x2={W} y2={H}
          stroke="rgba(255,255,255,0.18)"
          strokeWidth={mini ? 1 : 1.5}
          strokeDasharray="5 3"
        />

        {/* Real area fill */}
        {realPolygon && (
          <polygon points={realPolygon} fill={`url(#${gradId})`} />
        )}

        {/* Real polyline */}
        {realPolyline && (
          <polyline
            points={realPolyline}
            fill="none"
            stroke={color}
            strokeWidth={mini ? 1.5 : 2}
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        )}

        {/* Current-day marker (full chart only) */}
        {!mini && currentDay > 0 && currentDay < days && (
          <>
            <line
              x1={(currentDay / days) * W}
              y1="0"
              x2={(currentDay / days) * W}
              y2={H}
              stroke="rgba(245,158,11,0.35)"
              strokeWidth="1"
              strokeDasharray="3 3"
            />
            <text
              x={(currentDay / days) * W + 4}
              y="12"
              fill="rgba(245,158,11,0.80)"
              fontSize="8"
              fontFamily="monospace"
            >
              hoje
            </text>
          </>
        )}

        {/* Endpoint dot */}
        {endDot && (
          <circle
            cx={endDot.x}
            cy={endDot.y}
            r={mini ? 3 : 4}
            fill={color}
            stroke="rgba(0,0,0,0.4)"
            strokeWidth="1.5"
          />
        )}
      </svg>

      {isPlanning && (
        <div className={s.planningLabel}>sem dados — sprint planejada</div>
      )}
    </div>
  );
}

// ── Status badge (standalone export for use in cards) ─────
export function BurnStatusBadge({
  status,
  pct,
}: {
  status: BurnStatus;
  pct?: number;
}) {
  return (
    <div className={s.statusRow}>
      <span className={`${s.statusBadge} ${STATUS_CSS[status]}`}>
        {STATUS_LABEL[status]}
      </span>
      {pct !== undefined && (
        <span className={s.pctLabel}>{pct}%</span>
      )}
    </div>
  );
}
