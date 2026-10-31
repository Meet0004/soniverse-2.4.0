// ----------------------------------------- settings ka kaam -----------------------------------------
// ----------------------------------------- settings ka kaam -----------------------------------------
// ----------------------------------------- settings ka kaam -----------------------------------------
// ----------------------------------------- settings ka kaam -----------------------------------------
// ----------------------------------------- settings ka kaam -----------------------------------------
// ----------------------------------------- settings ka kaam -----------------------------------------
// ----------------------------------------- settings ka kaam -----------------------------------------


// UI Elements
const themeSelector = document.getElementById('theme-selector');
const themeCSS = document.getElementById('theme-css');
const tabSizeInput = document.getElementById('tab-size');
const lineNumbersCheckbox = document.getElementById('line-numbers');
const lineWrappingCheckbox = document.getElementById('line-wrapping');
const autoCloseBracketsCheckbox = document.getElementById('auto-close-brackets');
const matchBracketsCheckbox = document.getElementById('match-brackets');
const applyBtn = document.getElementById('apply-settings');



// Apply and save settings
applyBtn.addEventListener('click', () => {
    const selectedTheme = 'neo';
    const tabSize = parseInt(tabSizeInput.value, 10);
    const lineNumbers = lineNumbersCheckbox.checked;
    const lineWrapping = lineWrappingCheckbox.checked;
    const autoCloseBrackets = autoCloseBracketsCheckbox.checked;
    const matchBrackets = matchBracketsCheckbox.checked;
    const feedback = document.querySelector('.apply-feedback-progMode');
    feedback.textContent = 'Applied!';
    feedback.classList.add('show');
    // Apply to CodeMirror
    editorInstance.setOption("theme", selectedTheme);
    editorInstance.setOption("tabSize", tabSize);
    editorInstance.setOption("indentUnit", tabSize);
    editorInstance.setOption("lineNumbers", lineNumbers);
    editorInstance.setOption("lineWrapping", lineWrapping);
    editorInstance.setOption("autoCloseBrackets", autoCloseBrackets);
    editorInstance.setOption("matchBrackets", matchBrackets);

    // Update CSS
    themeCSS.href = 'https://cdnjs.cloudflare.com/ajax/libs/codemirror/5.65.14/theme/neo.min.css';
    applyNeoTheme();

    // Save settings
    const settings = {
        theme: selectedTheme,
        tabSize,
        lineNumbers,
        lineWrapping,
        autoCloseBrackets,
        matchBrackets
    };
    localStorage.setItem('editor-settings', JSON.stringify(settings));
    console.log("Settings saved:", settings);

    setTimeout(() => {
        feedback.classList.remove('show');
    }, 2500);
});





// UI Elements for HTML Editor
const htmlTabSizeInput = document.getElementById('tab-size-htmlEditor');
const htmlLineNumbersCheckbox = document.getElementById('line-numbers-htmlEditor');
const htmlLineWrappingCheckbox = document.getElementById('line-wrapping-htmlEditor');
const htmlAutoCloseBracketsCheckbox = document.getElementById('auto-close-brackets-htmlEditor');
const htmlMatchBracketsCheckbox = document.getElementById('match-brackets-htmlEditor');
const htmlAutoCloseTagsCheckbox = document.getElementById('auto-close-tags-htmlEditor');

// UI Elements for CSS Editor
const cssTabSizeInput = document.getElementById('tab-size-cssEditor');
const cssLineNumbersCheckbox = document.getElementById('line-numbers-cssEditor');
const cssLineWrappingCheckbox = document.getElementById('line-wrapping-cssEditor');
const cssAutoCloseBracketsCheckbox = document.getElementById('auto-close-brackets-cssEditor');
const cssMatchBracketsCheckbox = document.getElementById('match-brackets-cssEditor');
const cssAutoCloseTagsCheckbox = document.getElementById('auto-close-tags-cssEditor');

