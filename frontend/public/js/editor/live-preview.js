// ---------------------------- HTML CSS JS Live Preview ----------------------------
// ---------------------------- HTML CSS JS Live Preview ----------------------------
// ---------------------------- HTML CSS JS Live Preview ----------------------------
// ---------------------------- HTML CSS JS Live Preview ----------------------------
// ---------------------------- HTML CSS JS Live Preview ----------------------------
// ---------------------------- HTML CSS JS Live Preview ----------------------------

let htmlEditor, cssEditor, jsEditor;
let htmlCssJsSampleCode = document.getElementById('html-css-js')
// htmlCssJsSampleCode.addEventListener('click', () => {
//     setupHtmlEditor();
//     setupCssEditor();
//     setupJsEditor();
// })

function setupHtmlEditor() {
    htmlEditor.setValue(sampleCode.html);
}
function setupCssEditor() {
    cssEditor.setValue(sampleCode.css);
}
function setupJsEditor() {
    jsEditor.setValue(sampleCode.js);
}

htmlEditor = CodeMirror.fromTextArea(document.getElementById("html-editor"), {
    mode: 'htmlmixed',  // Mixed mode for HTML, CSS and JavaScript
    theme: 'neo',   // Theme
    //lineNumbers: true,  // Show line numbers
    autoCloseTags: true,
    // {
    //     whenOpening: true,   // Auto-close only when opening a tag
    //     whenClosing: true,   // Auto-close when closing a tag
    //     indentTags: []       // Prevent extra indentation
    // },        
    autoCloseBrackets: true,
    matchTags: {bothTags: true},
    matchBrackets: true,
    indentUnit: 4,      // Indent by 4 spaces
    tabSize: 4,
    indentWithTabs: true,
    lineWrapping: true,
    extraKeys: {
        "Ctrl-Space": "autocomplete",
        "Enter": function(cm) {
            cm.execCommand("newlineAndIndent");
        }
    }
    
});
htmlEditor.setSize(null, "480px");
cssEditor = CodeMirror.fromTextArea(document.getElementById("css-editor"), {
    mode: "css",
    //lineNumbers: true,
    theme: "neo",
    autoCloseBrackets: true,
    indentUnit: 4,
    tabSize: 4,
    lineWrapping: true,
    autoCloseBrackets: true,
    matchBrackets: true,
    autofocus: true,
});
cssEditor.setSize(null, "480px");


jsEditor = CodeMirror.fromTextArea(document.getElementById("js-editor"), {
    mode: "javascript",
    //lineNumbers: true,
    theme: "neo",
    autoCloseBrackets: true,
    indentUnit: 4,
    tabSize: 4,
    lineWrapping: true,
    autoCloseBrackets: true,
    matchBrackets: true,
    autofocus: true,
});
jsEditor.setSize(null, "185px")


function updatePreview() {
    const html = htmlEditor.getValue();
    const css = `<style>${cssEditor.getValue()}</style>`;
    const js = `<script>setTimeout(() => { ${jsEditor.getValue()} }, 0);<\/script>`;
    
    const iframe = document.getElementById("live-preview").contentWindow.document;
    iframe.open();
    iframe.write(html + css + js);
    iframe.close();
}

htmlEditor.on("change", updatePreview);
cssEditor.on("change", updatePreview);
jsEditor.on("change", updatePreview);

window.addEventListener('beforeunload', () => {
    localStorage.setItem('html', htmlEditor.getValue());
    localStorage.setItem('css', cssEditor.getValue());
    localStorage.setItem('js', jsEditor.getValue());
});

window.addEventListener('load', () => {
    // setTimeout(() => {
    //     window.scrollTo(0, 0); // Force reset after rendering
    // }, 0);
    htmlEditor.setValue(localStorage.getItem('html') || '');
    cssEditor.setValue(localStorage.getItem('css') || '');
    jsEditor.setValue(localStorage.getItem('js') || '');
     
});


