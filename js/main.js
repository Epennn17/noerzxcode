import { ALL_TOOLS, CANVAS_TOOLS, DOWNLOADER_TOOLS, CATEGORY_LABELS } from './data.js';
import { showToast, copyText, formatJSON, generateExampleBody } from './utils.js';

// ============================================
// RENDER ALL TOOLS
// ============================================
export function renderAllTools(filter = 'all', search = '') {
    const grid = document.getElementById('toolsGrid');
    const empty = document.getElementById('emptyState');
    if (!grid) return;

    const filtered = ALL_TOOLS.filter(t => {
        const matchCat = filter === 'all' || t.category === filter;
        const matchSearch = t.name.toLowerCase().includes(search.toLowerCase()) ||
            t.fungsi.toLowerCase().includes(search.toLowerCase());
        return matchCat && matchSearch;
    });

    if (filtered.length === 0) {
        grid.innerHTML = '';
        if (empty) empty.classList.remove('hidden');
        return;
    }
    if (empty) empty.classList.add('hidden');

    grid.innerHTML = filtered.map(tool => `
        <div class="card-hover rounded-2xl border border-zinc-800 bg-zinc-900/60 p-5 transition hover:border-zinc-600 cursor-pointer" onclick="window.openDetail('${tool.id}')">
            <div class="mb-3 flex h-10 w-10 items-center justify-center rounded-xl bg-zinc-800/80 text-white">
                <i data-lucide="${tool.icon}" class="h-5 w-5"></i>
            </div>
            <h3 class="font-semibold text-white">${tool.name}</h3>
            <p class="mt-1 text-xs text-zinc-400 line-clamp-2">${tool.fungsi}</p>
            <div class="mt-3 flex items-center justify-between">
                <span class="rounded-full bg-zinc-800 px-3 py-0.5 text-[10px] font-medium uppercase tracking-wide text-zinc-400">${CATEGORY_LABELS[tool.category]}</span>
                <span class="text-xs text-zinc-500">${tool.method}</span>
            </div>
        </div>
    `).join('');

    if (window.lucide) window.lucide.createIcons();
}

// ============================================
// OPEN DETAIL MODAL
// ============================================
export function openDetail(id) {
    const tool = ALL_TOOLS.find(t => t.id === id);
    if (!tool) return;

    const modal = document.getElementById('detailModal');
    const content = document.getElementById('modalContent');
    if (!modal || !content) return;

    const exampleBody = generateExampleBody(tool.fields);

    content.innerHTML = `
        <div class="space-y-5">
            <div>
                <h2 class="text-xl font-bold text-white">${tool.name}</h2>
                <p class="text-sm text-zinc-400 mt-1">${tool.fungsi}</p>
            </div>
            <div class="grid grid-cols-1 gap-3 sm:grid-cols-2 text-sm">
                <div><span class="text-zinc-500">Endpoint</span><br><span class="text-white font-mono text-xs break-all">${tool.endpoint}</span></div>
                <div><span class="text-zinc-500">Method</span><br><span class="text-white font-semibold">${tool.method}</span></div>
                <div class="sm:col-span-2"><span class="text-zinc-500">Parameters</span><br><span class="text-zinc-300">${tool.fields.map(f => `${f.name}${f.required ? ' *' : ''}`).join(', ')}</span></div>
            </div>
            <div>
                <div class="flex items-center justify-between mb-1">
                    <span class="text-sm font-medium text-zinc-300">Request Example</span>
                    <button onclick="window.copyText('${JSON.stringify(exampleBody)}', 'Request copied')" class="text-xs text-zinc-500 hover:text-white transition">Copy</button>
                </div>
                <div class="code-block">${formatJSON(exampleBody)}</div>
            </div>
            <div class="flex flex-wrap gap-2 pt-2">
                <button onclick="window.copyText('${tool.endpoint}', 'Endpoint copied')" class="inline-flex items-center gap-1.5 rounded-lg border border-zinc-700 px-4 py-2 text-xs font-medium text-zinc-300 transition hover:border-zinc-500 hover:text-white">
                    <i data-lucide="copy" class="h-3.5 w-3.5"></i> Copy Endpoint
                </button>
                <button onclick="window.copyText('${JSON.stringify(exampleBody)}', 'Code copied')" class="inline-flex items-center gap-1.5 rounded-lg border border-zinc-700 px-4 py-2 text-xs font-medium text-zinc-300 transition hover:border-zinc-500 hover:text-white">
                    <i data-lucide="clipboard" class="h-3.5 w-3.5"></i> Copy Code
                </button>
                <a href="${tool.category === 'canvas' ? 'canvas.html' : tool.category === 'downloader' ? 'downloader.html' : 'tools.html'}#tool-${tool.id}" class="inline-flex items-center gap-1.5 rounded-lg bg-white px-4 py-2 text-xs font-semibold text-black transition hover:bg-zinc-200">
                    <i data-lucide="arrow-right" class="h-3.5 w-3.5"></i> Try Tool
                </a>
            </div>
        </div>
    `;

    modal.classList.remove('hidden');
    modal.style.display = 'flex';
    if (window.lucide) window.lucide.createIcons();
}

