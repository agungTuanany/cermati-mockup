const panelTitle = document.querySelector('.cermati-hl-panel__title');
const panelIcon = document.querySelector('.cermati-hl-panel__icon');
const panelDetails = document.querySelector('.cermati-hl-panel__detail');
const panelsDOM = document.querySelector('.cermati-hl-panel__row');

// getting the panel.json
class Panels {
  async getPanels() {
    try  {
      let result = await fetch('panel.json');
      let data = await result.json();
      let panels = data.items;
      panels = panels.map(item => {
        const { title, details, icon } = item.fields;
        const { id } = item.sys;
        return { id, title, details, icon };
      });
      return panels;
    } catch (err) {
      console.log(err)
    }
  }
}

// display single panel
class UI {
  displayPanels(panels) {
    let result = '';
    panels.forEach(panel => {
      result += `
        <!-- single panel -->
        <div class= 'col-lg-4 col-md-6 col-sm-12'>
          <div class='cermati-hl-single-panel'>
            <div class='cermati-hl-single-panel__header'>
              <h4 class='cermati-hl-single-panel__title'>${panel.title}</h4><i class='cermati-hl-single-panel__icon ${panel.icon}'></i>
              </div>
            <p class='cermati-hl-single-panel__detail'>${panel.details}</p>
          </div>
        </div>

        <!-- end of single panel -->

      `;
    });
    panelsDOM.innerHTML = result;
  }
}

// trigger panels with event
document.addEventListener('DOMContentLoaded', () => {
  const ui = new UI();
  const panels = new Panels();

  // get all panels
  panels.getPanels().then(panels => {
    ui.displayPanels(panels);
  })
});
