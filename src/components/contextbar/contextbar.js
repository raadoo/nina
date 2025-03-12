export class NDSContextbar extends HTMLElement {

  // ================================================================
  // Instantiate global and local CSS objects

    static globalCSSPath = "/css/style.css";
    static globalCSS = new CSSStyleSheet();
    static componentCSS = new CSSStyleSheet();

  // ================================================================
  // Reactive attributes
  
    static observedAttributes = [
      "context"
    ];

  // ================================================================
  // Init class

    constructor() {
      super();

      /*
      * Set up markup templates
      */

        this.templates = {
          gear: `
            <nav>
              <ol>
                <li><nds-button variant="context" hardware="active"><span slot="label">Camera</span></nds-button></li>
                <li><nds-button variant="context"><span slot="label">Filter wheel</span></nds-button></li>
                <li><nds-button variant="context"><span slot="label">Focuser</span></nds-button></li>
                <li><nds-button variant="context"><span slot="label">Guiding</span></nds-button></li>
                <li><nds-button variant="context"><span slot="label">Rotator</span></nds-button></li>
                <li><nds-button variant="context"><span slot="label">Switch</span></nds-button></li>
                <li><nds-button variant="context"><span slot="label">Mount</span></nds-button></li>
                <li><nds-button variant="context"><span slot="label">Weather</span></nds-button></li>
              </ol>
            </nav>
          `,
          framing: `
            <nav>
              <ol>
                <li><nds-button variant="context"><span slot="label">Atlas</span></nds-button></li>
                <li><nds-button variant="context"><span slot="label">Framing assistant</span></nds-button></li>
              </ol>
            </nav>
          `
        }
      
      /*
      * Attach template to shadow
      */

        this.attachShadow({ mode: "open" });
        this.render();

        // Set up component CSS styles
        NDSContextbar.componentCSS.replaceSync(`
          nav{ width: 100%;}

          nav, ol, li {
            display: flex; }

          nav {
            background: var(--nds-a-contextbar_background);
            border-bottom: var(--nds-a-contextbar_border-size) solid var(--nds-a-contextbar_border); }
        `);

      /*
      * Attach global and local CSS rules
      */

        if (NDSContextbar.globalCSS.cssRules.length) {
          this.root.adoptedStyleSheets = [
            NDSContextbar.globalCSS,
            NDSContextbar.componentCSS,
          ];
        } else {
          this.loadStyles(NDSContextbar.globalCSSPath);
        }
    }

  // ================================================================
  // Lifecycle: when element is connected to the DOM
  
    connectedCallback() {
      // console.log("Element added to page.");
      this.render();
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
      if(attr == "context") {
        this.render();
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
            NDSContextbar.globalCSS.replaceSync(css);

            this.shadowRoot.adoptedStyleSheets = [
              // Always load global CSS before component CSS
              NDSContextbar.globalCSS,
              NDSContextbar.componentCSS,
            ];

            this.removeAttribute("hidden"); // Prevent FOUC
          } catch (error) {
            console.error("Couldn't load styles:", error);
          }
        }

      /*
      * Render
      */

        render() {
          const context = this.getAttribute("context") || "gear";
          this.shadowRoot.innerHTML = this.templates[context] || this.templates.gear;
        }
}

// ================================================================
// Definition
customElements.define("nds-contextbar", NDSContextbar);




