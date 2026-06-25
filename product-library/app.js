const products = [
  {
    sku: "LVA0446", name: "Sports Socks", category: "Bags", categoryLabel: "服饰", image: "./assets/products/LVA0446.jpg",
    owner: "Becky", updated: "2025.12", moq: 500, material: "Polyester blend", tags: ["Sports", "Apparel"],
    quote: "LVA0446-Sports Socks-Becky-2025.12.xlsx"
  },
  {
    sku: "LVB0001", name: "Champagne Stopper", category: "Drinkware", categoryLabel: "饮具酒具", image: "./assets/products/LVB0001.jpg",
    owner: "Edward", updated: "2025.12", moq: 300, material: "Stainless Steel / ABS / Silicone", tags: ["Wine", "Custom color"],
    quote: "LVB0001-Champagne stopper-Edward-2025.12.xlsx",
    description: "It is stamped from stainless steel material with a bright surface. The food-grade PP and silicone interior helps preserve the taste of sparkling wine.",
    imprint: "Silkscreen printing / Laser printing", size: "3.8 × 4 × 5.5 cm", setup: "$50",
    risk: "丝印存在掉色风险，优先推荐激光；镜面容易出现划痕，装运时需加强保护。",
    priceBasis: { exchangeRate: "6.90 CNY/USD", freight: "2025.12", reason: "汇率与海运费更新" },
    priceTiers: [
      { qty: "300", sea: "$0.70", air: "$1.13" },
      { qty: "500", sea: "$0.61", air: "$0.93" },
      { qty: "1,000", sea: "$0.59", air: "$0.92" },
      { qty: "5,000", sea: "$0.57", air: "$0.89" }
    ],
    priceHistory: [
      { version: "2025.12", date: "2025-12-17", reason: "汇率与海运费更新", current: true },
      { version: "2025.09", date: "2025-09-08", reason: "供应商阶梯价调整", current: false }
    ],
    gallery: ["./assets/products/LVB0001-scene-1.jpg", "./assets/products/LVB0001-scene-2.jpg", "./assets/products/LVB0001-scene-3.jpg", "./assets/products/LVB0001-box.jpg"]
  },
  {
    sku: "LVC0120", name: "Neoprene Single Bottle Sleeve Cooler", category: "Bags", categoryLabel: "箱包冷藏", image: "./assets/products/LVC0120.jpg",
    owner: "Fay", updated: "2026.01", moq: 500, material: "Neoprene", tags: ["Wine", "Outdoor"], quote: "LVC0120-Neoprene Single Bottle Sleeve Cooler-Fay-2026.01.xlsx"
  },
  {
    sku: "LVD0080", name: "16oz Reusable Plastic Solo Cup", category: "Drinkware", categoryLabel: "饮具酒具", image: "./assets/products/LVD0080.jpg",
    owner: "Fay", updated: "2026.01", moq: 1000, material: "Reusable Plastic", tags: ["Party", "Reusable"], quote: "LVD0080-16oz Reusable Plastic Solo Cup-Fay-2026.01.xlsx"
  },
  {
    sku: "LVE0147", name: "Invisible UV Pen with Light", category: "Tech", categoryLabel: "科技办公", image: "./assets/products/LVE0147.jpg",
    owner: "Miya", updated: "2026.03", moq: 500, material: "ABS", tags: ["Novelty", "Education"], quote: "LVE0147-Invisible UV Pen with Light-Miya-20260303.xlsx"
  },
  {
    sku: "LVF0214", name: "Fanny Pack", category: "Bags", categoryLabel: "箱包服饰", image: "./assets/products/LVF0214.jpg",
    owner: "Devin", updated: "2026.01", moq: 500, material: "Polyester", tags: ["Outdoor", "Travel"], quote: "LVF0214-Fannypack-Devin-2026.01.xlsx"
  },
  {
    sku: "LVG0136", name: "Cheese Knife Set", category: "Kitchen", categoryLabel: "厨房家居", image: "./assets/products/LVG0136.jpg",
    owner: "Fay", updated: "2026.01", moq: 300, material: "Stainless Steel", tags: ["Wine", "Executive Gift"], quote: "LVG0136-Cheese knives,Cheese Tools-Fay-2026.01.xlsx"
  },
  {
    sku: "LVH0056", name: "Disposable Slippers", category: "Kitchen", categoryLabel: "旅行家居", image: "./assets/products/LVH0056.jpg",
    owner: "Fay", updated: "2026.01", moq: 1000, material: "Non-woven Fabric", tags: ["Hotel", "Wellness"], quote: "LVH0056-Disposable Slippers-Fay-2026.01.xlsx"
  },
  {
    sku: "LVI0077", name: "LED Flashlight Keychain", category: "Tech", categoryLabel: "科技办公", image: "./assets/products/LVI0077.jpg",
    owner: "Miya", updated: "2026.03", moq: 500, material: "ABS / LED", tags: ["Keychain", "Utility"], quote: "LVI0077-LED Flashlight Keychain-Miya-20260319.xlsx"
  },
  {
    sku: "LVJ0141", name: "Poker Table", category: "Events", categoryLabel: "活动娱乐", image: "./assets/products/LVJ0141.png",
    owner: "Edward", updated: "2026.03", moq: 50, material: "Wood / Felt", tags: ["Casino", "Event"], quote: "LVJ0141-Poker table-Edward-2026.3.xlsx"
  },
  {
    sku: "LVK0065", name: "Round Keychain", category: "Tech", categoryLabel: "钥匙扣", image: "./assets/products/LVK0065.jpg",
    owner: "Catherine", updated: "2026.01", moq: 500, material: "Metal", tags: ["Keychain", "Classic"], quote: "LVK0065 - Round Keychain - Catherine 2026.01.xlsx"
  }
];

