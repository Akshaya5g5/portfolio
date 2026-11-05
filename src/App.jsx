import { useEffect, useRef, useState } from 'react'
import { profile, skills, experience, projects, certs } from './data'

function useTyped(words) {
  const [t, setT] = useState('')
  useEffect(() => {
    let w = 0, c = 0, del = false, id
    const tick = () => {
      const word = words[w]
      c += del ? -1 : 1
      setT(word.slice(0, c))
      let d = del ? 28 : 60
      if (!del && c === word.length) { del = true; d = 1500 }
      else if (del && c === 0) { del = false; w = (w + 1) % words.length; d = 300 }
      id = setTimeout(tick, d)
    }
    tick()
    return () => clearTimeout(id)
  }, [])
  return t
}

/* ---------- Hero: a request travelling through the Command Center architecture ---------- */
const N = {
  client: [10, 170, 100, 'Client'], api: [140, 170, 100, 'FastAPI'], orch: [270, 170, 100, 'Orchestrator'],
  llm: [270, 40, 100, 'LLM provider'],
  infra: [430, 30, 110, 'Infra agent'], mon: [430, 120, 110, 'Monitoring'], cost: [430, 210, 110, 'Cost'], sec: [430, 300, 110, 'Security'],
}
const E = [['client', 'api'], ['api', 'orch'], ['orch', 'llm'], ['orch', 'infra'], ['orch', 'mon'], ['orch', 'cost'], ['orch', 'sec']]
const AGENTS = ['infra', 'mon', 'cost', 'sec']
const LOGS = {
  infra: 'POST /ask  “create a VM in ap-hyderabad” → orchestrator → infra agent → terraform plan',
  mon: 'POST /ask  “why is the API slow?” → orchestrator → monitoring agent → metrics',
  cost: 'POST /ask  “where is spend rising?” → orchestrator → cost agent → report',
  sec: 'POST /ask  “any open ports?” → orchestrator → security agent → findings',
}
const edgePath = ([a, b]) => {
  const A = N[a], B = N[b]
  if (A[0] === B[0]) return `M${A[0] + 50} ${A[1]} L${B[0] + 50} ${B[1] + 40}`
  const x1 = A[0] + A[2], y1 = A[1] + 20, x2 = B[0], y2 = B[1] + 20, m = (x1 + x2) / 2
  return `M${x1} ${y1} C${m} ${y1} ${m} ${y2} ${x2} ${y2}`
}

function Trace() {
  const [i, setI] = useState(0)
  useEffect(() => { const id = setInterval(() => setI(v => (v + 1) % 4), 3200); return () => clearInterval(id) }, [])
  const active = AGENTS[i]
  return (
    <div className="trace" aria-label="Animated diagram of a request routed by an orchestrator to specialised agents">
      <div className="bar"><i /><i /><i /><span>command-center / live request</span></div>
      <svg viewBox="0 0 550 350">
        {E.map((e, k) => {
          const on = e[1] === active || ['api', 'orch', 'llm'].includes(e[1]) || e[0] === 'client'
          return <path key={k} id={`e${k}`} d={edgePath(e)} className={`edge ${on ? 'on' : ''}`} />
        })}
        {E.map((e, k) => (e[1] === active || !AGENTS.includes(e[1])) && (
          <circle key={`${k}-${i}`} r="4" className="dot">
            <animateMotion dur="1.6s" repeatCount="indefinite" begin={`${k * 0.25}s`}><mpath href={`#e${k}`} /></animateMotion>
          </circle>
        ))}
        {Object.entries(N).map(([k, [x, y, w, label]]) => (
          <g key={k} className={`node ${k === active ? 'hot' : ''} ${k === 'orch' ? 'core' : ''}`}>
            <rect x={x} y={y} width={w} height="40" rx="9" />
            <text x={x + w / 2} y={y + 25} textAnchor="middle">{label}</text>
          </g>
        ))}
      </svg>
      <div className="log" key={i}><span className="ok">200</span> {LOGS[active]}</div>
    </div>
  )
}

const SECTIONS = ['skills', 'experience', 'projects', 'contact']

