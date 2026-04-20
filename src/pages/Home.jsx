import { useEffect, useRef, useState } from 'react'
import { Link } from 'react-router-dom'

/* ─── Reusable hook: animate-in when element enters viewport ─── */
function useInView(threshold = 0.15) {
  const ref = useRef(null)
  const [visible, setVisible] = useState(false)
  useEffect(() => {
    const obs = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) { setVisible(true); obs.disconnect() } },
      { threshold }
    )
    if (ref.current) obs.observe(ref.current)
    return () => obs.disconnect()
  }, [threshold])
  return [ref, visible]
}

/* ─── Mission Card ─── */
function MissionCard({ icon, title, body, delay }) {
  const [ref, visible] = useInView()
  return (
    <div ref={ref} style={{
      background: 'var(--surface)',
      border: '1px solid var(--border-subtle)',
      borderRadius: 'var(--radius)',
      padding: '36px 32px',
      transition: 'all 0.3s var(--ease-out)',
      opacity: visible ? 1 : 0,
      transform: visible ? 'none' : 'translateY(24px)',
      transitionDelay: delay,
      cursor: 'default',
    }}
      onMouseEnter={e => {
        e.currentTarget.style.borderColor = 'var(--border)'
        e.currentTarget.style.transform = 'translateY(-4px)'
        e.currentTarget.style.boxShadow = '0 16px 40px rgba(0,0,0,0.4)'
      }}
      onMouseLeave={e => {
        e.currentTarget.style.borderColor = 'var(--border-subtle)'
        e.currentTarget.style.transform = 'none'
        e.currentTarget.style.boxShadow = 'none'
      }}
    >
      <div style={{
        width: '48px', height: '48px',
        background: 'var(--gold-dim)',
        borderRadius: '10px',
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        marginBottom: '20px',
        color: 'var(--gold)',
      }}>
        {icon}
      </div>
      <h3 style={{ fontFamily: 'var(--font-display)', fontSize: '1.4rem', fontWeight: '600', marginBottom: '12px', color: 'var(--cream)' }}>
        {title}
      </h3>
      <p style={{ color: 'var(--cream-dim)', lineHeight: '1.75', fontSize: '0.95rem' }}>{body}</p>
    </div>
  )
}

/* ─── Product Card ─── */
function ProductCard({ status, statusColor, title, description, features, primaryLabel, primaryTo, secondaryLabel, secondaryHref, secondaryTo, disabled, featured }) {
  const [ref, visible] = useInView()
  const colors = { free: '#22c55e', development: '#f59e0b', planned: '#6366f1' }
  return (
    <div ref={ref} style={{
      background: featured ? 'var(--surface-2)' : 'var(--surface)',
      border: featured ? '1px solid var(--gold)' : '1px solid var(--border-subtle)',
      borderRadius: 'var(--radius)',
      padding: '36px',
      display: 'flex',
      flexDirection: 'column',
      gap: '16px',
      opacity: visible ? 1 : 0,
      transform: visible ? 'none' : 'translateY(24px)',
      transition: 'all 0.5s var(--ease-out)',
      position: 'relative',
    }}>
      {featured && (
        <div style={{
          position: 'absolute', top: '-1px', right: '28px',
          background: 'var(--gold)', color: 'var(--coal)',
          fontSize: '0.65rem', fontWeight: '700', letterSpacing: '0.15em',
          textTransform: 'uppercase', padding: '4px 12px',
          borderRadius: '0 0 8px 8px',
        }}>Flagship</div>
      )}
      <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
        <span style={{
          fontSize: '0.7rem', fontWeight: '600', letterSpacing: '0.1em',
          textTransform: 'uppercase', color: colors[statusColor] || 'var(--gold)',
          background: `${colors[statusColor]}1a` || 'var(--gold-dim)',
          padding: '4px 10px', borderRadius: '20px',
          border: `1px solid ${colors[statusColor]}33`,
        }}>{status}</span>
      </div>
      <h3 style={{ fontFamily: 'var(--font-display)', fontSize: '1.6rem', fontWeight: '600', color: 'var(--cream)' }}>{title}</h3>
      <p style={{ color: 'var(--cream-dim)', fontSize: '0.9rem', lineHeight: '1.7' }}>{description}</p>
      {features && (
        <ul style={{ display: 'flex', flexDirection: 'column', gap: '8px', marginTop: '4px' }}>
          {features.map(f => (
            <li key={f} style={{ display: 'flex', alignItems: 'center', gap: '10px', color: 'var(--cream-dim)', fontSize: '0.875rem' }}>
              <span style={{ color: 'var(--gold)', fontSize: '0.7rem' }}>◆</span>
              {f}
            </li>
          ))}
        </ul>
      )}
      <div style={{ display: 'flex', gap: '12px', marginTop: 'auto', paddingTop: '8px', flexWrap: 'wrap' }}>
        <Link to={primaryTo} className="btn btn-primary" style={{ fontSize: '0.85rem', padding: '10px 20px' }}>
          {primaryLabel}
        </Link>
        {secondaryLabel && (
          disabled
            ? <span className="btn btn-outline" style={{ fontSize: '0.85rem', padding: '10px 20px', opacity: 0.4, cursor: 'not-allowed' }}>{secondaryLabel}</span>
            : secondaryHref
              ? <a href={secondaryHref} target="_blank" rel="noopener noreferrer" className="btn btn-outline" style={{ fontSize: '0.85rem', padding: '10px 20px' }}>{secondaryLabel}</a>
              : <Link to={secondaryTo} className="btn btn-outline" style={{ fontSize: '0.85rem', padding: '10px 20px' }}>{secondaryLabel}</Link>
        )}
      </div>
    </div>
  )
}

