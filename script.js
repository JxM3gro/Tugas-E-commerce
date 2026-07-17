const $ = (selector) => document.querySelector(selector);
const $$ = (selector) => [...document.querySelectorAll(selector)];

const storeKey = "uas_hr_management_state_v1";
const today = new Date().toISOString().slice(0, 10);

const demo = {
  users: [
    { name: "Admin HR", email: "admin@company.com", password: "admin123", role: "Admin HR", status: "Aktif", lastLogin: "2026-07-17 08:10" },
    { name: "Dina Pramesti", email: "employee@company.com", password: "employee123", role: "Karyawan", status: "Aktif", lastLogin: "2026-07-16 17:40" },
    { name: "Raka Supervisor", email: "raka.manager@company.com", password: "manager123", role: "Manager", status: "Aktif", lastLogin: "2026-07-15 11:20" },
    { name: "Sari Staff HR", email: "sari.hr@company.com", password: "staff123", role: "Staff HR", status: "Aktif", lastLogin: "2026-07-14 09:05" }
  ],
  employees: [
    { id: "EMP001", name: "Dina Pramesti", birthPlace: "Jakarta", birthDate: "1997-08-12", gender: "Perempuan", address: "Jl. Melati No. 12, Jakarta", email: "employee@company.com", phone: "0812-1010-2020", division: "Human Resource", position: "HR Officer", joinDate: "2022-01-10", status: "Tetap", leaveBalance: 9 },
    { id: "EMP002", name: "Raka Wibisana", birthPlace: "Bandung", birthDate: "1992-03-21", gender: "Laki-laki", address: "Jl. Braga No. 8, Bandung", email: "raka@company.com", phone: "0813-2244-8811", division: "Operations", position: "Operations Manager", joinDate: "2020-04-05", status: "Tetap", leaveBalance: 7 },
    { id: "EMP003", name: "Nadia Putri", birthPlace: "Surabaya", birthDate: "1995-11-05", gender: "Perempuan", address: "Jl. Darmo Permai, Surabaya", email: "nadia@company.com", phone: "0821-8877-9900", division: "Finance", position: "Finance Analyst", joinDate: "2021-09-13", status: "Tetap", leaveBalance: 11 },
    { id: "EMP004", name: "Bagas Mahendra", birthPlace: "Semarang", birthDate: "1999-06-17", gender: "Laki-laki", address: "Jl. Pandanaran No. 24, Semarang", email: "bagas@company.com", phone: "0857-1002-3939", division: "Information Technology", position: "Frontend Developer", joinDate: "2023-02-20", status: "Kontrak", leaveBalance: 10 },
    { id: "EMP005", name: "Maya Safitri", birthPlace: "Yogyakarta", birthDate: "1994-12-09", gender: "Perempuan", address: "Jl. Kaliurang Km 7, Yogyakarta", email: "maya@company.com", phone: "0819-4567-3210", division: "Marketing", position: "Marketing Specialist", joinDate: "2021-06-01", status: "Tetap", leaveBalance: 6 },
    { id: "EMP006", name: "Yoga Firmansyah", birthPlace: "Depok", birthDate: "1996-05-28", gender: "Laki-laki", address: "Jl. Margonda Raya, Depok", email: "yoga@company.com", phone: "0822-1414-8989", division: "Warehouse", position: "Warehouse Coordinator", joinDate: "2022-10-18", status: "Tetap", leaveBalance: 8 },
    { id: "EMP007", name: "Lestari Anggita", birthPlace: "Malang", birthDate: "1998-07-29", gender: "Perempuan", address: "Jl. Ijen No. 15, Malang", email: "lestari@company.com", phone: "0812-8080-4455", division: "Human Resource", position: "Recruitment Staff", joinDate: "2024-01-08", status: "Kontrak", leaveBalance: 12 },
    { id: "EMP008", name: "Andi Saputra", birthPlace: "Bekasi", birthDate: "1993-09-02", gender: "Laki-laki", address: "Jl. Ahmad Yani, Bekasi", email: "andi@company.com", phone: "0813-2323-7644", division: "Information Technology", position: "System Analyst", joinDate: "2019-12-16", status: "Tetap", leaveBalance: 5 },
    { id: "EMP009", name: "Citra Amelia", birthPlace: "Medan", birthDate: "1996-02-14", gender: "Perempuan", address: "Jl. Gajah Mada, Medan", email: "citra@company.com", phone: "0821-6655-1717", division: "Finance", position: "Payroll Officer", joinDate: "2023-05-22", status: "Tetap", leaveBalance: 10 },
    { id: "EMP010", name: "Fajar Nugroho", birthPlace: "Solo", birthDate: "1991-10-30", gender: "Laki-laki", address: "Jl. Slamet Riyadi, Solo", email: "fajar@company.com", phone: "0858-9090-2255", division: "Operations", position: "Logistics Lead", joinDate: "2018-03-12", status: "Tetap", leaveBalance: 4 },
    { id: "EMP011", name: "Rini Kurnia", birthPlace: "Bogor", birthDate: "2000-04-18", gender: "Perempuan", address: "Jl. Pajajaran, Bogor", email: "rini@company.com", phone: "0817-2221-1110", division: "Marketing", position: "Content Planner", joinDate: "2026-07-01", status: "Probation", leaveBalance: 12 }
  ],
  attendance: [
    ["EMP001", "Dina Pramesti", "08:00", "17:03", "9j 3m", "Hadir", "Tepat waktu"],
    ["EMP002", "Raka Wibisana", "08:20", "17:15", "8j 55m", "Terlambat", "Macet"],
    ["EMP003", "Nadia Putri", "08:02", "17:02", "9j", "Hadir", "-"],
    ["EMP004", "Bagas Mahendra", "08:10", "17:11", "9j 1m", "Hadir", "-"],
    ["EMP005", "Maya Safitri", "-", "-", "-", "Izin", "Acara keluarga"],
    ["EMP006", "Yoga Firmansyah", "08:45", "17:20", "8j 35m", "Terlambat", "Kendaraan bermasalah"],
    ["EMP007", "Lestari Anggita", "-", "-", "-", "Sakit", "Surat dokter"],
    ["EMP008", "Andi Saputra", "07:56", "17:00", "9j 4m", "Hadir", "-"],
    ["EMP009", "Citra Amelia", "08:04", "17:06", "9j 2m", "Hadir", "-"],
    ["EMP010", "Fajar Nugroho", "-", "-", "-", "Tidak hadir", "Tanpa keterangan"]
  ].map((a, i) => ({ date: today, employeeId: a[0], name: a[1], in: a[2], out: a[3], total: a[4], status: a[5], note: a[6], key: `ATT${i + 1}` })),
  leaves: [
    { id: "LV001", employeeId: "EMP001", name: "Dina Pramesti", type: "Cuti tahunan", start: "2026-07-22", end: "2026-07-24", days: 3, reason: "Liburan keluarga", status: "Menunggu", requestDate: "2026-07-16", note: "" },
    { id: "LV002", employeeId: "EMP005", name: "Maya Safitri", type: "Cuti sakit", start: "2026-07-12", end: "2026-07-13", days: 2, reason: "Pemulihan demam", status: "Disetujui", requestDate: "2026-07-10", note: "Disetujui HR" },
    { id: "LV003", employeeId: "EMP006", name: "Yoga Firmansyah", type: "Cuti menikah", start: "2026-08-03", end: "2026-08-07", days: 5, reason: "Pernikahan", status: "Menunggu", requestDate: "2026-07-15", note: "" },
    { id: "LV004", employeeId: "EMP009", name: "Citra Amelia", type: "Cuti lainnya", start: "2026-07-08", end: "2026-07-08", days: 1, reason: "Urus dokumen", status: "Ditolak", requestDate: "2026-07-06", note: "Periode payroll" }
  ],
  histories: [
    { name: "Raka Wibisana", prev: "Operations Supervisor", now: "Operations Manager", division: "Operations", start: "2024-01-01", end: "-", type: "Promosi", note: "Memimpin efisiensi distribusi." },
    { name: "Andi Saputra", prev: "Backend Developer", now: "System Analyst", division: "Information Technology", start: "2025-03-01", end: "-", type: "Perubahan jabatan", note: "Fokus analisis kebutuhan sistem." },
    { name: "Yoga Firmansyah", prev: "Warehouse Staff", now: "Warehouse Coordinator", division: "Warehouse", start: "2023-05-01", end: "-", type: "Promosi", note: "Koordinasi shift gudang." },
    { name: "Maya Safitri", prev: "Sales Support", now: "Marketing Specialist", division: "Marketing", start: "2022-06-01", end: "-", type: "Mutasi", note: "Perpindahan ke strategi kampanye." }
  ],
  settings: { company: "PT Nusantara Digital Humania", address: "Jl. Sudirman Kav. 88, Jakarta", email: "hr@company.com", phone: "021-555-1300", clockIn: "08:00", clockOut: "17:00", lateLimit: "08:15", annualLeave: 12, notifyEmail: true, notifyApp: true },
  kanban: {
    "To Do": ["Membuat form pengajuan cuti", "Menyusun backlog UAS"],
    "In Progress": ["Membuat fitur absensi", "Mendesain dashboard"],
    "Testing": ["Menguji tampilan mobile"],
    "Done": ["Membuat halaman login", "Membuat tabel data karyawan"]
  }
};

