export class NDSMenubar extends HTMLElement {

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
            <ul>
              <li>File</li>
              <li>Edit</li>
              <li>View</li>
              <li>Window</li>
              <li>Help</li>
            </ul>
          </section>
        `
      
      /*
      * Attach template to shadow
      */

        const shadow = this.attachShadow({ mode: "open" });
        shadow.innerHTML = template;

        // Set up component CSS styles
        NDSMenubar.componentCSS.replaceSync(`
          section {
            background: var(--nds-a-os-menubar_background);
            display: flex;
            gap: var(--nds-a-os-menubar_gap);
            padding: var(--nds-a-os-menubar-padding-y) var(--nds-a-os-menubar-padding-x);
            width: 100%;
            
          }

          ul{
            display: flex;
            font-size: var(--nds-a-os-menubar_font-size);
            gap: var(--nds-a-os-menubar-list_gap);
            line-height: var(--nds-mercury);
            list-style: none;
          }
        `);

      /*
      * Attach global and local CSS rules
      */

        if (NDSMenubar.globalCSS.cssRules.length) {
          this.root.adoptedStyleSheets = [
            NDSMenubar.globalCSS,
            NDSMenubar.componentCSS,
          ];
        } else {
          this.loadStyles(NDSMenubar.globalCSSPath);
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
            NDSMenubar.globalCSS.replaceSync(css);

            this.shadowRoot.adoptedStyleSheets = [
              // Always load global CSS before component CSS
              NDSMenubar.globalCSS,
              NDSMenubar.componentCSS,
            ];

            this.removeAttribute("hidden"); // Prevent FOUC
          } catch (error) {
            console.error("Couldn't load styles:", error);
          }
        }
}

// ================================================================
// Definition
customElements.define("nds-os-menubar", NDSMenubar);