/* ─── Contact Form ─── */
function ContactForm() {
  const [sent, setSent] = useState(false)
  const [form, setForm] = useState({ name: '', email: '', subject: '', message: '' })

  const handleChange = e => setForm(p => ({ ...p, [e.target.name]: e.target.value }))
  const handleSubmit = e => {
    e.preventDefault()
    const body = encodeURIComponent(`Name: ${form.name}\n\n${form.message}`)
    window.location.href = `mailto:contact@wilberforcetech.com?subject=${encodeURIComponent(form.subject)}&body=${body}`
    setSent(true)
  }

  const inputStyle = {
    width: '100%',
    background: 'var(--surface)',
    border: '1px solid var(--border-subtle)',
    borderRadius: 'var(--radius-sm)',
    padding: '14px 16px',
    color: 'var(--cream)',
    fontFamily: 'var(--font-body)',
    fontSize: '0.9rem',
    outline: 'none',
    transition: 'border-color 0.2s',
  }

  return sent ? (
    <div style={{ textAlign: 'center', padding: '48px 24px' }}>
      <div style={{ fontSize: '2.5rem', marginBottom: '16px' }}>✓</div>
      <h3 style={{ fontFamily: 'var(--font-display)', fontSize: '1.6rem', color: 'var(--gold)', marginBottom: '12px' }}>Message Sent</h3>
      <p style={{ color: 'var(--cream-dim)' }}>Thank you for reaching out. We'll be in touch soon.</p>
    </div>
  ) : (
    <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }} className="form-row">
        <input name="name" type="text" placeholder="Your Name" required value={form.name} onChange={handleChange} style={inputStyle}
          onFocus={e => e.target.style.borderColor = 'var(--gold)'}
          onBlur={e => e.target.style.borderColor = 'var(--border-subtle)'} />
        <input name="email" type="email" placeholder="Your Email" required value={form.email} onChange={handleChange} style={inputStyle}
          onFocus={e => e.target.style.borderColor = 'var(--gold)'}
          onBlur={e => e.target.style.borderColor = 'var(--border-subtle)'} />
      </div>
      <input name="subject" type="text" placeholder="Subject" required value={form.subject} onChange={handleChange} style={inputStyle}
        onFocus={e => e.target.style.borderColor = 'var(--gold)'}
        onBlur={e => e.target.style.borderColor = 'var(--border-subtle)'} />
      <textarea name="message" rows={5} placeholder="Your Message" required value={form.message} onChange={handleChange}
        style={{ ...inputStyle, resize: 'vertical', lineHeight: '1.6' }}
        onFocus={e => e.target.style.borderColor = 'var(--gold)'}
        onBlur={e => e.target.style.borderColor = 'var(--border-subtle)'} />
      <button type="submit" className="btn btn-primary" style={{ alignSelf: 'flex-start', padding: '14px 32px' }}>
        Send Message
      </button>
      <style>{`@media(max-width:600px){.form-row{grid-template-columns:1fr!important}}`}</style>
    </form>
  )
}

