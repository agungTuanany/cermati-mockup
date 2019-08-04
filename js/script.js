const panelsDOM = document.querySelector('.cermati-hl-panel__row');
const newsLetter = document.querySelector('.cermati-nl-panel');
const panelBtn = document.querySelector('.cermati-nl-panel-btn__close');

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
  };

};

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
  };

};

// trigger panels with event
document.addEventListener('DOMContentLoaded', () => {
  const ui = new UI();
  const panels = new Panels();

  // get all panels
  panels.getPanels().then(panels => {
    ui.displayPanels(panels);
  });
});

// scroll newsletter
function debounce (func, wait = 30, immediate = true) {
  let timeout;
  return function()  {
    let context = this,  args = arguments;
    let later = () => {
      timeout = null;
      if (!immediate) func.aply(context, args);
    };
    let callNow = immediate && ! timeout;
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
    if(callNow) func.apply(context, args);
  };
};

const checkSlide = (e) => {
  let windowY = window.scrollY;
  let innerHeight = window.innerHeight;
  let newsLetterHeight = newsLetter.scrollHeight;
  const newsLetterAt = (windowY + innerHeight) - newsLetterHeight / 2;
  const newsLetterBottom = newsLetter.offsetTop + newsLetterHeight;
  const isHalfShown = newsLetterAt > newsLetter.offsetTop;
  const isNotScrollPast = windowY < newsLetterBottom;

  isHalfShown && isNotScrollPast ? newsLetter.classList.add('active') : newsLetter.classList.remove('active');


  /* retrieve newsletter position */
  //console.log(newsLetterHeight)
  //console.log(`newsLetterAt: ${newsLetterAt}`);
  //console.log(isHalfShown);
  //console.log(`newsLetterHeight ${newsLetterHeight}`);
  //console.log(`newsLetterBottom ${newsLetterBottom}`);
}
window.addEventListener('scroll', debounce(checkSlide));

const panelClick = () => {
  newsLetter.style.display === 'none' ? newsletter.style.display = 'block' : newsLetter.style.transform = 'translateX(-680px)';
}

panelBtn.addEventListener('click', panelClick);

