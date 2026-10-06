# Sổ học — Cloudflare Worker + D1

Cuốn sổ cá nhân bằng tiếng Việt, dùng trên máy tính và điện thoại. Một Worker phục vụ cả giao diện và API; D1 lưu ghi chú. File `worker.js` đã chứa toàn bộ giao diện, không cần build frontend, không tải thư viện hay phông chữ bên ngoài.

## Có gì?

- Mật khẩu riêng cho cuốn sổ, phiên đăng nhập 7 ngày.
- Tạo, đọc, sửa, xóa ghi chú; nhập tên môn để phân loại.
- Lọc theo môn, tìm trong tiêu đề, nội dung và tên môn.
- Lưu bằng nút Lưu hoặc Ctrl/⌘+S; cảnh báo khi rời trang còn thay đổi.
- Kiểm tra phiên bản để tránh ghi đè khi sửa cùng một ghi chú từ hai tab/thiết bị.
- Tải bản đang viết thành `.md`; sao lưu toàn bộ ghi chú đã lưu thành JSON.
- Giao diện thích ứng điện thoại, phân trang 50 ghi chú/lần.

## Cách 1: triển khai bằng Cloudflare Dashboard

Không cần cài công cụ trên máy.

1. Vào Cloudflare, tạo database **D1** tên `so-tay-hoc-tap`.
2. Mở phần Console của database. Sao chép và chạy toàn bộ SQL trong `migrations/0001_init.sql` để tạo bảng.
3. Tạo **Worker** tên `so-tay-hoc-tap`. Mở trình sửa mã, thay nội dung Worker bằng toàn bộ file `worker.js`, rồi lưu/triển khai.
4. Trong cấu hình Worker, thêm binding loại **D1 database**: tên biến phải chính xác là `DB`, chọn database đã tạo.
5. Thêm biến loại **Secret** tên `APP_PASSWORD`. Đặt mật khẩu dài ít nhất 16 ký tự, khó đoán. Đây là mật khẩu bạn dùng để mở sổ. Không đưa mật khẩu vào mã nguồn.
6. Lưu/triển khai lại nếu giao diện yêu cầu. Mở địa chỉ HTTPS `https://so-tay-hoc-tap.<subdomain-cua-ban>.workers.dev` do Cloudflare cấp, nhập mật khẩu và tạo ghi chú đầu tiên.

Tên vị trí các mục trong Dashboard có thể thay đổi; các giá trị quan trọng là binding `DB`, secret `APP_PASSWORD`, và hai bảng SQL đã được tạo. Đường dẫn trên chỉ là ví dụ, chưa có website được triển khai sẵn.

## Cách 2: triển khai bằng Wrangler

Cần Node.js 22.13+ (khuyến nghị bản LTS hiện hành), tài khoản Cloudflare và terminal. Mở terminal trong thư mục dự án sau khi giải nén:

```sh
npm install
npx wrangler login
npx wrangler d1 create so-tay-hoc-tap
```

Lấy `database_id` trong kết quả trả về, thay chuỗi `REPLACE_WITH_YOUR_DATABASE_ID` trong `wrangler.jsonc`. Giữ tên binding là `DB`. Nếu công cụ tự thêm binding, kiểm tra để chỉ còn một binding `DB` đúng database.

```sh
npm run db:remote
npx wrangler secret put APP_PASSWORD
npm run deploy
```

Lệnh đặt secret sẽ yêu cầu bạn nhập mật khẩu; nếu được hỏi tạo Worker chưa tồn tại, đồng ý tạo. Dùng mật khẩu riêng dài ít nhất 16 ký tự. Cuối lệnh deploy, mở URL Cloudflare trả về. Không cần tên miền riêng.

## Chạy thử trên máy

```sh
npm install
cp .dev.vars.example .dev.vars
```

Sửa `APP_PASSWORD` trong `.dev.vars` thành mật khẩu thử nghiệm riêng, ít nhất 16 ký tự. Cập nhật `database_id` như hướng dẫn trên trước khi chạy Wrangler.

```sh
npm run db:local
npm run dev
```