/* ─── HOME PAGE ─── */
export default function Home() {
  return (
    <div className="page-enter">

      {/* ── HERO ── */}
      <section id="home" style={{
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        padding: '120px 0 80px',
        position: 'relative',
        overflow: 'hidden',
      }}>
        {/* Background elements */}
        <div style={{
          position: 'absolute', top: '-20%', right: '-10%',
          width: '700px', height: '700px',
          background: 'radial-gradient(circle, rgba(201,147,58,0.07) 0%, transparent 70%)',
          pointerEvents: 'none',
        }} />
        <div style={{
          position: 'absolute', bottom: '-10%', left: '-5%',
          width: '500px', height: '500px',
          background: 'radial-gradient(circle, rgba(201,147,58,0.04) 0%, transparent 70%)',
          pointerEvents: 'none',
        }} />
        {/* Decorative ring */}
        <div style={{
          position: 'absolute', top: '50%', right: '8%',
          transform: 'translateY(-50%)',
          width: '420px', height: '420px',
          border: '1px solid var(--border)',
          borderRadius: '50%',
          animation: 'spin-slow 60s linear infinite',
          opacity: 0.4,
          pointerEvents: 'none',
        }} />
        <div style={{
          position: 'absolute', top: '50%', right: '12%',
          transform: 'translateY(-50%)',
          width: '280px', height: '280px',
          border: '1px solid var(--border)',
          borderRadius: '50%',
          animation: 'spin-slow 40s linear infinite reverse',
          opacity: 0.3,
          pointerEvents: 'none',
        }} />

        <div className="container" style={{ position: 'relative', zIndex: 1 }}>
          <div style={{ maxWidth: '720px' }}>
            <span className="section-label animate-fade-up delay-1">Est. 2024 · Tanzania & USA</span>

            <h1 className="animate-fade-up delay-2" style={{
              fontFamily: 'var(--font-display)',
              fontSize: 'clamp(3rem, 7vw, 6rem)',
              fontWeight: '300',
              lineHeight: '1.1',
              letterSpacing: '-0.01em',
              marginBottom: '28px',
              color: 'var(--cream)',
            }}>
              Building systems that{' '}
              <em style={{ color: 'var(--gold)', fontStyle: 'italic' }}>serve all of us</em>
            </h1>

            <p className="animate-fade-up delay-3" style={{
              fontSize: '1.1rem',
              color: 'var(--cream-dim)',
              maxWidth: '560px',
              lineHeight: '1.8',
              marginBottom: '44px',
            }}>
              Technology solutions that open systems rather than close them — creating products that are excellent for those who can afford excellence, and accessible to those still climbing toward it.
            </p>

            <div className="animate-fade-up delay-4" style={{ display: 'flex', gap: '16px', flexWrap: 'wrap' }}>
              <a href="#about" className="btn btn-primary" onClick={e => {
                e.preventDefault()
                document.getElementById('about')?.scrollIntoView({ behavior: 'smooth' })
              }}>Our Story</a>
              <a href="#products" className="btn btn-outline" onClick={e => {
                e.preventDefault()
                document.getElementById('products')?.scrollIntoView({ behavior: 'smooth' })
              }}>Explore Products</a>
            </div>
          </div>
        </div>

        {/* Scroll hint */}
        <div style={{
          position: 'absolute', bottom: '32px', left: '50%',
          transform: 'translateX(-50%)',
          display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '8px',
          animation: 'fadeIn 1s 1.5s both',
        }}>
          <span style={{ fontSize: '0.65rem', letterSpacing: '0.2em', textTransform: 'uppercase', color: 'var(--cream-muted)' }}>Scroll</span>
          <div style={{ width: '1px', height: '40px', background: 'linear-gradient(to bottom, var(--gold), transparent)', animation: 'float 2s ease-in-out infinite' }} />
        </div>
      </section>

      {/* ── MISSION ── */}
      <section style={{ padding: '100px 0', background: '#111' }}>
        <div className="container">
          <div style={{ textAlign: 'center', marginBottom: '64px' }}>
            <span className="section-label">What We Stand For</span>
            <h2 style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(2rem, 4vw, 3rem)', fontWeight: '300', color: 'var(--cream)', marginTop: '8px' }}>
              Our Foundation
            </h2>
          </div>
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
            gap: '24px',
          }}>
            <MissionCard
              delay="0s"
              icon={<svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z"/></svg>}
              title="Our Mission"
              body="Build technology solutions that are excellent for those who can afford them and accessible to those still climbing toward them — opening systems rather than closing them."
            />
            <MissionCard
              delay="0.1s"
              icon={<svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"/></svg>}
              title="Our Vision"
              body="A world where talent and determination can overcome circumstance, where the floor of opportunity is higher, and where the ladder of success is climbable regardless of where someone starts."
            />
            <MissionCard
              delay="0.2s"
              icon={<svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/></svg>}
              title="Our Philosophy"
              body="We build within capitalism consciously, generously, and with our eyes fixed on those furthest from power. Our profits are a tool — everything beyond growth goes back into creating opportunity."
            />
          </div>
        </div>
      </section>

      {/* ── ABOUT ── */}
      <section id="about" style={{ padding: '120px 0' }}>
        <div className="container">
          <div style={{
            display: 'grid',
            gridTemplateColumns: '1fr 1fr',
            gap: '80px',
            alignItems: 'start',
          }} className="about-grid">
            {/* Text side */}
            <div>
              <span className="section-label">About Us</span>
              <h2 style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(2rem, 4vw, 3rem)', fontWeight: '300', color: 'var(--cream)', margin: '8px 0 28px' }}>
                Who We Are
              </h2>
              <p style={{ color: 'var(--cream-dim)', lineHeight: '1.8', marginBottom: '16px', fontSize: '1.05rem' }}>
                Wilberforce Technologies is built on a simple but radical belief — that the most powerful thing a business can do is build systems that genuinely serve everyone, not just those who already have access to them.
              </p>
              <p style={{ color: 'var(--cream-dim)', lineHeight: '1.8', marginBottom: '16px' }}>
                We build technology solutions spanning finance, health, real estate, and beyond. But behind every product we ship is a deeper purpose: to use the machinery of business to create opportunity, dignity, and possibility for people at every level of society.
              </p>
              <p style={{ color: 'var(--cream-dim)', lineHeight: '1.8', marginBottom: '36px' }}>
                We are named in quiet tribute to William Wilberforce, the British statesman who spent decades fighting to abolish the slave trade — driven purely by the conviction that the suffering of others was his concern too. That spirit lives in everything we build.
              </p>

              <blockquote style={{
                borderLeft: '2px solid var(--gold)',
                paddingLeft: '24px',
                fontFamily: 'var(--font-display)',
                fontStyle: 'italic',
                fontSize: '1.25rem',
                color: 'var(--cream)',
                lineHeight: '1.6',
              }}>
                "We do not believe we can change human nature or eliminate inequality. We believe we can make the floor higher and the ladder more climbable."
              </blockquote>
            </div>

            {/* Founder card */}
            <div style={{
              background: 'var(--surface)',
              border: '1px solid var(--border-subtle)',
              borderRadius: 'var(--radius-lg)',
              overflow: 'hidden',
            }}>
              <div style={{ position: 'relative', height: '280px', overflow: 'hidden' }}>
                <img
                  src="/headshot.jpeg"
                  alt="Damian Job Kahamba"
                  style={{ width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'top' }}
                />
                <div style={{
                  position: 'absolute', inset: 0,
                  background: 'linear-gradient(to top, var(--surface) 0%, transparent 60%)',
                }} />
              </div>
              <div style={{ padding: '28px 32px 32px' }}>
                <h3 style={{ fontFamily: 'var(--font-display)', fontSize: '1.5rem', fontWeight: '600', color: 'var(--cream)', marginBottom: '4px' }}>
                  Damian Job Kahamba
                </h3>
                <p style={{ color: 'var(--gold)', fontSize: '0.8rem', fontWeight: '600', letterSpacing: '0.1em', textTransform: 'uppercase', marginBottom: '16px' }}>
                  Founder & CEO
                </p>
                <p style={{ color: 'var(--cream-dim)', fontSize: '0.9rem', lineHeight: '1.7', marginBottom: '12px' }}>
                  MPH candidate in Epidemiology and Biostatistics at Florida A&M University. Former Head of HIV Molecular Testing Services at Tanzania's National Public Health Laboratory.
                </p>
                <p style={{ color: 'var(--cream-dim)', fontSize: '0.9rem', lineHeight: '1.7' }}>
                  Damian understands that talent and determination are evenly distributed across humanity — but opportunity is not. His role model is not a billionaire, but William Wilberforce.
                </p>
              </div>
            </div>
          </div>
        </div>
        <style>{`@media(max-width:768px){.about-grid{grid-template-columns:1fr!important;gap:48px!important}}`}</style>
      </section>

      {/* ── PRODUCTS ── */}
      <section id="products" style={{ padding: '100px 0', background: '#111' }}>
        <div className="container">
          <div style={{ marginBottom: '64px' }}>
            <span className="section-label">Our Products</span>
            <h2 style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(2rem, 4vw, 3rem)', fontWeight: '300', color: 'var(--cream)', marginTop: '8px', marginBottom: '16px' }}>
              Technology Solutions
            </h2>
            <p style={{ color: 'var(--cream-dim)', maxWidth: '520px', lineHeight: '1.7' }}>
              Innovative products built to open systems and create opportunities for all.
            </p>
          </div>
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
            gap: '24px',
          }}>
            <ProductCard
              featured
              status="Free & Open Source"
              statusColor="free"
              title="QMS Chatbot"
              description="An AI-powered Quality Management System assistant for healthcare laboratories. Built specifically for Tanzania's National Public Health Laboratory network."
              features={[
                'ISO 15189 compliant guidance',
                'Multilingual support (English / Kiswahili)',
                'Real-time quality assurance',
                'Professional training tools',
              ]}
              primaryLabel="Learn More"
              primaryTo="/qms-chatbot"
              secondaryLabel="Try Live"
              secondaryHref="https://qms.damianchatbot.net:8007"
            />
            <ProductCard
              status="In Development"
              statusColor="development"
              title="Team Tracker"
              description="Streamlined project management and team collaboration tools designed for organizations of all sizes, built for the real world."
              features={[
                'Real-time project tracking',
                'Team performance analytics',
                'Resource allocation tools',
                'Offline-first capability',
              ]}
              primaryLabel="Learn More"
              primaryTo="/team-tracker"
              secondaryLabel="Coming Soon"
              disabled
              secondaryTo="#"
            />
            <ProductCard
              status="Planned"
              statusColor="planned"
              title="More Coming"
              description="We're continuously developing new solutions in finance, health, and real estate. Stay tuned for exciting announcements."
              primaryLabel="Get Notified"
              primaryTo="/#contact"
            />
          </div>
        </div>
      </section>

      {/* ── CONTACT ── */}
      <section id="contact" style={{ padding: '120px 0' }}>
        <div className="container">
          <div style={{
            display: 'grid',
            gridTemplateColumns: '1fr 1.2fr',
            gap: '80px',
            alignItems: 'start',
          }} className="contact-grid">
            {/* Info side */}
            <div>
              <span className="section-label">Get in Touch</span>
              <h2 style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(2rem, 4vw, 3rem)', fontWeight: '300', color: 'var(--cream)', margin: '8px 0 20px' }}>
                Contact Us
              </h2>
              <p style={{ color: 'var(--cream-dim)', lineHeight: '1.8', marginBottom: '48px', fontSize: '1.05rem' }}>
                Ready to build systems that serve everyone? Let's talk about how we can work together.
              </p>

              {[
                {
                  icon: <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><polyline points="22,6 12,13 2,6"/></svg>,
                  label: 'Email',
                  value: 'contact@wilberforcetech.com',
                  href: 'mailto:contact@wilberforcetech.com',
                },
                {
                  icon: <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/></svg>,
                  label: 'Location',
                  value: 'Tallahassee, Florida, USA',
                  href: null,
                },
                {
                  icon: <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"/></svg>,
                  label: 'GitHub',
                  value: 'github.com/damianjobkahamba',
                  href: 'https://github.com/damianjobkahamba',
                  external: true,
                },
              ].map(({ icon, label, value, href, external }) => (
                <div key={label} style={{ display: 'flex', gap: '16px', marginBottom: '28px' }}>
                  <div style={{
                    width: '44px', height: '44px', flexShrink: 0,
                    background: 'var(--gold-dim)',
                    border: '1px solid var(--border)',
                    borderRadius: 'var(--radius-sm)',
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    color: 'var(--gold)',
                  }}>
                    {icon}
                  </div>
                  <div>
                    <p style={{ fontSize: '0.75rem', fontWeight: '600', letterSpacing: '0.1em', textTransform: 'uppercase', color: 'var(--cream-muted)', marginBottom: '4px' }}>{label}</p>
                    {href
                      ? <a href={href} target={external ? '_blank' : undefined} rel={external ? 'noopener noreferrer' : undefined}
                          style={{ color: 'var(--cream-dim)', fontSize: '0.9rem', transition: 'color 0.2s' }}
                          onMouseEnter={e => e.target.style.color = 'var(--gold)'}
                          onMouseLeave={e => e.target.style.color = 'var(--cream-dim)'}
                        >{value}</a>
                      : <p style={{ color: 'var(--cream-dim)', fontSize: '0.9rem' }}>{value}</p>
                    }
                  </div>
                </div>
              ))}
            </div>

            {/* Form side */}
            <div style={{
              background: 'var(--surface)',
              border: '1px solid var(--border-subtle)',
              borderRadius: 'var(--radius-lg)',
              padding: '40px',
            }}>
              <h3 style={{ fontFamily: 'var(--font-display)', fontSize: '1.5rem', fontWeight: '400', color: 'var(--cream)', marginBottom: '28px' }}>
                Send us a message
              </h3>
              <ContactForm />
            </div>
          </div>
        </div>
        <style>{`@media(max-width:768px){.contact-grid{grid-template-columns:1fr!important;gap:48px!important}}`}</style>
      </section>

    </div>
  )
}
