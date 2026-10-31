// ----------------------------------- Developer Mode -----------------------------------
// ----------------------------------- Developer Mode -----------------------------------
// ----------------------------------- Developer Mode -----------------------------------
// ----------------------------------- Developer Mode -----------------------------------
// ----------------------------------- Developer Mode -----------------------------------
// ----------------------------------- Developer Mode -----------------------------------
// ----------------------------------- Developer Mode -----------------------------------
document.getElementById('container-dev').style.display = 'none';
let DevModeActive = false;

document.getElementById('dev-mode').addEventListener('click',  () => {
    const iconSidebar = document.getElementById('icon-sidebar');
    const mainContent = document.getElementById('main-content');
    const devContainer = document.getElementById('container-dev');
    document.getElementById('converter-container').style.display = 'none';
    document.getElementById('AI-chatbot').style.display = 'none';
    AIModeActive = false;
    
    if (!DevModeActive) {
        iconSidebar.classList.add('show-dev');

        // Switch views
        mainContent.style.display = 'none';
        devContainer.style.display = 'flex';
        DevModeActive = true;
    } else {
        iconSidebar.classList.remove('show-dev');

        // Exit dev mode
        devContainer.style.display = 'none';
        mainContent.style.display = 'flex';
        DevModeActive = false;

    }

    // Always reinitialize resizers after switching modes
    initializeResizers();
});
