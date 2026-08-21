# Ngân hàng câu hỏi kỹ thuật — đáp án viết sẵn

> Câu hỏi kiến thức, hỏi ai cũng như ai, không phụ thuộc CV.
> Bản gắn với CV riêng nằm ở `docs/12-PHONG-VAN-THEO-CV.md` *(không lên GitHub)*.
>
> **Mọi đáp án ✅ đều viết đủ thành câu để nói ra miệng** — không phải gạch đầu dòng để tự diễn giải.

---

## Vị trí nào hỏi nặng phần nào

| | JS nền | React | Next.js | React Native | Backend/DB |
|---|---|---|---|---|---|
| **Frontend (React)** | 🔴 nặng | 🔴 nặng | 🟡 vừa | ⚪ ít | ⚪ ít |
| **Frontend (Next.js)** | 🟠 khá | 🔴 nặng | 🔴 nặng | ⚪ ít | 🟡 vừa |
| **Fullstack (Next.js)** | 🟠 khá | 🟠 khá | 🔴 nặng | ⚪ ít | 🔴 nặng |
| **Mobile (React Native)** | 🟠 khá | 🔴 nặng | ⚪ ít | 🔴 nặng | ⚪ ít |

**Đọc bảng này trước mỗi buổi phỏng vấn** rồi dồn sức vào cột 🔴 của vị trí đang ứng tuyển. Không đủ thời gian ôn hết đâu.

---

# PHẦN 1 · JavaScript nền

## 1.1 🎙️ "Closure là gì? Cho một ví dụ."

**🔍 Kiểm tra:** đây là câu lọc. Trả lời hụt thì họ hạ trần cho cả buổi còn lại.

**✅ Đáp án:**
> *"Dạ closure là một hàm cộng với **môi trường biến nơi nó được sinh ra**. Hàm bên trong vẫn truy cập được biến của hàm bên ngoài kể cả sau khi hàm ngoài đã chạy xong.*
>
> *Điểm em thấy quan trọng nhất là nó **giữ cái biến chứ không giữ một bản chụp giá trị**. Em từng chạy thử: khai báo `so = 10`, tạo closure đọc `so`, rồi đổi `so = 100` — closure vẫn thấy `100`. Chứng tỏ nó cầm chính cái ô nhớ đó.*
>
> *Trong React thì đây vừa là công cụ vừa là nguồn bug: một callback bắt được `state` của lượt render cũ rồi không cập nhật thì thành **stale closure** — người ta bấm nút mà giá trị cứ đứng yên ạ."*

**⚠️ Bẫy:** đừng chỉ đọc định nghĩa sách. **Kể một thí nghiệm cụ thể** — đó là thứ phân biệt người hiểu với người thuộc.

---

## 1.2 🎙️ "`var`, `let`, `const` khác nhau gì? TDZ là gì?"

**✅ Đáp án:**
> *"Dạ khác nhau ba chỗ.*
>
> ***Phạm vi:*** `var` *theo hàm,* `let` *và* `const` *theo khối — trong cặp ngoặc nhọn.*
>
> ***Gán lại:*** `const` *không gán lại được. Nhưng nó chỉ khoá **cái tên trỏ vào đâu**, không khoá ruột — object khai bằng* `const` *vẫn sửa thuộc tính được.*
>
> ***Hoisting:*** *cả ba đều được đưa lên đầu phạm vi, nhưng* `var` *khởi tạo sẵn là* `undefined` *nên đọc trước khi khai báo không lỗi, còn* `let`/`const` *thì nằm trong **vùng chết TDZ** — đọc trước dòng khai báo là ném* `ReferenceError` *ngay ạ.*
>
> *TDZ có ích: nó biến một bug âm thầm thành một lỗi to rõ ràng."*

---

## 1.3 🎙️ "`==` và `===` khác gì?"

