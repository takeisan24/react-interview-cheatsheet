# Ghi nhớ — Bài 1 → 5

> **Cách đọc file này.** Đừng đọc trôi. Ở mỗi mục **🎯 Câu chốt**, che phần bên dưới rồi
> tự nói to câu đó trước. Nói được thì lướt qua; nói không được thì mới đọc kỹ.
> Đọc kiểu này ~12 phút. Đọc trôi thì 4 phút, và quên sạch sau 2 ngày.
>
> Mỗi kiến thức ở đây đều gắn với **một thí nghiệm mình đã tự chạy và một con số mình đã tự đo**.
> Khi quên, đừng cố nhớ định nghĩa — nhớ lại **thí nghiệm**, con số sẽ kéo định nghĩa về theo.

---

# BÀI 1 · Closure

📁 `src/concepts/01-stale-closure/closure-co-ban.js`

### 🎯 Câu chốt
> **Closure giữ CÁI HỘP, không giữ ẢNH CHỤP.**

### Thí nghiệm & con số đo được

| # | Chạy gì | Kết quả | Nói lên điều gì |
|---|---|---|---|
| 1 | `dem1() dem1() dem1() dem2()` | `1 2 3 1` | Mỗi lần gọi `taoBoDem()` sinh **một hộp `n` riêng**. `dem2` không dính gì tới `dem1`. |
| 2 | `hong() hong(5) hong(5)` | `NaN 6 6` | **Tham số `n` che mất `n` bên ngoài** → closure mất trí nhớ hoàn toàn |
| 3 | `chaoAn` / `chaoBinh` | 3 lời chào đúng tên | Hai đường vào: `ten` cố định lúc tạo, `loi` truyền lúc gọi |
| 4 | `so = 10` → tạo closure → `so = 100` → `f(5) f(1)` | `105 101` | Đổi ruột hộp **sau khi** tạo closure vẫn ăn. Bằng chứng: **giữ hộp, không giữ ảnh** |

### Bẫy
- **Thí nghiệm 2 là bẫy chính.** `hong()` không truyền gì → tham số `n` là `undefined` → `undefined++` → `NaN`.
  Nó chết không phải vì thiếu closure, mà vì **biến bị che (shadowing)**.
- Closure giữ **biến sống**, nên biến đổi thì closure thấy giá trị mới. Đây vừa là sức mạnh (bộ đếm),
  vừa là nguồn gốc **stale closure** trong React.
- Listener/timer không dọn thì closure còn sống → mọi thứ nó tham chiếu **không được thu gom** → rò rỉ bộ nhớ.

---

# BÀI 2 · Rules of Hooks

📁 `src/concepts/07-custom-hooks/Demo.tsx`

### 🎯 Câu chốt
> **React ĐẾM hook theo thứ tự, nó không hề biết tên biến của mình.**

Luật thật không phải *"cấm gọi hook trong if"*. Luật thật là:
> **Mọi lượt render phải gọi ĐÚNG một dãy hook giống hệt nhau.**
> `if` chỉ là cách phổ biến nhất để phá luật đó.

### Thí nghiệm
Hook nằm trong `if`, `coEmail` từ `true` → `false`:

```
render 1 (true) : ô0 → ten   | ô1 → email | ô2 → tuoi
render 2 (false): ô0 → ten   | ô1 → tuoi  ← ĐỌC NHẦM Ô CỦA EMAIL
```

`console.log` trong thân render cho thấy `typeof tuoi === "string"` — **`tuoi` biến thành chuỗi rỗng**,
rồi React ném `Rendered fewer hooks than expected` và trang trắng.

### Bẫy
- **Cái hook nằm trong `if` không phải nạn nhân. Nạn nhân là mọi hook ĐỨNG SAU nó.**
- Đổi tên biến `name` → `abc` → state vẫn chạy y nguyên. Vì `useState` **chưa từng nhận tên làm tham số**.
- Custom hook chỉ là **hàm thường**. Chữ `use` là quy ước cho ESLint đọc, React không quan tâm.
- Hai component cùng gọi `useCounter()` → **state riêng biệt**. Hook chia sẻ *logic*, không chia sẻ *dữ liệu*.
- `setState` gọi được ở: event handler ✅ · effect ✅ · callback async ✅ — **thân render ❌**
  → thân render thì `Too many re-renders`.

---

# BÀI 3 · Debounce & Race condition

📁 `src/concepts/07-custom-hooks/useDebounce.ts` · `RaceDemo.tsx`

### 🎯 Câu chốt
> **`useDebounce`: cleanup KHÔNG phải dọn rác — cleanup CHÍNH LÀ cơ chế debounce.**
> **`RaceDemo`: phản hồi về muộn nhất là kẻ ghi đè cuối cùng.**

