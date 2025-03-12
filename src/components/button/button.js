export class NDSButton extends HTMLElement {

  // ================================================================
  // Instantiate global and local CSS objects

    static globalCSSPath = "/css/style.css";
    static globalCSS = new CSSStyleSheet();
    static componentCSS = new CSSStyleSheet();

  // ================================================================
  // Reactive attributes
  
    static observedAttributes = [
      "disabled", 
      "href", 
      "icon", 
      "target", 
      "variant",
      "current",
      "hardware"
    ];

  // ================================================================
  // Init class

    constructor() {
      super();

      /*
      * Set up markup template
      */

        const template = `
          <button>
            <slot name="icon"></slot>
            <slot name="label"></slot>
          </button>
        `
      
      /*
      * Attach template to shadow
      */

        const shadow = this.attachShadow({ mode: "open" });
        shadow.innerHTML = template;

        // Set up component CSS styles
        NDSButton.componentCSS.replaceSync(`
          button{

          }

          /* ================================================================ */
          /* VARIANT: CHICLET */

            button.chiclet {
              background: var(--nds-a-button-chiclet_background);
              border-top: var(--nds-a-button-chiclet_bordersize) solid var(--nds-a-button-chiclet_border);
              border-radius: 0;
              color: var(--nds-a-button-chiclet_label);
              flex-direction: column;
              height: var(--nds-a-button-chiclet_size);
              width: var(--nds-a-button-chiclet_size); }

            button.chiclet:hover {
              background: var(--nds-a-button-chiclet-hover_background);
              border-color: var(--nds-a-button-chiclet-hover_border); }

            button.chiclet:active,
            button.chiclet.current {
              background: var(--nds-a-button-chiclet-active_background);
              border-color: var(--nds-a-button-chiclet-active_border);
              color: var(--nds-a-button-chiclet-active_label); }

          /* ================================================================ */
          /* VARIANT: CONTEXT */

            button.context {
              background: var(--nds-a-button-context_background);
              border-right: var(--nds-a-contextbar_border-size) solid var(--nds-a-contextbar_border);
              border-radius: 0;
              font-weight: var(--nds-a-button-context_font-weight);
              padding: var(--nds-a-button-context_padding-y) var(--nds-a-button-context_padding-x);
              position: relative; }

              button.context.hardware-active:after {
                background: var(--nds-a-button-context-active_background);
                border-radius: calc(var(--nds-a-button-context-active_size) / 2);
                box-shadow: 0 0 var(--nds-a-button-context-active_blur) var(--nds-a-button-context-active_spread) var(--nds-a-button-context-active_background);
                content: '';
                display: inline-flex;
                height: var(--nds-a-button-context-active_size);
                width: var(--nds-a-button-context-active_size); }

          /* ================================================================ */
          /* VARIANT: GHOST */
          
            button.ghost { background: none transparent; }

          /* ================================================================ */
          /* VARIANT: WINDOWS TASKBAR */

            button.taskbar {
              background: var(--nds-a-button-os-taskbar_background);
              border-radius: 0;
              border-bottom: var(--nds-ceres) solid var(--nds-a-button-os-taskbar_border);
              padding: calc(var(--nds-luna) / 2) var(--nds-luna); }

        `);

      /*
      * Attach global and local CSS rules
      */

        if (NDSButton.globalCSS.cssRules.length) {
          this.root.adoptedStyleSheets = [
            NDSButton.globalCSS,
            NDSButton.componentCSS,
          ];
        } else {
          this.loadStyles(NDSButton.globalCSSPath);
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

      /*
      * Button variants
      */
      if(attr == "variant") {
        const button = this.shadowRoot.querySelector("button");
        if (button) {
          button.classList.add(updated);
        }
      }
      /*
      * Current page state
      */
      if(attr == "current") {
        const button = this.shadowRoot.querySelector("button");
        if (button) {
          button.classList.add('current');
        }
      }
      /*
      * Hardware state
      */
      if(attr == "hardware" && updated == "active") {
        const button = this.shadowRoot.querySelector("button");
        if (button) {
          button.classList.add('hardware-active');
        }
      }
      /*
      * URL target
      */
      if(attr == "href") {
        const url = updated+".html";
        const button = this.shadowRoot.querySelector("button");
        if (button) {
          button.addEventListener("click", function(){
            window.location.href = url;
          })
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
            NDSButton.globalCSS.replaceSync(css);

            this.shadowRoot.adoptedStyleSheets = [
              // Always load global CSS before component CSS
              NDSButton.globalCSS,
              NDSButton.componentCSS,
            ];

            this.removeAttribute("hidden"); // Prevent FOUC
          } catch (error) {
            console.error("Couldn't load styles:", error);
          }
        }
}

// ================================================================
// Definition
customElements.define("nds-button", NDSButton);