// UI Elements for JS Editor
const jsTabSizeInput = document.getElementById('tab-size-jsEditor');
const jsLineNumbersCheckbox = document.getElementById('line-numbers-jsEditor');
const jsLineWrappingCheckbox = document.getElementById('line-wrapping-jsEditor');
const jsAutoCloseBracketsCheckbox = document.getElementById('auto-close-brackets-jsEditor');
const jsMatchBracketsCheckbox = document.getElementById('match-brackets-jsEditor');
const jsAutoCloseTagsCheckbox = document.getElementById('auto-close-tags-jsEditor');
const applyDeveloperSettingsBtn = document.getElementById('apply-developer-settings');
const developerSettingsFeedback = document.querySelector('.apply-feedback-developerSettings');

function applyEditorSettings(editor, controls, storageKey) {
    const settings = {
        theme: 'neo',
        tabSize: parseInt(controls.tabSize.value, 10),
        lineNumbers: controls.lineNumbers.checked,
        lineWrapping: controls.lineWrapping.checked,
        autoCloseBrackets: controls.autoCloseBrackets.checked,
        matchBrackets: controls.matchBrackets.checked,
        autoCloseTags: controls.autoCloseTags.checked
    };

    editor.setOption('theme', settings.theme);
    editor.setOption('tabSize', settings.tabSize);
    editor.setOption('indentUnit', settings.tabSize);
    editor.setOption('lineNumbers', settings.lineNumbers);
    editor.setOption('lineWrapping', settings.lineWrapping);
    editor.setOption('autoCloseBrackets', settings.autoCloseBrackets);
    editor.setOption('matchBrackets', settings.matchBrackets);
    editor.setOption('autoCloseTags', settings.autoCloseTags);
    localStorage.setItem(storageKey, JSON.stringify(settings));
}

applyDeveloperSettingsBtn.addEventListener('click', () => {
    applyEditorSettings(htmlEditor, {
        tabSize: htmlTabSizeInput,
        lineNumbers: htmlLineNumbersCheckbox,
        lineWrapping: htmlLineWrappingCheckbox,
        autoCloseBrackets: htmlAutoCloseBracketsCheckbox,
        matchBrackets: htmlMatchBracketsCheckbox,
        autoCloseTags: htmlAutoCloseTagsCheckbox
    }, 'html-editor-settings');

    applyEditorSettings(cssEditor, {
        tabSize: cssTabSizeInput,
        lineNumbers: cssLineNumbersCheckbox,
        lineWrapping: cssLineWrappingCheckbox,
        autoCloseBrackets: cssAutoCloseBracketsCheckbox,
        matchBrackets: cssMatchBracketsCheckbox,
        autoCloseTags: cssAutoCloseTagsCheckbox
    }, 'css-editor-settings');

    applyEditorSettings(jsEditor, {
        tabSize: jsTabSizeInput,
        lineNumbers: jsLineNumbersCheckbox,
        lineWrapping: jsLineWrappingCheckbox,
        autoCloseBrackets: jsAutoCloseBracketsCheckbox,
        matchBrackets: jsMatchBracketsCheckbox,
        autoCloseTags: jsAutoCloseTagsCheckbox
    }, 'js-editor-settings');

    developerSettingsFeedback.textContent = 'Applied to Developer Editor!';
    developerSettingsFeedback.classList.add('show');
    setTimeout(() => developerSettingsFeedback.classList.remove('show'), 2500);
});



