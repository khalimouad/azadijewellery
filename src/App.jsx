import { useEffect, useMemo, useState } from 'react';
import { ArrowDownRight, ArrowRight, ArrowUpRight, Check, Gem, Menu, Sparkles, X } from 'lucide-react';

const pieces = [
  { id: 'full-set', name: 'The full set', category: 'Sets', detail: '18K gold · earrings, necklace & bracelet', image: '/images/full-set-fs8018.webp', note: 'A coordinated jewellery set from Azadi’s original collection.' },
  { id: 'half-set', name: 'The half set', category: 'Sets', detail: '18K gold · a considered pairing', image: '/images/half-set-hs7020.webp', note: 'A versatile half set, chosen for the pieces you will reach for again.' },
  { id: 'long-chain', name: 'Long chain', category: 'Chains', detail: '18K gold · long chain', image: '/images/long-chain-lch6007.webp', note: 'A classic long chain from Azadi’s jewellery range.' },
  { id: 'pendant', name: 'Gold pendant', category: 'Pendants', detail: '18K gold · pendant', image: '/images/pendant-7.32g.webp', note: 'A gold pendant presented in Azadi’s original product photography.' },
  { id: 'earrings', name: 'Gold earrings', category: 'Earrings', detail: 'Fine jewellery · earrings', image: '/images/earring-er5031.webp', note: 'Discover the detail and finish in person at the showroom.' },
  { id: 'necklace', name: 'Gold necklace', category: 'Necklaces', detail: '18K gold · necklace', image: '/images/chain-necklace-43.89g.webp', note: 'An elegant necklace from Azadi’s wholesale collection.' },
];
const categories = ['All pieces', 'Sets', 'Chains', 'Pendants', 'Earrings', 'Necklaces'];

function Mark({ light = false }) {
  return <span className={`mark${light ? ' mark-light' : ''}`} aria-hidden="true"><svg viewBox="0 0 48 48" fill="none"><path d="M24 3.5 28.1 17l13.3-5.7-8.5 11.8 11.6 8.7-14.5-.2L24 45l-5.9-13.4-14.5.2 11.6-8.7-8.5-11.8L20 17 24 3.5Z"/><path d="M24 14.3 31.8 34H16.2L24 14.3Z"/><circle cx="24" cy="25" r="2.1" fill="currentColor"/></svg></span>;
}
function Logo({ footer = false }) { return <a className={`brand${footer ? ' brand-footer' : ''}`} href="#top" aria-label="Azadi Jewellery home"><Mark /><span><strong>AZADI</strong><small>JEWELLERY · DUBAI</small></span></a>; }