function Nav() {
  const [act, setAct] = useState('')
  useEffect(() => {
    const io = new IntersectionObserver(
      es => es.forEach(e => e.isIntersecting && setAct(e.target.id)),
      { rootMargin: '-40% 0px -55% 0px' }
    )
    SECTIONS.forEach(id => { const el = document.getElementById(id); el && io.observe(el) })
    return () => io.disconnect()
  }, [])
  return (
    <header className="topbar">
      <div className="topbar-in">
        <a className="brand" href="#top" aria-label="Uba Akshaya – back to top">
          <img src={`${import.meta.env.BASE_URL}Uba%20Akshaya%20Cloud%20Developer%20Badge.png`} alt="Uba Akshaya Cloud Developer badge" />
        </a>
        <nav className="links" aria-label="Sections">
          {SECTIONS.map(id => (
            <a key={id} href={`#${id}`} className={act === id ? 'act' : ''}>{id[0].toUpperCase() + id.slice(1)}</a>
          ))}
        </nav>
        <a className="hire" href={`mailto:${profile.email}`}>Email me</a>
      </div>
    </header>
  )
}

function Hero() {
  const typed = useTyped(profile.roles)
  return (
    <section id="top" className="hero">
      <div className="hero-text">
        <p className="hello">Hi, I’m</p>
        <h1>Uba<br />Akshaya</h1>
        <p className="role">{typed}<b className="caret" /></p>
        <p className="lead">{profile.summary}</p>
        <div className="cta">
          <a className="btn primary" href="#projects">See my projects</a>
          <a className="btn" href={`mailto:${profile.email}`}>Email me</a>
          <a className="btn" href={profile.linkedin} target="_blank" rel="noreferrer">LinkedIn</a>
        </div>
      </div>
      <Trace />
    </section>
  )
}

function Skills() {
  const keys = Object.keys(skills)
  const [k, setK] = useState(keys[0])
  return (
    <section id="skills">
      <h2>What I work with</h2>
      <div className="tabs" role="tablist">
        {keys.map(x => <button key={x} role="tab" aria-selected={x === k} className={x === k ? 'sel' : ''} onClick={() => setK(x)}>{x}</button>)}
      </div>
      <div className="chips" key={k}>
        {skills[k].map((s, n) => <span key={s} style={{ animationDelay: `${n * 45}ms` }}>{s}</span>)}
      </div>
    </section>
  )
}

function Timeline() {
  const refs = useRef([])
  useEffect(() => {
    const io = new IntersectionObserver(es => es.forEach(e => e.isIntersecting && e.target.classList.add('in')), { threshold: 0.25 })
    refs.current.forEach(r => r && io.observe(r))
    return () => io.disconnect()
  }, [])
  return (
    <section id="experience">
      <h2>Where I’ve worked</h2>
      <div className="timeline">
        {experience.map((e, n) => (
          <article key={e.role} ref={el => (refs.current[n] = el)} className="tl">
            <span className="pin" />
            <div className="when">{e.when}</div>
            <h3>{e.role}</h3>
            <p className="org">{e.org}</p>
            <ul>{e.points.map(p => <li key={p}>{p}</li>)}</ul>
          </article>
        ))}
      </div>
    </section>
  )
}

function Projects() {
  const [open, setOpen] = useState(0)
  return (
    <section id="projects">
      <h2>Things I’ve built</h2>
      <div className="plist">
        {projects.map((p, n) => (
          <article key={p.title} className={`proj ${open === n ? 'open' : ''}`}>
            <button onClick={() => setOpen(open === n ? -1 : n)} aria-expanded={open === n}>
              <span><strong>{p.title}</strong><em>{p.sub}</em></span>
              <span className="plus" aria-hidden>+</span>
            </button>
            <div className="body"><div>
              <ul>{p.points.map(x => <li key={x}>{x}</li>)}</ul>
              <div className="chips small">{p.stack.map(s => <span key={s}>{s}</span>)}</div>
            </div></div>
          </article>
        ))}
      </div>
    </section>
  )
}

function Contact() {
  return (
    <section id="contact" className="contact">
      <h2>Let’s talk</h2>
      <p>Hiring for a Python, FastAPI or cloud-backend role? I’d like to hear about it.</p>
      <div className="cta">
        <a className="btn primary" href={`mailto:${profile.email}`}>{profile.email}</a>
        <a className="btn" href={profile.linkedin} target="_blank" rel="noreferrer">Message on LinkedIn</a>
      </div>
      <h3 className="certh">Certifications</h3>
      <ul className="certs">{certs.map(c => <li key={c}>{c}</li>)}</ul>
      <footer>© {new Date().getFullYear()} Uba Akshaya</footer>
    </section>
  )
}

export default function App() {
  useEffect(() => {
    const m = e => { document.documentElement.style.setProperty('--mx', e.clientX + 'px'); document.documentElement.style.setProperty('--my', e.clientY + 'px') }
    window.addEventListener('pointermove', m)
    return () => window.removeEventListener('pointermove', m)
  }, [])
  return (<><div className="glow" /><Nav /><main><Hero /><Skills /><Timeline /><Projects /><Contact /></main></>)
}
