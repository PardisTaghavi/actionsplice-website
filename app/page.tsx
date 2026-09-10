type ComparisonItem = {
  prompt: string;
  transition: string;
  video: string;
};

const assetPrefix = process.env.NEXT_PUBLIC_BASE_PATH ?? '';

const comparisonItems: ComparisonItem[] = [
  {
    prompt: 'HY-131',
    transition: 'Backward → Yaw left',
    video: '/media/qualitative/hy131-wait-cstr.mp4',
  },
  {
    prompt: 'HY-130',
    transition: 'Backward → Forward',
    video: '/media/qualitative/hy130-wait-cstr.mp4',
  },
  {
    prompt: 'HY-132',
    transition: 'Forward → Yaw left',
    video: '/media/qualitative/hy132-wait-cstr.mp4',
  },
];

const repeatedUpdateItems: ComparisonItem[] = [
  {
    prompt: 'HY-132',
    transition: 'Five sequential action updates',
    video: '/media/qualitative/hy132-five-interruptions-condition-swap-vs-cstr.mp4',
  },
  {
    prompt: 'HY-120',
    transition: 'Two sequential action updates',
    video: '/media/qualitative/hy120-two-interruptions-condition-swap-vs-cstr.mp4',
  },
];

function ComparisonCard({ item }: { item: ComparisonItem }) {
  return (
    <article className="comparison-card">
      <div className="comparison-media">
        <video controls loop muted playsInline preload="metadata" aria-label={`${item.prompt}: Wait above CST-R`}>
          <source src={`${assetPrefix}${item.video}`} type="video/mp4" />
        </video>
      </div>
      <div className="comparison-caption">
        <strong>{item.transition} · r = 2</strong>
      </div>
    </article>
  );
}

