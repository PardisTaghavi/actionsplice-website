type ComparisonItem = {
  prompt: string;
  transition: string;
  video: string;
  status: string;
  selected: boolean;
};

const comparisonItems: ComparisonItem[] = [
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
];

const repeatedUpdateItems: ComparisonItem[] = [
  {
    prompt: 'HY-132',
    transition: 'Five sequential action updates',
    video: '/media/qualitative/hy132-five-interruptions-condition-swap-vs-cstr.mp4',
    status: '5 INTERRUPTIONS',
    selected: false,
  },
  {
    prompt: 'HY-120',
    transition: 'Two sequential action updates',
    video: '/media/qualitative/hy120-two-interruptions-condition-swap-vs-cstr.mp4',
    status: '2 INTERRUPTIONS',
    selected: false,
  },
];

function ComparisonCard({ item, compact = false }: { item: ComparisonItem; compact?: boolean }) {
  return (
    <article className={`comparison-card${item.selected ? ' is-selected' : ''}`}>
      <div className="comparison-media">
        <video controls loop muted playsInline preload="metadata" aria-label={`${item.prompt}: Wait above CST-R`}>
          <source src={item.video} type="video/mp4" />
        </video>
      </div>
      <div className="comparison-caption">
        {compact ? (
          <strong>{item.transition} · r = 2</strong>
        ) : (
          <>
            <strong>{item.transition} · r = 2</strong>
            <span className={`sample-state${item.selected ? ' selected-state' : ''}`}>{item.status}</span>
          </>
        )}
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
          <a href="#results">Evaluation</a>
          <a href="#citation">Citation</a>
        </div>
        <span className="internal-badge">Internal preview</span>
      </nav>

      <section className="hero" id="top">
        <div className="hero-copy">
          <div className="hero-meta">
            <time dateTime="2026-09">September, 2026</time>
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
            <span className="resource-placeholder" aria-disabled="true">
              <span>Code</span>
            </span>
          </div>
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

        <div className="repeated-heading">
          <p className="section-index">Repeated updates</p>
          <h3>Condition Swap above. CST-R below.</h3>
          <p>Matched HY-WM1.5 rollouts with repeated action interruptions at r = 2.</p>
        </div>
        <div className="comparison-grid repeated-grid">
          {repeatedUpdateItems.map((item) => <ComparisonCard item={item} compact key={item.prompt} />)}
        </div>

        <article className="runtime-card">
          <div className="runtime-copy">
            <p className="section-index">CST-T / Qualitative</p>
            <h3>CST-T: Within-chunk action transport</h3>
            <p>Matched Wait controls versus CST-T · r = 2.</p>
          </div>
          <div className="runtime-media runtime-media-stack">
            <figure className="runtime-example">
              <video autoPlay loop muted playsInline preload="metadata" aria-label="HY-136 Wait compared with CST-T">
                <source src="/media/qualitative/hy136-constant-vs-cst-t.mp4" type="video/mp4" />
              </video>
            </figure>
            <figure className="runtime-example">
              <video autoPlay loop muted playsInline preload="metadata" aria-label="HY-149 Wait compared with CST-T">
                <source src="/media/qualitative/hy149-constant-vs-cst-t.mp4" type="video/mp4" />
              </video>
            </figure>
            <figure className="runtime-example">
              <video autoPlay loop muted playsInline preload="metadata" aria-label="HY-125 Wait compared with CST-T">
                <source src="/media/qualitative/hy125-wait-vs-cst-t.mp4" type="video/mp4" />
              </video>
            </figure>
          </div>
        </article>
      </section>

      <section className="results-band" id="results">
        <div className="results-heading">
          <p className="section-index">03 / Results</p>
          <h2>Evaluation highlights.</h2>
          <p>Quantitative results reported in the current manuscript draft.</p>
        </div>
        <div className="results-grid">
          <article className="result-card">
            <p>CST-R · rollback fidelity</p>
            <div><strong>61.5%</strong><span>lower LPIPS on minWM</span></div>
            <div><strong>75.9%</strong><span>lower LPIPS on HY-WM1.5</span></div>
            <small>Relative to direct condition swapping.</small>
          </article>
          <article className="result-card">
            <p>CST-T · suffix fidelity</p>
            <div><strong>56.1%</strong><span>lower LPIPS on minWM</span></div>
            <div><strong>77.5%</strong><span>lower LPIPS on HY-WM1.5</span></div>
            <small>Relative to direct condition swapping.</small>
          </article>
          <article className="result-card">
            <p>CST-T · pixel-ready speedup</p>
            <div><strong>2.73×</strong><span>minWM</span></div>
            <div><strong>1.69×</strong><span>HY-WM1.5</span></div>
            <small>Relative to waiting.</small>
          </article>
          <article className="result-card benchmark-card">
            <p>HY-WorldPlay · CST-R</p>
            <div><strong>25.66</strong><span>PSNR</span></div>
            <div><strong>0.6902</strong><span>SSIM</span></div>
            <div><strong>0.1337</strong><span>LPIPS</span></div>
            <small>Against the original rollout.</small>
          </article>
        </div>
      </section>

      <section className="citation-band" id="citation">
        <div>
          <p className="section-index">04 / Citation</p>
          <h2>Citation</h2>
        </div>
        <div className="citation-placeholder">
          <span>Pending</span>
          <p>BibTeX will be added with the paper release.</p>
        </div>
      </section>

      <footer>
        <strong>ActionSplice</strong>
        <p>In-Flight Action Editing for Interactive World Models</p>
        <span>Internal research preview · 2026</span>
      </footer>
    </main>
  );
}
