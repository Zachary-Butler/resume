# Tailored Resume Log

All tailored versions live on `main` as separate HTML files in `tailored/`. The general resume at `index.html` is what portfolio visitors see — tailored files are never linked from the main page and never show up on the live site unless you add a link.

| File | Company | Role | Date sent | Outcome / notes |
|---|---|---|---|---|
| `tailored/gtsc-abmc-producer.html` | GTSC (The Bowen Group) | Producer/Editor, Multimedia Production Lead (ABMC contract) | _preparing_ | Tailored 2026-05-05; awaiting submission |
| `tailored/csu-argus-facilitator.html` | Colorado State University | Program Facilitator, Argus Institute | _preparing_ | Tailored 2026-05-05 |

---

## How to start a new tailored version

Tell Claude: "Create a new tailored version for [Company] — [Role]." Claude will:

1. Copy `index.html` → `tailored/company-role.html` (adjusting CSS/JS paths to `../css/` and `../js/`)
2. Make the role-specific edits
3. Generate the PDF to `assets/tailored/company-role.pdf`
4. Commit everything to `main` and log it in this file

You stay on `main` the whole time. No branch switching.

## How to compare versions

Open any combination of files directly in your browser — they're all local HTML files. You can have `index.html`, `tailored/csu-argus-facilitator.html`, and `tailored/gtsc-abmc-producer.html` open in separate tabs simultaneously.

## How to promote a generally-useful edit back to the main resume

If a change made in a tailored version is good enough to go into the general resume, tell Claude which edit to port over. Claude will apply it to `index.html` in a separate commit.

## Notes

- GitHub Pages serves only `index.html` and its assets — files in `tailored/` are in the repo but not served via your portfolio URL unless directly linked.
- Tailored HTML files use `../css/` and `../js/` paths because they live one folder deep.
