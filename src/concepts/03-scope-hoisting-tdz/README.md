# 03. Scope, Hoisting & Temporal Dead Zone (TDZ)

## 1. Bảng So Sánh Cốt Lõi: `var` vs `let` vs `const`

| Tiêu chí | `var` | `let` | `const` |
| :--- | :--- | :--- | :--- |
| **Scope (Phạm vi)** | Function Scope | Block Scope `{}` | Block Scope `{}` |
| **Hoisting** | Có (Khởi tạo = `undefined`) | Có (Giữ trạng thái Chưa khởi tạo) | Có (Giữ trạng thái Chưa khởi tạo) |
| **Bị dính TDZ?** | ❌ Không (Ra `undefined`) | Có (Báo lỗi `ReferenceError`) | Có (Báo lỗi `ReferenceError`) |
| **Khai báo lại (Re-declare)** | Có thể khai báo lại | ❌ Không thể | ❌ Không thể |
| **Gán lại giá trị (Re-assign)** | Có thể gán lại | Có thể gán lại | ❌ Không thể |

## 2. Bản chất Under the Hood (Why it happens?)

JavaScript thực thi code qua 2 giai đoạn:

1. **Creation Phase (Khởi tạo ô nhớ):**
   - JS Engine quét toàn bộ file, tìm các từ khóa khai báo và **kéo (Hoist)** tên biến lên đầu Scope.
   - `var`: Được gán luôn giá trị mặc định là `undefined`.
   - `let` / `const`: Không được gán giá trị, rơi vào vùng **Temporal Dead Zone (TDZ)**.
2. **Execution Phase (Thực thi code):**
   - Chạy code từng dòng từ trên xuống dưới.

## 3. Temporal Dead Zone (TDZ) là gì?

TDZ là khoảng thời gian/không gian từ **đầu Scope** tới **dòng lệnh khai báo thực sự của `let/const`**.

- Nếu truy cập biến trong vùng TDZ: Trình duyệt ném ra lỗi `ReferenceError: Cannot access 'X' before initialization`.

## 4. Scope: Function Scope vs Block Scope

- **`var` (Function Scope):** Không bị giới hạn bởi cặp ngoặc `{}` của `if`, `for`.
  - Trong vòng lặp `for (var i...)`, cả 3 lần lặp xài chung 1 ô nhớ `i` ➔ In ra `3, 3, 3`.
- **`let` / `const` (Block Scope):** Bị giới hạn nghiêm ngặt trong cặp ngoặc `{}`.
  - Trong vòng lặp `for (let j...)`, JS Engine tạo ra 1 ô nhớ `j` độc lập cho từng lần lặp ➔ In ra `0, 1, 2`.

## 5. Bẫy phỏng vấn (Interview Trap & Junior Signal)

- **Bẫy 1:** Cho rằng `let`/`const` không bị Hoisting. ➔ *Sai! `let`/`const` CÓ bị Hoisting nhưng bị chặn bởi TDZ.*
- **Bẫy 2:** Nghĩ rằng `const` làm biến thành Immutable (không thể thay đổi). ➔ *Sai! Với Object/Array khai báo bằng `const`, bạn vẫn có thể mutate thuộc tính bên trong (`obj.a = 2`), chỉ không thể gán lại hằng số (`obj = {}`).*
- **Junior Signal:** Phân biệt rõ Creation Phase vs Execution Phase, nắm vững TDZ và luôn ưu tiên `const` > `let` > KHÔNG bao giờ dùng `var`.

## 6. Tài liệu tham khảo chính thức

- [MDN: Temporal Dead Zone (TDZ)](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/let#temporal_dead_zone_tdz)
- [javascript.info: Variable scope, closure](https://javascript.info/closure)