let state = loadState();
let session = JSON.parse(localStorage.getItem("hr_session") || "null");
let currentPage = "dashboard";
let employeePage = 1;

const titles = {
  dashboard: ["Dashboard", "Ringkasan aktivitas HR perusahaan."],
  employees: ["Data Karyawan", "Kelola profil dan status kerja karyawan."],
  attendance: ["Absensi", "Pantau kehadiran harian karyawan."],
  leaves: ["Cuti", "Kelola pengajuan dan approval cuti."],
  history: ["Riwayat Kerja", "Lihat perubahan jabatan dan perjalanan karier."],
  reports: ["Laporan", "Preview dan ekspor laporan HR."],
  users: ["Manajemen User", "Atur role dan status akun pengguna."],
  settings: ["Pengaturan", "Konfigurasi perusahaan dan sistem."],
  profile: ["Profil Karyawan", "Informasi personal dan riwayat karyawan."],
  agile: ["Agile Project", "Dokumentasi Crystal Team, Sprint, Kanban, dan Backlog."]
};

const menus = [
  ["dashboard", "Dashboard", "layout-dashboard"],
  ["employees", "Data Karyawan", "users"],
  ["attendance", "Absensi", "clock-3"],
  ["leaves", "Cuti", "calendar-days"],
  ["history", "Riwayat Kerja", "history"],
  ["reports", "Laporan", "file-chart-column"],
  ["users", "Manajemen User", "user-cog"],
  ["settings", "Pengaturan", "settings"],
  ["agile", "Agile Project", "panels-top-left"],
  ["logout", "Logout", "log-out"]
];

function loadState() {
  const saved = localStorage.getItem(storeKey);
  return saved ? JSON.parse(saved) : structuredClone(demo);
}
function saveState() { localStorage.setItem(storeKey, JSON.stringify(state)); }
function initials(name) { return name.split(" ").slice(0, 2).map((n) => n[0]).join("").toUpperCase(); }
function badge(status) {
  const color = { Hadir: "green", Disetujui: "green", Aktif: "green", Tetap: "green", Menunggu: "yellow", Terlambat: "yellow", Probation: "yellow", Izin: "blue", Sakit: "blue", Ditolak: "red", "Tidak hadir": "red", Nonaktif: "red", Kontrak: "blue" }[status] || "gray";
  return `<span class="badge ${color}">${status}</span>`;
}
function toast(message, isError = false) {
  const el = $("#toast");
  el.textContent = message;
  el.className = `toast show${isError ? " error" : ""}`;
  setTimeout(() => el.className = "toast", 2600);
}
function openModal(title, html) {
  $("#modalTitle").textContent = title;
  $("#modalBody").innerHTML = html;
  $("#modal").classList.remove("hidden");
}
function closeModal() { $("#modal").classList.add("hidden"); }

function init() {
  $("#loginForm").addEventListener("submit", handleLogin);
  $("#fillAdmin").addEventListener("click", () => {
    $("#loginEmail").value = "admin@company.com";
    $("#loginPassword").value = "admin123";
    $("#loginRole").value = "Admin HR";
  });
  $("#modalClose").addEventListener("click", closeModal);
  $("#modal").addEventListener("click", (e) => { if (e.target.id === "modal") closeModal(); });
  $("#menuToggle").addEventListener("click", toggleSidebar);
  $("#overlay").addEventListener("click", toggleSidebar);
  $("#themeToggle").addEventListener("click", toggleTheme);
  $("#quickAddEmployee").addEventListener("click", () => showEmployeeForm());
  $("#profileShortcut").addEventListener("click", () => navigate("profile"));
  if (localStorage.getItem("hr_theme") === "dark") document.body.classList.add("dark");
  renderTopbarDate();
  setInterval(renderTopbarDate, 60000);
  if (session) showApp();
}

function handleLogin(e) {
  e.preventDefault();
  const email = $("#loginEmail").value.trim();
  const password = $("#loginPassword").value.trim();
  const role = $("#loginRole").value;
  if (!email || !password) return $("#loginError").textContent = "Email dan password wajib diisi.";
  const user = state.users.find((u) => u.email === email && u.password === password && u.role === role);
  if (!user) return $("#loginError").textContent = "Akun demo tidak cocok dengan role yang dipilih.";
  session = { name: user.name, email: user.email, role: user.role };
  localStorage.setItem("hr_session", JSON.stringify(session));
  user.lastLogin = new Date().toLocaleString("id-ID");
  saveState();
  showApp();
  toast(`Selamat datang, ${user.name}`);
}

function showApp() {
  $("#loginPage").classList.add("hidden");
  $("#appShell").classList.remove("hidden");
  renderNav();
  renderProfileChip();
  navigate(session.role === "Karyawan" ? "dashboard" : currentPage);
}

function renderNav() {
  const allowed = getAllowedPages();
  $("#sideNav").innerHTML = menus.filter(([key]) => key === "logout" || allowed.includes(key)).map(([key, label, icon]) =>
    `<button class="nav-item" data-page="${key}"><span class="icon"><i data-lucide="${icon}"></i></span><span>${label}</span></button>`
  ).join("");
  $$(".nav-item").forEach((btn) => btn.addEventListener("click", () => {
    const page = btn.dataset.page;
    if (page === "logout") return logout();
    navigate(page);
  }));
  $(".admin-only").style.display = session.role === "Karyawan" ? "none" : "inline-block";
  refreshIcons();
}

