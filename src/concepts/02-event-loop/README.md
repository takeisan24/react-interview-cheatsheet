# 02. Event Loop: Call Stack, Microtask vs Macrotask

## 1. Vấn đề là gì? (What is the issue?)

JavaScript là ngôn ngữ đơn luồng (Single-threaded). Làm sao JS có thể xử lý các tác vụ bất đồng bộ (API, Timer) mà không làm đóng băng giao diện? ➔ Nhờ vào **Event Loop**.

## 2. Phân loại 3 nhóm tác vụ trong JavaScript

### A. Code Đồng Bộ (Synchronous Tasks - Đẩy vào Call Stack chạy ngay)

- Khai báo biến, tính toán toán học (`let x = 1 + 1`, `Math.random()`).
- Vòng lặp (`for`, `while`), câu điều kiện (`if/else`).
- Thao tác DOM trực tiếp (`document.getElementById`, `element.style.color = 'red'`).
- Thân hàm của `new Promise((resolve, reject) => { /* CODE ĐỒNG BỘ */ })`. *(Bẫy phỏng vấn!)*
- Các hàm array như `map()`, `filter()`, `reduce()`, `console.log()`.

### B. Microtask Queue (Bất đồng bộ ưu tiên cao - Vét sạch trong 1 chu kỳ)

- `Promise.then()`, `Promise.catch()`, `Promise.finally()`.
- `async / await` (Syntactical sugar của Promise).
- `queueMicrotask(fn)` (API đẩy microtask thủ công).
- `MutationObserver` (Theo dõi thay đổi DOM Tree).
- Node.js: `process.nextTick()`.

### C. Macrotask Queue (Bất đồng bộ ưu tiên thấp - Lấy từng cái 1)

- `setTimeout(fn)`, `setInterval(fn)`.
- `setImmediate(fn)` (Node.js / IE).
- `requestAnimationFrame(fn)` (Chạy trước bước Paint UI).
- `I/O Events` (Đọc/ghi file, Network Fetch/XHR callback).
- `User Interaction Events` (Click, Keydown, Scroll, MouseMove).

## 3. Bước UI Update (Render / Paint) diễn ra cái gì?

Sau khi Microtask Queue đã rỗng hoàn toàn, nếu đến chu kỳ 16.6ms (60Hz), trình duyệt thực hiện 4 bước cập nhật màn hình:

1. **Recalculate Style:** Tính toán lại CSS selector và class.
2. **Layout / Reflow:** Tính tọa độ ($x, y$) và kích thước ($width, height$) của từng element.
3. **Paint / Repaint:** Tô màu, vẽ chữ, shadow lên từng pixel màn hình.
4. **Compositing:** Ghép các layer đồ họa (GPU acceleration).

*⚠️ Nếu Microtask bị lặp vô tận (ví dụ recursion Promise), bước UI Update KHÔNG THỂ CHẠY ➔ Trình duyệt bị đóng băng (Freeze/Unresponsive)!*

## 4. Bẫy phỏng vấn (Interview Trap & Junior Signal)

- **Bẫy 1:** Đoán `setTimeout(..., 0)` chạy trước `Promise.then`. ➔ *Sai! Microtask (Promise) luôn được ưu tiên hơn Macrotask (setTimeout).*
- **Bẫy 2:** Đoán code bên trong `new Promise(...)` là bất đồng bộ. ➔ *Sai! Thân Promise chạy ĐỒNG BỘ ngay lập tức, chỉ callback trong `.then()` mới là Microtask.*
- **Junior Signal:** Phân biệt rõ Call Stack (Stack LIFO) vs Queues (FIFO), thuộc lòng các tác vụ Micro vs Macro và hiểu bản chất bước Paint UI.

## 5. Tài liệu tham khảo chính thức (MDN & Specs)

- [MDN: In-depth guide to Event Loop](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Event_loop)
- [javascript.info: Event loop: microtasks and macrotasks](https://javascript.info/event-loop)
