# 01. Stale Closure trong useEffect

## 1. Vấn đề là gì? (What is the issue?)

Khi dùng `setInterval` (hoặc `setTimeout`, event listener) trong `useEffect` với mảng phụ thuộc rỗng `[]`, biến state (vd: `count`) không tăng dần mà bị mắc kẹt ở giá trị 1 mãi mãi.

## 2. Bản chất Under the Hood (Why it happens?)

- **Closure trong JS:** Hàm callback trong `setInterval` khi được khởi tạo ở render đầu tiên đã "chụp ảnh" (capture) giá trị `count = 0`.
- **Dependency Array `[]`:** Khai báo `[]` khiến `useEffect` chỉ chạy đúng 1 lần khi mount. Do đó callback không bao giờ được tạo lại để "chụp" giá trị `count` mới.

## 3. Tổng quan về Dependency Array trong useEffect

1. **Không truyền mảng (`useEffect(fn)`):** Chạy sau **MỌI LẦN RENDER**. (Dễ gây tràn bộ nhớ/loop).
2. **Mảng rỗng (`useEffect(fn, [])`):** Chạy **DUY NHẤT 1 LẦN** sau lần render đầu tiên (Mount). ➔ *Gây ra Stale Closure nếu dùng state trực tiếp trong callback.*
3. **Có biến (`useEffect(fn, [count])`):** Chạy khi Mount và chạy lại mỗi khi giá trị `count` thay đổi (React dùng `Object.is` để so sánh).

## 4. Cách giải quyết & Best Practice (How to fix?)

- **Dùng Functional Update:** `setCount(prevCount => prevCount + 1)`. React sẽ tự động truyền giá trị state mới nhất từ queue vào `prevCount`, không phụ thuộc vào biến `count` ở scope bên ngoài.

## 5. Cú pháp & Luồng vận hành chi tiết (Execution Flow)

- **State is a Snapshot:** Trong 1 lần render, biến state là hằng số cố định (`const count = 0`). Mỗi lần render là một lần gọi hàm `Counter()` mới.
- **React State Queue:** `setCount(prev => prev + 1)` không truyền giá trị tính sẵn, mà đẩy một **Updater Function** vào hàng chờ (Queue) để React tự lấy state mới nhất tại thời điểm xử lý.
- **Luồng chạy:** Render 1 (count=0) ➔ Timer chạy ngầm ôm count=0 ➔ Sau 1s gọi `setCount(0+1)` ➔ Render 2 (count=1) ➔ `useEffect` không chạy lại do `deps=[]` ➔ Timer cũ tiếp tục gọi `setCount(0+1)` ➔ Kẹt ở số 1.

## 6. Bẫy phỏng vấn (Interview Trap & Junior Signal)

- **Bẫy:** Thường bị đoán nhầm là do hàm `clearInterval` làm xóa bộ đếm.
- **Junior Signal:** Giải thích được cơ chế Closure của JavaScript (hàm lưu giữ scope biến tại thời điểm định nghĩa) và ưu tiên dùng Functional Update thay vì thêm `[count]` làm re-render thừa.

## 7. Tài liệu tham khảo chính thức (React Official Docs)

- [React.dev: State as a Snapshot](https://react.dev/learn/state-as-a-snapshot)
- [React.dev: Queueing a Series of State Updates](https://react.dev/learn/queueing-a-series-of-state-updates)
- [React.dev: Synchronizing with Effects](https://react.dev/learn/synchronizing-with-effects)
