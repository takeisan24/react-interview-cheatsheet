# 04. Virtual DOM, Reconciliation (Diffing Algorithm) & React Fiber

## 1. Virtual DOM vs Real DOM

- **Real DOM:** Đắt đỏ và nặng nề (mỗi HTML element chứa 300+ thuộc tính C++). Thao tác trực tiếp gây ra Reflow (tính lại vị trí) & Repaint (vẽ lại pixel).
- **Virtual DOM:** Là một **Plain JS Object** nằm trong RAM đại diện cho UI. Thao tác trên JS Object cực nhanh.

## 2. Reconciliation (Diffing Algorithm $O(n)$)

Thuật toán so sánh 2 cây VDOM cũ và mới dựa trên 2 quy tắc:

1. **Khác loại Element là Re-mount:** `<div />` đổi sang `<span />` ➔ Hủy toàn bộ cây cũ.
2. **Dùng thuộc tính `key` để định danh phần tử trong mảng.**

## 3. Bẫy Chết Người: Tại sao KHÔNG NÊN dùng `key={index}`?

- Khi thêm/xóa/sắp xếp lại mảng, `index` của các phần tử bị thay đổi.
- React lầm tưởng phần tử mới là phần tử cũ (do trùng `index`) ➔ Giữ nguyên State nội bộ/ô input cũ gán cho phần tử mới ➔ **Gây bug hiển thị và sai lệch dữ liệu nặng nề**.
- **Best Practice:** Luôn dùng `key={item.id}` (ID cố định duy nhất).

## 4. React Fiber Architecture (React 16+)

- **Stack Reconciler cũ (< React 16):** Re-render đồng bộ không thể dừng ➔ Block Main Thread gây lag.
- **Fiber Reconciler mới (React 16+):** Chuyển VDOM thành danh sách liên kết (Linked List). Cho phép **Tạm dừng (Pause), Chia nhỏ (Chunk) và Đặt ưu tiên (Priority)** cho các tác vụ re-render (Ưu tiên gõ phím/Click chuột hơn render danh sách lớn).

## 5. Bẫy phỏng vấn (Interview Trap & Junior Signal)

- **Bẫy 1:** Trả lời "Virtual DOM luôn nhanh hơn Real DOM". ➔ *Sai! VDOM tốn thêm bộ nhớ RAM để giữ cây ảo, lợi ích lớn nhất của nó là Developer Experience (Declarative UI) và Batching DOM updates.*
- **Junior Signal:** Giải thích được bẫy `key={index}`, thuật toán Diffing $O(n)$ và vai trò ngắt/nghỉ ưu tiên của React Fiber.

## 6. Tài liệu tham khảo chính thức

- [React.dev: Preserving and Resetting State](https://react.dev/learn/preserving-and-resetting-state)
- [React.dev: Rendering Lists (Keys)](https://react.dev/learn/rendering-lists)