function getAllowedPages() {
  if (session.role === "Karyawan") return ["dashboard", "attendance", "leaves", "profile", "settings", "agile"];
  if (session.role === "Manager") return ["dashboard", "leaves", "reports", "profile", "settings", "agile"];
  if (session.role === "Staff HR") return ["dashboard", "employees", "attendance", "leaves", "reports", "profile", "settings", "agile"];
  return ["dashboard", "employees", "attendance", "leaves", "history", "reports", "users", "settings", "profile", "agile"];
}

function navigate(page) {
  if (!getAllowedPages().includes(page)) page = "dashboard";
  currentPage = page;
  const [title, subtitle] = titles[page];
  $("#pageTitle").textContent = title;
  $("#pageSubtitle").textContent = subtitle;
  $$(".nav-item").forEach((b) => b.classList.toggle("active", b.dataset.page === page));
  $("#sidebar").classList.remove("open");
  $("#overlay").classList.remove("show");
  $("#appShell").classList.toggle("dashboard-active", page === "dashboard");
  $("#content").className = page === "dashboard" ? "content dashboard-content" : "content";
  const renderers = { dashboard: renderDashboard, employees: renderEmployees, attendance: renderAttendance, leaves: renderLeaves, history: renderHistory, reports: renderReports, users: renderUsers, settings: renderSettings, profile: renderProfile, agile: renderAgile };
  renderers[page]();
  refreshIcons();
}

function renderProfileChip() {
  $("#profileShortcut").innerHTML = `<span class="avatar">${initials(session.name)}</span><span>${session.name}</span>`;
  refreshIcons();
}
function renderTopbarDate() {
  const node = $("#topbarDate");
  if (!node) return;
  const now = new Date();
  const date = now.toLocaleDateString("en-GB", { weekday: "short", day: "2-digit", month: "short", year: "numeric" });
  const time = now.toLocaleTimeString("en-GB", { hour: "2-digit", minute: "2-digit", hour12: false });
  node.textContent = `${date} | ${time} hrs`;
}
function refreshIcons() {
  if (window.lucide) window.lucide.createIcons({ attrs: { "stroke-width": 1.7 } });
}
function toggleSidebar() { $("#sidebar").classList.toggle("open"); $("#overlay").classList.toggle("show"); }
function toggleTheme() {
  document.body.classList.toggle("dark");
  localStorage.setItem("hr_theme", document.body.classList.contains("dark") ? "dark" : "light");
  toast("Mode tampilan diperbarui.");
}
function logout() {
  localStorage.removeItem("hr_session");
  session = null;
  $("#appShell").classList.add("hidden");
  $("#loginPage").classList.remove("hidden");
}

function renderDashboard() {
  if (session.role === "Karyawan") return renderEmployeeDashboard();
  const counts = countAttendance();
  $("#content").innerHTML = `
    <section class="dashboard-page">
      <header class="dashboard-intro">
        <div><h1>Welcome, ${session.name.split(" ")[0]} <span aria-hidden="true">&#128075;&#127995;</span></h1><p>Good to see you boss !</p></div>
        <strong>HR Overview</strong>
      </header>
      <div class="dashboard-metrics">
        ${dashboardMetric("Total karyawan", state.employees.length, "Seluruh divisi", "users")}
        ${dashboardMetric("Hadir hari ini", counts.Hadir || 0, "Total kehadiran", "badge-check")}
        ${dashboardMetric("Tidak hadir", counts["Tidak hadir"] || 0, "Perlu tindak lanjut", "user-x")}
        ${dashboardMetric("Cuti menunggu", state.leaves.filter(l => l.status === "Menunggu").length, "Total pengajuan", "calendar-clock")}
      </div>
      <div class="dashboard-filter-panel">
        <label>Search employee<div class="field-with-icon"><i data-lucide="search"></i><input id="dashSearch" placeholder="Enter employee name"></div></label>
        <label>Job position<select id="dashPosition"><option value="">Select job position</option>${unique(state.employees.map(e => e.position)).map(p => `<option>${p}</option>`).join("")}</select></label>
        <label>Date of admission<input id="dashDate" type="date"></label>
        <label>Employee status<select id="dashStatus"><option value="">Select employee status</option><option>Tetap</option><option>Kontrak</option><option>Probation</option></select></label>
      </div>
      <div id="dashboardEmployeeTable"></div>
    </section>
    <section class="dashboard-analytics grid two">
      <div class="card">
        <div class="section-head"><h3>Grafik Kehadiran per Bulan</h3><button class="secondary" data-page-link="reports">Lihat laporan</button></div>
        ${barChart()}
      </div>
      <div class="card">
        <div class="section-head"><h3>Status Kehadiran</h3></div>
        <div class="donut"></div>
        <div class="legend">
          <span><i class="dot" style="background:var(--chart-1)"></i> Hadir 68%</span>
          <span><i class="dot" style="background:var(--chart-2)"></i> Terlambat 12%</span>
          <span><i class="dot" style="background:var(--chart-3)"></i> Tidak hadir 11%</span>
          <span><i class="dot" style="background:var(--chart-4)"></i> Izin/Sakit 9%</span>
        </div>
      </div>
    </section>
    <section class="dashboard-analytics grid three">
      ${listCard("Pengajuan Cuti Terbaru", state.leaves.slice(0, 4).map(l => `${l.name} - ${l.type} ${badge(l.status)}`))}
      ${listCard("Ulang Tahun Karyawan", state.employees.slice(0, 4).map(e => `${e.name} - ${formatDate(e.birthDate).slice(0, 6)}`))}
      ${listCard("Aktivitas Terbaru", ["Admin memperbarui data karyawan", "Dina mengajukan cuti tahunan", "Bagas melakukan absen masuk", "Laporan absensi diekspor"])}
    </section>`;
  ["dashSearch", "dashPosition", "dashDate", "dashStatus"].forEach(id => $(`#${id}`).addEventListener("input", drawDashboardEmployeeTable));
  drawDashboardEmployeeTable();
  bindPageLinks();
}

function drawDashboardEmployeeTable() {
  const q = $("#dashSearch").value.trim().toLowerCase();
  const position = $("#dashPosition").value;
  const date = $("#dashDate").value;
  const status = $("#dashStatus").value;
  const filtered = state.employees.filter(e =>
    (!q || [e.name, e.id, e.email].join(" ").toLowerCase().includes(q)) &&
    (!position || e.position === position) && (!date || e.joinDate === date) && (!status || e.status === status)
  );
  const visible = filtered.slice(0, 6);
  $("#dashboardEmployeeTable").innerHTML = `<div class="dashboard-table-wrap"><table><thead><tr><th>Name</th><th>Job Position</th><th>Date of admission</th><th>Employee status</th><th>Actions</th></tr></thead><tbody>${visible.map(e => `<tr><td>${e.name}</td><td>${e.position}</td><td>${formatDate(e.joinDate)}</td><td>${e.status}</td><td><button class="table-action" title="Lihat detail" aria-label="Lihat detail ${e.name}" onclick="showEmployeeDetail('${e.id}')"><i data-lucide="ellipsis"></i></button></td></tr>`).join("") || `<tr><td colspan="5" class="empty-state">Data tidak ditemukan.</td></tr>`}</tbody></table><div class="dashboard-pagination"><span>${visible.length ? 1 : 0}-${visible.length} of ${filtered.length}</span><div><button disabled aria-label="Halaman sebelumnya"><i data-lucide="chevron-left"></i></button><button ${filtered.length <= 6 ? "disabled" : ""} aria-label="Lihat seluruh karyawan" onclick="navigate('employees')"><i data-lucide="chevron-right"></i></button></div></div></div>`;
  refreshIcons();
}

