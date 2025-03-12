export class NDSLayout extends HTMLElement {

  // ================================================================
  // Instantiate global and local CSS objects

    static globalCSSPath = "/css/style.css";
    static globalCSS = new CSSStyleSheet();
    static componentCSS = new CSSStyleSheet();

  // ================================================================
  // Reactive attributes
  
    static observedAttributes = [
      "layout"
    ];

  // ================================================================
  // Init class

    constructor() {
      super();

      /*
      * Set up markup template
      */

        const template = `
          <div class="layout">
            <div class="menubar">
              <slot name="menubar"></slot>
            </div>
            <div class="sidebar">
              <slot name="sidebar"></slot>
            </div>
            <div class="main">
              <div class="contextbar">
                <slot name="contextbar"></slot>
              </div>
              <div class="content">
                <slot name="main"></slot>
              </div>
            </div>
            <div class="taskbar">
              <slot name="taskbar"></slot>
            </div>
          </div>
        `
      
      /*
      * Attach template to shadow
      */

        const shadow = this.attachShadow({ mode: "open" });
        shadow.innerHTML = template;

        // Set up component CSS styles
        NDSLayout.componentCSS.replaceSync(`
          .layout {
            display: grid;
            gap: 0;
            grid-template-rows: 
              [nds-layout-menubar-start] auto [nds-layout-menubar-end] 
              0
              [nds-layout-main-start] 1fr [nds-layout-main-end]
              0
              [nds-layout-taskbar-start] auto [nds-layout-taskbar-end]
            ;
            grid-template-columns: 
              [nds-layout-window-start]
              0
              [nds-layout-sidebar-start] var(--nds-a-sidebar_width) [nds-layout-sidebar-end]
              var(--nds-a-sidebar_border-size)
              [nds-layout-main-start] 1fr [nds-layout-main-end]
              0
              [nds-layout-window-end]
            ;
            height: 100%;
            width: 100%; }

          .menubar {
            grid-row: nds-layout-menubar;
            grid-column: nds-layout-window; }

          .sidebar {
            display: flex;
            grid-row: nds-layout-main;
            grid-column: nds-layout-sidebar;
            position: relative; }

            .sidebar:after{
              background: var(--nds-a-sidebar_border);
              bottom: 0;
              content: '';
              display: flex;
              left: 100%;
              position: absolute;
              top: 0;
              width: var(--nds-a-sidebar_border-size); }

          .taskbar {
            grid-row: nds-layout-taskbar;
            grid-column: nds-layout-window; }

          .main {
            display: grid;
            grid-row: nds-layout-main;
            grid-column: nds-layout-main;

            grid-template-rows: 
              [nds-layout-context-start] auto [nds-layout-context-end]
              0
              [nds-layout-content-start] 1fr [nds-layout-content-end]
            ;

            grid-template-columns: 
              [nds-layout-content-start] 1fr [nds-layout-content-end]
            ;

            position: relative; }

          .main:after {
            background: radial-gradient(circle, var(--nds-primary-20-translucent) 0%, transparent 60%);
            content: '';
            display: block;
            inset: 0;
            margin-top: -70vh;
            position: absolute;
            z-index: 0; }

          .contextbar { 
            grid-row: nds-layout-context;
            grid-column: nds-layout-content;
            position: relative;
            z-index: 1; }

          .main .content { 
            grid-row: nds-layout-content;
            grid-column: nds-layout-content;
            position: relative;
            z-index: 1; }
        `);

      /*
      * Attach global and local CSS rules
      */

        if (NDSLayout.globalCSS.cssRules.length) {
          this.root.adoptedStyleSheets = [
            NDSLayout.globalCSS,
            NDSLayout.componentCSS,
          ];
        } else {
          this.loadStyles(NDSLayout.globalCSSPath);
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
      if(attr == "layout" && updated == "gear") {
        const element = this.shadowRoot.querySelector(".layout");
        if (element) {
          element.classList.add("gear");
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
            NDSLayout.globalCSS.replaceSync(css);

            this.shadowRoot.adoptedStyleSheets = [
              // Always load global CSS before component CSS
              NDSLayout.globalCSS,
              NDSLayout.componentCSS,
            ];

            this.removeAttribute("hidden"); // Prevent FOUC
          } catch (error) {
            console.error("Couldn't load styles:", error);
          }
        }
}

// ================================================================
// Definition
customElements.define("nds-layout", NDSLayout);





