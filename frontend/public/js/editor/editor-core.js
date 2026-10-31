

let editor = document.getElementById("editor");
const enteredData = document.getElementById("input");
const output = document.getElementById("Output");
let language = document.getElementById("language");
const extension = document.getElementById("extension");

let editorInstance;
editorInstance = CodeMirror.fromTextArea(editor, {
    lineNumbers: true,
    theme: 'neo',
    mode: 'python',
    indentUnit: 4,
    tabSize: 4,
    lineWrapping: true,
    autoCloseBrackets: true,
    matchBrackets: true,
    autofocus: true,
    gutters: ["CodeMirror-linenumbers", "breakpoints"]
});

editorInstance.setSize(null, "100%");

document.addEventListener('DOMContentLoaded', function() {
    
    document.getElementById('main-content').style.display = 'none';
    document.getElementById('container-dev').style.display = 'none';
    document.getElementById('settings-panel').style.display = 'none';
    document.getElementById('AI-chatbot').style.display = 'none';
    document.getElementById('converter-container').style.display = 'none';
    applyNeoTheme();
    initParticles();
    initTypingAnimation();
    document.getElementById('enter-editor-btn').addEventListener('click', function() {
        console.log("Enter button clicked");
        document.getElementById('welcome-page-wp').style.display = 'none';

        const mainContent = document.getElementById('main-content');
        mainContent.style.display = 'flex';
        mainContent.style.flexDirection = 'column';
        mainContent.style.width = 'calc(100vw - 50px)';
        mainContent.style.height = 'calc(100vh)';

        const topSection = document.getElementById('top-section');
        topSection.style.display = 'flex';
        topSection.style.flex = '1';

        const bottomSection = document.getElementById('bottom-section');
        bottomSection.style.display = 'flex';

        window.dispatchEvent(new Event('resize'));

        initializeResizers();
        applyNeoTheme();
    });
});
