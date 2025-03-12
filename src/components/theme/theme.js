export class NDSTheme extends HTMLElement {

  // ================================================================
  // Theme paths

    static themes = {
      Default: 'theme-persian.css',
      RedEye: 'theme-redeye.css',
    };

  // ================================================================
  // Reactive attributes
  
    static observedAttributes = [
    ];

  // ================================================================
  // Init class

    constructor() {
      super();
      this.attachShadow({ mode: 'open' });

      /*
      * Create link element for the theme file
      */

        const pathToThemes = './components/theme/css/';

        this.link = document.createElement('link');
        this.link.rel = 'preload stylesheet';
        this.link.as = 'style';
        document.head.appendChild(this.link);

        this.select = document.createElement('select');
        Object.entries(NDSTheme.themes).forEach(([name, file]) => {
          const option = document.createElement('option');
          option.value = file;
          option.textContent = name;
          this.select.appendChild(option);
        });

        this.select.addEventListener('change', () => this.updateTheme(pathToThemes));
        this.loadStoredTheme(pathToThemes);

        this.shadowRoot.innerHTML = `
          <style>
            select {
              padding: 10px;
              font-size: 16px;
            }
          </style>
          <label for="theme-select">Choose a theme: </label>
        `;
        this.shadowRoot.appendChild(this.select);

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
      * Load and update themes
      */

        loadStoredTheme(path) {
          const savedTheme = localStorage.getItem('selectedTheme') || NDSTheme.themes.Default;
          this.select.value = savedTheme;
          this.link.href = `${path}${savedTheme}`;

          this.removeAttribute("hidden"); // Prevent FOUC
        }

        updateTheme(path) {
          const selectedTheme = this.select.value;
          this.link.href = `${path}${selectedTheme}`;
          localStorage.setItem('selectedTheme', selectedTheme);

          this.removeAttribute("hidden"); // Prevent FOUC
        }
}

// ================================================================
// Definition
customElements.define('nds-theme-switcher', NDSTheme);