const state = { query: "", filter: "全部", layout: "grid", sort: "recent", selected: new Set(), activeProduct: null };
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

function normalizedSearchText(product) {
  return [product.sku, product.name, product.categoryLabel, product.material, product.owner, ...product.tags].join(" ").toLowerCase();
}

function visibleProducts() {
  const query = state.query.trim().toLowerCase();
  let list = products.filter((product) => {
    const matchesFilter = state.filter === "全部" || product.category === state.filter;
    const matchesQuery = !query || normalizedSearchText(product).includes(query);
    return matchesFilter && matchesQuery;
  });

  list = [...list].sort((a, b) => {
    if (state.sort === "sku") return a.sku.localeCompare(b.sku);
    if (state.sort === "name") return a.name.localeCompare(b.name);
    return b.updated.localeCompare(a.updated);
  });
  return list;
}

function productCard(product) {
  const added = state.selected.has(product.sku);
  return `
    <article class="product-card" data-sku="${product.sku}">
      <button class="product-card-main" type="button" data-open="${product.sku}" aria-label="查看 ${product.name} 详情">
        <div class="image-stage">
          <span class="sku-badge">${product.sku}</span>
          <img src="${product.image}" alt="${product.name}" loading="lazy" />
          <span class="updated-badge">QUOTE ${product.updated}</span>
        </div>
        <div class="card-copy">
          <div class="card-meta"><span>${product.categoryLabel}</span><span>${product.owner}</span></div>
          <h2>${product.name}</h2>
          <div class="tag-row">${product.tags.map((tag) => `<span class="tag">${tag}</span>`).join("")}</div>
        </div>
      </button>
      <div class="card-footer">
        <span>MOQ <strong>${product.moq.toLocaleString()}</strong></span>
        <button class="add-button ${added ? "is-added" : ""}" type="button" data-add="${product.sku}" aria-pressed="${added}">${added ? "已加入" : "+ 选品"}</button>
      </div>
    </article>`;
}

function renderProducts() {
  const list = visibleProducts();
  resultCount.textContent = list.length;
  grid.innerHTML = list.map(productCard).join("");
  grid.classList.toggle("is-list", state.layout === "list");
  grid.hidden = list.length === 0;
  emptyState.hidden = list.length !== 0;
}

