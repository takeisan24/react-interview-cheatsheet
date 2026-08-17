# Buổi 1 — Phiếu tự kiểm tra

> **Luật:** viết câu trả lời của mình **trước khi mở bất kỳ tài liệu nào**.
> Không biết thì viết "không nhớ". Đoán sai cũng viết ra — sai có chủ đích là chỗ kiến thức bám vào.
> Cuối buổi quay lại đọc phần này. Chênh lệch giữa hai lần chính là thứ học được hôm nay.

---

# PHẦN 1 · Tự kiểm tra concept 01–03 *(10 phút, đóng hết tài liệu)*

### 1. Closure là gì? Cho một ví dụ closure gây bug trong React.

```
[ viết ở đây ]



```

### 2. `setTimeout(fn, 0)` và `Promise.resolve().then(fn)` — cái nào chạy trước? Vì sao?

```
[ viết ở đây ]



```

### 3. `var` · `let` · `const` khác nhau ở ba điểm nào? TDZ là gì?

```
[ viết ở đây ]



```

---

**Sau khi viết xong** → mở `src/concepts/01-stale-closure/README.md`, `02-event-loop/`, `03-scope-hoisting-tdz/` và so từng ý.
Mỗi chỗ lệch → chép vào `docs/SO-TAY-SAI-LAM.md`.

---

# PHẦN 2 · Concept 07 — Custom Hooks & Rules of Hooks

### Trước khi học — trả lời bằng hiểu biết hiện có

**a) Tại sao không được gọi hook trong `if`, trong vòng lặp, hay sau `return` sớm?**

```
[ viết ở đây ]



```

**b) Hai component cùng gọi `useCounter()` — chúng có dùng chung state không?**

```
[ viết ở đây ]



```

**c) Khi nào nên tách một custom hook, khi nào thì không nên?**

```
[ viết ở đây ]



```

---

### Sau khi học — trả lời lại, và so với phần trên

**a)**
```


```

**b)**
```


```

**c)**
```


```

---

# PHẦN 3 · Neo vào code thật *(nhịp cuối, đừng bỏ)*

Mở thư mục `src/hooks/` của dự án mobile ở công ty cũ *(đường dẫn ghi trong `docs/`)* — phần lớn file trong đó do chính mình viết.

Chọn **2 hook** tự viết hồi đó, đọc lại code, rồi trả lời:

**Hook 1:** `________________`
- Lúc đó mình tách nó ra vì lý do gì?
```


```

**Hook 2:** `________________`
- Lúc đó mình tách nó ra vì lý do gì?
```


```

**Câu tổng kết — nói to 2 phút, không nhìn giấy:**
> *"Custom hook là gì, mình từng tách hook theo nguyên tắc nào, và nếu gọi hook sai chỗ thì hỏng ra sao."*

> 💡 Câu **"Em tách custom hook theo nguyên tắc nào?"** gần như chắc chắn bị hỏi — và mình có hàng chục ví dụ thật từ code production để trả lời. Rất ít ứng viên có điều đó.

---

## Deliverable của buổi 1

- [ ] Phiếu này điền xong cả 3 phần
- [ ] `docs/SO-TAY-SAI-LAM.md` có ít nhất 1 mục
- [ ] `src/concepts/07-custom-hooks/README.md` — **viết bằng lời của mình**, không copy
- [ ] `src/concepts/07-custom-hooks/Demo.tsx` — chạy được, rồi **cố tình phá** để xem nó hỏng thế nào
- [ ] `src/exercises/Challenge07.tsx` — bản có bug để mai tự sửa
- [ ] Tự viết 4 hook, không copy: `useDebounce` · `useLocalStorage` · `usePrevious` · `useIsMounted`
- [ ] `docs/ON-TAP.md` — thêm dòng lịch ôn cho concept 07
