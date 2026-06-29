const libraryPayload = window.LEVIN_PRODUCTS || { products: [], sourceImageCount: 0, quoteSkuCount: 0 };
const products = Array.isArray(libraryPayload.products) ? libraryPayload.products : [];
const categoryTreeMeta = Array.isArray(libraryPayload.categoryTree) ? libraryPayload.categoryTree : [];
const clientVaultPayload = window.LEVIN_CLIENT_VAULT || { credentials: { username: "marketing", password: "levin2026" }, clients: [] };
const vaultClients = Array.isArray(clientVaultPayload.clients) ? clientVaultPayload.clients : [];
const vaultCredentials = clientVaultPayload.credentials || { username: "marketing", password: "levin2026" };

const FALLBACK_CATEGORY_TREE = [
  { id: "A_HOME", label: "\u5c45\u5bb6\u65e5\u7528", children: [] },
  { id: "B_DRINKWARE", label: "\u996e\u5177\u9152\u5177", children: [] },
  { id: "C_OUTDOOR_TRAVEL", label: "\u6237\u5916\u65c5\u884c", children: [] },
  { id: "D_KITCHEN", label: "\u9910\u53a8\u7528\u54c1", children: [] },
  { id: "E_BAGS_PACKAGING", label: "\u7bb1\u5305\u5305\u88c5", children: [] },
  { id: "F_EVENTS_DISPLAY", label: "\u6d3b\u52a8\u5c55\u793a", children: [] },
  { id: "G_TOYS_GAMES", label: "\u73a9\u5177\u6e38\u620f", children: [] },
  { id: "H_APPAREL_TOWELS", label: "\u8863\u5e3d\u889c\u6bdb\u5dfe", children: [] },
  { id: "I_ELECTRONICS", label: "3C\u7535\u5b50", children: [] },
  { id: "J_OFFICE", label: "\u6587\u5177\u529e\u516c", children: [] },
  { id: "K_BEAUTY_WELLNESS", label: "\u7f8e\u5986\u4e2a\u62a4", children: [] },
  { id: "L_KEYCHAIN_BADGE", label: "\u94a5\u5319\u6263\u5fbd\u7ae0", children: [] },
  { id: "M_TOOLS_AUTO", label: "\u5de5\u5177\u8f66\u8f7d", children: [] },
  { id: "N_OTHER", label: "\u5176\u4ed6\u793c\u54c1", children: [] }
];

const QUOTE_LIBRARY_ROOT = "D:\\\u6587\u4ef6\\Lin\\LEVIN\\\u793c\u5f80 - Marketing\u4ea7\u54c1\u5e93\\1. \u5907\u5e95\u62a5\u4ef7\u5355\u5e93";

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
  callQuote: "\u590d\u5236\u672c\u5730\u8def\u5f84",
  quoteFileName: "\u62a5\u4ef7\u5355\u6587\u4ef6",
  quotePathNote: "\u516c\u5f00\u7f51\u9875\u4e0d\u80fd\u76f4\u63a5\u6253\u5f00\u7535\u8111 D \u76d8 Excel\uff0c\u70b9\u51fb\u540e\u4f1a\u590d\u5236\u5b8c\u6574\u672c\u5730\u8def\u5f84\uff0c\u8bf7\u7c98\u8d34\u5230\u6587\u4ef6\u8d44\u6e90\u7ba1\u7406\u5668\u5730\u5740\u680f\u6253\u5f00\u3002",
  priceVersion: "\u4ef7\u683c\u4e0e\u7248\u672c",
  priceNote: "\u4ef7\u683c\u4fe1\u606f\u4e0d\u5728\u516c\u5f00\u9875\u9762\u5c55\u793a\uff0c\u4ee5\u5bf9\u5e94\u5907\u5e95\u62a5\u4ef7\u5355\u4e3a\u51c6\u3002",
  currentQuote: "\u5f53\u524d\u62a5\u4ef7",
  imageAvailable: "\u5f20\u7d20\u6750\u53ef\u7528",
  copied: "\u4ea7\u54c1\u8d44\u6599\u5df2\u590d\u5236",
  prepared: "\u4ea7\u54c1\u8d44\u6599\u5df2\u51c6\u5907\u597d",
  quotePathCopied: "\u5907\u5e95\u62a5\u4ef7\u5355\u8def\u5f84\u5df2\u590d\u5236\uff0c\u8bf7\u5728\u6587\u4ef6\u8d44\u6e90\u7ba1\u7406\u5668\u5730\u5740\u680f\u7c98\u8d34\u6253\u5f00",
  quotePathPrepared: "\u5df2\u51c6\u5907\u5907\u5e95\u62a5\u4ef7\u5355\u8def\u5f84\uff0c\u8bf7\u624b\u52a8\u590d\u5236",
  syncDone: "\u5df2\u540c\u6b65\uff1a821 \u4e2a\u4ea7\u54c1\u5df2\u63a5\u5165\u4ea7\u54c1\u5e93",
  future: "\u5c06\u5728\u4e0b\u4e00\u9636\u6bb5\u63a5\u5165",
  quoteReady: "\u7684\u5907\u5e95\u62a5\u4ef7\u8def\u5f84\u5df2\u51c6\u5907\u8c03\u7528",
  catalogLockedPrefix: "\u5df2\u9501\u5b9a ",
  catalogLockedSuffix: " \u4e2a\u4ea7\u54c1\u7684\u5f53\u524d\u62a5\u4ef7\u7248\u672c",
  noMoq: "\u89c1\u62a5\u4ef7\u5355"
};

