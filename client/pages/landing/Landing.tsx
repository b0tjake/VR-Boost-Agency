import { useEffect, useMemo, useState } from "react";
import { ArrowRight, Menu, Play, X } from "lucide-react";
import "./landing.css";

const images = {
  hero:
    "https://api.builder.io/api/v1/image/assets/TEMP/49dd96ddcd91b3295c6ae0adf022b4909dcfb9e8?width=1600",
  room:
    "https://api.builder.io/api/v1/image/assets/TEMP/b790c4629cffb0c8f5a4f55d52bb3b358d0031ea?width=520",
  hub:
    "https://api.builder.io/api/v1/image/assets/TEMP/a55590721e3b8a09945db9b844ba170ea01c82d9?width=434",
  avatar:
    "https://api.builder.io/api/v1/image/assets/TEMP/015d1ee0b827977602b52af695ac3d845f7c9fe9?width=180",
  staging:
    "https://api.builder.io/api/v1/image/assets/TEMP/b0bfce56a3b0ab6a6bda3c8fe55e8c40ed3cf9ca?width=520",
  developer:
    "https://api.builder.io/api/v1/image/assets/TEMP/d126d6d1ccd49fd7ecb34ad96e760bcae9beeaf8?width=520",
  furniture:
    "https://api.builder.io/api/v1/image/assets/TEMP/997772d1a495a730e126264ad225f30dd2abe535?width=520",
};

const navItems = [
  { label: "Concept", href: "#value" },
  { label: "Métiers", href: "#targets" },
  { label: "Impact", href: "#metrics" },
  { label: "Démo", href: "#cta" },
];

const values = [
  {
    title: "Home Staging 3D",
    image: images.room,
    description:
      "Transformez n'importe quel espace vide ou daté en intérieur désirable en quelques clics, avec un rendu ultraréaliste.",
  },
  {
    title: "Hub collaboratif",
    image: images.hub,
    description:
      "Centralisez vos projets, vos contenus et vos équipes dans un espace sécurisé et intuitif, accessible partout.",
  },
  {
    title: "Avatar intelligent",
    image: images.avatar,
    description:
      "Un assistant virtuel qui guide, conseille et engage vos clients à chaque étape de leur projet, 24h/24.",
  },
];

const targets = [
  {
    title: "Enseignes de mobilier",
    image: images.furniture,
    points: [
      "Inspirez vos clients avec des mises en scène réalistes de vos produits.",
      "Augmentez l'engagement et les conversions en magasin et en ligne.",
      "Réduisez les retours grâce à une projection plus claire.",
    ],
  },
  {
    title: "Agences immobilières",
    image: images.staging,
    points: [
      "Sublimez vos biens et vendez plus vite.",
      "Démarquez-vous avec des visuels professionnels et impactants.",
      "Offrez une expérience client moderne et mémorable.",
    ],
  },
  {
    title: "Promoteurs immobiliers",
    image: images.developer,
    points: [
      "Valorisez vos programmes avant même leur réalisation.",
      "Aidez vos clients à se projeter et à se décider plus rapidement.",
      "Accélérez la commercialisation et sécurisez vos préventes.",
    ],
  },
];

const metrics = [
  {
    value: "-50%",
    label: "de temps de mise en commercialisation",
    image: images.room,
  },
  {
    value: "+35%",
    label: "de taux de projection des clients",
    image: images.staging,
  },
  {
    value: "+27%",
    label: "de ventes conclues plus rapidement",
    image: images.furniture,
  },
  {
    value: "100%",
    label: "personnalisable à votre image de marque",
    image: images.avatar,
  },
];

function useLandingEffects() {
  useEffect(() => {
    const revealItems = Array.from(document.querySelectorAll(".landing-reveal"));
    const revealObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
            revealObserver.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.12, rootMargin: "0px 0px -40px 0px" },
    );

    revealItems.forEach((item) => revealObserver.observe(item));

    return () => revealObserver.disconnect();
  }, []);
}

