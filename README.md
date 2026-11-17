# NetSec Study — Ôn tập An ninh mạng

Web ôn tập **187 câu hỏi trắc nghiệm An ninh mạng** (18 chủ đề), chạy hoàn toàn trên trình duyệt, không cần máy chủ, hoạt động offline sau lần tải đầu tiên.

## Tính năng

- **Tổng quan**: tiến độ tổng, độ chính xác, số câu đã thuộc, chuỗi ngày học, tiến độ từng chủ đề, hoạt động gần đây.
- **Luyện tập**: chọn chủ đề, số câu, thứ tự ngẫu nhiên/theo tài liệu, phản hồi ngay kèm đáp án đúng; đánh dấu câu khó.
- **Thi thử**: 20/40/60/100 câu hoặc toàn bộ, đếm ngược và tự động nộp khi hết giờ, bảng điều hướng câu hỏi, đánh dấu ⚑, chấm điểm và xếp loại đạt/chưa đạt.
- **Flashcard**: lật thẻ, tự đánh giá “đã nhớ / chưa nhớ”, ôn lại các thẻ chưa nhớ.
- **Thư viện**: tìm kiếm không dấu, lọc theo chủ đề/trạng thái, xem đáp án, đánh dấu, luyện riêng các câu đang xem.
- **Thống kê**: hiệu suất theo chủ đề, heatmap 5 tuần, lịch sử bài làm.
- **Tiện ích**: tự lưu tiến độ, giao diện sáng/tối, cỡ chữ, xuất/nhập tiến độ JSON, xáo trộn đáp án, phím tắt, PWA cài được lên màn hình chính.

## Phím tắt

| Phím | Chức năng |
| --- | --- |
| `1` – `4` | Chọn đáp án A–D |
| `Enter` | Câu tiếp theo (khi đã chọn đáp án) |
| `←` / `→` | Chuyển câu trong bài thi |
| `Space` | Lật flashcard |
| `1` / `2` | Flashcard: chưa nhớ / đã nhớ |
| `/` | Mở tìm kiếm |
| `Esc` | Đóng hộp thoại |

## Cấu trúc

```
.
├── index.html
├── assets/
│   ├── css/styles.css
│   ├── js/data.js      # 187 câu hỏi + 18 chủ đề
│   ├── js/app.js       # toàn bộ logic ứng dụng
│   ├── icon.svg
│   ├── icon-192.png    # icon PWA
│   └── icon-512.png    # icon PWA
├── manifest.webmanifest
├── sw.js               # service worker (offline)
└── .nojekyll
```

## Chạy tại máy

Không cần cài đặt. Mở trực tiếp `index.html` bằng trình duyệt, hoặc chạy một static server:

```bash
python3 -m http.server 8080
# http://localhost:8080
```

## Triển khai GitHub Pages

1. Đẩy toàn bộ nội dung thư mục này lên nhánh `main` của repository.
2. Vào **Settings → Pages**, chọn **Deploy from a branch** → nhánh `main` → thư mục `/ (root)`.
3. Truy cập `https://<username>.github.io/<repo>/`.

File `.nojekyll` đã được thêm để GitHub Pages phục vụ đúng các tệp tĩnh.

## Nguồn dữ liệu

Câu hỏi và đáp án được chép lại từ tài liệu **“Tổng hợp câu hỏi - 26.10.22”** (25 trang). Đáp án đúng giữ theo bản gốc. Nếu phát hiện sai sót, hãy đối chiếu lại với tài liệu ôn tập chính thức.