**✅ Đáp án:**
> *"Dạ* `===` *so sánh không ép kiểu, khác kiểu là sai luôn.* `==` *thì tự ép kiểu trước khi so, nên ra những kết quả rất lạ như* `'' == 0` *hay* `null == undefined` *đều đúng.*
>
> *Em luôn dùng* `===`*, trừ đúng một trường hợp:* `x == null` *để bắt cả* `null` *lẫn* `undefined` *trong một phép ạ."*

**💡 Câu hỏi tiếp gần như chắc chắn — và nó là móng của cả phần React:**

> **🎙️ "`{a:1} === {a:1}` ra gì?"**
>
> *"Dạ ra* `false`*. Vì object, mảng và hàm **so sánh bằng địa chỉ**, không so ruột. Hai object ruột giống hệt nhau nhưng là hai vùng nhớ khác nhau nên khác nhau.*
>
> *Chỉ kiểu nguyên thuỷ — chuỗi, số, boolean — mới so bằng giá trị, nên* `'a' === 'a'` *là* `true`*.*
>
> *Chỗ này rất quan trọng trong React: mỗi lần render là hàm component chạy lại, mọi object và hàm khai báo bên trong đều là **vùng nhớ mới**. Nên nếu đưa chúng vào mảng deps hay vào props của* `memo` *thì lượt nào cũng bị coi là 'đã đổi' ạ."*

---

## 1.4 🎙️ "Event loop hoạt động thế nào? `setTimeout(fn, 0)` và `Promise.then(fn)` cái nào chạy trước?"

**✅ Đáp án:**
> *"Dạ **`Promise.then` chạy trước**.*
>
> *JavaScript có một luồng chính, và hai hàng đợi. `Promise.then` vào **microtask**, `setTimeout` vào **macrotask**. Sau mỗi lần luồng chính rảnh, engine **dọn sạch toàn bộ microtask trước**, rồi mới lấy một macrotask.*
>
> *Nên kể cả để* `setTimeout(fn, 0)` *thì* `.then` *vẫn chạy trước ạ."*

**⚠️ Bẫy:** đừng nói *"setTimeout 0 là chạy ngay"*. Nó chỉ có nghĩa *"xếp hàng sớm nhất có thể"*.

---

## 1.5 🎙️ "`async/await` và `Promise.then` khác gì? Bắt lỗi thế nào?"

**✅ Đáp án:**
> *"Dạ về bản chất giống nhau,* `async/await` *chỉ là cách viết dễ đọc hơn của Promise. Bắt lỗi thì dùng* `try/catch` *thay cho* `.catch()`*.*
>
> *Chỗ em hay lưu ý là **đừng `await` tuần tự những việc không phụ thuộc nhau** — ba lời gọi API độc lập mà* `await` *lần lượt thì mất tổng thời gian của cả ba. Dùng* `Promise.all` *thì chỉ mất bằng cái chậm nhất.*
>
> *Và* `Promise.all` *hỏng một cái là hỏng cả — nếu muốn cái nào xong biết cái đó thì dùng* `Promise.allSettled` *ạ."*

---

# PHẦN 2 · React

## 2.1 🎙️ "Vì sao không được gọi hook trong `if` hay trong vòng lặp?"

**🔍 Kiểm tra:** thuộc luật, hay hiểu cơ chế.

**✅ Đáp án:**
> *"Dạ vì React **không biết tên biến của mình** — nó lưu hook thành một **danh sách theo thứ tự gọi**, gắn với component đó. Lượt render sau nó lấy lại theo đúng thứ tự.*
>
> *Nên nếu một hook nằm trong* `if` *mà điều kiện đổi, số hook gọi ra bị lệch, và **mọi hook đứng sau nó đọc nhầm ô của hook khác**. Em thử rồi:* `useState(0)` *đọc trúng ô của một state chuỗi, thế là biến số biến thành chuỗi rỗng, rồi React ném* `Rendered fewer hooks than expected`*.*
>
> *Nên luật thật không hẳn là 'cấm gọi trong if' — luật thật là **mọi lượt render phải gọi đúng một dãy hook giống hệt nhau**. `if` chỉ là cách phá luật đó phổ biến nhất ạ."*

