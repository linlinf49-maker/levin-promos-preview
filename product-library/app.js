const libraryPayload = window.LEVIN_PRODUCTS || { products: [], sourceImageCount: 0, quoteSkuCount: 0 };
const products = Array.isArray(libraryPayload.products) ? libraryPayload.products : [];

const TEXT = {
  all: "\u5168\u90e8",
  productUnit: "\u4e2a\u4ea7\u54c1",
  quoteDetail: "\u8be6\u89c1\u5907\u5e95\u62a5\u4ef7\u5355",
  approved: "\u5df2\u5ba1\u6838\u5165\u5e93",
  selected: "\u5df2\u52a0\u5165",
  select: "+ \u9009\u54c1",
  addCollection: "\u52a0\u5165\u9009\u54c1\u96c6",
  addedCollection: "\u5df2\u52a0\u5165\u9009\u54c1\u96c6",
  copy: "\u590d\u5236\u4ea7\u54c1\u8d44\u6599",
  material: "\u6750\u8d28",
  itemSize: "\u5c3a\u5bf8",
  imprint: "\u5370\u5237\u65b9\u5f0f",
  setup: "\u5f00\u7248\u8d39",
  productInfo: "\u4ea7\u54c1\u8d44\u6599",
  tags: "Marketing \u6807\u7b7e",
  assets: "\u56fe\u7247\u7d20\u6750",
  quote: "\u5907\u5e95\u62a5\u4ef7",
  callQuote: "\u8c03\u7528\u5907\u5e95\u62a5\u4ef7",
  priceVersion: "\u4ef7\u683c\u4e0e\u7248\u672c",
  priceNote: "\u4ef7\u683c\u4fe1\u606f\u4e0d\u5728\u516c\u5f00\u9875\u9762\u5c55\u793a\uff0c\u4ee5\u5bf9\u5e94\u5907\u5e95\u62a5\u4ef7\u5355\u4e3a\u51c6\u3002",
  currentQuote: "\u5f53\u524d\u62a5\u4ef7",
  imageAvailable: "\u5f20\u7d20\u6750\u53ef\u7528",
  copied: "\u4ea7\u54c1\u8d44\u6599\u5df2\u590d\u5236",
  prepared: "\u4ea7\u54c1\u8d44\u6599\u5df2\u51c6\u5907\u597d",
  syncDone: "\u5df2\u540c\u6b65\uff1a821 \u4e2a\u4ea7\u54c1\u5df2\u63a5\u5165\u4ea7\u54c1\u5e93",
  future: "\u5c06\u5728\u4e0b\u4e00\u9636\u6bb5\u63a5\u5165",
  quoteReady: "\u7684\u5907\u5e95\u62a5\u4ef7\u8def\u5f84\u5df2\u51c6\u5907\u8c03\u7528",
  catalogLockedPrefix: "\u5df2\u9501\u5b9a ",
  catalogLockedSuffix: " \u4e2a\u4ea7\u54c1\u7684\u5f53\u524d\u62a5\u4ef7\u7248\u672c",
  noMoq: "\u89c1\u62a5\u4ef7\u5355"
};

const state = { query: "", filter: TEXT.all, layout: "grid", sort: "recent", selected: new Set(), activeProduct: null };
const grid = document.querySelector("#productGrid");
const resultCount = document.querySelector("#resultCount");
const emptyState = document.querySelector("#emptyState");
const searchInput = document.querySelector("#searchInput");
const detailPanel = document.querySelector("#detailPanel");
const detailContent = document.querySelector("#detailContent");
const collectionDrawer = document.querySelector("#collectionDrawer");
const scrim = document.querySelector("#scrim");
const toast = document.querySelector("#toast");
let toastTimer;

function escapeHtml(value) {
  return String(value ?? "").replace(/[&<>"]/g, (char) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" }[char]));
}

function formatMoq(product) {
  return product.moq ? product.moq.toLocaleString() : TEXT.noMoq;
}

function normalizedSearchText(product) {
  return [product.sku, product.name, product.categoryLabel, product.material, product.owner, product.quote, ...(product.tags || [])].join(" ").toLowerCase();
}

