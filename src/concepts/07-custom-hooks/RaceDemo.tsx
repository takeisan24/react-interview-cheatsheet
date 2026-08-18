import { useEffect, useState } from "react";

// Query càng NGẮN → càng CHẬM về. Mô phỏng đúng đời thực.
function timKiemGia(q: string): Promise<string> {
    const doTre = 1200 - q.length * 200;      // "a" → 1000ms | "abcde" → 200ms
    return new Promise((resolve) =>
        setTimeout(() => resolve(`kết quả cho "${q}"`), Math.max(doTre, 100))
    );
}

export function RaceDemo() {
    const [query, setQuery] = useState('');
    const [ketqua, setKetQua] = useState("");

    // Không có cờ huỷ thì: gõ "abcde" → 5 request bay đi, về NGƯỢC thứ tự
    // (query ngắn khớp nhiều dòng nên server trả chậm hơn), và cái về muộn
    // nhất ghi đè cuối cùng → màn hình kẹt ở kết quả của "a".
    //
    // Bug này không crash, không log đỏ — chỉ hiện dữ liệu sai. Nên nó sống rất lâu.
    useEffect(() => {
        // Mỗi lần effect chạy sinh một `daHuy` RIÊNG. Hàm .then và hàm dọn dẹp
        // cùng nhìn vào một cái hộp đó (closure) → cleanup đánh dấu đúng lần chạy của mình.
        let daHuy = false;

        timKiemGia(query).then(kq => {
            if (!daHuy) {
                setKetQua(kq);
            }
        });

        return () => {
            daHuy = true;
        }
    }, [query]);

    return (
        <div style={{ maxWidth: 560, margin: '40px auto', fontFamily: 'sans-serif' }}>
            <h2>Race condition</h2>
            <input
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                style={{ width: '100%', padding: 10, fontSize: 16 }}
            />

            <div style={{ display: 'flex', gap: 16, marginTop: 20 }}>
                <div style={{ flex: 1, padding: 12, border: '2px solid #ef4444', borderRadius: 8 }}>
                    <div style={{ fontSize: 12, color: '#ef4444' }}>đang hỏi</div>
                    <div style={{ fontSize: 18, minHeight: 26 }}>{query || <em>(trống)</em>}</div>
                </div>
                <div style={{ flex: 1, padding: 12, border: '2px solid #10b981', borderRadius: 8 }}>
                    <div style={{ fontSize: 12, color: '#10b981' }}>server trả về</div><div style={{ fontSize: 18, minHeight: 26 }}>{ketqua || <em>(trống)</em>}</div>
                </div>
            </div>
        </div>
    );
}