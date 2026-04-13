/* =========================================================
   GESTÃO.DEV — Billing View
   Phase 2b · src/views/Billing/Billing.tsx
========================================================= */

import { useEffect, useRef } from 'react';

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
              style={{
                width: '6px',
                height: '6px',
                borderRadius: '50%',
                background: '#22c55e',
                boxShadow: '0 0 6px #22c55e',
                display: 'inline-block',
              }}
            />
            Billing
          </span>
          <h1 className="page-title">
            <span className="gradient-text">Planos &amp; Faturamento</span>
          </h1>
        </div>
      </div>

      {/* Current plan banner */}
      <div ref={currentRef} className="reveal reveal-delay-1 card billing-current">
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            flexWrap: 'wrap',
            gap: '12px',
          }}
        >
          <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
            <span
              style={{
                fontFamily: 'var(--f-mono)',
                fontSize: '0.5rem',
                textTransform: 'uppercase',
                letterSpacing: '0.12em',
                color: 'var(--c-primary-light)',
              }}
            >
              Plano atual
            </span>
            <div
              style={{
                fontSize: '1.125rem',
                fontWeight: 700,
                color: 'var(--t-main)',
                letterSpacing: '-0.02em',
              }}
            >
              Pro · R$145/mo · 5 seats
            </div>
            <div
              style={{
                fontFamily: 'var(--f-mono)',
                fontSize: '0.5625rem',
                color: 'var(--t-dim)',
                textTransform: 'uppercase',
                letterSpacing: '0.1em',
              }}
            >
              Renovacao em 01/05/2026
            </div>
          </div>
          <button className="gem-cta gem-cta--sm">Gerenciar plano</button>
        </div>
      </div>

      {/* Plans grid */}
      <div ref={plansRef} className="reveal reveal-delay-2 plans-grid">
        {PLANS.map((plan) => (
          <div
            key={plan.name}
            className="card"
            style={
              plan.isCurrent
                ? {
                    border: '1px solid rgba(123, 77, 196, 0.4)',
                    background:
                      'linear-gradient(135deg, rgba(123,77,196,0.08) 0%, rgba(59,130,246,0.04) 100%)',
                    position: 'relative',
                  }
                : {}
            }
          >
            {plan.isCurrent && (
              <div
                style={{
                  position: 'absolute',
                  top: '-1px',
                  left: '24px',
                  padding: '2px 12px',
                  background: '#7B4DC4',
                  borderRadius: '0 0 8px 8px',
                  fontFamily: 'var(--f-mono)',
                  fontSize: '0.45rem',
                  textTransform: 'uppercase',
                  letterSpacing: '0.12em',
                  color: '#fff',
                  fontWeight: 600,
                }}
              >
                Atual
              </div>
            )}
            <div
              style={{
                display: 'flex',
                flexDirection: 'column',
                gap: '4px',
                marginBottom: '16px',
              }}
            >
              <div
                style={{
                  fontSize: '0.9375rem',
                  fontWeight: 700,
                  color: 'var(--t-main)',
                  letterSpacing: '-0.02em',
                }}
              >
                {plan.name}
              </div>
              <div
                style={{
                  fontFamily: 'var(--f-mono)',
                  fontSize: '1.25rem',
                  fontWeight: 700,
                  color: plan.isCurrent ? '#7B4DC4' : 'var(--t-main)',
                  letterSpacing: '-0.03em',
                }}
              >
                {plan.price}
              </div>
              <div
                style={{
                  fontFamily: 'var(--f-mono)',
                  fontSize: '0.5rem',
                  color: 'var(--t-dim)',
                  textTransform: 'uppercase',
                  letterSpacing: '0.1em',
                }}
              >
                {plan.seats}
              </div>
            </div>

            <ul
              style={{
                listStyle: 'none',
                padding: 0,
                margin: '0 0 20px',
                display: 'flex',
                flexDirection: 'column',
                gap: '8px',
              }}
            >
              {plan.features.map((f) => (
                <li
                  key={f}
                  style={{
                    fontSize: '0.8125rem',
                    color: 'var(--t-muted)',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '8px',
                  }}
                >
                  <span style={{ color: '#22c55e', fontSize: '0.625rem' }}>✓</span>
                  {f}
                </li>
              ))}
            </ul>

            <button
              className={plan.isCurrent ? 'gem-cta gem-cta--sm' : 'gem-cta gem-cta--sm gem-cta--ghost'}
              disabled={plan.isCurrent}
              style={plan.isCurrent ? { opacity: 0.7, cursor: 'default', width: '100%' } : { width: '100%' }}
            >
              {plan.ctaLabel}
            </button>
          </div>
        ))}
      </div>

      {/* Invoices table */}
      <div ref={invoicesRef} className="reveal reveal-delay-3 card" style={{ marginTop: '24px' }}>
        <div className="card-label">
          <span className="dot" />
          Historico de Faturas
        </div>
        <table className="admin-table" style={{ marginTop: '16px', width: '100%' }}>
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
                  <span
                    style={{
                      fontFamily: 'var(--f-mono)',
                      fontWeight: 600,
                      color: 'var(--t-main)',
                    }}
                  >
                    {inv.amount}
                  </span>
                </td>
                <td>
                  <span className="status-pill s-approved">{inv.status}</span>
                </td>
                <td style={{ textAlign: 'right' }}>
                  <button
                    style={{
                      fontFamily: 'var(--f-mono)',
                      fontSize: '0.5rem',
                      textTransform: 'uppercase',
                      letterSpacing: '0.08em',
                      color: 'var(--c-primary-light)',
                      background: 'none',
                      border: 'none',
                      cursor: 'pointer',
                      padding: '4px 0',
                    }}
                  >
                    Download PDF
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