// Load saved settings on startup
window.addEventListener('DOMContentLoaded', () => {
    const savedSettings = JSON.parse(localStorage.getItem('editor-settings'));
    if (savedSettings) {
        // Apply settings to CodeMirror
        editorInstance.setOption("theme", "neo");
        editorInstance.setOption("tabSize", savedSettings.tabSize);
        editorInstance.setOption("indentUnit", savedSettings.tabSize);
        editorInstance.setOption("lineNumbers", savedSettings.lineNumbers);
        editorInstance.setOption("lineWrapping", savedSettings.lineWrapping);
        editorInstance.setOption("autoCloseBrackets", savedSettings.autoCloseBrackets);
        editorInstance.setOption("matchBrackets", savedSettings.matchBrackets);
        themeCSS.href = 'https://cdnjs.cloudflare.com/ajax/libs/codemirror/5.65.14/theme/neo.min.css';

        // Update UI
        themeSelector.value = 'neo';
        tabSizeInput.value = savedSettings.tabSize;
        lineNumbersCheckbox.checked = savedSettings.lineNumbers;
        lineWrappingCheckbox.checked = savedSettings.lineWrapping;
        autoCloseBracketsCheckbox.checked = savedSettings.autoCloseBrackets;
        matchBracketsCheckbox.checked = savedSettings.matchBrackets;
        applyNeoTheme();
        console.log("Settings loaded:", savedSettings);
    }

    // Load HTML Editor settings
    const htmlSavedSettings = JSON.parse(localStorage.getItem('html-editor-settings'));
    if (htmlSavedSettings) {
        htmlEditor.setOption("theme", "neo");
        htmlEditor.setOption("tabSize", htmlSavedSettings.tabSize);
        htmlEditor.setOption("indentUnit", htmlSavedSettings.tabSize);
        htmlEditor.setOption("lineNumbers", htmlSavedSettings.lineNumbers);
        htmlEditor.setOption("lineWrapping", htmlSavedSettings.lineWrapping);
        htmlEditor.setOption("autoCloseBrackets", htmlSavedSettings.autoCloseBrackets);
        htmlEditor.setOption("matchBrackets", htmlSavedSettings.matchBrackets);
        htmlEditor.setOption("autoCloseTags", htmlSavedSettings.autoCloseTags);

        htmlTabSizeInput.value = htmlSavedSettings.tabSize;
        htmlLineNumbersCheckbox.checked = htmlSavedSettings.lineNumbers;
        htmlLineWrappingCheckbox.checked = htmlSavedSettings.lineWrapping;
        htmlAutoCloseBracketsCheckbox.checked = htmlSavedSettings.autoCloseBrackets;
        htmlMatchBracketsCheckbox.checked = htmlSavedSettings.matchBrackets;
        htmlAutoCloseTagsCheckbox.checked = htmlSavedSettings.autoCloseTags;
    }

    // Load CSS Editor settings
    const cssSavedSettings = JSON.parse(localStorage.getItem('css-editor-settings'));
    if (cssSavedSettings) {
        cssEditor.setOption("theme", "neo");
        cssEditor.setOption("tabSize", cssSavedSettings.tabSize);
        cssEditor.setOption("indentUnit", cssSavedSettings.tabSize);
        cssEditor.setOption("lineNumbers", cssSavedSettings.lineNumbers);
        cssEditor.setOption("lineWrapping", cssSavedSettings.lineWrapping);
        cssEditor.setOption("autoCloseBrackets", cssSavedSettings.autoCloseBrackets);
        cssEditor.setOption("matchBrackets", cssSavedSettings.matchBrackets);
        cssEditor.setOption("autoCloseTags", cssSavedSettings.autoCloseTags);

        cssTabSizeInput.value = cssSavedSettings.tabSize;
        cssLineNumbersCheckbox.checked = cssSavedSettings.lineNumbers;
        cssLineWrappingCheckbox.checked = cssSavedSettings.lineWrapping;
        cssAutoCloseBracketsCheckbox.checked = cssSavedSettings.autoCloseBrackets;
        cssMatchBracketsCheckbox.checked = cssSavedSettings.matchBrackets;
        cssAutoCloseTagsCheckbox.checked = cssSavedSettings.autoCloseTags;
    }

    // Load JS Editor settings
    const jsSavedSettings = JSON.parse(localStorage.getItem('js-editor-settings'));
    if (jsSavedSettings) {
        jsEditor.setOption("theme", "neo");
        jsEditor.setOption("tabSize", jsSavedSettings.tabSize);
        jsEditor.setOption("indentUnit", jsSavedSettings.tabSize);
        jsEditor.setOption("lineNumbers", jsSavedSettings.lineNumbers);
        jsEditor.setOption("lineWrapping", jsSavedSettings.lineWrapping);
        jsEditor.setOption("autoCloseBrackets", jsSavedSettings.autoCloseBrackets);
        jsEditor.setOption("matchBrackets", jsSavedSettings.matchBrackets);
        jsEditor.setOption("autoCloseTags", jsSavedSettings.autoCloseTags);

        jsTabSizeInput.value = jsSavedSettings.tabSize;
        jsLineNumbersCheckbox.checked = jsSavedSettings.lineNumbers;
        jsLineWrappingCheckbox.checked = jsSavedSettings.lineWrapping;
        jsAutoCloseBracketsCheckbox.checked = jsSavedSettings.autoCloseBrackets;
        jsMatchBracketsCheckbox.checked = jsSavedSettings.matchBrackets;
        jsAutoCloseTagsCheckbox.checked = jsSavedSettings.autoCloseTags;
    }
});





