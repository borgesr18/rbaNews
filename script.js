// Renderiza a lista de notícias recebida
function renderNews(list) {
  const container = document.getElementById('newsContainer');
  container.innerHTML = '';
  list.forEach(item => {
    const section = document.createElement('section');
    section.className = 'news-card';
    section.innerHTML = `
      <img src="${item.img}" alt="${item.alt}">
      <div>
        <h2>${item.title}</h2>
        <p>${item.content}</p>
        <a href="#">Leia mais</a>
      </div>
    `;
    container.appendChild(section);
  });
}

function filterNews() {
  const filter = this.value.toLowerCase();
  document.querySelectorAll('.news-card').forEach(card => {
    const title = card.querySelector('h2').innerText.toLowerCase();
    const content = card.querySelector('p').innerText.toLowerCase();
    card.style.display = title.includes(filter) || content.includes(filter) ? 'flex' : 'none';
  });
}

// Busca notícias de uma API externa com fallback para o arquivo local
const API_URL = 'https://gnews.io/api/v4/top-headlines?lang=pt&token=YOUR_API_KEY';

function loadNews() {
  fetch(API_URL)
    .then(res => res.json())
    .then(data => {
      if (Array.isArray(data.articles)) {
        const list = data.articles.map(n => ({
          title: n.title,
          content: n.description || '',
          img: n.image || 'https://source.unsplash.com/600x400/?news',
          alt: n.title
        }));
        renderNews(list);
      } else {
        throw new Error('Formato inesperado');
      }
    })
    .catch(() => {
      // fallback para arquivo local
      fetch('news.json')
        .then(res => res.json())
        .then(renderNews)
        .catch(err => console.error('Erro ao carregar notícias', err));
    })
    .finally(() => {
      document.getElementById('searchInput').addEventListener('input', filterNews);
    });
}

// menu responsivo
document.querySelector('.nav-toggle').addEventListener('click', () => {
  document.getElementById('mainNav').classList.toggle('open');
});

// alternância de tema
const themeButton = document.getElementById('themeToggle');
themeButton.addEventListener('click', () => {
  document.body.classList.toggle('dark');
  themeButton.textContent = document.body.classList.contains('dark') ? '☀️' : '🌙';
});

// inicia página
document.addEventListener('DOMContentLoaded', loadNews);

// Atualiza as notícias a cada 5 horas
setInterval(loadNews, 5 * 60 * 60 * 1000);