function Navbar() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header className={`landing-nav${scrolled ? " is-scrolled" : ""}`}>
      <a className="landing-brand" href="#top" aria-label="VRBoost accueil">
        <img src={images.avatar} alt="" className="landing-brand__mark" />
        <span>
          <strong>VRBoost</strong>
          <small>Home Staging Hub & Avatar</small>
        </span>
      </a>

      <nav className="landing-nav__links" aria-label="Navigation principale">
        {navItems.map((item) => (
          <a key={item.href} href={item.href}>
            {item.label}
          </a>
        ))}
      </nav>

      <div className="landing-nav__actions">
        <a className="landing-btn landing-btn--ghost" href="/dashboard">
          Connexion
        </a>
        <a className="landing-btn landing-btn--dark" href="#cta">
          Demander une démo
        </a>
      </div>

      <button
        className="landing-menu"
        type="button"
        aria-label={open ? "Fermer le menu" : "Ouvrir le menu"}
        onClick={() => setOpen((value) => !value)}
      >
        {open ? <X size={21} /> : <Menu size={21} />}
      </button>

      {open && (
        <div className="landing-mobile-menu">
          {navItems.map((item) => (
            <a key={item.href} href={item.href} onClick={() => setOpen(false)}>
              {item.label}
            </a>
          ))}
          <a href="/dashboard" onClick={() => setOpen(false)}>
            Connexion
          </a>
        </div>
      )}
    </header>
  );
}

function Hero() {
  return (
    <section className="landing-hero" id="top">
      <div className="landing-hero__content">
        <p className="landing-eyebrow">
          <span />
          Nouvelle expérience immobilière
        </p>
        <h1>
          Home Staging <span>Hub & Avatar</span>
        </h1>
        <p>
          Créez des visites visuelles, présentez vos biens avec des rendus
          immersifs et accompagnez chaque client avec un assistant intelligent.
        </p>
        <div className="landing-hero__actions">
          <a className="landing-btn landing-btn--gold" href="#cta">
            Demander une démo
            <ArrowRight size={17} />
          </a>
          <a className="landing-btn landing-btn--ghost landing-btn--wide" href="#value">
            <Play size={16} />
            Découvrir la solution
          </a>
        </div>
        <div className="landing-pillars" role="list">
          {["Visualisation 3D", "Personnalisation", "Expérience client"].map(
            (label, index) => (
              <div className="landing-pillar" role="listitem" key={label}>
                <img src={[images.room, images.staging, images.avatar][index]} alt="" />
                <span>{label}</span>
              </div>
            ),
          )}
        </div>
      </div>

      <div className="landing-hero__visual" aria-label="Aperçu de home staging">
        <img src={images.hero} alt="Intérieur moderne aménagé en 3D" />
        <div className="landing-float landing-float--projects">
          <strong>Hub · Mes projets</strong>
          <div>
            {[images.room, images.staging, images.developer].map((image) => (
              <img src={image} alt="" key={image} />
            ))}
          </div>
        </div>
        <div className="landing-float landing-float--avatar">
          <img src={images.avatar} alt="" />
          <p>Bonjour ! Comment puis-je vous aider à aménager cet espace ?</p>
        </div>
        <div className="landing-float landing-float--transform">
          <span>Transformation</span>
          <div>
            <img src={images.staging} alt="" />
            <img src={images.room} alt="" />
          </div>
        </div>
      </div>
    </section>
  );
}

function SectionHeader({
  eyebrow,
  title,
  description,
}: {
  eyebrow: string;
  title: string;
  description: string;
}) {
  return (
    <div className="landing-section-header landing-reveal">
      <p className="landing-eyebrow landing-eyebrow--center">{eyebrow}</p>
      <h2>{title}</h2>
      <p>{description}</p>
    </div>
  );
}

