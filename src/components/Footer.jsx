import { Link } from 'react-router-dom'

const footerLinks = {
  Company: [
    { label: 'About Us', to: '/#about' },
    { label: 'Products', to: '/#products' },
    { label: 'Contact', to: '/#contact' },
  ],
  Products: [
    { label: 'QMS Chatbot', to: '/qms-chatbot' },
    { label: 'Team Tracker', to: '/team-tracker' },
  ],
  Connect: [
    { label: 'Email', href: 'mailto:contact@wilberforcetech.com' },
    { label: 'GitHub', href: 'https://github.com/damianjobkahamba', external: true },
  ],
}

export default function Footer() {
  return (
    <footer style={{
      background: '#0a0a0a',
      borderTop: '1px solid var(--border-subtle)',
      padding: '64px 0 32px',
    }}>
      <div className="container">
        <div style={{
          display: 'grid',
          gridTemplateColumns: '2fr 1fr 1fr 1fr',
          gap: '48px',
          marginBottom: '48px',
        }} className="footer-grid">
          {/* Brand */}
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '16px' }}>
              <img src="/logo.jpeg" alt="" style={{ width: '32px', height: '32px', borderRadius: '50%', objectFit: 'cover', border: '1px solid var(--gold)' }} />
              <span style={{ fontFamily: 'var(--font-display)', fontSize: '1.1rem', fontWeight: '600', color: 'var(--cream)' }}>
                Wilberforce Technologies
              </span>
            </div>
            <p style={{ color: 'var(--cream-muted)', fontSize: '0.9rem', lineHeight: '1.7', maxWidth: '280px' }}>
              Building systems that serve all of us — opening technology rather than closing it.
            </p>
            <p style={{
              marginTop: '20px',
              fontFamily: 'var(--font-display)',
              fontStyle: 'italic',
              fontSize: '1rem',
              color: 'var(--gold)',
              lineHeight: '1.5',
            }}>
              "We are building systems that serve all of us."
            </p>
          </div>

          {/* Link columns */}
          {Object.entries(footerLinks).map(([section, links]) => (
            <div key={section}>
              <h4 style={{
                fontFamily: 'var(--font-body)',
                fontSize: '0.7rem',
                fontWeight: '600',
                letterSpacing: '0.18em',
                textTransform: 'uppercase',
                color: 'var(--gold)',
                marginBottom: '20px',
              }}>
                {section}
              </h4>
              <ul style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                {links.map(({ label, to, href, external }) => (
                  <li key={label}>
                    {href ? (
                      <a
                        href={href}
                        target={external ? '_blank' : undefined}
                        rel={external ? 'noopener noreferrer' : undefined}
                        style={{ color: 'var(--cream-muted)', fontSize: '0.9rem', transition: 'color 0.2s' }}
                        onMouseEnter={e => e.target.style.color = 'var(--cream)'}
                        onMouseLeave={e => e.target.style.color = 'var(--cream-muted)'}
                      >
                        {label}
                      </a>
                    ) : (
                      <Link
                        to={to}
                        style={{ color: 'var(--cream-muted)', fontSize: '0.9rem', transition: 'color 0.2s' }}
                        onMouseEnter={e => e.target.style.color = 'var(--cream)'}
                        onMouseLeave={e => e.target.style.color = 'var(--cream-muted)'}
                      >
                        {label}
                      </Link>
                    )}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div style={{
          borderTop: '1px solid var(--border-subtle)',
          paddingTop: '28px',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          flexWrap: 'wrap',
          gap: '12px',
        }}>
          <p style={{ color: 'var(--cream-muted)', fontSize: '0.8rem' }}>
            © 2026 Wilberforce Technologies. All rights reserved.
          </p>
          <p style={{ color: 'var(--cream-muted)', fontSize: '0.8rem' }}>
            Named after William Wilberforce, 1759–1833
          </p>
        </div>
      </div>

      <style>{`
        @media (max-width: 768px) {
          .footer-grid {
            grid-template-columns: 1fr 1fr !important;
          }
        }
        @media (max-width: 480px) {
          .footer-grid {
            grid-template-columns: 1fr !important;
          }
        }
      `}</style>
    </footer>
  )
}
