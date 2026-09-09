# Research Project Website Discovery Blueprint

Reusable launch and indexing checklist for an academic paper, project website,
code repository, and released checkpoints.

## Canonical launch information

Fill these once and reuse the exact values everywhere.

- Paper title: `<TITLE>`
- Authors: `<AUTHORS IN PAPER ORDER>`
- Abstract: `<ABSTRACT>`
- Project URL: `<CANONICAL HTTPS URL>`
- arXiv URL: `<ARXIV ABS URL>`
- PDF URL: `<ARXIV PDF OR AUTHOR PDF URL>`
- Code URL: `<PUBLIC CODE URL>`
- Checkpoint URL: `<MODEL/CHECKPOINT URL>`
- DOI: `<DOI WHEN AVAILABLE>`
- Venue/status: `<PREPRINT / VENUE / YEAR>`
- Primary topics: `<5-10 SPECIFIC TERMS>`

Keep the title, author order, URLs, and description consistent across every
service. Link the project page, paper, code, and checkpoints to each other.

## Tier 1 — Required technical indexing

- [ ] Add a unique HTML title and concise meta description.
- [ ] Add an absolute canonical URL.
- [ ] Add author, keyword, and scholarly citation meta tags.
- [ ] Add `ScholarlyArticle` JSON-LD containing the paper, authors, date, arXiv,
      code, and project URL.
- [ ] Add Open Graph and X/Twitter metadata using absolute URLs.
- [ ] Publish `sitemap.xml` with the canonical page.
- [ ] Publish `robots.txt` and reference the sitemap where hosting permits it.
- [ ] Make the abstract, authors, paper link, and code link visible as HTML—not
      only inside an image or video.
- [ ] Add the final citation as visible HTML when it is released.
- [ ] Check that the canonical page returns HTTP 200 without authentication.
- [ ] Check mobile layout, internal anchors, media loading, and broken links.
- [ ] Keep analytics enabled and record the launch date for comparison.