**💡 Câu này trả lời tốt là ăn điểm ngay,** vì phần lớn ứng viên chỉ đọc thuộc *"không được gọi trong if"* mà không nói được vì sao.

---

## 2.2 🎙️ "`useState` và `useRef` khác gì? Khi nào dùng cái nào?"

**✅ Đáp án:**
> *"Dạ khác nhau ở chỗ **có gây render lại hay không**.*
>
> `useState` *— React giữ giá trị, đổi là vẽ lại giao diện.*
> `useRef` *— React giữ **cái hộp**, mình đổi ruột thì React không biết gì, không render lại.*
>
> *Em chọn theo một câu: **React cần biết để vẽ thì dùng state; chỉ mình mình cần nhớ thì dùng ref.** Ví dụ id của* `setTimeout`*, một nút DOM, giá trị của lượt trước, hay cờ 'đã unmount chưa' — mấy cái đó React không cần biết nên để ref ạ."*

**⚠️ Bẫy hay bị hỏi bồi:** *"Ref có đổi được không?"*
→ **Đổi được thoải mái.** `ref.current = 5` hoàn toàn hợp lệ. Thứ không đổi là **cái hộp**, không phải ruột hộp.

---

## 2.3 🎙️ "`useEffect` chạy khi nào? Mảng deps để làm gì? Cleanup để làm gì?"

**✅ Đáp án:**
> *"Dạ effect chạy **sau khi trình duyệt đã vẽ xong**, không phải trong lúc render.*
>
> ***Mảng deps*** *quyết định khi nào chạy lại: không có mảng thì chạy sau **mọi** lượt render;* `[]` *thì chỉ chạy lúc mount; có phần tử thì chạy lại khi phần tử đó đổi. React so sánh bằng* `Object.is`*, gần như* `===`*.*
>
> ***Cleanup*** *chạy **hai lúc**: trước mỗi lần effect chạy lại, và khi component unmount.*
>
> *Em muốn nói thêm một điểm: **cleanup không chỉ để dọn rác**. Trong* `useDebounce`*, chính cleanup **là cơ chế** — mỗi lần gõ, cleanup huỷ hẹn giờ cũ rồi đặt cái mới, nên không cái nào kịp nổ cho tới khi ngừng gõ. Bỏ cleanup đi thì mọi hẹn giờ đều nổ và debounce mất sạch tác dụng ạ."*

---

## 2.4 🎙️ "Vì sao StrictMode chạy effect hai lần? Có phải bug không?"

**✅ Đáp án:**
> *"Dạ không phải bug, là cố ý và **chỉ ở môi trường dev**.*
>
> *StrictMode làm **hai việc riêng biệt**. Một là **gọi hàm component hai lần mỗi lượt render**, để bắt những chỗ render không thuần khiết — sửa dữ liệu ngoài ngay trong lúc render. Hai là **chạy effect rồi cleanup rồi chạy lại lúc mount**, để bắt effect thiếu cleanup.*
>
> *Nó ép mình viết code **chịu được chạy lại**. Effect nào thiếu cleanup thì lộ ngay: đăng ký hai lần, hai timer, hai listener.*
>
> *Em thấy nguyên lý này giống hệt hàng đợi job giao **at-least-once** ở backend — cùng một job có thể về hai lần, nên handler phải **idempotent**. StrictMode với React đúng là vai trò đó ạ."*

**💡 Nối được React với backend bằng một nguyên lý** là dấu hiệu hiểu bản chất. Rất ít junior nói được.

---

## 2.5 🎙️ "Khi nào KHÔNG cần `useEffect`?"

**🔍 Kiểm tra:** đây là câu tách người dùng React lâu với người mới. Lạm dụng `useEffect` là lỗi phổ biến nhất.