// Keep your existing actions array, but make sure the IDs match exactly what's in your HTML
const actions = [
    { id: 'compileIcon',   name: 'Compile',           shortcutElement: 'compileShortcut' },
    { id: 'runIcon',       name: 'Run',               shortcutElement: 'runShortcut' },
    { id: 'saveIcon',      name: 'Save',              shortcutElement: 'saveShortcut' },
    { id: 'dev-mode',      name: 'Dev Mode',          shortcutElement: 'devModeShortcut' },
    { id: 'ai-mode',       name: 'AI',                shortcutElement: 'aiModeShortcut' },
    { id: 'settings-mode', name: 'Settings',          shortcutElement: 'settingsModeShortcut' },
    { id: 'file-dev',      name: 'File Explorer Dev', shortcutElement: 'fileDevShortcut' },
    { id: 'css-icon',      name: 'CSS',               shortcutElement: 'cssIconShortcut' },
    { id: 'js-icon',       name: 'JavaScript',        shortcutElement: 'jsIconShortcut' },
    // { id: 'preview-icon',  name: 'Preview',           shortcutElement: 'previewIconShortcut' },
    { id: 'sampleDev',     name: 'Sample HTML',       shortcutElement: 'sampleDevShortcut' },
    { id: 'converter',     name: 'Converter',         shortcutElement: 'converterShortcut' }
];


// Apply a consistent click handler to ALL icons
actions.forEach(action => {
    const icon = document.getElementById(action.id);
    if (icon) {
        icon.addEventListener('click', () => {
            console.log(`Action triggered: ${action.name}`);
            
            // Add visual feedback
            icon.style.transform = 'scale(0.9)';
            setTimeout(() => {
                icon.style.transform = '';
            }, 200);
        });
    } else {
        console.warn(`Icon with ID '${action.id}' not found in the DOM`);
    }
});


let keybindings = {};
actions.forEach(action => keybindings[action.id] = null);

let isRecordingKey = false;
let currentRecordingType = null;

const keybindingsList = document.getElementById('keybindingsList');
const logOutput = document.querySelector('.log-output');

function saveKeybindingsToLocalStorage() {
    localStorage.setItem('customKeybindings', JSON.stringify(keybindings));
    logMessage('Keybindings saved to localStorage.', 'info');
}

function loadKeybindingsFromLocalStorage() {
    const saved = localStorage.getItem('customKeybindings');
    if (saved) {
        try {
            const parsed = JSON.parse(saved);
            for (const action of actions) {
                if (parsed[action.id]) {
                    keybindings[action.id] = parsed[action.id];
                }
            }
            logMessage('Keybindings loaded from localStorage.', 'info');
        } catch (e) {
            console.error('Failed to load keybindings:', e);
            logMessage('Failed to load saved keybindings.', 'error');
        }
    }
}