### Debounce hoạt động thế nào
Mỗi lần `value` đổi → effect chạy lại → **cleanup của lần trước huỷ timer cũ** → đặt timer mới.
Gõ liên tục thì timer bị huỷ liên tục, không cái nào kịp nổ. Ngừng gõ đủ `delay` mới có một cái sống sót.

- Quên `clearTimeout` → **mọi timer đều nổ** → debounce mất sạch tác dụng, chỉ còn *"trễ 500ms"*.
- `delay` **phải** có trong deps. Thiếu nó thì `delay` đổi mà effect không chạy lại → timer mãi dùng số cũ = **stale closure**.
- `id` nằm trong closure của **lần chạy đó**, nên mỗi cleanup huỷ đúng timer của mình. ← đây là bài 1 quay lại.

### Race condition — hướng của con số
```
doTre = 1200 - q.length * 200
   "a"     → 1000ms   ← truy vấn RỘNG, nhiều kết quả → CHẬM
   "abcde" →  200ms   ← truy vấn HẸP,  ít kết quả   → NHANH
```

Gõ `abcde` → 5 request bay đi → **về NGƯỢC thứ tự** → cái của `"a"` về muộn nhất, ghi đè cuối cùng
→ **màn hình kẹt ở kết quả của `"a"`** trong khi ô nhập đang là `abcde`.

> Bug này **không crash, không log đỏ, chỉ hiện sai dữ liệu.** Nên nó sống rất lâu trong sản phẩm thật.

### Cách chữa: cờ huỷ
```js
let daHuy = false;                       // mỗi lần effect chạy sinh MỘT cái riêng
timKiem(q).then(kq => { if (!daHuy) setKetQua(kq); });
return () => { daHuy = true; };          // cleanup đánh dấu đúng lần chạy của mình
```
Không chặn được request bay đi — chỉ **từ chối kết quả của lần đã cũ**.
*(Bản xịn hơn: `AbortController` — huỷ được cả request thật.)*

### Bẫy — nhớ LÝ DO, đừng nhớ con số
> Truy vấn càng ngắn ⇒ càng nhiều kết quả phải lọc ⇒ **server trả càng chậm**.
> Nhớ được câu này thì không bao giờ nhớ ngược chiều nữa.

---

# BÀI 4 · useEffect đến tận gốc

📁 `src/concepts/08-useeffect-sau/Demo.tsx`

### 🎯 Câu chốt
> **Tính được từ state có sẵn thì TÍNH THẲNG khi render. Đừng nhét vào state rồi đồng bộ bằng effect.**

### Thí nghiệm A — state dẫn xuất · đo được **4 dòng log vs 2**

```
❌ const [hoten, setHoTen] = useState('');
   useEffect(() => setHoTen(ho + ' ' + ten), [ho, ten]);

✅ const hoten = ho + ' ' + ten;            // một dòng, không state, không effect
```

**Tách con số 4 ra làm hai thừa số — đây mới là chỗ phải hiểu:**
```
StrictMode gọi hàm ×2          → nhân đôi MỌI con số
setState trong effect          → thêm MỘT lượt render

  bản ✅ :  1 lượt × 2 = 2 dòng
  bản ❌ :  2 lượt × 2 = 4 dòng
```

Cái giá thật không phải là log thừa, mà là: **có một khung hình mà `ho` đã đổi còn `hoTen` thì chưa.**
Với cái tên thì vô hại. Với **số dư tài khoản** hay **trạng thái đơn hàng** thì không.

ESLint gọi đúng tên hiện tượng này: **`cascading renders`**.

### Thí nghiệm B — StrictMode · đo được **🟢🔴🟢**

Effect có cleanup, deps rỗng, tải trang → `🟢 effect` · `🔴 cleanup` · `🟢 effect`.

React **cố ý** mount → unmount → mount lại ở chế độ dev, để kiểm tra effect có sống sót
qua một vòng đời thứ hai không. Effect thiếu cleanup → **2 timer / 2 listener / 2 subscription**
trước khi giây đầu tiên trôi qua.

### Bẫy
- Effect **chạy sau khi trình duyệt đã vẽ xong**.
- Cleanup chạy **hai lúc**: trước mỗi lần effect chạy lại, và khi unmount.
- Muốn reset state khi prop đổi → **dùng `key`**, đừng dùng effect.

---

# BÀI 5 · useRef

📁 `src/concepts/09-useref/Demo.tsx`

### 🎯 Câu chốt
> **`useState`: React giữ GIÁ TRỊ, đổi thì vẽ lại. `useRef`: React giữ CÁI HỘP, đổi ruột thì React không biết gì.**

