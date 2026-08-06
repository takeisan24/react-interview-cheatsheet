# 05. Automatic Batching & State Queue (React 18)

## 1. Lý thuyết Cốt lõi: State Batching là gì?
State Batching là cơ chế của React gom nhiều lệnh cập nhật State (`setState`) diễn ra trong cùng một chu kỳ sự kiện (Event Cycle) lại thành **1 lượt Re-render duy nhất**, giúp tránh lãng phí hiệu năng vẽ lại giao diện.

## 2. So sánh chi tiết: React 17 vs React 18 (Automatic Batching)

| Tiêu chí | React 17 (Cũ) | React 18 (Automatic Batching) |
| :--- | :--- | :--- |
| **Event Handlers đồng bộ (`onClick`)** |  Có Batching (1 re-render) |  Có Batching (1 re-render) |
| **Trong `setTimeout` / `setInterval`** | ❌ KHÔNG Batching (Re-render từng dòng) |  Có Batching (1 re-render) |
| **Trong `Promise.then()` / `fetch`** | ❌ KHÔNG Batching (Re-render từng dòng) |  Có Batching (1 re-render) |
| **Trong Native Event (`addEventListener`)** | ❌ KHÔNG Batching (Re-render từng dòng) |  Có Batching (1 re-render) |

## 3. Direct State vs Functional State Update trong Batching Queue
- **Direct Update (`setCount(count + 1)` x3):** Cả 3 lệnh đều đọc giá trị Snapshot cũ (`0 + 1`) ➔ State cuối cùng chỉ tăng thêm **1**.
- **Functional Update (`setCount(c => c + 1)` x3):** Đẩy 3 Updater Function vào State Queue của React ➔ Tuần tự tính toán: `0 + 1 = 1 ➔ 1 + 1 = 2 ➔ 2 + 1 = 3` ➔ State cuối cùng tăng thêm **3** (và vẫn chỉ re-render 1 lần).

## 4. Cách TẮT Batching khi cần thiết: `flushSync`
Khi bạn muốn ÉP React phải Re-render và cập nhật Real DOM ngay lập tức trước khi chạy dòng code tiếp theo:
```tsx
import { flushSync } from 'react-dom';

flushSync(() => {
  setLoading(true); // React ép Re-render & Cập nhật DOM NGAY LẬP TỨC tại dòng này!
});
// Dòng lệnh dưới đây sẽ đọc được DOM mới nhất vừa được vẽ
```

## 5. Mối liên kết với các Kiến thức khác (Knowledge Connections)
- **Liên kết với Session 02 (Event Loop):** Trong React 17, khi callback của `setTimeout` (Macrotask) nổ, Call Stack đã rỗng nên React 17 coi mỗi `setState` là 1 lượt riêng. Lên React 18, React Fiber theo dõi Task Boundaries tốt hơn nên gom được cả Macrotask vào 1 lượt Batching.
- **Liên kết với Session 01 (State Snapshot):** Trong 1 lượt Event Handler, biến state là hằng số cố định (Snapshot) cho đến khi lượt Batching Re-render hoàn tất.
- **Liên kết với Session 04 (React Fiber):** Batching gom tất cả state updates vào cây Work-in-Progress Fiber Tree, tính toán xong mới Commit lên Real DOM 1 lần.
- **Liên kết với Session 06 sắp học (`React.memo` & Performance):** Hiểu rõ khi nào State Batching kích hoạt Re-render sẽ giúp bạn biết khi nào Child Component bị kéo theo Re-render thừa.

## 6. Bẫy phỏng vấn (Interview Trap & Junior Signal)
- **Bẫy 1:** Cho rằng gọi `setCount` 3 lần trong `setTimeout` ở React 18 sẽ re-render 3 lần. ➔ *Sai! React 18 đã có Automatic Batching cho cả setTimeout.*
- **Bẫy 2:** Nhầm lẫn giữa việc State tăng 1 hay 3 khi gọi `setCount` 3 lần. ➔ *Khác nhau giữa truyền trực tiếp `count + 1` (ra 1) vs truyền Updater `c => c + 1` (ra 3).*
- **Junior Signal:** Phân biệt rõ sự khác nhau giữa React 17 & 18 về Batching, giải thích được cơ chế State Queue và biết cách dùng `flushSync` khi cần đọc DOM gấp.

## 7. Tài liệu tham khảo chính thức
- [React.dev: Queueing a Series of State Updates](https://react.dev/learn/queueing-a-series-of-state-updates)
- [React 18 Working Group: Automatic Batching](https://github.com/reactwg/react-18/discussions/21)
