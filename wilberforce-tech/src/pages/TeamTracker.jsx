import { useState, useRef, useEffect } from 'react'
import { Link } from 'react-router-dom'

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
      borderLeft: '2px solid #f59e0b',
      opacity: visible ? 1 : 0,
      transform: visible ? 'none' : 'translateY(20px)',
      transition: 'opacity 0.5s var(--ease-out), transform 0.5s var(--ease-out)',
      transitionDelay: delay,
    }}>
      <h3 style={{ fontFamily: 'var(--font-display)', fontSize: '1.2rem', color: '#f59e0b', marginBottom: '10px', fontWeight: '500' }}>{title}</h3>
      <p style={{ color: 'var(--cream-dim)', fontSize: '0.9rem', lineHeight: '1.75' }}>{body}</p>
    </div>
  )
}

function RoadmapItem({ phase, title, body, index }) {
  const [ref, visible] = useInView()
  const isLeft = index % 2 === 0
  return (
    <div ref={ref} style={{
      display: 'grid',
      gridTemplateColumns: '1fr 40px 1fr',
      gap: '0',
      alignItems: 'start',
      opacity: visible ? 1 : 0,
      transform: visible ? 'none' : 'translateY(20px)',
      transition: 'opacity 0.5s var(--ease-out), transform 0.5s var(--ease-out)',
      transitionDelay: `${index * 0.1}s`,
    }}>
      {isLeft ? (
        <>
          <div style={{ background: 'var(--surface)', border: '1px solid var(--border-subtle)', borderRadius: 'var(--radius-sm)', padding: '20px', textAlign: 'right' }}>
            <p style={{ fontSize: '0.7rem', fontWeight: '600', letterSpacing: '0.15em', textTransform: 'uppercase', color: '#f59e0b', marginBottom: '6px' }}>{phase}</p>
            <h4 style={{ fontFamily: 'var(--font-display)', fontSize: '1.1rem', color: 'var(--cream)', marginBottom: '8px' }}>{title}</h4>
            <p style={{ color: 'var(--cream-muted)', fontSize: '0.85rem', lineHeight: '1.6' }}>{body}</p>
          </div>
          <div style={{ display: 'flex', justifyContent: 'center', paddingTop: '24px' }}>
            <div style={{ width: '12px', height: '12px', background: '#f59e0b', borderRadius: '50%', boxShadow: '0 0 0 4px rgba(245,158,11,0.2)' }} />
          </div>
          <div />
        </>
      ) : (
        <>
          <div />
          <div style={{ display: 'flex', justifyContent: 'center', paddingTop: '24px' }}>
            <div style={{ width: '12px', height: '12px', background: '#f59e0b', borderRadius: '50%', boxShadow: '0 0 0 4px rgba(245,158,11,0.2)' }} />
          </div>
          <div style={{ background: 'var(--surface)', border: '1px solid var(--border-subtle)', borderRadius: 'var(--radius-sm)', padding: '20px' }}>
            <p style={{ fontSize: '0.7rem', fontWeight: '600', letterSpacing: '0.15em', textTransform: 'uppercase', color: '#f59e0b', marginBottom: '6px' }}>{phase}</p>
            <h4 style={{ fontFamily: 'var(--font-display)', fontSize: '1.1rem', color: 'var(--cream)', marginBottom: '8px' }}>{title}</h4>
            <p style={{ color: 'var(--cream-muted)', fontSize: '0.85rem', lineHeight: '1.6' }}>{body}</p>
          </div>
        </>
      )}
    </div>
  )
}

