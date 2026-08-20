import { useState, useRef, useEffect, useLayoutEffect } from 'react';

// ============================================================
// THÍ NGHIỆM 1 · Cái hộp không đổi
// ============================================================
// Đếm xem component đã render bao nhiêu lần.
// Không dùng được useState — vì setState lại gây render, render lại setState...
// (chính là "Too many re-renders" ở bài 2).
//
// Dự đoán trước khi chạy, ghi ra giấy:
//   - Vừa tải trang, hiện số mấy?
//   - Bấm +1 ba lần, hiện số mấy?
function DemRender() {
    const [n, setN] = useState(0);

    // TODO 1a: khai báo ref soLanRender, khởi tạo 0
    const soLanRender = useRef(0);

    // TODO 1b: tăng soLanRender lên 1 — viết Ở ĐÂY, trong thân render
    //
    // ESLint chặn dòng này: "Cannot access refs during render".
    // Nó chặn ĐÚNG. Ta cố ý vi phạm để nhìn StrictMode vạch mặt phép TÍCH LŨY.
    // eslint-disable-next-line react-hooks/refs
    soLanRender.current++;

    return (
        <div>
            <p>
                n = <strong>{n}</strong>
                {' · đã render '}
                {/* eslint-disable-next-line react-hooks/refs */}
                <strong>{soLanRender.current}</strong> lần
            </p>
            <button onClick={() => setN(n + 1)}>+1</button>
        </div>
    );
}

// ============================================================
// THÍ NGHIỆM 2 · usePrevious — món nợ từ bài 2
// ============================================================
// Trả về giá trị của LẦN RENDER TRƯỚC.
//
// Mấu chốt nằm ở THỨ TỰ, không nằm ở cú pháp:
//   1. React gọi hàm component  → dòng `return` đọc ref.current
//   2. React vẽ xong màn hình
//   3. LÚC NÀY effect mới chạy  → ref.current được ghi đè
//
// Vì bước 3 luôn xảy ra SAU bước 1, cái mà bước 1 đọc được
// luôn là thứ effect ghi từ lượt render TRƯỚC.
function usePrevious<T>(value: T): T | undefined {
    // TODO 2a: khai báo ref, kiểu <T | undefined>, khởi tạo undefined
    const refGiaTriTruoc = useRef<T | undefined>(undefined);

    // TODO 2b: viết effect ghi `value` vào ref, deps là [value]
    useEffect(() => {
        refGiaTriTruoc.current = value;
    }, [value])
    // TODO 2c: return giá trị trong ref
    //
    // Đọc ref trong thân render CHÍNH LÀ cơ chế của hook này — bỏ đi là hook chết.
    // ESLint vẫn flag, và nó có lý ở chế độ render đồng thời. Đây là đánh đổi
    // có ý thức, không phải lỗi bị bỏ qua.
    // eslint-disable-next-line react-hooks/refs
    return refGiaTriTruoc.current;
}

function ThuUsePrevious() {
    const [diem, setDiem] = useState(5);
    const diemCu = usePrevious(diem);

    return (
        <div>
            <p>
                điểm hiện tại: <strong>{diem}</strong>
                {' · điểm lần trước: '}
                <strong>{diemCu === undefined ? '(chưa có)' : diemCu}</strong>
            </p>
            <button onClick={() => setDiem((d) => d + 1)}>+1 điểm</button>
            <button onClick={() => setDiem((d) => d - 1)}>-1 điểm</button>
        </div>
    );
}

// ============================================================
// THÍ NGHIỆM 3 · ref trỏ vào DOM
// ============================================================
// Công dụng thứ hai của ref: cầm lấy một nút DOM thật.
// React tự gán nút đó vào ref.current sau khi vẽ xong.
function OTuFocus() {
    // TODO 3a: khai báo ref kiểu <HTMLInputElement | null>, khởi tạo null
    const refOInput = useRef<HTMLInputElement | null>(null);

    // TODO 3b: viết effect gọi .focus() trên ô input, deps là []
    useEffect(() => {
        //          Nhớ kiểm tra null trước khi gọi.
        refOInput.current?.focus();
    }, [])

    return (
        <div>
            {/* TODO 3c: gắn ref vào thẻ input bên dưới */}
            <input ref={refOInput} placeholder="ô này phải tự sáng viền khi tải trang" style={{ width: 320 }} />
        </div>
    );
}

