/* =========================================================
   GESTÃO.DEV — Billing View
   Phase 3 · src/views/Billing/Billing.tsx
========================================================= */

import { useEffect, useRef } from 'react';
import s from './Billing.module.css';

// ── Plan data ─────────────────────────────────────────────
interface Plan {
  name: string;
  price: string;
  seats: string;
  features: string[];
  isCurrent: boolean;
  ctaLabel: string;
}

const PLANS: Plan[] = [
  {
    name: 'Starter',
    price: 'R$49/mo',
    seats: '2 seats',
    features: [
      'Ate 2 projetos ativos',
      'Board Kanban basico',
      'Suporte por email',
      '1 GB storage',
    ],
    isCurrent: false,
    ctaLabel: 'Fazer downgrade',
  },
  {
    name: 'Pro',
    price: 'R$145/mo',
    seats: '5 seats',
    features: [
      'Projetos ilimitados',
      'Sprints + Roadmap',
      'IA integrada (beta)',
      '5 GB storage',
    ],
    isCurrent: true,
    ctaLabel: 'Plano atual',
  },
  {
    name: 'Enterprise',
    price: 'Custom',
    seats: 'Ilimitado',
    features: [
      'Tudo do Pro',
      'SLA garantido',
      'SSO / SAML',
      'Suporte dedicado',
    ],
    isCurrent: false,
    ctaLabel: 'Falar com vendas',
  },
];

interface Invoice {
  period: string;
  amount: string;
  status: string;
}

const INVOICES: Invoice[] = [
  { period: 'Abr 2026', amount: 'R$145', status: 'Pago' },
  { period: 'Mar 2026', amount: 'R$145', status: 'Pago' },
  { period: 'Fev 2026', amount: 'R$145', status: 'Pago' },
];

// ── Billing view ──────────────────────────────────────────
export function Billing() {
  const headerRef   = useRef<HTMLDivElement>(null);
  const currentRef  = useRef<HTMLDivElement>(null);
  const plansRef    = useRef<HTMLDivElement>(null);
  const invoicesRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const els = [headerRef.current, currentRef.current, plansRef.current, invoicesRef.current];
    els.forEach((el, i) => {
      if (!el) return;
      setTimeout(() => el.classList.add('visible'), 50 + i * 80);
    });
  }, []);

  return (
    <div id="view-billing">
      {/* Page header */}
      <div ref={headerRef} className="reveal page-header">
        <div className="page-header-left">
          <span className="section-tag">
            <span
              style={{ width: '6px', height: '6px', borderRadius: '50%',
                background: '#22c55e', boxShadow: '0 0 6px #22c55e', display: 'inline-block' }}
            />
            Billing
          </span>
          <h1 className="page-title">
            <span className="gradient-text">Planos &amp; Faturamento</span>
          </h1>
        </div>
      </div>

      {/* Current plan banner */}
      <div ref={currentRef} className="reveal reveal-delay-1 card">
        <div className={s.currentBanner}>
          <div className={s.currentMeta}>
            <span className={s.currentLabel}>Plano atual</span>
            <div className={s.currentTitle}>Pro · R$145/mo · 5 seats</div>
            <div className={s.currentRenewal}>Renovacao em 01/05/2026</div>
          </div>
          <button className="gem-cta gem-cta--sm">Gerenciar plano</button>
        </div>
      </div>

      {/* Plans grid */}
      <div ref={plansRef} className={`reveal reveal-delay-2 ${s.plansGrid}`}>
        {PLANS.map((plan) => (
          <div
            key={plan.name}
            className={`card ${s.planCard} ${plan.isCurrent ? s.planCardCurrent : ''}`}
          >
            {plan.isCurrent && (
              <div className={s.planBadge}>Atual</div>
            )}

            <div className={s.planHeader}>
              <div className={s.planName}>{plan.name}</div>
              <div className={`${s.planPrice} ${plan.isCurrent ? s.planPriceCurrent : s.planPriceDefault}`}>
                {plan.price}
              </div>
              <div className={s.planSeats}>{plan.seats}</div>
            </div>

            <ul className={s.featureList}>
              {plan.features.map((f) => (
                <li key={f} className={s.featureItem}>
                  <span className={s.featureCheck}>✓</span>
                  {f}
                </li>
              ))}
            </ul>

            <button
              className={`gem-cta gem-cta--sm ${s.planCta} ${plan.isCurrent ? s.planCtaCurrent : ''}`}
              disabled={plan.isCurrent}
            >
              {plan.ctaLabel}
            </button>
          </div>
        ))}
      </div>

      {/* Invoices table */}
      <div ref={invoicesRef} className={`reveal reveal-delay-3 card ${s.invoicesCard}`}>
        <div className="card-label">
          <span className="dot" />
          Historico de Faturas
        </div>
        <table className={`admin-table ${s.invoicesTable}`}>
          <thead>
            <tr>
              <th>Periodo</th>
              <th>Valor</th>
              <th>Status</th>
              <th style={{ textAlign: 'right' }}>Acao</th>
            </tr>
          </thead>
          <tbody>
            {INVOICES.map((inv) => (
              <tr key={inv.period}>
                <td>{inv.period}</td>
                <td>
                  <span style={{ fontFamily: 'var(--f-mono)', fontWeight: 600, color: 'var(--t-main)' }}>
                    {inv.amount}
                  </span>
                </td>
                <td>
                  <span className="status-pill s-approved">{inv.status}</span>
                </td>
                <td style={{ textAlign: 'right' }}>
                  <button className={s.downloadBtn}>Download PDF</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
