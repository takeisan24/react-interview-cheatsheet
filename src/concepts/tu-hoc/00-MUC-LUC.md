# Tự học — bản đồ đi tiếp một mình

> Viết ngày 21/08/2026, cho quãng **sau 31/08** khi không còn ai chấm bài.
> Mọi thứ nằm trong repo này, đọc bằng bất cứ trình soạn thảo nào, không cần công cụ gì.

---

## Đọc theo thứ tự nào

**Trước hết, đọc lại `../GHI-NHO.md`** — bài 1→5, thứ đã học có người chấm.
Đặc biệt là **Bảng chống lẫn** và **Sổ lỗi**. Hai trang đó là chỗ yếu đã được chẩn đoán,
không phải chỗ khó chung chung.

Sau đó đi theo ba tầng dưới đây. **Tầng 1 trước, đừng nhảy cóc** — không phải vì khó dần,
mà vì tầng 1 là chỗ được hỏi nhiều nhất và cũng là chỗ mình đã có kinh nghiệm thật để kể.

---

## 🔴 TẦNG 1 — làm trước, đây là chỗ ăn điểm

*Bốn chủ đề Next.js: viết hằng ngày mà lý thuyết mỏng nhất. Đây là mất cân đối lớn nhất
giữa "làm được" và "nói được".*

| | Chủ đề | Vì sao là ưu tiên số một |
|---|---|---|
| 06 | **Referential equality · `useMemo` · `useCallback` · `memo`** | Bị hỏi liên tục ở mọi cấp. Nối thẳng vào bài 5: *mỗi render sinh hộp mới* |
| 07 | **Server vs Client Component** | Viết `'use client'` hằng ngày. Câu hỏi *"vì sao Server Component không có state"* gần như chắc chắn bị hỏi |
| 08 | **Bốn tầng cache của Next.js** | Đã dùng `force-dynamic` và `revalidate` — giờ mới biết vì sao. Đây là chỗ ứng viên rụng nhiều nhất |
| 09 | **Route Handler · Server Action · middleware** | Đã tự viết hàng chục route handler. Câu hỏi là *khi nào dùng cái nào* |
| 10 | **Context vs Zustand · selector · re-render** | Có chuyện thật để kể: từng dựng store rồi đề xuất tách nhỏ nó ra |

## 🟡 TẦNG 2 — làm sau, vẫn hay bị hỏi

| | Chủ đề | Ghi chú |
|---|---|---|
| 11 | **Fetching · cache · cập nhật lạc quan · idempotency** | Nửa phần idempotency đã nắm rồi *(xem `GHI-NHO.md` bài 5)* |
| 12 | **Concurrent React** — `useTransition`, `useDeferredValue` | Bọc **hành động** vs bọc **giá trị** |
| 13 | **Suspense & streaming** | Vì sao streaming làm trang *có cảm giác* nhanh hơn dù tổng thời gian không đổi |
| 14 | **Core Web Vitals & trình duyệt** | LCP · INP · **CLS**. Từng sửa giật giao diện bằng skeleton — đó chính là CLS |
| 15 | **Mạng & bảo mật** | CORS + preflight · cookie vs localStorage · XSS/CSRF |

## 🟢 TẦNG 3 — làm khi còn thời gian

| | Chủ đề | Ghi chú |
|---|---|---|
| 16 | **TypeScript: generic & discriminated union** | Dùng TS hằng ngày rồi, khoảng hụt nhỏ hơn các mục trên |
| 17 | **TypeScript: utility types & suy kiểu** | `Partial` `Pick` `Omit` `Record` `ReturnType` · `satisfies` · `unknown` vs `any` |
| 18 | **Đo trước khi tối ưu** | React Profiler, flame graph, virtualization, code splitting |
| 19 | **Kiểm thử** | Đã viết hàng chục spec thật — trả lời được bằng kinh nghiệm dù chưa học lý thuyết |
| 20 | **Thiết kế hệ thống Frontend** | Ít bị hỏi ở vị trí fresher/junior. Để cuối |

---

## Cách học một chủ đề — giữ đúng nhịp đã quen

Nhịp **đoán trước → chạy → đối chiếu** là thứ đã hiệu quả suốt 5 buổi. Không có người chấm
thì tự chấm, nhưng **đừng bỏ bước đoán** — đó chính là bước làm kiến thức bám lại.

```
1.  Đọc phần 🎯 Câu chốt.  ĐỪNG đọc tiếp.
2.  Đọc phần "Thí nghiệm".  VIẾT dự đoán ra giấy hoặc gõ vào file.  Bắt buộc viết.
3.  Chạy.  Ghi lại con số THẬT.
4.  Lệch với dự đoán ở đâu → đó là bài học của hôm nay.  Chép dòng đó vào Sổ lỗi.
5.  Đọc phần còn lại.  Nói to câu trả lời phỏng vấn, không nhìn giấy.
```

> **Đọc mà không đoán trước thì tạo cảm giác "à mình biết rồi" trong khi chưa nói lại được.**
> Đây là cái bẫy lớn nhất của tự học. Thuốc giải duy nhất: **viết dự đoán ra trước khi chạy.**

