export class NDSSidebar extends HTMLElement {

  // ================================================================
  // Instantiate global and local CSS objects

    static globalCSSPath = "/css/style.css";
    static globalCSS = new CSSStyleSheet();
    static componentCSS = new CSSStyleSheet();

  // ================================================================
  // Reactive attributes
  
    static observedAttributes = [
      "current"
    ];

  // ================================================================
  // Init class

    constructor() {
      super();

      /*
      * Set up markup template
      */

        const template = `
          <aside>
            <div class="logo">
              <nds-icon icon="logo" color="--nds-neutral-40"></nds-icon>
            </div>
            <nav>
              <ol>
                <li>
                  <nds-button variant="chiclet" href="index">
                    <span slot="label">Gear</span>
                    <span slot="icon">
                      <nds-icon icon="gear"></nds-icon>
                    </span>
                  </nds-button>
                </li>
                <li>
                  <nds-button variant="chiclet" href="framing">
                    <span slot="label">Framing</span>
                    <span slot="icon">
                      <nds-icon icon="framing"></nds-icon>
                    </span>
                  </nds-button>
                </li>
                <li>
                  <nds-button variant="chiclet" href="imaging">
                    <span slot="label">Imaging</span>
                    <span slot="icon">
                      <nds-icon icon="imaging"></nds-icon>
                    </span>
                  </nds-button>
                </li>
                <li>
                  <nds-button variant="chiclet" href="settings">
                    <span slot="label">Settings</span>
                    <span slot="icon">
                      <nds-icon icon="settings"></nds-icon>
                    </span>
                  </nds-button>
                </li>
              </ol>
            </nav>
          </aside>
        `
      
      /*
      * Attach template to shadow
      */

        const shadow = this.attachShadow({ mode: "open" });
        shadow.innerHTML = template;

        // Set up component CSS styles
        NDSSidebar.componentCSS.replaceSync(`
          aside, nav, ol {
            display: flex;
            flex-direction: column;
            height: 100%; }

          aside {
            background: var(--nds-a-sidebar_background); }

          .logo {
            background: var(--nds-a-sidebar-logo_background);
            display: flex;
            justify-content: center;
            padding: var(--nds-a-sidebar-logo_padding); }

          li:last-child { margin-top: auto; }
        `);

      /*
      * Attach global and local CSS rules
      */

        if (NDSSidebar.globalCSS.cssRules.length) {
          this.root.adoptedStyleSheets = [
            NDSSidebar.globalCSS,
            NDSSidebar.componentCSS,
          ];
        } else {
          this.loadStyles(NDSSidebar.globalCSSPath);
        }
    }

  // ================================================================
  // Lifecycle: when element is connected to the DOM
  
    connectedCallback() {
      // console.log("Element added to page.");
    }

  // ================================================================
  // Lifecycle: when element is disconnected to the DOM
  
    disconnectedCallback() {
      // console.log("Element removed to page.");
    }

  // ================================================================
  // Lifecycle: when element is attached to a new DOM
  
    adoptedCallback() {
      // console.log("Element added to new page.");
    }

  // ================================================================
  // Lifecycle: when any of the observedAttributes change value

    attributeChangedCallback(attr, old, updated) {
      // console.log(`Attribute ${attr} has changed from ${old} to ${updated}.`);

      /*
      * Variants
      */
      if(attr == "current") {
        const buttons = this.shadowRoot.querySelectorAll("nds-button");
        if (buttons) {
          buttons.forEach(button => {
            const label = button.querySelector('span[slot="label"]')?.textContent.trim().toLowerCase();

            // If the label matches the updated value, set "current", otherwise remove it
            if (label === updated.toLowerCase()) {
              button.setAttribute("current", "true");
            } else {
              button.removeAttribute("current");
            }
          });
        }
      }
    }


  // ================================================================
  // Custom functions

      /*
      * Attach global and local CSS rules
      */

        async loadStyles(path) {
          try {
            const response = await fetch(path);
            const css = await response.text();
            NDSSidebar.globalCSS.replaceSync(css);

            this.shadowRoot.adoptedStyleSheets = [
              // Always load global CSS before component CSS
              NDSSidebar.globalCSS,
              NDSSidebar.componentCSS,
            ];

            this.removeAttribute("hidden"); // Prevent FOUC
          } catch (error) {
            console.error("Couldn't load styles:", error);
          }
        }
}

// ================================================================
// Definition
customElements.define("nds-sidebar", NDSSidebar);




