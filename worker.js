/* Sổ học: giao diện và API trong một file. Cần binding DB và secret APP_PASSWORD. */
const PAGE = String.raw`<!doctype html>
<html lang="vi">
<head>
<meta charset="UTF-8"><meta name="viewport" content="width=device-width, initial-scale=1">
<title>Sổ học • Ghi một chút, nhớ lâu hơn</title>
<style nonce="__NONCE__">
:root{color-scheme:light;--bg:#f6f5ef;--paper:#fffef9;--ink:#243a32;--muted:#6b746d;--line:#dedfd5;--green:#275c46;--soft:#e6eddf;--red:#a1372d}*{box-sizing:border-box}body{margin:0;background:var(--bg);color:var(--ink);font:15px/1.6 system-ui,-apple-system,sans-serif}button,input,textarea{font:inherit}button{cursor:pointer;border:1px solid var(--line);border-radius:9px;background:var(--paper);color:var(--ink);padding:9px 14px;font-weight:600}button:hover{background:var(--soft)}button:disabled{opacity:.5;cursor:wait}button.primary{background:var(--green);color:white;border-color:var(--green)}button.danger{color:var(--red)}input,textarea{border:1px solid var(--line);border-radius:8px;background:var(--paper);color:var(--ink);padding:11px;width:100%}input:focus,textarea:focus{outline:2px solid #80a88b;outline-offset:2px}button:focus-visible,a:focus-visible{outline:3px solid #80a88b;outline-offset:3px}[hidden]{display:none!important}.muted{color:var(--muted)}.eyebrow{font-size:11px;font-weight:700;letter-spacing:2px;text-transform:uppercase}.brand{font-size:25px;letter-spacing:-1px;font-weight:800}.brand span{color:#68865c}.top{height:84px;padding:0 32px;border-bottom:1px solid var(--line);display:flex;align-items:center;justify-content:space-between;gap:20px}.top-right{display:flex;align-items:center;gap:12px}.layout{display:grid;grid-template-columns:235px 310px minmax(0,1fr);min-height:calc(100dvh - 84px)}aside{padding:28px 20px;border-right:1px solid var(--line)}.intro{font-family:Georgia,serif;font-size:26px;line-height:1.3;margin:15px 0 24px}.wide{width:100%}.subject-list{display:grid;gap:5px;margin:12px 0 28px}.subject-btn{display:flex;justify-content:space-between;align-items:center;border-color:transparent;background:transparent;text-align:left;gap:8px}.subject-btn span:first-child{overflow-wrap:anywhere}.subject-btn.active{background:var(--soft);color:var(--green)}.badge{font-size:12px;color:var(--muted);font-weight:400}.sidebar-foot{font-size:12px;border-top:1px solid var(--line);padding-top:18px}.notes-pane{padding:24px 18px;border-right:1px solid var(--line)}.list-head{display:flex;justify-content:space-between;align-items:center;margin-bottom:16px}.list-head h2{font-size:15px;margin:0;overflow-wrap:anywhere}.search{margin-bottom:18px}.note-list{display:grid;gap:9px}.note-card{width:100%;text-align:left;padding:16px;background:transparent}.note-card.active{background:var(--paper);border-color:#91ab8b;box-shadow:0 3px 10px #273c3010}.note-card strong{display:block;margin:6px 0;font-size:15px;overflow-wrap:anywhere}.note-card .excerpt{font-size:12px;font-weight:400;color:var(--muted);display:-webkit-box;-webkit-line-clamp:2;-webkit-box-orient:vertical;overflow:hidden;overflow-wrap:anywhere;white-space:pre-line}.note-card .tag{font-size:10px;letter-spacing:.8px;color:var(--green);text-transform:uppercase;overflow-wrap:anywhere}.note-card time{display:block;font-size:10px;color:var(--muted);font-weight:400;margin-top:12px}.empty-list{font-size:13px;padding:14px 2px;color:var(--muted)}main{padding:30px clamp(20px,4vw,64px);min-width:0}.editor-top{display:flex;align-items:center;justify-content:space-between;gap:14px;margin-bottom:28px}.status{font-size:12px;color:var(--muted)}.actions{display:flex;gap:8px;flex-wrap:wrap}.subject-input{max-width:280px;margin-bottom:18px;font-size:13px}.field-label{display:block;font-size:12px;color:var(--muted);margin-bottom:5px}.title-input{font-size:clamp(25px,3vw,38px);font-family:Georgia,serif;font-weight:bold;padding:8px 0;border:0;background:transparent;margin-bottom:20px;line-height:1.3}.content-input{display:block;min-height:430px;height:calc(100dvh - 405px);resize:vertical;border:0;border-radius:0;background:repeating-linear-gradient(transparent,transparent 31px,#dee4d6 31px,#dee4d6 32px);font-size:16px;line-height:32px;padding:0 4px}.editor-bottom{border-top:1px solid var(--line);margin-top:25px;padding-top:16px;display:flex;gap:14px;justify-content:space-between;align-items:center;font-size:12px}.welcome{max-width:420px;margin:12vh auto;text-align:center}.welcome-icon{font-size:52px;color:#557e59}.welcome h1{font-family:Georgia,serif;font-size:36px;line-height:1.2;font-weight:500}.welcome p{color:var(--muted);margin-bottom:26px}.login-wrap{min-height:100dvh;display:grid;place-items:center;padding:24px}.login-card{max-width:420px;width:100%;padding:38px;border:1px solid var(--line);border-radius:18px;background:var(--paper);box-shadow:0 16px 80px #2445340c}.login-card h1{font:36px/1.2 Georgia,serif;margin:30px 0 15px}.login-card label{display:block;font-size:13px;margin:25px 0 8px}.login-card button{margin-top:16px}.error{color:var(--red);font-size:13px}.toast{position:fixed;bottom:22px;left:50%;transform:translateX(-50%);max-width:90vw;width:max-content;z-index:20;background:#253c31;color:white;padding:13px 20px;border-radius:10px;box-shadow:0 8px 32px #0002;font-size:14px}.note-hint{font-size:11px;color:var(--muted);margin:8px 0 0}#more{margin-top:16px}
@media(min-width:1450px){.layout{grid-template-columns:260px 350px minmax(0,1fr)}main{max-width:1100px;width:100%;margin:auto}}
@media(max-width:1050px){.layout{grid-template-columns:190px 260px minmax(0,1fr)}.top{padding:0 20px}.top .tagline{display:none}main{padding:24px 20px}.editor-top{align-items:flex-start;flex-direction:column}.editor-bottom{align-items:flex-start;flex-direction:column}}
@media(max-width:760px){.top{height:auto;min-height:76px;padding:15px 18px}.top-right{gap:6px}.top-right button{font-size:12px;padding:8px}.layout{display:block}aside{border-right:0;border-bottom:1px solid var(--line);padding:18px}.intro,.sidebar-foot,aside>.eyebrow{display:none}.subject-list{display:flex;overflow:auto;margin:14px 0 0}.subject-btn{white-space:nowrap;flex-shrink:0}.notes-pane{border-right:0;border-bottom:1px solid var(--line);padding:20px 18px}.note-list{grid-template-columns:repeat(auto-fill,minmax(220px,1fr));max-height:290px;overflow:auto}.content-input{min-height:380px;height:55dvh}.editor-top{flex-direction:row;align-items:center}.welcome{margin:45px auto}.login-card{padding:28px}}
</style>
</head>
<body>
<section id="login" class="login-wrap">
 <form id="login-form" class="login-card">
  <div class="brand">sổ học<span>.</span></div><div class="eyebrow muted">Góc học tập của riêng bạn</div>
  <h1>Mỗi trang viết,<br>một điều mới.</h1><p class="muted">Gom bài học về một nơi. Mở sổ và tiếp tục điều bạn đang khám phá.</p>
  <label for="password">Mật khẩu cuốn sổ</label><input id="password" type="password" required autocomplete="current-password" maxlength="1024" placeholder="Nhập mật khẩu của bạn">
  <button id="login-button" class="primary wide">Mở cuốn sổ →</button><p id="login-error" class="error" role="alert"></p>
 </form>
</section>
<section id="app" hidden>
 <header class="top"><div class="brand">sổ học<span>.</span> <span class="eyebrow muted tagline">/ ghi một chút, nhớ lâu hơn</span></div><div class="top-right"><button id="export">↓ Sao lưu JSON</button><button id="logout">Khóa sổ</button></div></header>
 <div class="layout">
  <aside><div class="eyebrow muted">Không gian học tập</div><p class="intro">Kiến thức lớn.<br>Từ những trang nhỏ.</p><button id="new" class="primary wide">＋ Viết ghi chú</button><nav id="subjects" class="subject-list" aria-label="Môn học"></nav><div class="sidebar-foot muted">Thêm môn bằng cách nhập tên môn khi viết ghi chú.<br><br>Lưu xong là có thể mở lại trên thiết bị khác.</div></aside>
  <section class="notes-pane" aria-label="Danh sách ghi chú"><div class="list-head"><h2 id="list-title">Tất cả ghi chú</h2><span class="badge" id="total"></span></div><input id="search" class="search" type="search" placeholder="Tìm trong bài học…" aria-label="Tìm ghi chú"><div id="notes" class="note-list"></div><button id="more" class="wide" hidden>Xem thêm</button></section>
  <main><section id="welcome" class="welcome"><div class="welcome-icon" aria-hidden="true">▤</div><div class="eyebrow muted">Một trang mới đang chờ</div><h1>Hôm nay bạn<br>học được điều gì?</h1><p>Chọn một ghi chú để đọc tiếp, hoặc bắt đầu trang đầu tiên cho môn học của bạn.</p><button id="start" class="primary">＋ Viết trang đầu tiên</button></section>
   <form id="editor" hidden><div class="editor-top"><span id="save-status" class="status" role="status">Bản nháp mới</span><div class="actions"><button id="download" type="button">↓ Tải .md</button><button id="save" class="primary" type="submit">Lưu ghi chú</button></div></div>
    <label for="subject" class="field-label">Môn học</label><input id="subject" class="subject-input" list="subject-options" maxlength="80" required placeholder="Ví dụ: Toán học" autocomplete="off"><datalist id="subject-options"></datalist>
    <label for="title" class="field-label">Tiêu đề bài học</label><input id="title" class="title-input" maxlength="200" required placeholder="Đặt tên cho trang này…" autocomplete="off">
    <label for="content" class="field-label">Nội dung</label><textarea id="content" class="content-input" maxlength="200000" spellcheck="false" placeholder="Ý chính, ví dụ, câu hỏi cần ôn lại…"></textarea>
    <div class="editor-bottom"><span id="word-count" class="muted">0 từ</span><span class="muted">Ctrl / ⌘ + S để lưu</span><button id="delete" class="danger" type="button" hidden>Xóa ghi chú</button></div><p class="note-hint">Văn bản thuần • Có thể viết cú pháp Markdown và tải thành tệp .md. Nhấn Lưu trước khi đóng sổ.</p>
   </form>
  </main>
 </div>
</section>
<div id="toast" class="toast" role="status" hidden></div>
<script nonce="__NONCE__">
const $ = id => document.getElementById(id);
let current = null, dirty = false, busy = false, chosenSubject = '', offset = 0, requestVersion = 0, toastTimer, searchTimer;
function toast(message) { $('toast').textContent = message; $('toast').hidden = false; clearTimeout(toastTimer); toastTimer = setTimeout(() => $('toast').hidden = true, 6500); }
async function api(path, method = 'GET', data) {
 const response = await fetch('/api' + path, { method, headers: data ? {'Content-Type':'application/json'} : {}, body: data ? JSON.stringify(data) : undefined });
 let result; try { result = await response.json(); } catch { throw new Error('Máy chủ chưa trả về dữ liệu hợp lệ.'); }
 if (!response.ok) {
  if (response.status === 401) { $('login').hidden = false; $('app').hidden = true; }
  throw new Error(result.error || 'Không thể kết nối. Thử lại nhé.');
 }
 return result;
}
function on(id, event, handler) { $(id).addEventListener(event, async e => { try { await handler(e); } catch (error) { toast(error.message || 'Mất kết nối. Bản đang viết vẫn còn trên trang này.'); } }); }
function canLeave() { return !busy && (!dirty || confirm('Trang này chưa được lưu. Bỏ các thay đổi để chuyển trang?')); }
function words() { const text = $('content').value.trim(); $('word-count').textContent = (text ? text.split(/\s+/).length : 0) + ' từ · ' + $('content').value.length.toLocaleString('vi-VN') + ' ký tự'; }
function populate(note) {
 current = note; dirty = false; $('welcome').hidden = true; $('editor').hidden = false;
 $('title').value = note?.title || ''; $('subject').value = note?.subject || chosenSubject || ''; $('content').value = note?.content || '';
 $('delete').hidden = !note; $('save-status').textContent = note ? 'Đã lưu · ' + new Date(note.updated_at).toLocaleString('vi-VN') : 'Bản nháp mới'; words();
 for (const card of $('notes').children) card.classList.toggle('active', card.dataset.id === note?.id);
}
function newNote() { if (!canLeave()) return; populate(null); $('editor').scrollIntoView({behavior:'smooth',block:'start'}); $('title').focus(); }
async function subjects() {
 const rows = await api('/subjects'); $('subjects').replaceChildren(); $('subject-options').replaceChildren();
 const total = rows.reduce((sum, row) => sum + row.count, 0); $('total').textContent = total + ' trang';
 for (const row of [{subject:'',count:total}, ...rows]) {
  const button = document.createElement('button'); button.type = 'button'; button.className = 'subject-btn' + (row.subject === chosenSubject ? ' active' : '');
  const name = document.createElement('span'); name.textContent = row.subject || 'Tất cả ghi chú'; const count = document.createElement('span'); count.className = 'badge'; count.textContent = row.count;
  button.append(name, count); button.addEventListener('click', async () => { chosenSubject = row.subject; $('list-title').textContent = row.subject || 'Tất cả ghi chú'; try { await Promise.all([subjects(), list()]); } catch (e) { toast(e.message); } }); $('subjects').append(button);
  if (row.subject) { const option = document.createElement('option'); option.value = row.subject; $('subject-options').append(option); }
 }
}
async function list(append = false) {
 const token = ++requestVersion, nextOffset = append ? offset : 0;
 $('more').disabled = true;
 try {
  const result = await api('/notes?' + new URLSearchParams({q:$('search').value,subject:chosenSubject,offset:nextOffset}));
  if (token !== requestVersion) return;
  if (!append) $('notes').replaceChildren(); offset = nextOffset + result.notes.length;
  for (const note of result.notes) {
   const card = document.createElement('button'); card.type = 'button'; card.dataset.id = note.id; card.className = 'note-card' + (note.id === current?.id ? ' active' : '');
   for (const [tag, cls, value] of [['span','tag',note.subject],['strong','',note.title],['span','excerpt',note.excerpt || 'Chưa có nội dung'],['time','',new Date(note.updated_at).toLocaleDateString('vi-VN',{day:'numeric',month:'long'})]]) { const element = document.createElement(tag); element.className = cls; element.textContent = value; card.append(element); }
   card.addEventListener('click', async () => { if (!canLeave()) return; busy = true; setEditing(true); try { const data = await api('/notes/' + note.id); populate(data); if (innerWidth < 761) $('editor').scrollIntoView({behavior:'smooth'}); } catch (e) { toast(e.message); } finally { busy = false; setEditing(false); } }); $('notes').append(card);
  }
  if (!offset) { const p = document.createElement('p'); p.className = 'empty-list'; p.textContent = $('search').value ? 'Chưa tìm thấy ghi chú phù hợp.' : 'Chưa có trang nào. Bắt đầu bằng một ghi chú nhé.'; $('notes').append(p); }
  $('more').hidden = !result.hasMore;
 } finally { if (token === requestVersion) $('more').disabled = false; }
}
function setEditing(disabled) { for (const id of ['title','subject','content','save','delete','new','start','logout']) $(id).disabled = disabled; }
async function refresh() { await Promise.all([subjects(), list()]); }
async function unlock() { $('login').hidden = true; $('app').hidden = false; await refresh(); }
on('login-form','submit',async e => {
 e.preventDefault(); $('login-button').disabled = true; $('login-error').textContent = '';
 try { await api('/session','POST',{password:$('password').value}); $('password').value = ''; await unlock(); }
 catch (error) { $('login-error').textContent = error.message; } finally { $('login-button').disabled = false; }
});
on('new','click',newNote); on('start','click',newNote);
on('more','click',() => list(true));
on('search','input',() => { clearTimeout(searchTimer); requestVersion++; searchTimer = setTimeout(() => list().catch(e => toast(e.message)),250); });
for (const id of ['title','subject','content']) on(id,'input',() => { dirty = true; $('save-status').textContent = '● Có thay đổi chưa lưu'; words(); });
on('editor','submit',async e => {
 e.preventDefault(); if (busy) return;
 const data = {title:$('title').value.trim(),subject:$('subject').value.trim(),content:$('content').value};
 if (!data.title || !data.subject) { toast('Hãy nhập tiêu đề và môn học.'); return; }
 busy = true; setEditing(true); $('save-status').textContent = 'Đang lưu…';
 try {
  const note = await api(current ? '/notes/' + current.id : '/notes', current ? 'PUT' : 'POST', {...data,version:current?.version}); populate(note); toast('Đã lưu ghi chú.');
  try { await refresh(); } catch { toast('Đã lưu. Danh sách chưa cập nhật được, hãy thử tải lại sau.'); }
 } catch (error) { dirty = true; $('save-status').textContent = 'Chưa lưu được — bản nháp vẫn ở đây'; throw error; }
 finally { busy = false; setEditing(false); }
});
on('delete','click',async () => {
 if (!current || busy || !confirm('Xóa vĩnh viễn ghi chú này? Bạn có thể tải .md trước khi xóa.')) return;
 busy = true; setEditing(true);
 try { await api('/notes/' + current.id,'DELETE',{version:current.version}); current = null; dirty = false; $('editor').hidden = true; $('welcome').hidden = false; toast('Đã xóa ghi chú.'); await refresh(); }
 finally { busy = false; setEditing(false); }
});
on('logout','click',async () => { if (!canLeave()) return; await api('/session','DELETE'); current = null; dirty = false; $('editor').reset(); $('editor').hidden = true; $('welcome').hidden = false; $('notes').replaceChildren(); $('app').hidden = true; $('login').hidden = false; $('password').focus(); });
function download(name, data, type) { const url = URL.createObjectURL(new Blob([data],{type})); const a = document.createElement('a'); a.href = url; a.download = name; document.body.append(a); a.click(); a.remove(); setTimeout(() => URL.revokeObjectURL(url),1000); }
on('download','click',() => { const title = $('title').value || 'Ghi chú'; download(title.replace(/[\\/:*?"<>|]/g,'-').slice(0,100) + '.md','# ' + title + '\n\nMôn học: ' + $('subject').value + '\n\n' + $('content').value,'text/markdown;charset=utf-8'); });
on('export','click',async () => {
 $('export').disabled = true;
 try { const notes = []; let more = true; while (more) { const page = await api('/export?offset=' + notes.length); notes.push(...page.notes); more = page.hasMore; }
 download('so-hoc-' + new Date().toISOString().slice(0,10) + '.json',JSON.stringify({format:'so-hoc-v1',exported_at:new Date().toISOString(),notes},null,2),'application/json'); toast(dirty ? 'Đã tải các trang đã lưu. Bản nháp hiện tại chưa nằm trong bản sao lưu.' : 'Đã tải bản sao lưu.');
 } finally { $('export').disabled = false; }
});
document.addEventListener('keydown',e => { if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === 's') { e.preventDefault(); if (!$('app').hidden && !$('editor').hidden && !busy) $('editor').requestSubmit(); } });
window.addEventListener('beforeunload',e => { if (dirty || busy) { e.preventDefault(); e.returnValue = ''; } });
api('/session').then(unlock).catch(error => { if (!error.message.includes('đăng nhập')) $('login-error').textContent = error.message; });
</script>
</body>
</html>
`;