// ============================================
// CLOSE DETAIL MODAL
// ============================================
export function closeDetail() {
    const modal = document.getElementById('detailModal');
    if (!modal) return;
    modal.style.display = 'none';
    modal.classList.add('hidden');
}

// ============================================
// RENDER CANVAS TOOLS
// ============================================
export function renderCanvasTools() {
    const container = document.getElementById('canvasContainer');
    if (!container) return;

    container.innerHTML = CANVAS_TOOLS.map(tool => `
        <div id="tool-${tool.id}" class="canvas-card rounded-2xl border border-zinc-800 bg-zinc-900/40 p-5 md:p-6 scroll-mt-24">
            <div class="flex items-center gap-3 mb-4">
                <div class="flex h-10 w-10 items-center justify-center rounded-xl bg-zinc-800/80 text-white">
                    <i data-lucide="${tool.icon}" class="h-5 w-5"></i>
                </div>
                <div>
                    <h2 class="text-lg font-bold text-white">${tool.name}</h2>
                    <p class="text-xs text-zinc-400">${tool.fungsi}</p>
                </div>
            </div>
            <form class="space-y-4" data-tool="${tool.id}" data-endpoint="${tool.endpoint}" data-method="${tool.method}">
                ${tool.fields.map(f => {
                    if (f.type === 'select') {
                        return `<div class="space-y-1.5">
                            <label class="text-sm font-medium text-zinc-300">${f.label}${f.required ? ' *' : ''}</label>
                            <select name="${f.name}" class="w-full rounded-xl border border-zinc-800 bg-zinc-900 px-4 py-2.5 text-sm text-white outline-none transition focus:border-zinc-500">
                                <option value="">Pilih...</option>
                                ${f.options.map(o => `<option value="${o}">${o}</option>`).join('')}
                            </select>
                        </div>`;
                    }
                    if (f.type === 'file') {
                        return `<div class="space-y-1.5">
                            <label class="text-sm font-medium text-zinc-300">${f.label}${f.required ? ' *' : ''}</label>
                            <input type="file" name="${f.name}" class="w-full rounded-xl border border-zinc-800 bg-zinc-900 px-4 py-2.5 text-sm text-white outline-none transition focus:border-zinc-500 file:mr-3 file:rounded-lg file:border-0 file:bg-zinc-800 file:px-4 file:py-2 file:text-sm file:text-white hover:file:bg-zinc-700" ${f.required ? 'required' : ''}>
                        </div>`;
                    }
                    if (f.type === 'color') {
                        return `<div class="space-y-1.5">
                            <label class="text-sm font-medium text-zinc-300">${f.label}${f.required ? ' *' : ''}</label>
                            <input type="color" name="${f.name}" class="w-full rounded-xl border border-zinc-800 bg-zinc-900 px-4 py-2 outline-none transition focus:border-zinc-500" value="#7b2cbf">
                        </div>`;
                    }
                    return `<div class="space-y-1.5">
                        <label class="text-sm font-medium text-zinc-300">${f.label}${f.required ? ' *' : ''}</label>
                        <input type="${f.type}" name="${f.name}" placeholder="${f.placeholder || ''}" class="w-full rounded-xl border border-zinc-800 bg-zinc-900 px-4 py-2.5 text-sm text-white outline-none transition focus:border-zinc-500 placeholder:text-zinc-600" ${f.required ? 'required' : ''}>
                    </div>`;
                }).join('')}
                <div class="flex flex-wrap items-center gap-3 pt-2">
                    <button type="submit" class="inline-flex items-center gap-2 rounded-xl bg-white px-5 py-2.5 text-sm font-semibold text-black transition hover:bg-zinc-200 active:scale-95">
                        <i data-lucide="play" class="h-4 w-4"></i> Generate
                    </button>
                    <button type="reset" class="text-sm text-zinc-500 transition hover:text-zinc-300">Reset</button>
                    <span class="ml-auto text-xs text-zinc-600">${tool.method} • ${tool.endpoint.replace('https://api.alwayscodex.my.id', '')}</span>
                </div>
            </form>
            <div id="result-${tool.id}" class="mt-5 hidden">
                <div class="rounded-xl border border-zinc-800 bg-zinc-950/60 p-4">
                    <div class="flex items-center justify-between mb-3">
                        <span class="text-sm font-medium text-zinc-300">Result</span>
                        <button onclick="window.copyResult('${tool.id}')" class="text-xs text-zinc-500 hover:text-white transition">Copy Response</button>
                    </div>
                    <div id="resultContent-${tool.id}" class="space-y-3"></div>
                </div>
            </div>
            <div id="loading-${tool.id}" class="mt-4 hidden">
                <div class="flex items-center gap-3 text-zinc-400">
                    <div class="spinner"></div>
                    <span class="text-sm">Processing...</span>
                </div>
            </div>
        </div>
    `).join('');

    if (window.lucide) window.lucide.createIcons();

    document.querySelectorAll('#canvasContainer form').forEach(form => {
        form.addEventListener('submit', async function(e) {
            e.preventDefault();
            const toolId = this.dataset.tool;
            const endpoint = this.dataset.endpoint;
            const method = this.dataset.method;
            await handleRequest(toolId, endpoint, method, this);
        });
    });
}

