import { useEffect, useState } from "react";

export function useDebounce<T>(value: T, delay: number): T {
    const [val, setVal] = useState(value);

    useEffect(() => {
        const id = setTimeout(() => {
            setVal(value);
        }, delay);

        // Cleanup KHÔNG chỉ để dọn rác — nó LÀ cơ chế debounce.
        // Quên nó thì mọi hẹn giờ cũ đều nổ, val nhận đủ giá trị trung gian
        // → debounce mất tác dụng hoàn toàn, chỉ còn trễ 500ms.
        // `id` nằm trong closure của lần chạy này, nên mỗi cleanup huỷ đúng timer của mình.
        return () => clearTimeout(id);
        // `delay` cũng phải có trong deps: nếu nó đổi mà effect không chạy lại,
        // hẹn giờ sẽ mãi dùng con số cũ — đúng kiểu stale closure.
    }, [value, delay]);

    return val
}