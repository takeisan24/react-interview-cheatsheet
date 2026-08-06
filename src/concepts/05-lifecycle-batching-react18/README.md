# 05. Automatic Batching & State Queue (React 18)

## 1. State Batching là gì?

State Batching là cơ chế React gom nhiều lệnh cập nhật State (`setState`) diễn ra trong cùng một chu kỳ sự kiện lại thành **1 lượt Re-render duy nhất**, giúp tránh lãng phí hiệu năng vẽ lại giao diện.

## 2. Sự khác biệt giữa React 17 vs React 18

- **React 17:** Chỉ Batching trong các React Event Handler đồng bộ (như `onClick`). Các lệnh `setState` nằm trong `setTimeout`, `Promise.then()`, `fetch()` **KHÔNG được batching** ➔ Gây ra nhiều lần re-render thừa.
- **React 18 (Automatic Batching):** Tự động gom nhóm `setState` ở **MỌI NƠI** (Sync, Async, Timers, Promises, Native Events) ➔ Luôn luôn re-render đúng 1 lần.

## 3. Direct State vs Functional State Update trong Batching Queue

- `setCount(count + 1)` x3 ➔ Cả 3 lệnh đều đọc giá trị Snapshot cũ (`0 + 1`) ➔ State tăng lên **1**.
- `setCount(c => c + 1)` x3 ➔ Đẩy 3 Updater Function vào State Queue ➔ `0 + 1 = 1 ➔ 1 + 1 = 2 ➔ 2 + 1 = 3` ➔ State tăng lên **3**.

## 4. Cách TẮT Batching khi cần thiết: `flushSync`

Nếu muốn ép React re-render lại UI ngay lập tức giữa các dòng code:

```tsx
import { flushSync } from 'react-dom';

flushSync(() => {
  setLoading(true); // React ép Re-render UI NGAY LẬP TỨC tại dòng này!
});
