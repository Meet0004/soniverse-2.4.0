// ----------------------------------- Programmer Mode -----------------------------------
// ----------------------------------- Programmer Mode -----------------------------------
// ----------------------------------- Programmer Mode -----------------------------------
// ----------------------------------- Programmer Mode -----------------------------------
// ----------------------------------- Programmer Mode -----------------------------------
// ----------------------------------- Programmer Mode -----------------------------------
// ----------------------------------- Programmer Mode -----------------------------------
const setupVerticalResize = (divider, leftPanel, rightPanel) => {
    let isDragging = false;
    let startX, leftWidth, rightWidth;

    divider.addEventListener('mousedown', (e) => {
        isDragging = true;
        startX = e.clientX;
        leftWidth = leftPanel.offsetWidth;
        rightWidth = rightPanel.offsetWidth;
        document.body.style.cursor = 'col-resize';
        document.body.style.userSelect = 'none';
        divider.style.background = '#aaa';
        e.preventDefault();
    });

    const handleMouseMove = (e) => {
        if (!isDragging) return;
        
        const dx = e.clientX - startX;
        const container = divider.parentNode;
        const containerWidth = container.offsetWidth;
        
        const newLeftWidth = leftWidth + dx;
        const newRightWidth = rightWidth - dx;
        
        const leftMin = parseInt(leftPanel.style.minWidth) || 100;
        const rightMin = parseInt(rightPanel.style.minWidth) || 100;
        
        if (newLeftWidth >= leftMin && newRightWidth >= rightMin) {
          leftPanel.style.flex = '0 0 ' + newLeftWidth + 'px';
          rightPanel.style.flex = '0 0 ' + newRightWidth + 'px';
        }
    };

    const handleMouseUp = () => {
        isDragging = false;
        document.body.style.cursor = '';
        document.body.style.userSelect = '';
        divider.style.background = '';
    };

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mouseup', handleMouseUp);
};

const setupHorizontalResize = (divider, topSection, bottomSection) => {
    let isDragging = false;
    let startY, topHeight, bottomHeight;

    divider.addEventListener('mousedown', (e) => {
      isDragging = true;
      startY = e.clientY;
      topHeight = topSection.offsetHeight;
      bottomHeight = bottomSection.offsetHeight;
      document.body.style.cursor = 'row-resize';
      document.body.style.userSelect = 'none';
      
      divider.style.background = '#aaa';
      
      e.preventDefault();
    });

    const handleMouseMove = (e) => {
        if (!isDragging) return;
        
        const dy = e.clientY - startY;
        const container = divider.parentNode;
        const containerHeight = container.offsetHeight;
        
        const newTopHeight = topHeight + dy;
        const newBottomHeight = bottomHeight - dy;
        
        const minHeight = 50;
        
        if (newTopHeight >= minHeight && newBottomHeight >= minHeight) {
            topSection.style.flex = '0 0 ' + newTopHeight + 'px';
            bottomSection.style.height = newBottomHeight + 'px';
        }
    };

    const handleMouseUp = () => {
        isDragging = false;
        document.body.style.cursor = '';
        document.body.style.userSelect = '';
        divider.style.background = '';
    };

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mouseup', handleMouseUp);
};

function initializeResizers() {
    // vertical resizers
    setupVerticalResize(document.getElementById('divider1'),
                      document.getElementById('directory-panel'),
                      document.getElementById('code-panel'));
  
    setupVerticalResize(document.getElementById('divider4'),
                      document.getElementById('output-panel'),
                      document.getElementById('input-panel'));
  
    // horizontal resizer
    setupVerticalResize(
            document.getElementById('divider1-dev'),
      document.getElementById('directory-panel-dev'),
      document.getElementById('html-panel-dev')
    );

    setupVerticalResize(
      document.getElementById('divider2-dev'),
      document.getElementById('html-panel-dev'),
      document.getElementById('css-panel-dev')
    );

    setupHorizontalResize(
      document.getElementById('divider3-dev'),
      document.getElementById('top-section-dev'),
      document.getElementById('js-panel-dev')
    );

    setupVerticalResize(
      document.getElementById('divider-main-dev'),
      document.getElementById('left-side-dev'),
      document.getElementById('right-side-dev')
    );
}
initializeResizers();

// ----------------------------------- icons and it's behavior -----------------------------------
// ----------------------------------- icons and it's behavior -----------------------------------
// ----------------------------------- Icons and it's behavior -----------------------------------
// ----------------------------------- Icons and it's behavior -----------------------------------
// ----------------------------------- Icons and it's behavior -----------------------------------
// ----------------------------------- Icons and it's behavior -----------------------------------
// ----------------------------------- Icons and it's behavior -----------------------------------
let isSettings = false;
let AIModeActive = false;
let isConverter = false; // or false depending on the initial state

const icons = document.querySelectorAll('.icon');
icons.forEach(icon => {
    icon.addEventListener('click', () => {
        icons.forEach(i => i.classList.remove('active'));
        
        icon.classList.add('active');
        
        const title = icon.getAttribute('data-action');
        console.log(`${title} icon clicked`);
        
        if (title === "File Explorer") {
            document.getElementById('directory-panel').classList.toggle('hidden');
        }
        if(title === "File Explorer Dev"){
            document.getElementById('directory-panel-dev').classList.toggle('hidden');
        }
        // if  (title === "HTML") {
        //     document.getElementById('html-panel-dev').classList.toggle('hidden');
        // }
        if (title === "CSS") {
            document.getElementById('css-panel-dev').classList.toggle('hidden');
        }
        if (title === "JS") {
            document.getElementById('js-panel-dev').classList.toggle('hidden');
        }
        // if (title === "Preview") {
        //     document.getElementById('preview-panel-dev').classList.toggle('hidden');
        //     
        // }

        if (title === "AI") {
            const aiPanel = document.getElementById('AI-chatbot');
            const mainContent = document.getElementById('main-content');
            const devContainer = document.getElementById('container-dev');
            const settingsPanel = document.getElementById('settings-panel');
            const iconSidebar = document.getElementById('icon-sidebar');
            AIModeActive = !AIModeActive;
        
            if (AIModeActive) {
                aiPanel.style.display = 'flex';
                mainContent.style.display = 'none';
                devContainer.style.display = 'none';
                settingsPanel.style.display = 'none';
        
                DevModeActive = false;
                SettingsActive = false;
        
                iconSidebar.classList.remove('show-dev');
                iconSidebar.classList.remove('show-settings');
            } else {
                aiPanel.style.display = 'none';
                mainContent.style.display = 'flex';
            }
        
            initializeResizers(); // optional
        }
        
        if(title === 'Compile'){
            compilation();
            document.getElementById('compilekaDiv').style.display = 'block';
            document.getElementById('outputkadiv').style.display = 'none';
        }
        if(title === 'Run'){
            runCode();
            document.getElementById('compilekaDiv').style.display = 'none';
            document.getElementById('outputkadiv').style.display = 'block';
        }
        if(title === 'Sample-HTML'){
            htmlEditor.setValue(sampleCode['html']);
            cssEditor.setValue(sampleCode['css']);
            jsEditor.setValue(sampleCode['js']);
        }

        if(title === 'Save'){
            saveCode();
        }
        if(title === 'converter'){
            isConverter = !isConverter;
            if(isConverter) {
                document.getElementById('converter-container').style.display = 'flex';
                document.getElementById('container-dev').style.display = 'none';
                document.getElementById('settings-panel').style.display = 'none';
            } else {
                document.getElementById('converter-container').style.display = 'none';
                document.getElementById('container-dev').style.display = 'flex';
            }
        }

    });
});