function PricingCard({ name, price, sub, features, accent }) {
  return (
    <div style={{
      background: accent ? 'var(--surface-2)' : 'rgba(255,255,255,0.04)',
      border: accent ? '1px solid #f59e0b' : '1px solid var(--border-subtle)',
      borderRadius: 'var(--radius)',
      padding: '32px',
      textAlign: 'center',
    }}>
      <h3 style={{ fontFamily: 'var(--font-display)', fontSize: '1.3rem', color: 'var(--cream)', marginBottom: '8px', fontWeight: '400' }}>{name}</h3>
      <p style={{ fontFamily: 'var(--font-display)', fontSize: '2.2rem', fontWeight: '600', color: accent ? '#f59e0b' : 'var(--cream)', margin: '12px 0 6px' }}>{price}</p>
      <p style={{ color: 'var(--cream-muted)', fontSize: '0.85rem', marginBottom: '24px' }}>{sub}</p>
      <ul style={{ display: 'flex', flexDirection: 'column', gap: '10px', textAlign: 'left' }}>
        {features.map(f => (
          <li key={f} style={{ display: 'flex', gap: '10px', alignItems: 'flex-start', color: 'var(--cream-dim)', fontSize: '0.875rem' }}>
            <span style={{ color: '#f59e0b', flexShrink: 0, marginTop: '1px' }}>◆</span>
            {f}
          </li>
        ))}
      </ul>
    </div>
  )
}

function WaitlistForm() {
  const [email, setEmail] = useState('')
  const [done, setDone] = useState(false)
  const submit = e => {
    e.preventDefault()
    window.location.href = `mailto:contact@wilberforcetech.com?subject=Team%20Tracker%20Waitlist&body=Please%20add%20${encodeURIComponent(email)}%20to%20the%20waitlist.`
    setDone(true)
    setEmail('')
  }
  if (done) return (
    <p style={{ color: '#22c55e', fontWeight: '500', textAlign: 'center', padding: '16px 0' }}>
      ✓ You're on the list! We'll be in touch.
    </p>
  )
  return (
    <form onSubmit={submit} style={{ display: 'flex', gap: '12px', maxWidth: '420px', margin: '0 auto', flexWrap: 'wrap', justifyContent: 'center' }}>
      <input
        type="email"
        placeholder="Enter your email address"
        value={email}
        onChange={e => setEmail(e.target.value)}
        required
        style={{
          flex: 1, minWidth: '200px',
          background: 'rgba(255,255,255,0.08)',
          border: '1px solid rgba(255,255,255,0.15)',
          borderRadius: 'var(--radius-sm)',
          padding: '12px 16px',
          color: 'var(--cream)',
          fontFamily: 'var(--font-body)',
          fontSize: '0.9rem',
          outline: 'none',
        }}
      />
      <button type="submit" className="btn btn-primary" style={{ padding: '12px 24px' }}>
        Join Waitlist
      </button>
    </form>
  )
}

const roadmap = [
  { phase: 'Phase 1 · Q2 2026', title: 'Core Platform', body: 'Basic project creation, task management, team collaboration, and real-time updates. Focus on reliability and performance.' },
  { phase: 'Phase 2 · Q3 2026', title: 'Advanced Analytics', body: 'Performance dashboards, resource allocation tools, and predictive analytics for project planning and team optimization.' },
  { phase: 'Phase 3 · Q4 2026', title: 'Integration & Mobile', body: 'Third-party integrations, mobile applications, and offline capabilities. Enhanced multilingual support.' },
  { phase: 'Phase 4 · Q1 2027', title: 'AI & Automation', body: 'Intelligent project suggestions, automated resource allocation, and AI-powered insights for continuous improvement.' },
]