Mở địa chỉ localhost Wrangler hiển thị. Dữ liệu local và dữ liệu online là hai bản riêng; ghi chú thử trên máy không tự chuyển lên online. `.dev.vars` đã được loại khỏi Git; không chia sẻ file này.

## Dùng hàng ngày

1. Chọn **Viết ghi chú**, nhập môn học (ví dụ `Toán học`) và tiêu đề.
2. Viết bài rồi nhấn **Lưu ghi chú**. Chỉ khi xuất hiện **Đã lưu** thì nội dung đã được máy chủ xác nhận lưu.
3. Trên thiết bị khác, mở cùng URL và đăng nhập. Tải lại trang/mở lại ghi chú để lấy thay đổi mới nhất.
4. Nếu báo bài đã được sửa ở nơi khác: tải bản đang viết bằng **Tải .md**, mở lại ghi chú để nhận bản mới, rồi ghép nội dung cần giữ.
5. Chọn **Sao lưu JSON** để tải các ghi chú đã lưu. Hạn chế chỉnh sửa/xóa từ thiết bị khác trong lúc xuất để có bản sao đầy đủ, vì dữ liệu được tải thành nhiều trang.

## Phạm vi bản này

- Một sổ cho một người/một mật khẩu; chưa có tài khoản riêng cho nhiều người.
- Lưu thủ công, cần mạng. Không có chế độ offline hoặc khôi phục bản nháp sau khi trình duyệt bị tắt đột ngột. Khi mạng lỗi, bản đang viết vẫn nằm trên trang; dùng **Tải .md** để giữ lại.
- Nội dung là văn bản thuần. Có thể viết cú pháp Markdown nhưng chưa có trình xem Markdown, công thức LaTeX, ảnh hoặc file đính kèm.
- Tiêu đề tối đa 200 ký tự, môn học 80 ký tự, nội dung 200.000 ký tự.
- Xóa là vĩnh viễn trong ứng dụng. JSON là bản xuất để lưu trữ; bản này chưa có nút nhập/khôi phục JSON.
- Tìm kiếm dùng SQLite LIKE, không hỗ trợ bỏ dấu tiếng Việt. Tìm kiếm nội dung có thể tăng lượng dữ liệu D1 phải đọc khi sổ rất lớn.
- Phiên dùng cookie HttpOnly, SameSite=Strict và Secure khi chạy HTTPS; yêu cầu ghi dữ liệu kiểm tra Origin. SQL có tham số; giao diện hiển thị ghi chú bằng text/value.
- Giới hạn đăng nhập 10 lần/15 phút theo IP; đổi mật khẩu làm phiên cũ mất hiệu lực. Khóa sổ xóa cookie trên trình duyệt hiện tại.
- Dữ liệu được lưu ở tài khoản Cloudflare của bạn; không có mã hóa đầu cuối. D1/Workers có hạn mức theo gói tài khoản.

## Tệp và kiểm tra

- `worker.js`: file duy nhất cần dán vào trình sửa Worker, chứa API và giao diện.
- `migrations/0001_init.sql`: tạo bảng.
- `wrangler.jsonc`: cấu hình deploy từ terminal.
- `tests/worker.test.js`: kiểm tra API với SQLite thật và lớp mô phỏng binding D1.

```sh
npm test
```

Các kiểm tra bao gồm đăng nhập/cookie, phân quyền, giới hạn đăng nhập, tạo/sửa/xóa, tìm kiếm, phân trang, xuất dữ liệu, chống ghi đè phiên bản cũ và kiểm tra cấu hình. Kiểm tra local không thay thế việc xác nhận deploy với D1 thật trên tài khoản Cloudflare.

Tài liệu Cloudflare dùng làm căn cứ:

- [Bắt đầu với D1](https://developers.cloudflare.com/d1/get-started/)
- [Binding D1 và prepared statements](https://developers.cloudflare.com/d1/worker-api/prepared-statements/)
- [D1 migrations](https://developers.cloudflare.com/d1/reference/migrations/)
- [Worker secrets](https://developers.cloudflare.com/workers/configuration/secrets/)
- [Cấu hình Wrangler](https://developers.cloudflare.com/workers/wrangler/configuration/)