export default function Home() {
  return (
    <main>
      <nav className="site-nav" aria-label="Primary navigation">
        <a className="brand" href="#top" aria-label="ActionSplice home">
          <span>ActionSplice</span>
        </a>
        <div className="nav-links">
          <a href="#method">Method</a>
          <a href="#gallery">Gallery</a>
          <a href="#results">Evaluation</a>
          <a href="#citation">Citation</a>
        </div>
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
            <a
              className="resource-link"
              href="https://arxiv.org/abs/2609.08230"
              target="_blank"
              rel="noreferrer"
            >
              <span>arXiv</span>
            </a>
            <a
              className="resource-link"
              href="https://github.com/PardisTaghavi/ActionSplice"
              target="_blank"
              rel="noreferrer"
            >
              <span>Code</span>
            </a>
          </div>
        </div>
      </section>

      <section className="summary-band" aria-labelledby="summary-title">
        <div className="content-shell summary-layout">
          <h2 className="section-index" id="summary-title">TL;DR</h2>
          <p>
            ActionSplice edits an in-progress diffusion state when the requested action changes during sampling.
            CST-R retargets the active chunk; CST-T preserves the completed prefix and applies the new action to
            the remaining suffix. Both resume the frozen world model from the current solver step instead of
            restarting generation.
          </p>
        </div>
      </section>

      <section className="abstract-band" aria-labelledby="abstract-title">
        <div className="content-shell abstract-layout">
          <div>
            <p className="section-index">Paper</p>
            <h2 id="abstract-title">Abstract</h2>
          </div>
          <p>
            Chunk-autoregressive video world models typically condition each generated chunk on one action. An
            action received during sampling must therefore wait for the next chunk, condition future solver
            evaluations on a state produced under the previous action, or trigger rollback that repeats completed
            evaluations. We introduce ActionSplice, an inference framework that formulates this problem as
            Counterfactual State Transport (CST). A lightweight corrector transports the interrupted backbone-native
            representation toward the matched state induced by the revised action at the same solver step. The world
            model and sampler remain frozen, and sampling resumes without replaying completed evaluations. The
            retargeting variant CST-R updates the entire active chunk, while the temporal-splicing variant CST-T
            preserves a temporal prefix and updates only the suffix. Across minWM-Wan Action2V and HY-WM1.5, CST-R
            reduces rollback-relative LPIPS by 61.5% and 75.9% relative to direct condition swapping. CST-T reduces
            suffix LPIPS by 56.1% and 77.5%, respectively, while providing 2.73× and 1.69× pixel-ready speedups over
            waiting. Under the HY-WorldPlay protocol, CST-R obtains a PSNR of 25.66 dB, an SSIM of 0.6902, and an LPIPS
            of 0.1337 against the original rollout.
          </p>
        </div>
      </section>

      <section className="method-band" id="method">
        <div className="content-shell">
          <div className="method-layout">
            <div className="method-intro">
              <p className="section-index">Method</p>
              <h2>Change action without restarting the trajectory.</h2>
              <p>
                At receipt step <i>r</i>, ActionSplice corrects the current clean prediction and reconstructs a
                valid state for the next solver evaluation. The world model, sampler, decoder, and committed
                history stay frozen.
              </p>
              <div className="method-constraints" aria-label="Method constraints">
                <span>same solver step</span>
                <span>zero replayed NFEs</span>
                <span>frozen backbone</span>
              </div>
            </div>

            <div className="transport-panel" aria-label="Counterfactual state transport pipeline">
              <div className="action-update">
                <span>action update after evaluation r</span>
                <strong><i>a</i><sup>−</sup> <b aria-hidden="true">→</b> <i>a</i><sup>+</sup></strong>
              </div>

              <div className="transport-track">
                <div className="transport-state source-state">
                  <span>interrupted prediction</span>
                  <strong><i>x</i><sub>r</sub><sup>−</sup></strong>
                  <small>old-action trajectory</small>
                </div>

                <div className="transport-operation">
                  <span>ActionSplice</span>
                  <strong><i>M</i><sub>m</sub> ⊙ <i>C</i><sub>ϑ</sub></strong>
                  <small>masked clean-state residual</small>
                </div>

                <div className="transport-state target-state">
                  <span>corrected prediction</span>
                  <strong><i>x̂</i><sub>r</sub><sup>(m)</sup></strong>
                  <small>same solver step r</small>
                </div>

                <div className="scheduler-operation">
                  <span>native scheduler</span>
                  <strong>ℛ<sub>r</sub></strong>
                </div>

                <div className="transport-state resume-state">
                  <span>resume from</span>
                  <strong><i>ẑ</i><sub>r</sub><sup>(m)</sup></strong>
                  <small>execute remaining K − r NFEs</small>
                </div>
              </div>

              <div className="transport-variants">
                <article className="variant-row">
                  <div className="variant-name">
                    <strong>CST-R</strong>
                    <span>m = 0 · retarget full chunk</span>
                  </div>
                  <div className="frame-strip full-edit" aria-label="Entire active chunk uses the revised action">
                    {Array.from({ length: 8 }).map((_, index) => <i key={index} />)}
                  </div>
                </article>
                <article className="variant-row">
                  <div className="variant-name">
                    <strong>CST-T</strong>
                    <span>0 &lt; m &lt; T · preserve prefix, edit suffix</span>
                  </div>
                  <div className="frame-strip temporal-edit" aria-label="Prefix retains the old action and suffix uses the revised action">
                    {Array.from({ length: 8 }).map((_, index) => <i key={index} />)}
                    <b>m</b>
                  </div>
                </article>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="section gallery-section" id="gallery">
        <div className="section-heading gallery-heading">
          <div>
            <p className="section-index">Qualitative</p>
            <h2>CST-R applies the revised action within the active chunk.</h2>
          </div>
        </div>
        <div className="comparison-grid">
          {comparisonItems.map((item) => <ComparisonCard item={item} key={item.prompt} />)}
        </div>

        <div className="repeated-heading">
          <p className="section-index">Repeated updates</p>
          <h3>CST-R handles repeated in-flight action updates.</h3>
          <p>Matched HY-WM1.5 rollouts with repeated action interruptions at r = 2.</p>
        </div>
        <div className="comparison-grid repeated-grid">
          {repeatedUpdateItems.map((item) => <ComparisonCard item={item} key={item.prompt} />)}
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
                <source src={`${assetPrefix}/media/qualitative/hy136-constant-vs-cst-t.mp4`} type="video/mp4" />
              </video>
            </figure>
            <figure className="runtime-example">
              <video autoPlay loop muted playsInline preload="metadata" aria-label="HY-149 Wait compared with CST-T">
                <source src={`${assetPrefix}/media/qualitative/hy149-constant-vs-cst-t.mp4`} type="video/mp4" />
              </video>
            </figure>
            <figure className="runtime-example">
              <video autoPlay loop muted playsInline preload="metadata" aria-label="HY-125 Wait compared with CST-T">
                <source src={`${assetPrefix}/media/qualitative/hy125-wait-vs-cst-t.mp4`} type="video/mp4" />
              </video>
            </figure>
          </div>
        </article>
      </section>

      <section className="results-band" id="results">
        <div className="content-shell">
          <div className="results-heading">
            <p className="section-index">Results</p>
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
        </div>
      </section>

      <section className="citation-band" id="citation">
        <div className="content-shell citation-layout">
          <div>
            <p className="section-index">Citation</p>
            <h2>Citation</h2>
          </div>
          <div className="citation-placeholder">
            <span>Pending</span>
            <p>BibTeX will be added when the final citation is available.</p>
          </div>
        </div>
      </section>

      <footer>
        <div className="content-shell footer-inner">
          <strong>ActionSplice</strong>
          <p>In-Flight Action Editing for Interactive World Models</p>
          <span>Research website · 2026</span>
        </div>
      </footer>
    </main>
  );
}
