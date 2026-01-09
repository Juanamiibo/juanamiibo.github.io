document.addEventListener('DOMContentLoaded', () => {
  const grid = document.getElementById('reviewsGrid');
  const title = document.getElementById('reviewsTitle');
  if (!grid) return;

  fetch('reviews.json')
    .then(res => {
      if (!res.ok) throw new Error('Failed to load reviews.json');
      return res.json();
    })
    .then(data => {
      // normalized reviews array (no up/down columns)
      const reviews = Array.isArray(data.reviews) ? data.reviews : (Array.isArray(data) ? data : []);

      // find Juan (case-insensitive) and remove him from the list
      const juanIndex = reviews.findIndex(r => r.author && r.author.trim().toLowerCase() === 'juan');
      if (juanIndex !== -1) {
        const juan = reviews.splice(juanIndex, 1)[0];

        // create featured review element identical to normal cards but inserted above the grid
        const featured = document.createElement('div');
        featured.className = 'review-card featured';
        featured.innerHTML = `
          <img src="${juan.image || 'visuals/pfp.jpg'}" alt="${juan.author}" class="review-pfp">
          <div class="review-content">
            <div class="review-meta">
              <span class="review-author">${juan.author || ''}</span>
              <span class="review-date">${juan.date || ''}</span>
            </div>
            <p class="review-text">${juan.text || ''}</p>
          </div>
        `;

        if (title && title.parentElement) title.parentElement.insertBefore(featured, grid);
        else grid.parentElement.insertBefore(featured, grid);
      }

      const addReview = r => {
        const card = document.createElement('div');
        card.className = 'review-card';
        card.innerHTML = `
          <img src="${r.image || 'visuals/pfp.jpg'}" alt="${r.author || 'Reviewer'}" class="review-pfp">
          <div class="review-content">
            <div class="review-meta">
              <span class="review-author">${r.author || ''}</span>
              <span class="review-date">${r.date || ''}</span>
            </div>
            <p class="review-text">${r.text || ''}</p>
          </div>
        `;
        grid.appendChild(card);
      };

      reviews.forEach(addReview);

      // add "More soon..." text below the reviews grid
      const more = document.createElement('div');
      more.className = 'more-soon';
      more.textContent = 'More soon...';
      if (grid && grid.parentElement) {
        // insert after the grid
        grid.parentElement.insertBefore(more, grid.nextSibling);
      } else {
        document.body.appendChild(more);
      }
    })
    .catch(err => console.error('Error loading reviews:', err));
});
