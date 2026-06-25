# Delta Connect — Landing Page

The live site is a single self-contained `index.html`, hosted on **Netlify**, which
auto-deploys every push to the `main` branch of this repo.

## How to ship an update

1. Design the page in Claude and **export it as HTML**.
2. Save / move that exported file into this folder.
3. Run the ship script with the exported file's name:

   ```bash
   ./ship.sh "Delta Connect Summit - Landing page.html"
   ```

   (Or, if you've already saved it as `index.html`, just run `./ship.sh`.)

That's it — the script copies your file to `index.html`, commits, and pushes.
Netlify rebuilds and the new version is live in ~1–2 minutes.

## Rolling back

Every version is kept in git history. To go back to the previous design:

```bash
git revert HEAD && git push
```
