import { useEffect, useMemo, useState } from 'react';
import { ArrowDown, ArrowUpRight, Check, Gem, Menu, MoveRight, Sparkles, X } from 'lucide-react';

const pieces = [
  { id: 'ruby-light', name: 'Ruby light', category: 'Statement', kind: 'Earrings', image: '/images/hero-earrings.webp', note: 'A confident finishing touch, designed to catch the light.' },
  { id: 'gold-in-motion', name: 'Gold in motion', category: 'Everyday', kind: 'Bangles', image: '/images/gold-bangles.webp', note: 'Sculptural gold with a hint of colour and a little movement.' },
  { id: 'the-keepsake', name: 'The keepsake', category: 'Everyday', kind: 'Necklaces', image: '/images/ruby-pendant.webp', note: 'An easy layer with a ruby detail worth remembering.' },
];

function AzadiMark({ light = false }) {
  return <span className={`azadi-mark ${light ? 'mark-light' : ''}`} aria-hidden="true"><svg viewBox="0 0 48 48" fill="none"><path d="M24 3.5 28.1 17l13.3-5.7-8.5 11.8 11.6 8.7-14.5-.2L24 45l-5.9-13.4-14.5.2 11.6-8.7-8.5-11.8L20 17 24 3.5Z" stroke="currentColor" strokeWidth="1.2"/><path d="M24 14.3 31.8 34H16.2L24 14.3Z" stroke="currentColor" strokeWidth="1.2"/><circle cx="24" cy="25" r="2.1" fill="currentColor"/></svg></span>;
}

function Logo({ compact = false }) {
  return <a className={`brand ${compact ? 'brand-compact' : ''}`} href="#top" aria-label="Azadi Jewellery home"><AzadiMark /><span className="brand-wordmark"><strong>AZADI</strong><small>JEWELLERY</small></span></a>;
}

