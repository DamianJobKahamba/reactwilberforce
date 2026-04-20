import { Link } from 'react-router-dom'
import { useRef, useEffect, useState } from 'react'

function useInView(threshold = 0.12) {
  const ref = useRef(null)
  const [visible, setVisible] = useState(false)
  useEffect(() => {
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) { setVisible(true); obs.disconnect() } }, { threshold })
    if (ref.current) obs.observe(ref.current)
    return () => obs.disconnect()
  }, [threshold])
  return [ref, visible]
}

function FeatureCard({ title, body, delay = '0s' }) {
  const [ref, visible] = useInView()
  return (
    <div ref={ref} style={{
      background: 'var(--surface)',
      border: '1px solid var(--border-subtle)',
      borderRadius: 'var(--radius)',
      padding: '28px',
      borderLeft: '2px solid var(--gold)',
      opacity: visible ? 1 : 0,
      transform: visible ? 'none' : 'translateY(20px)',
      transition: 'opacity 0.5s var(--ease-out), transform 0.5s var(--ease-out)',
      transitionDelay: delay,
    }}>
      <h3 style={{ fontFamily: 'var(--font-display)', fontSize: '1.2rem', color: 'var(--gold)', marginBottom: '10px', fontWeight: '500' }}>{title}</h3>
      <p style={{ color: 'var(--cream-dim)', fontSize: '0.9rem', lineHeight: '1.75' }}>{body}</p>
    </div>
  )
}

function SpecRow({ label, value }) {
  return (
    <div style={{
      display: 'flex',
      justifyContent: 'space-between',
      padding: '12px 0',
      borderBottom: '1px solid var(--border-subtle)',
      fontSize: '0.9rem',
    }}>
      <span style={{ color: 'var(--cream-muted)', fontWeight: '500' }}>{label}</span>
      <span style={{ color: 'var(--cream-dim)' }}>{value}</span>
    </div>
  )
}