```
const r = useRef(0);
r.current = 5;        ✅  đổi thoải mái — đây là việc chính của nó
r = { current: 5 };   ❌  cấm vì `const`, KHÔNG phải vì ref

Thứ không đổi là CÁI HỘP.  Thứ đổi tẹt ga là RUỘT HỘP.
```

**Luật chọn hook:**
> React cần biết để vẽ → `useState`. Chỉ mình mình cần nhớ → `useRef`.
> *(id timer · nút DOM · giá trị lần trước · cờ huỷ · "đã unmount chưa")*

**Nối với bài 1:** mỗi render sinh biến mới, hộp mới — đó là gốc của mọi bug closure cũ.
`useRef` trả về **đúng cái hộp cũ**. Nó là lối thoát khỏi luật đó.

### Dòng thời gian một lần render — bản đồ gốc

```
①  React GỌI HÀM component          ref.current === null   ← nút DOM CHƯA tồn tại
②  React sửa NÚT DOM THẬT
③  React GẮN nút vào ref
   ═══ useLayoutEffect chạy ═══      trình duyệt bị CHẶN, đứng đợi
④  Trình duyệt TÔ LÊN MÀN HÌNH      ← mắt người nhìn thấy từ đây
   ═══ useEffect chạy ═══           màn hình vẽ xong rồi mới chạy
```

- `| null` không phải TypeScript khó tính — nó là **bước ① viết thành kiểu dữ liệu**.
  *(`null` lần hai: lúc unmount, để nút DOM cũ được thu gom.)*
- **Hàm component chạy trước khi màn hình tồn tại. Muốn đụng vào màn hình thì phải đợi effect.**
- `usePrevious` = **ghi chậm một nhịp**: bước ① *đọc* ref, bước ⑤ *ghi* ref.
  Nên bước ① luôn đọc được thứ của lượt trước. Không có phép màu nào cả — chỉ là thứ tự.

### useEffect vs useLayoutEffect — đánh đổi đo được bằng mắt

```
bản useEffect        0ms   →  ô xám + hộp hiện NGAY, nhưng ở SAI chỗ (top=0)
                     600ms →  nhảy xuống top=160        ← NHÁY, người dùng thấy cái sai

bản useLayoutEffect  0ms   →  MÀN HÌNH TRỐNG TRƠN
                     600ms →  hộp hiện thẳng ở top=160  ← không nháy, nhưng ĐỢI LÂU
```

> **`useEffect` hiện ra nhanh hơn. `useLayoutEffect` mượt hơn. KHÔNG phải cùng một cái.**
> Nó chặn bước ④, nên bước ④ đến muộn hơn — không thể vừa chặn vừa nhanh.
> **`useLayoutEffect` mua sự mượt bằng thời gian chờ.**

**Luật dùng:** mặc định luôn là `useEffect`. Chỉ đổi sang `useLayoutEffect` khi phải
**đo DOM rồi chỉnh lại trước khi người dùng kịp nhìn** — tooltip lật lên/xuống tuỳ chỗ trống,
đo chiều cao, khôi phục vị trí cuộn. Và giữ nó **thật ngắn**: mỗi mili-giây nằm trong
`useLayoutEffect` là một mili-giây **màn hình đứng hình**.

*(Bản `useEffect` không hề "trượt xuống" — **không có chuyển động nào cả**. Đúng hai lần tô:
một ở `top=0`, một ở `top=160`. Mắt tự nối hai khung hình thành cảm giác trượt.)*

### GÁN vs TÍCH LŨY — phần quan trọng nhất bài 5

```
ref.current = value   →  GÁN.       chạy 1 hay 9 lần → CÙNG kết quả  → sống sót
ref.current++         →  TÍCH LŨY.  chạy 2 lần → kết quả KHÁC        → lộ mặt
```

Tên riêng của tính chất đó: **idempotent**.

```
┌──────────────────────────────────────────────────────┐
│  StrictMode với React  =  at-least-once với backend  │
│  Cả hai chạy hàm của mình 2 lần, không phải để hành  │
│  mình — mà để ép mình viết hàm CHỊU ĐƯỢC chạy lại.   │
└──────────────────────────────────────────────────────┘
```

Chỗ từng gặp ngoài đời: **PR migrate BullMQ + Redis → Upstash QStash.**
QStash giao việc theo kiểu **at-least-once** — cùng một job **có thể về hai lần, đó là thiết kế**.
`status = 'done'` (gán) thì vô hại. `soLuong += 1` (tích lũy) thì sai số liệu.

### ESLint `react-hooks/refs` — biết cả hai vế
Rule chặn mọi thao tác đọc/ghi `.current` trong thân render.
- Ở **bộ đếm render**: rule đúng hoàn toàn, code đó bẩn thật.
- Ở **`usePrevious`**: đọc ref trong thân render **chính là cơ chế**, bỏ đi là hook chết.
  Đây là mẫu **cả thế giới dùng mà React không khuyến khích** — vì ở chế độ render đồng thời
  React không bảo đảm nó đứng yên nữa.

