# React Interview Cheatsheet

> Học React internals bằng cách **chạy thử**, không phải đọc chay.

[![React](https://img.shields.io/badge/React-19-61DAFB?logo=react&logoColor=black)](https://react.dev)
[![TypeScript](https://img.shields.io/badge/TypeScript-3178C6?logo=typescript&logoColor=white)](https://www.typescriptlang.org)
[![Vite](https://img.shields.io/badge/Vite-646CFF?logo=vite&logoColor=white)](https://vite.dev)

Sáu chủ đề hay bị hỏi trong phỏng vấn React — những thứ mà đọc lý thuyết xong vẫn thấy mơ hồ,
phải nhìn nó xảy ra mới hiểu. Mỗi chủ đề gồm **lý thuyết + demo bấm được + bẫy phỏng vấn + quiz + bài tập tự sửa**.

---

## Sáu chủ đề

| # | Chủ đề | Câu hỏi nó trả lời |
|---|---|---|
| 01 | **Stale Closure** trong `useEffect` | Vì sao `setInterval` với deps `[]` làm `count` kẹt ở 1 mãi mãi? |
| 02 | **Event Loop** — Call Stack, Microtask vs Macrotask | JS đơn luồng thì xử lý bất đồng bộ kiểu gì mà không đơ UI? |
| 03 | **Scope, Hoisting & TDZ** | `var` / `let` / `const` khác nhau ở đâu, và TDZ là cái gì? |
| 04 | **Virtual DOM, Reconciliation & Fiber** | React quyết định vẽ lại cái gì bằng thuật toán nào? |
| 05 | **Automatic Batching & State Queue** (React 18) | Vì sao gọi `setState` ba lần chỉ re-render một lần? |
| 06 | **Referential Equality & `React.memo`** | Khi nào `useMemo`/`useCallback` giúp ích, khi nào là tối ưu thừa? |

## Mỗi chủ đề có gì

- **`README.md`** — lý thuyết: vấn đề là gì → dưới nắp ca-pô chạy ra sao → bảng so sánh → best practice
- **`Demo.tsx`** — component tương tác, bấm để thấy đúng hiện tượng đang bàn
- **Interview trap** — những chỗ dễ trả lời sai khi bị hỏi vặn
- **Quiz** — câu hỏi trắc nghiệm kèm giải thích đáp án
- **`exercises/ChallengeXX.tsx`** — code có sẵn lỗi, tự sửa rồi đối chiếu
- **`scratch/MasterScratch.tsx`** — chỗ trống để nghịch tự do

## Cấu trúc

```text
src/
├── concepts/
│   ├── 01-stale-closure/            README.md + Demo.tsx
│   ├── 02-event-loop/               README.md + Demo.tsx
│   ├── 03-scope-hoisting-tdz/       README.md + Demo.tsx
│   ├── 04-vdom-reconciliation-fiber/ README.md + Demo.tsx
│   ├── 05-lifecycle-batching-react18/ README.md + Demo.tsx
│   └── 06-referential-equality-memo/ README.md + Demo.tsx
├── exercises/    Challenge01–06 — bài tập tự sửa
├── scratch/      MasterScratch — sân nghịch
└── App.tsx       gom lý thuyết, demo, quiz vào một giao diện
```

## Chạy thử

```bash
npm install
npm run dev      # mở http://localhost:5173
npm run build    # tsc -b && vite build
npm run lint
```

Không cần biến môi trường, không cần backend — chạy hoàn toàn ở máy.

---

## Vì sao có repo này

Ôn phỏng vấn bằng cách đọc list câu hỏi thì nhớ được câu trả lời, nhưng bị hỏi vặn một cái là đuối.
Sáu chủ đề ở đây đều là loại phải **thấy** mới hiểu: stale closure phải nhìn số kẹt lại, batching phải
đếm số lần render, referential equality phải thấy component con re-render vô cớ.

Nên mỗi chủ đề đi kèm một demo bấm được, và một bài tập cố tình viết sai để tự tay sửa.

## Ghi chú

Nội dung viết bằng tiếng Việt. Đây là tài liệu tôi tự soạn để ôn tập — nếu bạn thấy chỗ nào sai
hoặc thiếu, cứ mở issue.
