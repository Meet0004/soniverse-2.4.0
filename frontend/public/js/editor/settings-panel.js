// ----------------------------------- Settings Panel -----------------------------------
// ----------------------------------- Settings Panel -----------------------------------
// ----------------------------------- Settings Panel -----------------------------------
// ----------------------------------- Settings Panel -----------------------------------
// ----------------------------------- Settings Panel -----------------------------------
// ----------------------------------- Settings Panel -----------------------------------
// ----------------------------------- Settings Panel -----------------------------------
let SettingsActive = false;

document.getElementById('settings-panel').style.display = 'none';

document.getElementById('settings-mode').addEventListener('click', () => {
    const iconSidebar = document.getElementById('icon-sidebar');
    const mainContent = document.getElementById('main-content');
    const settingsPanel = document.getElementById('settings-panel');
    document.getElementById('converter-container').style.display = 'none';
    document.getElementById('converter-container').style.display = 'none';
    document.getElementById('AI-chatbot').style.display = 'none';
    if (!SettingsActive) {
        iconSidebar.classList.add('show-settings');
        mainContent.style.display = 'none';
        settingsPanel.style.display = 'flex';
        SettingsActive = true;
    } else {
        iconSidebar.classList.remove('show-settings');

        settingsPanel.style.display = 'none';
        mainContent.style.display = 'flex';
        SettingsActive = false;

    }

    initializeResizers();
});

function adjustDevPanels() {
    const html = document.getElementById('html-panel-dev');
    const css = document.getElementById('css-panel-dev');
    const js = document.getElementById('js-panel-dev');
    const preview = document.getElementById('preview-panel-dev');

    const allPanels = [html, css, js, preview];
    const visiblePanels = allPanels.filter(panel => !panel.classList.contains('hidden'));
    const panelWidth = 100 / visiblePanels.length + '%';

    visiblePanels.forEach(panel => {
        panel.style.flex = `0 0 ${panelWidth}`;
    });
}


// ----------------------------------- Settings Panel Content -----------------------------------
// ----------------------------------- Settings Panel Content -----------------------------------
// ----------------------------------- Settings Panel Content -----------------------------------
// ----------------------------------- Settings Panel Content -----------------------------------
// ----------------------------------- Settings Panel Content -----------------------------------
// ----------------------------------- Settings Panel Content -----------------------------------
// ----------------------------------- Settings Panel Content -----------------------------------

const settingsButtons = document.querySelectorAll('.eachsettings');
const contentPanels = document.querySelectorAll('.content');

settingsButtons.forEach(button => {
    button.addEventListener('click', function() {
        settingsButtons.forEach(btn => btn.classList.remove('active'));
        contentPanels.forEach(panel => panel.classList.remove('active'));
        this.classList.add('active');
        
        //data-settings attribute value
        const settingsNumber = this.getAttribute('data-settings');
        
        const activeContent = document.querySelector(`.content-${settingsNumber}`);
        if (activeContent) {
            activeContent.classList.add('active');
        }
    });
});
