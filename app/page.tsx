const galleryItems = [
  {
    label: 'Condition Swap',
    note: 'Temporary HY-WM1.5 sample',
    video: '/media/hyworld15-example-01.mp4',
    tone: 'amber',
  },
  {
    label: 'Full Rollback',
    note: 'Temporary HY-WM1.5 sample',
    video: '/media/hyworld15-example-02.mp4',
    tone: 'coral',
  },
  {
    label: 'CST_R',
    note: 'Final retargeting result reserved',
    video: null,
    tone: 'blue',
  },
  {
    label: 'CST_T',
    note: 'Final temporal transport result reserved',
    video: null,
    tone: 'cyan',
  },
] as const;

function ControlHud() {
  return (
    <div className="control-hud" aria-hidden="true">
      <div className="key-cluster">
        <span className="key key-w">W</span>
        <span className="key">A</span>
        <span className="key">S</span>
        <span className="key">D</span>
      </div>
      <div className="direction-ring">
        <span className="dir up">↑</span>
        <span className="dir left">←</span>
        <span className="dir right">→</span>
        <span className="dir down">↓</span>
        <span className="dir-center" />
      </div>
    </div>
  );
}

function GalleryCard({ item }: { item: (typeof galleryItems)[number] }) {
  return (
    <article className={`gallery-card tone-${item.tone}`}>
      <div className="media-frame">
        {item.video ? (
          <video autoPlay loop muted playsInline preload="metadata">
            <source src={item.video} type="video/mp4" />
          </video>
        ) : (
          <div className="media-placeholder">
            <div className="latent-field" />
            <strong>{item.label}</strong>
            <span>Final video pending</span>
          </div>
        )}
        <div className="media-topline">
          <span>{item.label}</span>
          <span>r = 2</span>
        </div>
        <ControlHud />
      </div>
      <div className="card-caption">
        <div>
          <strong>{item.label}</strong>
          <p>{item.note}</p>
        </div>
        <span className="sample-state">{item.video ? 'FILLER' : 'RESERVED'}</span>
      </div>
    </article>
  );
}

export default function Home() {
  return (
    <main>
      <nav className="site-nav" aria-label="Primary navigation">
        <a className="brand" href="#top" aria-label="ActionSplice home">
          <span className="brand-mark">A</span>
          <span>ActionSplice</span>
        </a>
        <div className="nav-links">
          <a href="#method">Method</a>
          <a href="#gallery">Gallery</a>
        </div>
        <span className="internal-badge">Internal preview</span>
      </nav>

      <section className="hero" id="top">
        <div className="hero-copy">
          <div className="hero-meta">
            <time dateTime="2026-08-25">August 25, 2026</time>
            <span>World Models</span>
          </div>
          <h1>
            <span className="hero-title-detail">ActionSplice: In-Flight Action Editing</span>
            <span>for Interactive World Models</span>
          </h1>
          <p className="hero-authors">
            Pardis Taghavi, Tingyu Guo, Jonas Lossner, Gaurav Pandey, Reza Langari
          </p>
          <p className="hero-affiliation">Texas A&amp;M University</p>
          <div className="hero-actions" aria-label="Research resources">
            <span className="resource-placeholder" aria-disabled="true">
              <span>arXiv</span>
              <small>Coming soon</small>
            </span>
            <a
              className="resource-placeholder resource-link"
              href="https://huggingface.co/PardisTaghavi/ActionSplice/tree/main"
              target="_blank"
              rel="noreferrer"
            >
              <span>Checkpoints</span>
              <small>Hugging Face ↗</small>
            </a>
            <span className="resource-placeholder" aria-disabled="true">
              <span>Code</span>
              <small>Coming soon</small>
            </span>
          </div>
        </div>

        <div className="hero-media" aria-label="Temporary HY-WM1.5 video sample">
          <video autoPlay loop muted playsInline preload="auto">
            <source src="/media/hyworld15-example-01.mp4" type="video/mp4" />
          </video>
          <div className="hero-media-shade" />
          <div className="hero-media-label">
            <span className="live-dot" />
            Temporary HY-WM1.5 sample
          </div>
          <div className="action-switch">
            <div>
              <span>OLD ACTION</span>
              <strong>Forward</strong>
            </div>
            <span className="switch-arrow">→</span>
            <div>
              <span>REQUEST</span>
              <strong>Yaw left</strong>
            </div>
          </div>
          <ControlHud />
        </div>

        <div className="metric-strip" aria-label="Preliminary minWM measurements">
          <div><strong>24.9%</strong><span>lower response-ready latency</span></div>
          <div><strong>43.1%</strong><span>less post-request compute</span></div>
          <div><strong>0</strong><span>discarded denoising evaluations</span></div>
          <p>Preliminary minWM · K = 4 · r = 2</p>
        </div>
      </section>

      <section className="method-band" id="method">
        <div className="method-intro">
          <p className="section-index">01 / Method</p>
          <h2>Transport the state. Keep the model frozen.</h2>
          <p>
            CST edits the model-specific clean prediction, reconstructs the
            exact scheduler-consistent state, and resumes ordinary denoising.
          </p>
        </div>
        <div className="method-flow">
          {[
            ['01', 'Interrupt', 'Capture the old-action active state.'],
            ['02', 'Transport', 'Predict the matched clean-state correction.'],
            ['03', 'Reconstruct', 'Apply the native scheduler realization.'],
            ['04', 'Resume', 'Execute only the remaining frozen-model NFEs.'],
          ].map(([index, title, body], position) => (
            <div className="method-step" key={title}>
              <span>{index}</span>
              <strong>{title}</strong>
              <p>{body}</p>
              {position < 3 && <i aria-hidden="true">→</i>}
            </div>
          ))}
        </div>
      </section>

      <section className="section gallery-section" id="gallery">
        <div className="section-heading gallery-heading">
          <div>
            <p className="section-index">02 / Comparisons</p>
            <h2>Action response, side by side.</h2>
          </div>
          <p>
            Temporary clips establish the layout. Final synchronized outputs
            will use matched scene, seed, action, and request time.
          </p>
        </div>
        <div className="gallery-grid">
          {galleryItems.map((item) => <GalleryCard item={item} key={item.label} />)}
        </div>

        <article className="runtime-card">
          <div className="runtime-copy">
            <span className="sample-state">TEMPORARY TRACE</span>
            <h3>Receipt-step runtime view</h3>
            <p>Forward → yaw left · prompt 03 · request after NFE 1.</p>
          </div>
          <div className="runtime-media">
            <video autoPlay loop muted playsInline preload="metadata">
              <source src="/media/minwm-runtime.mp4" type="video/mp4" />
            </video>
          </div>
        </article>
      </section>

      <footer>
        <strong>ActionSplice</strong>
        <p>In-Flight Action Editing for Interactive World Models</p>
        <span>Internal research preview · 2026</span>
      </footer>
    </main>
  );
}
