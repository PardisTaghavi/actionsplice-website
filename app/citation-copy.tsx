'use client';

import { useState } from 'react';

const citation = `@article{taghavi2026actionsplice,
  title={ActionSplice: In-Flight Action Editing for Interactive World Models},
  author={Taghavi, Pardis and Guo, Tingyu and Lossner, Jonas and Pandey, Gaurav and Langari, Reza},
  journal={arXiv preprint arXiv:2609.08230},
  year={2026}
}`;

export function CitationCopy() {
  const [copied, setCopied] = useState(false);

  async function copyCitation() {
    await navigator.clipboard.writeText(citation);
    setCopied(true);
    window.setTimeout(() => setCopied(false), 1800);
  }

  return (
    <div className="citation-box">
      <div className="citation-toolbar">
        <span>BibTeX</span>
        <button type="button" onClick={copyCitation} aria-live="polite">
          {copied ? 'Copied' : 'Copy BibTeX'}
        </button>
      </div>
      <pre><code>{citation}</code></pre>
    </div>
  );
}