References: [Google sitemap guidance](https://developers.google.com/search/docs/crawling-indexing/sitemaps/build-sitemap),
[Google recrawl guidance](https://developers.google.com/search/docs/crawling-indexing/ask-google-to-recrawl),
[Google Scholar inclusion guidance](https://scholar.google.com/intl/en/scholar/inclusion.html),
[Bing sitemap guidance](https://www.bing.com/webmasters/help/sitemaps-3b5cf6ed).

## Tier 2 — Search engines

- [ ] Google Search Console: add/verify the URL-prefix property.
- [ ] Google Search Console: submit `sitemap.xml`.
- [ ] Google Search Console: inspect the canonical page and request indexing.
- [ ] Bing Webmaster Tools: import the verified Search Console property or add
      the site directly.
- [ ] Bing Webmaster Tools: submit the sitemap and canonical URL.
- [ ] Use IndexNow only when the hosting setup can expose the required key at a
      valid location; otherwise use Bing's manual URL submission.
- [ ] Recheck indexing after 3, 7, and 21 days. Do not repeatedly resubmit the
      same unchanged URL.

References: [Google Search Console recrawl workflow](https://developers.google.com/search/docs/crawling-indexing/ask-google-to-recrawl),
[Bing URL submission](https://www.bing.com/webmasters/help/URL-Submission-62f2860b).

## Tier 3 — Scholarly and ML indexes

- [ ] arXiv: include project, code, and checkpoint URLs in the abstract-page
      comments or links.
- [ ] Google Scholar: confirm the arXiv record appears; merge duplicates only if
      necessary.
- [ ] Semantic Scholar: confirm the arXiv record, authors, and external links;
      request corrections only for missing or incorrect metadata.
- [ ] Papers with Code: add the paper, connect the official code repository,
      assign relevant tasks/methods, and add results only when the benchmark
      definitions are public and exact.
- [ ] Hugging Face Papers: submit/claim the arXiv paper page.
- [ ] Hugging Face checkpoint/model card: add `arxiv:<ID>` metadata plus paper,
      project, code, license, intended use, and evaluation details.
- [ ] CatalyzeX: confirm the paper record and associate the official code URL.
- [ ] alphaXiv: confirm the paper page and add a concise author explanation.
- [ ] SciRate: confirm automatic ingestion; optionally share the SciRate record.
- [ ] OpenAlex and CORE: confirm automatic ingestion after arXiv/DOI propagation.
- [ ] ORCID: each author adds the arXiv work and project/code links where useful.
- [ ] Institutional repository: deposit the permitted manuscript and project URL.
- [ ] OpenReview: add the project/code links when the public submission or venue
      page exists.

References: [Papers with Code contribution guidance](https://paperswithcode.com/about),
[Papers with Code paper submission](https://paperswithcode.com/submit-paper),
[Hugging Face model-card paper linking](https://huggingface.co/docs/hub/models-faq),
[Hugging Face model cards](https://huggingface.co/docs/hub/model-cards).

## Tier 4 — Repository and backlink network

- [ ] Website repository: set description, website URL, and focused GitHub topics.
- [ ] Code repository: add the paper, project page, citation, checkpoints,
      installation, license, and minimal reproduction instructions.
- [ ] Checkpoint repository: link back to the paper, project page, and code.
- [ ] Add the project to every author's institutional publications page.
- [ ] Add the project to relevant lab, department, and research-group pages.
- [ ] Add the paper to author Google Scholar, ORCID, Semantic Scholar, and
      ResearchGate profiles where account ownership permits it.
- [ ] Ask collaborators to use the same canonical project URL in their profiles.

## Tier 5 — Launch distribution

Prepare one canonical launch package before posting:

- 1-sentence result
- 3-bullet technical summary
- project URL, arXiv URL, code URL, checkpoint URL
- one short comparison video or figure
- descriptive alt text
- BibTeX citation

Publish selectively where the relevant community is active:

- [ ] X/Twitter research thread
- [ ] LinkedIn post
- [ ] Bluesky/Mastodon post
- [ ] Reddit `r/MachineLearning` research post, following current rules
- [ ] Hacker News `Show HN` only if the code/demo is genuinely usable
- [ ] YouTube or institutional video channel for the method explainer
- [ ] Relevant lab, department, and collaborator accounts
- [ ] Relevant mailing lists, reading groups, and research Slack/Discord channels
- [ ] Curated newsletters only through their official submission process

Avoid duplicate promotional posts, purchased backlinks, bulk directory
submissions, misleading benchmark claims, and communities where the work is not
directly relevant.

## Release maintenance

- [ ] Day 0: complete Tier 1, submit Tier 2, and connect Tier 3 records.
- [ ] Day 3: check crawl/index status and fix errors.
- [ ] Day 7: check scholarly metadata, backlinks, and referral analytics.
- [ ] Day 21: resubmit only if a verified indexing problem remains.
- [ ] At each paper revision: update the website, citation, model card, and index
      records together.
- [ ] At acceptance/publication: add venue, DOI, proceedings URL, and final
      citation; preserve the original project URL.
- [ ] Quarterly: check broken links, checkpoint availability, and analytics.

## ActionSplice launch ledger

Canonical project URL: <https://pardistaghavi.github.io/actionsplice-website/>

- [x] arXiv record published: <https://arxiv.org/abs/2609.08230>
- [x] arXiv record links to the project page.
- [x] Code repository linked from the project page.
- [x] SciRate and other arXiv mirrors discovered the paper automatically.
- [x] Complete Tier 1 metadata, sitemap, and structured data.
- [ ] Add the final BibTeX citation when it is released.
- [ ] Submit Google Search Console property, sitemap, and URL inspection request.
- [ ] Submit/import the site in Bing Webmaster Tools.
- [ ] Connect Papers with Code to the official code repository.
- [ ] Confirm/claim the Hugging Face paper page and connect the checkpoint card.
- [ ] Confirm CatalyzeX and Semantic Scholar records.
- [ ] Add author/institutional profile backlinks.
- [ ] Prepare and publish the launch package.
