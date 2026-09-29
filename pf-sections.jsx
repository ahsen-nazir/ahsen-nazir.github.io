/* ===== Ahsen Nazir Portfolio - section components ===== */
const { useEffect, useRef, useState } = React;
const PF = window.PF;

function Nav() {
  const [scrolled, setScrolled] = useState(false);
  useEffect(() => {
    const f = () => setScrolled(window.scrollY > 40);
    f(); window.addEventListener('scroll', f, { passive: true });
    return () => window.removeEventListener('scroll', f);
  }, []);
  return (
    <header className={"nav" + (scrolled ? " scrolled" : "")}>
      <div className="row">
        <a href="#top" className="brand"><span className="dot"></span>{PF.brand}</a>
        <nav>
          <a href="#work">Work</a>
          <a href="#skills">Skills</a>
          <a href="#about">About</a>
        </nav>
        <a href="#contact" className="navcta">Get in touch</a>
      </div>
    </header>
  );
}

function Hero() {
  const words = ["AI", "that", "ships", "to"];
  return (
    <section className="hero" id="top">
      <div className="hero-bg">
        <div className="hero-grid"></div>
        <div className="hero-glow"></div>
        <div className="hero-ring"></div>
        <div className="hero-ring r2"></div>
        <div className="hero-ring r3"></div>
      </div>
      <div className="wrap hero-inner">
        <div className="hero-top">
          <div className="eyebrow fadeword" style={{ animationDelay: '.05s' }}>// designing intelligent systems</div>
          <h1>
            {words.map((w, i) => (
              <React.Fragment key={i}>
                <span className="fadeword" style={{ animationDelay: (0.15 + i * 0.1) + 's' }}>{w}</span>{' '}
              </React.Fragment>
            ))}
            <span className="fadeword t" style={{ animationDelay: '.55s' }}>prod.</span>
          </h1>
        </div>
        <div className="portrait fadeword" style={{ animationDelay: '.5s' }}>
          <span className="badge"><span className="pd"></span>Available</span>
          <div className="frame">
            <img className="portrait-photo" src="assets/ahsen.png" alt="Ahsen Nazir" />
            <div className="tint"></div>
            <div className="tint2"></div>
          </div>
          <span className="corner tl"></span><span className="corner tr"></span>
          <span className="corner bl"></span><span className="corner br"></span>
        </div>
        <div className="hero-bottom">
          <p className="bio fadeword" style={{ animationDelay: '.7s' }} dangerouslySetInnerHTML={{ __html: PF.bio.replace('production AI platforms', '<b>production AI platforms</b>') }}></p>
          <div className="hero-cta fadeword" style={{ animationDelay: '.8s' }}>
            <a href="#work" className="btn primary">View work <span className="ar">→</span></a>
            <a href={PF.resume} target="_blank" rel="noopener" className="btn ghost">Résumé <span className="ar">↗</span></a>
          </div>
          <div className="hero-meta fadeword" style={{ animationDelay: '.9s' }}>
            {PF.stats.map((s, i) => (
              <div className="m" key={i}><b>{s.n}</b><span>{s.l}</span></div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

function Ticker() {
  const items = [...PF.ticker, ...PF.ticker];
  return (
    <div className="ticker">
      <div className="track">
        {items.map((t, i) => <span key={i}>{t}</span>)}
      </div>
    </div>
  );
}

function LexForge() {
  const lf = PF.projects[0] || PF.lexforge;
  const name = lf.name || lf.title;
  const stack = lf.stack || lf.tags || [];
  const highlights = lf.highlights || (lf.tags || []).map(t => t + " implementation");
  const metrics = lf.metrics || [];
  const shot = lf.shot || lf.img;
  return (
    <section className="lex" id="lexforge">
      <div className="wrap">
        <div className="lex-card reveal">
          <div className="lexglow"></div>
          <div className="lex-grid">
            <div className="lex-l">
              <div className="lex-tag"><span className="live"></span>{lf.tag || "Latest Release"}</div>
              <h3>{name}<span className="sub">{lf.sub}</span></h3>
              <p className="desc">{lf.desc}</p>
              <div className="lex-hi">
                {highlights.map((h, i) => (
                  <div className="h" key={i}><i>▹</i>{h}</div>
                ))}
              </div>
              <div className="lex-stack">
                <span className="lex-stack-label">Built with</span>
                <div className="lex-stack-chips">
                  {stack.map((s, i) => (
                    <span className="lex-chip" key={i}>{s}</span>
                  ))}
                </div>
              </div>
              {lf.link ? (
                <div className="lexcta">
                  <a href={lf.link} target="_blank" rel="noopener" className="btn primary">View case study <span className="ar">↗</span></a>
                </div>
              ) : null}
            </div>
            <div className="lex-r">
              <div className="browser">
                <div className="bar"><span className="d"></span><span className="d"></span><span className="d"></span><span className="url">{lf.urlLabel || lf.link}</span></div>
                <image-slot id="lexforge-shot" src={shot} shape="rect" fit="cover" placeholder={"Drop a " + name + " screenshot"}></image-slot>
              </div>
              {metrics.length ? (
                <div className="lex-metrics">
                  {metrics.map((m, i) => (
                  <div className="lm" key={i}>
                    <div className="lm-head"><b>{m.v}</b><span className="lm-badge">{m.badge || "RAGAS"}</span></div>
                    <span className="lm-name">{m.name}</span>
                    <span className="lm-delta"><i>▲</i>{m.d}</span>
                  </div>
                  ))}
                </div>
              ) : null}
              <div className="scan"></div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function Projects() {
  const [expanded, setExpanded] = useState(false);
  const gridRef = useRef(null);
  const initialCount = 8;
  const visibleProjects = expanded ? PF.projects : PF.projects.slice(0, initialCount);
  const hiddenCount = Math.max(PF.projects.length - initialCount, 0);

  useEffect(() => {
    const grid = gridRef.current;
    if (!grid) return;
    const cards = grid.querySelectorAll('.reveal:not(.in)');
    const ob = new IntersectionObserver((entries) => {
      entries.forEach(e => {
        if (e.isIntersecting) {
          e.target.classList.add('in');
          ob.unobserve(e.target);
        }
      });
    }, { threshold: 0.14, rootMargin: '0px 0px -8% 0px' });
    cards.forEach(card => ob.observe(card));
    return () => ob.disconnect();
  }, [visibleProjects.length]);

  return (
    <section className="work" id="work">
      <div className="wrap">
        <div className="sec-head reveal">
          <div>
            <div className="idx">02 / Selected Work</div>
            <h2>Featured Projects</h2>
          </div>
          <p className="lead">Production AI across vision, language, and generative systems, built end-to-end from model to deployment.</p>
        </div>
        <div className="proj-grid" ref={gridRef}>
          {visibleProjects.map((p, i) => {
            const CardTag = p.link ? "a" : "article";
            const cardProps = p.link ? { href: p.link, target: "_blank", rel: "noopener" } : {};
            return (
            <CardTag className={"pcard reveal" + (" d" + (i % 3 + 1))} {...cardProps} key={i}>
              <div className="thumb">
                <img src={p.img} alt={p.title} loading="lazy" />
              </div>
              <span className="pnum">{String(i + 1).padStart(2, '0')}</span>
              <div className="body">
                <div className="rb-main">
                  <h3>{p.title}</h3>
                  <p className="pdesc">{p.desc}</p>
                  <div className="tags">{p.tags.map((t, j) => <span key={j}>{t}</span>)}</div>
                </div>
                {p.link ? <span className="plink"><span className="plabel">View</span><span className="ar">↗</span></span> : null}
              </div>
            </CardTag>
          );
          })}
        </div>
        {hiddenCount > 0 ? (
          <div className="project-more reveal">
            <button className="btn ghost project-toggle" type="button" onClick={() => setExpanded(v => !v)} aria-expanded={expanded}>
              <span>{expanded ? "Show fewer projects" : "Show " + hiddenCount + " more project" + (hiddenCount === 1 ? "" : "s")}</span>
              <span className="toggle-mark">{expanded ? "-" : "+"}</span>
            </button>
          </div>
        ) : null}
      </div>
    </section>
  );
}

function Skills() {
  const ref = useRef(null);
  const [show, setShow] = useState(false);
  useEffect(() => {
    const el = ref.current; if (!el) return;
    const ob = new IntersectionObserver((es) => {
      es.forEach(e => { if (e.isIntersecting) { setShow(true); ob.disconnect(); } });
    }, { threshold: 0.3 });
    ob.observe(el); return () => ob.disconnect();
  }, []);
  return (
    <section className="skills" id="skills">
      <div className="wrap">
        <div className="sec-head reveal">
          <div>
            <div className="idx">03 / Capabilities</div>
            <h2>Skills &amp; Stack</h2>
          </div>
          <p className="lead">A curious AI developer exploring every layer of the stack, from research to robust deployment.</p>
        </div>
        <div className="skills-grid" ref={ref}>
          <div className="reveal">
            <div className="do-list">
              {PF.doList.map((d, i) => (
                <div className="do" key={i}><i>{String(i + 1).padStart(2, '0')}</i>{d}</div>
              ))}
            </div>
            <div className="bars">
              {PF.bars.map((b, i) => (
                <div className="bar" key={i}>
                  <div className="top"><span className="name">{b.name}</span><span className="pct">{b.pct}%</span></div>
                  <div className="track"><div className="fill" style={{ width: show ? b.pct + '%' : 0, transitionDelay: (i * 0.12) + 's' }}></div></div>
                </div>
              ))}
            </div>
          </div>
          <div className="reveal d1">
            <div className="stack-head">// Tools &amp; frameworks</div>
            <div className="chips">
              {PF.skills.map((s, i) => (
                <span className="chip" key={i}><i className={s.i}></i>{s.n}</span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function Pursuits() {
  const p = PF.pursuits;
  return (
    <section className="pursuits" id="pursuits">
      <div className="wrap">
        <div className="sec-head reveal">
          <div>
            <div className="idx">04 / Off the Clock</div>
            <h2>Beyond the Terminal</h2>
          </div>
          <p className="lead">{p.intro}</p>
        </div>
        <div className="pursuits-grid">
          <div className="collage reveal" role="group" aria-label="Personal photos">
            {p.photos.map((ph, i) => (
              <figure className="col-card" key={ph.id}>
                <image-slot src={ph.src} id={ph.id} shape="rect" fit="cover" placeholder={"Photo " + (i + 1)}></image-slot>
                <figcaption>{ph.cap}</figcaption>
              </figure>
            ))}
          </div>
          <div className="interests reveal d1">
            <div className="stack-head">// Things I'm into</div>
            <div className="chips">
              {p.interests.map((it, i) => (
                <span className="chip int" key={i}>{it}</span>
              ))}
            </div>
            <p className="fan-hint mono"></p>
          </div>
        </div>
      </div>
    </section>
  );
}

function Experience() {
  return (
    <section className="about" id="about">
      <div className="wrap">
        <div className="sec-head reveal">
          <div>
            <div className="idx">05 / Background</div>
            <h2>Experience</h2>
          </div>
          <p className="lead">Five years across AI research, freelance delivery, and full-stack engineering.</p>
        </div>
        <div className="timeline">
          {PF.experience.map((x, i) => (
            <div className="xp reveal" key={i}>
              <div className="when">
                <div className="logo">{x.logo ? <img src={x.logo} alt={x.co} /> : <span className="initials">{x.initials}</span>}</div>
                {x.date}{x.loc ? <span className="loc">{x.loc}</span> : null}
              </div>
              <div>
                <h3 className="role">{x.role}</h3>
                <div className="co">{x.co}</div>
                <ul>{x.bullets.map((b, j) => <li key={j}>{b}</li>)}</ul>
              </div>
            </div>
          ))}
        </div>
        <div className="edu-row">
          {PF.education.map((e, i) => (
            <div className="edu reveal" key={i}>
              <div className="logo"><img src={e.logo} alt={e.school} /></div>
              <div>
                <h4>{e.school}</h4>
                <div className="deg">{e.deg}</div>
                <div className="dur">{e.dur}</div>
                <p style={{ margin: '12px 0 0', fontSize: 14, color: 'var(--muted)', lineHeight: 1.5 }}>{e.note}</p>
              </div>
            </div>
          ))}
        </div>

        <div className="certs-head reveal">// Certifications &amp; Credentials</div>
        <div className="cert-grid">
          {PF.certs.map((c, i) => (
            <a className="cert reveal" href={c.url} target="_blank" rel="noopener" key={i}>
              <div className="badge-img">
                <img src={c.img} alt={c.title} loading="lazy"
                  onError={(ev) => { if (ev.target.src !== c.fallback) ev.target.src = c.fallback; }} />
              </div>
              <div className="cert-meta">
                <h4>{c.title}</h4>
                <div className="issuer">{c.issuer}</div>
                <span className="verify">Verify on Credly <span className="ar">↗</span></span>
              </div>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}

function Contact() {
  const c = PF.contact;
  return (
    <section className="contact" id="contact">
      <div className="cglow"></div>
      <div className="wrap contact-inner">
        <div className="eyebrow reveal">06 / Contact</div>
        <h2 className="reveal d1">Let's build<br /><span className="it">something intelligent.</span></h2>
        <a href={"mailto:" + c.email} className="mailbtn reveal d2">{c.email} <span>↗</span></a>
        <div className="socials reveal d3">
          {c.socials.map((s, i) => (
            <a href={s.url} target="_blank" rel="noopener" key={i} className="social-pill" aria-label={s.label}><i className={s.i}></i>{s.label}</a>
          ))}
        </div>
      </div>
      <div className="wrap">
        <div className="foot">
          <div className="row">
            <span>© {new Date().getFullYear()} {PF.name}</span>
            <span>AI Engineer · Islamabad</span>
            <a href="#top">Back to top ↑</a>
          </div>
        </div>
      </div>
    </section>
  );
}

Object.assign(window, { Nav, Hero, Ticker, LexForge, Projects, Skills, Pursuits, Experience, Contact });