**✅ Đáp án:**
> *"Dạ ba trường hợp em hay gặp.*
>
> ***Một — giá trị tính được từ state có sẵn.*** *Đừng để nó thành state riêng rồi đồng bộ bằng effect. Cứ tính thẳng khi render:* `const hoTen = ho + ' ' + ten`*. Em đo thử rồi: bản dùng effect **tốn thêm một lượt render**, và có **một khung hình mà họ đã đổi còn họ tên thì chưa** — với cái tên thì vô hại, với số dư tài khoản thì không.*
>
> ***Hai — muốn reset state khi prop đổi.*** *Dùng* `key` *để React tạo component mới, sạch hơn nhiều.*
>
> ***Ba — xử lý sự kiện người dùng.*** *Việc đó thuộc về event handler, không phải effect.*
>
> *Em nhớ một câu: **effect là để đồng bộ với thứ bên ngoài React** — mạng, DOM, timer, thư viện ngoài. Còn trong nội bộ React thì thường có cách tốt hơn ạ."*

---

## 2.6 🎙️ "`useMemo`, `useCallback`, `memo` — khác gì? Khi nào dùng?"

**✅ Đáp án:**
> *"Dạ cả ba đều dựa trên một chuyện: **object và hàm so sánh bằng địa chỉ**, mà mỗi lần render thì chúng được tạo mới, nên luôn bị coi là đã đổi.*
>
> `memo` *bọc component: props không đổi thì không render lại.*
> `useCallback` *giữ nguyên **địa chỉ của một hàm** qua các lượt render.*
> `useMemo` *có **hai công dụng khác nhau** — giữ nguyên **địa chỉ của một giá trị**, và **bỏ qua một phép tính đắt tiền**.*
>
> *Chỗ hay sai là bọc* `memo` *cho component con rồi vẫn truyền vào một hàm mũi tên viết thẳng — mỗi render một hàm mới, nên* `memo` *vô dụng hoàn toàn. Phải bọc hàm đó bằng* `useCallback` *thì* `memo` *mới có tác dụng.*
>
> *Nhưng em không bọc mặc định. Bản thân việc bọc cũng tốn bộ nhớ và so sánh — em chỉ dùng khi **đã đo thấy có vấn đề** ạ."*

**⚠️ Bẫy:** đừng nói *"bọc hết cho nhanh"*. Người phỏng vấn hỏi bồi *"bọc thì có tốn gì không?"* là lộ.

---

## 2.7 🎙️ "Prop `key` để làm gì? Dùng index làm key có sao không?"

**✅ Đáp án:**
> *"Dạ* `key` *để React biết **phần tử nào trong danh sách là phần tử nào** giữa hai lượt render, nhờ đó nó giữ đúng state và DOM cho từng phần tử.*
>
> *Dùng index thì hỏng khi danh sách **bị chèn, xoá hoặc sắp xếp lại** — vì lúc đó index của một phần tử đổi, React tưởng nó là phần tử khác. Triệu chứng kinh điển là **xoá một dòng thì nội dung ô nhập nhảy sang dòng khác**.*
>
> *Danh sách chỉ hiển thị và không bao giờ đổi thứ tự thì dùng index cũng được, nhưng em vẫn ưu tiên id thật ạ.*
>
> *Ngược lại,* `key` *còn dùng có chủ đích để **ép reset state**: đổi* `key` *là React bỏ component cũ tạo cái mới hoàn toàn."*

---

## 2.8 🎙️ "Component render lại khi nào?"

**✅ Đáp án:**
> *"Dạ ba trường hợp: **state của chính nó đổi**, **props đổi**, hoặc **component cha render lại**.*
>
> *Cái thứ ba hay bị bỏ sót: cha render thì con render theo, kể cả props con không đổi gì — trừ khi con được bọc* `memo`*.*
>
> *Và một điểm em thấy quan trọng: **render lại không có nghĩa là DOM bị sửa lại**. React chạy hàm component rồi so sánh, chỉ chỗ nào thật sự khác mới đụng vào DOM. Nên render thừa thường không đắt như người ta tưởng — cứ đo trước rồi hãy tối ưu ạ."*