> Câu trả lời phỏng vấn làm mình khác đám đông:
> *"Em biết mẫu này, và biết ESLint của React flag nó vì nó đọc ref trong lúc render.
> Em dùng khi cần, nhưng nếu chỉ để so giá trị cũ–mới thì thường có cách sạch hơn."*

---

# BẢNG CHỐNG LẪN

*Đây là trang quan trọng nhất cả file. Không phải vì khó — mà vì đây đúng là chỗ mình hay nối chéo dây.*
**Năm nguyên nhân, cấm hoán đổi cho nhau:**

```
Too many re-renders (trang chết)   ←  setState trong THÂN RENDER
4 dòng log thay vì 2               ←  setState trong EFFECT → thêm một lượt render
2 timer / 2 listener               ←  effect thiếu CLEANUP
Gõ abcde ra kết quả 'a'            ←  phản hồi cũ về MUỘN, đè lên phản hồi mới
Số nhảy 2 thay vì 1                ←  StrictMode gọi HÀM 2 lần
infinite chain of updates          ←  effect THIẾU mảng deps
```

⚠️ Hai dòng cuối trông giống nhau nhưng khác chỗ:
**`Too many re-renders` = setState trong THÂN RENDER (bài 2).
`infinite chain of updates` = effect thiếu deps (bài 5).**

### StrictMode làm HAI việc riêng biệt — đừng gộp

> **Hàm thì lần nào cũng đôi. Effect thì chỉ đôi lúc chào đời.**

| | làm gì | khi nào | bắt lỗi gì | dấu vết |
|---|---|---|---|---|
| ① | gọi **hàm component** ×2 | **mọi** lượt render | render không thuần khiết | số nhảy **2** |
| ② | setup → cleanup → setup | **chỉ lúc mount** | thiếu cleanup | **🟢🔴🟢** |

---

# SỔ LỖI CỦA MÌNH

*Lỗi tự tay mình viết ra thì đọc lại có tác dụng hơn mọi lời giảng.*

| Đã viết / đã nghĩ | Sai ở đâu |
|---|---|
| `refOInput.current.focus()` | Tự tay khai `\| null` rồi bỏ qua đúng cái mình vừa khai. TS bắt: `TS18047` |
| `TestRef`, `Test2Ref` | Chữ hoa đầu dành cho **component/class**. Biến thường → `refOInput` |
| *"toán tử `++` cộng 2"* | Toán tử chưa bao giờ sai. Sai ở **số lần nó được chạy** |
| *"ref tránh được StrictMode"* | Không ai tránh được. Nó **trúng đòn mà không hề hấn** — vì là phép **GÁN** |
| *"4 dòng log vì thiếu cleanup"* | Thiếu cleanup → **tài nguyên nhân đôi**. 4 dòng log → **setState trong effect** |
| *"thiếu cleanup → vòng lặp vô tận"* | Vòng lặp vô tận là **setState trong thân render** (bài 2) |
| *"'a' thắng vì deps là delay"* | `'a'` thắng vì nó **về muộn nhất**, ghi đè cuối cùng |
| Truy vấn ngắn nhanh hay chậm | **CHẬM** — rộng thì nhiều kết quả *(18/08 nhớ ngược, 20/08 đã đúng)* |
| `useLayoutEffect(() => {...})` thiếu `[]` | Chạy lại sau MỌI lượt render. Không treo máy chỉ vì `setTop(160)` trùng giá trị cũ nên React bỏ qua — **may, không phải đúng**. Đổi thành `setTop(t => t+1)` là treo thật |
| *"useLayoutEffect hiện ra nhanh hơn"* | Nó **CHẶN** lúc tô, nên hiện ra **muộn hơn**. Nó mượt hơn, không nhanh hơn |

### Cách gỡ lỗi đã dùng được — dùng lại lần sau

**Phép thử LOẠI TRỪ đáng tin hơn phép thử gật đầu.**

Nghi StrictMode gây nhảy 2 → không đi tìm bằng chứng ủng hộ, mà đi tìm cách **giết** giả thuyết:
```
Bỏ <StrictMode>  → số về 1     ⇒ toán tử vô tội
Bấm +1 vẫn nhảy 2              ⇒ giả thuyết "mount→cleanup→mount" CHẾT
                                  (vì mount chỉ xảy ra MỘT lần trong đời component)
```
Thiết kế một phép thử mà **nếu giả thuyết sai thì kết quả phải khác đi** — rồi chạy.
Đó là gỡ lỗi. Còn chạy thử rồi gật gù *"ừ đúng rồi"* thì không chứng minh được gì.
