### 1. Website Introduction

* **Purpose:** A dedicated, single-page application (SPA) created as a birthday gift for Hui. It is designed to take her on a visual and auditory journey through your memories together, progressing through the four seasons.
* **User Interface & Experience (UI/UX):**
  * **Four-Season Scrolling Journey:** The application is divided into four distinct sections (Spring, Summer, Autumn, and Winter). Each season occupies exactly 100% of the viewport height (100vh), utilizing smooth scroll-snapping to transition cleanly from one season to the next without pausing midway.
  * **Clothesline Picture Wall:** The central UI element for each season is a virtual "clothesline." Photos will appear pinned and hanging from this line across the screen.
  * **Immersive Seasonal Theming:** * **Dynamic Backgrounds:** Each full-screen section features a unique motion background reflecting the season (e.g., falling cherry blossoms, autumn leaves, or gentle snow).
    * **Thematic Frames:** The physical styling of the photo frames and pins will change dynamically to match the aesthetic of the current season.
  * **Interactive Photo Modals:** The clothesline serves as an interactive gallery. Clicking any hanging photo will trigger a modal overlay that dims the background and brings the image to the center of the screen. This modal will display:
    * The high-resolution photograph.
    * The date/time the photo was taken.
    * The location.
    * A personalized sentence or memory associated with that specific moment.

### 2. Technology Stack

* **Core Logic:** **TypeScript**. This provides strict typing and highly maintainable code for the UI interactions, scroll event listeners, and modal state management.
* **Build Tool/Bundler:** **Vite**. Offers out-of-the-box TypeScript support and lightning-fast local development without the overhead of heavy frameworks.
* **Markup & Styling:** * HTML5 paired with modern CSS (Flexbox/Grid).
  * **CSS Scroll Snap:** Native `scroll-snap-type: y mandatory` on the main container and `scroll-snap-align: start` on each seasonal section to ensure the 100vh snapping effect.
  * **Animations:** CSS transitions and keyframes for the motion backgrounds (snow, leaves) and smooth hover/modal fade-ins.
* **Asset Management Strategy:**
  * **Image Optimization:** Pre-process photos into modern, highly compressed formats (WebP).
  * **Responsive Delivery:** Implement `<picture>` tags and `srcset` attributes to serve appropriately sized images based on the device's screen resolution.
  * **Lazy Loading:** Apply native `loading="lazy"` attributes to images below the "Spring" fold so the initial page loads instantly.
  * **Audio Handling:** Compress the background track to a high-quality MP3 or AAC file. Playback will be managed by a TypeScript controller interacting with the HTML5 `<audio>` API to handle modern browser autoplay policies smoothly.

### 3. Deployment

* **Hosting:** **GitHub Pages**. Natively serves static files with global CDN distribution for free.
* **Version Control:** Hosted on a public GitHub repository.
* **CI/CD Pipeline:** **GitHub Actions**. A workflow file (e.g., `deploy.yml`) will be configured to trigger on pushes to the main branch. The Action will automatically:
  1. Checkout the code.
  2. Install dependencies and compile the TypeScript via Vite.
  3. Upload the optimized `dist/` folder.
  4. Deploy the built assets directly to the GitHub Pages environment.
* **Domain:** The site will be accessible via the standard `github.io` URL, with the option to map a custom domain via DNS A/CNAME records if desired.