//********************************** Save button **********************************
//********************************** Save button **********************************
//********************************** Save button **********************************
//********************************** Save button **********************************
//********************************** Save button **********************************
//********************************** Save button **********************************
// save to local one
async function saveCode() {
    try {
        // const editor = document.getElementById("editor");
        let code = editorInstance.getValue();
        const handle = await window.showSaveFilePicker({
            suggestedName: "code.txt",
            types: [
                {
                    description: "Text Files",
                    accept: { "text/plain": [".txt", ".java", ".py"] },
                },
            ],
        });

        const writable = await handle.createWritable();
        await writable.write(code);
        await writable.close();

        //clearing localstorage after saving
        localStorage.removeItem("savedCode");

        alert("File saved successfully and local storage cleared!");
    } catch (error) {
        console.error("Save cancelled or failed:", error);
    }
}


// code converterrrrrrrrrrrrrrrrrrrrrr     -------------------------------------------------------------------------------------------------
// code converterrrrrrrrrrrrrrrrrrrrrr     -------------------------------------------------------------------------------------------------
// code converterrrrrrrrrrrrrrrrrrrrrr     -------------------------------------------------------------------------------------------------
// code converterrrrrrrrrrrrrrrrrrrrrr     -------------------------------------------------------------------------------------------------
// code converterrrrrrrrrrrrrrrrrrrrrr     -------------------------------------------------------------------------------------------------
// code converterrrrrrrrrrrrrrrrrrrrrr     -------------------------------------------------------------------------------------------------
// code converterrrrrrrrrrrrrrrrrrrrrr     -------------------------------------------------------------------------------------------------
// code converterrrrrrrrrrrrrrrrrrrrrr     -------------------------------------------------------------------------------------------------
// code converterrrrrrrrrrrrrrrrrrrrrr     -------------------------------------------------------------------------------------------------
// Update language icons when selections change
document.getElementById('sourceLanguage').addEventListener('change', function() {
    updateLanguageIcon('sourceLanguageIcon-cc', this.value);
});

document.getElementById('targetLanguage').addEventListener('change', function() {
    updateLanguageIcon('targetLanguageIcon-cc', this.value);
});

function updateLanguageIcon(elementId, language) {
    const iconElement = document.querySelector(`#${elementId} .language-icon-cc`);

    iconElement.classList.remove('html-icon-cc', 'css-icon-cc', 'js-icon-cc');

    if (language === 'html') {
        iconElement.classList.add('html-icon-cc');
    } else if (language === 'css') {
        iconElement.classList.add('css-icon-cc');
    } else if (language === 'javascript') {
        iconElement.classList.add('js-icon-cc');
    }
}

// Initialize icons on page load
updateLanguageIcon('sourceLanguageIcon-cc', document.getElementById('sourceLanguage').value);
updateLanguageIcon('targetLanguageIcon-cc', document.getElementById('targetLanguage').value);
    
function convertCode() {
    const sourceLanguage = document.getElementById('sourceLanguage').value;
    const targetLanguage = document.getElementById('targetLanguage').value;
    const sourceCode = document.getElementById('sourceCode').value.trim();
    const targetCodeElement = document.getElementById('targetCode');
    const explanationElement = document.getElementById('conversionExplanation');
    const explanationTextElement = document.getElementById('explanationText');
    const messageElement = document.getElementById('message');

    messageElement.className = 'message hidden';
    
    if (!sourceCode) {
        showMessage('Please enter some code to convert.', 'error');
        return;
    }
    
    if (sourceLanguage === targetLanguage) {
        targetCodeElement.value = sourceCode;
        showMessage('Source and target languages are the same.', 'success');
        explanationElement.className = 'explanation hidden';
        return;
    }
    
    try {
        const { convertedCode, explanation } = performConversion(sourceLanguage, targetLanguage, sourceCode);

        targetCodeElement.value = convertedCode;
        explanationTextElement.textContent = explanation;
        explanationElement.className = 'explanation';

        showMessage('Code converted successfully!', 'success');
    } catch (error) {
        targetCodeElement.value = '';
        explanationElement.className = 'explanation hidden';
        showMessage('Error converting code: ' + error.message, 'error');
    }
}
  
