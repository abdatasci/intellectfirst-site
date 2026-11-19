# Working on intellectfirst.com

## Publishing: test first, publish once per batch (director's rule, 19 Nov 2026)
- Every push or merge to `main` is a production deploy and costs 15 Netlify credits. Deploy Previews cost nothing.
- Do not push to `main`. Commit to the `staging` branch; the open pull request from `staging` into `main` gives a free test version at `deploy-preview-<PR number>--intellect-first-academy.netlify.app`.
- Publish by merging that pull request once a batch is ready (about once a day; sooner only for urgent fixes such as sign-in or payments). Then reset `staging` to `main` and open a new pull request.
- Other sessions use this repo too: pull and rebase (`origin/staging` and `origin/main`) before every push.

## Workflow
1. Edit, then `node scripts/build.mjs` (writes `dist/`).
2. Test with Playwright against `dist/`.
3. Commit as `Abdoulie Manneh <59515533+abdatasci@users.noreply.github.com>`.

## Standing rules
- This repo is public: no student names or phone numbers (use IDs or sha-256 fingerprints), no codes in plain text, no secrets (they live in Netlify environment variables).
- Never delete the director's real photos.
- Original content only; games and vocabulary are listed as whole courses or books only.