function renderEmployeeDashboard() {
  const emp = currentEmployee();
  const att = state.attendance.find((a) => a.employeeId === emp.id && a.date === today);
  $("#content").innerHTML = `
    <div class="profile-layout">
      <div class="card">
        <div class="person"><span class="avatar big">${initials(emp.name)}</span><div><h3>${emp.name}</h3><p>${emp.position}<br>${emp.division}</p></div></div>
        <p>${badge(emp.status)} ${badge(att?.status || "Belum absen")}</p>
        <div class="grid">
          ${info("Jam masuk", att?.in || "-")} ${info("Jam pulang", att?.out || "-")} ${info("Sisa cuti", `${emp.leaveBalance} hari`)}
        </div>
      </div>
      <div class="card">
        <div class="section-head"><h3>Absensi Hari Ini</h3><strong id="clockNow"></strong></div>
        <div class="actions"><button class="primary" id="clockInBtn">Absen Masuk</button><button class="secondary" id="clockOutBtn">Absen Pulang</button><button class="warning" id="requestLeaveBtn">Ajukan Cuti</button></div>
        <h3>Riwayat Absensi Terbaru</h3>${attendanceTable(state.attendance.filter(a => a.employeeId === emp.id || a.name === emp.name).slice(-5))}
      </div>
    </div>
    <div class="card"><div class="section-head"><h3>Status Pengajuan Cuti</h3></div>${leaveTable(state.leaves.filter(l => l.employeeId === emp.id))}</div>`;
  setInterval(() => { const c = $("#clockNow"); if (c) c.textContent = new Date().toLocaleTimeString("id-ID"); }, 1000);
  $("#clockInBtn").addEventListener("click", clockIn);
  $("#clockOutBtn").addEventListener("click", clockOut);
  $("#requestLeaveBtn").addEventListener("click", showLeaveForm);
}

function renderEmployees() {
  const divisions = unique(state.employees.map(e => e.division));
  $("#content").innerHTML = `
    <div class="card">
      <div class="section-head"><h3>Daftar Karyawan</h3><button class="primary" id="addEmployeeBtn">Tambah Karyawan</button></div>
      <div class="filters">
        <input id="empSearch" placeholder="Cari nama, ID, email">
        <select id="empDivision"><option value="">Semua divisi</option>${divisions.map(o => `<option>${o}</option>`).join("")}</select>
        <select id="empStatus"><option value="">Semua status</option><option>Tetap</option><option>Kontrak</option><option>Probation</option></select>
        <button class="secondary" id="resetEmp">Reset Filter</button>
      </div>
      <div id="employeeTable"></div>
    </div>`;
  $("#addEmployeeBtn").addEventListener("click", () => showEmployeeForm());
  ["empSearch", "empDivision", "empStatus"].forEach(id => $(`#${id}`).addEventListener("input", () => { employeePage = 1; drawEmployeeTable(); }));
  $("#resetEmp").addEventListener("click", () => { $("#empSearch").value = ""; $("#empDivision").value = ""; $("#empStatus").value = ""; drawEmployeeTable(); });
  drawEmployeeTable();
}

function drawEmployeeTable() {
  const q = $("#empSearch").value.toLowerCase();
  const div = $("#empDivision").value;
  const stat = $("#empStatus").value;
  const filtered = state.employees.filter(e =>
    (!q || [e.id, e.name, e.email, e.position].join(" ").toLowerCase().includes(q)) &&
    (!div || e.division === div) && (!stat || e.status === stat)
  );
  const per = 6, pages = Math.max(1, Math.ceil(filtered.length / per));
  employeePage = Math.min(employeePage, pages);
  const rows = filtered.slice((employeePage - 1) * per, employeePage * per).map(e => `
    <tr>
      <td><div class="person"><span class="avatar">${initials(e.name)}</span>${e.name}</div></td><td>${e.id}</td><td>${e.division}</td><td>${e.position}</td>
      <td>${e.email}</td><td>${e.phone}</td><td>${formatDate(e.joinDate)}</td><td>${badge(e.status)}</td>
      <td class="actions"><button class="secondary" onclick="showEmployeeDetail('${e.id}')">Detail</button><button class="warning" onclick="showEmployeeForm('${e.id}')">Edit</button><button class="danger" onclick="confirmDeleteEmployee('${e.id}')">Hapus</button></td>
    </tr>`).join("");
  $("#employeeTable").innerHTML = `<div class="table-wrap"><table><thead><tr><th>Nama</th><th>ID</th><th>Divisi</th><th>Jabatan</th><th>Email</th><th>Telepon</th><th>Tanggal Masuk</th><th>Status</th><th>Aksi</th></tr></thead><tbody>${rows || `<tr><td colspan="9">Data tidak ditemukan.</td></tr>`}</tbody></table></div>
    <div class="pager"><button class="secondary" onclick="changeEmployeePage(-1)" ${employeePage <= 1 ? "disabled" : ""}>Sebelumnya</button><span>Halaman ${employeePage} dari ${pages}</span><button class="secondary" onclick="changeEmployeePage(1)" ${employeePage >= pages ? "disabled" : ""}>Berikutnya</button></div>`;
}

function changeEmployeePage(delta) {
  employeePage += delta;
  drawEmployeeTable();
}

function showEmployeeForm(id) {
  const e = state.employees.find(x => x.id === id) || {};
  openModal(id ? "Edit Karyawan" : "Tambah Karyawan", `
    <form id="employeeForm" class="form-grid">
      ${input("id", "ID Karyawan", e.id || nextId("EMP", state.employees.length + 1))}
      ${input("name", "Nama lengkap", e.name || "")}
      ${input("birthPlace", "Tempat lahir", e.birthPlace || "")}
      ${input("birthDate", "Tanggal lahir", e.birthDate || "", "date")}
      ${select("gender", "Jenis kelamin", ["Laki-laki", "Perempuan"], e.gender)}
      ${input("email", "Email", e.email || "", "email")}
      ${input("phone", "Nomor telepon", e.phone || "")}
      ${select("division", "Divisi", ["Human Resource", "Finance", "Information Technology", "Marketing", "Operations", "Warehouse"], e.division)}
      ${input("position", "Jabatan", e.position || "")}
      ${input("joinDate", "Tanggal masuk", e.joinDate || today, "date")}
      ${select("status", "Status kerja", ["Tetap", "Kontrak", "Probation"], e.status)}
      ${input("leaveBalance", "Sisa cuti", e.leaveBalance ?? 12, "number")}
      <label class="wide">Alamat<textarea name="address">${e.address || ""}</textarea></label>
      <label class="wide">Foto profil<input name="photo" type="file" accept="image/*"></label>
      <div class="actions wide"><button class="primary">Simpan</button><button type="button" class="secondary" onclick="closeModal()">Batal</button></div>
    </form>`);
  $("#employeeForm").addEventListener("submit", (ev) => saveEmployee(ev, id));
}

