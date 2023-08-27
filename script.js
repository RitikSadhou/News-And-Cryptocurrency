const API_KEY = "1d3a0eefa97b499d8fbc4ee93eeb40b7";
const url = "https://newsapi.org/v2/everything?q=";

window.addEventListener("load", () => fetchNews("India"));

function reload() {
    window.location.reload();
}


async function fetchNews(query) {
    const res = await fetch(`${url}${query}&apiKey=${API_KEY}`);
    const data = await res.json();
    bindData(data.articles);
}

function bindData(articles) {
    const cardsContainer = document.getElementById("cards-container");
    const newsCardTemplate = document.getElementById("template-news-card");

    cardsContainer.innerHTML = "";

    articles.forEach((article) => {
        if (!article.urlToImage) return;
        const cardClone = newsCardTemplate.content.cloneNode(true);
        fillDataInCard(cardClone, article);
        cardsContainer.appendChild(cardClone);
    });
}

function fillDataInCard(cardClone, article) {
    const newsImg = cardClone.querySelector("#news-img");
    const newsTitle = cardClone.querySelector("#news-title");
    const newsSource = cardClone.querySelector("#news-source");
    const newsDesc = cardClone.querySelector("#news-desc");

    newsImg.src = article.urlToImage;
    newsTitle.innerHTML = article.title;
    newsDesc.innerHTML = article.description;

    const date = new Date(article.publishedAt).toLocaleString("en-US", {
        timeZone: "Asia/Jakarta",
    });

    newsSource.innerHTML = `${article.source.name} · ${date}`;

    cardClone.firstElementChild.addEventListener("click", () => {
        window.open(article.url, "_blank");
    });
}

let curSelectedNav = null;
function onNavItemClick(id) {
    fetchNews(id);
    const navItem = document.getElementById(id);
    curSelectedNav?.classList.remove("active");
    curSelectedNav = navItem;
    curSelectedNav.classList.add("active");
}

const searchButton = document.getElementById("search-button");
const searchText = document.getElementById("search-text");

searchButton.addEventListener("click", () => {
    const query = searchText.value;
    if (!query) return;
    fetchNews(query);
    curSelectedNav?.classList.remove("active");
    curSelectedNav = null;
});
// Function to fetch news data
async function fetchNews() {
    const newsApiKey = 'YOUR_NEWS_API_KEY';
    const newsApiUrl = `https://newsapi.org/v2/top-headlines?country=us&category=business&apiKey=${newsApiKey}`;

    try {
        const response = await fetch(newsApiUrl);
        const data = await response.json();
        return data.articles;
    } catch (error) {
        console.error('Error fetching news data:', error);
        return [];
    }
}

// Function to fetch cryptocurrency data
async function fetchCryptocurrencyData() {
    const cryptoApiUrl = 'https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=10&page=1';

    try {
        const response = await fetch(cryptoApiUrl);
        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Error fetching cryptocurrency data:', error);
        return [];
    }
}

// Function to display news articles
function displayNews(articles) {
    const newsSection = document.getElementById('news-section');

    articles.forEach(article => {
        const newsArticle = document.createElement('div');
        newsArticle.innerHTML = `<h3>${article.title}</h3>
                                 <p>${article.description}</p>
                                 <a href="${article.url}" target="_blank">Read More</a>`;
        newsSection.appendChild(newsArticle);
    });
}

// Function to display cryptocurrency data
function displayCryptocurrencyData(cryptoData) {
    const cryptoSection = document.getElementById('crypto-section');

    cryptoData.forEach(crypto => {
        const cryptoInfo = document.createElement('div');
        cryptoInfo.innerHTML = `<h3>${crypto.name} (${crypto.symbol.toUpperCase()})</h3>
                                <p>Current Price: $${crypto.current_price}</p>
                                <p>Market Cap: $${crypto.market_cap}</p>
                                <p>24h Volume: $${crypto.total_volume}</p>`;
        cryptoSection.appendChild(cryptoInfo);
    });
}

// Fetch and display data
async function fetchData() {
    const newsData = await fetchNews();
    const cryptoData = await fetchCryptocurrencyData();

    displayNews(newsData);
    displayCryptocurrencyData(cryptoData);
}

// Call the fetchData function to start the process
fetchData();