function performConversion(sourceLanguage, targetLanguage, sourceCode) {

    let convertedCode = '';
    let explanation = '';
    
    if (sourceLanguage === 'html' && targetLanguage === 'javascript') {
      convertedCode = htmlToJavaScript(sourceCode);
      explanation = "Converted HTML to JavaScript DOM creation code. Each HTML element is created using document.createElement() and properties are set accordingly.";
    }
    // javaScript to TYYpeScript
    else if (sourceLanguage === 'javascript' && targetLanguage === 'typescript') {
      convertedCode = javascriptToTypeScript(sourceCode);
      explanation = "Converted JavaScript to TypeScript by adding type annotations where possible and updating the syntax to TypeScript standards.";
    }
    // css to JavaScript
    else if (sourceLanguage === 'css' && targetLanguage === 'javascript') {
      convertedCode = cssToJavaScript(sourceCode);
      explanation = "Converted CSS to JavaScript style objects. CSS properties are converted to camelCase format as required by JavaScript.";
    }
    // python to JavaScript
    else if (sourceLanguage === 'python' && targetLanguage === 'javascript') {
      convertedCode = pythonToJavaScript(sourceCode);
      explanation = "Converted Python to JavaScript. Functions, loops, and conditionals are transformed to their JavaScript equivalents.";
    }
    // javaScript to Python
    else if (sourceLanguage === 'javascript' && targetLanguage === 'python') {
      convertedCode = javascriptToPython(sourceCode);
      explanation = "Converted JavaScript to Python. Functions, loops, and conditionals are transformed to their Python equivalents.";
    }
    // HTML to CSS (basic skeleton)
    else if (sourceLanguage === 'html' && targetLanguage === 'css') {
      convertedCode = htmlToCss(sourceCode);
      explanation = "Generated CSS skeleton based on HTML elements, classes and IDs.";
    }
    else {
      convertedCode = `// Conversion from ${sourceLanguage} to ${targetLanguage}\n// This is a placeholder. Full conversion would require a more complex tool.\n\n`;
      convertedCode += `/* Original ${sourceLanguage} code:\n${sourceCode}\n*/\n\n`;

      if (targetLanguage === 'javascript') {
        convertedCode += '// JavaScript equivalent code would be something like:\n\nfunction convertedFunction() {\n  console.log("Converted code");\n  // Implementation would go here\n}\n';
      } else if (targetLanguage === 'python') {
        convertedCode += '# Python equivalent code would be something like:\n\ndef converted_function():\n    print("Converted code")\n    # Implementation would go here\n';
      } else if (targetLanguage === 'java') {
        convertedCode += '// Java equivalent code would be something like:\n\npublic class Converter {\n    public static void main(String[] args) {\n        System.out.println("Converted code");\n        // Implementation would go here\n    }\n}\n';
      } else if (targetLanguage === 'html') {
        convertedCode += '<!-- HTML equivalent structure would be something like: -->\n<div class="container">\n  <h1>Converted Structure</h1>\n  <p>Implementation would go here</p>\n</div>\n';
      } else if (targetLanguage === 'css') {
        convertedCode += '/* CSS equivalent styling would be something like: */\n.container {\n  display: flex;\n  flex-direction: column;\n}\n\nh1 {\n  color: #333;\n}\n';
      }
      
      explanation = `Complete conversion from ${sourceLanguage} to ${targetLanguage} would require a specialized translator. This is a simplified placeholder showing the general structure of the target language.`;
    }
    return { convertedCode, explanation };
}
  