function visibleProducts() {
  const query = state.query.trim().toLowerCase();
  let list = products.filter((product) => {
    const matchesFilter = state.filter === TEXT.all || product.category === state.filter;
    const matchesQuery = !query || normalizedSearchText(product).includes(query);
    return matchesFilter && matchesQuery;
  });

  list = [...list].sort((a, b) => {
    if (state.sort === "sku") return a.sku.localeCompare(b.sku);
    if (state.sort === "name") return a.name.localeCompare(b.name);
    return String(b.updated).localeCompare(String(a.updated)) || a.sku.localeCompare(b.sku);
  });
  return list;
}

function productCard(product) {
  const added = state.selected.has(product.sku);
  const tags = (product.tags || []).map((tag) => `<span class="tag">${escapeHtml(tag)}</span>`).join("");
  return `
    <article class="product-card" data-sku="${escapeHtml(product.sku)}">
      <button class="product-card-main" type="button" data-open="${escapeHtml(product.sku)}" aria-label="?? ${escapeHtml(product.name)} ??">
        <div class="image-stage">
          <span class="sku-badge">${escapeHtml(product.sku)}</span>
          <img src="${escapeHtml(product.image)}" alt="${escapeHtml(product.name)}" loading="lazy" />
          <span class="updated-badge">QUOTE ${escapeHtml(product.updated)}</span>
        </div>
        <div class="card-copy">
          <div class="card-meta"><span>${escapeHtml(product.categoryLabel)}</span><span>${escapeHtml(product.owner || "?")}</span></div>
          <h2>${escapeHtml(product.name)}</h2>
          <div class="tag-row">${tags}</div>
        </div>
      </button>
      <div class="card-footer">
        <span>MOQ <strong>${formatMoq(product)}</strong></span>
        <button class="add-button ${added ? "is-added" : ""}" type="button" data-add="${escapeHtml(product.sku)}" aria-pressed="${added}">${added ? TEXT.selected : TEXT.select}</button>
      </div>
    </article>`;
}

function renderProducts() {
  const list = visibleProducts();
  resultCount.textContent = list.length.toLocaleString();
  grid.innerHTML = list.map(productCard).join("");
  grid.classList.toggle("is-list", state.layout === "list");
  grid.hidden = list.length === 0;
  emptyState.hidden = list.length !== 0;
}

function detailTemplate(product) {
  const tags = (product.tags || []).map((tag) => `<span class="tag">${escapeHtml(tag)}</span>`).join("");
  const imageCount = product.imageCount || 1;
  return `
    <section class="detail-hero">
      <div class="detail-hero-media"><img src="${escapeHtml(product.image)}" alt="${escapeHtml(product.name)}" /></div>
      <div class="detail-hero-copy">
        <span class="detail-sku">${escapeHtml(product.sku)}</span>
        <h2>${escapeHtml(product.name)}</h2>
        <p class="detail-category">${escapeHtml(product.categoryLabel)} ? ${TEXT.approved}</p>
        <div class="detail-facts">
          <div><span>MOQ</span><strong>${formatMoq(product)}</strong></div>
          <div><span>???</span><strong>${escapeHtml(product.owner || "?")}</strong></div>
          <div><span>????</span><strong>v${escapeHtml(product.updated)}</strong></div>
          <div><span>????</span><strong>${imageCount.toLocaleString()} ${TEXT.imageAvailable}</strong></div>
        </div>
        <div class="detail-actions">
          <button class="primary-button" type="button" data-detail-add="${escapeHtml(product.sku)}">${state.selected.has(product.sku) ? TEXT.addedCollection : TEXT.addCollection}</button>
          <button class="secondary-button" type="button" data-copy="${escapeHtml(product.sku)}">${TEXT.copy}</button>
        </div>
      </div>
    </section>
    <section class="detail-section">
      <h3>${TEXT.productInfo}</h3>
      <p>${escapeHtml(product.name)}?${TEXT.approved}??????????????????????????????</p>
      <dl class="spec-table">
        <dt>${TEXT.material}</dt><dd>${escapeHtml(product.material || TEXT.quoteDetail)}</dd>
        <dt>${TEXT.itemSize}</dt><dd>${TEXT.quoteDetail}</dd>
        <dt>${TEXT.imprint}</dt><dd>Custom logo available</dd>
        <dt>${TEXT.setup}</dt><dd>${TEXT.quoteDetail}</dd>
      </dl>
    </section>
    <section class="detail-section">
      <h3>${TEXT.tags}</h3>
      <div class="tag-row">${tags}</div>
    </section>
    <section class="detail-section price-section">
      <div class="version-heading">
        <div><h3>${TEXT.priceVersion}</h3><p>${TEXT.priceNote}</p></div>
        <span class="version-status">${TEXT.currentQuote} v${escapeHtml(product.updated)}</span>
      </div>
      <div class="version-history">
        <div class="version-row">
          <span class="version-dot is-current" aria-hidden="true"></span>
          <strong>v${escapeHtml(product.updated)}</strong><span>${escapeHtml(product.updated)}</span><span>${escapeHtml(product.quote)}</span><em>??</em>
        </div>
      </div>
    </section>
    <section class="detail-section">
      <h3>${TEXT.assets}</h3>
      <div class="detail-gallery"><img src="${escapeHtml(product.image)}" alt="${escapeHtml(product.name)} ?? 1" /></div>
    </section>
    <section class="detail-section">
      <h3>${TEXT.quote}</h3>
      <p>${escapeHtml(product.quote)}</p>
      <button class="secondary-button" type="button" data-quote="${escapeHtml(product.sku)}" style="margin-top:12px">${TEXT.callQuote}</button>
    </section>`;
}

