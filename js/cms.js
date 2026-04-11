/**
 * CMS Integration Script
 * Connects to MicroCMS to fetch Career / Works / Blog data.
 */

// --- Configuration ---
const SERVICE_DOMAIN = "u3jiym64ap";
const API_KEY = "fwON8t124kw6PBxxybvnNyFAiL3h1wShiMEi";
const BASE_URL = `https://${SERVICE_DOMAIN}.microcms.io/api/v1`;

const VALID_TYPES = ["career", "works", "blog"];
const LIST_PAGE_BY_TYPE = {
    career: "index.html",
    works: "works.html",
    blog: "blog.html"
};
const FALLBACK_IMAGE_BY_TYPE = {
    career: "images/portfolio-example-01.jpg",
    works: "images/portfolio-example-01.jpg",
    blog: "images/example-blog01.jpg"
};

// --- Utility ---
function escapeHtml(value) {
    return String(value ?? "")
        .replace(/&/g, "&amp;")
        .replace(/</g, "&lt;")
        .replace(/>/g, "&gt;")
        .replace(/\"/g, "&quot;")
        .replace(/'/g, "&#39;");
}

function formatDate(value) {
    if (!value) return "";

    const date = new Date(value);
    if (Number.isNaN(date.getTime())) return "";

    return date.toLocaleDateString("ja-JP", {
        year: "numeric",
        month: "2-digit",
        day: "2-digit"
    });
}

function getDescription(item) {
    return item?.description || item?.excerpt || item?.summary || "";
}

function getBodyHtml(item) {
    return item?.body || item?.content || getDescription(item) || "";
}

function getImageUrl(item, type) {
    if (item?.image?.url) return item.image.url;
    if (typeof item?.image === "string" && item.image) return item.image;
    if (item?.thumbnail?.url) return item.thumbnail.url;
    if (typeof item?.thumbnail === "string" && item.thumbnail) return item.thumbnail;
    return FALLBACK_IMAGE_BY_TYPE[type] || FALLBACK_IMAGE_BY_TYPE.career;
}

function upgradeMdl(container) {
    if (
        container &&
        window.componentHandler &&
        typeof window.componentHandler.upgradeElements === "function"
    ) {
        window.componentHandler.upgradeElements(container);
    }
}

function buildCardHtml(item, type) {
    const imageUrl = getImageUrl(item, type);
    const fallbackImage = FALLBACK_IMAGE_BY_TYPE[type] || FALLBACK_IMAGE_BY_TYPE.career;
    const title = escapeHtml(item?.title || "Untitled");
    const description = getDescription(item);
    const date = type === "blog" ? formatDate(item?.publishedAt) : "";
    const id = encodeURIComponent(item?.id || "");
    const safeType = encodeURIComponent(type);

    return `
        <div class="mdl-cell mdl-card mdl-shadow--4dp portfolio-card">
            <div class="mdl-card__media">
                <img
                    class="article-image"
                    src="${imageUrl}"
                    border="0"
                    alt="${title}"
                    onerror="this.onerror=null;this.src='${fallbackImage}';"
                >
            </div>
            <div class="mdl-card__title">
                <h2 class="mdl-card__title-text">${title}</h2>
            </div>
            <div class="mdl-card__supporting-text">
                ${date ? `<span>${date}</span><br>` : ""}
                ${description || "説明はまだありません。"}
            </div>
            <div class="mdl-card__actions mdl-card--border">
                <a
                    class="mdl-button mdl-button--colored mdl-js-button mdl-js-ripple-effect mdl-button--accent"
                    href="article.html?id=${id}&type=${safeType}"
                >Read more</a>
            </div>
        </div>
    `;
}

// --- Fetch Functions ---
async function fetchData(endpoint) {
    if (SERVICE_DOMAIN === "YOUR_SERVICE_DOMAIN") {
        console.warn("MicroCMS is not configured. Using mock data.");
        return getMockData(endpoint);
    }

    try {
        const response = await fetch(`${BASE_URL}/${endpoint}`, {
            headers: {
                "X-MICROCMS-API-KEY": API_KEY
            }
        });

        if (!response.ok) {
            throw new Error(`API Error: ${response.status} ${response.statusText}`);
        }

        const data = await response.json();
        return Array.isArray(data?.contents) ? data.contents : [];
    } catch (error) {
        console.error(`Fetch error for list endpoint \"${endpoint}\":`, error);
        return getMockData(endpoint);
    }
}

async function fetchDetail(type, id) {
    if (!VALID_TYPES.includes(type)) {
        throw new Error(`Unsupported content type: ${type}`);
    }

    if (SERVICE_DOMAIN === "YOUR_SERVICE_DOMAIN") {
        return getMockItem(type, id);
    }

    try {
        const response = await fetch(`${BASE_URL}/${type}/${encodeURIComponent(id)}`, {
            headers: {
                "X-MICROCMS-API-KEY": API_KEY
            }
        });

        if (!response.ok) {
            throw new Error(`API Error: ${response.status} ${response.statusText}`);
        }

        return await response.json();
    } catch (error) {
        console.error(`Fetch error for detail endpoint \"${type}/${id}\":`, error);
        return getMockItem(type, id);
    }
}

// --- Mock Data (Fallback) ---
function getMockData(endpoint) {
    if (endpoint === "career") return mockCareerData;
    if (endpoint === "blog") return mockBlogData;
    if (endpoint === "works") return mockWorksData;
    return [];
}

function getMockItem(type, id) {
    const list = type === "blog"
        ? mockBlogData
        : type === "works"
            ? mockWorksData
            : mockCareerData;

    return list.find((item) => item.id === id) || null;
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
    }
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
async function renderCollection(containerId, type) {
    const container = document.getElementById(containerId);
    if (!container) return;

    const data = await fetchData(type);

    if (!Array.isArray(data) || data.length === 0) {
        container.innerHTML = `
            <div class="mdl-cell mdl-cell--12-col mdl-card mdl-shadow--2dp">
                <div class="mdl-card__supporting-text">
                    まだ表示できる${escapeHtml(type)}データがありません。
                </div>
            </div>
        `;
        upgradeMdl(container);
        return;
    }

    container.innerHTML = data.map((item) => buildCardHtml(item, type)).join("");
    upgradeMdl(container);
}

async function renderCareer(containerId) {
    await renderCollection(containerId, "career");
}

async function renderBlog(containerId) {
    await renderCollection(containerId, "blog");
}

async function renderWorks(containerId) {
    await renderCollection(containerId, "works");
}

async function renderArticle(containerId) {
    const container = document.getElementById(containerId);
    if (!container) return;

    const urlParams = new URLSearchParams(window.location.search);
    const id = urlParams.get("id");
    const requestedType = urlParams.get("type") || "career";
    const type = VALID_TYPES.includes(requestedType) ? requestedType : "career";
    const listPage = LIST_PAGE_BY_TYPE[type] || "index.html";

    if (!id) {
        container.innerHTML = `
            <div class="mdl-cell mdl-cell--12-col mdl-card mdl-shadow--4dp">
                <div class="mdl-card__title">
                    <h1 class="mdl-card__title-text">記事を表示できません</h1>
                </div>
                <div class="mdl-card__supporting-text">
                    URL に id が含まれていません。
                </div>
                <div class="mdl-card__actions mdl-card--border">
                    <a class="mdl-button mdl-button--colored mdl-js-button mdl-js-ripple-effect" href="${listPage}">一覧へ戻る</a>
                </div>
            </div>
        `;
        upgradeMdl(container);
        return;
    }

    const item = await fetchDetail(type, id);

    if (!item) {
        container.innerHTML = `
            <div class="mdl-cell mdl-cell--12-col mdl-card mdl-shadow--4dp">
                <div class="mdl-card__title">
                    <h1 class="mdl-card__title-text">記事が見つかりません</h1>
                </div>
                <div class="mdl-card__supporting-text">
                    指定された記事（ID: ${escapeHtml(id)}）は存在しないか、取得できませんでした。
                </div>
                <div class="mdl-card__actions mdl-card--border">
                    <a class="mdl-button mdl-button--colored mdl-js-button mdl-js-ripple-effect" href="${listPage}">一覧へ戻る</a>
                </div>
            </div>
        `;
        upgradeMdl(container);
        return;
    }

    const imageUrl = getImageUrl(item, type);
    const fallbackImage = FALLBACK_IMAGE_BY_TYPE[type] || FALLBACK_IMAGE_BY_TYPE.career;
    const title = escapeHtml(item?.title || "Untitled");
    const date = type === "blog" ? formatDate(item?.publishedAt) : "";
    const bodyHtml = getBodyHtml(item);

    document.title = `${item?.title || "Article Detail"} | My Portfolio`;

    container.innerHTML = `
        <div class="mdl-cell mdl-cell--12-col mdl-card mdl-shadow--4dp">
            <div class="mdl-card__media">
                <img
                    class="article-image"
                    src="${imageUrl}"
                    border="0"
                    alt="${title}"
                    style="max-height: 400px; object-fit: cover;"
                    onerror="this.onerror=null;this.src='${fallbackImage}';"
                >
            </div>
            <div class="mdl-card__title">
                <h1 class="mdl-card__title-text">${title}</h1>
            </div>
            <div class="mdl-card__supporting-text">
                ${date ? `<p>${date}</p>` : ""}
                <div class="article-body">
                    ${bodyHtml || "本文はまだありません。"}
                </div>
            </div>
            <div class="mdl-card__actions mdl-card--border">
                <a class="mdl-button mdl-button--colored mdl-js-button mdl-js-ripple-effect" href="${listPage}">一覧へ戻る</a>
            </div>
        </div>
    `;

    upgradeMdl(container);
}

// --- Initialization ---
document.addEventListener("DOMContentLoaded", () => {
    renderCareer("career-list");
    renderBlog("blog-list");
    renderWorks("works-list");
    renderArticle("article-detail");
});
