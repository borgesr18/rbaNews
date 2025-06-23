
document.getElementById('searchInput').addEventListener('input', function() {
    let filter = this.value.toLowerCase();
    let newsCards = document.querySelectorAll('.news-card');
    newsCards.forEach(function(card) {
        let title = card.querySelector('h2').innerText.toLowerCase();
        let content = card.querySelector('p').innerText.toLowerCase();
        if (title.includes(filter) || content.includes(filter)) {
            card.style.display = 'flex';
        } else {
            card.style.display = 'none';
        }
    });
});
