/* ==========================================================================
   NetSec Study — ứng dụng ôn tập An ninh mạng
   187 câu hỏi · 18 chủ đề · luyện tập, thi thử, flashcard, thống kê
   ========================================================================== */
(function () {
  "use strict";

  /* ---------------------------------------------------------------------- */
  /* Tiện ích                                                               */
  /* ---------------------------------------------------------------------- */
  const QUESTIONS = Array.isArray(window.QUESTIONS) ? window.QUESTIONS : [];
  const SECTIONS = Array.isArray(window.SECTIONS) ? window.SECTIONS : [];
  const SECTION_BY_ID = {};
  SECTIONS.forEach((s) => { SECTION_BY_ID[s.id] = s; });
  const Q_BY_ID = new Map(QUESTIONS.map((q) => [q.id, q]));
  const LETTERS = ["A", "B", "C", "D"];
  const TOTAL = QUESTIONS.length;
  const KEY = "netsec-study-v1";
  const $ = (sel, root) => (root || document).querySelector(sel);
  const $$ = (sel, root) => Array.from((root || document).querySelectorAll(sel));

  const esc = (value) =>
    String(value == null ? "" : value).replace(/[&<>"']/g, (ch) => ({
      "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;",
    }[ch]));

  const icon = (name, cls) =>
    `<svg class="icon${cls ? " " + cls : ""}" aria-hidden="true"><use href="#i-${name}"></use></svg>`;

  const pct = (a, b) => (b > 0 ? Math.round((a / b) * 100) : 0);

  function shuffle(arr) {
    const a = arr.slice();
    for (let i = a.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [a[i], a[j]] = [a[j], a[i]];
    }
    return a;
  }

  function normalize(str) {
    return String(str).toLowerCase().normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "").replace(/đ/g, "d");
  }

  function fmtClock(totalSeconds) {
    const s = Math.max(0, Math.floor(totalSeconds));
    const h = Math.floor(s / 3600);
    const m = Math.floor((s % 3600) / 60);
    const sec = s % 60;
    const mm = String(m).padStart(2, "0");
    const ss = String(sec).padStart(2, "0");
    return h > 0 ? `${h}:${mm}:${ss}` : `${mm}:${ss}`;
  }

  function fmtDuration(sec) {
    if (!sec || sec < 5) return "dưới 1 phút";
    if (sec < 60) return `${Math.round(sec)} giây`;
    const m = Math.round(sec / 60);
    return m < 60 ? `${m} phút` : `${Math.floor(m / 60)} giờ ${m % 60} phút`;
  }

  function dayKey(d) {
    const dt = d || new Date();
    return `${dt.getFullYear()}-${String(dt.getMonth() + 1).padStart(2, "0")}-${String(dt.getDate()).padStart(2, "0")}`;
  }

  const dateFmt = new Intl.DateTimeFormat("vi-VN", { day: "2-digit", month: "2-digit", year: "numeric" });
  const timeFmt = new Intl.DateTimeFormat("vi-VN", { hour: "2-digit", minute: "2-digit" });

  function fmtWhen(ts) {
    const d = new Date(ts);
    const today = dayKey();
    const yest = new Date(); yest.setDate(yest.getDate() - 1);
    if (dayKey(d) === today) return `Hôm nay, ${timeFmt.format(d)}`;
    if (dayKey(d) === dayKey(yest)) return `Hôm qua, ${timeFmt.format(d)}`;
    return `${dateFmt.format(d)} · ${timeFmt.format(d)}`;
  }

  function greeting() {
    const h = new Date().getHours();
    if (h < 11) return "Chào buổi sáng";
    if (h < 14) return "Chào buổi trưa";
    if (h < 18) return "Chào buổi chiều";
    return "Chào buổi tối";
  }

  function debounce(fn, wait) {
    let t = null;
    return function () {
      clearTimeout(t);
      const args = arguments;
      t = setTimeout(() => fn.apply(null, args), wait);
    };
  }

  /* ---------------------------------------------------------------------- */
  /* Trạng thái & lưu trữ                                                   */
  /* ---------------------------------------------------------------------- */
  const DEFAULT_SETTINGS = {
    theme: "system", font: "md", shuffle: false, instant: true,
    autoNext: false, pass: 80,
  };

  const DEFAULTS = {
    version: 1,
    progress: {},
    settings: Object.assign({}, DEFAULT_SETTINGS),
    sessions: [],
    daily: {},
    seenWelcome: false,
    createdAt: Date.now(),
  };

  function clone(obj) { return JSON.parse(JSON.stringify(obj)); }

  function loadStore() {
    try {
      const raw = localStorage.getItem(KEY);
      if (!raw) return clone(DEFAULTS);
      const data = JSON.parse(raw);
      return {
        version: 1,
        progress: data.progress && typeof data.progress === "object" ? data.progress : {},
        settings: Object.assign({}, DEFAULT_SETTINGS, data.settings || {}),
        sessions: Array.isArray(data.sessions) ? data.sessions.slice(0, 80) : [],
        daily: data.daily && typeof data.daily === "object" ? data.daily : {},
        seenWelcome: !!data.seenWelcome,
        createdAt: data.createdAt || Date.now(),
      };
    } catch (err) {
      console.warn("Không đọc được dữ liệu đã lưu", err);
      return clone(DEFAULTS);
    }
  }

  const store = loadStore();
  let S = null; // phiên hiện tại
  let tickHandle = null;
  let route = "dashboard";
  let modalOk = null;
  let pendingFocusSearch = false;
  const libFilter = { q: "", topic: "all", status: "all" };
  const libOpen = new Set();
  const draft = { topic: "all", count: 20, order: "random" };

  let saveTimer = null;
  function saveStore() {
    clearTimeout(saveTimer);
    saveTimer = setTimeout(() => {
      try { localStorage.setItem(KEY, JSON.stringify(store)); }
      catch (err) { console.warn("Không lưu được tiến độ", err); }
    }, 80);
  }

  function progressOf(id, create) {
    let p = store.progress[id];
    if (!p && create) {
      p = store.progress[id] = { a: 0, c: 0, w: 0, last: null, streak: 0, star: false, updated: 0 };
    }
    return p;
  }

  function recordAnswer(id, correct) {
    const p = progressOf(id, true);
    p.a += 1;
    if (correct) { p.c += 1; p.streak = (p.streak || 0) + 1; }
    else { p.w += 1; p.streak = 0; }
    p.last = !!correct;
    p.updated = Date.now();
    const k = dayKey();
    const d = store.daily[k] || (store.daily[k] = { a: 0, c: 0, sec: 0 });
    d.a += 1;
    if (correct) d.c += 1;
    saveStore();
    updateChrome();
  }

  function addStudyTime(sec) {
    if (!sec || sec < 1) return;
    const k = dayKey();
    const d = store.daily[k] || (store.daily[k] = { a: 0, c: 0, sec: 0 });
    d.sec += Math.round(sec);
    saveStore();
  }

  function calcStreak() {
    const cur = new Date();
    let k = dayKey(cur);
    if (!store.daily[k] || !store.daily[k].a) {
      cur.setDate(cur.getDate() - 1);
      k = dayKey(cur);
      if (!store.daily[k] || !store.daily[k].a) return 0;
    }
    let n = 0;
    while (store.daily[k] && store.daily[k].a > 0) {
      n += 1;
      cur.setDate(cur.getDate() - 1);
      k = dayKey(cur);
    }
    return n;
  }

  function computeStats() {
    const values = Object.values(store.progress);
    let attempted = 0, attempts = 0, correct = 0, mastered = 0, needsReview = 0, starred = 0;
    values.forEach((p) => {
      if (p.a > 0) attempted += 1;
      attempts += p.a || 0;
      correct += p.c || 0;
      if ((p.streak || 0) >= 2) mastered += 1;
      if (p.last === false) needsReview += 1;
      if (p.star) starred += 1;
    });
    return {
      attempted, attempts, correct, mastered, needsReview, starred,
      accuracy: attempts ? Math.round((correct / attempts) * 100) : 0,
      coverage: pct(attempted, TOTAL),
      streak: calcStreak(),
    };
  }

  function statusOf(q) {
    const p = store.progress[q.id];
    if (!p || !p.a) return "unanswered";
    if (p.last === false) return "wrong";
    if ((p.streak || 0) >= 2) return "mastered";
    return "learning";
  }

  function poolFor(topic) {
    return topic === "all" ? QUESTIONS.slice() : QUESTIONS.filter((q) => q.s === topic);
  }

  function sectionOf(q) { return SECTION_BY_ID[q.s] || { name: "Khác", color: "#6366f1" }; }

  /* ---------------------------------------------------------------------- */
  /* Giao diện: theme, chrome, toast, modal                                 */
  /* ---------------------------------------------------------------------- */
  function applyTheme() {
    const s = store.settings;
    const sysLight = window.matchMedia && window.matchMedia("(prefers-color-scheme: light)").matches;
    const theme = s.theme === "system" ? (sysLight ? "light" : "dark") : s.theme;
    document.documentElement.dataset.theme = theme;
    const meta = document.querySelector('meta[name="theme-color"]');
    if (meta) meta.setAttribute("content", theme === "light" ? "#f4f6fc" : "#0a0e1a");
    const btn = $("#themeBtn");
    if (btn) btn.innerHTML = icon(theme === "dark" ? "sun" : "moon");
    document.documentElement.dataset.font = s.font || "md";
  }

  function cycleTheme() {
    const cur = document.documentElement.dataset.theme;
    store.settings.theme = cur === "dark" ? "light" : "dark";
    saveStore();
    applyTheme();
    if (route === "settings") render();
    toast(cur === "dark" ? "Đã bật giao diện sáng" : "Đã bật giao diện tối", "info");
  }

  function updateChrome() {
    const st = computeStats();
    const sideText = $("#sideProgressText");
    if (sideText) sideText.textContent = `${st.attempted}/${TOTAL}`;
    const sideBar = $("#sideProgressBar");
    if (sideBar) sideBar.style.width = `${st.coverage}%`;
    const hint = $("#sideProgressHint");
    if (hint) {
      hint.textContent = st.attempted === 0
        ? "Bắt đầu câu hỏi đầu tiên nhé!"
        : st.attempted >= TOTAL ? "Tuyệt vời, bạn đã chạm mọi câu hỏi!" : `Còn ${TOTAL - st.attempted} câu chưa chạm tới`;
    }
    $$("[data-nav]").forEach((el) => el.classList.toggle("active", el.dataset.nav === route));
  }

  function toast(message, type) {
    const stack = $("#toastStack");
    if (!stack) return;
    const el = document.createElement("div");
    el.className = `toast ${type || "info"}`;
    const ic = type === "ok" ? "check-circle" : type === "bad" ? "alert" : type === "warn" ? "info" : "info";
    el.innerHTML = `${icon(ic)}<span>${esc(message)}</span>`;
    stack.appendChild(el);
    setTimeout(() => {
      el.classList.add("out");
      setTimeout(() => el.remove(), 250);
    }, 2600);
  }

  function closeModal() {
    const root = $("#modalRoot");
    if (root) root.innerHTML = "";
    document.body.style.overflow = "";
    modalOk = null;
  }

  function openModal(opts) {
    const o = opts || {};
    const root = $("#modalRoot");
    if (!root) return;
    modalOk = typeof o.onOk === "function" ? o.onOk : null;
    root.innerHTML = `
      <div class="modal-backdrop" data-action="modal-backdrop">
        <div class="modal${o.wide ? " wide" : ""}" role="dialog" aria-modal="true" aria-label="${esc(o.title || "Hộp thoại")}">
          <div class="modal-head">
            <div>
              <h3 class="modal-title">${esc(o.title || "")}</h3>
              ${o.desc ? `<p class="modal-desc">${esc(o.desc)}</p>` : ""}
            </div>
            <button class="modal-close" type="button" data-action="close-modal" aria-label="Đóng">${icon("close")}</button>
          </div>
          <div class="modal-body">${o.body || ""}</div>
          ${o.noFoot ? "" : `<div class="modal-foot">
            ${o.hideCancel ? "" : `<button class="btn btn-outline" type="button" data-action="close-modal">${esc(o.cancelText || "Hủy")}</button>`}
            <button class="btn ${o.danger ? "btn-danger" : "btn-primary"}" type="button" id="modalOk">${esc(o.okText || "Đồng ý")}</button>
          </div>`}
        </div>
      </div>`;
    document.body.style.overflow = "hidden";
    const okBtn = $("#modalOk");
    if (okBtn) {
      okBtn.addEventListener("click", () => {
        const fn = modalOk;
        const keep = fn ? fn() === false : false;
        if (!keep) closeModal();
      });
    }
    setTimeout(() => {
      const target = $("#modalOk") || $(".modal-close");
      if (target) target.focus();
    }, 60);
  }

  function confirmDialog(opts) {
    openModal({
      title: opts.title,
      desc: opts.desc,
      body: opts.body || "",
      okText: opts.okText || "Đồng ý",
      cancelText: opts.cancelText || "Hủy",
      danger: !!opts.danger,
      onOk: opts.onOk,
    });
  }

  function confetti() {
    if (window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    stopConfetti();
    const canvas = document.createElement("canvas");
    canvas.id = "confettiCanvas";
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    document.body.appendChild(canvas);
    const ctx = canvas.getContext("2d");
    const colors = ["#7c83ff", "#a78bfa", "#34d399", "#fbbf24", "#fb7185", "#60a5fa"];
    const parts = [];
    for (let i = 0; i < 130; i++) {
      parts.push({
        x: canvas.width / 2 + (Math.random() - 0.5) * 220,
        y: canvas.height * 0.32 + (Math.random() - 0.5) * 60,
        vx: (Math.random() - 0.5) * 9,
        vy: Math.random() * -9 - 3,
        size: 4 + Math.random() * 6,
        color: colors[Math.floor(Math.random() * colors.length)],
        rot: Math.random() * Math.PI,
        vr: (Math.random() - 0.5) * 0.25,
        life: 1,
      });
    }
    let frames = 0;
    function frame() {
      frames += 1;
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      parts.forEach((p) => {
        p.vy += 0.22;
        p.vx *= 0.995;
        p.x += p.vx;
        p.y += p.vy;
        p.rot += p.vr;
        p.life -= 0.008;
        ctx.save();
        ctx.globalAlpha = Math.max(0, p.life);
        ctx.translate(p.x, p.y);
        ctx.rotate(p.rot);
        ctx.fillStyle = p.color;
        ctx.fillRect(-p.size / 2, -p.size / 2, p.size, p.size * 0.62);
        ctx.restore();
      });
      if (frames < 160) requestAnimationFrame(frame);
      else canvas.remove();
    }
    requestAnimationFrame(frame);
  }

  function stopConfetti() {
    const canvas = document.getElementById("confettiCanvas");
    if (canvas) canvas.remove();
  }

  /* ---------------------------------------------------------------------- */
  /* Trang: Tổng quan                                                       */
  /* ---------------------------------------------------------------------- */
  function ringHTML(percent, label) {
    const r = 70;
    const c = 2 * Math.PI * r;
    const off = c * (1 - Math.min(100, Math.max(0, percent)) / 100);
    return `<div class="ring-wrap">
      <svg class="ring" viewBox="0 0 176 176" aria-hidden="true">
        <defs>
          <linearGradient id="ringGradient" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stop-color="#7c83ff"/><stop offset="100%" stop-color="#a78bfa"/>
          </linearGradient>
        </defs>
        <circle class="ring-bg" cx="88" cy="88" r="${r}"/>
        <circle class="ring-fg" cx="88" cy="88" r="${r}" stroke-dasharray="${c.toFixed(1)}" stroke-dashoffset="${off.toFixed(1)}"/>
      </svg>
      <div class="ring-text"><strong>${percent}%</strong><span>${esc(label)}</span></div>
    </div>`;
  }

  function sectionProgress() {
    return SECTIONS.map((s) => {
      const qs = QUESTIONS.filter((q) => q.s === s.id);
      let attempts = 0, correct = 0, answered = 0, wrong = 0;
      qs.forEach((q) => {
        const p = store.progress[q.id];
        if (p) {
          attempts += p.a || 0;
          correct += p.c || 0;
          if (p.a) answered += 1;
          if (p.last === false) wrong += 1;
        }
      });
      return Object.assign({}, s, {
        total: qs.length, answered, attempts, correct, wrong,
        accuracy: attempts ? Math.round((correct / attempts) * 100) : 0,
        coverage: pct(answered, qs.length),
      });
    });
  }

  function statusBadge(st) {
    if (st === "mastered") return `<span class="badge badge-success">${icon("check")} Đã thuộc</span>`;
    if (st === "wrong") return `<span class="badge badge-danger">${icon("refresh")} Cần ôn</span>`;
    if (st === "learning") return `<span class="badge badge-warn">Đang học</span>`;
    return `<span class="badge badge-muted">Chưa làm</span>`;
  }

  function dashboardHTML() {
    const st = computeStats();
    const recent = store.sessions.slice(0, 5);
    const activeBanner = S && !S.done
      ? `<a class="badge badge-primary" href="#/${S.mode === "flash" ? "flashcards" : S.mode}" style="margin-top:14px">${icon("play")} Tiếp tục phiên ${S.mode === "exam" ? "thi" : S.mode === "flash" ? "flashcard" : "luyện"} (${Math.min(S.index + 1, S.ids.length)}/${S.ids.length})</a>`
      : "";

    const quick = [
      { kind: "practice", icon: "zap", title: "Luyện nhanh 10 câu", sub: "Câu hỏi ngẫu nhiên, phản hồi ngay" },
      { kind: "exam", icon: "file", title: "Thi thử 20 câu", sub: "Tính giờ, chấm điểm như thi thật" },
      { kind: "wrong", icon: "refresh", title: "Ôn câu hay sai", sub: st.needsReview ? `${st.needsReview} câu đang cần ôn lại` : "Chưa có câu nào cần ôn" },
      { kind: "flash", icon: "cards", title: "Flashcard", sub: "Lật thẻ, ghi nhớ chủ động" },
    ];

    return `
      <div class="fade-in">
        <section class="hero">
          <div class="hero-copy">
            <span class="hero-badge">${icon("sparkles")} ${greeting()}</span>
            <h2>Sẵn sàng chinh phục<br/>${TOTAL} câu hỏi An ninh mạng?</h2>
            <p>Luyện theo từng chủ đề, thi thử có tính giờ, lật flashcard và theo dõi tiến độ. Tiến độ được lưu tự động trên thiết bị của bạn.</p>
            <div class="btn-row">
              <a class="btn btn-primary btn-lg" href="#/practice">${icon("play")} Luyện tập ngay</a>
              <a class="btn btn-outline btn-lg" href="#/exam">${icon("file")} Thi thử</a>
            </div>
            ${activeBanner}
          </div>
          <div class="hero-side">
            ${ringHTML(st.coverage, `${st.attempted}/${TOTAL} câu đã chạm`)}
          </div>
        </section>

        <div class="stats-grid stagger">
          <div class="card stat-card">
            <div class="stat-icon">${icon("layers")}</div>
            <div><div class="stat-value">${st.attempted}<span class="muted" style="font-size:.8rem;font-weight:500">/${TOTAL}</span></div><div class="stat-label">Câu đã làm</div><div class="sub">${st.attempts} lượt trả lời</div></div>
          </div>
          <div class="card stat-card">
            <div class="stat-icon green">${icon("target")}</div>
            <div><div class="stat-value">${st.attempts ? st.accuracy + "%" : "—"}</div><div class="stat-label">Độ chính xác</div><div class="sub">${st.correct}/${st.attempts} lượt đúng</div></div>
          </div>
          <div class="card stat-card">
            <div class="stat-icon amber">${icon("check-circle")}</div>
            <div><div class="stat-value">${st.mastered}</div><div class="stat-label">Câu đã thuộc</div><div class="sub">đúng 2 lần liên tiếp</div></div>
          </div>
          <div class="card stat-card">
            <div class="stat-icon red">${icon("flame")}</div>
            <div><div class="stat-value">${st.streak}</div><div class="stat-label">Chuỗi ngày học</div><div class="sub">${st.needsReview} câu cần ôn lại</div></div>
          </div>
        </div>

        <div class="section-head"><h3 class="section-title">${icon("zap")} Bắt đầu nhanh</h3></div>
        <div class="quick-grid stagger">
          ${quick.map((q) => `
            <button class="quick-card" type="button" data-action="quick" data-kind="${q.kind}">
              <span class="quick-icon">${icon(q.icon)}</span>
              <span class="quick-title">${q.title}</span>
              <span class="quick-sub">${q.sub}</span>
              <span class="quick-arrow">${icon("arrow-right")}</span>
            </button>`).join("")}
        </div>

        <div class="section-head">
          <h3 class="section-title">${icon("layers")} Tiến độ theo chủ đề</h3>
          <a class="link-more" href="#/stats">Xem thống kê ${icon("chevron-right")}</a>
        </div>
        <div class="card card-pad">
          <div class="topic-list">
            ${sectionProgress().map((s) => `
              <div class="topic-row" data-action="practice-topic" data-topic="${s.id}" role="button" tabindex="0">
                <div class="topic-meta">
                  <span class="topic-dot" style="background:${s.color}"></span>
                  <div style="min-width:0">
                    <div class="topic-name">${esc(s.name)}</div>
                    <div class="topic-sub">${s.answered}/${s.total} câu · đúng ${s.attempts ? s.accuracy + "%" : "—"}</div>
                  </div>
                </div>
                <div class="topic-bar-col"><div class="bar slim"><i style="width:${s.coverage}%"></i></div></div>
                <div class="topic-stats"><strong>${s.coverage}%</strong></div>
              </div>`).join("")}
          </div>
        </div>

        <div class="section-head">
          <h3 class="section-title">${icon("clock")} Hoạt động gần đây</h3>
          <a class="link-more" href="#/stats">Lịch sử ${icon("chevron-right")}</a>
        </div>
        <div class="card card-pad">
          ${recent.length ? `<div class="activity-list">${recent.map((r) => {
            const p = pct(r.correct, r.total);
            const cls = p >= 80 ? "good" : p >= 60 ? "mid" : "bad";
            return `<div class="activity-row">
              <div class="activity-icon">${icon(r.mode === "exam" ? "file" : r.mode === "flash" ? "cards" : "target")}</div>
              <div class="activity-main"><strong>${r.mode === "exam" ? "Thi thử" : r.mode === "flash" ? "Flashcard" : "Luyện tập"} · ${r.correct}/${r.total} câu đúng</strong><span>${fmtWhen(r.t)} · ${fmtDuration(r.sec)}</span></div>
              <div class="activity-score ${cls}">${p}%</div>
            </div>`;
          }).join("")}</div>` : `
            <div class="empty">
              <div class="empty-icon">${icon("clock")}</div>
              <h3>Chưa có hoạt động nào</h3>
              <p>Hoàn thành một phiên luyện tập đầu tiên để bắt đầu theo dõi tiến độ của bạn.</p>
              <a class="btn btn-soft" href="#/practice">${icon("play")} Bắt đầu luyện tập</a>
            </div>`}
        </div>
      </div>`;
  }

  /* ---------------------------------------------------------------------- */
  /* Trang: Luyện tập & Thi thử (màn hình thiết lập)                        */
  /* ---------------------------------------------------------------------- */
  function topicOptions(selected) {
    return [`<option value="all"${selected === "all" ? " selected" : ""}>Tất cả chủ đề (${TOTAL} câu)</option>`]
      .concat(SECTIONS.map((s) => `<option value="${s.id}"${selected === s.id ? " selected" : ""}>${esc(s.name)} (${s.to - s.from + 1} câu)</option>`))
      .join("");
  }

  function practiceSetupHTML() {
    const st = computeStats();
    const current = draft.topic;
    const topicCount = current === "all" ? TOTAL : (SECTION_BY_ID[current] ? SECTION_BY_ID[current].to - SECTION_BY_ID[current].from + 1 : TOTAL);
    return `
      <div class="fade-in">
        <div class="page-head">
          <div><h2>Luyện tập theo chủ đề</h2><p>Chọn chủ đề, số câu và cách làm. Đáp án được hiển thị ngay sau mỗi câu để bạn ghi nhớ nhanh hơn.</p></div>
          <span class="badge badge-primary">${icon("layers")} ${TOTAL} câu hỏi</span>
        </div>
        <div class="setup-grid">
          <div class="card card-pad">
            <div class="card-head"><div><div class="card-title">Thiết lập phiên luyện</div><div class="card-sub">Bạn có thể thay đổi bất cứ lúc nào</div></div>${icon("target")}</div>
            <div class="field">
              <label class="field-label" for="cfgTopic">Chủ đề</label>
              <select class="select" id="cfgTopic">${topicOptions(current)}</select>
            </div>
            <div class="select-row mt-16">
              <div class="field">
                <label class="field-label" for="cfgCount">Số câu <span class="field-hint">(tối đa ${topicCount})</span></label>
                <select class="select" id="cfgCount">
                  <option value="10">10 câu</option>
                  <option value="20" selected>20 câu</option>
                  <option value="30">30 câu</option>
                  <option value="50">50 câu</option>
                  <option value="0">Tất cả ${topicCount} câu</option>
                </select>
              </div>
              <div class="field">
                <span class="field-label">Thứ tự câu hỏi</span>
                <div class="segmented" id="cfgOrder">
                  <button type="button" class="${draft.order === "random" ? "active" : ""}" data-action="set-order" data-order="random">Ngẫu nhiên</button>
                  <button type="button" class="${draft.order === "sequential" ? "active" : ""}" data-action="set-order" data-order="sequential">Theo thứ tự</button>
                </div>
              </div>
              <div class="field">
                <span class="field-label">Chế độ</span>
                <div class="segmented">
                  <button type="button" class="active" data-action="start-practice-mode" data-instant="1">Hiện đáp án</button>
                  <button type="button" data-action="start-practice-mode" data-instant="0">Làm nhanh</button>
                </div>
              </div>
            </div>
            <div class="setting-row mt-16">
              <div class="setting-info"><div class="setting-title">Phản hồi ngay</div><div class="setting-desc">Hiện đáp án đúng và giải thích ngay sau khi chọn. Tắt để làm liền mạch rồi xem kết quả cuối.</div></div>
              <label class="switch"><input type="checkbox" id="cfgInstant" ${store.settings.instant ? "checked" : ""}><span class="switch-track"></span></label>
            </div>
            <button class="btn btn-primary btn-lg btn-block mt-24" type="button" data-action="start-practice">${icon("play")} Bắt đầu luyện tập</button>
            <p class="muted" style="font-size:.72rem;text-align:center;margin-top:10px">Mẹo: dùng phím <span class="kbd">1</span>–<span class="kbd">4</span> để chọn đáp án, <span class="kbd">Enter</span> để sang câu tiếp.</p>
          </div>

          <div>
            <div class="card card-pad">
              <div class="card-title" style="margin-bottom:12px">Tình hình của bạn</div>
              <div class="mini-stats">
                <div><strong>${st.attempted}/${TOTAL}</strong><span>Câu đã làm</span></div>
                <div><strong>${st.attempts ? st.accuracy + "%" : "—"}</strong><span>Độ chính xác</span></div>
                <div><strong>${st.mastered}</strong><span>Đã thuộc</span></div>
              </div>
              <div class="divider"></div>
              <button class="btn btn-soft btn-block" type="button" data-action="quick" data-kind="wrong" ${st.needsReview ? "" : "disabled"}>${icon("refresh")} Ôn ${st.needsReview || 0} câu cần ôn</button>
              <button class="btn btn-ghost btn-block mt-8" type="button" data-action="quick" data-kind="starred" ${st.starred ? "" : "disabled"}>${icon("star")} Ôn ${st.starred || 0} câu đã đánh dấu</button>
            </div>
            <div class="card card-pad mt-16">
              <div class="card-title" style="margin-bottom:10px">${icon("sparkles")} Cách học hiệu quả</div>
              <ul class="info-list">
                <li class="info-item">${icon("check-circle")}<span>Trả lời thành thạo một chủ đề trước khi chuyển sang chủ đề mới.</span></li>
                <li class="info-item">${icon("check-circle")}<span>Đánh dấu <b>⭐</b> những câu khó để ôn lại bất cứ lúc nào.</span></li>
                <li class="info-item">${icon("check-circle")}<span>Dùng thi thử để kiểm tra kiến thức dưới áp lực thời gian.</span></li>
              </ul>
            </div>
          </div>
        </div>
      </div>`;
  }

  function examSetupHTML() {
    const st = computeStats();
    return `
      <div class="fade-in">
        <div class="page-head">
          <div><h2>Thi thử</h2><p>Mô phỏng bài thi thật: không hiện đáp án trong lúc làm, có đồng hồ đếm ngược và tự động nộp khi hết giờ.</p></div>
          <span class="badge badge-primary">${icon("clock")} Có tính giờ</span>
        </div>
        <div class="setup-grid">
          <div class="card card-pad">
            <div class="card-head"><div><div class="card-title">Thiết lập bài thi</div><div class="card-sub">Chọn phạm vi và thời gian</div></div>${icon("file")}</div>
            <div class="field">
              <label class="field-label" for="cfgExamTopic">Phạm vi</label>
              <select class="select" id="cfgExamTopic">${topicOptions("all")}</select>
            </div>
            <div class="select-row mt-16">
              <div class="field">
                <label class="field-label" for="cfgExamCount">Số câu</label>
                <select class="select" id="cfgExamCount">
                  <option value="20" selected>20 câu</option>
                  <option value="40">40 câu</option>
                  <option value="60">60 câu</option>
                  <option value="100">100 câu</option>
                  <option value="0">Tất cả ${TOTAL} câu</option>
                </select>
              </div>
              <div class="field">
                <label class="field-label" for="cfgExamTime">Thời gian</label>
                <select class="select" id="cfgExamTime">
                  <option value="0">Không giới hạn</option>
                  <option value="15">15 phút</option>
                  <option value="30" selected>30 phút</option>
                  <option value="45">45 phút</option>
                  <option value="60">60 phút</option>
                  <option value="90">90 phút</option>
                </select>
              </div>
              <div class="field">
                <label class="field-label" for="cfgExamPass">Điểm đạt</label>
                <select class="select" id="cfgExamPass">
                  <option value="70">70%</option>
                  <option value="80" selected>80%</option>
                  <option value="90">90%</option>
                </select>
              </div>
            </div>
            <div class="exam-note mt-24">
              ${icon("info")}
              <div><b>Lưu ý:</b> Bài thi được chấm điểm khi bạn nộp bài. Câu chưa trả lời được tính là sai. Kết quả và đáp án sẽ hiện sau khi nộp.</div>
            </div>
            <button class="btn btn-primary btn-lg btn-block mt-16" type="button" data-action="start-exam">${icon("play")} Bắt đầu thi</button>
          </div>
          <div>
            <div class="card card-pad">
              <div class="card-title" style="margin-bottom:12px">Kết quả học tập</div>
              <div class="mini-stats">
                <div><strong>${st.attempted}/${TOTAL}</strong><span>Câu đã làm</span></div>
                <div><strong>${st.attempts ? st.accuracy + "%" : "—"}</strong><span>Độ chính xác</span></div>
                <div><strong>${st.mastered}</strong><span>Đã thuộc</span></div>
              </div>
              <div class="divider"></div>
              <p class="muted" style="font-size:.78rem">Mỗi bài thi hoàn thành được lưu vào lịch sử để bạn so sánh tiến bộ theo thời gian.</p>
              <a class="btn btn-outline btn-block mt-16" href="#/stats">${icon("chart")} Xem thống kê</a>
            </div>
            <div class="card card-pad mt-16">
              <div class="card-title" style="margin-bottom:10px">${icon("info")} Quy tắc thi</div>
              <ul class="info-list">
                <li class="info-item">${icon("check")}<span>Không hiển thị đáp án trong khi làm bài.</span></li>
                <li class="info-item">${icon("check")}<span>Có thể quay lại và đổi đáp án trước khi nộp.</span></li>
                <li class="info-item">${icon("check")}<span>Đánh dấu <b>⚑</b> câu cần xem lại, dùng bảng điều hướng để nhảy nhanh.</span></li>
                <li class="info-item">${icon("check")}<span>Hết giờ hệ thống tự động nộp bài.</span></li>
              </ul>
            </div>
          </div>
        </div>
      </div>`;
  }

  /* ---------------------------------------------------------------------- */
  /* Trang: Thư viện câu hỏi                                                */
  /* ---------------------------------------------------------------------- */
  function filteredQuestions() {
    const term = normalize(libFilter.q.trim());
    return QUESTIONS.filter((q) => {
      if (libFilter.topic !== "all" && q.s !== libFilter.topic) return false;
      if (term) {
        const hay = normalize(q.q + " " + q.o.join(" ") + " " + sectionOf(q).name);
        if (!hay.includes(term)) return false;
      }
      const p = store.progress[q.id];
      if (libFilter.status === "starred") { if (!p || !p.star) return false; }
      else if (libFilter.status !== "all" && statusOf(q) !== libFilter.status) return false;
      return true;
    });
  }

  function libItemHTML(q) {
    const sec = sectionOf(q);
    const st = statusOf(q);
    const p = store.progress[q.id];
    const open = libOpen.has(q.id);
    const times = p && p.a ? `Đã làm ${p.a} lần · đúng ${p.c}` : "Chưa làm lần nào";
    return `<article class="lib-item${open ? " open" : ""}" data-lib="${q.id}">
      <div class="lib-top" data-action="toggle-lib" data-id="${q.id}">
        <span class="lib-num">${q.id}</span>
        <div class="lib-main">
          <div class="lib-meta">
            <span class="chip chip-sm"><span class="dotmark" style="background:${sec.color}"></span>${esc(sec.name)}</span>
            ${statusBadge(st)}
          </div>
          <div class="lib-q">${esc(q.q)}</div>
        </div>
        <div class="lib-actions">
          <button class="lib-toggle${p && p.star ? " starred" : ""}" type="button" data-action="star" data-id="${q.id}" aria-label="Đánh dấu câu hỏi" aria-pressed="${p && p.star ? "true" : "false"}">${icon("star")}</button>
          <button class="lib-toggle chev" type="button" data-action="toggle-lib" data-id="${q.id}" aria-label="Xem đáp án">${icon("chevron-down")}</button>
        </div>
      </div>
      <div class="lib-body">
        ${q.o.map((o, i) => `<div class="lib-opt${i === q.a ? " correct" : ""}"><span class="l">${LETTERS[i]}</span><span>${esc(o)}</span></div>`).join("")}
        <div class="lib-foot">
          <span class="lib-status"><span class="muted" style="font-size:.71rem">${times}${p && p.star ? " · ⭐ đã đánh dấu" : ""}</span></span>
          <button class="btn btn-soft btn-sm" type="button" data-action="lib-practice" data-id="${q.id}">${icon("play")} Luyện câu này</button>
        </div>
      </div>
    </article>`;
  }

  function libraryListHTML() {
    const list = filteredQuestions();
    if (!list.length) {
      return `<div class="card"><div class="empty">
        <div class="empty-icon">${icon("search")}</div>
        <h3>Không tìm thấy câu hỏi phù hợp</h3>
        <p>Thử từ khóa khác hoặc bỏ bộ lọc chủ đề / trạng thái.</p>
        <button class="btn btn-soft" type="button" data-action="clear-lib-filter">${icon("refresh")} Xóa bộ lọc</button>
      </div></div>`;
    }
    return list.map(libItemHTML).join("");
  }

  function libraryHTML() {
    return `
      <div class="fade-in">
        <div class="page-head">
          <div><h2>Thư viện câu hỏi</h2><p>Toàn bộ ${TOTAL} câu hỏi kèm đáp án đúng. Tìm kiếm, đánh dấu câu khó và luyện riêng những câu bạn muốn.</p></div>
          <a class="btn btn-primary" href="#/practice">${icon("play")} Luyện tập</a>
        </div>
        <div class="card lib-toolbar">
          <div class="lib-search">${icon("search")}<input class="input" id="libSearch" type="search" placeholder="Tìm câu hỏi, đáp án, chủ đề..." value="${esc(libFilter.q)}" aria-label="Tìm kiếm câu hỏi" autocomplete="off"></div>
          <select class="select" id="libTopic" aria-label="Lọc theo chủ đề"><option value="all">Tất cả chủ đề</option>${SECTIONS.map((s) => `<option value="${s.id}"${libFilter.topic === s.id ? " selected" : ""}>${esc(s.name)}</option>`).join("")}</select>
          <select class="select" id="libStatus" aria-label="Lọc theo trạng thái">
            <option value="all"${libFilter.status === "all" ? " selected" : ""}>Mọi trạng thái</option>
            <option value="unanswered"${libFilter.status === "unanswered" ? " selected" : ""}>Chưa làm</option>
            <option value="wrong"${libFilter.status === "wrong" ? " selected" : ""}>Cần ôn</option>
            <option value="learning"${libFilter.status === "learning" ? " selected" : ""}>Đang học</option>
            <option value="mastered"${libFilter.status === "mastered" ? " selected" : ""}>Đã thuộc</option>
            <option value="starred"${libFilter.status === "starred" ? " selected" : ""}>Đã đánh dấu ⭐</option>
          </select>
        </div>
        <div class="lib-count">
          <span id="libCount">Hiển thị ${filteredQuestions().length}/${TOTAL} câu</span>
          <div class="btn-row">
            <button class="btn btn-ghost btn-sm" type="button" data-action="lib-expand">${icon("chevron-down")} Mở rộng tất cả</button>
            <button class="btn btn-soft btn-sm" type="button" data-action="practice-filtered">${icon("play")} Luyện các câu đang xem</button>
          </div>
        </div>
        <div class="lib-list" id="libList">${libraryListHTML()}</div>
      </div>`;
  }

  /* ---------------------------------------------------------------------- */
  /* Làm bài: giao diện câu hỏi                                             */
  /* ---------------------------------------------------------------------- */
  function optionsHTML(q, selected, reveal, action) {
    return q.o.map((opt, i) => {
      let cls = "option";
      let extra = "";
      const isSel = selected === i;
      if (reveal) {
        if (i === q.a) { cls += " correct"; extra = `<span class="opt-icon">${icon("check-circle")}</span>`; }
        else if (isSel) { cls += " wrong"; extra = `<span class="opt-icon">${icon("close")}</span>`; }
        else cls += " dim";
      } else if (isSel) cls += " selected";
      return `<button type="button" class="${cls}" data-action="${action}" data-opt="${i}"${reveal ? " disabled" : ""} aria-pressed="${isSel}">
        <span class="option-letter">${LETTERS[i]}</span>
        <span class="option-text">${esc(opt)}</span>
        ${extra}
      </button>`;
    }).join("");
  }

  function feedbackHTML(q, selected) {
    const ok = selected === q.a;
    return `<div class="feedback ${ok ? "ok" : "bad"}">
      <div class="feedback-title">${icon(ok ? "check-circle" : "alert")} ${ok ? "Chính xác!" : "Chưa đúng rồi"}</div>
      <div class="feedback-answer">Đáp án đúng: <strong>${LETTERS[q.a]}. ${esc(q.o[q.a])}</strong></div>
      ${ok ? "" : `<div class="feedback-note">Ghi nhớ đáp án này và thử lại ở chế độ ôn câu sai nhé.</div>`}
    </div>`;
  }

  function practiceQuizHTML() {
    const q = Q_BY_ID.get(S.ids[S.index]);
    const sec = sectionOf(q);
    const selected = S.answers[q.id];
    const answered = selected !== undefined;
    const isLast = S.index === S.ids.length - 1;
    const p = store.progress[q.id];
    const progress = Math.round(((S.index + (answered ? 1 : 0)) / S.ids.length) * 100);
    return `<div class="quiz fade-in">
      <div class="quiz-top">
        <div class="quiz-meta">
          <span class="quiz-count">Câu ${S.index + 1}/${S.ids.length}</span>
          <span class="chip chip-sm"><span class="dotmark" style="background:${sec.color}"></span>${esc(sec.name)}</span>
        </div>
        <div class="quiz-toolbar">
          <button class="icon-btn${p && p.star ? " starred-btn" : ""}" type="button" data-action="star" data-id="${q.id}" aria-label="Đánh dấu câu hỏi" title="Đánh dấu">${icon("star")}</button>
          <button class="btn btn-ghost btn-sm" type="button" data-action="quit">${icon("close")} Thoát</button>
        </div>
      </div>
      <div class="quiz-progress"><div class="bar"><i style="width:${progress}%"></i></div></div>
      <div class="card quiz-card">
        <div class="q-topline">
          <span class="q-topic"><span class="dotmark" style="background:${sec.color}"></span>${esc(sec.name)}</span>
          <span class="q-index">${S.instant ? "Phản hồi ngay" : "Làm nhanh"}</span>
        </div>
        <div class="q-text">${esc(q.q)}</div>
        <div class="options" id="optionBox">${optionsHTML(q, selected, answered && S.instant, "answer")}</div>
        <div id="feedbackSlot">${answered && S.instant ? feedbackHTML(q, selected) : ""}</div>
        <div class="quiz-actions">
          <div class="kbd-hint"><span class="kbd">1</span>–<span class="kbd">4</span> chọn · <span class="kbd">Enter</span> tiếp</div>
          <div class="quiz-actions-right">
            ${answered && !S.instant ? `<span class="badge badge-muted">Đã chọn ${LETTERS[selected]}</span>` : ""}
            <button class="btn btn-primary" type="button" data-action="next-practice" ${answered ? "" : "disabled"}>${isLast ? "Xem kết quả" : "Câu tiếp"} ${icon("arrow-right")}</button>
          </div>
        </div>
      </div>
    </div>`;
  }

  function examQuizHTML() {
    const q = Q_BY_ID.get(S.ids[S.index]);
    const sec = sectionOf(q);
    const selected = S.answers[q.id];
    const isLast = S.index === S.ids.length - 1;
    const answeredCount = Object.keys(S.answers).length;
    const flagged = S.flags.has(q.id);
    const progress = Math.round(((S.index + 1) / S.ids.length) * 100);
    return `<div class="quiz fade-in">
      <div class="quiz-top">
        <div class="quiz-meta">
          <span class="quiz-count">Câu ${S.index + 1}/${S.ids.length}</span>
          <span class="chip chip-sm">${icon("check")} ${answeredCount} đã trả lời</span>
          <span class="chip chip-sm timer-chip" id="timerChip">${icon("clock")}<span id="timerDisplay">--:--</span></span>
        </div>
        <div class="quiz-toolbar">
          <button class="icon-btn${flagged ? " flagged-btn" : ""}" type="button" data-action="flag" data-id="${q.id}" aria-label="Đánh dấu câu này" title="Đánh dấu xem lại">${icon("flag")}</button>
          <button class="icon-btn" type="button" data-action="open-nav" aria-label="Bảng điều hướng câu hỏi" title="Bảng câu hỏi">${icon("grid")}</button>
          <button class="btn btn-ghost btn-sm" type="button" data-action="quit">${icon("close")} Thoát</button>
        </div>
      </div>
      <div class="quiz-progress"><div class="bar"><i style="width:${progress}%"></i></div></div>
      <div class="card quiz-card">
        <div class="q-topline">
          <span class="q-topic"><span class="dotmark" style="background:${sec.color}"></span>${esc(sec.name)}</span>
          <span class="q-index">${S.timeLimit ? "Thi có tính giờ" : "Không giới hạn"}</span>
        </div>
        <div class="q-text">${esc(q.q)}</div>
        <div class="options" id="optionBox">${optionsHTML(q, selected, false, "exam-answer")}</div>
        <div class="quiz-actions">
          <button class="btn btn-outline" type="button" data-action="exam-prev" ${S.index === 0 ? "disabled" : ""}>${icon("arrow-left")} Trước</button>
          <div class="quiz-actions-right">
            <div class="kbd-hint"><span class="kbd">1</span>–<span class="kbd">4</span> chọn · <span class="kbd">←</span><span class="kbd">→</span> chuyển câu</div>
            ${isLast
              ? `<button class="btn btn-primary" type="button" data-action="submit-exam">${icon("check")} Nộp bài</button>`
              : `<button class="btn btn-primary" type="button" data-action="exam-next">Câu tiếp ${icon("arrow-right")}</button>`}
          </div>
        </div>
        <div style="text-align:center;margin-top:16px"><button class="btn btn-ghost btn-sm" type="button" data-action="submit-exam">Nộp bài sớm</button></div>
      </div>
    </div>`;
  }

  /* ---------------------------------------------------------------------- */
  /* Kết quả & xem lại bài                                                  */
  /* ---------------------------------------------------------------------- */
  function reviewHTML() {
    const rows = S.ids.map((id, idx) => {
      const q = Q_BY_ID.get(id);
      const sel = S.answers[id];
      const ok = sel === q.a;
      const blank = sel === undefined;
      return `<div class="review-item${ok ? " ok" : ""}" data-review="${id}">
        <div class="review-head" data-action="review-toggle" data-id="${id}">
          <span class="review-num ${ok ? "ok" : "bad"}">${idx + 1}</span>
          <div class="review-q">${esc(q.q)}</div>
          <span class="badge ${ok ? "badge-success" : blank ? "badge-muted" : "badge-danger"}">${ok ? "Đúng" : blank ? "Bỏ trống" : "Sai"}</span>
          <span class="review-chev">${icon("chevron-down")}</span>
        </div>
        <div class="review-body">
          ${q.o.map((o, i) => `<div class="opt-line${i === q.a ? " correct" : i === sel ? " wrong" : ""}">${LETTERS[i]}. ${esc(o)}${i === q.a ? " ✓" : i === sel ? " (bạn chọn)" : ""}</div>`).join("")}
          <div class="review-answer-line"><b>Đáp án đúng:</b> ${LETTERS[q.a]}. ${esc(q.o[q.a])}</div>
        </div>
      </div>`;
    }).join("");
    return `<div class="review-list" id="reviewList">${rows}</div>`;
  }

  function resultHTML() {
    const r = S.result;
    const modeLabel = S.mode === "exam" ? "bài thi" : "phiên luyện";
    const pass = S.mode === "exam" ? r.percent >= r.pass : null;
    const emoji = r.percent >= 90 ? "🏆" : r.percent >= 80 ? "🎉" : r.percent >= 60 ? "👍" : "📚";
    const title = S.mode === "exam"
      ? (pass ? "Chúc mừng, bạn đã đạt!" : "Cần ôn thêm một chút!")
      : (r.percent >= 80 ? "Làm tốt lắm!" : r.percent >= 60 ? "Khá ổn, tiếp tục nào!" : "Đừng lo, ôn lại sẽ tốt hơn!");
    const wrongCount = S.ids.filter((id) => S.answers[id] !== undefined && S.answers[id] !== Q_BY_ID.get(id).a).length;
    return `<div class="result-wrap fade-in">
      <div class="card result-hero">
        <div class="result-emoji">${emoji}</div>
        <h2>${title}</h2>
        <p>Bạn đã hoàn thành ${modeLabel} với ${r.total} câu hỏi.</p>
        <div class="big-score"><strong>${r.correct}</strong><span>/ ${r.total} câu đúng</span></div>
        <div class="result-sub">${r.percent}% · ${r.percent >= 80 ? "Rất tốt" : r.percent >= 60 ? "Cần cố gắng thêm" : "Hãy ôn lại nhé"}${S.mode === "exam" ? ` · ${pass ? "ĐẠT" : "CHƯA ĐẠT"} (mức ${r.pass}%)` : ""}</div>
        <div class="result-stats">
          <div class="result-stat"><strong class="muted">${r.total}</strong><span>Tổng câu</span></div>
          <div class="result-stat"><strong style="color:var(--success)">${r.correct}</strong><span>Đúng</span></div>
          <div class="result-stat"><strong style="color:var(--danger)">${r.wrong + r.blank}</strong><span>Sai / bỏ trống</span></div>
          <div class="result-stat"><strong>${fmtClock(r.sec)}</strong><span>Thời gian</span></div>
        </div>
        <div class="result-actions">
          <button class="btn btn-primary" type="button" data-action="retry-session">${icon("refresh")} Làm lại</button>
          ${wrongCount ? `<button class="btn btn-soft" type="button" data-action="retry-wrong">${icon("target")} Ôn ${wrongCount} câu sai</button>` : ""}
          <a class="btn btn-outline" href="#/dashboard">${icon("grid")} Tổng quan</a>
        </div>
      </div>
      <div class="section-head">
        <h3 class="section-title">${icon("file")} Xem lại bài làm</h3>
        <button class="btn btn-ghost btn-sm" type="button" data-action="toggle-review-wrong">${icon("eye")} Chỉ câu sai</button>
      </div>
      ${reviewHTML()}
    </div>`;
  }

  /* ---------------------------------------------------------------------- */
  /* Flashcard                                                              */
  /* ---------------------------------------------------------------------- */
  function flashSetupHTML() {
    return `<div class="fade-in">
      <div class="page-head">
        <div><h2>Flashcard</h2><p>Ghi nhớ chủ động bằng cách tự trả lời trước khi lật thẻ. Đánh dấu “đã nhớ” hoặc “chưa nhớ” để hệ thống ghi nhận tiến độ.</p></div>
        <span class="badge badge-primary">${icon("cards")} ${TOTAL} thẻ</span>
      </div>
      <div class="setup-grid">
        <div class="card card-pad">
          <div class="card-head"><div><div class="card-title">Bắt đầu ôn thẻ</div><div class="card-sub">Chọn chủ đề và số lượng thẻ</div></div>${icon("brain")}</div>
          <div class="field">
            <label class="field-label" for="cfgFlashTopic">Chủ đề</label>
            <select class="select" id="cfgFlashTopic">${topicOptions("all")}</select>
          </div>
          <div class="select-row mt-16">
            <div class="field">
              <label class="field-label" for="cfgFlashCount">Số thẻ</label>
              <select class="select" id="cfgFlashCount">
                <option value="10">10 thẻ</option>
                <option value="20" selected>20 thẻ</option>
                <option value="30">30 thẻ</option>
                <option value="0">Tất cả</option>
              </select>
            </div>
            <div class="field" style="grid-column:span 2">
              <span class="field-label">Cách ôn</span>
              <div class="exam-note" style="margin:0">${icon("info")}<div>Nhấn vào thẻ hoặc phím <span class="kbd">Space</span> để lật. Tự đánh giá trước khi xem đáp án sẽ giúp ghi nhớ lâu hơn.</div></div>
            </div>
          </div>
          <button class="btn btn-primary btn-lg btn-block mt-24" type="button" data-action="start-flash">${icon("play")} Bắt đầu ôn thẻ</button>
        </div>
        <div class="card card-pad">
          <div class="card-title" style="margin-bottom:12px">${icon("sparkles")} Mẹo dùng flashcard</div>
          <ul class="info-list">
            <li class="info-item">${icon("check-circle")}<span>Đọc câu hỏi, tự trả lời trong đầu rồi mới lật thẻ.</span></li>
            <li class="info-item">${icon("check-circle")}<span>Nếu sai, hãy đọc to đáp án đúng một lần.</span></li>
            <li class="info-item">${icon("check-circle")}<span>Lặp lại các thẻ “chưa nhớ” vào ngày hôm sau.</span></li>
            <li class="info-item">${icon("check-circle")}<span>Kết hợp flashcard với thi thử để kiểm tra kiến thức.</span></li>
          </ul>
        </div>
      </div>
    </div>`;
  }

  function flashCardHTML() {
    const q = Q_BY_ID.get(S.ids[S.index]);
    const sec = sectionOf(q);
    const total = S.ids.length;
    const dots = S.ids.slice(0, 60).map((id, i) => `<span class="flash-dot${S.ratings[id] !== undefined ? " done" : ""}${i === S.index ? " current" : ""}"></span>`).join("");
    return `<div class="flash-wrap fade-in">
      <div class="quiz-top">
        <div class="quiz-meta">
          <span class="quiz-count">Thẻ ${S.index + 1}/${total}</span>
          <span class="chip chip-sm"><span class="dotmark" style="background:${sec.color}"></span>${esc(sec.name)}</span>
        </div>
        <button class="btn btn-ghost btn-sm" type="button" data-action="quit">${icon("close")} Thoát</button>
      </div>
      <div class="flash-counter"><div class="flash-dots">${dots}</div><span>${Object.values(S.ratings).filter((v) => v === 1).length} đã nhớ</span></div>
      <div class="bar" style="margin-bottom:16px"><i style="width:${Math.round((S.index / total) * 100)}%"></i></div>
      <div class="flash-stage">
        <div class="flash-card${S.revealed ? " flipped" : ""}" data-action="flash-flip" role="button" tabindex="0" aria-label="Lật thẻ">
          <div class="flash-face">
            <div class="flash-label">${icon("brain")} Câu hỏi</div>
            <div class="flash-q">${esc(q.q)}</div>
            <div class="flash-hint">${icon("refresh")} Nhấn để xem đáp án</div>
          </div>
          <div class="flash-face back">
            <div class="flash-label">${icon("check-circle")} Đáp án đúng</div>
            <div class="flash-a"><span class="letter">${LETTERS[q.a]}</span>${esc(q.o[q.a])}</div>
            <div class="flash-sub">Các lựa chọn khác:</div>
            <div>${q.o.map((o, i) => i === q.a ? "" : `<div class="lib-opt"><span class="l">${LETTERS[i]}</span><span>${esc(o)}</span></div>`).join("")}</div>
          </div>
        </div>
      </div>
      <div class="flash-controls">
        ${S.revealed
          ? `<button class="btn btn-outline" type="button" data-action="flash-rate" data-rate="0">${icon("refresh")} Chưa nhớ</button>
             <button class="btn btn-primary" type="button" data-action="flash-rate" data-rate="1">${icon("check")} Đã nhớ</button>`
          : `<button class="btn btn-primary btn-lg" type="button" data-action="flash-flip">${icon("eye")} Lật thẻ</button>`}
      </div>
      <p class="center muted" style="font-size:.72rem;margin-top:14px">Phím <span class="kbd">Space</span> lật thẻ · <span class="kbd">1</span> chưa nhớ · <span class="kbd">2</span> đã nhớ</p>
    </div>`;
  }

  function flashResultHTML() {
    const r = S.result;
    const p = r.percent;
    return `<div class="result-wrap fade-in">
      <div class="card result-hero">
        <div class="result-emoji">${p >= 80 ? "🧠" : p >= 50 ? "💪" : "🌱"}</div>
        <h2>${p >= 80 ? "Trí nhớ tốt đấy!" : p >= 50 ? "Đang tiến bộ!" : "Ôn thêm một vòng nhé!"}</h2>
        <p>Bạn đã nhớ ${r.correct}/${r.total} thẻ trong phiên này.</p>
        <div class="big-score"><strong>${p}%</strong><span>thẻ đã nhớ</span></div>
        <div class="result-stats">
          <div class="result-stat"><strong>${r.total}</strong><span>Tổng thẻ</span></div>
          <div class="result-stat"><strong style="color:var(--success)">${r.correct}</strong><span>Đã nhớ</span></div>
          <div class="result-stat"><strong style="color:var(--danger)">${r.total - r.correct}</strong><span>Chưa nhớ</span></div>
          <div class="result-stat"><strong>${fmtClock(r.sec)}</strong><span>Thời gian</span></div>
        </div>
        <div class="result-actions">
          ${r.total - r.correct ? `<button class="btn btn-primary" type="button" data-action="flash-retry-wrong">${icon("refresh")} Ôn ${r.total - r.correct} thẻ chưa nhớ</button>` : ""}
          <button class="btn btn-outline" type="button" data-action="flash-new">${icon("cards")} Phiên mới</button>
          <a class="btn btn-ghost" href="#/dashboard">${icon("grid")} Tổng quan</a>
        </div>
      </div>
    </div>`;
  }

  /* ---------------------------------------------------------------------- */
  /* Trang: Thống kê                                                        */
  /* ---------------------------------------------------------------------- */
  function heatmapHTML() {
    const days = [];
    for (let i = 34; i >= 0; i--) {
      const d = new Date();
      d.setDate(d.getDate() - i);
      const k = dayKey(d);
      const rec = store.daily[k];
      const count = rec ? rec.a : 0;
      const level = count === 0 ? 0 : count <= 5 ? 1 : count <= 12 ? 2 : count <= 25 ? 3 : 4;
      days.push(`<span class="heat-cell" data-level="${level}" title="${d.toLocaleDateString("vi-VN")}: ${count} câu"></span>`);
    }
    return `<div class="heatmap-wrap"><div class="heatmap">${days.join("")}</div></div>
      <div class="heat-legend"><span>Ít</span><span class="heat-cell" data-level="1"></span><span class="heat-cell" data-level="2"></span><span class="heat-cell" data-level="3"></span><span class="heat-cell" data-level="4"></span><span>Nhiều</span></div>`;
  }

  function statsHTML() {
    const st = computeStats();
    const secs = sectionProgress();
    const totalSec = Object.values(store.daily).reduce((a, d) => a + (d.sec || 0), 0);
    const history = store.sessions.slice(0, 12);
    return `<div class="fade-in">
      <div class="page-head">
        <div><h2>Thống kê của bạn</h2><p>Nhìn lại hành trình ôn tập: độ chính xác, chủ đề mạnh/yếu và thói quen học hằng ngày.</p></div>
        <a class="btn btn-outline" href="#/settings">${icon("settings")} Cài đặt dữ liệu</a>
      </div>
      <div class="stats-grid stagger" style="margin-top:0">
        <div class="card stat-card"><div class="stat-icon">${icon("layers")}</div><div><div class="stat-value">${st.attempts}</div><div class="stat-label">Tổng lượt trả lời</div><div class="sub">${st.attempted}/${TOTAL} câu đã chạm</div></div></div>
        <div class="card stat-card"><div class="stat-icon green">${icon("target")}</div><div><div class="stat-value">${st.attempts ? st.accuracy + "%" : "—"}</div><div class="stat-label">Độ chính xác</div><div class="sub">${st.correct} lượt đúng</div></div></div>
        <div class="card stat-card"><div class="stat-icon amber">${icon("check-circle")}</div><div><div class="stat-value">${st.mastered}</div><div class="stat-label">Câu đã thuộc</div><div class="sub">${pct(st.mastered, TOTAL)}% tổng câu hỏi</div></div></div>
        <div class="card stat-card"><div class="stat-icon red">${icon("flame")}</div><div><div class="stat-value">${st.streak}</div><div class="stat-label">Chuỗi ngày học</div><div class="sub">${fmtDuration(totalSec)} đã học</div></div></div>
      </div>

      <div class="chart-grid">
        <div class="card card-pad">
          <div class="card-head"><div><div class="card-title">Hiệu suất theo chủ đề</div><div class="card-sub">Tỷ lệ trả lời đúng (chỉ tính câu đã làm)</div></div></div>
          <div>${secs.map((s) => `<div class="topic-bar-row">
            <div class="topic-bar-label"><span class="topic-dot" style="background:${s.color}"></span><span>${esc(s.name)}</span></div>
            <div class="topic-bar-track"><div class="bar"><i style="width:${s.accuracy}%"></i></div><span class="topic-bar-pct">${s.attempts ? s.accuracy + "%" : "—"}</span></div>
          </div>`).join("")}</div>
        </div>
        <div class="card card-pad">
          <div class="card-head"><div><div class="card-title">Hoạt động 5 tuần</div><div class="card-sub">Số câu trả lời mỗi ngày</div></div><span class="badge badge-muted">${st.streak} ngày liên tiếp</span></div>
          ${heatmapHTML()}
          <div class="divider"></div>
          <div class="mini-stats">
            <div><strong>${st.attempted}</strong><span>Đã chạm</span></div>
            <div><strong>${st.mastered}</strong><span>Đã thuộc</span></div>
            <div><strong>${st.needsReview}</strong><span>Cần ôn</span></div>
          </div>
        </div>
      </div>

      <div class="section-head"><h3 class="section-title">${icon("clock")} Lịch sử bài làm</h3><span class="muted" style="font-size:.75rem">${store.sessions.length} phiên đã lưu</span></div>
      <div class="card card-pad">
        ${history.length ? `<div style="overflow-x:auto"><table class="history-table">
          <thead><tr><th>Thời gian</th><th>Chế độ</th><th>Kết quả</th><th>Điểm</th><th>Thời lượng</th></tr></thead>
          <tbody>${history.map((h) => {
            const p = pct(h.correct, h.total);
            const cls = p >= 80 ? "good" : p >= 60 ? "mid" : "bad";
            return `<tr><td>${fmtWhen(h.t)}</td><td>${h.mode === "exam" ? "Thi thử" : h.mode === "flash" ? "Flashcard" : "Luyện tập"}</td><td>${h.correct}/${h.total} câu</td><td class="history-score ${cls}">${p}%</td><td>${fmtDuration(h.sec)}</td></tr>`;
          }).join("")}</tbody>
        </table></div>` : `<div class="empty"><div class="empty-icon">${icon("chart")}</div><h3>Chưa có dữ liệu</h3><p>Hoàn thành một phiên luyện tập hoặc thi thử để xem thống kê tại đây.</p><a class="btn btn-primary" href="#/practice">${icon("play")} Luyện tập ngay</a></div>`}
      </div>
    </div>`;
  }

  /* ---------------------------------------------------------------------- */
  /* Trang: Cài đặt                                                         */
  /* ---------------------------------------------------------------------- */
  function themeOption(value, label, colors) {
    const active = store.settings.theme === value;
    return `<button class="theme-option${active ? " active" : ""}" type="button" data-action="set-theme" data-theme="${value}">
      <span class="theme-preview"><i class="tp-side" style="background:${colors[0]}"></i><i style="flex:1;background:${colors[1]}"></i></span>
      <span>${label}</span>
    </button>`;
  }

  function settingsHTML() {
    const st = computeStats();
    return `<div class="fade-in">
      <div class="page-head">
        <div><h2>Cài đặt</h2><p>Tùy chỉnh giao diện, cách học và quản lý dữ liệu tiến độ được lưu trên thiết bị.</p></div>
      </div>
      <div class="settings-grid">
        <div class="card card-pad">
          <div class="card-head"><div><div class="card-title">${icon("eye")} Giao diện</div><div class="card-sub">Giao diện sáng/tối và cỡ chữ</div></div></div>
          <div class="theme-picker">
            ${themeOption("system", "Theo hệ thống", ["#334155", "linear-gradient(135deg,#e2e8f5 50%,#1e293b 50%)"])}
            ${themeOption("light", "Sáng", ["#e2e8f5", "#ffffff"])}
            ${themeOption("dark", "Tối", ["#1e293b", "#0b1120"])}
          </div>
          <div class="setting-row mt-16">
            <div class="setting-info"><div class="setting-title">Cỡ chữ</div><div class="setting-desc">Áp dụng cho toàn bộ nội dung</div></div>
            <div class="segmented">
              <button type="button" class="${store.settings.font === "sm" ? "active" : ""}" data-action="set-font" data-font="sm">Nhỏ</button>
              <button type="button" class="${store.settings.font === "md" ? "active" : ""}" data-action="set-font" data-font="md">Vừa</button>
              <button type="button" class="${store.settings.font === "lg" ? "active" : ""}" data-action="set-font" data-font="lg">Lớn</button>
            </div>
          </div>
        </div>

        <div class="card card-pad">
          <div class="card-head"><div><div class="card-title">${icon("target")} Học tập</div><div class="card-sub">Tùy chỉnh trải nghiệm làm bài</div></div></div>
          <div class="setting-row">
            <div class="setting-info"><div class="setting-title">Xáo trộn đáp án</div><div class="setting-desc">Đảo thứ tự các lựa chọn để tránh học thuộc vị trí đáp án.</div></div>
            <label class="switch"><input type="checkbox" data-setting="shuffle" ${store.settings.shuffle ? "checked" : ""}><span class="switch-track"></span></label>
          </div>
          <div class="setting-row">
            <div class="setting-info"><div class="setting-title">Phản hồi ngay</div><div class="setting-desc">Mặc định hiện đáp án đúng ngay sau khi chọn trong chế độ luyện tập.</div></div>
            <label class="switch"><input type="checkbox" data-setting="instant" ${store.settings.instant ? "checked" : ""}><span class="switch-track"></span></label>
          </div>
          <div class="setting-row">
            <div class="setting-info"><div class="setting-title">Tự chuyển câu</div><div class="setting-desc">Tự động sang câu tiếp theo sau khi trả lời đúng.</div></div>
            <label class="switch"><input type="checkbox" data-setting="autoNext" ${store.settings.autoNext ? "checked" : ""}><span class="switch-track"></span></label>
          </div>
          <div class="setting-row">
            <div class="setting-info"><div class="setting-title">Điểm đạt bài thi</div><div class="setting-desc">Ngưỡng phần trăm để được coi là đạt.</div></div>
            <select class="select" style="width:110px" data-setting="pass">
              <option value="70"${store.settings.pass === 70 ? " selected" : ""}>70%</option>
              <option value="80"${store.settings.pass === 80 ? " selected" : ""}>80%</option>
              <option value="90"${store.settings.pass === 90 ? " selected" : ""}>90%</option>
            </select>
          </div>
        </div>

        <div class="card card-pad">
          <div class="card-head"><div><div class="card-title">${icon("download")} Dữ liệu học tập</div><div class="card-sub">${st.attempted}/${TOTAL} câu đã làm · ${store.sessions.length} phiên đã lưu</div></div></div>
          <p class="muted" style="font-size:.78rem;margin-bottom:14px">Tiến độ được lưu trong trình duyệt trên thiết bị này. Xuất tệp JSON để sao lưu hoặc chuyển sang thiết bị khác.</p>
          <div class="btn-row">
            <button class="btn btn-outline" type="button" data-action="export-data">${icon("download")} Xuất tiến độ</button>
            <button class="btn btn-outline" type="button" data-action="import-data">${icon("upload")} Nhập tiến độ</button>
            <input type="file" id="importFile" accept="application/json,.json" hidden />
          </div>
          <div class="divider"></div>
          <div class="setting-row">
            <div class="setting-info"><div class="setting-title" style="color:var(--danger)">Đặt lại toàn bộ tiến độ</div><div class="setting-desc">Xóa lịch sử làm bài, câu đánh dấu và thống kê. Không thể hoàn tác.</div></div>
            <button class="btn btn-danger btn-sm" type="button" data-action="reset-data">${icon("trash")} Đặt lại</button>
          </div>
        </div>

        <div class="card card-pad">
          <div class="card-head"><div><div class="card-title">${icon("info")} Giới thiệu</div><div class="card-sub">Phiên bản 1.0</div></div></div>
          <div class="about-list">
            <div class="about-row"><span>Ngân hàng câu hỏi</span><span>${TOTAL} câu · ${SECTIONS.length} chủ đề</span></div>
            <div class="about-row"><span>Nguồn tài liệu</span><span>Tổng hợp câu hỏi (26.10.22)</span></div>
            <div class="about-row"><span>Hoạt động offline</span><span>${icon("check")} Có (sau lần tải đầu)</span></div>
            <div class="about-row"><span>Lưu trữ</span><span>Cục bộ trên thiết bị</span></div>
          </div>
          <p class="muted" style="font-size:.72rem;margin-top:14px">Đáp án được giữ đúng theo tài liệu gốc. Nếu phát hiện sai sót, hãy đối chiếu lại với tài liệu ôn tập.</p>
        </div>
      </div>
    </div>`;
  }

  /* ---------------------------------------------------------------------- */
  /* Hướng dẫn lần đầu                                                      */
  /* ---------------------------------------------------------------------- */
  function maybeShowWelcome() {
    if (store.seenWelcome) return;
    setTimeout(() => {
      if (store.seenWelcome) return;
      openModal({
        title: "Chào mừng đến NetSec Study 👋",
        desc: `${TOTAL} câu hỏi An ninh mạng, ${SECTIONS.length} chủ đề, sẵn sàng cho bạn ôn tập.`,
        wide: true,
        body: `<div class="welcome-grid">
          <div class="info-item">${icon("target")}<div><b>Luyện tập</b><span>Chọn chủ đề, nhận phản hồi ngay sau mỗi câu.</span></div></div>
          <div class="info-item">${icon("file")}<div><b>Thi thử</b><span>Có đồng hồ, chấm điểm và xếp loại đạt/chưa đạt.</span></div></div>
          <div class="info-item">${icon("cards")}<div><b>Flashcard</b><span>Lật thẻ để ghi nhớ chủ động, đánh dấu đã nhớ.</span></div></div>
          <div class="info-item">${icon("chart")}<div><b>Thống kê</b><span>Theo dõi độ chính xác, chuỗi ngày và chủ đề yếu.</span></div></div>
        </div>
        <p class="muted" style="font-size:.76rem;margin-top:16px">Tiến độ tự động lưu trên thiết bị. Bạn có thể dùng phím 1–4 để chọn đáp án nhanh.</p>`,
        okText: "Bắt đầu ôn tập",
        hideCancel: true,
        onOk: () => { store.seenWelcome = true; saveStore(); },
      });
    }, 700);
  }

  /* ---------------------------------------------------------------------- */
  /* Phiên làm bài                                                          */
  /* ---------------------------------------------------------------------- */
  function orderFor(q) {
    return S && S.orders && S.orders[q.id] ? S.orders[q.id] : [0, 1, 2, 3];
  }

  function letterFor(q, original) {
    const pos = orderFor(q).indexOf(original);
    return LETTERS[pos >= 0 ? pos : 0];
  }

  function buildOrders(ids) {
    const orders = {};
    ids.forEach((id) => {
      orders[id] = store.settings.shuffle ? shuffle([0, 1, 2, 3]) : [0, 1, 2, 3];
    });
    return orders;
  }

  function startSession(mode, opts) {
    stopConfetti();
    const o = opts || {};
    if (S && !S.done && !S.timeLogged) {
      addStudyTime((Date.now() - S.startAt) / 1000);
      S.timeLogged = true;
    }
    let pool = o.ids
      ? o.ids.map((id) => Q_BY_ID.get(id)).filter(Boolean)
      : poolFor(o.topic || "all");
    if (o.order !== "keep") pool = shuffle(pool);
    const count = o.count && o.count > 0 ? Math.min(o.count, pool.length) : pool.length;
    const ids = pool.slice(0, count).map((q) => q.id);
    if (!ids.length) { toast("Không có câu hỏi phù hợp để bắt đầu.", "warn"); return; }
    const cfg = {
      topic: o.topic || "all",
      count: o.count || 0,
      order: o.order || "random",
      instant: o.instant !== false,
      timeLimit: o.timeLimit || 0,
      pass: o.pass || store.settings.pass,
      ids: o.ids ? o.ids.slice() : null,
      source: o.source || "setup",
    };
    S = {
      mode,
      ids,
      index: 0,
      answers: {},
      flags: new Set(),
      orders: buildOrders(ids),
      startAt: Date.now(),
      timeLimit: mode === "exam" ? (o.timeLimit || 0) : 0,
      config: cfg,
      instant: o.instant !== false,
      done: false,
      timeLogged: false,
      revealed: false,
      ratings: {},
      result: null,
    };
    if (mode === "exam") startTick(); else stopTick();
    const target = mode === "flash" ? "flashcards" : mode;
    if (route !== target) location.hash = "#/" + target;
    else render(true);
  }

  function startTick() {
    stopTick();
    tickHandle = setInterval(updateTimer, 1000);
    updateTimer();
  }

  function stopTick() {
    if (tickHandle) { clearInterval(tickHandle); tickHandle = null; }
  }

  function updateTimer() {
    if (!S || S.done || S.mode !== "exam") return;
    const elapsed = Math.floor((Date.now() - S.startAt) / 1000);
    const remaining = S.timeLimit ? Math.max(0, S.timeLimit - elapsed) : elapsed;
    const el = $("#timerDisplay");
    if (el) el.textContent = fmtClock(remaining);
    const chip = $("#timerChip");
    if (chip) chip.classList.toggle("timer-warn", !!S.timeLimit && remaining <= 60);
    if (S.timeLimit && remaining <= 0) {
      stopTick();
      toast("Hết giờ! Bài thi đã được nộp tự động.", "warn");
      finishSession(true);
    }
  }

  function answerPractice(originalIndex) {
    if (!S || S.done) return;
    const q = Q_BY_ID.get(S.ids[S.index]);
    if (S.answers[q.id] !== undefined) return;
    S.answers[q.id] = originalIndex;
    const correct = originalIndex === q.a;
    recordAnswer(q.id, correct);
    render(false);
    if (correct && store.settings.autoNext && S.index < S.ids.length - 1) {
      const from = S.index;
      setTimeout(() => {
        if (S && !S.done && S.index === from && S.answers[q.id] !== undefined && S.index < S.ids.length - 1) {
          S.index += 1;
          render(true);
        }
      }, 850);
    }
  }

  function answerExam(originalIndex) {
    if (!S || S.done) return;
    const q = Q_BY_ID.get(S.ids[S.index]);
    S.answers[q.id] = originalIndex;
    render(false);
  }

  function nextPractice() {
    if (!S || S.done) return;
    const q = Q_BY_ID.get(S.ids[S.index]);
    if (S.answers[q.id] === undefined) return;
    if (S.index >= S.ids.length - 1) finishSession(false);
    else { S.index += 1; render(true); }
  }

  function moveExam(delta) {
    if (!S || S.done) return;
    const next = S.index + delta;
    if (next < 0 || next >= S.ids.length) return;
    S.index = next;
    render(true);
  }

  function finishSession(auto) {
    if (!S || S.done) return;
    const elapsed = Math.max(1, Math.round((Date.now() - S.startAt) / 1000));
    let correct = 0, wrong = 0, blank = 0;
    S.ids.forEach((id) => {
      const q = Q_BY_ID.get(id);
      const sel = S.answers[id];
      if (sel === undefined) blank += 1;
      else if (sel === q.a) correct += 1;
      else wrong += 1;
      if (S.mode === "exam" && sel !== undefined) recordAnswer(id, sel === q.a);
    });
    S.done = true;
    S.timeLogged = true;
    stopTick();
    addStudyTime(elapsed);
    S.result = {
      total: S.ids.length, correct, wrong, blank, sec: elapsed,
      percent: pct(correct, S.ids.length), pass: S.config.pass || store.settings.pass,
    };
    store.sessions.unshift({ t: Date.now(), mode: S.mode, total: S.ids.length, correct, sec: elapsed });
    store.sessions = store.sessions.slice(0, 80);
    saveStore();
    if (S.result.percent >= 80) confetti();
    const target = S.mode === "flash" ? "flashcards" : S.mode;
    if (route === target) render(true);
    updateChrome();
    if (auto) toast("Đã nộp bài. Xem kết quả bên dưới.", "info");
  }

  function finishFlash() {
    if (!S || S.done) return;
    const elapsed = Math.max(1, Math.round((Date.now() - S.startAt) / 1000));
    const total = S.ids.length;
    const correct = S.ids.filter((id) => S.ratings[id] === 1).length;
    S.done = true;
    S.timeLogged = true;
    addStudyTime(elapsed);
    S.result = { total, correct, wrong: total - correct, blank: 0, sec: elapsed, percent: pct(correct, total), pass: 0 };
    store.sessions.unshift({ t: Date.now(), mode: "flash", total, correct, sec: elapsed });
    store.sessions = store.sessions.slice(0, 80);
    saveStore();
    if (S.result.percent >= 80) confetti();
    if (route === "flashcards") render(true);
    updateChrome();
  }

  function quitSession() {
    if (!S) return;
    confirmDialog({
      title: "Thoát phiên hiện tại?",
      desc: "Các câu bạn đã trả lời vẫn được lưu vào tiến độ. Phiên đang làm sẽ không được ghi vào lịch sử.",
      okText: "Thoát phiên",
      danger: true,
      onOk: () => {
        if (S && !S.done && !S.timeLogged) addStudyTime((Date.now() - S.startAt) / 1000);
        S = null;
        stopTick();
        go("dashboard");
      },
    });
  }

  function retryCurrent() {
    if (!S) return;
    const cfg = S.config;
    const opts = {
      topic: cfg.topic, count: cfg.count, order: cfg.order,
      instant: cfg.instant, timeLimit: cfg.timeLimit, pass: cfg.pass,
      ids: (cfg.source === "wrong" || cfg.source === "ids") && cfg.ids ? cfg.ids : null,
      source: cfg.source,
    };
    startSession(S.mode === "exam" ? "exam" : "practice", opts);
  }

  function retryWrongAnswers() {
    if (!S) return;
    const ids = S.ids.filter((id) => {
      const sel = S.answers[id];
      return sel !== undefined && sel !== Q_BY_ID.get(id).a;
    });
    if (!ids.length) { toast("Không có câu sai trong phiên này. Tuyệt vời!", "ok"); return; }
    startSession("practice", { ids, topic: "all", count: 0, order: "random", instant: true, source: "wrong" });
    toast(`Bắt đầu ôn ${ids.length} câu sai`, "info");
  }

  /* ---------------------------------------------------------------------- */
  /* Điều hướng & render                                                    */
  /* ---------------------------------------------------------------------- */
  const ROUTE_META = {
    dashboard: ["Tổng quan", "Không gian ôn tập"],
    practice: ["Luyện tập", "Học theo chủ đề"],
    exam: ["Thi thử", "Mô phỏng bài thi"],
    flashcards: ["Flashcard", "Ghi nhớ chủ động"],
    library: ["Thư viện", "Toàn bộ câu hỏi"],
    stats: ["Thống kê", "Tiến độ của bạn"],
    settings: ["Cài đặt", "Tùy chỉnh trải nghiệm"],
  };

  function go(r) {
    if (location.hash === "#/" + r) { route = r; render(true); }
    else location.hash = "#/" + r;
  }

  function render(scrollTop) {
    updateChrome();
    const meta = ROUTE_META[route] || ROUTE_META.dashboard;
    const titleEl = $("#pageTitle");
    const eyebrowEl = $("#pageEyebrow");
    if (titleEl) titleEl.textContent = meta[0];
    if (eyebrowEl) eyebrowEl.textContent = meta[1];
    document.title = `${meta[0]} · NetSec Study`;
    const view = $("#view");
    if (!view) return;
    let html = "";
    if (route === "practice") {
      if (S && S.mode === "practice") html = S.done ? resultHTML() : practiceQuizHTML();
      else html = practiceSetupHTML();
    } else if (route === "exam") {
      if (S && S.mode === "exam") html = S.done ? resultHTML() : examQuizHTML();
      else html = examSetupHTML();
    } else if (route === "flashcards") {
      if (S && S.mode === "flash") html = S.done ? flashResultHTML() : flashCardHTML();
      else html = flashSetupHTML();
    } else if (route === "library") {
      html = libraryHTML();
    } else if (route === "stats") {
      html = statsHTML();
    } else if (route === "settings") {
      html = settingsHTML();
    } else {
      html = dashboardHTML();
    }
    view.innerHTML = html;
    updateChrome();
    if (route === "exam") updateTimer();
    if (scrollTop) window.scrollTo({ top: 0, behavior: "auto" });
    if (pendingFocusSearch) {
      pendingFocusSearch = false;
      const input = $("#libSearch");
      if (input) { input.focus(); input.select(); }
    }
  }

  function updateLibraryList() {
    const list = $("#libList");
    const count = $("#libCount");
    if (list) list.innerHTML = libraryListHTML();
    if (count) count.textContent = `Hiển thị ${filteredQuestions().length}/${TOTAL} câu`;
    const expandBtn = $('[data-action="lib-expand"]');
    if (expandBtn) {
      const all = filteredQuestions();
      const allOpen = all.length > 0 && all.every((q) => libOpen.has(q.id));
      expandBtn.innerHTML = `${icon("chevron-down")} ${allOpen ? "Thu gọn tất cả" : "Mở rộng tất cả"}`;
    }
  }

  function toggleStar(id) {
    const p = progressOf(id, true);
    p.star = !p.star;
    saveStore();
    $$(`[data-action="star"][data-id="${id}"]`).forEach((btn) => {
      btn.classList.toggle("starred", p.star);
      btn.classList.toggle("starred-btn", p.star);
      btn.setAttribute("aria-pressed", p.star ? "true" : "false");
    });
    toast(p.star ? "Đã đánh dấu câu hỏi ⭐" : "Đã bỏ đánh dấu", "ok");
  }

  function quickStart(kind) {
    if (kind === "practice") {
      startSession("practice", { topic: "all", count: 10, order: "random", instant: true, source: "quick" });
    } else if (kind === "exam") {
      startSession("exam", { topic: "all", count: 20, order: "random", timeLimit: 30 * 60, pass: store.settings.pass, source: "quick" });
    } else if (kind === "flash") {
      const ids = shuffle(QUESTIONS).slice(0, 20).map((q) => q.id);
      startSession("flash", { ids, topic: "all", count: 20, source: "quick" });
    } else if (kind === "wrong") {
      const ids = QUESTIONS.filter((q) => statusOf(q) === "wrong").map((q) => q.id);
      if (!ids.length) { toast("Chưa có câu nào cần ôn. Hãy luyện thêm nhé!", "info"); return; }
      startSession("practice", { ids, topic: "all", count: 0, order: "random", instant: true, source: "wrong" });
    } else if (kind === "starred") {
      const ids = QUESTIONS.filter((q) => { const p = store.progress[q.id]; return p && p.star; }).map((q) => q.id);
      if (!ids.length) { toast("Bạn chưa đánh dấu câu hỏi nào.", "info"); return; }
      startSession("practice", { ids, topic: "all", count: 0, order: "random", instant: true, source: "wrong" });
    }
  }

  /* ---------------------------------------------------------------------- */
  /* Hành động                                                              */
  /* ---------------------------------------------------------------------- */
  function startPracticeForm() {
    const topicEl = $("#cfgTopic");
    const countEl = $("#cfgCount");
    const instantEl = $("#cfgInstant");
    const topic = topicEl ? topicEl.value : "all";
    const count = countEl && countEl.value !== "" ? Number(countEl.value) : 20;
    const instant = instantEl ? instantEl.checked : store.settings.instant;
    draft.topic = topic;
    store.settings.instant = instant;
    saveStore();
    startSession("practice", { topic, count, order: draft.order, instant, source: "setup" });
  }

  function startExamForm() {
    const topicEl = $("#cfgExamTopic");
    const countEl = $("#cfgExamCount");
    const minutesEl = $("#cfgExamTime");
    const passEl = $("#cfgExamPass");
    const topic = topicEl ? topicEl.value || "all" : "all";
    const count = countEl && countEl.value !== "" ? Number(countEl.value) : 20;
    const minutes = minutesEl && minutesEl.value !== "" ? Number(minutesEl.value) : 30;
    const pass = passEl && passEl.value !== "" ? Number(passEl.value) : store.settings.pass;
    startSession("exam", {
      topic, count, order: "random", timeLimit: minutes * 60, pass, source: "setup",
    });
  }

  function startFlashForm() {
    const topicEl = $("#cfgFlashTopic");
    const countEl = $("#cfgFlashCount");
    const topic = topicEl ? topicEl.value || "all" : "all";
    const count = countEl && countEl.value !== "" ? Number(countEl.value) : 20;
    startSession("flash", { topic, count, order: "random", source: "setup" });
  }

  function toggleLib(id) {
    if (libOpen.has(id)) libOpen.delete(id); else libOpen.add(id);
    const item = document.querySelector(`[data-lib="${id}"]`);
    if (item) item.classList.toggle("open", libOpen.has(id));
  }

  function expandAllLib() {
    const all = filteredQuestions();
    const allOpen = all.length > 0 && all.every((q) => libOpen.has(q.id));
    all.forEach((q) => { if (allOpen) libOpen.delete(q.id); else libOpen.add(q.id); });
    updateLibraryList();
  }

  function clearLibFilter() {
    libFilter.q = ""; libFilter.topic = "all"; libFilter.status = "all";
    const s = $("#libSearch"), t = $("#libTopic"), st = $("#libStatus");
    if (s) s.value = "";
    if (t) t.value = "all";
    if (st) st.value = "all";
    updateLibraryList();
  }

  function practiceFilteredList() {
    const ids = filteredQuestions().map((q) => q.id);
    if (!ids.length) { toast("Không có câu hỏi nào trong bộ lọc hiện tại.", "warn"); return; }
    startSession("practice", { ids, topic: "all", count: 0, order: "random", instant: true, source: "ids" });
  }

  function flashFlip() {
    if (!S || S.done) return;
    S.revealed = !S.revealed;
    render(false);
  }

  function rateFlash(rate) {
    if (!S || S.done) return;
    const q = Q_BY_ID.get(S.ids[S.index]);
    if (S.ratings[q.id] !== undefined) return;
    S.ratings[q.id] = rate;
    recordAnswer(q.id, rate === 1);
    if (S.index >= S.ids.length - 1) finishFlash();
    else { S.index += 1; S.revealed = false; render(true); }
  }

  function retryFlashUnknown() {
    if (!S) return;
    const ids = S.ids.filter((id) => S.ratings[id] !== 1);
    if (!ids.length) { toast("Bạn đã nhớ tất cả thẻ trong phiên này!", "ok"); return; }
    startSession("flash", { ids, topic: "all", count: 0, order: "random", source: "ids" });
  }

  function openNavigator() {
    if (!S) return;
    const cells = S.ids.map((id, idx) => {
      const cls = ["qnav-cell"];
      if (S.answers[id] !== undefined) cls.push("answered");
      if (S.flags.has(id)) cls.push("flagged");
      if (idx === S.index) cls.push("current");
      return `<button class="${cls.join(" ")}" type="button" data-action="jump-exam" data-idx="${idx}">${idx + 1}</button>`;
    }).join("");
    openModal({
      title: "Bảng câu hỏi",
      desc: `${Object.keys(S.answers).length}/${S.ids.length} câu đã trả lời · ${S.flags.size} câu đã đánh dấu`,
      wide: true,
      body: `<div class="qnav-grid">${cells}</div>
        <div class="qnav-legend">
          <span><i class="legend-dot answered"></i> Đã trả lời</span>
          <span><i class="legend-dot flagged"></i> Đã đánh dấu</span>
          <span><i class="legend-dot current"></i> Câu hiện tại</span>
        </div>`,
      okText: "Đóng",
      hideCancel: true,
    });
  }

  function requestSubmitExam() {
    if (!S || S.done) return;
    const answered = Object.keys(S.answers).length;
    const blank = S.ids.length - answered;
    confirmDialog({
      title: "Nộp bài thi?",
      desc: `Bạn đã trả lời ${answered}/${S.ids.length} câu.` + (blank ? ` Còn ${blank} câu chưa trả lời sẽ được tính là sai.` : " Bạn đã trả lời tất cả câu hỏi."),
      okText: "Nộp bài",
      onOk: () => finishSession(false),
    });
  }

  function toggleReviewItem(id) {
    const el = document.querySelector(`[data-review="${id}"]`);
    if (el) el.classList.toggle("open");
  }

  function exportData() {
    const payload = {
      app: "NetSec Study", exportedAt: new Date().toISOString(),
      progress: store.progress, daily: store.daily, sessions: store.sessions,
      settings: store.settings, createdAt: store.createdAt,
    };
    const blob = new Blob([JSON.stringify(payload, null, 2)], { type: "application/json" });
    const a = document.createElement("a");
    a.href = URL.createObjectURL(blob);
    a.download = `netsec-study-${dayKey()}.json`;
    document.body.appendChild(a);
    a.click();
    a.remove();
    setTimeout(() => URL.revokeObjectURL(a.href), 1500);
    toast("Đã xuất tệp tiến độ", "ok");
  }

  function importDataFile(file) {
    const reader = new FileReader();
    reader.onload = () => {
      try {
        const data = JSON.parse(String(reader.result));
        if (!data || typeof data !== "object" || !data.progress || typeof data.progress !== "object") {
          throw new Error("Cấu trúc tệp không hợp lệ");
        }
        const count = Object.keys(data.progress).length;
        confirmDialog({
          title: "Nhập dữ liệu tiến độ?",
          desc: `Tệp chứa dữ liệu của ${count} câu hỏi. Dữ liệu hiện tại trên thiết bị sẽ được thay thế.`,
          okText: "Nhập dữ liệu",
          onOk: () => {
            store.progress = data.progress;
            store.daily = data.daily && typeof data.daily === "object" ? data.daily : {};
            store.sessions = Array.isArray(data.sessions) ? data.sessions.slice(0, 80) : [];
            if (data.settings) store.settings = Object.assign({}, DEFAULT_SETTINGS, data.settings);
            store.seenWelcome = true;
            saveStore();
            applyTheme();
            S = null;
            render(true);
            toast(`Đã nhập tiến độ của ${count} câu hỏi`, "ok");
          },
        });
      } catch (err) {
        toast("Tệp JSON không hợp lệ hoặc không đúng định dạng.", "bad");
      }
    };
    reader.readAsText(file);
  }

  function resetData() {
    confirmDialog({
      title: "Đặt lại toàn bộ tiến độ?",
      desc: "Tất cả câu đã làm, câu đánh dấu, lịch sử bài thi và thống kê sẽ bị xóa vĩnh viễn. Cài đặt giao diện được giữ nguyên.",
      okText: "Xóa tất cả",
      danger: true,
      onOk: () => {
        store.progress = {};
        store.daily = {};
        store.sessions = [];
        S = null;
        stopTick();
        saveStore();
        applyTheme();
        go("dashboard");
        render(true);
        toast("Đã đặt lại toàn bộ tiến độ", "ok");
      },
    });
  }

  /* ---------------------------------------------------------------------- */
  /* Sự kiện                                                                */
  /* ---------------------------------------------------------------------- */
  document.addEventListener("click", (e) => {
    const target = e.target.closest("[data-action]");
    if (!target) return;
    const action = target.dataset.action;
    const id = Number(target.dataset.id);

    if (action === "modal-backdrop") {
      if (e.target === target) closeModal();
      return;
    }
    if (action === "close-modal") { closeModal(); return; }
    if (action === "star") { toggleStar(id); return; }
    if (action === "quick") { quickStart(target.dataset.kind); return; }
    if (action === "practice-topic") {
      draft.topic = target.dataset.topic || "all";
      go("practice");
      return;
    }
    if (action === "set-order") {
      draft.order = target.dataset.order || "random";
      $$("#cfgOrder button").forEach((b) => b.classList.toggle("active", b === target));
      return;
    }
    if (action === "start-practice-mode") {
      const instant = target.dataset.instant === "1";
      const cb = $("#cfgInstant");
      if (cb) cb.checked = instant;
      $$('[data-action="start-practice-mode"]').forEach((b) => b.classList.toggle("active", b === target));
      return;
    }
    if (action === "start-practice") { startPracticeForm(); return; }
    if (action === "start-exam") { startExamForm(); return; }
    if (action === "start-flash") { startFlashForm(); return; }
    if (action === "answer") { answerPractice(Number(target.dataset.opt)); return; }
    if (action === "next-practice") { nextPractice(); return; }
    if (action === "exam-answer") { answerExam(Number(target.dataset.opt)); return; }
    if (action === "exam-prev") { moveExam(-1); return; }
    if (action === "exam-next") { moveExam(1); return; }
    if (action === "flag") {
      if (!S) return;
      const qid = Number(target.dataset.id);
      if (S.flags.has(qid)) S.flags.delete(qid); else S.flags.add(qid);
      render(false);
      return;
    }
    if (action === "open-nav") { openNavigator(); return; }
    if (action === "jump-exam") {
      if (!S) return;
      S.index = Number(target.dataset.idx);
      closeModal();
      render(true);
      return;
    }
    if (action === "submit-exam") { requestSubmitExam(); return; }
    if (action === "quit") { quitSession(); return; }
    if (action === "retry-session") { retryCurrent(); return; }
    if (action === "retry-wrong") { retryWrongAnswers(); return; }
    if (action === "flash-flip") { flashFlip(); return; }
    if (action === "flash-rate") { rateFlash(Number(target.dataset.rate)); return; }
    if (action === "flash-retry-wrong") { retryFlashUnknown(); return; }
    if (action === "flash-new") { S = null; render(true); return; }
    if (action === "review-toggle") { toggleReviewItem(id); return; }
    if (action === "toggle-review-wrong") {
      const list = $("#reviewList");
      if (list) {
        list.classList.toggle("only-wrong");
        const on = list.classList.contains("only-wrong");
        target.innerHTML = `${icon("eye")} ${on ? "Hiện tất cả" : "Chỉ câu sai"}`;
      }
      return;
    }
    if (action === "toggle-lib") { toggleLib(id); return; }
    if (action === "lib-expand") { expandAllLib(); return; }
    if (action === "clear-lib-filter") { clearLibFilter(); return; }
    if (action === "lib-practice") {
      startSession("practice", { ids: [id], topic: "all", count: 1, order: "keep", instant: true, source: "ids" });
      return;
    }
    if (action === "practice-filtered") { practiceFilteredList(); return; }
    if (action === "set-theme") {
      store.settings.theme = target.dataset.theme;
      saveStore();
      applyTheme();
      render(false);
      toast("Đã cập nhật giao diện", "info");
      return;
    }
    if (action === "set-font") {
      store.settings.font = target.dataset.font;
      saveStore();
      applyTheme();
      render(false);
      return;
    }
    if (action === "export-data") { exportData(); return; }
    if (action === "import-data") { const f = $("#importFile"); if (f) f.click(); return; }
    if (action === "reset-data") { resetData(); return; }
  });

  document.addEventListener("change", (e) => {
    const el = e.target;
    if (el.id === "importFile") {
      if (el.files && el.files[0]) importDataFile(el.files[0]);
      el.value = "";
      return;
    }
    if (el.id === "cfgTopic") { draft.topic = el.value; return; }
    if (el.id === "libTopic") { libFilter.topic = el.value; updateLibraryList(); return; }
    if (el.id === "libStatus") { libFilter.status = el.value; updateLibraryList(); return; }
    if (el.matches("[data-setting]")) {
      const key = el.dataset.setting;
      if (el.type === "checkbox") store.settings[key] = el.checked;
      else if (key === "pass") store.settings[key] = Number(el.value);
      else store.settings[key] = el.value;
      saveStore();
      if (key === "instant") toast(el.checked ? "Đã bật phản hồi ngay" : "Đã tắt phản hồi ngay", "info");
    }
  });

  const onLibSearch = debounce(() => {
    const el = $("#libSearch");
    if (!el) return;
    libFilter.q = el.value;
    updateLibraryList();
  }, 140);

  document.addEventListener("input", (e) => {
    if (e.target.id === "libSearch") onLibSearch();
  });

  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape") {
      const root = $("#modalRoot");
      if (root && root.children.length) { closeModal(); return; }
    }
    const el = e.target;
    if (el && (el.tagName === "INPUT" || el.tagName === "SELECT" || el.tagName === "TEXTAREA")) return;
    if (e.key === "/") {
      e.preventDefault();
      pendingFocusSearch = true;
      go("library");
      return;
    }
    if (!S || S.done) return;
    const q = Q_BY_ID.get(S.ids[S.index]);
    if (!q) return;
    const order = orderFor(q);
    if (S.mode === "practice") {
      if (/^[1-4]$/.test(e.key) && S.answers[q.id] === undefined) {
        const orig = order[Number(e.key) - 1];
        if (orig !== undefined) { e.preventDefault(); answerPractice(orig); }
      } else if (e.key === "Enter" && S.answers[q.id] !== undefined) {
        e.preventDefault();
        nextPractice();
      }
    } else if (S.mode === "exam") {
      if (/^[1-4]$/.test(e.key)) {
        const orig = order[Number(e.key) - 1];
        if (orig !== undefined) { e.preventDefault(); answerExam(orig); }
      } else if (e.key === "ArrowLeft") { e.preventDefault(); moveExam(-1); }
      else if (e.key === "ArrowRight" || e.key === "Enter") { e.preventDefault(); moveExam(1); }
    } else if (S.mode === "flash") {
      if (e.key === " " || e.key === "Spacebar") { e.preventDefault(); flashFlip(); }
      else if (e.key === "1") { e.preventDefault(); rateFlash(0); }
      else if (e.key === "2") { e.preventDefault(); rateFlash(1); }
    }
  });

  window.addEventListener("hashchange", () => {
    stopConfetti();
    const h = location.hash.replace(/^#\/?/, "").split("?")[0];
    route = ROUTE_META[h] ? h : "dashboard";
    render(true);
  });

  window.addEventListener("pagehide", () => {
    try { localStorage.setItem(KEY, JSON.stringify(store)); } catch (err) { /* ignore */ }
  });

  const themeBtn = $("#themeBtn");
  if (themeBtn) themeBtn.addEventListener("click", cycleTheme);
  const searchBtn = $("#searchBtn");
  if (searchBtn) {
    searchBtn.addEventListener("click", () => {
      pendingFocusSearch = true;
      go("library");
    });
  }

  if (window.matchMedia) {
    const mq = window.matchMedia("(prefers-color-scheme: light)");
    const onChange = () => { if (store.settings.theme === "system") applyTheme(); };
    if (mq.addEventListener) mq.addEventListener("change", onChange);
    else if (mq.addListener) mq.addListener(onChange);
  }

  /* ---------------------------------------------------------------------- */
  /* Khởi động                                                              */
  /* ---------------------------------------------------------------------- */
  function init() {
    applyTheme();
    const h = location.hash.replace(/^#\/?/, "").split("?")[0];
    route = ROUTE_META[h] ? h : "dashboard";
    if (!h) {
      try { history.replaceState(null, "", "#/dashboard"); } catch (err) { /* ignore */ }
    }
    render(true);
    maybeShowWelcome();
    if ("serviceWorker" in navigator && location.protocol.indexOf("http") === 0) {
      navigator.serviceWorker.register("./sw.js").catch(() => { /* offline vẫn dùng được sau lần đầu */ });
    }
  }

  if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", init);
  else init();
})();