export default function App() {
  const [filter, setFilter] = useState('All pieces');
  const [active, setActive] = useState(null);
  const [shortlist, setShortlist] = useState([]);
  const [menu, setMenu] = useState(false);
  const visible = useMemo(() => filter === 'All pieces' ? pieces : pieces.filter((p) => p.category === filter), [filter]);

  useEffect(() => {
    const items = document.querySelectorAll('.reveal');
    if (!('IntersectionObserver' in window)) { items.forEach((item) => item.classList.add('is-visible')); return; }
    const observer = new IntersectionObserver((entries) => entries.forEach((entry) => { if (entry.isIntersecting) { entry.target.classList.add('is-visible'); observer.unobserve(entry.target); } }), { threshold: 0.12 });
    items.forEach((item) => observer.observe(item));
    return () => observer.disconnect();
  }, [filter]);
  useEffect(() => { const close = (event) => { if (event.key === 'Escape') { setActive(null); setMenu(false); } }; window.addEventListener('keydown', close); return () => window.removeEventListener('keydown', close); }, []);
  const toggle = (id) => setShortlist((items) => items.includes(id) ? items.filter((item) => item !== id) : [...items, id]);

  return <>
    <div className="topline"><span className="topline-dot" /> A century of jewellery heritage <i>·</i> The Gold Centre, Dubai</div>
    <header className="header" id="top"><Logo /><nav className={menu ? 'nav nav-open' : 'nav'} aria-label="Main navigation"><a href="#collections" onClick={() => setMenu(false)}>Collections</a><a href="#story" onClick={() => setMenu(false)}>Our story</a><a href="#service" onClick={() => setMenu(false)}>The Azadi experience</a><a className="nav-cta" href="#visit" onClick={() => setMenu(false)}>Visit the showroom <ArrowUpRight size={15} /></a></nav><button className="menu-button" onClick={() => setMenu(!menu)} aria-label={menu ? 'Close menu' : 'Open menu'}>{menu ? <X /> : <Menu />}</button></header>

    <main>
      <section className="hero" aria-labelledby="hero-title"><div className="hero-glow glow-a"/><div className="hero-glow glow-b"/><div className="hero-copy"><div className="eyebrow"><span/> THE ART OF GOLD, SINCE 1922</div><h1 id="hero-title">A heritage<br/>that <em>shines</em><br/>forward.</h1><p>Discover gold jewellery with a story behind every detail. Explore the Azadi collection and find your next favourite piece.</p><div className="hero-actions"><a className="button button-gold" href="#collections">Explore the collection <ArrowUpRight size={16}/></a><a className="scroll-link" href="#story">Discover Azadi <ArrowDownRight size={16}/></a></div><div className="hero-proof"><span className="proof-icon"><Gem size={16}/></span><span><b>A family jewellery legacy</b><small>Crafted for generations, chosen for you</small></span></div></div>
        <div className="hero-art"><div className="hero-image-frame"><img src="/images/azadi-about-42.webp" alt="Azadi jewellery campaign with gold jewellery"/><div className="hero-image-fade"/></div><div className="hero-ring ring-one"/><div className="hero-ring ring-two"/><div className="hero-chip"><Mark light/><span>GOLD<br/>IN EVERY<br/>DETAIL</span></div><div className="hero-caption"><span>THE AZADI COLLECTION</span><b>01 <i/> 06</b></div></div>
        <a className="hero-bottom" href="#story"><span>SCROLL TO EXPLORE</span><span className="bottom-line"/><span>DUBAI · UAE</span></a>
      </section>

      <section className="story section-wrap reveal" id="story"><div className="section-label"><span>01</span><i/> A LEGACY OF GOLD</div><div className="story-grid"><h2>Made to be<br/><em>remembered.</em></h2><div className="story-copy"><p className="story-lead">For generations, the Azadi name has been part of life’s most meaningful moments.</p><p>From everyday favourites to pieces worn for a lifetime, our collection celebrates the beauty of gold and the feeling of finding just the right piece.</p><a href="#visit" className="inline-link">Discover the Azadi story <ArrowRight size={16}/></a></div></div><div className="story-orb"><Mark/></div></section>

      <section className="collection section-wrap" id="collections"><div className="collection-head reveal"><div><div className="section-label"><span>02</span><i/> THE COLLECTION</div><h2>Find your <em>gold.</em></h2></div><p>Explore selected pieces photographed for the original Azadi Jewellery website. Choose a category to begin.</p></div><div className="filters" role="group" aria-label="Filter jewellery collection">{categories.map((category) => <button key={category} className={filter === category ? 'filter filter-active' : 'filter'} onClick={() => setFilter(category)} aria-pressed={filter === category}>{category}{filter === category && <span>{String(visible.length).padStart(2,'0')}</span>}</button>)}</div><div className="product-grid" aria-live="polite">{visible.map((piece,index) => <article key={piece.id} className={`product-card reveal delay-${index%3}`}><button className="product-photo" onClick={() => setActive(piece)} aria-label={`View ${piece.name}`}><img src={piece.image} alt={`${piece.detail}, Azadi Jewellery original product photo`} loading={index > 2 ? 'lazy' : 'eager'}/><span className="photo-overlay"><span>View piece <ArrowUpRight size={15}/></span></span><span className="photo-tag">{piece.category}</span></button><div className="product-info"><div><span>{piece.detail}</span><h3>{piece.name}</h3></div><button className={shortlist.includes(piece.id) ? 'save saved' : 'save'} onClick={() => toggle(piece.id)} aria-label={`${shortlist.includes(piece.id) ? 'Remove' : 'Add'} ${piece.name} ${shortlist.includes(piece.id) ? 'from' : 'to'} your shortlist`}>{shortlist.includes(piece.id) ? <Check size={17}/> : <Sparkles size={17}/>}</button></div></article>)}</div><p className="shortlist-message" aria-live="polite">{shortlist.length ? <><Check size={15}/> {shortlist.length} {shortlist.length === 1 ? 'piece' : 'pieces'} saved for your showroom visit.</> : 'Save a favourite and bring your shortlist when you visit.'}</p></section>

      <section className="service" id="service"><div className="service-photo reveal"><img src="/images/azadi-about-01.webp" alt="Azadi jewellery set campaign from the original website" loading="lazy"/><span className="image-note">A CLOSER LOOK AT THE DETAIL <i>✦</i></span></div><div className="service-copy reveal"><div className="section-label"><span>03</span><i/> A PERSONAL EXPERIENCE</div><h2>Every detail<br/>deserves a <em>hello.</em></h2><p className="service-intro">Great jewellery feels even more special when the service feels personal.</p><div className="service-list"><div><span>01</span><p><b>Tell us what matters</b><small>Occasion, style and the details you love.</small></p><Gem size={18}/></div><div><span>02</span><p><b>Explore with confidence</b><small>Take time to compare and ask questions.</small></p><Gem size={18}/></div><div><span>03</span><p><b>Leave with your favourite</b><small>Find a piece you’ll be happy to wear.</small></p><Gem size={18}/></div></div><a href="#visit" className="inline-link">Come and see us <ArrowRight size={16}/></a></div></section>

      <section className="feature reveal"><div className="feature-photo"><img src="/images/half-set-hs7020.webp" alt="18K gold half set from Azadi Jewellery" loading="lazy"/></div><div className="feature-content"><div className="eyebrow"><span/> A CENTURY OF CRAFT</div><h2>Gold with<br/><em>a point of view.</em></h2><p>Explore the Azadi range of 10K, 14K, 18K and 22K gold jewellery in yellow, white and rose gold.</p><a className="button button-light" href="#collections">Browse the collection <ArrowUpRight size={16}/></a></div><div className="feature-glow"/></section>

      <section className="visit section-wrap" id="visit"><div className="visit-copy"><div className="section-label"><span>04</span><i/> VISIT AZADI</div><h2>Let's find<br/><em>your piece.</em></h2><p>Step into our Dubai showroom, explore the collection and let our team help you find the right fit.</p><a className="button button-gold" href="https://wa.me/971547065080" target="_blank" rel="noreferrer">Talk to our team <ArrowUpRight size={16}/></a></div><div className="visit-card"><div className="visit-top"><span className="visit-mark"><Mark/></span><span>DUBAI · UNITED ARAB EMIRATES</span></div><h3>The Gold Center</h3><p>Mezzanine Floor, Shops M-23–27<br/>Al Ras, Dubai, UAE</p><div className="visit-divider"/><a href="tel:+97142202021">+971 4 220 2021 <ArrowUpRight size={14}/></a><a href="https://wa.me/971547065080" target="_blank" rel="noreferrer">WhatsApp <ArrowUpRight size={14}/></a><a href="mailto:sales@azadijewellery.com">sales@azadijewellery.com <ArrowUpRight size={14}/></a></div></section>
    </main>
    <footer className="footer"><Logo footer/><p>GOLD, WITH A POINT OF VIEW.</p><a href="#top" className="back-top" aria-label="Back to top">↑</a></footer><div className="disclaimer">Independent digital showroom concept · Original Azadi Jewellery product photography · 2026</div>

    {active && <div className="modal-backdrop" onClick={() => setActive(null)} role="presentation"><section className="modal" role="dialog" aria-modal="true" aria-labelledby="modal-title" onClick={(e) => e.stopPropagation()}><button className="modal-close" onClick={() => setActive(null)} aria-label="Close"><X/></button><div className="modal-photo"><img src={active.image} alt={active.detail}/></div><div className="modal-content"><span className="section-label"><i/> {active.category.toUpperCase()}</span><h2 id="modal-title">{active.name}</h2><p>{active.note}</p><p className="modal-detail">{active.detail}</p><a className="button button-gold" href="https://wa.me/971547065080" target="_blank" rel="noreferrer">Ask about this piece <ArrowUpRight size={16}/></a></div></section></div>}
  </>;
}