const state = {
  query: "",
  mainFilter: TEXT.all,
  subFilter: TEXT.all,
  hoverMain: null,
  layout: "grid",
  sort: "recent",
  selected: new Set(),
  activeProduct: null,
  vaultUnlocked: false,
  activeClient: null
};
const grid = document.querySelector("#productGrid");
const resultCount = document.querySelector("#resultCount");
const emptyState = document.querySelector("#emptyState");
const searchInput = document.querySelector("#searchInput");
const filterChips = document.querySelector("#filterChips");
const detailPanel = document.querySelector("#detailPanel");
const detailContent = document.querySelector("#detailContent");
const collectionDrawer = document.querySelector("#collectionDrawer");
const clientVaultPanel = document.querySelector("#clientVaultPanel");
const clientVaultContent = document.querySelector("#clientVaultContent");
const scrim = document.querySelector("#scrim");
const toast = document.querySelector("#toast");
let toastTimer;

function escapeHtml(value) {
  return String(value ?? "").replace(/[&<>"]/g, (char) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" }[char]));
}

function setVaultSession(unlocked) {
  state.vaultUnlocked = unlocked;
  try {
    if (unlocked) sessionStorage.setItem("levinClientVaultUnlocked", "true");
    else sessionStorage.removeItem("levinClientVaultUnlocked");
  } catch {
    // Session storage is only a convenience for this local prototype.
  }
}

try {
  state.vaultUnlocked = sessionStorage.getItem("levinClientVaultUnlocked") === "true";
} catch {
  state.vaultUnlocked = false;
}

function productMainCategory(product) {
  return product.mainCategory || product.category || "";
}

function productSubCategory(product) {
  return product.subCategory || "";
}

function productCategoryPath(product) {
  return product.categoryPathLabel || [product.mainCategoryLabel || product.categoryLabel, product.subCategoryLabel].filter(Boolean).join(" / ");
}

function quoteLocalPath(product) {
  return product.quotePath || `${QUOTE_LIBRARY_ROOT}\\${product.quote || ""}`;
}

async function copyTextToClipboard(text) {
  try {
    await navigator.clipboard.writeText(text);
    return true;
  } catch {
    const field = document.createElement("textarea");
    field.value = text;
    field.setAttribute("readonly", "");
    field.style.position = "fixed";
    field.style.left = "-9999px";
    field.style.top = "0";
    document.body.appendChild(field);
    field.select();
    let copied = false;
    try { copied = document.execCommand("copy"); }
    catch { copied = false; }
    field.remove();
    return copied;
  }
}