function openDetail(sku) {
  const product = products.find((item) => item.sku === sku);
  if (!product) return;
  state.activeProduct = sku;
  detailContent.innerHTML = detailTemplate(product);
  detailPanel.classList.add("is-open");
  detailPanel.setAttribute("aria-hidden", "false");
  collectionDrawer.classList.remove("is-open");
  collectionDrawer.setAttribute("aria-hidden", "true");
  scrim.hidden = false;
  document.querySelector("#closeDetail").focus();
}

function closePanels() {
  detailPanel.classList.remove("is-open");
  detailPanel.setAttribute("aria-hidden", "true");
  collectionDrawer.classList.remove("is-open");
  collectionDrawer.setAttribute("aria-hidden", "true");
  scrim.hidden = true;
}

function toggleSelected(sku) {
  if (state.selected.has(sku)) state.selected.delete(sku);
  else state.selected.add(sku);
  renderProducts();
  renderCollection();
  if (state.activeProduct === sku && detailPanel.classList.contains("is-open")) openDetail(sku);
}

function renderCollection() {
  const chosen = products.filter((product) => state.selected.has(product.sku));
  document.querySelector("#collectionCount").textContent = chosen.length;
  document.querySelector("#sideCollectionCount").textContent = chosen.length;
  document.querySelector("#drawerTotal").textContent = `${chosen.length} ${TEXT.productUnit}`;
  document.querySelector("#createCatalog").disabled = chosen.length === 0;
  document.querySelector("#drawerEmpty").hidden = chosen.length !== 0;
  document.querySelector("#drawerList").innerHTML = chosen.map((product) => `
    <article class="drawer-item">
      <img src="${escapeHtml(product.image)}" alt="" />
      <div><strong>${escapeHtml(product.name)}</strong><small>${escapeHtml(product.sku)} ? MOQ ${formatMoq(product)} ? ?? v${escapeHtml(product.updated)}</small></div>
      <button class="remove-button" type="button" data-remove="${escapeHtml(product.sku)}" aria-label="?????? ${escapeHtml(product.name)}">?</button>
    </article>`).join("");
}

function openCollection() {
  renderCollection();
  detailPanel.classList.remove("is-open");
  detailPanel.setAttribute("aria-hidden", "true");
  collectionDrawer.classList.add("is-open");
  collectionDrawer.setAttribute("aria-hidden", "false");
  scrim.hidden = false;
  document.querySelector("#closeCollection").focus();
}

