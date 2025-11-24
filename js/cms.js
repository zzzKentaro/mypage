/**
 * CMS Integration Script
 * Currently uses Mock Data. Replace 'mockData' with API fetch calls to MicroCMS in production.
 */

// --- Mock Data ---

const careerData = [
    {
        id: "game",
        title: "ゲーム",
        image: "images/carrer-game.png",
        description: "Unityを用いてゲーム制作に取り組む。<br>3D、2D両方の作品に挑戦し、技術力の向上を目指す。<br>制作したゲームは学祭での展示やコンテストへの応募に活用しており、誰もが楽しめるゲームを作ることを心掛ける。<br>また、企画職を志望しているため、ゲームの企画立案、企画書作成にも力を入れる。",
        detailUrl: "article.html?id=game"
    },
    {
        id: "dot",
        title: "ドット絵",
        image: "images/carrer-Dot.png",
        description: "ゲーム素材自作のため、ドット絵を書く。",
        detailUrl: "article.html?id=dot"
    },
    {
        id: "kijima",
        title: "木島研究室",
        image: "images/carrer-kijimaG.jpg",
        description: "学部三年の後期より、木島研究室に所属。",
        detailUrl: "article.html?id=kijima"
    },
    {
        id: "digital",
        title: "デジタル創作サークル",
        image: "images/carrer-deji.png",
        description: "2024年より発足したデジタル創作サークルに所属。<br>副部長。",
        detailUrl: "article.html?id=digital"
    },
    {
        id: "kamige",
        title: "神ゲー創造主エボリューション",
        image: "images/carrer-kamige.png",
        description: "2024年、神ゲー創造主エボリューションに『境界のルールイア』を応募。<br>一次審査を通過し、12月に開催された最終審査会および展示会において、作品を展示。",
        detailUrl: "article.html?id=kamige"
    },
    {
        id: "jichikai",
        title: "岐阜大学工学部学生自治会",
        image: "images/carrer-jichikai.jpg",
        description: "岐阜大学工学部学生自治会に所属。",
        detailUrl: "article.html?id=jichikai"
    },
    {
        id: "wanderfogel",
        title: "ワンダーフォーゲル部",
        image: "images/carrer-wanderfogel.jpg",
        description: "登山やキャンプを主な活動としている岐阜大学ワンダーフォーゲル部に所属していた。<br>御在所岳、乗鞍岳、立山連峰、上高地、富士山の登山を自分たちで計画、実行した。",
        detailUrl: "article.html?id=wanderfogel"
    },
    {
        id: "aikido",
        title: "合気道部",
        image: "images/example-work06.jpg",
        description: "2025年より、岐阜大学合気道部に入部。",
        detailUrl: "article.html?id=aikido"
    },
    {
        id: "india",
        title: "Spring School Program 2025",
        image: "images/carrer-india.png",
        description: "2025年3月、IITG(インド工科大学グワハティ校)に二週間の短期留学に行く。",
        detailUrl: "article.html?id=india"
    }
];

const blogData = [
    {
        id: "blog1",
        title: "Velit anim eiusmod labore sit amet",
        image: "images/example-blog01.jpg",
        date: "Posted 2 days ago",
        description: "Excepteur reprehenderit sint exercitation ipsum consequat qui sit id velit elit. Velit anim eiusmod labore sit amet...",
        category: "Latest",
        detailUrl: "article.html?id=blog1"
    },
    {
        id: "blog2",
        title: "Voluptate voluptate",
        image: "images/example-blog02.jpg",
        date: "Posted 2 days ago",
        description: "Excepteur reprehenderit sint exercitation ipsum consequat qui sit id velit elit. Velit anim eiusmod labore sit amet...",
        category: "Latest",
        detailUrl: "article.html?id=blog2"
    },
    {
        id: "blog3",
        title: "Pamukkale",
        image: "images/example-blog03.jpg",
        date: "Posted 3 days ago",
        description: "Beautiful scenery from Pamukkale.",
        category: "Travel",
        detailUrl: "article.html?id=blog3"
    }
];

// --- Rendering Functions ---

function renderCareer(containerId) {
    const container = document.getElementById(containerId);
    if (!container) return;

    let html = '';
    careerData.forEach(item => {
        html += `
            <div class="mdl-cell mdl-card mdl-shadow--4dp portfolio-card">
                <div class="mdl-card__media">
                    <img class="article-image" src="${item.image}" border="0" alt="${item.title}" onerror="this.src='images/portfolio-example-01.jpg';">
                </div>
                <div class="mdl-card__title">
                    <h2 class="mdl-card__title-text">${item.title}</h2>
                </div>
                <div class="mdl-card__supporting-text">
                    ${item.description}
                </div>
                <div class="mdl-card__actions mdl-card--border">
                    <a class="mdl-button mdl-button--colored mdl-js-button mdl-js-ripple-effect mdl-button--accent" href="${item.detailUrl}">Read more</a>
                </div>
            </div>
        `;
    });
    container.innerHTML = html;
}

function renderBlog(containerId) {
    const container = document.getElementById(containerId);
    if (!container) return;

    let html = '';
    blogData.forEach(item => {
        html += `
            <div class="mdl-cell mdl-card mdl-shadow--4dp portfolio-card">
                <div class="mdl-card__media">
                    <img class="article-image" src="${item.image}" border="0" alt="${item.title}" onerror="this.src='images/example-blog01.jpg';">
                </div>
                <div class="mdl-card__title">
                    <h2 class="mdl-card__title-text">${item.title}</h2>
                </div>
                <div class="mdl-card__supporting-text">
                    <span>${item.date}</span><br>
                    ${item.description}
                </div>
                <div class="mdl-card__actions mdl-card--border">
                    <a class="mdl-button mdl-button--colored mdl-js-button mdl-js-ripple-effect mdl-button--accent" href="${item.detailUrl}">Read more</a>
                </div>
            </div>
        `;
    });
    container.innerHTML = html;
}

function renderArticle(containerId) {
    const container = document.getElementById(containerId);
    if (!container) return;

    // Get ID from URL
    const urlParams = new URLSearchParams(window.location.search);
    const id = urlParams.get('id');

    // Find data (Search both Career and Blog)
    const item = careerData.find(d => d.id === id) || blogData.find(d => d.id === id);

    if (item) {
        container.innerHTML = `
            <div class="mdl-cell mdl-cell--12-col mdl-card mdl-shadow--4dp">
                <div class="mdl-card__media">
                    <img class="article-image" src="${item.image}" border="0" alt="${item.title}" style="max-height: 400px; object-fit: cover;">
                </div>
                <div class="mdl-card__title">
                    <h1 class="mdl-card__title-text">${item.title}</h1>
                </div>
                <div class="mdl-card__supporting-text">
                    ${item.date ? `<span>${item.date}</span><br><br>` : ''}
                    <p>${item.description}</p>
                    <p>ここに詳細な本文が入ります。CMS連携後は、リッチエディタで書いた内容がここに表示されます。</p>
                    <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</p>
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
    renderArticle('article-detail');
});