function htmlToJavaScript(html) {
    html = html.trim();
    let js = '// Generated JavaScript DOM code\n';
    js += 'function createElements() {\n';
    
    const lines = html.split('\n');
    let indentLevel = 1;
    let elementCount = 0;
    
    for (const line of lines) {
        const trimmedLine = line.trim();
        if (!trimmedLine) continue;

        if (trimmedLine.startsWith('<') && !trimmedLine.startsWith('</')) {
            // open ka tag
            const match = trimmedLine.match(/<([a-zA-Z0-9]+)([^>]*)>/);
            if (match) {
                const tagName = match[1];
                const attributes = match[2];
              
                elementCount++;
                const elementVar = `element${elementCount}`;
              
                js += `${' '.repeat(indentLevel * 2)}const ${elementVar} = document.createElement('${tagName}');\n`;
              
                // extract 
                if (attributes) {
                    const classMatch = attributes.match(/class=["']([^"']*)["']/);
                    if (classMatch) {
                        js += `${' '.repeat(indentLevel * 2)}${elementVar}.className = '${classMatch[1]}';\n`;
                    }
                
                    const idMatch = attributes.match(/id=["']([^"']*)["']/);
                    if (idMatch) {
                        js += `${' '.repeat(indentLevel * 2)}${elementVar}.id = '${idMatch[1]}';\n`;
                    }
                
                    // id, and class attributes
                    const otherAttrs = attributes.match(/([a-zA-Z-]+)=["']([^"']*)["']/g);
                    if (otherAttrs) {
                        otherAttrs.forEach(attr => {
                          const [name, value] = attr.split('=');
                          if (name !== 'class' && name !== 'id') {
                              js += `${' '.repeat(indentLevel * 2)}${elementVar}.setAttribute('${name}', ${value});\n`;
                          }
                        });
                    }
              }

              if (elementCount > 1) {
                js += `${' '.repeat(indentLevel * 2)}element${elementCount - 1}.appendChild(${elementVar});\n`;
              }

              indentLevel++;
            }
        } else if (trimmedLine.startsWith('</')) {
            // closing tag
            indentLevel = Math.max(1, indentLevel - 1);
        } else {
            // text content
            js += `${' '.repeat(indentLevel * 2)}element${elementCount}.textContent = '${trimmedLine.replace(/'/g, "\\'")}';\n`;
        }
    }
  
    js += '  return element1;\n';
    js += '}\n\n';
    js += '// Append to the document\n';
    js += 'document.body.appendChild(createElements());';
    
    return js;
}

function htmlToCss(html) {
    let css = '/* CSS skeleton generated from HTML */\n\n';
    const elements = new Set();
    const classes = new Set();
    const ids = new Set();
    
    const elementRegex = /<([a-zA-Z0-9]+)/g;
    const classRegex = /class=["']([^"']*)["']/g;
    const idRegex = /id=["']([^"']*)["']/g;
    
    let match;
    
    while (match = elementRegex.exec(html)) {
        elements.add(match[1]);
    }
    
    while (match = classRegex.exec(html)) {
        match[1].split(/\s+/).forEach(cls => {
            if (cls) classes.add(cls);
        });
    }
    
    while (match = idRegex.exec(html)) {
        ids.add(match[1]);
    }
    
    // CSS for elements
    elements.forEach(element => {
        css += `${element} {\n  /* Element styles */\n}\n\n`;
    });
    
    // CSS for classes
    classes.forEach(cls => {
        css += `.${cls} {\n  /* Class styles */\n}\n\n`;
    });
    
    // CSS for IDs
    ids.forEach(id => {
        css += `#${id} {\n  /* ID styles */\n}\n\n`;
    });
    
    return css;
}

function copyText(elementId) {
    const copyText = document.getElementById(elementId);
    copyText.select();
    document.execCommand("copy");
    
    showMessage('Copied to clipboard!', 'success');
}

function showMessage(text, type) {
    const messageElement = document.getElementById('message');
    messageElement.textContent = text;
    messageElement.className = `message ${type}`;
    
    setTimeout(() => {
      messageElement.className = 'message hidden';
    }, 3000);
}