function ValueSection() {
  return (
    <section className="landing-section landing-section--white" id="value">
      <div className="landing-container">
        <SectionHeader
          eyebrow="Le concept"
          title="Une expérience, trois puissances."
          description="Home Staging + Hub & Avatar combine la puissance de la 3D, la simplicité d'un hub collaboratif et l'intelligence d'un avatar pour réinventer la façon de concevoir, présenter et vendre des espaces."
        />
        <div className="landing-value-grid">
          {values.map((value, index) => (
            <article
              className="landing-value-card landing-reveal"
              style={{ transitionDelay: `${index * 90}ms` }}
              key={value.title}
            >
              <img src={value.image} alt="" className="landing-card-icon" />
              <h3>{value.title}</h3>
              <p>{value.description}</p>
              <img src={value.image} alt={value.title} className="landing-card-image" />
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

function TargetsSection() {
  return (
    <section className="landing-section" id="targets">
      <div className="landing-container">
        <SectionHeader
          eyebrow="Pour qui ?"
          title="Une valeur concrète pour chaque acteur de l'immobilier"
          description="Que vous vendiez des meubles, des biens ou des programmes, VRBoost s'adapte à votre métier."
        />
        <div className="landing-targets-grid">
          {targets.map((target, index) => (
            <article
              className="landing-target-card landing-reveal"
              style={{ transitionDelay: `${index * 90}ms` }}
              key={target.title}
            >
              <img src={target.image} alt={target.title} />
              <div>
                <h3>{target.title}</h3>
                <ul>
                  {target.points.map((point) => (
                    <li key={point}>{point}</li>
                  ))}
                </ul>
                <a href="#cta">
                  En savoir plus
                  <ArrowRight size={16} />
                </a>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

function MetricsSection() {
  const metricCells = useMemo(() => metrics, []);

  return (
    <section className="landing-section landing-metrics" id="metrics">
      <div className="landing-container">
        <SectionHeader
          eyebrow="Impact mesuré"
          title="Moins de temps. Plus d'impact. Plus de ventes."
          description="Rejoignez les professionnels qui transforment leurs espaces en succès."
        />
        <div className="landing-metrics-grid landing-reveal">
          {metricCells.map((metric) => (
            <article className="landing-metric-cell" key={metric.label}>
              <img src={metric.image} alt="" />
              <strong>{metric.value}</strong>
              <span>{metric.label}</span>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

function CtaSection() {
  return (
    <section className="landing-cta" id="cta">
      <div className="landing-container">
        <div className="landing-cta__inner landing-reveal">
          <div>
            <p className="landing-eyebrow">Prêt à transformer votre approche ?</p>
            <h2>
              Moins de temps.
              <br />
              <em>Plus d'impact.</em>
              <br />
              Plus de ventes.
            </h2>
            <p>
              Rejoignez les professionnels qui font confiance à Home Staging Hub
              & Avatar pour présenter, vendre et marquer les esprits.
            </p>
          </div>
          <form className="landing-cta__form">
            <input type="text" placeholder="Votre prénom et nom" autoComplete="name" />
            <input type="email" placeholder="Votre adresse e-mail" autoComplete="email" />
            <input type="text" placeholder="Votre entreprise" autoComplete="organization" />
            <button type="submit">
              Demander une démo
              <ArrowRight size={17} />
            </button>
            <small>Sans engagement · Réponse sous 24h · 100% gratuit</small>
          </form>
        </div>
      </div>
    </section>
  );
}

function Footer() {
  return (
    <footer className="landing-footer">
      <div className="landing-container">
        <span>© 2026 Home Staging Hub & Avatar · Tous droits réservés</span>
        <nav aria-label="Liens du pied de page">
          <a href="#top">Accueil</a>
          <a href="#cta">Contact</a>
          <a href="/dashboard">Connexion</a>
        </nav>
      </div>
    </footer>
  );
}

export default function Landing() {
  useLandingEffects();

  return (
    <main className="landing-page">
      <Navbar />
      <Hero />
      <ValueSection />
      <TargetsSection />
      <MetricsSection />
      <CtaSection />
      <Footer />
    </main>
  );
}