**Bước 5 đừng bỏ.** Suốt 5 buổi vừa rồi, nhịp *nói to* là nhịp bị bỏ nhiều nhất — và
phỏng vấn thì hỏi bằng miệng chứ không hỏi bằng bàn phím. Hiểu trong đầu mà không nói
thành lời được thì trong phòng phỏng vấn tính là không biết.

---

## Đọc thêm ở đâu — nguồn thật, không phải blog rác

| Nguồn | Dùng cho | Đánh giá |
|---|---|---|
| [react.dev/learn](https://react.dev/learn) | Toàn bộ React hiện đại | Tài liệu chính thức, viết lại năm 2023, **tốt hơn hầu hết khoá học trả tiền** |
| [react.dev/reference/react](https://react.dev/reference/react) | Tra từng hook | Mục *"Pitfalls"* và *"Troubleshooting"* của mỗi trang là phần đáng đọc nhất |
| [nextjs.org/docs/app](https://nextjs.org/docs/app) | Server Component, cache, route handler | Đọc kỹ mục **Caching** — đó là chỗ rụng nhiều nhất |
| [overreacted.io](https://overreacted.io/a-complete-guide-to-useeffect/) | `useEffect` đến tận gốc | Dan Abramov, người từng làm React. Bài dài nhưng đáng |
| [tkdodo.eu/blog](https://tkdodo.eu/blog) | Fetching, cache, tính ổn định tham chiếu | Loạt bài React Query — hiểu cả khi không dùng thư viện đó |
| [web.dev/vitals](https://web.dev/vitals/) | LCP · INP · CLS | Của Google, chính là bên đặt ra chỉ số |
| [joshwcomeau.com](https://www.joshwcomeau.com/) | Cơ chế render, CSS | Giải thích bằng hình động, hợp với kiểu học nhìn-thấy-mới-tin |
| [typescriptlang.org/docs/handbook](https://www.typescriptlang.org/docs/handbook/intro.html) | TypeScript | Đọc phần Generics và Narrowing, bỏ qua phần còn lại |

**Cách dùng đúng:** đọc câu chốt trong file của tôi trước → tự đoán → chạy → **rồi mới**
sang nguồn ngoài đọc kỹ. Đọc nguồn ngoài trước thì thành đọc trôi, không có gì để đối chiếu.

---

## Neo vào code thật — thứ không ai khác có

Vẫn còn clone local các dự án đã làm. Đây là **lợi thế lớn nhất** so với ứng viên khác,
và cũng là cách học nhanh nhất: mỗi chủ đề học xong, **mở code cũ ra tìm chỗ mình đã dùng nó**.

| Học xong chủ đề | Đi tìm cái này trong code cũ |
|---|---|
| Server vs Client Component | Đếm bao nhiêu file có `'use client'` — rồi tự hỏi **cái nào thừa** |
| Bốn tầng cache Next.js | Tìm mọi chỗ đã viết `force-dynamic` / `revalidate` — hỏi *lúc đó vì sao mình viết thế* |
| Route Handler vs Server Action | Mở vài route handler đã viết — hỏi *cái này có thể là Server Action không* |
| Context vs Zustand | Mở store đã dựng — hỏi *nếu làm lại thì tách slice thế nào* |
| Core Web Vitals | Tìm chỗ đã thêm skeleton chống giật — đó **đúng là CLS**, giờ gọi được tên nó |
| Kiểm thử | Mở spec đã viết — hỏi *vì sao lúc đó chọn query này chứ không phải query kia* |

Trả lời được cột phải = có một câu chuyện thật để kể trong phỏng vấn.
Đó là thứ **không đọc tài liệu nào ra được**, và là thứ phần lớn ứng viên không có.

---

## Lịch gợi ý sau 31/08

Không cần mỗi ngày. **Cần đều.**

```
3 buổi/tuần × 90 phút  →  Tầng 1 xong sau ~2 tuần
                          Tầng 2 xong sau ~4 tuần
                          Tầng 3 làm dần, không gấp
```

Mỗi buổi mở đầu bằng **5 phút kể lại buổi trước, không nhìn giấy**. Nhịp này đã bắt được
mấy chỗ nối chéo dây trong 5 buổi vừa qua — nó vẫn hiệu quả khi tự học, chỉ cần thành thật
với chính mình lúc kể không ra.

---

> **Một câu cuối, và đây là câu quan trọng nhất file này.**
>
> Lộ trình này **không phải điều kiện để bắt đầu đi phỏng vấn.** Nó làm mình mạnh hơn,
> không phải làm mình *đủ tư cách* — hai chuyện hoàn toàn khác nhau.
>
> Năm buổi đã học phủ đúng nhóm câu hỏi hook bị hỏi nhiều nhất, và mình có kinh nghiệm
> sản phẩm thật mà phần lớn ứng viên cùng lứa không có. Buổi phỏng vấn đầu tiên sẽ dạy
> nhiều hơn bất cứ buổi tự học nào — kể cả buổi đó trượt. **Đặc biệt là buổi đó trượt.**
