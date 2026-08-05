# 03. Scope, Hoisting & Temporal Dead Zone (TDZ)

## 1. Bảng So Sánh Cốt Lõi: `var` vs `let` vs `const`

| Tiêu chí | `var` | `let` | `const` |
| :--- | :--- | :--- | :--- |
| **Scope (Phạm vi)** | Function Scope | Block Scope `{}` | Block Scope `{}` |
| **Hoisting** | Có (Khởi tạo = `undefined`) | Có (Giữ trạng thái Chưa khởi tạo) | Có (Giữ trạng thái Chưa khởi tạo) |
| **Bị dính TDZ?** | ❌ Không (Ra `undefined`) | Có (Báo lỗi `ReferenceError`) | Có (Báo lỗi `ReferenceError`) |
| **Khai báo lại (Re-declare)** | Có thể khai báo lại | ❌ Không thể | ❌ Không thể |
| **Gán lại giá trị (Re-assign)** | Có thể gán lại | Có thể gán lại | ❌ Không thể |

## 2. Execution Context & 2 Giai đoạn chạy Code

Mỗi khi JavaScript chạy code, nó tạo ra một **Execution Context** gồm 2 giai đoạn:

1. **Creation Phase (Khởi tạo ô nhớ):**
   - Tạo Environment Record & Scope Chain.
   - Quét toàn bộ file, tìm các từ khóa khai báo và **kéo (Hoist)** tên biến lên đầu Scope.
   - `var`: Được gán luôn giá trị mặc định là `undefined`.
   - `let` / `const`: Không được gán giá trị, rơi vào vùng **Temporal Dead Zone (TDZ)**.
2. **Execution Phase (Thực thi code):**
   - Chạy code từng dòng từ trên xuống dưới.

## 3. Cơ chế Hoisting theo từng loại Khai báo

- **Function Declaration (`function foo(){}`):** Hoist **cả tên hàm lẫn toàn bộ thân hàm**. Được gọi trước khi khai báo thoải mái.
- **`var`:** Hoist tên biến VÀ gán `= undefined`. Gọi trước khai báo ra `undefined`.
- **`let` & `const`:** Hoist tên biến NHƯNG giữ trạng thái *Uninitialized*. Gọi trước khai báo sẽ bị chặn bởi TDZ.
- **Function Expression (`var bar = function(){}`):** Hoist dưới dạng một biến `var bar = undefined`. Gọi `bar()` trước khai báo sẽ ném lỗi `TypeError: bar is not a function`.

## 4. Temporal Dead Zone (TDZ - Vùng chết tạm thời)

- **Định nghĩa:** TDZ là khoảng thời gian/không gian từ **đầu Scope** tới **dòng lệnh khai báo thực sự của `let/const`**.
- **Hành vi:** Truy cập biến trong vùng TDZ sẽ bị ném ra lỗi `ReferenceError: Cannot access 'X' before initialization`.

## 5. Scope: Function Scope vs Block Scope `{}`

- **`var` (Function Scope):** Không bị giới hạn bởi cặp ngoặc `{}` của `if`, `for`.
  - Trong vòng lặp `for (var i...)`, cả 3 lần lặp xài chung 1 ô nhớ `i` ➔ In ra `3, 3, 3`.
- **`let` / `const` (Block Scope):** Bị giới hạn nghiêm ngặt trong cặp ngoặc `{}`.
  - Trong vòng lặp `for (let j...)`, JS Engine tạo ra 1 ô nhớ `j` độc lập cho từng lần lặp ➔ In ra `0, 1, 2`.

## 6. Mutability vs Re-assignment với `const`

- **Re-assignment (Gán lại địa chỉ ô nhớ):** Thay đổi con trỏ biến sang ô nhớ mới (`x = 2`). ➔ `const` **CẤM** (`TypeError: Assignment to constant variable`).
- **Mutation (Biến đổi nội dung ô nhớ):** Sửa thuộc tính bên trong Object/Array mà địa chỉ con trỏ không đổi (`obj.a = 1`). ➔ `const` **CHO PHÉP**.

## 7. Bẫy phỏng vấn (Interview Trap & Junior Signal)

- **Bẫy 1:** Cho rằng `let`/`const` không bị Hoisting. ➔ *Sai! `let`/`const` CÓ bị Hoisting nhưng bị chặn bởi TDZ.*
- **Bẫy 2:** Gọi Function Expression trước khai báo bị `ReferenceError`. ➔ *Sai! Ném lỗi `TypeError: bar is not a function` vì bar lúc đó mang giá trị `undefined`.*
- **Junior Signal:** Phân biệt rõ Creation Phase vs Execution Phase, giải thích được TDZ, Function Declaration vs Expression và luôn ưu tiên `const` > `let` > KHÔNG bao giờ dùng `var`.

## 8. Tài liệu tham khảo chính thức

- [MDN: Temporal Dead Zone (TDZ)](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/let#temporal_dead_zone_tdz)
- [javascript.info: Variable scope, closure](https://javascript.info/closure)
