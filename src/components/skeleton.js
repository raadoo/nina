export class NDSElement extends HTMLElement {

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

        `
      
      /*
      * Attach template to shadow
      */

        const shadow = this.attachShadow({ mode: "open" });
        shadow.innerHTML = template;

        // Set up component CSS styles
        NDSElement.componentCSS.replaceSync(`

        `);

      /*
      * Attach global and local CSS rules
      */

        if (NDSElement.globalCSS.cssRules.length) {
          this.root.adoptedStyleSheets = [
            NDSElement.globalCSS,
            NDSElement.componentCSS,
          ];
        } else {
          this.loadStyles(NDSElement.globalCSSPath);
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
      if(attr == "variant" && updated == "new") {
        const element = this.shadowRoot.querySelector("element");
        if (element) {
          if (updated === "new") {
            element.classList.add("new");
          } else {
            element.classList.remove("new");
          }
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
            NDSElement.globalCSS.replaceSync(css);

            this.shadowRoot.adoptedStyleSheets = [
              // Always load global CSS before component CSS
              NDSElement.globalCSS,
              NDSElement.componentCSS,
            ];

            this.removeAttribute("hidden"); // Prevent FOUC
          } catch (error) {
            console.error("Couldn't load styles:", error);
          }
        }
}

// ================================================================
// Definition
customElements.define("nds-element", NDSElement);