export default function TeamTracker() {
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
          background: 'radial-gradient(circle, rgba(245,158,11,0.07) 0%, transparent 70%)',
          pointerEvents: 'none',
        }} />
        <div className="container" style={{ position: 'relative', zIndex: 1 }}>
          <span style={{
            display: 'inline-block',
            background: 'rgba(245,158,11,0.12)',
            color: '#f59e0b',
            border: '1px solid rgba(245,158,11,0.3)',
            padding: '6px 16px',
            borderRadius: '20px',
            fontSize: '0.75rem',
            fontWeight: '600',
            letterSpacing: '0.1em',
            textTransform: 'uppercase',
            marginBottom: '24px',
          }}>
            In Development
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
            Team <em style={{ color: '#f59e0b', fontStyle: 'italic' }}>Tracker</em>
          </h1>
          <p style={{ color: 'var(--cream-dim)', fontSize: '1.1rem', maxWidth: '680px', margin: '0 auto 44px', lineHeight: '1.8' }}>
            Streamlined project management and team collaboration tools designed for organizations of all sizes. Built with accessibility in mind — whether your team is in Silicon Valley or rural Tanzania.
          </p>
          <div style={{ display: 'flex', gap: '16px', justifyContent: 'center', flexWrap: 'wrap' }}>
            <a href="#waitlist" className="btn btn-primary" onClick={e => { e.preventDefault(); document.getElementById('waitlist')?.scrollIntoView({ behavior: 'smooth' }) }}>
              Join Waitlist
            </a>
            <a href="#features" className="btn btn-outline" onClick={e => { e.preventDefault(); document.getElementById('features')?.scrollIntoView({ behavior: 'smooth' }) }}>
              See Features
            </a>
            <Link to="/" className="btn btn-ghost">← Back to Home</Link>
          </div>
        </div>
      </section>

      {/* Features */}
      <section id="features" style={{ padding: '100px 0' }}>
        <div className="container">
          <div style={{ textAlign: 'center', maxWidth: '680px', margin: '0 auto 64px' }}>
            <span className="section-label">Key Features</span>
            <h2 style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(1.8rem, 3.5vw, 2.8rem)', fontWeight: '300', color: 'var(--cream)', margin: '8px 0 20px' }}>
              Project Management That Actually Works
            </h2>
            <p style={{ color: 'var(--cream-dim)', lineHeight: '1.8' }}>
              Built for the real world — where teams need powerful features that work reliably under any conditions.
            </p>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '20px' }}>
            <FeatureCard delay="0s" title="Real-time Project Tracking" body="Visual project timelines and progress tracking that works seamlessly across different devices and connection speeds." />
            <FeatureCard delay="0.07s" title="Team Performance Analytics" body="Comprehensive insights into team productivity and project bottlenecks, with reports that help managers make data-driven decisions." />
            <FeatureCard delay="0.14s" title="Resource Allocation Tools" body="Smart resource planning that helps teams maximize efficiency while preventing burnout through intelligent workload distribution." />
            <FeatureCard delay="0.21s" title="Cross-platform Integration" body="Seamless integration with existing tools and workflows, from email and calendars to specialized industry software." />
            <FeatureCard delay="0.28s" title="Offline Capability" body="Critical features work offline with smart sync when connection is restored — productivity never stops due to connectivity issues." />
            <FeatureCard delay="0.35s" title="Multilingual Support" body="Interface available in multiple languages with culturally-appropriate workflow templates for global teams." />
          </div>
        </div>
      </section>

      {/* Vision */}
      <section style={{ padding: '80px 0', background: '#111' }}>
        <div className="container">
          <div style={{
            background: 'var(--surface)',
            border: '1px solid var(--border)',
            borderRadius: 'var(--radius-lg)',
            padding: '56px 64px',
            position: 'relative',
            overflow: 'hidden',
          }} className="vision-box">
            <div style={{ position: 'absolute', inset: 0, background: 'radial-gradient(circle at 0% 50%, rgba(245,158,11,0.05), transparent 60%)', pointerEvents: 'none' }} />
            <blockquote style={{
              fontFamily: 'var(--font-display)',
              fontStyle: 'italic',
              fontSize: 'clamp(1.2rem, 2.5vw, 1.8rem)',
              fontWeight: '300',
              color: 'var(--cream)',
              lineHeight: '1.6',
              textAlign: 'center',
              maxWidth: '800px',
              margin: '0 auto',
            }}>
              "Most project management tools are built for teams with unlimited bandwidth, powerful devices, and stable internet. Team Tracker is built for the real world — powerful features that work reliably under any conditions."
            </blockquote>
          </div>
        </div>
        <style>{`@media(max-width:600px){.vision-box{padding:32px 24px!important}}`}</style>
      </section>

      {/* Roadmap */}
      <section style={{ padding: '100px 0' }}>
        <div className="container">
          <div style={{ textAlign: 'center', marginBottom: '72px' }}>
            <span className="section-label">Development Roadmap</span>
            <h2 style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(1.8rem, 3.5vw, 2.8rem)', fontWeight: '300', color: 'var(--cream)', marginTop: '8px' }}>
              The Journey Ahead
            </h2>
          </div>
          <div style={{ position: 'relative', maxWidth: '800px', margin: '0 auto' }}>
            {/* Vertical line */}
            <div style={{
              position: 'absolute',
              left: '50%', top: 0, bottom: 0,
              width: '1px',
              background: 'var(--border-subtle)',
              transform: 'translateX(-50%)',
            }} />
            <div style={{ display: 'flex', flexDirection: 'column', gap: '32px' }}>
              {roadmap.map((item, i) => (
                <RoadmapItem key={item.phase} {...item} index={i} />
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Pricing */}
      <section style={{ padding: '80px 0', background: '#111' }}>
        <div className="container">
          <div style={{ textAlign: 'center', marginBottom: '56px' }}>
            <span className="section-label">Pricing Preview</span>
            <h2 style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(1.8rem, 3.5vw, 2.8rem)', fontWeight: '300', color: 'var(--cream)', marginTop: '8px', marginBottom: '16px' }}>
              Accessible Pricing for All Teams
            </h2>
            <p style={{ color: 'var(--cream-dim)', maxWidth: '520px', margin: '0 auto', lineHeight: '1.7' }}>
              Our pricing model reflects our mission — powerful features for everyone, with plans that scale with your organization.
            </p>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '20px', maxWidth: '900px', margin: '0 auto' }}>
            <PricingCard
              name="Starter"
              price="Free"
              sub="For small teams and community organizations"
              features={['Up to 5 team members', '3 active projects', 'Basic analytics', 'Community support']}
            />
            <PricingCard
              accent
              name="Professional"
              price="$5"
              sub="/user/month — for growing teams"
              features={['Unlimited team members', 'Unlimited projects', 'Advanced analytics', 'Priority support']}
            />
            <PricingCard
              name="Enterprise"
              price="Custom"
              sub="For large organizations with specific needs"
              features={['Custom integrations', 'Dedicated support', 'On-premise options', 'Training & onboarding']}
            />
          </div>
        </div>
      </section>

      {/* Waitlist */}
      <section id="waitlist" style={{ padding: '100px 0', textAlign: 'center' }}>
        <div className="container">
          <div style={{
            background: 'var(--surface)',
            border: '1px solid rgba(245,158,11,0.3)',
            borderRadius: 'var(--radius-lg)',
            padding: '72px 40px',
            position: 'relative',
            overflow: 'hidden',
          }}>
            <div style={{ position: 'absolute', inset: 0, background: 'radial-gradient(circle at 50% 0%, rgba(245,158,11,0.06) 0%, transparent 70%)', pointerEvents: 'none' }} />
            <div style={{ position: 'relative', zIndex: 1 }}>
              <span className="section-label">Early Access</span>
              <h2 style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(2rem, 4vw, 3rem)', fontWeight: '300', color: 'var(--cream)', margin: '12px 0 20px' }}>
                Be the First to Access Team Tracker
              </h2>
              <p style={{ color: 'var(--cream-dim)', maxWidth: '520px', margin: '0 auto 40px', lineHeight: '1.7' }}>
                Join our waitlist to get early access, provide feedback during development, and receive exclusive updates on our progress.
              </p>
              <WaitlistForm />
              <p style={{ color: 'var(--cream-muted)', fontSize: '0.8rem', marginTop: '16px' }}>
                We'll only send updates about Team Tracker. No spam, ever.
              </p>
            </div>
          </div>
        </div>
      </section>

    </div>
  )
}