function saveEmployee(ev, oldId) {
  ev.preventDefault();
  const data = Object.fromEntries(new FormData(ev.target).entries());
  delete data.photo;
  if (!data.id || !data.name || !data.email || !data.division || !data.position) return toast("Lengkapi data wajib karyawan.", true);
  data.leaveBalance = Number(data.leaveBalance || 0);
  if (oldId) state.employees = state.employees.map(e => e.id === oldId ? { ...e, ...data } : e);
  else state.employees.push(data);
  saveState(); closeModal(); toast("Data karyawan berhasil disimpan."); renderEmployees();
}

function showEmployeeDetail(id) {
  const e = state.employees.find(x => x.id === id);
  openModal("Detail Karyawan", `<div class="profile-layout"><div class="card"><span class="avatar big">${initials(e.name)}</span><h3>${e.name}</h3><p>${e.position}<br>${e.division}</p>${badge(e.status)}</div><div class="grid">${Object.entries({
    "ID Karyawan": e.id, Email: e.email, Telepon: e.phone, "Tempat/Tanggal Lahir": `${e.birthPlace}, ${formatDate(e.birthDate)}`, "Jenis Kelamin": e.gender, Alamat: e.address, "Tanggal Masuk": formatDate(e.joinDate), "Sisa Cuti": `${e.leaveBalance} hari`
  }).map(([k, v]) => info(k, v)).join("")}</div></div>`);
}
function confirmDeleteEmployee(id) {
  openModal("Konfirmasi Hapus", `<p>Data karyawan ${id} akan dihapus dari prototype.</p><div class="actions"><button class="danger" id="deleteNow">Hapus</button><button class="secondary" onclick="closeModal()">Batal</button></div>`);
  $("#deleteNow").addEventListener("click", () => { state.employees = state.employees.filter(e => e.id !== id); saveState(); closeModal(); toast("Data karyawan dihapus."); renderEmployees(); });
}

function renderAttendance() {
  const counts = countAttendance();
  $("#content").innerHTML = `
    <div class="grid cards">${["Hadir","Terlambat","Izin","Sakit","Tidak hadir"].map(s => metric(s, counts[s] || 0, "Hari ini")).join("")}</div>
    <div class="card">
      <div class="section-head"><h3>Tabel Absensi</h3><div class="actions"><button class="primary" id="manualAttendance">Tambah Manual</button><button class="secondary" onclick="fakeExport('Laporan absensi')">Ekspor Laporan</button></div></div>
      <div class="filters"><input id="attDate" type="date" value="${today}"><input id="attName" placeholder="Cari karyawan"><select id="attStatus"><option value="">Semua status</option>${["Hadir","Terlambat","Izin","Sakit","Tidak hadir"].map(s => `<option>${s}</option>`).join("")}</select><button class="secondary" id="attReset">Reset</button></div>
      <div id="attendanceTable"></div>
    </div>`;
  ["attDate", "attName", "attStatus"].forEach(id => $(`#${id}`).addEventListener("input", drawAttendanceTable));
  $("#attReset").addEventListener("click", () => { $("#attDate").value = ""; $("#attName").value = ""; $("#attStatus").value = ""; drawAttendanceTable(); });
  $("#manualAttendance").addEventListener("click", showAttendanceForm);
  drawAttendanceTable();
}
function drawAttendanceTable() {
  const d = $("#attDate").value, q = $("#attName").value.toLowerCase(), s = $("#attStatus").value;
  const rows = state.attendance.filter(a => (!d || a.date === d) && (!q || `${a.employeeId} ${a.name}`.toLowerCase().includes(q)) && (!s || a.status === s));
  $("#attendanceTable").innerHTML = attendanceTable(rows);
}
function attendanceTable(rows) {
  return `<div class="table-wrap"><table><thead><tr><th>Tanggal</th><th>ID</th><th>Nama</th><th>Jam Masuk</th><th>Jam Pulang</th><th>Total</th><th>Status</th><th>Keterangan</th></tr></thead><tbody>${rows.map(a => `<tr><td>${formatDate(a.date)}</td><td>${a.employeeId}</td><td>${a.name}</td><td>${a.in}</td><td>${a.out}</td><td>${a.total}</td><td>${badge(a.status)}</td><td>${a.note}</td></tr>`).join("") || `<tr><td colspan="8">Belum ada data.</td></tr>`}</tbody></table></div>`;
}
function showAttendanceForm() {
  openModal("Tambah Absensi Manual", `<form id="attendanceForm" class="form-grid">
    ${input("date", "Tanggal", today, "date")}${select("employeeId", "Karyawan", state.employees.map(e => `${e.id} - ${e.name}`))}
    ${input("in", "Jam masuk", "08:00", "time")}${input("out", "Jam pulang", "17:00", "time")}
    ${select("status", "Status", ["Hadir","Terlambat","Izin","Sakit","Tidak hadir"])}${input("note", "Keterangan", "-")}
    <div class="actions wide"><button class="primary">Simpan</button><button type="button" class="secondary" onclick="closeModal()">Batal</button></div></form>`);
  $("#attendanceForm").addEventListener("submit", (e) => {
    e.preventDefault();
    const data = Object.fromEntries(new FormData(e.target).entries());
    const emp = state.employees.find(x => data.employeeId.startsWith(x.id));
    state.attendance.push({ ...data, employeeId: emp.id, name: emp.name, total: "9j", key: Date.now().toString() });
    saveState(); closeModal(); toast("Absensi manual tersimpan."); renderAttendance();
  });
}