function generateKeybindingsUI() {
    keybindingsList.innerHTML = '';
    actions.forEach(action => {
        const row = document.createElement('div');
        row.className = 'keybind-row';

        const label = document.createElement('span');
        label.className = 'keybind-label';
        label.textContent = `${action.name}:`;

        const display = document.createElement('div');
        display.id = `${action.id}Keybind`;
        display.className = 'keybind-display';
        display.textContent = keybindings[action.id] ? getKeybindDisplayText(action.id) : 'Not Set';
        if (!keybindings[action.id]) display.classList.add('empty-keybind');

        const button = document.createElement('button');
        button.id = `change${capitalize(action.id)}Btn`;
        button.className = 'keybind-button';
        button.textContent = 'Set';
        button.addEventListener('click', () => startRecordingForKey(action.id));

        const controls = document.createElement('div');
        controls.className = 'keybind-controls';
        controls.appendChild(display);
        controls.appendChild(button);

        row.appendChild(label);
        row.appendChild(controls);
        keybindingsList.appendChild(row);
    });
}

function capitalize(str) {
    return str.charAt(0).toUpperCase() + str.slice(1);
}

function getKeybindDisplayText(actionId) {
    const kb = keybindings[actionId];
    if (!kb) return 'Not Set';
    let text = '';
    if (kb.ctrl) text += 'Ctrl+';
    if (kb.alt) text += 'Alt+';
    if (kb.shift) text += 'Shift+';
    let keyDisplay = kb.key === ' ' ? 'Space' : kb.key.length === 1 ? kb.key.toUpperCase() : kb.key;
    return text + keyDisplay;
}

function logMessage(message, type = 'info') {
    const logLine = document.createElement('p');
    logLine.className = `log ${type}`;
    logLine.textContent = message;
    logOutput.appendChild(logLine);
    logOutput.scrollTop = logOutput.scrollHeight;
    if (logOutput.children.length > 20) logOutput.removeChild(logOutput.children[0]);
}

function startRecordingForKey(actionId) {
    if (isRecordingKey) stopRecordingForKey();
    isRecordingKey = true;
    currentRecordingType = actionId;
    document.getElementById(`change${capitalize(actionId)}Btn`).textContent = 'Press Keys...';
    logMessage(`Recording keybind for ${actionId}. Press your desired key combination...`, 'info');
}

function stopRecordingForKey() {
    if (!isRecordingKey) return;
    const button = document.getElementById(`change${capitalize(currentRecordingType)}Btn`);
    button.textContent = 'Set';
    isRecordingKey = false;
    currentRecordingType = null;
}

function isDuplicateKeybinding(newBinding, excludeId) {
    return Object.entries(keybindings).find(([id, binding]) =>
        id !== excludeId &&
        binding &&
        binding.key.toLowerCase() === newBinding.key.toLowerCase() &&
        binding.ctrl === newBinding.ctrl &&
        binding.alt === newBinding.alt &&
        binding.shift === newBinding.shift
    );
}

function handleKeyDown(e) {
    if (isRecordingKey) {
        if (['Control', 'Alt', 'Shift', 'Meta', 'OS'].includes(e.key)) return;
        e.preventDefault();
        const newBinding = {
            key: e.key,
            ctrl: e.ctrlKey,
            alt: e.altKey,
            shift: e.shiftKey
        };

        const duplicate = isDuplicateKeybinding(newBinding, currentRecordingType);
        if (duplicate) {
            const name = actions.find(a => a.id === duplicate[0]).name;
            logMessage(`This keybinding is already assigned to "${name}"!`, 'warning');
            return;
        }

        keybindings[currentRecordingType] = newBinding;
        document.getElementById(currentRecordingType + 'Keybind').textContent = getKeybindDisplayText(currentRecordingType);
        document.getElementById(currentRecordingType + 'Keybind').classList.remove('empty-keybind');
        logMessage(`Keybind for ${currentRecordingType} set to ${getKeybindDisplayText(currentRecordingType)}`, 'success');

        saveKeybindingsToLocalStorage(); // localStorage

        stopRecordingForKey();
        return;
    }

    for (const [actionId, binding] of Object.entries(keybindings)) {
        if (!binding) continue;
        if (
            e.key.toLowerCase() === binding.key.toLowerCase() &&
            e.ctrlKey === binding.ctrl &&
            e.altKey === binding.alt &&
            e.shiftKey === binding.shift
        ) {
            e.preventDefault();
            executeAction(actionId);
            break;
        }
    }
}

