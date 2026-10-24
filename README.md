# Medhansh — personal website

A buildless, three-page website. All HTML, CSS, JavaScript, your original portrait, and the McQueen video are included. No npm or build step is needed.

## Publish on GitHub Pages

You need Git, GitHub CLI (`gh`), and `unzip`. Log into the intended account using `gh auth login`.
The root URL is YOUR-USERNAME.github.io. To use medh.github.io, the owner must be medh. Naming a repository medh.github.io under medhansh2808 does not give you medh.github.io.

After extracting this ZIP, from inside this folder:

```bash
gh auth login
gh auth setup-git
GH_USER="$(gh api user --jq .login)"
REPO="$GH_USER.github.io"
git init -b main
git add .
git commit -m "Launch personal website"
gh repo create "$GH_USER/$REPO" --public --source=. --remote=origin --push
```

These commands assume that repository does not exist yet. If it already exists, clone it into a new folder, copy this site's files into it, inspect the diff, then commit and push; do not force push.

In the repository: Settings → Pages → Source: Deploy from a branch → main → /(root) → Save.
Your site will appear at https://YOUR-USERNAME.github.io/ (allow up to 10 minutes).

## Later updates

```bash
git add .
git commit -m "Update website"
git push
```

## Files

- index.html: homepage, portrait, Sisyphus animation, art passage
- work.html: McQueen and ongoing work
- writing.html: Substack and McQueen blog
- style.css: responsive layout, photo crop, light/dark styling
- site.js: animation, theme persistence, video dialog
- assets/: original portrait, McQueen demo/poster, favicon
- .nojekyll: serves these static files directly

Photo framing is in the .portrait CSS rules. The original image remains unchanged. Click the small portrait to view it.

GitHub documentation: https://docs.github.com/en/pages/getting-started-with-github-pages/creating-a-github-pages-site