function getCategoryTree() {
  if (categoryTreeMeta.length) return categoryTreeMeta;

  const counts = new Map();
  const subCounts = new Map();
  products.forEach((product) => {
    const main = productMainCategory(product);
    const sub = productSubCategory(product);
    counts.set(main, (counts.get(main) || 0) + 1);
    if (sub) subCounts.set(`${main}::${sub}`, (subCounts.get(`${main}::${sub}`) || 0) + 1);
  });

  return FALLBACK_CATEGORY_TREE
    .map((node) => ({ ...node, count: counts.get(node.id) || 0, children: node.children || [] }))
    .filter((node) => node.count > 0);
}

function activeMainNode(id = state.mainFilter) {
  return getCategoryTree().find((node) => node.id === id);
}

function previewMainNode() {
  const previewId = state.hoverMain || (state.mainFilter !== TEXT.all ? state.mainFilter : "");
  return previewId ? activeMainNode(previewId) : null;
}

function renderFilterChips() {
  const tree = getCategoryTree();
  const mainNode = previewMainNode();
  const allActive = state.mainFilter === TEXT.all;
  const previewing = mainNode && state.hoverMain && state.hoverMain !== state.mainFilter;

  const dropdownFor = (node) => {
    const subButtons = [
      `<button class="filter-chip is-sub ${state.mainFilter === node.id && state.subFilter === TEXT.all ? "is-active" : ""}" type="button" data-sub="${TEXT.all}" data-parent-main="${escapeHtml(node.id)}">\u5168\u90e8${escapeHtml(node.label)}<span class="chip-count">${Number(node.count || 0).toLocaleString()}</span></button>`,
      ...(node.children || []).map((child) => `
        <button class="filter-chip is-sub ${state.mainFilter === node.id && state.subFilter === child.id ? "is-active" : ""}" type="button" data-sub="${escapeHtml(child.id)}" data-parent-main="${escapeHtml(node.id)}">
          ${escapeHtml(child.label)}
          <span class="chip-count">${Number(child.count || 0).toLocaleString()}</span>
        </button>`)
    ].join("");

    return `
      <div class="category-dropdown ${previewing ? "is-previewing" : ""}" role="group" aria-label="${escapeHtml(node.label)} \u5b50\u7c7b">
        ${subButtons}
      </div>`;
  };

  const mainButtons = [
    `<div class="category-item category-item-all"><button class="filter-chip ${allActive ? "is-active" : ""}" type="button" data-filter-all="true">${TEXT.all}\u4ea7\u54c1<span class="chip-count">${products.length.toLocaleString()}</span></button></div>`,
    ...tree.map((node) => {
      const isOpen = mainNode?.id === node.id;
      return `
        <div class="category-item ${isOpen ? "is-open" : ""}">
          <button class="filter-chip ${state.mainFilter === node.id ? "is-active" : ""} ${state.hoverMain === node.id && state.mainFilter !== node.id ? "is-preview" : ""}" type="button" data-main="${escapeHtml(node.id)}" aria-expanded="${isOpen ? "true" : "false"}">
            ${escapeHtml(node.label)}
            <span class="chip-count">${Number(node.count || 0).toLocaleString()}</span>
          </button>
          ${isOpen ? dropdownFor(node) : ""}
        </div>`;
    })
  ].join("");

  filterChips.innerHTML = `
    <div class="category-row main-category-row">${mainButtons}</div>
  `;
}

function formatMoq(product) {
  return product.moq ? product.moq.toLocaleString() : TEXT.noMoq;
}

function normalizedSearchText(product) {
  return [
    product.sku,
    product.owner,
    product.name,
    product.material,
    ...(product.tags || [])
  ].join(" ").toLowerCase();
}