function renderLeaves() {
  const isEmployee = session.role === "Karyawan";
  $("#content").innerHTML = `
    <div class="card">
      <div class="section-head"><h3>Pengajuan Cuti</h3><div class="actions">${isEmployee ? `<button class="primary" id="leaveAdd">Ajukan Cuti</button>` : ""}<button class="secondary" onclick="fakeExport('Laporan cuti')">Ekspor</button></div></div>
      ${isEmployee ? `<p>Sisa cuti: <strong>${currentEmployee().leaveBalance} hari</strong></p>` : ""}
      <div class="filters"><select id="leaveStatus"><option value="">Semua status</option><option>Menunggu</option><option>Disetujui</option><option>Ditolak</option></select><input id="leaveDate" type="date"><button class="secondary" id="leaveReset">Reset</button></div>
      <div id="leaveTable"></div>
    </div>`;
  $("#leaveStatus").addEventListener("input", drawLeaveTable);
  $("#leaveDate").addEventListener("input", drawLeaveTable);
  $("#leaveReset").addEventListener("click", () => { $("#leaveStatus").value = ""; $("#leaveDate").value = ""; drawLeaveTable(); });
  if (isEmployee) $("#leaveAdd").addEventListener("click", showLeaveForm);
  drawLeaveTable();
}
function drawLeaveTable() {
  const s = $("#leaveStatus").value, d = $("#leaveDate").value, emp = session.role === "Karyawan" ? currentEmployee() : null;
  const rows = state.leaves.filter(l => (!emp || l.employeeId === emp.id) && (!s || l.status === s) && (!d || l.requestDate === d));
  $("#leaveTable").innerHTML = leaveTable(rows);
}
function leaveTable(rows) {
  const admin = session.role !== "Karyawan";
  return `<div class="table-wrap"><table><thead><tr><th>Nama</th><th>Jenis</th><th>Mulai</th><th>Selesai</th><th>Hari</th><th>Alasan</th><th>Status</th><th>Tanggal Pengajuan</th><th>Aksi</th></tr></thead><tbody>${rows.map(l => `<tr><td>${l.name}</td><td>${l.type}</td><td>${formatDate(l.start)}</td><td>${formatDate(l.end)}</td><td>${l.days}</td><td>${l.reason}</td><td>${badge(l.status)}</td><td>${formatDate(l.requestDate)}</td><td class="actions">${admin && l.status === "Menunggu" ? `<button class="success" onclick="reviewLeave('${l.id}','Disetujui')">Setujui</button><button class="danger" onclick="reviewLeave('${l.id}','Ditolak')">Tolak</button>` : ""}${!admin && l.status === "Menunggu" ? `<button class="danger" onclick="cancelLeave('${l.id}')">Batalkan</button>` : "-"}</td></tr>`).join("") || `<tr><td colspan="9">Belum ada pengajuan.</td></tr>`}</tbody></table></div>`;
}
function showLeaveForm() {
  const emp = currentEmployee();
  openModal("Ajukan Cuti", `<form id="leaveForm" class="form-grid">
    ${select("type", "Jenis cuti", ["Cuti tahunan","Cuti sakit","Cuti melahirkan","Cuti menikah","Cuti lainnya"])}
    ${input("start", "Tanggal mulai", today, "date")}${input("end", "Tanggal selesai", today, "date")}
    <label class="wide">Alasan<textarea name="reason" required></textarea></label>
    <div class="actions wide"><button class="primary">Kirim Pengajuan</button><button type="button" class="secondary" onclick="closeModal()">Batal</button></div></form>`);
  $("#leaveForm").addEventListener("submit", (e) => {
    e.preventDefault();
    const data = Object.fromEntries(new FormData(e.target).entries());
    if (!data.reason) return toast("Alasan cuti wajib diisi.", true);
    const days = Math.max(1, Math.round((new Date(data.end) - new Date(data.start)) / 86400000) + 1);
    state.leaves.unshift({ id: nextId("LV", state.leaves.length + 1), employeeId: emp.id, name: emp.name, days, status: "Menunggu", requestDate: today, note: "", ...data });
    saveState(); closeModal(); toast("Pengajuan cuti dikirim."); navigate("leaves");
  });
}
function reviewLeave(id, status) {
  openModal(`${status} Cuti`, `<label>Catatan<textarea id="reviewNote" placeholder="Tulis catatan approval"></textarea></label><div class="actions"><button class="primary" id="saveReview">Simpan</button><button class="secondary" onclick="closeModal()">Batal</button></div>`);
  $("#saveReview").addEventListener("click", () => { const item = state.leaves.find(l => l.id === id); item.status = status; item.note = $("#reviewNote").value; saveState(); closeModal(); toast(`Pengajuan cuti ${status.toLowerCase()}.`); renderLeaves(); });
}
function cancelLeave(id) { state.leaves = state.leaves.filter(l => l.id !== id); saveState(); toast("Pengajuan cuti dibatalkan."); renderLeaves(); }

function renderHistory() {
  $("#content").innerHTML = `<div class="card"><div class="section-head"><h3>Riwayat Karier</h3><button class="primary" id="addHistory">Tambah Riwayat</button></div>
    <div class="filters"><input id="histName" placeholder="Cari karyawan"><select id="histType"><option value="">Semua perubahan</option>${["Promosi","Mutasi","Rotasi","Perubahan jabatan","Perpanjangan kontrak"].map(x => `<option>${x}</option>`).join("")}</select></div><div id="historyTable"></div></div>
    <div class="card"><h3>Timeline Riwayat Karier</h3><div class="timeline">${state.histories.map(h => `<div class="timeline-item"><strong>${h.name}</strong><p>${h.prev} menjadi ${h.now} - ${h.type}</p><small>${formatDate(h.start)} | ${h.note}</small></div>`).join("")}</div></div>`;
  $("#addHistory").addEventListener("click", showHistoryForm);
  $("#histName").addEventListener("input", drawHistoryTable);
  $("#histType").addEventListener("input", drawHistoryTable);
  drawHistoryTable();
}
function drawHistoryTable() {
  const q = $("#histName").value.toLowerCase(), t = $("#histType").value;
  const rows = state.histories.filter(h => (!q || h.name.toLowerCase().includes(q)) && (!t || h.type === t));
  $("#historyTable").innerHTML = `<div class="table-wrap"><table><thead><tr><th>Nama</th><th>Jabatan Sebelumnya</th><th>Jabatan Sekarang</th><th>Divisi</th><th>Mulai</th><th>Selesai</th><th>Jenis</th><th>Catatan</th></tr></thead><tbody>${rows.map(h => `<tr><td>${h.name}</td><td>${h.prev}</td><td>${h.now}</td><td>${h.division}</td><td>${formatDate(h.start)}</td><td>${h.end}</td><td>${h.type}</td><td>${h.note}</td></tr>`).join("")}</tbody></table></div>`;
}
function showHistoryForm() {
  openModal("Tambah Riwayat Kerja", `<form id="historyForm" class="form-grid">
    ${select("name", "Karyawan", state.employees.map(e => e.name))}${input("prev", "Jabatan sebelumnya")}${input("now", "Jabatan sekarang")}
    ${select("division", "Divisi", unique(state.employees.map(e => e.division)))}${input("start", "Tanggal mulai", today, "date")}${input("end", "Tanggal selesai")}
    ${select("type", "Jenis perubahan", ["Promosi","Mutasi","Rotasi","Perubahan jabatan","Perpanjangan kontrak"])}
    <label class="wide">Catatan<textarea name="note"></textarea></label><div class="actions wide"><button class="primary">Simpan</button></div></form>`);
  $("#historyForm").addEventListener("submit", (e) => { e.preventDefault(); state.histories.unshift(Object.fromEntries(new FormData(e.target).entries())); saveState(); closeModal(); toast("Riwayat kerja ditambahkan."); renderHistory(); });
}

function renderReports() {
  $("#content").innerHTML = `<div class="card"><div class="section-head"><h3>Generator Laporan</h3><div class="actions"><button class="primary" onclick="window.print()">Cetak</button><button class="secondary" onclick="fakeExport('PDF')">Unduh PDF</button><button class="secondary" onclick="fakeExport('Excel')">Ekspor Excel</button></div></div>
    <div class="filters"><select id="reportType"><option>Laporan data karyawan</option><option>Laporan absensi</option><option>Laporan keterlambatan</option><option>Laporan cuti</option><option>Laporan riwayat kerja</option></select><input type="month" id="reportPeriod" value="2026-07"><select id="reportDivision"><option value="">Semua divisi</option>${unique(state.employees.map(e => e.division)).map(d => `<option>${d}</option>`).join("")}</select><select id="reportStatus"><option value="">Semua status</option><option>Hadir</option><option>Menunggu</option><option>Disetujui</option><option>Ditolak</option></select></div></div>
    <div class="card"><h3>Preview Laporan</h3><div id="reportPreview"></div></div>`;
  ["reportType","reportPeriod","reportDivision","reportStatus"].forEach(id => $(`#${id}`).addEventListener("input", drawReport));
  drawReport();
}
function drawReport() {
  const type = $("#reportType").value;
  $("#reportPreview").innerHTML = type.includes("karyawan") ? employeeReport() : type.includes("cuti") ? leaveTable(state.leaves) : type.includes("riwayat") ? `<div class="timeline">${state.histories.map(h => `<div class="timeline-item"><strong>${h.name}</strong><p>${h.type}: ${h.prev} ke ${h.now}</p></div>`).join("")}</div>` : attendanceTable(state.attendance);
}
function employeeReport() {
  return `<div class="table-wrap"><table><thead><tr><th>ID</th><th>Nama</th><th>Divisi</th><th>Jabatan</th><th>Status</th></tr></thead><tbody>${state.employees.map(e => `<tr><td>${e.id}</td><td>${e.name}</td><td>${e.division}</td><td>${e.position}</td><td>${badge(e.status)}</td></tr>`).join("")}</tbody></table></div>`;
}

