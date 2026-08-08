// ============================================
// TOAST NOTIFICATION
// ============================================
export function showToast(message, type = 'info') {
    const container = document.getElementById('toastContainer');
    if (!container) return;

    const colors = {
        info: 'bg-zinc-800 border-zinc-700 text-white',
        success: 'bg-emerald-900/80 border-emerald-700 text-emerald-100',
        error: 'bg-red-900/80 border-red-700 text-red-100'
    };

    const el = document.createElement('div');
    el.className = `toast pointer-events-auto rounded-xl border px-5 py-3 text-sm font-medium shadow-xl ${colors[type] || colors.info}`;
    el.textContent = message;
    container.appendChild(el);

    setTimeout(() => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(12px)';
        el.style.transition = 'all 0.3s ease';
        setTimeout(() => el.remove(), 300);
    }, 3500);
}

// ============================================
// COPY TO CLIPBOARD
// ============================================
export function copyText(text, msg = 'Copied!') {
    if (navigator.clipboard) {
        navigator.clipboard.writeText(text).then(() => {
            showToast(msg, 'success');
        }).catch(() => fallbackCopy(text, msg));
    } else {
        fallbackCopy(text, msg);
    }
}

function fallbackCopy(text, msg) {
    const ta = document.createElement('textarea');
    ta.value = text;
    ta.style.position = 'fixed';
    ta.style.opacity = '0';
    document.body.appendChild(ta);
    ta.select();
    document.execCommand('copy');
    ta.remove();
    showToast(msg, 'success');
}

// ============================================
// FORMAT JSON
// ============================================
export function formatJSON(obj) {
    try {
        return JSON.stringify(obj, null, 2);
    } catch {
        return String(obj);
    }
}

// ============================================
// GENERATE REQUEST BODY EXAMPLE
// ============================================
export function generateExampleBody(fields) {
    const body = {};
    fields.forEach(f => {
        if (f.type === 'file') return;
        if (f.type === 'select' && f.options) {
            body[f.name] = f.options[0] || 'value';
        } else if (f.type === 'color') {
            body[f.name] = '#7b2cbf';
        } else {
            body[f.name] = `example_${f.name}`;
        }
    });
    return body;
}