// This is the important modification for executeAction function:
function executeAction(actionId) {
    const icon = document.getElementById(actionId);
    if (icon) {
        flashIcon(icon);
        // Trigger a click on the icon to use the existing click handler
        // that's set up in your second file
        icon.click();
        logMessage(`Executed: ${actionId}`, 'success');
    } else {
        logMessage(`No sidebar icon found for action: ${actionId}`, 'warning');
    }
}
function flashIcon(icon) {
    icon.classList.add('active-flash');
    setTimeout(() => icon.classList.remove('active-flash'), 300);
}

document.addEventListener('keydown', handleKeyDown);

loadKeybindingsFromLocalStorage();
generateKeybindingsUI();
logMessage('Welcome! Click "Set" to assign a keybinding to a sidebar action.');

document.getElementById('resetKeybindingsBtn')?.addEventListener('click', () => {
    if (confirm("Are you sure you want to reset all keybindings?")) {
        actions.forEach(action => keybindings[action.id] = null);
        saveKeybindingsToLocalStorage();
        generateKeybindingsUI();
        logMessage('All keybindings have been reset.', 'warning');
    }
});

// // Only attach events to functional icons
// document.getElementById('compileIcon').addEventListener('click', () => {
//     console.log("Compile action triggered");
//     // 
// });

// document.getElementById('runIcon').addEventListener('click', () => {
//     console.log("Run action triggered");
//     // 
// });

// document.getElementById('saveIcon').addEventListener('click', () => {
//     console.log("Save action triggered");
//     // 
// });

document.querySelectorAll('.icon.disabled').forEach(icon => {
    icon.addEventListener('click', (e) => {
        e.preventDefault();
        e.stopPropagation();
        console.log(`"${icon.dataset.tooltip || 'This feature'}" is currently disabled`);
    });
});

const functionalIcons = {
    'compile': 'compileIcon',
    'run': 'runIcon',
    'save': 'saveIcon'
};

Object.entries(functionalIcons).forEach(([action, iconId]) => {
    const icon = document.getElementById(iconId);
    if (icon) {
        icon.addEventListener('click', () => {
            console.log(`${action} action triggered`);
            // Add your specific action logic here
            
            // Visual feedback
            icon.style.transform = 'scale(0.9)';
            setTimeout(() => {
                icon.style.transform = '';
            }, 200);
        });
    }
});

document.querySelectorAll('.icon.inactive').forEach(icon => {
    icon.addEventListener('click', (e) => {
        e.preventDefault();
        console.log(`${icon.dataset.tooltip || 'This feature'} is not available yet`);
        
        // Visual feedback
        icon.style.animation = 'shake 0.5s';
        setTimeout(() => {
            icon.style.animation = '';
        }, 500);
    });
});

document.head.insertAdjacentHTML('beforeend', `
<style>
@keyframes shake {
    0%, 100% { transform: translateX(0); }
    20%, 60% { transform: translateX(-2px); }
    40%, 80% { transform: translateX(2px); }
}
</style>
`);



