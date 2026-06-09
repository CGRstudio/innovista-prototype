// site.jsx — the REAL InnoVista marketing website (responsive, deployable).
(function () {
  const { useState, useEffect } = React;
  const { Icon, Logo } = window;
  const T = window.IV;
  const fD = 'var(--font-display)';
  const fB = 'var(--font-body)';

  function useViewport() {
    const [w, setW] = useState(typeof window !== 'undefined' ? window.innerWidth : 1280);
    useEffect(() => {
      const r = () => setW(window.innerWidth);
      window.addEventListener('resize', r);
      return () => window.removeEventListener('resize', r);
    }, []);
    return { w, mobile: w < 760, tablet: w < 1040 };
  }

  const MAXW = 1180;

  function Btn({ children, primary, large, full, onClick }) {
    const base = {
      fontFamily: fB, fontWeight: 600, cursor: 'pointer', border: 'none',
      borderRadius: 11, display: 'inline-flex', alignItems: 'center', gap: 8,
      justifyContent: 'center', whiteSpace: 'nowrap', textDecoration: 'none',
      padding: large ? '15px 26px' : '11px 18px', fontSize: large ? 16 : 14.5,
      width: full ? '100%' : 'auto', transition: 'transform .12s, box-shadow .15s, background .15s',
    };
    const skin = primary
      ? { background: T.green, color: '#06140d', boxShadow: `0 10px 30px -10px ${T.green}` }
      : { background: 'transparent', color: T.text, boxShadow: `inset 0 0 0 1px ${T.line2}` };
    return (
      <a href="#demo" onClick={onClick} style={{ ...base, ...skin }}
        onMouseEnter={(e) => { e.currentTarget.style.transform = 'translateY(-1px)'; }}
        onMouseLeave={(e) => { e.currentTarget.style.transform = 'none'; }}>{children}</a>
    );
  }

  function Eyebrow({ children }) {
    return (
      <div style={{
        display: 'inline-flex', alignItems: 'center', gap: 8, fontFamily: fB, fontSize: 12.5, whiteSpace: 'nowrap',
        fontWeight: 600, letterSpacing: '.14em', textTransform: 'uppercase', color: T.green,
        padding: '7px 13px', borderRadius: 999, background: T.greenGlow, boxShadow: `inset 0 0 0 1px ${T.line2}`,
      }}>
        <span style={{ width: 6, height: 6, borderRadius: 99, background: T.green, boxShadow: `0 0 10px ${T.green}` }} />
        {children}
      </div>
    );
  }

  // ── hero SMS proof card ──────────────────────────────────────
  function ProofThread() {
    const Bubble = ({ me, children, sub }) => (
      <div style={{ display: 'flex', justifyContent: me ? 'flex-end' : 'flex-start' }}>
        <div style={{
          maxWidth: '80%', fontFamily: fB, fontSize: 14, lineHeight: 1.42, padding: '9px 13px',
          borderRadius: 15, borderBottomRightRadius: me ? 5 : 15, borderBottomLeftRadius: me ? 15 : 5,
          background: me ? T.green : T.surface2, color: me ? '#06140d' : T.text,
          boxShadow: me ? 'none' : `inset 0 0 0 1px ${T.line}`,
        }}>
          {children}
          {sub && <div style={{ fontSize: 11, marginTop: 3, color: me ? 'rgba(6,20,13,.6)' : T.textDim }}>{sub}</div>}
        </div>
      </div>
    );
    return (
      <div style={{
        width: '100%', maxWidth: 360, background: T.bg2, borderRadius: 24, padding: '18px 18px 20px',
        boxShadow: `inset 0 0 0 1px ${T.line2}, 0 40px 80px -30px rgba(0,0,0,.6)`,
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 15 }}>
          <div style={{ width: 32, height: 32, borderRadius: 99, background: T.surface2, display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: `inset 0 0 0 1px ${T.line}` }}>
            <Icon.snowflake size={17} color={T.green} />
          </div>
          <div style={{ flex: 1 }}>
            <div style={{ fontFamily: fB, fontWeight: 600, fontSize: 13.5, color: T.text }}>Summit Heating &amp; Air</div>
            <div style={{ fontFamily: fB, fontSize: 11.5, color: T.green, display: 'flex', alignItems: 'center', gap: 5 }}>
              <span style={{ width: 5, height: 5, borderRadius: 9, background: T.green }} />Answered by InnoVista
            </div>
          </div>
          <div style={{ fontFamily: fB, fontSize: 11, color: T.textDim }}>9:41 PM</div>
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 9 }}>
          <Bubble>Sorry we missed you! What’s going on with your system? 🥵</Bubble>
          <Bubble me>AC won’t cool, blowing warm air</Bubble>
          <Bubble>Got it — what’s your zip so I can check we cover you?</Bubble>
          <Bubble me>80027</Bubble>
          <Bubble sub="Today, 2:00–4:00 PM · Marcus D.">You’re booked ✓ We’ll text when the tech is ~30 min out.</Bubble>
        </div>
      </div>
    );
  }

  function Nav({ vp, onDemo }) {
    const links = ['How it works', 'Features', 'Results', 'Pricing'];
    return (
      <header style={{
        position: 'sticky', top: 0, zIndex: 40, background: 'rgba(10,15,10,.72)', backdropFilter: 'blur(12px)',
        borderBottom: `1px solid ${T.line}`,
      }}>
        <div style={{ maxWidth: MAXW, margin: '0 auto', padding: vp.mobile ? '14px 20px' : '16px 28px', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <a href="#top" style={{ display: 'flex', alignItems: 'center', gap: 10, textDecoration: 'none' }}>
            <Logo size={vp.mobile ? 26 : 30} green={T.green} />
            <span style={{ fontFamily: fD, fontWeight: 700, fontSize: vp.mobile ? 18 : 20, color: T.text, letterSpacing: '-.01em' }}>InnoVista</span>
          </a>
          {!vp.tablet && (
            <nav style={{ display: 'flex', alignItems: 'center', gap: 30 }}>
              {links.map((l) => (
                <a key={l} href={`#${l.split(' ')[0].toLowerCase()}`} style={{ fontFamily: fB, fontSize: 14.5, color: T.textMute, textDecoration: 'none' }}>{l}</a>
              ))}
            </nav>
          )}
          <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
            {!vp.mobile && <a href="#demo" onClick={onDemo} style={{ fontFamily: fB, fontSize: 14.5, fontWeight: 600, color: T.text, textDecoration: 'none' }}>Sign in</a>}
            <Btn primary onClick={onDemo}>Book a demo</Btn>
          </div>
        </div>
      </header>
    );
  }

  function Hero({ vp, onDemo }) {
    return (
      <section id="top" style={{
        maxWidth: MAXW, margin: '0 auto', padding: vp.mobile ? '44px 20px 12px' : '84px 28px 64px',
        display: 'grid', gridTemplateColumns: vp.tablet ? '1fr' : '1.05fr .95fr', gap: vp.tablet ? 40 : 56, alignItems: 'center',
      }}>
        <div>
          <Eyebrow>Built for HVAC contractors</Eyebrow>
          <h1 style={{
            fontFamily: fD, fontWeight: 700, color: T.text, margin: '22px 0 0',
            fontSize: 'clamp(34px, 6vw, 56px)', lineHeight: 1.06, letterSpacing: '-.02em', textWrap: 'balance',
          }}>
            Every missed call is a job going to the guy who picked up.
          </h1>
          <p style={{ fontFamily: fB, color: T.textMute, fontSize: 'clamp(16px, 2.2vw, 19px)', lineHeight: 1.55, margin: '22px 0 0', maxWidth: 540 }}>
            InnoVista answers, texts back, and qualifies every lead in seconds — then drops a booked
            appointment straight on your calendar. Even at 2 a.m. in the middle of July.
          </p>
          <div style={{ display: 'flex', gap: 12, marginTop: 32, flexDirection: vp.mobile ? 'column' : 'row' }}>
            <Btn primary large full={vp.mobile} onClick={onDemo}>Book a demo <Icon.arrowRight size={18} color="#06140d" /></Btn>
            <Btn large full={vp.mobile} onClick={onDemo}>See it work</Btn>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 18, marginTop: 22, flexWrap: 'wrap' }}>
            {['No setup fees', 'Live in 48 hours', 'Cancel anytime'].map((x) => (
              <span key={x} style={{ display: 'inline-flex', alignItems: 'center', gap: 7, whiteSpace: 'nowrap', fontFamily: fB, fontSize: 13.5, color: T.textDim }}>
                <Icon.check size={15} color={T.green} />{x}
              </span>
            ))}
          </div>
        </div>
        <div style={{ display: 'flex', justifyContent: vp.tablet ? 'center' : 'flex-end' }}>
          <ProofThread />
        </div>
      </section>
    );
  }

  function LogoStrip({ vp }) {
    const names = ['Front Range HVAC', 'Summit Heating', 'BluePeak Air', 'Cornerstone Mechanical', 'Apex Comfort'];
    return (
      <section style={{ borderTop: `1px solid ${T.line}`, borderBottom: `1px solid ${T.line}`, background: T.bg2 }}>
        <div style={{ maxWidth: MAXW, margin: '0 auto', padding: vp.mobile ? '22px 20px' : '26px 28px' }}>
          <div style={{ fontFamily: fB, fontSize: 12, letterSpacing: '.14em', textTransform: 'uppercase', color: T.textDim, textAlign: 'center', marginBottom: 16 }}>
            Trusted by growing home-service teams
          </div>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: vp.mobile ? 18 : 40, justifyContent: 'center', alignItems: 'center' }}>
            {names.map((n) => (
              <span key={n} style={{ fontFamily: fD, fontWeight: 700, fontSize: vp.mobile ? 15 : 18, color: T.textMute, opacity: .7, letterSpacing: '-.01em' }}>{n}</span>
            ))}
          </div>
        </div>
      </section>
    );
  }

  function HowItWorks({ vp }) {
    const steps = [
      { n: '01', icon: 'phoneMissed', t: 'A call slips through', d: 'Missed call, after-hours, or a web form at midnight — InnoVista catches it instantly and opens a text conversation.' },
      { n: '02', icon: 'sparkle', t: 'AI qualifies the job', d: 'It asks the right questions — service, symptom, address, urgency — scores the lead, and weeds out tire-kickers.' },
      { n: '03', icon: 'calendar', t: 'A booked job lands', d: 'Confirmed appointment drops on your calendar with the tech, time window, and address already filled in.' },
    ];
    return (
      <section id="how" style={{ maxWidth: MAXW, margin: '0 auto', padding: vp.mobile ? '52px 20px' : '88px 28px' }}>
        <div style={{ textAlign: 'center', maxWidth: 640, margin: '0 auto 44px' }}>
          <Eyebrow>How it works</Eyebrow>
          <h2 style={{ fontFamily: fD, fontWeight: 700, fontSize: 'clamp(26px, 4vw, 38px)', lineHeight: 1.12, letterSpacing: '-.02em', color: T.text, margin: '18px 0 0' }}>
            From missed call to booked job — without you lifting a finger.
          </h2>
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: vp.tablet ? '1fr' : 'repeat(3, 1fr)', gap: 20 }}>
          {steps.map((s) => {
            const I = Icon[s.icon];
            return (
              <div key={s.n} style={{ background: T.surface, borderRadius: 18, padding: '28px 24px', boxShadow: `inset 0 0 0 1px ${T.line}`, position: 'relative' }}>
                <span style={{ fontFamily: fD, fontWeight: 700, fontSize: 13, color: T.green, letterSpacing: '.08em' }}>{s.n}</span>
                <div style={{ width: 46, height: 46, borderRadius: 13, background: T.greenGlow, display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: `inset 0 0 0 1px ${T.line2}`, margin: '14px 0 16px' }}>
                  <I size={23} color={T.green} />
                </div>
                <div style={{ fontFamily: fD, fontWeight: 600, fontSize: 19, color: T.text, marginBottom: 9, letterSpacing: '-.01em' }}>{s.t}</div>
                <div style={{ fontFamily: fB, fontSize: 14.5, lineHeight: 1.55, color: T.textMute }}>{s.d}</div>
              </div>
            );
          })}
        </div>
      </section>
    );
  }

  function Features({ vp }) {
    const feats = [
      { icon: 'bolt', t: 'Texts back in under 10 seconds', d: 'The second a call goes to voicemail, the homeowner gets a real text — not a “we’ll call you back.”' },
      { icon: 'sparkle', t: 'Qualifies before you pick up', d: 'Service, symptom, address and urgency — sorted and scored so you only chase the jobs worth chasing.' },
      { icon: 'calendar', t: 'Books straight to your calendar', d: 'Confirmed appointments land in your schedule with the tech, window and address already filled in.' },
      { icon: 'chat', t: 'Sounds like your front desk', d: 'Trained on your services, pricing and tone — homeowners can’t tell it from your best CSR.' },
      { icon: 'grid', t: 'One pipeline for every lead', d: 'Calls, web forms, Google and referrals all flow into a single board your team actually works.' },
      { icon: 'clock', t: 'Never sleeps, never forgets', d: 'Nights, weekends, peak season — every lead gets the same fast, consistent follow-up.' },
    ];
    return (
      <section id="features" style={{ background: T.bg2, borderTop: `1px solid ${T.line}`, borderBottom: `1px solid ${T.line}` }}>
        <div style={{ maxWidth: MAXW, margin: '0 auto', padding: vp.mobile ? '52px 20px' : '88px 28px' }}>
          <div style={{ maxWidth: 600, marginBottom: 44 }}>
            <Eyebrow>Features</Eyebrow>
            <h2 style={{ fontFamily: fD, fontWeight: 700, fontSize: 'clamp(26px, 4vw, 38px)', lineHeight: 1.12, letterSpacing: '-.02em', color: T.text, margin: '18px 0 0' }}>
              Everything you need to stop bleeding leads.
            </h2>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: vp.mobile ? '1fr' : vp.tablet ? 'repeat(2,1fr)' : 'repeat(3,1fr)', gap: 18 }}>
            {feats.map((c) => {
              const I = Icon[c.icon];
              return (
                <div key={c.t} style={{ background: T.surface, borderRadius: 16, padding: '24px 22px', boxShadow: `inset 0 0 0 1px ${T.line}` }}>
                  <div style={{ width: 42, height: 42, borderRadius: 12, background: T.greenGlow, display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: `inset 0 0 0 1px ${T.line2}`, marginBottom: 15 }}>
                    <I size={21} color={T.green} />
                  </div>
                  <div style={{ fontFamily: fD, fontWeight: 600, fontSize: 17, color: T.text, marginBottom: 8, letterSpacing: '-.01em' }}>{c.t}</div>
                  <div style={{ fontFamily: fB, fontSize: 14, lineHeight: 1.5, color: T.textMute }}>{c.d}</div>
                </div>
              );
            })}
          </div>
        </div>
      </section>
    );
  }

  function Stats({ vp }) {
    const stats = [['38%', 'more booked jobs from the same calls'], ['<10s', 'average text-back time'], ['24/7', 'coverage, nights & weekends included']];
    return (
      <section id="results" style={{ maxWidth: MAXW, margin: '0 auto', padding: vp.mobile ? '52px 20px' : '88px 28px' }}>
        <div style={{ background: T.green, borderRadius: 24, padding: vp.mobile ? '30px 24px' : '44px 48px', display: 'grid', gridTemplateColumns: vp.mobile ? '1fr' : 'repeat(3,1fr)', gap: vp.mobile ? 22 : 30 }}>
          {stats.map(([n, l], i) => (
            <div key={i} style={{ borderLeft: !vp.mobile && i ? '1px solid rgba(6,20,13,.18)' : 'none', paddingLeft: !vp.mobile && i ? 30 : 0 }}>
              <div style={{ fontFamily: fD, fontWeight: 700, fontSize: vp.mobile ? 42 : 50, color: '#06140d', lineHeight: 1, letterSpacing: '-.02em' }}>{n}</div>
              <div style={{ fontFamily: fB, fontSize: 15, color: 'rgba(6,20,13,.72)', marginTop: 9, lineHeight: 1.4 }}>{l}</div>
            </div>
          ))}
        </div>
      </section>
    );
  }

  function CTA({ vp, onDemo }) {
    return (
      <section id="demo" style={{ maxWidth: MAXW, margin: '0 auto', padding: vp.mobile ? '20px 20px 64px' : '12px 28px 96px' }}>
        <div style={{ background: T.surface, borderRadius: 24, padding: vp.mobile ? '40px 26px' : '64px 56px', boxShadow: `inset 0 0 0 1px ${T.line2}`, textAlign: 'center' }}>
          <h2 style={{ fontFamily: fD, fontWeight: 700, fontSize: 'clamp(26px, 4.4vw, 42px)', lineHeight: 1.1, letterSpacing: '-.02em', color: T.text, margin: 0, textWrap: 'balance' }}>
            See InnoVista answer a lead in real time.
          </h2>
          <p style={{ fontFamily: fB, fontSize: 'clamp(15px, 2vw, 18px)', lineHeight: 1.55, color: T.textMute, margin: '16px auto 0', maxWidth: 520 }}>
            Tap the chat in the corner to walk a homeowner from a missed call to a booked job — or book a
            15-minute demo and we’ll set it up on your number.
          </p>
          <div style={{ display: 'flex', gap: 12, marginTop: 30, justifyContent: 'center', flexDirection: vp.mobile ? 'column' : 'row' }}>
            <Btn primary large full={vp.mobile} onClick={onDemo}>Book a demo <Icon.arrowRight size={18} color="#06140d" /></Btn>
            <a href="#" onClick={(e) => { e.preventDefault(); window.__ivOpenChat && window.__ivOpenChat(); }}
              style={{ fontFamily: fB, fontWeight: 600, fontSize: 16, cursor: 'pointer', borderRadius: 11, padding: '15px 26px', color: T.text, textDecoration: 'none', boxShadow: `inset 0 0 0 1px ${T.line2}`, display: 'inline-flex', alignItems: 'center', gap: 8, justifyContent: 'center', width: vp.mobile ? '100%' : 'auto' }}>
              <Icon.chat size={18} color={T.green} />Try the live demo
            </a>
          </div>
        </div>
      </section>
    );
  }

  function Footer({ vp }) {
    const cols = [
      ['Product', ['Features', 'How it works', 'Pricing', 'Integrations']],
      ['Company', ['About', 'Careers', 'Contact', 'Blog']],
      ['Legal', ['Privacy', 'Terms', 'Security']],
    ];
    return (
      <footer style={{ borderTop: `1px solid ${T.line}`, background: T.bg2 }}>
        <div style={{ maxWidth: MAXW, margin: '0 auto', padding: vp.mobile ? '40px 20px 28px' : '56px 28px 32px' }}>
          <div style={{ display: 'grid', gridTemplateColumns: vp.mobile ? '1fr' : '1.4fr repeat(3, 1fr)', gap: vp.mobile ? 28 : 40 }}>
            <div>
              <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 14 }}>
                <Logo size={28} green={T.green} />
                <span style={{ fontFamily: fD, fontWeight: 700, fontSize: 18, color: T.text }}>InnoVista</span>
              </div>
              <p style={{ fontFamily: fB, fontSize: 14, lineHeight: 1.55, color: T.textMute, maxWidth: 280, margin: 0 }}>
                AI lead capture and automated booking for home-service businesses. Stop missing jobs.
              </p>
            </div>
            {cols.map(([h, items]) => (
              <div key={h}>
                <div style={{ fontFamily: fD, fontWeight: 600, fontSize: 14, color: T.text, marginBottom: 14 }}>{h}</div>
                <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
                  {items.map((it) => <a key={it} href="#" onClick={(e) => e.preventDefault()} style={{ fontFamily: fB, fontSize: 13.5, color: T.textMute, textDecoration: 'none' }}>{it}</a>)}
                </div>
              </div>
            ))}
          </div>
          <div style={{ display: 'flex', flexDirection: vp.mobile ? 'column' : 'row', gap: 10, justifyContent: 'space-between', alignItems: vp.mobile ? 'flex-start' : 'center', marginTop: 40, paddingTop: 22, borderTop: `1px solid ${T.line}` }}>
            <span style={{ fontFamily: fB, fontSize: 12.5, color: T.textDim }}>© 2026 InnoVista Strategies. Lead capture for the trades.</span>
            <span style={{ fontFamily: fB, fontSize: 12.5, color: T.textDim }}>Made for contractors who hate missing calls.</span>
          </div>
        </div>
      </footer>
    );
  }

  // ── floating chat widget (live product demo on the real site) ──
  function ChatWidget({ vp, openState }) {
    const [open, setOpen] = openState;
    const flow = window.useChatFlow(open);
    const ChatBody = window.ChatBody;

    useEffect(() => { window.__ivOpenChat = () => setOpen(true); }, []);

    const panelW = vp.mobile ? '100vw' : 384;
    const panelH = vp.mobile ? '100dvh' : 'min(620px, calc(100vh - 110px))';

    return (
      <React.Fragment>
        {/* panel */}
        {open && (
          <div style={{
            position: 'fixed', zIndex: 60,
            right: vp.mobile ? 0 : 24, bottom: vp.mobile ? 0 : 96,
            width: panelW, height: panelH,
            background: T.bg, borderRadius: vp.mobile ? 0 : 20, overflow: 'hidden',
            display: 'flex', flexDirection: 'column',
            boxShadow: `inset 0 0 0 1px ${T.line2}, 0 40px 80px -20px rgba(0,0,0,.7)`,
            animation: 'ivslideup .28s cubic-bezier(.2,.8,.2,1)',
          }}>
            {/* header */}
            <div style={{ flexShrink: 0, background: 'rgba(13,19,15,.95)', backdropFilter: 'blur(10px)', borderBottom: `1px solid ${T.line}` }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 11, padding: vp.mobile ? '44px 16px 12px' : '14px 16px' }}>
                <div style={{ width: 38, height: 38, borderRadius: 99, background: T.surface2, display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: `inset 0 0 0 1px ${T.line}` }}>
                  <Icon.snowflake size={20} color={T.green} />
                </div>
                <div style={{ flex: 1 }}>
                  <div style={{ fontFamily: fD, fontWeight: 700, fontSize: 15, color: T.text }}>InnoVista AI <span style={{ fontFamily: fB, fontWeight: 500, fontSize: 11, color: T.green, background: T.greenGlow, padding: '2px 7px', borderRadius: 6, marginLeft: 4 }}>Live demo</span></div>
                  <div style={{ fontFamily: fB, fontSize: 11.5, color: T.green, display: 'flex', alignItems: 'center', gap: 5, marginTop: 2 }}>
                    <span style={{ width: 5, height: 5, borderRadius: 9, background: T.green, boxShadow: `0 0 8px ${T.green}` }} />replies instantly
                  </div>
                </div>
                <div onClick={flow.reset} title="Restart" style={{ cursor: 'pointer', width: 32, height: 32, borderRadius: 99, display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: `inset 0 0 0 1px ${T.line}`, marginRight: 4 }}>
                  <Icon.bell size={16} color={T.textMute} />
                </div>
                <div onClick={() => setOpen(false)} title="Close" style={{ cursor: 'pointer', width: 32, height: 32, borderRadius: 99, display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: `inset 0 0 0 1px ${T.line}` }}>
                  <Icon.plus size={18} color={T.textMute} style={{ transform: 'rotate(45deg)' }} />
                </div>
              </div>
            </div>
            <ChatBody flow={flow} pad={16} bottomPad={vp.mobile ? 28 : 18} />
          </div>
        )}

        {/* launcher button */}
        {!(open && vp.mobile) && (
          <button onClick={() => setOpen((o) => !o)} title={open ? 'Close chat' : 'Chat with us'}
            style={{
              position: 'fixed', zIndex: 61, right: 24, bottom: 24,
              width: 62, height: 62, borderRadius: 999, border: 'none', cursor: 'pointer',
              background: T.green, display: 'flex', alignItems: 'center', justifyContent: 'center',
              boxShadow: `0 16px 34px -10px ${T.green}`,
            }}>
            {!open && <span style={{ position: 'absolute', inset: 0, borderRadius: 999, animation: 'ivpulse 2.4s infinite' }} />}
            {open
              ? <Icon.plus size={26} color="#06140d" style={{ transform: 'rotate(45deg)' }} />
              : <Icon.chat size={27} color="#06140d" />}
            {!open && <span style={{ position: 'absolute', top: -2, right: -2, width: 20, height: 20, borderRadius: 99, background: '#06140d', color: T.green, fontFamily: fB, fontWeight: 700, fontSize: 11, display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: `0 0 0 2px ${T.green}` }}>1</span>}
          </button>
        )}
      </React.Fragment>
    );
  }

  function Site() {
    const vp = useViewport();
    const openState = useState(false);
    const onDemo = (e) => { if (e) e.preventDefault(); openState[1](true); };
    return (
      <div style={{ background: T.bg, minHeight: '100vh', color: T.text }}>
        <Nav vp={vp} onDemo={onDemo} />
        <Hero vp={vp} onDemo={onDemo} />
        <LogoStrip vp={vp} />
        <HowItWorks vp={vp} />
        <Features vp={vp} />
        <Stats vp={vp} />
        <CTA vp={vp} onDemo={onDemo} />
        <Footer vp={vp} />
        <ChatWidget vp={vp} openState={openState} />
      </div>
    );
  }

  window.InnoVistaSite = Site;
})();