const encoder = new TextEncoder();
const json = (data, status = 200, headers = {}) => Response.json(data, { status, headers });
const fail = (status, message) => { throw Object.assign(new Error(message), { status }); };
const hex = bytes => Array.from(new Uint8Array(bytes), b => b.toString(16).padStart(2, '0')).join('');
async function digest(value) { return new Uint8Array(await crypto.subtle.digest('SHA-256', encoder.encode(value))); }
async function equal(a, b) {
  const [x, y] = await Promise.all([digest(a), digest(b)]);
  let diff = 0; for (let i = 0; i < x.length; i++) diff |= x[i] ^ y[i];
  return diff === 0;
}
async function sign(value, password) {
  const key = await crypto.subtle.importKey('raw', encoder.encode(password), { name: 'HMAC', hash: 'SHA-256' }, false, ['sign']);
  return hex(await crypto.subtle.sign('HMAC', key, encoder.encode('notebook-session:' + value)));
}
async function authenticated(request, env) {
  const cookie = request.headers.get('Cookie') || '';
  const token = cookie.split(';').map(x => x.trim()).find(x => x.startsWith('notebook='))?.slice(9);
  if (!token) return false;
  const [expiry, nonce, signature, extra] = token.split('.');
  if (extra || !/^\d{10,13}$/.test(expiry) || !/^[a-f0-9-]{36}$/.test(nonce || '') || !/^[a-f0-9]{64}$/.test(signature || '')) return false;
  const now = Date.now();
  if (+expiry <= now || +expiry > now + 7 * 86400000) return false;
  return equal(signature, await sign(expiry + '.' + nonce, env.APP_PASSWORD));
}
function cookie(request, value, maxAge) {
  return `notebook=${value}; HttpOnly; SameSite=Strict; Path=/; Max-Age=${maxAge}${new URL(request.url).protocol === 'https:' ? '; Secure' : ''}`;
}
async function body(request, max = 1000000) {
  if (!request.headers.get('Content-Type')?.includes('application/json')) fail(415, 'Cần gửi dữ liệu JSON.');
  if (Number(request.headers.get('Content-Length')) > max) fail(413, 'Dữ liệu quá lớn.');
  const reader = request.body?.getReader();
  if (!reader) fail(400, 'Thiếu dữ liệu.');
  const chunks = []; let length = 0;
  while (true) {
    const { done, value } = await reader.read(); if (done) break;
    length += value.length;
    if (length > max) { await reader.cancel(); fail(413, 'Dữ liệu quá lớn.'); }
    chunks.push(value);
  }
  const bytes = new Uint8Array(length); let offset = 0;
  for (const chunk of chunks) { bytes.set(chunk, offset); offset += chunk.length; }
  try { const data = JSON.parse(new TextDecoder().decode(bytes)); if (!data || Array.isArray(data) || typeof data !== 'object') throw 0; return data; }
  catch { fail(400, 'JSON không hợp lệ.'); }
}
function fields(data) {
  for (const [key, limit] of [['title', 200], ['subject', 80], ['content', 200000]]) {
    if (typeof data[key] !== 'string' || data[key].length > limit) fail(400, `Trường ${key} không hợp lệ hoặc quá dài.`);
  }
  const title = data.title.trim(), subject = data.subject.trim();
  if (!title || !subject) fail(400, 'Hãy nhập tiêu đề và môn học.');
  return [title, subject, data.content];
}
function version(data) { if (!Number.isSafeInteger(data.version) || data.version < 1) fail(400, 'Thiếu phiên bản ghi chú.'); return data.version; }
async function route(request, env, nonce) {
  const url = new URL(request.url), path = url.pathname, method = request.method;
  if (path === '/' && method === 'GET') return new Response(PAGE.replaceAll('__NONCE__', nonce), { headers: { 'Content-Type': 'text/html; charset=utf-8' } });
  if (path === '/favicon.ico') return new Response(null, { status: 204 });
  if (!path.startsWith('/api/')) fail(404, 'Không tìm thấy trang.');
  if (!env.DB || !env.APP_PASSWORD || env.APP_PASSWORD.length < 16) fail(503, 'Chưa cấu hình DB hoặc APP_PASSWORD (tối thiểu 16 ký tự).');
  if (!['GET', 'HEAD'].includes(method) && request.headers.get('Origin') !== url.origin) fail(403, 'Nguồn yêu cầu không hợp lệ.');
  if (path === '/api/session' && method === 'POST') {
    const data = await body(request, 4096);
    if (typeof data.password !== 'string' || data.password.length > 1024) fail(400, 'Mật khẩu không hợp lệ.');
    const now = Date.now(), key = hex(await digest(request.headers.get('CF-Connecting-IP') || 'local'));
    await env.DB.prepare('DELETE FROM login_attempts WHERE expires_at < ?').bind(now).run();
    const attempt = await env.DB.prepare(`INSERT INTO login_attempts (key, attempts, expires_at) VALUES (?, 1, ?)
      ON CONFLICT(key) DO UPDATE SET attempts = attempts + 1 RETURNING attempts`).bind(key, now + 900000).first();
    if (attempt.attempts > 10) return json({ error: 'Thử quá nhiều lần. Vui lòng chờ 15 phút.' }, 429, { 'Retry-After': '900' });
    if (!await equal(data.password, env.APP_PASSWORD)) fail(401, 'Mật khẩu chưa đúng.');
    await env.DB.prepare('DELETE FROM login_attempts WHERE key = ?').bind(key).run();
    const value = `${now + 7 * 86400000}.${crypto.randomUUID()}`;
    return json({ ok: true }, 200, { 'Set-Cookie': cookie(request, `${value}.${await sign(value, env.APP_PASSWORD)}`, 604800) });
  }
  if (path === '/api/session' && method === 'DELETE') return json({ ok: true }, 200, { 'Set-Cookie': cookie(request, '', 0) });
  if (!await authenticated(request, env)) fail(401, 'Hãy đăng nhập để mở sổ.');
  if (path === '/api/session' && method === 'GET') return json({ ok: true });
  if (path === '/api/subjects' && method === 'GET') return json((await env.DB.prepare('SELECT subject, COUNT(*) AS count FROM notes GROUP BY subject ORDER BY subject').all()).results);
  if (path === '/api/notes' && method === 'GET') {
    const q = (url.searchParams.get('q') || '').slice(0, 200), subject = url.searchParams.get('subject') || '';
    const offset = Math.max(0, Math.min(10000000, parseInt(url.searchParams.get('offset') || '0', 10) || 0));
    const escaped = '%' + q.replace(/[\\%_]/g, '\\$&') + '%';
    const where = `WHERE (? = '' OR subject = ?) AND (? = '' OR title LIKE ? ESCAPE '\\' OR content LIKE ? ESCAPE '\\' OR subject LIKE ? ESCAPE '\\')`;
    const values = [subject, subject, q, escaped, escaped, escaped];
    const { results } = await env.DB.prepare(`SELECT id, title, subject, substr(content, 1, 140) AS excerpt, version, created_at, updated_at FROM notes ${where} ORDER BY updated_at DESC, id LIMIT 51 OFFSET ?`).bind(...values, offset).all();
    return json({ notes: results.slice(0, 50), hasMore: results.length > 50 });
  }
  if (path === '/api/export' && method === 'GET') {
    const offset = Math.max(0, parseInt(url.searchParams.get('offset') || '0', 10) || 0);
    const { results } = await env.DB.prepare('SELECT * FROM notes ORDER BY id LIMIT 10 OFFSET ?').bind(offset).all();
    return json({ notes: results, hasMore: results.length === 10 });
  }
  if (path === '/api/notes' && method === 'POST') {
    const data = fields(await body(request)), id = crypto.randomUUID(), now = new Date().toISOString();
    await env.DB.prepare('INSERT INTO notes (id, title, subject, content, created_at, updated_at) VALUES (?, ?, ?, ?, ?, ?)').bind(id, ...data, now, now).run();
    return json({ id, title: data[0], subject: data[1], content: data[2], version: 1, created_at: now, updated_at: now }, 201);
  }
  const match = path.match(/^\/api\/notes\/([a-f0-9-]{36})$/);
  if (match) {
    const id = match[1];
    if (method === 'GET') {
      const note = await env.DB.prepare('SELECT * FROM notes WHERE id = ?').bind(id).first();
      if (!note) fail(404, 'Ghi chú không còn tồn tại.'); return json(note);
    }
    if (method === 'PUT') {
      const input = await body(request), data = fields(input), v = version(input), now = new Date().toISOString();
      const note = await env.DB.prepare('UPDATE notes SET title = ?, subject = ?, content = ?, version = version + 1, updated_at = ? WHERE id = ? AND version = ? RETURNING *').bind(...data, now, id, v).first();
      if (!note) fail(409, 'Ghi chú đã được sửa hoặc xóa ở nơi khác. Hãy tải bản nháp xuống trước khi mở lại ghi chú.');
      return json(note);
    }
    if (method === 'DELETE') {
      const v = version(await body(request));
      const result = await env.DB.prepare('DELETE FROM notes WHERE id = ? AND version = ?').bind(id, v).run();
      if (!result.meta.changes) fail(409, 'Ghi chú đã thay đổi ở nơi khác. Hãy mở lại trước khi xóa.');
      return json({ ok: true });
    }
  }
  fail(404, 'Không tìm thấy chức năng.');
}
export default {
  async fetch(request, env) {
    const nonce = crypto.randomUUID(); let response;
    try { response = await route(request, env, nonce); }
    catch (error) {
      if (!error.status) console.error('Notebook request failed:', error.message);
      response = json({ error: error.status ? error.message : 'Không thể xử lý. Kiểm tra kết nối và cấu hình cơ sở dữ liệu.' }, error.status || 500);
    }
    const headers = new Headers(response.headers);
    headers.set('Cache-Control', 'no-store');
    headers.set('X-Content-Type-Options', 'nosniff');
    headers.set('Referrer-Policy', 'no-referrer');
    headers.set('X-Frame-Options', 'DENY');
    headers.set('Content-Security-Policy', `default-src 'none'; script-src 'nonce-${nonce}'; style-src 'nonce-${nonce}'; connect-src 'self'; img-src 'self' data:; base-uri 'none'; form-action 'self'; frame-ancestors 'none'`);
    return new Response(response.body, { status: response.status, headers });
  }
};
