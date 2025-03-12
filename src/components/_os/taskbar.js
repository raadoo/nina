export class NDSTaskbar extends HTMLElement {

  // ================================================================
  // Instantiate global and local CSS objects

    static globalCSSPath = "/css/style.css";
    static globalCSS = new CSSStyleSheet();
    static componentCSS = new CSSStyleSheet();

  // ================================================================
  // Reactive attributes
  
    static observedAttributes = [
    ];

  // ================================================================
  // Init class

    constructor() {
      super();

      /*
      * Set up markup template
      */

        const template = `
          <section>
            <nds-button hidden icon="os-windows" variant="ghost">
              <span slot="icon">
                <nds-icon icon="os-windows" size="small" color="--nds-neutral-50"></nds-icon>
              </span>
            </nds-button>
            <input type="text" placeholder="Type here to search" />
            <nds-button hidden variant="taskbar">
              <span slot="icon">
                <nds-icon icon="logo" size="large" color="--nds-neutral-50"></nds-icon>
              </span>
            </nds-button>
          </section>
        `
      
      /*
      * Attach template to shadow
      */

        const shadow = this.attachShadow({ mode: "open" });
        shadow.innerHTML = template;

        // Set up component CSS styles
        NDSTaskbar.componentCSS.replaceSync(`
          section {
            background: var(--nds-a-os-taskbar_background);
            display: flex;
            width: 100%; }

          input {
            background: var(--nds-a-os-taskbar-input_background);
          }
        `);

      /*
      * Attach global and local CSS rules
      */

        if (NDSTaskbar.globalCSS.cssRules.length) {
          this.root.adoptedStyleSheets = [
            NDSTaskbar.globalCSS,
            NDSTaskbar.componentCSS,
          ];
        } else {
          this.loadStyles(NDSTaskbar.globalCSSPath);
        }
    }

  // ================================================================
  // Lifecycle: when element is connected to the DOM
  
    connectedCallback() {
      //console.log("Element added to page.");
    }

  // ================================================================
  // Lifecycle: when element is disconnected to the DOM
  
    disconnectedCallback() {
      //console.log("Element removed to page.");
    }

  // ================================================================
  // Lifecycle: when element is attached to a new DOM
  
    adoptedCallback() {
      //console.log("Element added to new page.");
    }

  // ================================================================
  // Lifecycle: when any of the observedAttributes change value

    attributeChangedCallback(attr, old, updated) {
      //console.log(`Attribute ${attr} has changed from ${old} to ${updated}.`);
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
            NDSTaskbar.globalCSS.replaceSync(css);

            this.shadowRoot.adoptedStyleSheets = [
              // Always load global CSS before component CSS
              NDSTaskbar.globalCSS,
              NDSTaskbar.componentCSS,
            ];

                  
            this.removeAttribute("hidden"); // Prevent FOUC
          } catch (error) {
            console.error("Couldn't load styles:", error);
          }
        }
}

// ================================================================
// Definition
customElements.define("nds-os-taskbar", NDSTaskbar);

