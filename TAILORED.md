# Tailored Resume Log

Index of `tailored/*` branches. Each branch is the permanent record of the resume sent for that application; this table is the single place to see them all.

| Branch | Company | Role | Date sent | Outcome / notes |
|---|---|---|---|---|
| _(none yet)_ | | | | |

---

## How to start a new tailored version

```powershell
# 1. Start from a current main
git checkout main
git pull origin main

# 2. Branch off (naming: tailored/<company>-<role-shortname>)
git checkout -b tailored/acme-senior-editor

# 3. Edit index.html, commit edits in small focused chunks
git add index.html
git commit -m "Reframe Cornell bullet for editorial-leadership emphasis"

# 4. Generate the tailored PDF (script auto-detects the branch)
node generate-pdf.js
# writes to assets/tailored/acme-senior-editor.pdf

# 5. Commit the PDF, push the branch
git add assets/tailored/acme-senior-editor.pdf
git commit -m "Add tailored PDF for Acme Senior Editor application"
git push -u origin tailored/acme-senior-editor

# 6. Add a row to this file on main, commit, push
```

## How to promote a generally-useful edit back to main

Make the broadly-useful change in its **own dedicated commit** on the tailored branch, then:

```powershell
git checkout main
git pull origin main
git log tailored/<branch> --oneline   # find the commit hash
git cherry-pick <hash>
git push origin main
```

CI on `main` will regenerate the canonical PDF automatically.

## Safety notes

- GitHub Pages serves `main` only; pushing `tailored/*` branches never affects the live site.
- The CI workflow in `.github/workflows/main.yml` only runs on pushes to `main`.
- `generate-pdf.js` writes to `assets/Zachary_Butler_Resume_2026.pdf` on `main` and `assets/tailored/<branch-suffix>.pdf` on any `tailored/*` branch — they cannot collide.
