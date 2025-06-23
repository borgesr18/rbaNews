// Carrega notícias de um arquivo JSON e renderiza na página
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

function loadNews() {
  fetch('news.json')
    .then(res => res.json())
    .then(data => {
      renderNews(data);
      document.getElementById('searchInput').addEventListener('input', filterNews);
    })
    .catch(err => console.error('Erro ao carregar notícias', err));
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