// ============================================================
// THÍ NGHIỆM 4 · useLayoutEffect — cái khe giữa bước ③ và ④
// ============================================================
// Chặn luồng chính đúng `ms` mili-giây. Cố ý làm chậm để cái khe
// giữa "React gắn DOM xong" và "trình duyệt tô màn hình" rộng ra
// đủ cho mắt thường nhìn thấy.
function nghiBan(ms: number) {
    const het = Date.now() + ms;
    while (Date.now() < het) { /* chặn, cố ý */ }
}

function Hop({ top, nhan, mau }: { top: number; nhan: string; mau: string }) {
    return (
        <div style={{ position: 'relative', height: 220, background: '#f4f4f4' }}>
            <div style={{
                position: 'absolute', top, left: 0,
                padding: '10px 16px', background: mau, color: '#fff',
                fontFamily: 'monospace', borderRadius: 4,
            }}>
                {nhan} — top = {top}
            </div>
        </div>
    );
}

// Hai component riêng, KHÔNG gộp thành một rồi chọn hook bằng if —
// đó là phá Rules of Hooks (bài 2).
function BanEffect() {
    const [top, setTop] = useState(0);

    // TODO 4a: dùng useEffect — nghiBan(300) rồi setTop(160), deps []
    // setState trong effect là CỐ Ý — cả thí nghiệm dựng lên để đẩy hộp bằng effect,
    // rồi nhìn xem lượt render thứ hai rơi vào TRƯỚC hay SAU lúc trình duyệt tô.
    useEffect(() => {
        nghiBan(300);
        // eslint-disable-next-line react-hooks/set-state-in-effect
        setTop(160);
    }, [])

    return <Hop top={top} nhan="useEffect" mau="#c0392b" />;
}

function BanLayoutEffect() {
    const [top, setTop] = useState(0);

    // TODO 4b: y hệt 4a nhưng dùng useLayoutEffect
    // setState trong effect là CỐ Ý — cả thí nghiệm dựng lên để đẩy hộp bằng effect,
    // rồi nhìn xem lượt render thứ hai rơi vào TRƯỚC hay SAU lúc trình duyệt tô.
    useLayoutEffect(() => {
        nghiBan(300);
        // eslint-disable-next-line react-hooks/set-state-in-effect
        setTop(160);
    }, [])

    return <Hop top={top} nhan="useLayoutEffect" mau="#1e8449" />;
}

function ThuLayout() {
    // `lan` tăng mỗi lần bấm → dùng làm key → ép component MOUNT LẠI từ đầu.
    const [chon, setChon] = useState<{ loai: 'effect' | 'layout'; lan: number } | null>(null);

    return (
        <div>
            <button onClick={() => setChon((c) => ({ loai: 'effect', lan: (c?.lan ?? 0) + 1 }))}>
                Chạy bản useEffect
            </button>{' '}
            <button onClick={() => setChon((c) => ({ loai: 'layout', lan: (c?.lan ?? 0) + 1 }))}>
                Chạy bản useLayoutEffect
            </button>

            {chon === null && <p style={{ color: '#888' }}>Bấm một nút, và NHÌN KỸ ô xám bên dưới.</p>}
            {chon?.loai === 'effect' && <BanEffect key={chon.lan} />}
            {chon?.loai === 'layout' && <BanLayoutEffect key={chon.lan} />}
        </div>
    );
}

export default function UseRefDemo() {
    return (
        <div style={{ maxWidth: 640, margin: '20px auto', textAlign: 'left', fontFamily: 'sans-serif' }}>
            <h2>Bài 5 · useRef</h2>
            <hr />
            <h3>1 · Đếm số lần render</h3>
            <DemRender />
            <hr />
            <h3>2 · usePrevious</h3>
            <ThuUsePrevious />
            <hr />
            <h3>3 · ref trỏ vào DOM</h3>
            <OTuFocus />
            <hr />
            <h3>4 · useEffect vs useLayoutEffect</h3>
            <ThuLayout />
        </div>
    );
}