function applyNeoTheme(){
    console.log("ha bhai agaye yaha tak");
    document.getElementById('theme-css').href = 'https://cdnjs.cloudflare.com/ajax/libs/codemirror/5.65.14/theme/neo.min.css';
    document.getElementById('theme-cssSheet').href = "/css/editor/editor.css";
    document.getElementById('chahiyeTab').href = "/css/solarized-theme.css";
    // Loop through all icon images by ID pattern and remove 'W' from src
    // for (let i = 1; i <= 17; i++) {
    //     const logo = document.getElementById(`${i}Logo`);
    //     if (logo) {
    //         logo.src = logo.src.replace("W", "");
    //     }
    // }

    // Manually update each icon src by removing 'W'
    document.getElementById('1Logo').src = "/icons/livePreview.svg";
    document.getElementById('2Logo').src = "/icons/compiler.svg";
    document.getElementById('3Logo').src = "/icons/run.svg";
    document.getElementById('4Logo').src = "/icons/download.svg";
    document.getElementById('5Logo').src = "/icons/selectfolder.svg";
    document.getElementById('11Logo').src = "/icons/chatbot.svg";
    document.getElementById('12Logo').src = "/icons/settings.svg";
    document.getElementById('13Logo').src = "/icons/selectfolder.svg";
    document.getElementById('14Logo').src = "/icons/css.svg";
    document.getElementById('15Logo').src = "/icons/js.svg";
    document.getElementById('16Logo').src = "/icons/codeConverter.svg";
    document.getElementById('17Logo').src = "/icons/sampleCode.svg";
    document.getElementById('18Logo').src = "/icons/newfile.svg";
    document.getElementById('19Logo').src = "/icons/selectfolder.svg";
    document.getElementById('20Logo').src = "/icons/selectfiles.svg";



    document.getElementById('55Logo').src = "/icons/newfile.svg"; 
    document.getElementById('56Logo').src = "/icons/selectfolder.svg"; 
    document.getElementById('57Logo').src = "/icons/selectfiles.svg"; 

}

// const svgObject = document.getElementById('compiler');

// // Wait until SVG is loaded
// svgObject.addEventListener('load', () => {
//     const svgDoc = svgObject.contentDocument;
//     const svgElement = svgDoc.querySelector('svg'); // select the <svg> tag inside

//     if (svgElement) {
//         svgElement.setAttribute('fill', 'white'); // change stroke color
//         // Or, you can also change specific <path> or <line> etc.
//         // const path = svgDoc.querySelector('path');
//         // path.setAttribute('stroke', 'blue');
//     }
// });

// // --- ACTIONS ---
// const actions = [
//     {id: 'compile', name: 'Compile', shortcutElement: 'compileShortcut'},
//     {id: 'run', name: 'Run', shortcutElement: 'runShortcut'},
//     {id: 'save', name: 'Save', shortcutElement: 'saveShortcut'},
//     {id: 'devMode', name: 'Dev Mode', shortcutElement: 'devModeShortcut'}
// ];

// let keybindings = {};
// actions.forEach(action => keybindings[action.id] = null);

// let isRecordingKey = false;
// let currentRecordingType = null;

// const keybindingsList = document.getElementById('keybindingsList');
// const logOutput = document.querySelector('.log-output');

// function generateKeybindingsUI() {
//     keybindingsList.innerHTML = '';
//     actions.forEach(action => {
//         const row = document.createElement('div');
//         row.className = 'keybind-row';

//         const label = document.createElement('span');
//         label.className = 'keybind-label';
//         label.textContent = `${action.name}:`;

//         const display = document.createElement('div');
//         display.id = `${action.id}Keybind`;
//         display.className = 'keybind-display';
//         display.textContent = keybindings[action.id] ? getKeybindDisplayText(action.id) : 'Not Set';
//         if (!keybindings[action.id]) display.classList.add('empty-keybind');

//         const button = document.createElement('button');
//         button.id = `change${capitalize(action.id)}Btn`;
//         button.className = 'keybind-button';
//         button.textContent = 'Set';
//         button.addEventListener('click', () => startRecordingForKey(action.id));

//         const controls = document.createElement('div');
//         controls.className = 'keybind-controls';
//         controls.appendChild(display);
//         controls.appendChild(button);

//         row.appendChild(label);
//         row.appendChild(controls);
//         keybindingsList.appendChild(row);
//     });
// }

// function capitalize(str) {
//     return str.charAt(0).toUpperCase() + str.slice(1);
// }

// function getKeybindDisplayText(actionId) {
//     const kb = keybindings[actionId];
//     if (!kb) return 'Not Set';
//     let text = '';
//     if (kb.ctrl) text += 'Ctrl+';
//     if (kb.alt) text += 'Alt+';
//     if (kb.shift) text += 'Shift+';
//     let keyDisplay = kb.key === ' ' ? 'Space' : kb.key.length === 1 ? kb.key.toUpperCase() : kb.key;
//     return text + keyDisplay;
// }