function renderUsers() {
  $("#content").innerHTML = `<div class="card"><div class="section-head"><h3>Manajemen User dan Role</h3></div><div class="table-wrap"><table><thead><tr><th>Nama</th><th>Email</th><th>Role</th><th>Status Akun</th><th>Terakhir Login</th><th>Aksi</th></tr></thead><tbody>${state.users.map((u, i) => `<tr><td>${u.name}</td><td>${u.email}</td><td>${u.role}</td><td>${badge(u.status)}</td><td>${u.lastLogin}</td><td class="actions"><button class="warning" onclick="editUser(${i})">Edit</button><button class="danger" onclick="toggleUser(${i})">${u.status === "Aktif" ? "Nonaktifkan" : "Aktifkan"}</button></td></tr>`).join("")}</tbody></table></div></div>
    <div class="grid two"><div class="card"><h3>Hak Akses Role</h3>${["Admin HR dapat mengakses seluruh fitur.","Staff HR mengelola data karyawan, absensi, cuti, dan laporan.","Manager melihat laporan dan menyetujui cuti.","Karyawan melihat profil sendiri, absensi, dan mengajukan cuti."].map(x => `<p>${x}</p>`).join("")}</div><div class="card"><h3>Status Sistem</h3>${info("Jumlah user", state.users.length)}${info("Role aktif", "Admin HR, Staff HR, Manager, Karyawan")}</div></div>`;
}
function editUser(i) {
  const u = state.users[i];
  openModal("Edit User", `<form id="userForm" class="form-grid">${input("name", "Nama", u.name)}${input("email", "Email", u.email, "email")}${select("role", "Role", ["Admin HR","Staff HR","Karyawan","Manager"], u.role)}${select("status", "Status", ["Aktif","Nonaktif"], u.status)}<div class="actions wide"><button class="primary">Simpan</button></div></form>`);
  $("#userForm").addEventListener("submit", (e) => { e.preventDefault(); state.users[i] = { ...u, ...Object.fromEntries(new FormData(e.target).entries()) }; saveState(); closeModal(); toast("User diperbarui."); renderUsers(); });
}
function toggleUser(i) { state.users[i].status = state.users[i].status === "Aktif" ? "Nonaktif" : "Aktif"; saveState(); toast("Status akun diperbarui."); renderUsers(); }

function renderSettings() {
  const s = state.settings;
  $("#content").innerHTML = `<form id="settingsForm" class="grid two"><div class="card"><h3>Informasi Perusahaan</h3><div class="form-grid">${input("company","Nama perusahaan",s.company)}${input("email","Email",s.email,"email")}${input("phone","Nomor telepon",s.phone)}<label>Logo perusahaan<input type="file" name="logo"></label><label class="wide">Alamat<textarea name="address">${s.address}</textarea></label></div></div>
    <div class="card"><h3>Pengaturan HR</h3><div class="form-grid">${input("clockIn","Jam masuk",s.clockIn,"time")}${input("clockOut","Jam pulang",s.clockOut,"time")}${input("lateLimit","Batas keterlambatan",s.lateLimit,"time")}${input("annualLeave","Cuti tahunan",s.annualLeave,"number")}</div><div class="switch-line"><span>Notifikasi email</span><input type="checkbox" name="notifyEmail" ${s.notifyEmail ? "checked" : ""}></div><div class="switch-line"><span>Notifikasi aplikasi</span><input type="checkbox" name="notifyApp" ${s.notifyApp ? "checked" : ""}></div><div class="switch-line"><span>Mode terang/gelap</span><button type="button" class="secondary" onclick="toggleTheme()">Ubah Mode</button></div></div>
    <div class="card"><h3>Ganti Password</h3><div class="form-grid">${input("oldPass","Password lama","","password")}${input("newPass","Password baru","","password")}</div></div><div class="actions"><button class="primary">Simpan Pengaturan</button></div></form>`;
  $("#settingsForm").addEventListener("submit", (e) => { e.preventDefault(); const data = Object.fromEntries(new FormData(e.target).entries()); delete data.logo; state.settings = { ...state.settings, ...data, notifyEmail: !!data.notifyEmail, notifyApp: !!data.notifyApp }; saveState(); toast("Pengaturan berhasil disimpan."); });
}

function renderProfile() {
  const emp = currentEmployee();
  $("#content").innerHTML = `<div class="profile-layout"><div class="card"><span class="avatar big">${initials(emp.name)}</span><h3>${emp.name}</h3><p>${emp.id}<br>${emp.position}<br>${emp.division}</p>${badge(emp.status)}<p>Sisa cuti: <strong>${emp.leaveBalance} hari</strong></p></div>
    <div class="card"><h3>Informasi Profil</h3><div class="grid two">${info("Email", emp.email)}${info("Nomor telepon", emp.phone)}${info("Alamat", emp.address)}${info("Tanggal masuk", formatDate(emp.joinDate))}</div></div></div>
    <div class="grid three"><div class="card"><h3>Riwayat Absensi</h3>${attendanceTable(state.attendance.filter(a => a.employeeId === emp.id))}</div><div class="card"><h3>Riwayat Cuti</h3>${leaveTable(state.leaves.filter(l => l.employeeId === emp.id))}</div><div class="card"><h3>Riwayat Jabatan</h3><div class="timeline">${state.histories.filter(h => h.name === emp.name).map(h => `<div class="timeline-item"><strong>${h.type}</strong><p>${h.prev} ke ${h.now}</p></div>`).join("") || "<p>Belum ada riwayat jabatan.</p>"}</div></div></div>`;
}