function visibleProducts() {
  const query = state.query.trim().toLowerCase();
  let list = products.filter((product) => {
    const matchesMain = state.mainFilter === TEXT.all || productMainCategory(product) === state.mainFilter;
    const matchesSub = state.subFilter === TEXT.all || productSubCategory(product) === state.subFilter;
    const matchesQuery = !query || normalizedSearchText(product).includes(query);
    return matchesMain && matchesSub && matchesQuery;
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
      <button class="product-card-main" type="button" data-open="${escapeHtml(product.sku)}" aria-label="查看 ${escapeHtml(product.name)} 详情">
        <div class="image-stage">
          <span class="sku-badge">${escapeHtml(product.sku)}</span>
          <img src="${escapeHtml(product.image)}" alt="${escapeHtml(product.name)}" loading="lazy" />
          <span class="updated-badge">QUOTE ${escapeHtml(product.updated)}</span>
        </div>
        <div class="card-copy">
          <div class="card-meta"><span>${escapeHtml(productCategoryPath(product))}</span><span>${escapeHtml(product.owner || "?")}</span></div>
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
        <p class="detail-category">${escapeHtml(productCategoryPath(product))} · ${TEXT.approved}</p>
        <div class="detail-facts">
          <div><span>MOQ</span><strong>${formatMoq(product)}</strong></div>
          <div><span>负责人</span><strong>${escapeHtml(product.owner || "?")}</strong></div>
          <div><span>报价版本</span><strong>v${escapeHtml(product.updated)}</strong></div>
          <div><span>图片素材</span><strong>${imageCount.toLocaleString()} ${TEXT.imageAvailable}</strong></div>
        </div>
        <div class="detail-actions">
          <button class="primary-button" type="button" data-detail-add="${escapeHtml(product.sku)}">${state.selected.has(product.sku) ? TEXT.addedCollection : TEXT.addCollection}</button>
          <button class="secondary-button" type="button" data-copy="${escapeHtml(product.sku)}">${TEXT.copy}</button>
        </div>
      </div>
    </section>
    <section class="detail-section">
      <h3>${TEXT.productInfo}</h3>
      <p>${escapeHtml(product.name)} 已通过审核入库，可用于选品、Catalog 和营销素材调用。</p>
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
          <strong>v${escapeHtml(product.updated)}</strong><span>${escapeHtml(product.updated)}</span><span>${escapeHtml(product.quote)}</span><em>当前</em>
        </div>
      </div>
    </section>
    <section class="detail-section">
      <h3>${TEXT.assets}</h3>
      <div class="detail-gallery"><img src="${escapeHtml(product.image)}" alt="${escapeHtml(product.name)} 素材 1" /></div>
    </section>
    <section class="detail-section">
      <h3>${TEXT.quote}</h3>
      <p class="quote-file-label">${TEXT.quoteFileName}</p>
      <p class="quote-file-name">${escapeHtml(product.quote)}</p>
      <p class="quote-path-note">${TEXT.quotePathNote}</p>
      <code class="quote-path-line">${escapeHtml(quoteLocalPath(product))}</code>
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
  if (clientVaultPanel) {
    clientVaultPanel.classList.remove("is-open");
    clientVaultPanel.setAttribute("aria-hidden", "true");
  }
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
      <div><strong>${escapeHtml(product.name)}</strong><small>${escapeHtml(product.sku)} · MOQ ${formatMoq(product)} · 报价 v${escapeHtml(product.updated)}</small></div>
      <button class="remove-button" type="button" data-remove="${escapeHtml(product.sku)}" aria-label="从选品集移除 ${escapeHtml(product.name)}">×</button>
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
  const text = `${product.sku} | ${product.name}\nCategory: ${productCategoryPath(product)}\nMaterial: ${product.material}\nQuote: ${product.quote}`;
  const copied = await copyTextToClipboard(text);
  showToast(copied ? TEXT.copied : TEXT.prepared);
}

async function copyQuotePath(product) {
  if (!product) return;
  const path = quoteLocalPath(product);
  const copied = await copyTextToClipboard(path);
  if (copied) {
    showToast(TEXT.quotePathCopied);
  } else {
    window.prompt(TEXT.quotePathPrepared, path);
    showToast(TEXT.quotePathPrepared);
  }
}

function clientProductRecords(client) {
  if (Array.isArray(client.products) && client.products.length) return client.products;
  return (client.proposals || []).map((item) => ({
    name: item.title,
    category: item.type || "Product",
    date: item.date,
    status: item.status || "Product record",
    highlights: item.tags || [],
    note: `${item.title} 产品记录`,
    productCount: item.productCount || 1
  }));
}

function vaultTotals() {
  const recordCount = vaultClients.reduce((sum, client) => sum + clientProductRecords(client).length, 0);
  const imageCount = vaultClients.reduce((sum, client) => sum + clientProductRecords(client).reduce((inner, item) => inner + (item.images || []).length, 0), 0);
  return { clientCount: vaultClients.length, recordCount, imageCount };
}

function renderClientVaultLogin(error = "") {
  clientVaultContent.innerHTML = `
    <section class="vault-login" aria-label="客户方案库登录">
      <div class="vault-login-visual">
        <p class="vault-kicker">PRIVATE CLIENT SHOWROOM</p>
        <h3>把客户方案，收进一个漂亮的保险柜。</h3>
        <p>每个客户是一只带 Logo 标签的文件夹，点进去就是给 TA 做过的 Catalog、选品方案和活动提案。适合内部复盘，也适合展示给业务同事快速调用。</p>
      </div>
      <form class="vault-login-card" id="vaultLoginForm">
        <h3>登录客户方案库</h3>
        <p>客户登录后，只看到自己在 Levin 做过的产品记录与产品图片。</p>
        <label class="vault-field">
          账号
          <input id="vaultUser" name="user" autocomplete="username" placeholder="请输入账号" required />
        </label>
        <label class="vault-field">
          密码
          <input id="vaultPassword" name="password" type="password" autocomplete="current-password" placeholder="请输入密码" required />
        </label>
        <p class="vault-error" id="vaultError">${escapeHtml(error)}</p>
        <button class="primary-button" type="submit">进入客户方案库</button>
        <p class="vault-demo-note">本地演示账号：<strong>marketing</strong>　密码：<strong>levin2026</strong><br />正式上线如果要真正保密，需要接入后端账号权限。</p>
      </form>
    </section>`;
}

function renderClientVaultHome() {
  const totals = vaultTotals();
  const selectedClient = vaultClients.find((client) => client.id === state.activeClient) || vaultClients[0];
  if (selectedClient && state.activeClient !== selectedClient.id) state.activeClient = selectedClient.id;

  const clientNav = vaultClients.map((client) => {
    const records = clientProductRecords(client);
    const imageCount = records.reduce((sum, item) => sum + (item.images || []).length, 0);
    const active = selectedClient?.id === client.id;
    const logo = client.logoImage
      ? `<img src="${escapeHtml(client.logoImage)}" alt="${escapeHtml(client.name)} logo" />`
      : escapeHtml(client.logo || client.name.slice(0, 2));

    return `
      <button class="client-nav-card ${active ? "is-active" : ""}" type="button" data-client="${escapeHtml(client.id)}" style="--folder-accent:${escapeHtml(client.accent || "#111111")}">
        <span class="client-nav-logo">${logo}</span>
        <span class="client-nav-copy">
          <strong>${escapeHtml(client.name)}</strong>
          <small>${escapeHtml(client.clientFullName || client.industry || "Client")}</small>
        </span>
        <span class="client-nav-count">${Number(records.length).toLocaleString()}</span>
        <span class="client-nav-meta">${Number(imageCount).toLocaleString()} 图</span>
      </button>`;
  }).join("");

  const selectedRecords = selectedClient ? clientProductRecords(selectedClient) : [];
  const selectedImageCount = selectedRecords.reduce((sum, item) => sum + (item.images || []).length, 0);
  const productTiles = selectedRecords.map((item) => {
    const images = Array.isArray(item.images) ? item.images : [];
    const heroImage = item.heroImage || images[0] || "";
    const imageStrip = images.slice(0, 6).map((image, index) => `
      <img src="${escapeHtml(image)}" alt="${escapeHtml(item.name)} 产品图 ${index + 1}" loading="lazy" />`).join("");
    const tags = (item.highlights || []).slice(0, 5).map((tag) => `<span>${escapeHtml(tag)}</span>`).join("");

    return `
      <article class="customer-product-tile">
        <div class="customer-product-hero">
          ${heroImage ? `<img src="${escapeHtml(heroImage)}" alt="${escapeHtml(item.name)}" loading="lazy" />` : `<span>${escapeHtml((item.name || "Product").slice(0, 2))}</span>`}
        </div>
        <div class="customer-product-info">
          <div class="client-product-top">
            <span>${escapeHtml(item.category || "Product")}</span>
            <em>${escapeHtml(item.status || "Product record")}</em>
          </div>
          <h4>${escapeHtml(item.name)}</h4>
          <p>${escapeHtml(item.note || "客户历史产品记录。")}</p>
          <div class="client-product-facts">
            <div><strong>${escapeHtml(item.date || "-")}</strong><small>完成时间</small></div>
            <div><strong>${escapeHtml(item.recordId || "-")}</strong><small>产品记录号</small></div>
          </div>
          <div class="proposal-tags">${tags}</div>
        </div>
        ${imageStrip ? `<div class="customer-product-strip">${imageStrip}</div>` : ""}
      </article>`;
  }).join("");

  clientVaultContent.innerHTML = `
    <section class="vault-admin-layout" aria-label="客户产品管理台">
      <aside class="client-directory" aria-label="客户导航">
        <div class="client-directory-head">
          <p class="eyebrow">MARKETING ADMIN</p>
          <h3>客户目录</h3>
          <p>按客户切换，右侧查看该客户在 Levin 做过的产品图片。</p>
        </div>
        <div class="client-directory-stats">
          <div><strong>${totals.clientCount.toLocaleString()}</strong><span>客户</span></div>
          <div><strong>${totals.recordCount.toLocaleString()}</strong><span>产品</span></div>
          <div><strong>${totals.imageCount.toLocaleString()}</strong><span>图片</span></div>
        </div>
        <div class="client-nav-list">${clientNav}</div>
        <button class="secondary-button vault-directory-logout" type="button" data-vault-logout>退出登录</button>
      </aside>

      <section class="client-workbench" aria-label="${selectedClient ? escapeHtml(selectedClient.name) : "客户"} 产品图片">
        ${selectedClient ? `
          <div class="client-workbench-hero" style="--folder-accent:${escapeHtml(selectedClient.accent || "#111111")}">
            <span class="client-detail-logo">${selectedClient.logoImage ? `<img src="${escapeHtml(selectedClient.logoImage)}" alt="${escapeHtml(selectedClient.name)} logo" />` : escapeHtml(selectedClient.logo || selectedClient.name.slice(0, 2))}</span>
            <div>
              <p class="eyebrow">${escapeHtml(selectedClient.industry || "CLIENT")}</p>
              <h3>${escapeHtml(selectedClient.name)}</h3>
              <p>${escapeHtml(selectedClient.summary || "客户历史产品记录。")}</p>
            </div>
            <div class="client-workbench-numbers">
              <div><strong>${selectedRecords.length.toLocaleString()}</strong><span>产品记录</span></div>
              <div><strong>${selectedImageCount.toLocaleString()}</strong><span>产品图片</span></div>
            </div>
          </div>
          <div class="customer-product-grid">${productTiles || `<div class="vault-empty-products">这个客户还没有录入产品图片。</div>`}</div>
        ` : `<div class="vault-empty-products">还没有客户资料。</div>`}
      </section>
    </section>`;
}

function renderClientVaultDetail(client) {
  const productCards = clientProductRecords(client).map((item) => {
    const images = Array.isArray(item.images) ? item.images : [];
    const heroImage = item.heroImage || images[0] || "";
    const highlightTags = (item.highlights || []).map((tag) => `<span>${escapeHtml(tag)}</span>`).join("");
    const gallery = images.slice(0, 5).map((image, index) => `
      <img src="${escapeHtml(image)}" alt="${escapeHtml(item.name)} 产品图 ${index + 1}" loading="lazy" />`).join("");

    return `
      <article class="client-product-card">
        <div class="client-product-media">
          ${heroImage ? `<img src="${escapeHtml(heroImage)}" alt="${escapeHtml(item.name)}" loading="lazy" />` : `<span>${escapeHtml((item.name || "Product").slice(0, 2))}</span>`}
        </div>
        <div class="client-product-copy">
          <div class="client-product-top">
            <span>${escapeHtml(item.category || "Product")}</span>
            <em>${escapeHtml(item.status || "Product record")}</em>
          </div>
          <h4>${escapeHtml(item.name)}</h4>
          <p>${escapeHtml(item.note || "客户历史产品记录。")}</p>
          <div class="client-product-facts">
            <div><strong>${escapeHtml(item.date || "-")}</strong><small>完成时间</small></div>
            <div><strong>${escapeHtml(item.recordId || "-")}</strong><small>产品记录号</small></div>
          </div>
          <div class="proposal-tags">${highlightTags}</div>
          ${gallery ? `<div class="client-product-gallery">${gallery}</div>` : ""}
        </div>
      </article>`;
  }).join("");

  clientVaultContent.innerHTML = `
    <section class="vault-stage" aria-label="${escapeHtml(client.name)} 方案列表">
      <div class="vault-detail-top">
        <button class="vault-back" type="button" data-vault-back>← 返回客户文件夹</button>
        <button class="secondary-button" type="button" data-vault-logout>退出登录</button>
      </div>
      <div class="client-detail-hero" style="--folder-accent:${escapeHtml(client.accent || "#ffd84d")}">
        <span class="client-detail-logo">${escapeHtml(client.logo || client.name.slice(0, 2))}</span>
        <div>
          <p class="eyebrow">${escapeHtml(client.industry || "CLIENT")}</p>
          <h3>${escapeHtml(client.name)}</h3>
          <p>${escapeHtml(client.summary || "客户历史产品记录。")}</p>
        </div>
      </div>
      <div class="client-product-grid">${productCards}</div>
    </section>`;
}

function renderClientVault(error = "") {
  if (!clientVaultContent) return;
  if (!state.vaultUnlocked) {
    renderClientVaultLogin(error);
    return;
  }
  renderClientVaultHome();
}

function openClientVault() {
  if (!clientVaultPanel) return;
  detailPanel.classList.remove("is-open");
  detailPanel.setAttribute("aria-hidden", "true");
  collectionDrawer.classList.remove("is-open");
  collectionDrawer.setAttribute("aria-hidden", "true");
  clientVaultPanel.classList.add("is-open");
  clientVaultPanel.setAttribute("aria-hidden", "false");
  scrim.hidden = false;
  renderClientVault();
  const firstInput = clientVaultPanel.querySelector("input, button");
  if (firstInput) firstInput.focus();
}

function logoutClientVault() {
  state.activeClient = null;
  setVaultSession(false);
  renderClientVault();
}

grid.addEventListener("click", (event) => {
  const open = event.target.closest("[data-open]");
  const add = event.target.closest("[data-add]");
  if (add) { event.stopPropagation(); toggleSelected(add.dataset.add); }
  else if (open) openDetail(open.dataset.open);
});

filterChips.addEventListener("click", (event) => {
  const allButton = event.target.closest("[data-filter-all]");
  const mainButton = event.target.closest("[data-main]");
  const subButton = event.target.closest("[data-sub]");
  if (allButton) {
    state.mainFilter = TEXT.all;
    state.subFilter = TEXT.all;
    state.hoverMain = null;
  } else if (mainButton) {
    state.mainFilter = mainButton.dataset.main;
    state.subFilter = TEXT.all;
    state.hoverMain = state.mainFilter;
  } else if (subButton) {
    state.mainFilter = subButton.dataset.parentMain || state.mainFilter;
    state.subFilter = subButton.dataset.sub;
    state.hoverMain = state.mainFilter;
  } else {
    return;
  }
  renderFilterChips();
  renderProducts();
});

filterChips.addEventListener("pointerover", (event) => {
  const mainButton = event.target.closest("[data-main]");
  const allButton = event.target.closest("[data-filter-all]");
  const nextHover = mainButton ? mainButton.dataset.main : (allButton ? null : state.hoverMain);
  if (nextHover !== state.hoverMain) {
    state.hoverMain = nextHover;
    renderFilterChips();
  }
});

filterChips.addEventListener("pointerleave", () => {
  if (state.hoverMain) {
    state.hoverMain = null;
    renderFilterChips();
  }
});

filterChips.addEventListener("focusin", (event) => {
  const mainButton = event.target.closest("[data-main]");
  if (mainButton && mainButton.dataset.main !== state.hoverMain) {
    state.hoverMain = mainButton.dataset.main;
    renderFilterChips();
  }
});

filterChips.addEventListener("focusout", (event) => {
  if (!filterChips.contains(event.relatedTarget) && state.hoverMain) {
    state.hoverMain = null;
    renderFilterChips();
  }
});

document.querySelectorAll("[data-layout]").forEach((button) => button.addEventListener("click", () => {
  state.layout = button.dataset.layout;
  document.querySelectorAll("[data-layout]").forEach((item) => item.classList.toggle("is-active", item === button));
  renderProducts();
}));

searchInput.addEventListener("input", () => { state.query = searchInput.value; renderProducts(); });
document.querySelector("#sortSelect").addEventListener("change", (event) => { state.sort = event.target.value; renderProducts(); });
document.querySelector("#clearSearch").addEventListener("click", () => { searchInput.value = ""; state.query = ""; state.mainFilter = TEXT.all; state.subFilter = TEXT.all; state.hoverMain = null; renderFilterChips(); renderProducts(); searchInput.focus(); });
document.querySelector("#collectionButton").addEventListener("click", openCollection);
document.querySelector("#closeCollection").addEventListener("click", closePanels);
document.querySelector("#closeDetail").addEventListener("click", closePanels);
document.querySelector("#closeClientVault").addEventListener("click", closePanels);
scrim.addEventListener("click", closePanels);
document.querySelector("#drawerList").addEventListener("click", (event) => { const remove = event.target.closest("[data-remove]"); if (remove) toggleSelected(remove.dataset.remove); });

detailContent.addEventListener("click", (event) => {
  const add = event.target.closest("[data-detail-add]");
  const copy = event.target.closest("[data-copy]");
  const quote = event.target.closest("[data-quote]");
  if (add) toggleSelected(add.dataset.detailAdd);
  if (copy) copyProduct(products.find((item) => item.sku === copy.dataset.copy));
  if (quote) copyQuotePath(products.find((item) => item.sku === quote.dataset.quote));
});

document.querySelector("#createCatalog").addEventListener("click", () => showToast(`${TEXT.catalogLockedPrefix}${state.selected.size}${TEXT.catalogLockedSuffix}`));
document.querySelector("#syncButton").addEventListener("click", () => showToast(TEXT.syncDone));

clientVaultContent.addEventListener("submit", (event) => {
  if (!event.target.closest("#vaultLoginForm")) return;
  event.preventDefault();
  const form = event.target;
  const user = String(form.elements.user?.value || "").trim();
  const password = String(form.elements.password?.value || "");
  if (user === vaultCredentials.username && password === vaultCredentials.password) {
    setVaultSession(true);
    state.activeClient = null;
    renderClientVault();
    showToast("已进入客户方案库");
  } else {
    renderClientVault("账号或密码不正确，请再试一次。");
  }
});

clientVaultContent.addEventListener("click", (event) => {
  const clientButton = event.target.closest("[data-client]");
  const backButton = event.target.closest("[data-vault-back]");
  const logoutButton = event.target.closest("[data-vault-logout]");
  const proposalButton = event.target.closest("[data-proposal-open]");
  if (clientButton) {
    state.activeClient = clientButton.dataset.client;
    renderClientVault();
  }
  if (backButton) {
    state.activeClient = null;
    renderClientVault();
  }
  if (logoutButton) logoutClientVault();
  if (proposalButton) showToast("下一步可以接入方案 PDF / PPT / 图片预览");
});

document.querySelectorAll(".nav-item").forEach((button) => button.addEventListener("click", () => {
  document.querySelectorAll(".nav-item").forEach((item) => item.classList.toggle("is-active", item === button));
  if (button.dataset.view === "clientVault") openClientVault();
  else if (button.dataset.view === "collections") openCollection();
  else if (button.dataset.view === "products") closePanels();
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

renderFilterChips();
renderProducts();
renderCollection();
