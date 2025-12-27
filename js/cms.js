/**
 * CMS Integration Script
 * Connects to MicroCMS to fetch Career and Blog data.
 */

// --- Configuration ---
// TODO: Replace these with your actual MicroCMS credentials
const SERVICE_DOMAIN = "u3jiym64ap"; // e.g., "my-portfolio"
const API_KEY = "fwON8t124kw6PBxxybvnNyFAiL3h1wShiMEi"; // e.g., "xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx"

const BASE_URL = `https://${SERVICE_DOMAIN}.microcms.io/api/v1`;

// --- Fetch Functions ---

async function fetchData(endpoint) {
    if (SERVICE_DOMAIN === "YOUR_SERVICE_DOMAIN") {
        console.warn("MicroCMS is not configured. Using Mock Data.");
        return getMockData(endpoint);
    }

    try {
        const response = await fetch(`${BASE_URL}/${endpoint}`, {
            headers: {
                "X-MICROCMS-API-KEY": API_KEY
            }
        });
        if (!response.ok) throw new Error(`API Error: ${response.statusText}`);
        const data = await response.json();
        return data.contents;
    } catch (error) {
        console.error("Fetch error:", error);
        return getMockData(endpoint); // Fallback to mock data on error
    }
}

// --- Mock Data (Fallback) ---
function getMockData(endpoint) {
    if (endpoint === 'career') return mockCareerData;
    if (endpoint === 'blog') return mockBlogData;
    if (endpoint === 'works') return mockWorksData;
    return [];
}

const mockWorksData = [
    {
        id: "work1",
        title: "ポートフォリオサイト",
        image: { url: "images/portfolio-example-01.jpg" },
        description: "このポートフォリオサイトです。Material Design Liteを使用しています。",
        body: "<p>詳細な内容がここに入ります。</p>"
    },
    {
        id: "work2",
        title: "サンプル作品",
        image: { url: "images/portfolio-example-01.jpg" },
        description: "サンプルの作品です。",
        body: "<p>詳細な内容がここに入ります。</p>"
    }
];

const mockCareerData = [
    {
        id: "game",
        title: "ゲーム",
        image: { url: "images/carrer-game.png" },
        description: "Unityを用いてゲーム制作に取り組む。<br>3D、2D両方の作品に挑戦し、技術力の向上を目指す。",
        body: "<p>詳細な内容がここに入ります。</p>"
    },
    {
        id: "dot",
        title: "ドット絵",
        image: { url: "images/carrer-Dot.png" },
        description: "ゲーム素材自作のため、ドット絵を書く。",
        body: "<p>詳細な内容がここに入ります。</p>"
    },
    // ... (Keep other mock items if needed for testing)
];

const mockBlogData = [
    {
        id: "blog1",
        title: "Velit anim eiusmod labore sit amet",
        image: { url: "images/example-blog01.jpg" },
        publishedAt: "2023-11-20T00:00:00Z",
        description: "Excepteur reprehenderit sint exercitation ipsum consequat qui sit id velit elit.",
        category: { name: "Latest" },
        body: "<p>Blog post content...</p>"
    }
];

// --- Rendering Functions ---

async function renderCareer(containerId) {
    const container = document.getElementById(containerId);
    if (!container) return;

    const data = await fetchData('career');

    let html = '';
    data.forEach(item => {
        const imageUrl = item.image ? item.image.url : 'images/portfolio-example-01.jpg';
        html += `
            <div class="mdl-cell mdl-card mdl-shadow--4dp portfolio-card">
                <div class="mdl-card__media">
                    <img class="article-image" src="${imageUrl}" border="0" alt="${item.title}" onerror="this.src='images/portfolio-example-01.jpg';">
                </div>
                <div class="mdl-card__title">
                    <h2 class="mdl-card__title-text">${item.title}</h2>
                </div>
                <div class="mdl-card__supporting-text">
                    ${item.description}
                </div>
                <div class="mdl-card__actions mdl-card--border">
                    <a class="mdl-button mdl-button--colored mdl-js-button mdl-js-ripple-effect mdl-button--accent" href="article.html?id=${item.id}&type=career">Read more</a>
                </div>
            </div>
        `;
    });
    container.innerHTML = html;
}