---

## 2.9 🎙️ "Controlled component và uncontrolled khác gì?"

**✅ Đáp án:**
> *"Dạ **controlled** là giá trị ô nhập do React state giữ, mỗi lần gõ là* `setState` *rồi render lại. **Uncontrolled** thì để DOM tự giữ, mình lấy giá trị qua* `ref` *khi cần.*
>
> *Controlled tiện khi cần validate theo từng ký tự hay khoá/mở nút gửi. Uncontrolled nhẹ hơn với form to, vì không render lại theo từng phím.*
>
> *Thực tế em hay dùng React Hook Form — nó dùng uncontrolled bên dưới để tránh render lại toàn form, kết hợp Zod để validate theo schema ạ."*

---

## 2.10 🎙️ "Custom hook là gì? Em tách hook theo nguyên tắc nào?"

**✅ Đáp án:**
> *"Dạ custom hook chỉ là một **hàm JavaScript bình thường** có gọi hook khác bên trong. Chữ* `use` *ở đầu tên là quy ước để ESLint kiểm tra được, chứ React không xử lý gì đặc biệt.*
>
> *Em tách khi **cùng một logic có trạng thái bị lặp ở nhiều nơi** — ví dụ debounce ô tìm kiếm, đọc/ghi localStorage, theo dõi trạng thái đã mount.*
>
> *Em **không tách** chỉ để cho file ngắn lại. Kéo code sang chỗ khác mà không dùng lại thì chỉ thêm một chỗ phải nhảy qua nhảy lại khi đọc.*
>
> *Một điểm hay bị nhầm: hai component cùng gọi một custom hook thì **state hoàn toàn riêng**. Hook chia sẻ **logic**, không chia sẻ **dữ liệu** — muốn chia sẻ dữ liệu thì phải dùng Context hoặc store ngoài ạ."*

---

## 2.11 🎙️ "Context và Zustand/Redux khác gì? Khi nào dùng cái nào?"

**✅ Đáp án:**
> *"Dạ khác nhau lớn nhất ở **phạm vi render lại**.*
>
> *Context khi đổi* `value` *thì **mọi component đang dùng nó đều render lại**, kể cả component đó chỉ quan tâm một trường nhỏ trong đó. Với dữ liệu ít đổi như theme hay ngôn ngữ thì không sao, nhưng với dữ liệu đổi liên tục thì thành vấn đề.*
>
> *Zustand thì lấy theo **selector** — component chỉ đăng ký đúng miếng nó cần, miếng khác đổi thì nó đứng yên.*
>
> *Nên em dùng Context cho thứ **ít đổi và nhiều nơi cần**, dùng store ngoài cho **trạng thái ứng dụng đổi thường xuyên**. Còn dữ liệu từ server thì em không nhét vào store — cái đó để thư viện fetching lo, vì nó có cache và revalidate sẵn ạ."*

---

# PHẦN 3 · Next.js App Router

## 3.1 🎙️ "Server Component và Client Component khác gì? Vì sao Server Component không có state?"

**🔍 Kiểm tra:** câu quan trọng nhất phần Next.js. Hỏi gần như chắc chắn.

**✅ Đáp án:**
> *"Dạ **Server Component chạy trên server và chỉ chạy một lần** — nó render ra kết quả rồi gửi xuống. Nó không được gửi kèm JavaScript xuống trình duyệt.*
>
> *Vì nó không có mặt ở trình duyệt nên **không có state và không có effect** — state chỉ có nghĩa khi có thứ gì đó render lại được, mà nó thì không render lại. Cùng lý do, nó không bắt được sự kiện* `onClick`*.*
>
> *Đổi lại nó **truy cập thẳng database hoặc đọc biến môi trường bí mật** được, vì code đó không bao giờ xuống client. Và nó **không tính vào kích thước bundle**.*
>
> *Khi cần tương tác thì em đánh dấu* `'use client'`*. Điểm em phải để ý là **`'use client'` lan xuống toàn bộ cây con** — một component thành client thì mọi thứ nó import cũng thành client. Nên em cố đẩy ranh giới* `'use client'` *xuống càng sâu càng tốt, thay vì đặt ở tầng trên cùng ạ."*

