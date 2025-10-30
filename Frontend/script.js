const apiRoot = '/api';

async function fetchJSON(url, opts){
  const res = await fetch(url, opts);
  if(!res.ok) throw new Error('API error');
  return res.json();
}

/* HOME: load products */
async function loadProducts(){
  const container = document.getElementById('products');
  if(!container) return;
  try{
    const data = await fetchJSON(`${apiRoot}/products`);
    container.innerHTML = data.map(p => `
      <div class="card">
        <div class="product-title">${p.name}</div>
        <div class="muted">${p.short}</div>
        <div style="margin-top:8px">
          <span class="price">$${p.price}</span>
          <a style="float:right" href="product.html?id=${p._id}">View</a>
        </div>
      </div>
    `).join('');
  }catch(e){ container.innerHTML = '<div class="card">Failed to load products</div>' }
}

/* PRODUCT: load product details and wire feedback form */
async function loadProductDetail(){
  const params = new URLSearchParams(location.search);
  const id = params.get('id');
  if(!id) return document.getElementById('product-detail').innerText = 'No product id';

  try{
    const p = await fetchJSON(`${apiRoot}/products/${id}`);
    document.getElementById('product-detail').innerHTML = `
      <div class="card">
        <h2>${p.name}</h2>
        <p>${p.long}</p>
        <p class="price">$${p.price}</p>
        <p><strong>Reviews:</strong> ${p.reviews || 0}</p>
      </div>
    `;
    const pidEl = document.getElementById('productId');
    if(pidEl) pidEl.value = id;
  }catch(e){ console.error(e) }
}

/* FEEDBACK PAGE: load all feedbacks */
async function loadFeedbacks(){
  const container = document.getElementById('feedback-list');
  if(!container) return;
  try{
    const list = await fetchJSON(`${apiRoot}/feedbacks`);
    container.innerHTML = list.map(f => `
      <div class="card">
        <div><strong>${f.name}</strong> <span style="color:var(--muted)">· ${new Date(f.createdAt).toLocaleString()}</span></div>
        <div style="margin-top:6px">${'⭐'.repeat(f.rating)}</div>
        <p style="margin-top:8px">${f.message}</p>
      </div>
    `).join('');
  }catch(e){ container.innerHTML = '<div class="card">Failed to load feedbacks</div>' }
}

/* form submit on product page */
async function wireFeedbackForm(){
  const form = document.getElementById('feedbackForm');
  if(!form) return;
  form.addEventListener('submit', async (ev) => {
    ev.preventDefault();
    const payload = {
      productId: document.getElementById('productId').value,
      name: document.getElementById('name').value,
      rating: Number(document.getElementById('rating').value),
      message: document.getElementById('message').value
    };
    try{
      await fetchJSON(`${apiRoot}/feedbacks`, {
        method: 'POST',
        headers: {'Content-Type':'application/json'},
        body: JSON.stringify(payload)
      });
      alert('Thanks for your feedback!');
      form.reset();
    }catch(err){
      alert('Failed to send feedback');
      console.error(err);
    }
  });
}

/* page init */
document.addEventListener('DOMContentLoaded', () => {
  loadProducts();
  loadFeedbacks();
  loadProductDetail();
  wireFeedbackForm();
});
