export class NDSAppLoader extends HTMLElement {

  // ================================================================
  // Init class

    constructor() {
      super();

      /*
      * Set up markup template
      */

        const template = `
          <div id="loader">Loading...</div>
        `
      
      /*
      * Attach template to shadow
      */

        const shadow = this.attachShadow({ mode: "open" });
        shadow.innerHTML = template;

        const style = document.createElement('style');
        style.textContent = `
          #loader {
            position: fixed;
            inset: 0;
            display: flex;
            justify-content: center;
            align-items: center;
            background: #111;
            color: white;
            font-size: 1.5rem;
            z-index: 9999;
            opacity: 1;
            transition: opacity 0.2s ease-in-out;
            transition-delay: 0.2s;
          }

          /* Hide body initially to avoid FOUC */
          body {
            visibility: hidden;
            overflow: hidden;
          }
        `;

    this.shadowRoot.append(style, this.shadowRoot.querySelector("#loader"));

        this.waitForComponents();
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

  waitForComponents() {
    const startTime = performance.now();

    const checkComponents = (timestamp) => {
      const customElementsOnPage = [...document.querySelectorAll("*")].filter(el =>
        el.tagName.includes("-")
      );

      const allDefined = customElementsOnPage.every(el =>
        window.customElements.get(el.tagName.toLowerCase())
      );

      let stylesLoaded = [...document.styleSheets].every(sheet => {
        try {
          return sheet.cssRules; // Accessing cssRules will throw if not loaded
        } catch {
          return false;
        }
      });

      if (allDefined && stylesLoaded) {
        const elapsed = timestamp - startTime;
        if (elapsed >= 500) {
          this.hideLoader();
        } else {
          requestAnimationFrame(checkComponents);
        }
      } else {
        requestAnimationFrame(checkComponents);
      }
    };

    requestAnimationFrame(checkComponents);
  }

  hideLoader() {
    const loader = this.shadowRoot.querySelector("#loader");

    const fadeOut = () => {
      loader.style.opacity = "0";

      requestAnimationFrame(() => {
        requestAnimationFrame(() => {
          document.body.style.visibility = "visible";
          document.body.style.overflow = "auto";
          loader.remove();
        });
      });
    };

    fadeOut();
  }

}

// ================================================================
// Definition
customElements.define("nds-app-loader", NDSAppLoader);




