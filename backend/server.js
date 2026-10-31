require('dotenv').config({ path: require('path').join(__dirname, '.env') });
   const express = require("express");
const http = require("http");
const cors = require("cors");
const axios = require("axios");
const Groq = require('groq-sdk');
const helmet = require('helmet');
const fs = require('fs');
const path = require('path');
const app = express();
app.use(cors());
app.use(express.json());

const editorFeatureTemplates = [
    'welcome.html',
    'programmer-editor.html',
    'developer-editor.html',
    'settings.html',
    'chatbot.html',
    'converter.html'
];

const editorScriptParts = [
    'editor-core.js',
    'welcome.js',
    'programmer-editor.js',
    'developer-editor.js',
    'settings-panel.js',
    'chatbot.js',
    'programmer-workspace.js',
    'live-preview.js',
    'file-management.js',
    'settings.js'
];

function readEditorFeature(file) {
    return fs.promises.readFile(
        path.join(__dirname, '../frontend/public', file),
        'utf8'
    );
}

function sendEditorPage(req, res, next) {
    Promise.all([
        readEditorFeature('editor.html'),
        ...editorFeatureTemplates.map((file) => readEditorFeature(`partials/editor/${file}`))
    ])
        .then(([shell, ...features]) => {
            const featureMarker = '<!-- EDITOR_FEATURES -->';
            if (!shell.includes(featureMarker)) {
                throw new Error('Editor feature insertion point is missing.');
            }

            res.type('html').send(shell.replace(featureMarker, features.join('\n')));
        })
        .catch(next);
}

app.get('/editor.html', sendEditorPage);
app.get('/js/editor.js', (req, res, next) => {
    Promise.all(editorScriptParts.map((file) => readEditorFeature(`js/editor/${file}`)))
        .then((parts) => res.type('application/javascript').send(parts.join('\n')))
        .catch(next);
});

app.use(express.static(path.join(__dirname, '../frontend/public')));

app.get('/', sendEditorPage);

const groqModels = new Set(['openai/gpt-oss-120b']);

app.get('/api/chatbot/status', (req, res) => {
    res.json({ configured: Boolean(process.env.GROQ_API_KEY?.trim()) });
});

app.post('/api/chatbot', async (req, res) => {
    const apiKey = process.env.GROQ_API_KEY?.trim();
    if (!apiKey) {
        return res.status(503).json({
            error: 'The AI assistant is not configured. Add GROQ_API_KEY to backend/.env and restart the server.'
        });
    }

    const { model, messages } = req.body || {};
    if (!groqModels.has(model)) {
        return res.status(400).json({ error: 'Choose a supported AI model.' });
    }

    if (!Array.isArray(messages) || messages.length < 1 || messages.length > 20) {
        return res.status(400).json({ error: 'Send between 1 and 20 conversation messages.' });
    }

    const validMessages = messages.every((message) =>
        message &&
        (message.role === 'user' || message.role === 'assistant') &&
        typeof message.content === 'string' &&
        message.content.trim().length > 0 &&
        message.content.length <= 8000
    );
    if (!validMessages) {
        return res.status(400).json({ error: 'Conversation messages are invalid or too long.' });
    }

    try {
        const groq = new Groq({ apiKey });
        const completion = await groq.chat.completions.create({
            messages: [
                {
                    role: 'system',
                    content: 'You are Soniverse’s concise programming assistant. Answer the exact question directly in under 80 words. For command requests, give only the 1–3 most relevant commands in a fenced code block, with at most one short note; never give exhaustive command catalogs, long tutorials, or tables unless explicitly requested. Use brief headings only when they improve clarity. Ask one short clarifying question only when essential.'
                },
                ...messages.map(({ role, content }) => ({ role, content: content.trim() }))
            ],
            model,
            temperature: 0.4,
            max_completion_tokens: 1024,
            top_p: 1,
            stream: true,
            reasoning_effort: 'medium',
            stop: null
        });

        res.status(200).set({
            'Content-Type': 'text/event-stream; charset=utf-8',
            'Cache-Control': 'no-cache, no-transform',
            'Connection': 'keep-alive',
            'X-Accel-Buffering': 'no'
        });
        res.flushHeaders();

        for await (const chunk of completion) {
            const content = chunk.choices[0]?.delta?.content;
            if (typeof content === 'string' && content) {
                res.write(`data: ${JSON.stringify({ content })}\n\n`);
            }
        }

        res.write('data: [DONE]\n\n');
        res.end();
    } catch (error) {
        const status = error.status === 429 ? 429 : 502;
        const message = status === 429
            ? 'The AI service is busy. Please wait a moment and try again.'
            : error.message || 'The AI service could not complete the request.';
        console.error('Groq chatbot request failed:', error.status || error.name || 'Unknown error');

        if (res.headersSent) {
            res.write(`event: error\ndata: ${JSON.stringify({ error: message })}\n\n`);
            return res.end();
        }

        res.status(status).json({ error: message });
    }
});


