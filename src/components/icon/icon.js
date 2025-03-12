export class NDSIcon extends HTMLElement {

  // ================================================================
  // Instantiate global and local CSS objects

  static globalCSSPath = "/css/style.css";
  static globalCSS = new CSSStyleSheet();
  static componentCSS = new CSSStyleSheet();
  static iconPath = "/components/icon/svg/";
  static iconDefaultColor = "--nds-icon-default-color";

  // ================================================================
  // Reactive attributes

  static observedAttributes = ["icon", "size", "color"];

  // ================================================================
  // Init class

  constructor() {
    super();

    this.sizes = {
      small: "14px",
      medium: "18px",
      base: "20px",
      large: "28px",
      bigger: "40px",
    };

      /*
      * Set up markup template
      */

        const template = document.createElement("template");
        template.innerHTML = `
          <div id="icon"></div>
        `;
      
      /*
      * Attach template to shadow
      */

        const shadow = this.attachShadow({ mode: "open" });
        shadow.appendChild(template.content.cloneNode(true));

        this.container = this.shadowRoot.querySelector("#icon");

        // Set up component CSS styles
        NDSIcon.componentCSS.replaceSync(`
          div {
            height: ${this.sizes.base};
            width: ${this.sizes.base}; }

          svg {
            fill: currentColor;
            stroke: currentColor;
            height: 100%;
            width: 100%; }
        `);

      /*
      * Attach global and local CSS rules
      */

        if (NDSIcon.globalCSS.cssRules.length) {
          this.shadowRoot.adoptedStyleSheets = [
            NDSIcon.globalCSS,
            NDSIcon.componentCSS,
          ];
        } else {
          this.loadStyles(NDSIcon.globalCSSPath);
        }

      this.loadIcon();
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
    if (attr === "icon") {
      this.icon = updated;
      this.loadIcon(NDSIcon.iconPath);
    } else if (attr === "size") {
      this.container.style.width = this.sizes[updated] || this.sizes.base;
      this.container.style.height = this.sizes[updated] || this.sizes.base;
    } else if (attr === "color") {
      this.color = updated;
      this.updateIconColor();
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
        NDSIcon.globalCSS.replaceSync(css);

        this.shadowRoot.adoptedStyleSheets = [
          // Always load global CSS before component CSS
          NDSIcon.globalCSS,
          NDSIcon.componentCSS,
        ];

        this.removeAttribute("hidden"); // Prevent FOUC
      } catch (error) {
        console.error("Couldn't load styles:", error);
      }
    }

  /*
   * Load icon from file
   */

    async loadIcon(path) {
      if (!this.icon) return;
      try {
        const response = await fetch(`${path}${this.icon}.svg`);
        if (!response.ok) throw new Error(`${this.icon} icon not found`);
        let svgText = await response.text();

        // Replace ${color} placeholder with CSS variable
        svgText = svgText.replace(/\$\{color\}/g, `var(${this.color || NDSIcon.iconDefaultColor})`);

        this.container.innerHTML = svgText;
      } catch (error) {
        console.error("Error loading icon:", error);
      }
    }

  updateIconColor() {
    if (this.container.querySelector("svg")) {
      this.container.querySelector("svg").style.fill = `var(${this.color})`;
    }
  }
  
}

// ================================================================
// Definition
customElements.define("nds-icon", NDSIcon);
