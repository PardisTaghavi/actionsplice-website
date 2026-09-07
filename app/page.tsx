const comparisonItems = [
  {
    prompt: 'HY-131',
    transition: 'Backward → Yaw left',
    video: '/media/qualitative/hy131-wait-cstr.mp4',
    status: 'SELECTED',
    selected: true,
  },
  {
    prompt: 'HY-130',
    transition: 'Backward → Forward',
    video: '/media/qualitative/hy130-wait-cstr.mp4',
    status: 'CANDIDATE',
    selected: false,
  },
  {
    prompt: 'HY-132',
    transition: 'Forward → Yaw left',
    video: '/media/qualitative/hy132-wait-cstr.mp4',
    status: 'CANDIDATE',
    selected: false,
  },
  {
    prompt: 'HY-142',
    transition: 'Backward → Forward',
    video: '/media/qualitative/hy142-wait-cstr.mp4',
    status: 'CANDIDATE',
    selected: false,
  },
  {
    prompt: 'HY-145',
    transition: 'Forward → Backward',
    video: '/media/qualitative/hy145-wait-cstr.mp4',
    status: 'CANDIDATE',
    selected: false,
  },
  {
    prompt: 'HY-146',
    transition: 'Yaw left → Forward',
    video: '/media/qualitative/hy146-wait-cstr.mp4',
    status: 'CANDIDATE',
    selected: false,
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

function ComparisonCard({ item }: { item: (typeof comparisonItems)[number] }) {
  return (
    <article className={`comparison-card${item.selected ? ' is-selected' : ''}`}>
      <div className="comparison-media">
        <video controls loop muted playsInline preload="metadata" aria-label={`${item.prompt}: Wait above CST-R`}>
          <source src={item.video} type="video/mp4" />
        </video>
      </div>
      <div className="comparison-caption">
        <div>
          <strong>{item.prompt}</strong>
          <p>{item.transition} · r = 2</p>
        </div>
        <span className={`sample-state${item.selected ? ' selected-state' : ''}`}>{item.status}</span>
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
            </span>
            <a
              className="resource-placeholder resource-link"
              href="https://huggingface.co/PardisTaghavi/ActionSplice/tree/main"
              target="_blank"
              rel="noreferrer"
            >
              <span>Checkpoints</span>
            </a>
            <span className="resource-placeholder" aria-disabled="true">
              <span>Code</span>
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
            <h2>Wait above. CST-R below.</h2>
          </div>
          <p>
            HY-131 is selected. The remaining synchronized pairs are temporary
            candidates for visual review.
          </p>
        </div>
        <div className="comparison-grid">
          {comparisonItems.map((item) => <ComparisonCard item={item} key={item.prompt} />)}
        </div>

        <article className="cst-t-reserve">
          <span className="sample-state">RESERVED</span>
          <div>
            <h3>CST-T qualitative comparison</h3>
            <p>Within-chunk transport example pending final selection.</p>
          </div>
        </article>

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
