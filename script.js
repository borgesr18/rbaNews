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

// Notícias locais usadas quando não for possível obter dados externos
const FALLBACK_NEWS = [
  {
    title: 'Governo Anuncia Novo Pacote Econômico',
    content: 'O governo brasileiro anunciou nesta segunda-feira um novo pacote econômico para impulsionar o mercado interno.',
    img: 'https://source.unsplash.com/600x400/?news',
    alt: 'Ministro da Economia em coletiva'
  },
  {
    title: 'Inflação tem leve queda em junho',
    content: 'O índice oficial da inflação caiu 0,3% no mês de junho, segundo dados do IBGE.',
    img: 'https://source.unsplash.com/600x400/?economy',
    alt: 'Gráfico econômico demonstrando queda'
  },
  {
    title: 'Seleção Brasileira Goleia em Amistoso',
    content: 'O Brasil venceu por 4x0 em um amistoso realizado no Maracanã.',
    img: 'https://source.unsplash.com/600x400/?sports',
    alt: 'Jogadores comemorando gol'
  },
  {
    title: 'Cúpula Climática em Paris Ganha Destaque',
    content: 'Líderes mundiais discutem novas metas de redução de carbono até 2030.',
    img: 'https://source.unsplash.com/600x400/?climate',
    alt: 'Líderes mundiais reunidos em conferência'
  },
  {
    title: 'Novas Tecnologias Prometem Revolucionar o Mercado',
    content: 'Startups brasileiras estão liderando a corrida por inovações tecnológicas em 2025.',
    img: 'https://source.unsplash.com/600x400/?technology',
    alt: 'Representação de tecnologia futurista'
  }
];

function filterNews() {
  const filter = this.value.toLowerCase();
  document.querySelectorAll('.news-card').forEach(card => {
    const title = card.querySelector('h2').innerText.toLowerCase();
    const content = card.querySelector('p').innerText.toLowerCase();
    card.style.display = title.includes(filter) || content.includes(filter) ? 'flex' : 'none';
  });
}

// Busca notícias de uma API externa com fallback para dados locais
const API_URL = 'https://gnews.io/api/v4/top-headlines?lang=pt&token=YOUR_API_KEY';

async function loadNews() {
  let list = null;
  try {
    if (!API_URL || API_URL.includes('YOUR_API_KEY')) {
      throw new Error('API_KEY ausente');
    }
    const res = await fetch(API_URL);
    const data = await res.json();
    if (Array.isArray(data.articles)) {
      list = data.articles.map(n => ({
        title: n.title,
        content: n.description || '',
        img: n.image || 'https://source.unsplash.com/600x400/?news',
        alt: n.title
      }));
    } else {
      throw new Error('Formato inesperado');
    }
  } catch (_) {
    try {
      const res = await fetch('news.json');
      list = await res.json();
    } catch (err) {
      console.error('Erro ao carregar notícias, utilizando fallback embutido', err);
      list = FALLBACK_NEWS;
    }
  } finally {
    renderNews(list || FALLBACK_NEWS);
    document.getElementById('searchInput').addEventListener('input', filterNews);
  }
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