function App() {
  const [activeFilter, setActiveFilter] = useState('All pieces');
  const [activePiece, setActivePiece] = useState(null);
  const [menuOpen, setMenuOpen] = useState(false);
  const [saved, setSaved] = useState([]);
  const visiblePieces = useMemo(() => activeFilter === 'All pieces' ? pieces : pieces.filter((piece) => piece.category === activeFilter), [activeFilter]);

  useEffect(() => {
    const observer = new IntersectionObserver((entries) => entries.forEach((entry) => { if (entry.isIntersecting) { entry.target.classList.add('is-visible'); observer.unobserve(entry.target); } }), { threshold: 0.13 });
    document.querySelectorAll('.reveal').forEach((element) => observer.observe(element));
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const onKey = (event) => { if (event.key === 'Escape') { setActivePiece(null); setMenuOpen(false); } };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, []);

  function toggleSaved(id) { setSaved((current) => current.includes(id) ? current.filter((item) => item !== id) : [...current, id]); }
  function closeMenu() { setMenuOpen(false); }

  return <>
    <div className="concept-note"><span className="note-star">✦</span> A digital showroom concept for Kazem Azadi Jewellery Trading LLC</div>
    <header className="site-header" id="top">
      <Logo />
      <nav className={menuOpen ? 'nav-open' : ''} aria-label="Main navigation">
        <a href="#collections" onClick={closeMenu}>Collections</a><a href="#experience" onClick={closeMenu}>The experience</a><a href="#story" onClick={closeMenu}>Our point of view</a>
        <a className="nav-visit" href="#visit" onClick={closeMenu}>Visit the showroom <ArrowUpRight size={15} /></a>
      </nav>
      <button className="menu-toggle" aria-label={menuOpen ? 'Close menu' : 'Open menu'} onClick={() => setMenuOpen(!menuOpen)}>{menuOpen ? <X /> : <Menu />}</button>
    </header>

    <main>
      <section className="hero" aria-labelledby="hero-title">
        <div className="hero-copy">
          <div className="eyebrow"><span></span> GOLD, WITH A POINT OF VIEW</div>
          <h1 id="hero-title">A little more<br /><em>you</em> in every<br />gold moment.</h1>
          <p>Jewellery is personal. Discover pieces that feel like you, with a showroom experience built around listening first.</p>
          <div className="hero-actions"><a href="#collections" className="button button-gold">Explore the edit <ArrowUpRight size={16} /></a><a href="#experience" className="text-link">See how we help <ArrowDown size={14} /></a></div>
          <div className="hero-footnote"><span className="fine-line"></span><span>Fine jewellery. Thoughtful service.<br />Your story, always in focus.</span></div>
        </div>
        <div className="hero-visual">
          <div className="hero-photo-wrap"><img src="/images/hero-earrings.webp" alt="Editorial portrait featuring sculptural gold and ruby earrings" className="hero-photo" /><div className="photo-shade"></div></div>
          <div className="hero-orbit orbit-one"></div><div className="hero-orbit orbit-two"></div>
          <div className="hero-stamp"><AzadiMark light /><span>MADE FOR<br />YOUR MOMENT</span></div>
          <div className="vertical-caption">A NEW WAY TO DISCOVER GOLD <span>✦</span> DUBAI</div>
          <div className="hero-image-index"><b>01</b><span></span><span>03</span></div>
        </div>
        <div className="hero-bottomline"><span>SCROLL TO DISCOVER</span><div></div><span>EST. IN DUBAI · A CONCEPT</span></div>
      </section>

      <section className="intro section-pad reveal" id="story">
        <div className="section-kicker"><span>01</span><i></i> A MORE PERSONAL POINT OF VIEW</div>
        <div className="intro-layout"><h2>Good service<br />is <em>an art.</em></h2><div className="intro-copy"><p className="intro-lead">The best jewellery conversation starts with a question, not a sales pitch.</p><p>What are you celebrating? What do you already love wearing? We imagine a showroom where every detail helps people feel seen, confident and excited to find the piece that fits.</p><a href="#experience" className="underlined-link">Meet the Azadi experience <MoveRight size={16} /></a></div></div>
        <div className="intro-orbit"><AzadiMark /></div>
      </section>

      <section className="collections section-pad" id="collections">
        <div className="collection-heading reveal"><div><div className="section-kicker"><span>02</span><i></i> THE AZADI EDIT</div><h2>Find your <em>feeling.</em></h2></div><p>Explore a few directions for a more considered digital collection. Each piece deserves the right story, and a little room to shine.</p></div>
        <div className="filter-row" role="group" aria-label="Filter collection">
          {['All pieces', 'Everyday', 'Statement'].map((filter) => <button key={filter} className={activeFilter === filter ? 'filter active' : 'filter'} onClick={() => setActiveFilter(filter)} aria-pressed={activeFilter === filter}>{filter}<span>{filter === 'All pieces' ? '03' : filter === 'Everyday' ? '02' : '01'}</span></button>)}
          <span className="collection-count">{String(visiblePieces.length).padStart(2, '0')} PIECES</span>
        </div>
        <div className="product-grid" aria-live="polite">
          {visiblePieces.map((piece, index) => <article className={`product-card reveal card-delay-${index}`} key={piece.id}>
            <button className="product-image-button" onClick={() => setActivePiece(piece)} aria-label={`Explore ${piece.name}`}><img src={piece.image} alt={`${piece.kind} from the Azadi concept collection`} /><span className="image-quick">View the story <ArrowUpRight size={15} /></span><span className="product-number">0{pieces.findIndex((x) => x.id === piece.id) + 1}</span></button>
            <div className="product-meta"><div><span className="product-kind">{piece.kind} <i>·</i> {piece.category}</span><h3>{piece.name}</h3></div><button className={saved.includes(piece.id) ? 'save-piece saved' : 'save-piece'} onClick={() => toggleSaved(piece.id)} aria-label={saved.includes(piece.id) ? `Remove ${piece.name} from shortlist` : `Add ${piece.name} to shortlist`}>{saved.includes(piece.id) ? <Check size={17} /> : <Sparkles size={17} />}</button></div>
          </article>)}
        </div>
        <div className="shortlist-note" aria-live="polite">{saved.length > 0 ? <><Check size={15} /> {saved.length} {saved.length === 1 ? 'piece' : 'pieces'} on your shortlist. A stylist can help you compare them.</> : <><Sparkles size={15} /> Tap the sparkle to start a shortlist for your visit.</>}</div>
      </section>

      <section className="experience section-pad" id="experience">
        <div className="experience-image reveal"><img src="/images/gold-bangles.webp" alt="Gold bangles with gemstone accents on velvet" /><div className="experience-image-label"><span>THE DETAIL MAKES THE MOMENT</span><span>✦</span></div></div>
        <div className="experience-copy reveal"><div className="section-kicker"><span>03</span><i></i> THE AZADI EXPERIENCE</div><h2>Thoughtful from<br />first <em>hello.</em></h2><p className="experience-intro">Luxury isn't only what you take home. It's how welcome you feel while finding it.</p>
          <div className="service-steps"><div className="service-step"><span>01</span><div><h3>We listen</h3><p>Your style, your occasion, your budget. We'll start with what matters to you.</p></div><Gem size={19} /></div><div className="service-step"><span>02</span><div><h3>We guide</h3><p>Clear product stories and thoughtful suggestions make choosing feel easy.</p></div><Gem size={19} /></div><div className="service-step"><span>03</span><div><h3>We remember</h3><p>Personal follow-up keeps the relationship going after your visit.</p></div><Gem size={19} /></div></div>
          <a href="#visit" className="underlined-link">Let's find your piece <MoveRight size={16} /></a>
        </div>
      </section>

      <section className="story-banner reveal"><div className="banner-image"><img src="/images/ruby-pendant.webp" alt="A delicate gold necklace with a ruby pendant" /></div><div className="banner-content"><span className="banner-overline">A MOMENT TO MAKE YOURS</span><h2>Some pieces<br />just <em>feel right.</em></h2><p>Come in curious. Leave with a story you'll want to wear.</p><a href="#visit" className="button button-light">Plan your visit <ArrowUpRight size={16} /></a></div><div className="banner-emblem"><AzadiMark light /></div></section>

      <section className="visit section-pad" id="visit"><div className="visit-left"><div className="section-kicker"><span>04</span><i></i> COME SAY HELLO</div><h2>Let's make it<br /><em>personal.</em></h2><p>Step into the showroom and tell us what you're looking for. We'll help you find a piece that feels like it was waiting for you.</p><a className="button button-gold" href="tel:+97142202021">Call the showroom <ArrowUpRight size={16} /></a></div><div className="visit-card"><div className="visit-card-top"><div className="visit-icon"><AzadiMark /></div><span>FIND US IN DUBAI</span></div><h3>Azadi Jewellery</h3><p>The Gold Centre<br />Al Ras, Deira<br />Dubai, UAE</p><div className="visit-separator"></div><a href="https://maps.google.com/?q=The+Gold+Centre+Al+Ras+Dubai" target="_blank" rel="noreferrer" className="map-link">Get directions <ArrowUpRight size={15} /></a><a href="tel:+97142202021" className="phone-link">+971 4 220 2021</a><span className="visit-card-foot">A CONCEPT FOR KAZEM AZADI JEWELLERY TRADING LLC</span></div></section>
    </main>

    <footer className="site-footer"><Logo compact /><div className="footer-center"><span>GOLD, WITH A POINT OF VIEW.</span><small>Independent digital retail concept · 2026</small></div><a href="#top" className="back-top" aria-label="Back to top">↑</a></footer>
    <div className="concept-disclaimer">This is an independent concept created to demonstrate a modern digital customer experience. Product photography and collection names are illustrative.</div>

    {activePiece && <div className="modal-backdrop" role="presentation" onClick={() => setActivePiece(null)}><section className="piece-modal" role="dialog" aria-modal="true" aria-labelledby="modal-title" onClick={(event) => event.stopPropagation()}><button className="modal-close" onClick={() => setActivePiece(null)} aria-label="Close details"><X /></button><div className="modal-image"><img src={activePiece.image} alt={`${activePiece.kind} campaign view`} /></div><div className="modal-copy"><span className="product-kind">{activePiece.kind} · {activePiece.category}</span><h2 id="modal-title">{activePiece.name}</h2><p>{activePiece.note}</p><div className="modal-detail"><span>YOUR MOMENT, YOUR WAY</span><span>✦</span></div><a className="button button-gold" href="#visit" onClick={() => setActivePiece(null)}>Ask us about this style <ArrowUpRight size={16} /></a></div></section></div>}
  </>;
}

export default App;