// ============================================
// RENDER DOWNLOADER TOOLS
// ============================================
export function renderDownloaderTools() {
    const container = document.getElementById('downloaderContainer');
    if (!container) return;

    container.innerHTML = DOWNLOADER_TOOLS.map(tool => `
        <div id="tool-${tool.id}" class="downloader-card rounded-2xl border border-zinc-800 bg-zinc-900/40 p-5 md:p-6 scroll-mt-24">
            <div class="flex items-center gap-3 mb-4">
                <div class="flex h-10 w-10 items-center justify-center rounded-xl bg-zinc-800/80 text-white">
                    <i data-lucide="${tool.icon}" class="h-5 w-5"></i>
                </div>
                <div>
                    <h2 class="text-lg font-bold text-white">${tool.name}</h2>
                    <p class="text-xs text-zinc-400">${tool.fungsi}</p>
                </div>
            </div>
            <form class="space-y-4" data-tool="${tool.id}" data-endpoint="${tool.endpoint}" data-method="${tool.method}">
                ${tool.fields.map(f => {
                    if (f.type === 'select') {
                        return `<div class="space-y-1.5">
                            <label class="text-sm font-medium text-zinc-300">${f.label}${f.required ? ' *' : ''}</label>
                            <select name="${f.name}" class="w-full rounded-xl border border-zinc-800 bg-zinc-900 px-4 py-2.5 text-sm text-white outline-none transition focus:border-zinc-500">
                                <option value="">Pilih...</option>
                                ${f.options.map(o => `<option value="${o}">${o}</option>`).join('')}
                            </select>
                        </div>`;
                    }
                    return `<div class="space-y-1.5">
                        <label class="text-sm font-medium text-zinc-300">${f.label}${f.required ? ' *' : ''}</label>
                        <input type="${f.type}" name="${f.name}" placeholder="${f.placeholder || ''}" class="w-full rounded-xl border border-zinc-800 bg-zinc-900 px-4 py-2.5 text-sm text-white outline-none transition focus:border-zinc-500 placeholder:text-zinc-600" ${f.required ? 'required' : ''}>
                    </div>`;
                }).join('')}
                <div class="flex flex-wrap items-center gap-3 pt-2">
                    <button type="submit" class="inline-flex items-center gap-2 rounded-xl bg-white px-5 py-2.5 text-sm font-semibold text-black transition hover:bg-zinc-200 active:scale-95">
                        <i data-lucide="download" class="h-4 w-4"></i> Download
                    </button>
                    <button type="reset" class="text-sm text-zinc-500 transition hover:text-zinc-300">Reset</button>
                    <span class="ml-auto text-xs text-zinc-600">${tool.method} • ${tool.endpoint.replace('https://api.alwayscodex.my.id', '')}</span>
                </div>
            </form>
            <div id="result-${tool.id}" class="mt-5 hidden">
                <div class="rounded-xl border border-zinc-800 bg-zinc-950/60 p-4">
                    <div class="flex items-center justify-between mb-3">
                        <span class="text-sm font-medium text-zinc-300">Result</span>
                        <button onclick="window.copyResult('${tool.id}')" class="text-xs text-zinc-500 hover:text-white transition">Copy Response</button>
                    </div>
                    <div id="resultContent-${tool.id}" class="space-y-3"></div>
                </div>
            </div>
            <div id="loading-${tool.id}" class="mt-4 hidden">
                <div class="flex items-center gap-3 text-zinc-400">
                    <div class="spinner"></div>
                    <span class="text-sm">Processing...</span>
                </div>
            </div>
        </div>
    `).join('');

    if (window.lucide) window.lucide.createIcons();

    document.querySelectorAll('#downloaderContainer form').forEach(form => {
        form.addEventListener('submit', async function(e) {
            e.preventDefault();
            const toolId = this.dataset.tool;
            const endpoint = this.dataset.endpoint;
            const method = this.dataset.method;
            await handleRequest(toolId, endpoint, method, this);
        });
    });
}