**⚠️ Bẫy:** đừng nói *"Server Component nhanh hơn"*. Nói **nó khác chỗ nào và đánh đổi gì**.

---

## 3.2 🎙️ "Next.js có mấy tầng cache?"

**✅ Đáp án:**
> *"Dạ App Router có **bốn tầng**:*
>
> ***Request Memoization*** *— trong cùng một lần render, gọi* `fetch` *cùng URL nhiều lần thì chỉ đi mạng một lần.*
> ***Data Cache*** *— cache kết quả* `fetch` *giữa các request và các lần deploy, điều khiển bằng* `revalidate`*.*
> ***Full Route Cache*** *— cache luôn HTML của route tĩnh lúc build.*
> ***Router Cache*** *— cache ở phía client, giữ payload của route đã ghé để quay lại cho nhanh.*
>
> *Em từng dùng* `force-dynamic` *và* `revalidate` *theo cảm giác, sau mới hiểu là mình đang tắt tầng nào. Thật ra khi thấy 'dữ liệu không chịu cập nhật' thì việc đầu tiên là **xác định đang kẹt ở tầng nào**, chứ không phải rải* `force-dynamic` *khắp nơi ạ."*

**💡 Câu tự nhận này rất mạnh** — nó thật, và cho thấy đã đi từ dùng được sang hiểu được.

---

## 3.3 🎙️ "Route Handler và Server Action — khi nào dùng cái nào?"

**✅ Đáp án:**
> *"Dạ **Server Action** hợp khi form hoặc nút trong chính app của mình cần thay đổi dữ liệu — gọi thẳng như hàm, không phải tự viết endpoint, và* `revalidatePath` *xong là giao diện tự cập nhật.*
>
> ***Route Handler** thì cần khi phải có một **URL thật**: webhook từ bên thứ ba gọi vào, app mobile gọi tới, cron gọi tới, hay bất cứ ai ngoài app web.*
>
> *Ở dự án cũ em dùng Route Handler cho webhook thanh toán, vì cổng thanh toán cần một địa chỉ HTTP cố định để gọi.*
>
> ***Middleware** thì em để việc chạy trước mọi request: kiểm tra đăng nhập, chuyển hướng theo ngôn ngữ. Em giữ nó thật mỏng vì nó chạy cho mọi route ạ."*

---

## 3.4 🎙️ "SSR, SSG, ISR khác gì?"

**✅ Đáp án:**
> *"Dạ **SSG** dựng HTML **lúc build**, nhanh nhất nhưng nội dung đứng yên tới lần deploy sau.*
> ***SSR** dựng **mỗi lần có request**, luôn mới nhưng chậm hơn và tốn server.*
> ***ISR** là ở giữa: dựng sẵn như SSG nhưng **tự dựng lại sau một khoảng thời gian**, nên vừa nhanh vừa không quá cũ.*
>
> *Trong App Router thì không khai báo bằng tên nữa mà **suy ra từ cách lấy dữ liệu**:* `revalidate` *bao nhiêu giây, hay* `force-dynamic` *ạ."*

---

# PHẦN 4 · React Native *(chỉ khi ứng tuyển mobile)*

## 4.1 🎙️ "React Native khác React web ở đâu?"