function showToast(message) {
  clearTimeout(toastTimer);
  toast.textContent = message;
  toast.classList.add("is-visible");
  toastTimer = setTimeout(() => toast.classList.remove("is-visible"), 2400);
}

async function copyProduct(product) {
  const text = `${product.sku} | ${product.name}\nCategory: ${product.categoryLabel}\nMaterial: ${product.material}\nQuote: ${product.quote}`;
  try { await navigator.clipboard.writeText(text); showToast(TEXT.copied); }
  catch { showToast(TEXT.prepared); }
}

grid.addEventListener("click", (event) => {
  const open = event.target.closest("[data-open]");
  const add = event.target.closest("[data-add]");
  if (add) { event.stopPropagation(); toggleSelected(add.dataset.add); }
  else if (open) openDetail(open.dataset.open);
});

document.querySelector("#filterChips").addEventListener("click", (event) => {
  const button = event.target.closest("[data-filter]");
  if (!button) return;
  state.filter = button.dataset.filter;
  document.querySelectorAll("[data-filter]").forEach((item) => item.classList.toggle("is-active", item === button));
  renderProducts();
});

document.querySelectorAll("[data-layout]").forEach((button) => button.addEventListener("click", () => {
  state.layout = button.dataset.layout;
  document.querySelectorAll("[data-layout]").forEach((item) => item.classList.toggle("is-active", item === button));
  renderProducts();
}));

searchInput.addEventListener("input", () => { state.query = searchInput.value; renderProducts(); });
document.querySelector("#sortSelect").addEventListener("change", (event) => { state.sort = event.target.value; renderProducts(); });
document.querySelector("#clearSearch").addEventListener("click", () => { searchInput.value = ""; state.query = ""; state.filter = TEXT.all; document.querySelectorAll("[data-filter]").forEach((item) => item.classList.toggle("is-active", item.dataset.filter === TEXT.all)); renderProducts(); searchInput.focus(); });
document.querySelector("#collectionButton").addEventListener("click", openCollection);
document.querySelector("#closeCollection").addEventListener("click", closePanels);
document.querySelector("#closeDetail").addEventListener("click", closePanels);
scrim.addEventListener("click", closePanels);
document.querySelector("#drawerList").addEventListener("click", (event) => { const remove = event.target.closest("[data-remove]"); if (remove) toggleSelected(remove.dataset.remove); });

detailContent.addEventListener("click", (event) => {
  const add = event.target.closest("[data-detail-add]");
  const copy = event.target.closest("[data-copy]");
  const quote = event.target.closest("[data-quote]");
  if (add) toggleSelected(add.dataset.detailAdd);
  if (copy) copyProduct(products.find((item) => item.sku === copy.dataset.copy));
  if (quote) showToast(`${quote.dataset.quote} ${TEXT.quoteReady}`);
});

document.querySelector("#createCatalog").addEventListener("click", () => showToast(`${TEXT.catalogLockedPrefix}${state.selected.size}${TEXT.catalogLockedSuffix}`));
document.querySelector("#syncButton").addEventListener("click", () => showToast(TEXT.syncDone));
document.querySelectorAll(".nav-item").forEach((button) => button.addEventListener("click", () => {
  document.querySelectorAll(".nav-item").forEach((item) => item.classList.toggle("is-active", item === button));
  if (button.dataset.view === "collections") openCollection();
  else if (button.dataset.view !== "products") showToast(`${button.textContent.trim()} ${TEXT.future}`);
  document.querySelector(".sidebar").classList.remove("is-open");
}));

document.querySelector("#mobileMenu").addEventListener("click", (event) => {
  const sidebar = document.querySelector(".sidebar");
  const isOpen = sidebar.classList.toggle("is-open");
  event.currentTarget.setAttribute("aria-expanded", String(isOpen));
});

document.addEventListener("keydown", (event) => {
  if (event.key === "Escape") closePanels();
  if ((event.metaKey || event.ctrlKey) && event.key.toLowerCase() === "k") { event.preventDefault(); searchInput.focus(); }
});

renderProducts();
renderCollection();
