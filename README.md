# ChariGo — two independent websites

Converted from the supplied `CHARIGO_High Fidelity.fig` file. Both versions include all **25 application frames**, with source component states represented by **45 pages per version**, plus the Welcome entry page. The phone layout is 390 × 844 at its original size, centered on desktop and scaled to fit smaller mobile widths.

## Open a version

- **HTML + CSS only:** open `html-css-version/index.html`.
- **HTML + CSS + vanilla JavaScript:** open `vanilla-js-version/index.html`.

No package installation, build, backend, database, or external asset service is required. Keep each version's folder intact; its CSS and assets are independent. Use a modern browser with CSS `zoom` support for proportional scaling on widths below 390px.

For local HTTP testing, optionally run this command from this project directory:

```sh
python3 -m http.server 8000
```

Then open the desired version's `index.html` through that server. HTTP browser testing passed. Direct `file://` testing was blocked by the testing environment's browser policy; the projects use relative files, ordinary links, and no fetch or module loading.

## Source fidelity

- The 37 raster files from the upload are included unchanged in each version. `design-reference/asset-manifest.json` records their original Figma hashes and SHA-256 checksums.
- SVG artwork uses the original vector paths. Logos and photos use the actual embedded image files, with source crops and masks.
- The original Inter glyph outlines are exported as SVG to retain the source's exact typography and line layout, including text that extends outside its Figma layout box. Exact wording is retained in HTML image alternatives and `data-text` attributes. An included, locally loaded Inter font is used for user-entered content; its OFL license is under `assets/fonts/`.
- Each `.fig-node` element is a named source layer. `data-source` identifies its Figma layer; `data-node` distinguishes component instances. Its inline transform, dimensions, fills and source art correspond to that layer. Shared layout rules are in `css/style.css`.
- Source sample values, duplicate category labels, empty blocks, and unusual prototype links are intentionally preserved. The three frames titled “Volunteer Verification” are distinct source screens.
- The original 87px navigation component extends 28px below its 844px frame. The dock retains that crop and remains fixed while the content scrolls.

`design-reference/source-comparison.jpg` pairs the supplied file's original thumbnail crops with the rendered screens. All 25 screens were inspected. The embedded thumbnail provides only about 29 × 62 pixels per screen, so **full-resolution pixel-level similarity remains unverified**. Full-resolution PNG exports of the frames are needed for a definitive pixel comparison.

## Static version

All navigation uses HTML links. There are no JavaScript files, script tags, inline event handlers, frameworks, or npm dependencies. Role selection, donation frequency/amount, and request-status variants have separate HTML pages. `screen-manifest.json` lists the screens and state-page paths; those paths exist in both versions.

## JavaScript version

`js/script.js` implements native input fields and validation, password visibility, source role/state navigation, category search/filtering, payment selection, anonymous donations, custom donation amounts, application submission, file selection, fundraiser creation/edit/deletion, applicant review and acceptance, and updates to existing history cards.

This is a frontend demonstration. There is no real authentication, payment processing, database, or file upload service. Mock records live in arrays/objects and use per-tab `sessionStorage` to survive normal page navigation. Passwords are not stored. Close the tab or clear session storage to reset the demonstration. If browser policy disables session storage, cross-page mock records will not persist.

No additional modal, empty-result, declined-request, contact-tab, or error-screen designs are invented. Where the source has no such screen, browser-native validation or confirmation is used, or the existing source inventory stays visible. Search filters the categories actually present in the source; it does not fabricate charity result cards.

Authored destinations are retained even when surprising: organization “Go to Home” opens its pending-verification frame, and the pending frame's “Back to Log In” opens Current Fundraisers. Monthly selection enables the existing source Monthly component variant even though its inherited instance wire is disabled. Manage buttons are reachable above broad card links. These interaction additions do not change the initial artwork.

## Screen index

| Figma ID | Screen | HTML path in either version |
| --- | --- | --- |
| 1:5 | Welcome | [pages/welcome.html](html-css-version/pages/welcome.html) |
| 47:39 | Log In | [pages/log-in.html](html-css-version/pages/log-in.html) |
| 48:90 | Sign Up | [pages/sign-up.html](html-css-version/pages/sign-up.html) |
| 59:5 | Choose ChariGo Usage | [pages/choose-charigo-usage.html](html-css-version/pages/choose-charigo-usage.html) |
| 59:8 | Search | [pages/search.html](html-css-version/pages/search.html) |
| 59:6 | Home Page | [pages/home-page.html](html-css-version/pages/home-page.html) |
| 98:492 | Organization Information | [pages/organization-information.html](html-css-version/pages/organization-information.html) |
| 98:559 | Donation Payment | [pages/donation-payment.html](html-css-version/pages/donation-payment.html) |
| 98:531 | Charity Information | [pages/charity-information.html](html-css-version/pages/charity-information.html) |
| 59:14 | Donation Confirmation | [pages/donation-confirmation.html](html-css-version/pages/donation-confirmation.html) |
| 140:504 | Volunteer Verification | [pages/volunteer-verification.html](html-css-version/pages/volunteer-verification.html) |
| 148:423 | Volunteer Verification | [pages/volunteer-verification-148-423.html](html-css-version/pages/volunteer-verification-148-423.html) |
| 148:438 | Volunteer Verification | [pages/volunteer-verification-148-438.html](html-css-version/pages/volunteer-verification-148-438.html) |
| 59:16 | Volunteering Details | [pages/volunteering-details.html](html-css-version/pages/volunteering-details.html) |
| 59:15 | Volunteer Profile Page | [pages/volunteer-profile-page.html](html-css-version/pages/volunteer-profile-page.html) |
| 147:260 | Donation History | [pages/donation-history.html](html-css-version/pages/donation-history.html) |
| 147:277 | Volunteer History | [pages/volunteer-history.html](html-css-version/pages/volunteer-history.html) |
| 148:382 | Organization Registration | [pages/organization-registration.html](html-css-version/pages/organization-registration.html) |
| 151:472 | Organizer Profile | [pages/organizer-profile.html](html-css-version/pages/organizer-profile.html) |
| 152:796 | Manage Fundraiser | [pages/manage-fundraiser.html](html-css-version/pages/manage-fundraiser.html) |
| 155:1488 | Past Fundraisers | [pages/past-fundraisers.html](html-css-version/pages/past-fundraisers.html) |
| 152:832 | Volunteer Requests | [pages/volunteer-requests.html](html-css-version/pages/volunteer-requests.html) |
| 151:511 | Create Fundraiser | [pages/create-fundraiser.html](html-css-version/pages/create-fundraiser.html) |
| 151:530 | Current Fundraisers | [pages/current-fundraisers.html](html-css-version/pages/current-fundraisers.html) |
| 154:1229 | Volunteer Applicant Profile | [pages/volunteer-applicant-profile.html](html-css-version/pages/volunteer-applicant-profile.html) |

## Validation

- All 46 HTML documents per version are checked for resource integrity.
- All source raster assets remain byte-identical in both copies.
- All 45 initial state views are pixel-identical between the static and JavaScript sites at 390 × 844 in Chromium (90 page renders, no broken images or runtime errors).
- Layout is checked at widths 320, 360, 375, 390, 430, and 1280px.
- Thirty functional browser checks cover the JavaScript flows; results are in `design-reference/interaction-tests.json`.
- Full-resolution comparison against original Figma frame exports and direct-file browser execution remain unverified, as described above.
