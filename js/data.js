// ============================================
// ALL TOOLS DATA - Dari rest_api_rapi_lengkap.txt
// ============================================

export const ALL_TOOLS = [
    // ========== CANVAS TOOLS (5) ==========
    {
        id: 'reminder',
        name: 'Reminder - NoerzXcode',
        category: 'canvas',
        icon: 'bell',
        fungsi: 'Membuat gambar reminder dengan teks dan footer yang dapat disesuaikan.',
        endpoint: 'https://api.alwayscodex.my.id/api/canvas/reminder',
        method: 'POST',
        fields: [
            { name: 'text', label: 'Text', type: 'text', placeholder: 'NoerXcode', required: true },
            { name: 'footer', label: 'Footer', type: 'text', placeholder: 'noerholic', required: true }
        ]
    },
    {
        id: 'applemusic',
        name: 'Apple Music - NoerzXcode',
        category: 'canvas',
        icon: 'music',
        fungsi: 'Membuat tampilan kartu Apple Music berdasarkan judul, artis, cover, durasi, progress, dan warna.',
        endpoint: 'https://api.alwayscodex.my.id/api/canvas/applemusic',
        method: 'POST',
        fields: [
            { name: 'title', label: 'Title', type: 'text', placeholder: 'NoerXcode', required: true },
            { name: 'artist', label: 'Artists', type: 'text', placeholder: 'noerholic', required: true },
            { name: 'cover', label: 'Cover URL', type: 'url', placeholder: 'https://files.soonex.biz.id/cc0e64906c2c.png', required: true },
            { name: 'current', label: 'Current (mm:ss)', type: 'text', placeholder: '2:40', required: true },
            { name: 'total', label: 'Total (mm:ss)', type: 'text', placeholder: '4:20', required: true },
            { name: 'progress', label: 'Progress (0-100)', type: 'number', placeholder: '53', required: true },
            { name: 'color1', label: 'Color 1', type: 'color', required: true },
            { name: 'color2', label: 'Color 2', type: 'color', required: true },
            { name: 'color3', label: 'Color 3', type: 'color', required: true }
        ]
    },
    {
        id: 'brat',
        name: 'Brat Generator - NoerzXcode',
        category: 'canvas',
        icon: 'sparkles',
        fungsi: 'Membuat gambar bergaya Brat dari teks dengan pilihan tema, blur, dan mode.',
        endpoint: 'https://api.alwayscodex.my.id/api/canvas/brat',
        method: 'POST',
        fields: [
            { name: 'text', label: 'Input text', type: 'text', placeholder: 'NoerXcode', required: true },
            { name: 'theme', label: 'Theme', type: 'select', options: ['white', 'black', 'green', 'pink'], required: false },
            { name: 'blur', label: 'Blur effect', type: 'select', options: ['1', '2', '3'], required: false },
            { name: 'mode', label: 'Mode', type: 'select', options: ['left', 'center', 'right'], required: false }
        ]
    },
    {
        id: 'fakecall',
        name: 'Fake Call iOS - NoerzXcode',
        category: 'canvas',
        icon: 'phone',
        fungsi: 'Membuat tampilan simulasi panggilan masuk bergaya iOS berdasarkan nama, durasi, dan avatar.',
        endpoint: 'https://api.alwayscodex.my.id/api/maker/fakecall-ios',
        method: 'POST',
        fields: [
            { name: 'name', label: 'Name', type: 'text', placeholder: 'NoerzXcode', required: true },
            { name: 'duration', label: 'Duration (mm:ss)', type: 'text', placeholder: '00:00', required: true },
            { name: 'avatar', label: 'Avatar URL', type: 'url', placeholder: 'https://example.com/avatar.jpg', required: true }
        ]
    },
    {
        id: 'fakenotif',
        name: 'Fake Notif WA - NoerzXcode',
        category: 'canvas',
        icon: 'message-circle',
        fungsi: 'Membuat tampilan simulasi notifikasi chat WhatsApp berdasarkan username, chat, profil, tanggal, dan jam.',
        endpoint: 'https://api.alwayscodex.my.id/api/maker/fakenotifwa',
        method: 'POST',
        fields: [
            { name: 'username', label: 'Username', type: 'text', placeholder: 'NoerzXcode', required: true },
            { name: 'chat', label: 'Chat', type: 'text', placeholder: 'Gua nanya google, google nya nanya epen jir', required: true },
            { name: 'ppurl', label: 'Profile URL', type: 'url', placeholder: 'https://uploader.zenzxz.dpdns.org/uploads/1772884412595.jpeg', required: true },
            { name: 'tanggal', label: 'Tanggal', type: 'text', placeholder: 'Senin, 6 Maret', required: true },
            { name: 'jam', label: 'Jam', type: 'text', placeholder: '6.39', required: true }
        ]
    },

    // ========== DOWNLOADER TOOLS (3) ==========
    {
        id: 'pinvid',
        name: 'Pinvid Downloader - NoerzXcode',
        category: 'downloader',
        icon: 'download',
        fungsi: 'Mengunduh video dari Pinterest menggunakan URL.',
        endpoint: 'https://api.alwayscodex.my.id/api/downloader/pinterest-dl',
        method: 'POST',
        fields: [
            { name: 'url', label: 'Pinterest URL', type: 'url', placeholder: 'https://pin.it/NoerzXcode', required: true }
        ]
    },
    {
        id: 'noerzxdl',
        name: 'NoerzxDL - NoerzXcode',
        category: 'downloader',
        icon: 'cloud-download',
        fungsi: 'Mengunduh video atau audio dari berbagai platform menggunakan URL.',
        endpoint: 'https://api.alwayscodex.my.id/api/downloader/savefrom',
        method: 'POST',
        fields: [
            { name: 'url', label: 'URL', type: 'url', placeholder: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ', required: true },
            { name: 'type', label: 'Type', type: 'select', options: ['video', 'audio'], required: true }
        ]
    },
    {
        id: 'spotifydl',
        name: 'Spotify Downloader - NoerzXcode',
        category: 'downloader',
        icon: 'headphones',
        fungsi: 'Mengunduh lagu dari Spotify menggunakan URL.',
        endpoint: 'https://api.alwayscodex.my.id/api/downloader/spotify',
        method: 'POST',
        fields: [
            { name: 'url', label: 'Spotify URL', type: 'url', placeholder: 'https://open.spotify.com/track/3y8RcMPYG22fRnrOi4oFJ1', required: true }
        ]
    },

    // ========== OTHER TOOLS (7) ==========
    {
        id: 'hdvideo',
        name: 'HD Video - NoerzXcode',
        category: 'tools',
        icon: 'video',
        fungsi: 'Meningkatkan kualitas video dengan pengaturan FPS, resolusi, enhancement, denoise, stabilizer, dan format.',
        endpoint: 'https://api.alwayscodex.my.id/api/hdvideo/tohd',
        method: 'POST',
        fields: [
            { name: 'video', label: 'Upload Mp4', type: 'file', required: true },
            { name: 'fps', label: 'Fps', type: 'select', options: ['30', '60', '120'], required: false },
            { name: 'resolution', label: 'Resolution', type: 'select', options: ['480', '720', '1080', '1440', '4k', '8k'], required: false },
            { name: 'enhance', label: 'Enhance', type: 'select', options: ['yes', 'no'], required: false },
            { name: 'denoise', label: 'Denoise', type: 'select', options: ['yes', 'no'], required: false },
            { name: 'stabilize', label: 'Stabilizer', type: 'select', options: ['yes', 'no'], required: false },
            { name: 'format', label: 'Format', type: 'select', options: ['mp4', 'gif', 'webm'], required: false }
        ]
    },
    {
        id: 'catbox',
        name: 'Catbox - NoerzXcode',
        category: 'tools',
        icon: 'upload',
        fungsi: 'Mengunggah file ke Catbox dan menghasilkan tautan file.',
        endpoint: 'https://api.alwayscodex.my.id/api/tools/catbox',
        method: 'POST',
        fields: [
            { name: 'file', label: 'Upload file', type: 'file', required: true }
        ]
    },
    {
        id: 'otpspam',
        name: 'OTP Spam - NoerzXcode',
        category: 'tools',
        icon: 'shield-alert',
        fungsi: 'Mengotomatisasi permintaan OTP ke nomor yang dimasukkan.',
        endpoint: 'https://api.alwayscodex.my.id/api/tools/spam-otp',
        method: 'POST',
        fields: [
            { name: 'number', label: 'Number', type: 'text', placeholder: '6281234567890', required: true }
        ]
    },
    {
        id: 'reactch',
        name: 'React CH - NoerzXcode',
        category: 'tools',
        icon: 'smile',
        fungsi: 'Menambahkan reaksi pada postingan channel WhatsApp menggunakan URL dan emoji.',
        endpoint: 'https://api.alwayscodex.my.id/api/fun/reach-ch',
        method: 'POST',
        fields: [
            { name: 'url', label: 'URL', type: 'url', placeholder: 'https://whatsapp.com/channel/0029Vbxxxx/175', required: true },
            { name: 'emojis', label: 'Emojis', type: 'text', placeholder: '🔥 ✨', required: true }
        ]
    },
    {
        id: 'tikboost',
        name: 'TikTok Boost - NoerzXcode',
        category: 'tools',
        icon: 'trending-up',
        fungsi: 'Mengotomatisasi permintaan boost like/view pada video TikTok dengan batas jumlah yang tersedia.',
        endpoint: 'https://api.alwayscodex.my.id/api/fun/tikboost',
        method: 'POST',
        fields: [
            { name: 'url', label: 'URL', type: 'url', placeholder: 'https://vt.tiktok.com/ZSxG2tLqL/', required: true },
            { name: 'amount', label: 'Amount', type: 'number', placeholder: '50', required: true }
        ]
    },
    {
        id: 'tikviews',
        name: 'TikTok Views - NoerzXcode',
        category: 'tools',
        icon: 'eye',
        fungsi: 'Memproses permintaan boost views pada video TikTok menggunakan URL.',
        endpoint: 'https://api.alwayscodex.my.id/api/fun/tiktokview',
        method: 'POST',
        fields: [
            { name: 'url', label: 'URL', type: 'url', placeholder: 'https://vt.tiktok.com/ZSxG2tLqL/', required: true }
        ]
    },
    {
        id: 'ttstatus',
        name: 'TTView Status - NoerzXcode',
        category: 'tools',
        icon: 'clock',
        fungsi: 'Memeriksa status proses TikTok Views berdasarkan ID proses.',
        endpoint: 'https://api.alwayscodex.my.id/api/fun/tiktokviewstatus',
        method: 'POST',
        fields: [
            { name: 'id', label: 'ID', type: 'text', placeholder: '10533', required: true }
        ]
    }
];

export const CANVAS_TOOLS = ALL_TOOLS.filter(t => t.category === 'canvas');
export const DOWNLOADER_TOOLS = ALL_TOOLS.filter(t => t.category === 'downloader');
export const OTHER_TOOLS = ALL_TOOLS.filter(t => t.category === 'tools');

export const CATEGORY_LABELS = {
    canvas: 'Canvas',
    downloader: 'Downloader',
    tools: 'Tools'
};

export const STATS = {
    total: ALL_TOOLS.length,
    canvas: CANVAS_TOOLS.length,
    downloader: DOWNLOADER_TOOLS.length,
    api: ALL_TOOLS.length
};