**✅ Đáp án:**
> *"Dạ giống nhau về mô hình component và hook, khác ở tầng dưới.*
>
> *Không có DOM — thay* `div` *bằng* `View`*,* `span` *bằng* `Text`*, và **mọi chữ bắt buộc nằm trong `Text`**. Style không phải CSS mà là object, layout thì chỉ có flexbox, không có grid.*
>
> *Điều hướng phải dùng thư viện chứ không có URL. Và có những thứ chỉ mobile mới có: quyền truy cập, deep link, trạng thái app chạy nền, và khác biệt giữa iOS với Android — em gặp nhiều nhất ở phần an toàn viền màn hình và bàn phím che ô nhập ạ."*

---

## 4.2 🎙️ "Em đưa app lên store thế nào? OTA update là gì?"

**✅ Đáp án — đây là chỗ mạnh, kể kỹ hơn một chút:**
> *"Dạ em dùng **EAS Build** để dựng bản cài, đẩy lên **TestFlight** cho iOS để test nội bộ trước, rồi mới nộp lên App Store và Google Play.*
>
> *Phần mất thời gian nhất không phải kỹ thuật mà là **quy trình duyệt** — em từng phải xử lý theo **App Store Guideline 3.1.1** về thanh toán trong ứng dụng.*
>
> ***OTA** là cập nhật thẳng phần JavaScript xuống máy người dùng mà không cần nộp lại store. Rất tiện để sửa lỗi gấp. Nhưng nó **chỉ đổi được phần JS** — động vào code native hay đổi thư viện native thì vẫn phải dựng lại và nộp lại ạ."*

---

# PHẦN 5 · Backend & Database *(cho vị trí fullstack)*

## 5.1 🎙️ "Index trong database để làm gì? Có nhược điểm không?"

**✅ Đáp án:**
> *"Dạ index giúp tìm nhanh mà không phải **quét toàn bộ bảng**.*
>
> *Em từng gặp thật: một truy vấn xếp hạng **quét cả bảng mỗi lần có người mở trang hồ sơ**. Thêm index cho đường truy vấn nóng là khác hẳn.*
>
> *Nhược điểm là index **chiếm dung lượng** và **làm chậm việc ghi** — mỗi lần thêm hoặc sửa, database phải cập nhật cả index. Nên chỉ đánh index cho cột thật sự hay dùng để lọc hoặc sắp xếp, không đánh bừa ạ."*

---

## 5.2 🎙️ "Transaction là gì? ACID?"

**✅ Đáp án:**
> *"Dạ transaction là một nhóm thao tác **hoặc thành công hết, hoặc không cái nào được ghi**. Chuyển tiền là ví dụ kinh điển — trừ bên này mà không cộng được bên kia thì phải huỷ cả hai.*
>
> *ACID là bốn tính chất: **nguyên tử** (trọn gói), **nhất quán** (không phá ràng buộc), **cô lập** (các transaction chạy song song không giẫm lên nhau), **bền vững** (đã commit là còn kể cả mất điện).*
>
> *Em áp dụng chỗ thao tác tiền và kho đồ: em đẩy cả phép đọc–tính–ghi xuống **một hàm trong database** thay vì đọc lên ứng dụng rồi tính. Vì để ở ứng dụng thì **có khe hở giữa lúc đọc và lúc ghi**, hai request song song rơi vào đó là nhân đôi số dư ạ."*

---

## 5.3 🎙️ "Vấn đề N+1 query là gì?"

**✅ Đáp án:**
> *"Dạ là lấy danh sách 1 lần, rồi **lặp qua từng phần tử lại query thêm 1 lần nữa** — 100 bài viết thành 101 lượt hỏi database.*
>
> *Cách chữa là gộp lại: dùng* `JOIN`*, hoặc lấy hết id rồi query một lần bằng* `IN`*, hoặc dùng cơ chế eager loading của ORM.*
>
> *Nó nguy hiểm vì **lúc dev với 10 dòng dữ liệu thì không thấy gì**, lên production mới lộ ạ."*

---

# PHẦN 6 · Câu tình huống

## 6.1 🎙️ "Trang bị chậm. Em làm gì đầu tiên?"