export default function QMSChatbot() {
  return (
    <div className="page-enter">

      {/* Hero */}
      <section style={{
        padding: '140px 0 100px',
        background: 'linear-gradient(160deg, #141414 0%, #0e0e0e 60%, #111 100%)',
        position: 'relative',
        overflow: 'hidden',
        textAlign: 'center',
      }}>
        <div style={{
          position: 'absolute', top: '-30%', left: '50%', transform: 'translateX(-50%)',
          width: '600px', height: '600px',
          background: 'radial-gradient(circle, rgba(201,147,58,0.09) 0%, transparent 70%)',
          pointerEvents: 'none',
        }} />
        <div className="container" style={{ position: 'relative', zIndex: 1 }}>
          <span style={{
            display: 'inline-block',
            background: 'rgba(34,197,94,0.12)',
            color: '#22c55e',
            border: '1px solid rgba(34,197,94,0.3)',
            padding: '6px 16px',
            borderRadius: '20px',
            fontSize: '0.75rem',
            fontWeight: '600',
            letterSpacing: '0.1em',
            textTransform: 'uppercase',
            marginBottom: '24px',
          }}>
            Free & Open Source
          </span>
          <h1 style={{
            fontFamily: 'var(--font-display)',
            fontSize: 'clamp(2.8rem, 6vw, 5rem)',
            fontWeight: '300',
            letterSpacing: '-0.01em',
            color: 'var(--cream)',
            marginBottom: '24px',
            lineHeight: '1.1',
          }}>
            QMS <em style={{ color: 'var(--gold)', fontStyle: 'italic' }}>Chatbot</em>
          </h1>
          <p style={{ color: 'var(--cream-dim)', fontSize: '1.1rem', maxWidth: '720px', margin: '0 auto 44px', lineHeight: '1.8' }}>
            An AI-powered Quality Management System assistant designed specifically for healthcare laboratories in Tanzania. Built with ISO 15189 compliance and multilingual support to enhance laboratory quality assurance.
          </p>
          <div style={{ display: 'flex', gap: '16px', justifyContent: 'center', flexWrap: 'wrap' }}>
            <a href="https://qms.damianchatbot.net:8007" target="_blank" rel="noopener noreferrer" className="btn btn-primary">
              Try Live Demo
            </a>
            <a href="https://github.com/damianjobkahamba" target="_blank" rel="noopener noreferrer" className="btn btn-outline">
              View on GitHub
            </a>
            <Link to="/" className="btn btn-ghost">← Back to Home</Link>
          </div>
        </div>
      </section>

      {/* Overview */}
      <section style={{ padding: '100px 0' }}>
        <div className="container">
          <div style={{ textAlign: 'center', maxWidth: '700px', margin: '0 auto 72px' }}>
            <span className="section-label">Product Overview</span>
            <h2 style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(1.8rem, 3.5vw, 2.8rem)', fontWeight: '300', color: 'var(--cream)', margin: '8px 0 20px' }}>
              Revolutionizing Laboratory Quality Management
            </h2>
            <p style={{ color: 'var(--cream-dim)', lineHeight: '1.8' }}>
              The QMS Chatbot bridges the gap between complex quality management standards and practical daily operations in healthcare laboratories across Tanzania and beyond.
            </p>
          </div>

          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
            gap: '20px',
          }}>
            <FeatureCard delay="0s" title="ISO 15189 Compliance" body="Built-in guidance for medical laboratory quality standards, ensuring your laboratory meets international accreditation requirements with real-time assistance." />
            <FeatureCard delay="0.07s" title="Multilingual Support" body="Native support for English and Kiswahili, making quality management accessible to all laboratory staff regardless of their preferred language." />
            <FeatureCard delay="0.14s" title="Real-time Guidance" body="Instant answers to quality management questions, from sample collection protocols to equipment maintenance schedules and staff training requirements." />
            <FeatureCard delay="0.21s" title="Training Integration" body="Comprehensive training modules and assessment tools to help laboratory staff understand and implement quality management best practices." />
            <FeatureCard delay="0.28s" title="Document Management" body="Intelligent document retrieval system that helps staff find relevant SOPs, protocols, and quality manuals quickly and efficiently." />
            <FeatureCard delay="0.35s" title="Audit Preparation" body="Automated checklist generation and compliance tracking to help laboratories prepare for internal and external quality audits." />
          </div>
        </div>
      </section>

      {/* Technical Specs */}
      <section style={{ padding: '80px 0', background: '#111' }}>
        <div className="container">
          <div style={{
            display: 'grid',
            gridTemplateColumns: '1fr 1fr',
            gap: '64px',
            alignItems: 'start',
          }} className="specs-grid">
            <div>
              <span className="section-label">Technical Specs</span>
              <h2 style={{ fontFamily: 'var(--font-display)', fontSize: '2rem', fontWeight: '300', color: 'var(--cream)', margin: '8px 0 28px' }}>
                Under the Hood
              </h2>
              <div style={{ background: 'var(--surface)', border: '1px solid var(--border-subtle)', borderRadius: 'var(--radius)', padding: '24px' }}>
                <SpecRow label="Platform" value="Django / Python Web Application" />
                <SpecRow label="AI Engine" value="Hybrid Ollama / Groq Routing" />
                <SpecRow label="Database" value="PostgreSQL" />
                <SpecRow label="Languages" value="English, Kiswahili" />
                <SpecRow label="Standards" value="ISO 15189 Compliant" />
                <SpecRow label="Deployment" value="qms.damianchatbot.net" />
                <SpecRow label="Security" value="Enterprise-grade authentication" />
                <SpecRow label="License" value="Open Source" />
              </div>
            </div>

            <div>
              <span className="section-label">Use Cases</span>
              <h2 style={{ fontFamily: 'var(--font-display)', fontSize: '2rem', fontWeight: '300', color: 'var(--cream)', margin: '8px 0 28px' }}>
                Who It Serves
              </h2>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                {[
                  { title: 'Laboratory Staff Training', body: 'New staff quickly get up to speed with quality management protocols through interactive Q&A and guided tutorials.' },
                  { title: 'Daily Operations Support', body: 'Instant answers about sample handling, equipment maintenance, and protocol adherence during daily work.' },
                  { title: 'Audit Preparation', body: 'Generate compliance checklists and track readiness for internal and external quality audits.' },
                  { title: 'Knowledge Management', body: 'Centralized access to SOPs, protocols, and quality manuals with intelligent search and retrieval.' },
                ].map(({ title, body }) => (
                  <div key={title} style={{
                    display: 'flex', gap: '16px', padding: '16px',
                    background: 'var(--surface)', border: '1px solid var(--border-subtle)',
                    borderRadius: 'var(--radius-sm)',
                  }}>
                    <span style={{ color: 'var(--gold)', fontSize: '0.8rem', marginTop: '2px', flexShrink: 0 }}>◆</span>
                    <div>
                      <p style={{ color: 'var(--cream)', fontWeight: '500', fontSize: '0.9rem', marginBottom: '4px' }}>{title}</p>
                      <p style={{ color: 'var(--cream-muted)', fontSize: '0.85rem', lineHeight: '1.6' }}>{body}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
        <style>{`@media(max-width:768px){.specs-grid{grid-template-columns:1fr!important;gap:48px!important}}`}</style>
      </section>

      {/* Impact */}
      <section style={{ padding: '100px 0' }}>
        <div className="container">
          <div style={{
            background: 'var(--surface)',
            border: '1px solid var(--border)',
            borderRadius: 'var(--radius-lg)',
            padding: '64px',
            textAlign: 'center',
            position: 'relative',
            overflow: 'hidden',
          }}>
            <div style={{
              position: 'absolute', inset: 0,
              background: 'radial-gradient(circle at 50% 0%, rgba(201,147,58,0.06) 0%, transparent 70%)',
              pointerEvents: 'none',
            }} />
            <span className="section-label">Impact & Vision</span>
            <h2 style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(1.8rem, 3vw, 2.5rem)', fontWeight: '300', color: 'var(--cream)', margin: '12px 0 24px' }}>
              Built for Tanzania, Designed for the World
            </h2>
            <p style={{ color: 'var(--cream-dim)', fontSize: '1.05rem', lineHeight: '1.8', maxWidth: '700px', margin: '0 auto 40px' }}>
              Built specifically for Tanzania's National Public Health Laboratory network, this chatbot represents our commitment to making advanced quality management tools accessible to healthcare systems in resource-limited settings. By providing ISO 15189 guidance in local languages, we're helping ensure that quality healthcare laboratory services are available to all communities.
            </p>
            <div style={{ display: 'flex', gap: '16px', justifyContent: 'center', flexWrap: 'wrap' }}>
              <a href="https://qms.damianchatbot.net:8007" target="_blank" rel="noopener noreferrer" className="btn btn-primary">
                Access Live Demo
              </a>
              <Link to="/#contact" className="btn btn-outline">Get Implementation Support</Link>
            </div>
          </div>
        </div>
      </section>

    </div>
  )
}
