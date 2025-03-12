export function GearPage() {
  const page = document.createElement('div');
  page.innerHTML = `
    <nds-layout hidden>
      <div slot="menubar">
        <nds-os-menubar hidden></nds-os-menubar>
      </div>
      <div slot="sidebar">
        <nds-sidebar hidden current="gear"></nds-sidebar>
      </div>
      <div slot="contextbar">
        <nds-contextbar hidden context="gear"></nds-contextbar>
      </div>
      <div slot="main">
        
      </div>
      <div slot="taskbar">
        <nds-os-taskbar hidden></nds-os-taskbar>
      </div>
    </nds-layout>
  `;
  return page;
}