function detailTemplate(product) {
  const gallery = product.gallery ?? [product.image];
  return `
    <section class="detail-hero">
      <div class="detail-hero-media"><img src="${product.image}" alt="${product.name}" /></div>
      <div class="detail-hero-copy">
        <span class="detail-sku">${product.sku}</span>
        <h2>${product.name}</h2>
        <p class="detail-category">${product.categoryLabel} · 已审核入库</p>
        <div class="detail-facts">
          <div><span>MOQ</span><strong>${product.moq.toLocaleString()} pcs</strong></div>
          <div><span>负责人</span><strong>${product.owner}</strong></div>
          <div><span>报价版本</span><strong>v${product.updated}</strong></div>
          <div><span>素材状态</span><strong>${gallery.length} 张可用</strong></div>
        </div>
        <div class="detail-actions">
          <button class="primary-button" type="button" data-detail-add="${product.sku}">${state.selected.has(product.sku) ? "已加入选品集" : "加入选品集"}</button>
          <button class="secondary-button" type="button" data-copy="${product.sku}">复制产品资料</button>
        </div>
      </div>
    </section>
    <section class="detail-section">
      <h3>产品资料</h3>
      <p>${product.description ?? `${product.name}，适用于企业礼赠、活动推广与定制营销场景。`}</p>
      <dl class="spec-table">
        <dt>Material</dt><dd>${product.material}</dd>
        <dt>Item Size</dt><dd>${product.size ?? "详见备底报价"}</dd>
        <dt>Imprint Method</dt><dd>${product.imprint ?? "Custom logo available"}</dd>
        <dt>Set up Charge</dt><dd>${product.setup ?? "详见备底报价"}</dd>
      </dl>
    </section>
    <section class="detail-section">
      <h3>Marketing 标签</h3>
      <div class="tag-row">${product.tags.map((tag) => `<span class="tag">${tag}</span>`).join("")}</div>
    </section>
    <section class="detail-section price-section">
      <div class="version-heading">
        <div><h3>价格与版本</h3><p>价格独立于产品资料更新，历史版本不会被覆盖。</p></div>
        <span class="version-status">当前报价 v${product.updated}</span>
      </div>
      <div class="price-basis">
        <div><span>汇率基准</span><strong>${product.priceBasis?.exchangeRate ?? "见备底报价"}</strong></div>
        <div><span>运费基准</span><strong>${product.priceBasis?.freight ?? product.updated}</strong></div>
        <div><span>本次变价原因</span><strong>${product.priceBasis?.reason ?? "初始入库"}</strong></div>
      </div>
      ${product.priceTiers ? `
        <div class="price-table-wrap" tabindex="0" aria-label="阶梯报价，可横向滚动">
          <table class="price-table">
            <thead><tr><th>QTY</th>${product.priceTiers.map((tier) => `<th>${tier.qty}</th>`).join("")}</tr></thead>
            <tbody>
              <tr><th>DDP Sea</th>${product.priceTiers.map((tier) => `<td>${tier.sea}</td>`).join("")}</tr>
              <tr><th>DDP Air</th>${product.priceTiers.map((tier) => `<td>${tier.air}</td>`).join("")}</tr>
            </tbody>
          </table>
        </div>` : ""}
      <div class="version-history">
        ${(product.priceHistory ?? [{version: product.updated, date: product.updated, reason: "当前入库版本", current: true}]).map((item) => `
          <div class="version-row">
            <span class="version-dot ${item.current ? "is-current" : ""}" aria-hidden="true"></span>
            <strong>v${item.version}</strong><span>${item.date}</span><span>${item.reason}</span>${item.current ? "<em>当前</em>" : ""}
          </div>`).join("")}
      </div>
      <p class="version-note">生成Catalog时会锁定当时的报价版本，后续调价不会悄悄改变历史Catalog。</p>
    </section>
    <section class="detail-section">
      <h3>图片素材</h3>
      <div class="detail-gallery">${gallery.map((image, index) => `<img src="${image}" alt="${product.name} 素材 ${index + 1}" />`).join("")}</div>
    </section>
    ${product.risk ? `<section class="detail-section"><h3>内部提示</h3><p class="risk-note">${product.risk}</p></section>` : ""}
    <section class="detail-section">
      <h3>备底报价</h3>
      <p>${product.quote}</p>
      <button class="secondary-button" type="button" data-quote="${product.sku}" style="margin-top:12px">调用备底报价</button>
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
  document.querySelector("#drawerTotal").textContent = `${chosen.length} 个产品`;
  document.querySelector("#createCatalog").disabled = chosen.length === 0;
  document.querySelector("#drawerEmpty").hidden = chosen.length !== 0;
  document.querySelector("#drawerList").innerHTML = chosen.map((product) => `
    <article class="drawer-item">
      <img src="${product.image}" alt="" />
      <div><strong>${product.name}</strong><small>${product.sku} · MOQ ${product.moq} · 报价 v${product.updated}</small></div>
      <button class="remove-button" type="button" data-remove="${product.sku}" aria-label="从选品集移除 ${product.name}">×</button>
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
  const text = `${product.sku} | ${product.name}\nMaterial: ${product.material}\nMOQ: ${product.moq}\nTags: ${product.tags.join(", ")}`;
  try { await navigator.clipboard.writeText(text); showToast("产品资料已复制"); }
  catch { showToast("原型已准备好产品资料"); }
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
document.querySelector("#clearSearch").addEventListener("click", () => { searchInput.value = ""; state.query = ""; state.filter = "全部"; document.querySelectorAll("[data-filter]").forEach((item) => item.classList.toggle("is-active", item.dataset.filter === "全部")); renderProducts(); searchInput.focus(); });
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
  if (quote) showToast(`${quote.dataset.quote} 的备底报价路径已准备调用`);
});

document.querySelector("#createCatalog").addEventListener("click", () => showToast(`已锁定 ${state.selected.size} 个产品的当前报价版本`));
document.querySelector("#syncButton").addEventListener("click", () => showToast("已扫描：没有新的已审核产品"));
document.querySelectorAll(".nav-item").forEach((button) => button.addEventListener("click", () => {
  document.querySelectorAll(".nav-item").forEach((item) => item.classList.toggle("is-active", item === button));
  if (button.dataset.view === "collections") openCollection();
  else if (button.dataset.view !== "products") showToast(`${button.textContent.trim()} 将在下一阶段接入`);
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