function renderAgile() {
  $("#content").innerHTML = `<div class="grid two"><div class="card"><h3>Crystal Team</h3>${[
    ["Project Manager","Mengatur scope, jadwal, komunikasi, dan evaluasi sprint."],["UI/UX Designer","Mendesain alur, wireframe, dan tampilan dashboard."],["Frontend Developer","Membangun prototype HTML, CSS, dan JavaScript."],["Backend Developer","Merancang API dan validasi data pada rancangan sistem."],["Database Engineer","Mendesain struktur data karyawan, absensi, cuti, dan user."],["Software Tester","Menguji fungsi, responsif, validasi, dan skenario demo."]
  ].map(([r,d]) => `<p><strong>${r}</strong><br>${d}</p>`).join("")}<p>Komunikasi tim dilakukan melalui standup harian singkat, board Kanban, dan review sprint.</p></div>
  <div class="card"><h3>Scrum Sprint Planning</h3>${["Sprint 1: Analisis kebutuhan, login, dan desain dashboard","Sprint 2: Data karyawan dan manajemen user","Sprint 3: Absensi dan riwayat kerja","Sprint 4: Pengajuan dan approval cuti","Sprint 5: Laporan, testing, dan evaluasi"].map((s,i) => `<p><strong>${s}</strong><br>Durasi: 1 minggu | Target: modul siap demo | Status: ${badge(i < 4 ? "Disetujui" : "Menunggu")}</p>`).join("")}</div></div>
  <div class="card"><div class="section-head"><h3>Kanban Board</h3><button class="secondary" onclick="saveState(); toast('Board Kanban disimpan.')">Simpan Board</button></div><div class="kanban">${Object.entries(state.kanban).map(([col,tasks]) => `<div class="kanban-col" data-col="${col}"><h4>${col}</h4>${tasks.map(t => `<div class="task-card" draggable="true">${t}</div>`).join("")}</div>`).join("")}</div></div>
  <div class="card"><h3>Product Backlog</h3>${backlogTable()}</div>`;
  initKanban();
}
function backlogTable() {
  const features = ["Login role pengguna","Dashboard Admin HR","Dashboard Karyawan","CRUD data karyawan","Pencarian karyawan","Filter absensi","Absen masuk/pulang","Cuti tahunan","Approval cuti","Riwayat jabatan","Laporan absensi","Ekspor laporan","Manajemen user","Mode gelap","Responsive mobile"];
  return `<div class="table-wrap"><table><thead><tr><th>ID</th><th>User Story</th><th>Fitur</th><th>Prioritas</th><th>Estimasi</th><th>Sprint</th><th>PIC</th><th>Status</th></tr></thead><tbody>${features.map((f,i) => `<tr><td>BL-${String(i+1).padStart(2,"0")}</td><td>Sebagai pengguna, saya ingin ${f.toLowerCase()} agar proses HR lebih mudah.</td><td>${f}</td><td>${badge(i < 6 ? "High" : i < 11 ? "Medium" : "Low")}</td><td>${i % 3 + 2} poin</td><td>Sprint ${Math.min(5, Math.floor(i/3)+1)}</td><td>${["PM","UI/UX","Frontend","Tester"][i%4]}</td><td>${badge(i < 12 ? "Disetujui" : "Menunggu")}</td></tr>`).join("")}</tbody></table></div>`;
}
function initKanban() {
  let dragged = null;
  $$(".task-card").forEach(card => {
    card.addEventListener("dragstart", () => { dragged = card; card.classList.add("dragging"); });
    card.addEventListener("dragend", () => { card.classList.remove("dragging"); persistKanban(); });
  });
  $$(".kanban-col").forEach(col => {
    col.addEventListener("dragover", e => e.preventDefault());
    col.addEventListener("drop", () => { if (dragged) col.appendChild(dragged); });
  });
}
function persistKanban() {
  state.kanban = {};
  $$(".kanban-col").forEach(col => state.kanban[col.dataset.col] = [...col.querySelectorAll(".task-card")].map(c => c.textContent));
  saveState();
}

function clockIn() {
  const emp = currentEmployee();
  const exists = state.attendance.find(a => a.employeeId === emp.id && a.date === today);
  if (exists && exists.in !== "-") return toast("Anda sudah absen masuk hari ini.", true);
  const time = new Date().toLocaleTimeString("id-ID", { hour: "2-digit", minute: "2-digit" });
  state.attendance.push({ date: today, employeeId: emp.id, name: emp.name, in: time, out: "-", total: "-", status: time > state.settings.lateLimit ? "Terlambat" : "Hadir", note: "Absen mandiri", key: Date.now().toString() });
  saveState(); toast("Absen masuk berhasil."); renderDashboard();
}
function clockOut() {
  const emp = currentEmployee();
  const item = state.attendance.find(a => a.employeeId === emp.id && a.date === today);
  if (!item || item.in === "-") return toast("Lakukan absen masuk terlebih dahulu.", true);
  if (item.out !== "-") return toast("Anda sudah absen pulang hari ini.", true);
  item.out = new Date().toLocaleTimeString("id-ID", { hour: "2-digit", minute: "2-digit" });
  item.total = "Tercatat";
  saveState(); toast("Absen pulang berhasil."); renderDashboard();
}

function metric(label, value, hint) { return `<div class="card metric"><span>${label}</span><strong>${value}</strong><small>${hint}</small></div>`; }
function dashboardMetric(label, value, hint, icon) { return `<article class="dashboard-metric"><div><span>${label}</span><small>${hint}</small></div><strong>${value}</strong><i data-lucide="${icon}" aria-hidden="true"></i></article>`; }
function listCard(title, items) { return `<div class="card"><h3>${title}</h3>${items.map(i => `<p>${i}</p>`).join("")}</div>`; }
function info(k, v) { return `<div class="card"><span style="color:var(--muted);font-weight:700">${k}</span><p style="margin:8px 0 0;font-weight:800">${v || "-"}</p></div>`; }
function input(name, label, value = "", type = "text") { return `<label>${label}<input name="${name}" type="${type}" value="${value ?? ""}"></label>`; }
function select(name, label, options, selected = "") { return `<label>${label}<select name="${name}">${options.map(o => `<option ${o === selected ? "selected" : ""}>${o}</option>`).join("")}</select></label>`; }
function formatDate(value) { return value && value !== "-" ? new Date(value).toLocaleDateString("id-ID", { day: "2-digit", month: "short", year: "numeric" }) : "-"; }
function unique(arr) { return [...new Set(arr)].sort(); }
function countAttendance() { return state.attendance.reduce((a, x) => (a[x.status] = (a[x.status] || 0) + 1, a), {}); }
function nextId(prefix, n) { return `${prefix}${String(n).padStart(3, "0")}`; }
function currentEmployee() { return state.employees.find(e => e.email === session.email) || state.employees[0]; }
function barChart() {
  const vals = [72, 76, 81, 78, 86, 84, 89, 91, 88, 92, 90, 94], months = ["Jan","Feb","Mar","Apr","Mei","Jun","Jul","Agu","Sep","Okt","Nov","Des"];
  return `<div class="chart-bars">${vals.map((v,i) => `<div class="bar"><i style="height:${v * 2}px"></i><span>${months[i]}</span></div>`).join("")}</div>`;
}
function bindPageLinks() { $$("[data-page-link]").forEach(b => b.addEventListener("click", () => navigate(b.dataset.pageLink))); }
function fakeExport(type) { toast(`${type} berhasil dibuat untuk prototype.`); }

window.showEmployeeDetail = showEmployeeDetail;
window.showEmployeeForm = showEmployeeForm;
window.confirmDeleteEmployee = confirmDeleteEmployee;
window.closeModal = closeModal;
window.reviewLeave = reviewLeave;
window.cancelLeave = cancelLeave;
window.fakeExport = fakeExport;
window.drawEmployeeTable = drawEmployeeTable;
window.changeEmployeePage = changeEmployeePage;
window.showHistoryForm = showHistoryForm;
window.editUser = editUser;
window.toggleUser = toggleUser;
window.toggleTheme = toggleTheme;

init();