const server = http.createServer(app);

app.use((req, res, next) => {
    res.setHeader("Content-Security-Policy", 
        "default-src 'self'; " +
        "img-src 'self' data: blob:; " +
        "script-src 'self' 'unsafe-eval' 'unsafe-inline' " +
        "https://cdnjs.cloudflare.com/ajax/libs/codemirror/5.65.14/ " +
        "https://cdnjs.cloudflare.com/ajax/libs/axios/1.5.0/axios.min.js; " + // axiosssssssss
        "connect-src 'self'; " +
        "style-src 'self' 'unsafe-inline' " +
        "https://cdnjs.cloudflare.com/ajax/libs/codemirror/5.65.14/; " +
        "font-src 'self' https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/ data:;"
    );
    next();
});


// remove the Helmet CSP , we're using custom headers above
const configureHelmet = () => {
    app.use(
        helmet({
            contentSecurityPolicy: false,
        })
    );
};
configureHelmet();   // acivate Helmet without CSP

const jdoodleVersionIndexes = {
    c: '5',
    cpp17: '1',
    java: '4',
    python3: '4',
    nodejs: '4',
    php: '4',
    ruby: '4',
    swift: '4',
    kotlin: '3',
    go: '4',
    rust: '3'
};

app.post('/api/execute', async (req, res) => {
    const { script, language, versionIndex, stdin } = req.body || {};

    if (typeof script !== 'string' || !script.trim()) {
        return res.status(400).json({ error: 'A non-empty script is required' });
    }

    if (jdoodleVersionIndexes[language] !== String(versionIndex)) {
        return res.status(400).json({ error: 'Unsupported language or version' });
    }

    const clientId = process.env.JDOODLE_CLIENT_ID;
    const clientSecret = process.env.JDOODLE_CLIENT_SECRET;
    if (!clientId || !clientSecret) {
        return res.status(503).json({
            error: 'JDoodle is not configured. Set JDOODLE_CLIENT_ID and JDOODLE_CLIENT_SECRET on the backend.'
        });
    }

    try {
        const response = await axios.post('https://api.jdoodle.com/v1/execute', {
            clientId,
            clientSecret,
            script,
            language,
            versionIndex: String(versionIndex),
            stdin: typeof stdin === 'string' ? stdin : ''
        }, { timeout: 30000 });

        res.json(response.data);
    } catch (error) {
        const upstreamData = error.response?.data;
        console.error('JDoodle execution error:', upstreamData || error.message);
        res.status(502).json({
            error: upstreamData?.error || upstreamData?.message || 'JDoodle execution request failed'
        });
    }
});

const PORT = process.env.PORT || 3000;
server.listen(PORT, "0.0.0.0", () => {
    console.log(`✅ Server running on port ${PORT}`);
});


process.on('SIGINT', () => {
    console.log('Shutting down server...');
    server.close(() => {
        console.log('Server closed');
        process.exit(0);
    });
});