// ============================================
// HANDLE REQUEST
// ============================================
async function handleRequest(toolId, endpoint, method, form) {
    const loading = document.getElementById(`loading-${toolId}`);
    const resultBox = document.getElementById(`result-${toolId}`);
    const resultContent = document.getElementById(`resultContent-${toolId}`);

    const formData = new FormData(form);
    const data = {};
    let hasFile = false;

    for (const [key, value] of formData.entries()) {
        if (value instanceof File && value.size > 0) {
            hasFile = true;
            data[key] = value;
        } else if (value) {
            data[key] = value;
        }
    }

    loading.classList.remove('hidden');
    resultBox.classList.add('hidden');

    try {
        let response;
        if (hasFile) {
            const fd = new FormData();
            for (const [key, val] of Object.entries(data)) {
                fd.append(key, val);
            }
            response = await fetch(endpoint, { method, body: fd });
        } else {
            response = await fetch(endpoint, {
                method,
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(data)
            });
        }

        const result = await response.json();
        loading.classList.add('hidden');

        if (!response.ok) {
            showToast(`Error: ${result.message || response.statusText}`, 'error');
            return;
        }

        resultBox.classList.remove('hidden');

        const imageUrl = result.url || result.image || result.result || result.link;
        if (imageUrl && typeof imageUrl === 'string' && (imageUrl.startsWith('http') || imageUrl.startsWith('/'))) {
            resultContent.innerHTML = `
                <img src="${imageUrl}" alt="Result" class="preview-img w-full max-h-80 object-contain rounded-lg border border-zinc-800" />
                <div class="flex gap-2 mt-3">
                    <a href="${imageUrl}" target="_blank" class="inline-flex items-center gap-1.5 rounded-lg bg-white px-4 py-2 text-xs font-semibold text-black transition hover:bg-zinc-200">Open</a>
                    <button onclick="window.copyText('${imageUrl}', 'URL copied')" class="inline-flex items-center gap-1.5 rounded-lg border border-zinc-700 px-4 py-2 text-xs font-medium text-zinc-300 transition hover:border-zinc-500 hover:text-white">Copy URL</button>
                    <a href="${imageUrl}" download class="inline-flex items-center gap-1.5 rounded-lg border border-zinc-700 px-4 py-2 text-xs font-medium text-zinc-300 transition hover:border-zinc-500 hover:text-white">
                        <i data-lucide="download" class="h-3.5 w-3.5"></i> Download
                    </a>
                </div>
            `;
        } else {
            resultContent.innerHTML = `
                <div class="code-block">${formatJSON(result)}</div>
                <button onclick="window.copyText('${JSON.stringify(result)}', 'Response copied')" class="mt-2 inline-flex items-center gap-1.5 rounded-lg border border-zinc-700 px-4 py-2 text-xs font-medium text-zinc-300 transition hover:border-zinc-500 hover:text-white">
                    <i data-lucide="copy" class="h-3.5 w-3.5"></i> Copy Response
                </button>
            `;
        }

        resultContent.dataset.raw = JSON.stringify(result);
        showToast('Request successful!', 'success');

        if (window.lucide) window.lucide.createIcons();

    } catch (err) {
        loading.classList.add('hidden');
        showToast(`Something went wrong: ${err.message}`, 'error');
    }
}

// ============================================
// COPY RESULT
// ============================================
export function copyResult(toolId) {
    const content = document.getElementById(`resultContent-${toolId}`);
    if (content && content.dataset.raw) {
        copyText(content.dataset.raw, 'Response copied');
    } else {
        showToast('Tidak ada data untuk disalin', 'error');
    }
}

// ============================================
// EXPOSE TO WINDOW
// ============================================
window.ALL_TOOLS = ALL_TOOLS;
window.CANVAS_TOOLS = CANVAS_TOOLS;
window.DOWNLOADER_TOOLS = DOWNLOADER_TOOLS;
window.CATEGORY_LABELS = CATEGORY_LABELS;
window.showToast = showToast;
window.copyText = copyText;
window.openDetail = openDetail;
window.closeDetail = closeDetail;
window.copyResult = copyResult;
window.renderAllTools = renderAllTools;
window.renderCanvasTools = renderCanvasTools;
window.renderDownloaderTools = renderDownloaderTools;