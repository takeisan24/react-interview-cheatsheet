# Session 06: Referential Equality, React.memo, useMemo, useCallback & Over-Optimization Traps

## 1. Vấn Đề Cốt Lõi (Problem Statement)

Trong React, mặc định **khi Component cha Re-render ➔ TOÀN BỘ CÂY COMPONENT CON SẼ RE-RENDER THEO**, bất kể Component con đó có nhận prop nào từ cha hay không.

Khi ứng dụng phình to, việc Re-render thừa (Unnecessary Re-renders) ở các cây Component con phức tạp (vd: bảng dữ liệu 1.000 dòng, biểu đồ canvas) sẽ làm tụt FPS và gây giật lag giao diện.

---

## 2. Bản Chất Under The Hood (Why it Happens?)

### A. Cơ chế của `React.memo(Child)`

`React.memo` là một Higher-Order Component (HOC). Nó bọc lấy Component con và sử dụng phép so sánh nông **`Object.is(prevProps, nextProps)`** trước mỗi lần Re-render:

* Nếu **TẤT CẢ PROPS GIỮ NGUYÊN** ➔ React **BỎ QUA (Skip)** lượt re-render đó, giữ lại cây Virtual DOM cũ trong RAM.
* Nếu **CÓ ÍT NHẤT 1 PROP THAY ĐỔI** ➔ React **ÉP** Child re-render lại.

### B. Bẫy Referential Equality trong JavaScript RAM

Trong JavaScript, các kiểu dữ liệu chia làm 2 loại:

1. **Primitive Types (Số, Chuỗi, Boolean, null, undefined):** So sánh theo GIÁ TRỊ. `1 === 1` ➔ `true`.
2. **Reference Types (Function, Object, Array):** So sánh theo **ĐỊA CHỈ Ô NHỚ RAM**.

   ```js
   // Hai hàm có nội dung giống hệt nhau nhưng nằm ở 2 ô nhớ RAM khác nhau!
   (() => {}) === (() => {}) // ➔ false!
   ```

Khi Parent Re-render, tất cả các hàm (`const handleClick = () => {}`) và object (`const config = {}`) khai báo trong Parent đều được **khởi tạo lại với ĐỊA CHỈ Ô NHỚ RAM MỚI TINH**.

Khi truyền các prop này xuống `<MemoizedChild onClick={handleClick} />`:
`Object.is(oldOnClick, newOnClick)` ➔ `false` (Khác địa chỉ RAM!) ➔ `React.memo` tưởng rằng prop đã thay đổi ➔ **Child VẪN BỊ RE-RENDER THỪA!**

---

## 3. Bộ Đôi Giải Pháp: `useCallback` & `useMemo`

### `useCallback(fn, deps)`

Giữ nguyên **ĐỊA CHỈ Ô NHỚ RAM CỦA HÀM** giữa các lượt re-render. Hàm chỉ bị khởi tạo lại ô nhớ mới khi biến trong mảng phụ thuộc `deps` thay đổi.

### `useMemo(() => value, deps)`

Giữ nguyên **ĐỊA CHỈ Ô NHỚ RAM CỦA OBJECT / ARRAY** hoặc **KẾT QUẢ TÍNH TOÁN NẶNG** giữa các lượt re-render.

---

## 4. Bảng So Sánh Chi Tiết

| Công cụ | Mục đích chính | Phép so sánh ngầm | Trường hợp sử dụng |
| :--- | :--- | :--- | :--- |
| **`React.memo(Component)`** | Bọc Component con để bỏ qua re-render thừa | `Object.is(prevProps, nextProps)` | Component con nặng, nhận props ít thay đổi |
| **`useCallback(fn, deps)`** | Giữ ổn định địa chỉ ô nhớ RAM của Hàm | Mảng phụ thuộc `deps` | Truyền callback xuống Component con đã bọc `React.memo` |
| **`useMemo(() => val, deps)`** | Giữ ổn định địa chỉ RAM Object hoặc cache tính toán | Mảng phụ thuộc `deps` | Tính toán thuật toán nặng hoặc truyền Object xuống `React.memo` |

---

## 5. Bẫy Over-Optimization (Tối Ưu Hóa Thừa - Junior Signal)

> ⚠️ **IMPORTANT**: Dùng `useCallback` và `useMemo` KHÔNG PHẢI MANG LẠI HIỆU NĂNG MIỄN PHÍ! Mỗi lần dùng `useCallback`, React phải tốn thêm bộ nhớ RAM để lưu mảng `deps` và thực hiện so sánh `deps` ở mỗi lượt render.

### KHÔNG NÊN DÙNG khi

1. **Truyền callback xuống HTML Tag mặc định:** `<button onClick={useCallback(...)}>`. `<button>` là HTML Native, KHÔNG CÓ `React.memo` ➔ Bọc `useCallback` ở đây hoàn toàn vô nghĩa và tốn RAM thừa!
2. **Truyền xuống Component con KHÔNG BỌC `React.memo`:** Vì Child không bọc `React.memo`, nó vẫn sẽ re-render 100% khi Parent re-render.
3. **Phép tính quá nhẹ:** `const sum = useMemo(() => a + b, [a, b])` ➔ Phép cộng `a + b` nhanh hơn chi phí React so sánh mảng `deps` rất nhiều!

---

## 6. Tài Liệu Tham Khảo Chính Thức

* [React.dev: Memoization and Skipping Re-renders](https://react.dev/reference/react/memo)
* [React.dev: useCallback Hook Guide](https://react.dev/reference/react/useCallback)
* [React.dev: useMemo Hook Guide](https://react.dev/reference/react/useMemo)