async function renderBlog(containerId) {
    const container = document.getElementById(containerId);
    if (!container) return;

    const data = await fetchData('blog');

    let html = '';
    data.forEach(item => {
        const imageUrl = item.image ? item.image.url : 'images/example-blog01.jpg';
        const date = item.publishedAt ? new Date(item.publishedAt).toLocaleDateString() : '';

        html += `
            <div class="mdl-cell mdl-card mdl-shadow--4dp portfolio-card">
                <div class="mdl-card__media">
                    <img class="article-image" src="${imageUrl}" border="0" alt="${item.title}" onerror="this.src='images/example-blog01.jpg';">
                </div>
                <div class="mdl-card__title">
                    <h2 class="mdl-card__title-text">${item.title}</h2>
                </div>
                <div class="mdl-card__supporting-text">
                    <span>${date}</span><br>
                    ${item.description}
                </div>
                <div class="mdl-card__actions mdl-card--border">
                    <a class="mdl-button mdl-button--colored mdl-js-button mdl-js-ripple-effect mdl-button--accent" href="article.html?id=${item.id}&type=blog">Read more</a>
                </div>
            </div>
        `;
    });
    container.innerHTML = html;
}

async function renderWorks(containerId) {
    const container = document.getElementById(containerId);
    if (!container) return;

    const data = await fetchData('works');

    let html = '';
    data.forEach(item => {
        const imageUrl = item.image ? item.image.url : 'images/portfolio-example-01.jpg';
        html += `
            <div class="mdl-cell mdl-card mdl-shadow--4dp portfolio-card">
                <div class="mdl-card__media">
                    <img class="article-image" src="${imageUrl}" border="0" alt="${item.title}" onerror="this.src='images/portfolio-example-01.jpg';">
                </div>
                <div class="mdl-card__title">
                    <h2 class="mdl-card__title-text">${item.title}</h2>
                </div>
                <div class="mdl-card__supporting-text">
                    ${item.description}
                </div>
                <div class="mdl-card__actions mdl-card--border">
                    <a class="mdl-button mdl-button--colored mdl-js-button mdl-js-ripple-effect mdl-button--accent" href="article.html?id=${item.id}&type=works">Read more</a>
                </div>
            </div>
        `;
    });
    container.innerHTML = html;
}

async function renderArticle(containerId) {
    const container = document.getElementById(containerId);
    if (!container) return;

    const urlParams = new URLSearchParams(window.location.search);
    const id = urlParams.get('id');
    const type = urlParams.get('type') || 'career'; // Default to career if not specified

    if (!id) return;

    // Fetch single item details
    let item = null;

    // Function to get mock item
    const getMockItem = () => {
        const list = type === 'blog' ? mockBlogData : (type === 'works' ? mockWorksData : mockCareerData);
        return list.find(d => d.id === id);
    };

    if (SERVICE_DOMAIN === "YOUR_SERVICE_DOMAIN") {
        // Mock fallback
        item = getMockItem();
    } else {
        try {
            const response = await fetch(`${BASE_URL}/${type}/${id}`, {
                headers: { "X-MICROCMS-API-KEY": API_KEY }
            });
            if (!response.ok) throw new Error(`API Error: ${response.statusText}`);
            item = await response.json();
        } catch (e) {
            console.error("Fetch error, falling back to mock data:", e);
            item = getMockItem();
        }
    }

    if (item) {
        const imageUrl = item.image ? item.image.url : '';
        const date = item.publishedAt ? new Date(item.publishedAt).toLocaleDateString() : '';

        container.innerHTML = `
            <div class="mdl-cell mdl-cell--12-col mdl-card mdl-shadow--4dp">
                <div class="mdl-card__media">
                    ${imageUrl ? `<img class="article-image" src="${imageUrl}" border="0" alt="${item.title}" style="max-height: 400px; object-fit: cover;">` : ''}
                </div>
                <div class="mdl-card__title">
                    <h1 class="mdl-card__title-text">${item.title}</h1>
                </div>
                <div class="mdl-card__supporting-text">
                    ${date ? `<span>${date}</span><br><br>` : ''}
                    <div class="article-body">
                        ${item.body || item.description}
                    </div>
                </div>
                <div class="mdl-card__actions mdl-card--border">
                    <a class="mdl-button mdl-button--colored mdl-js-button mdl-js-ripple-effect" href="javascript:history.back()">Back</a>
                </div>
            </div>
        `;
    } else {
        container.innerHTML = '<p>Article not found.</p>';
    }
}

// --- Initialization ---

document.addEventListener('DOMContentLoaded', () => {
    renderCareer('career-list');
    renderBlog('blog-list');
    renderWorks('works-list');
    renderArticle('article-detail');
});