**🔍 Kiểm tra:** có đo trước khi sửa không, hay đoán rồi sửa bừa.

**✅ Đáp án:**
> *"Dạ việc đầu tiên là **đo, chưa sửa gì cả**. Vì 'chậm' có nhiều loại rất khác nhau: chậm tải lần đầu, chậm khi bấm, hay chậm khi cuộn.*
>
> *Em mở tab Network xem có phải chờ API không, mở React Profiler xem có component nào render thừa không, xem bundle có nặng bất thường không.*
>
> *Xác định đúng chỗ rồi mới chọn cách: chậm do mạng thì cache hoặc gộp request, chậm do render thì* `memo` *hoặc virtualization, chậm do bundle thì tách code.*
>
> *Em từng gặp một ca đúng kiểu này: người dùng bảo chậm, em log ra thì hoá ra **một thao tác gọi API 12 lần** do retry chồng ba tầng. Nếu lúc đó em đi tối ưu render thì sửa nhầm chỗ hoàn toàn ạ."*

---

## 6.2 🎙️ "Em nhận task mà spec không rõ. Em làm gì?"

**✅ Đáp án:**
> *"Dạ em **không ngồi đoán rồi làm luôn**, vì làm sai hướng thì mất cả ngày.*
>
> *Em viết ra cách hiểu của mình thành vài gạch đầu dòng cụ thể — đầu vào gì, đầu ra gì, trường hợp biên xử lý sao — rồi hỏi lại người giao trong một tin nhắn. Hỏi kiểu 'em hiểu thế này đúng không ạ' thì người ta trả lời nhanh hơn hỏi 'anh cho em thêm thông tin'.*
>
> *Nếu chưa trả lời ngay được thì em làm phần chắc chắn đúng trước, và ghi rõ chỗ nào em đang giả định ạ."*

---

## 6.3 🎙️ "Em làm sao để cập nhật kiến thức?"

**✅ Đáp án — nói thật, có vật chứng:**
> *"Dạ em đọc tài liệu chính thức là chính, react.dev và nextjs.org, vì blog hay lệch phiên bản.*
>
> *Nhưng cách hiệu quả nhất với em là **tự dựng thí nghiệm nhỏ**. Em có một repo riêng, mỗi khái niệm em viết một demo, **dự đoán trước kết quả rồi mới chạy** để đối chiếu. Chỗ nào đoán sai chính là chỗ em hiểu sai mà không biết.*
>
> *Ví dụ em từng đinh ninh effect chỉ chạy một lần lúc mount, chạy thử ở StrictMode mới thấy nó chạy hai lần và hiểu vì sao React cố ý làm thế ạ."*

---

# Cách luyện

```
1.  Đọc 🎙️ câu hỏi.  ĐÓNG FILE LẠI.
2.  NÓI TO câu trả lời.  Không nói thầm, không viết ra.
3.  Mở lại, so với ✅.
4.  Chỗ nào hụt → nói lại riêng chỗ đó một lần nữa.
```

> **Nói thầm trong đầu thì câu nào cũng trôi. Ra khỏi miệng mới lộ chỗ đứt.**
> Phòng phỏng vấn chỉ nghe được cái ra khỏi miệng.

**Ba câu đáng luyện trước nhất**, vì hỏi nhiều nhất và trả lời tốt thì ăn điểm ngay:

| | |
|---|---|
| **2.1** | Vì sao không gọi hook trong `if` |
| **3.1** | Server vs Client Component |
| **2.5** | Khi nào KHÔNG cần `useEffect` |

---

> Đáp án ở đây viết theo **giọng nói thật**, không phải văn viết. Cứ đọc lên đúng như thế.
> Nhưng **đừng học thuộc từng chữ** — người nghe phân biệt được giọng đọc thuộc với giọng hiểu.
> Thuộc **cái khung và các con số**, còn chữ nghĩa thì để tự bật ra.