// function logMessage(message, type = 'info') {
//     const logLine = document.createElement('p');
//     logLine.className = `log ${type}`;
//     logLine.textContent = message;
//     logOutput.appendChild(logLine);
//     logOutput.scrollTop = logOutput.scrollHeight;
//     if (logOutput.children.length > 20) logOutput.removeChild(logOutput.children[0]);
// }

// function startRecordingForKey(actionId) {
//     if (isRecordingKey) stopRecordingForKey();
//     isRecordingKey = true;
//     currentRecordingType = actionId;
//     document.getElementById(`change${capitalize(actionId)}Btn`).textContent = 'Press Keys...';
//     logMessage(`Recording keybind for ${actionId}. Press your desired key combination...`, 'info');
// }

// function stopRecordingForKey() {
//     if (!isRecordingKey) return;
//     const button = document.getElementById(`change${capitalize(currentRecordingType)}Btn`);
//     button.textContent = 'Set';
//     isRecordingKey = false;
//     currentRecordingType = null;
// }

// function isDuplicateKeybinding(newBinding, excludeId) {
//     return Object.entries(keybindings).find(([id, binding]) =>
//         id !== excludeId &&
//         binding &&
//         binding.key.toLowerCase() === newBinding.key.toLowerCase() &&
//         binding.ctrl === newBinding.ctrl &&
//         binding.alt === newBinding.alt &&
//         binding.shift === newBinding.shift
//     );
// }

// function handleKeyDown(e) {
//     if (isRecordingKey) {
//         if (['Control', 'Alt', 'Shift', 'Meta', 'OS'].includes(e.key)) return;
//         e.preventDefault();
//         const newBinding = {
//             key: e.key,
//             ctrl: e.ctrlKey,
//             alt: e.altKey,
//             shift: e.shiftKey
//         };

//         const duplicate = isDuplicateKeybinding(newBinding, currentRecordingType);
//         if (duplicate) {
//             const name = actions.find(a => a.id === duplicate[0]).name;
//             logMessage(`This keybinding is already assigned to "${name}"!`, 'warning');
//             return;
//         }

//         keybindings[currentRecordingType] = newBinding;
//         document.getElementById(currentRecordingType + 'Keybind').textContent = getKeybindDisplayText(currentRecordingType);
//         document.getElementById(currentRecordingType + 'Keybind').classList.remove('empty-keybind');
//         logMessage(`Keybind for ${currentRecordingType} set to ${getKeybindDisplayText(currentRecordingType)}`, 'success');
//         stopRecordingForKey();
//         return;
//     }

//     for (const [actionId, binding] of Object.entries(keybindings)) {
//         if (!binding) continue;
//         if (
//             e.key.toLowerCase() === binding.key.toLowerCase() &&
//             e.ctrlKey === binding.ctrl &&
//             e.altKey === binding.alt &&
//             e.shiftKey === binding.shift
//         ) {
//             e.preventDefault();
//             executeAction(actionId);
//             break;
//         }
//     }
// }

// function executeAction(actionId) {
//     const icon = document.getElementById(`${actionId}Icon`);
//     if (icon) {
//         flashIcon(icon);
//         icon.click();
//         logMessage(`Executed: ${actionId}`, 'success');
//     } else {
//         logMessage(`No sidebar icon found for action: ${actionId}`, 'warning');
//     }
// }

// function flashIcon(icon) {
//     icon.classList.add('active-flash');
//     setTimeout(() => icon.classList.remove('active-flash'), 300);
// }

// document.addEventListener('keydown', handleKeyDown);
// generateKeybindingsUI();
// logMessage('Welcome! Click "Set" to assign a keybinding to a sidebar action.');


// document.getElementById('compileIcon')?.addEventListener('click', () => {
//     console.log('Compile triggered!');
//     // Your compile logic here
// });
