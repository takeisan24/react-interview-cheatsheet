import { useState, useEffect, useMemo, useCallback, memo } from 'react';

// ============================================================
// THÍ NGHIỆM 1 · Mảng deps không giữ được lời hứa
// ============================================================
// `config` là object khai báo TRONG thân component → mỗi render một HỘP MỚI.
// Mảng deps so bằng Object.is (≈ ===) → lượt nào cũng "khác" → effect chạy mọi lượt.
//
// Dự đoán trước khi chạy, ghi ra giấy:
//   - Bấm "+1 đếm" 3 lần: mỗi dòng log xuất hiện mấy lần?
//   - Effect nào chạy, effect nào đứng yên?
function DepsHong() {
    const [n, setN] = useState(0);

    // Hộp mới mỗi render
    const config = { mau: 'đỏ' };

    // TODO 1a: useMemo giữ lại hộp cũ — deps []
    // const configOnDinh = ...

    useEffect(() => {
        console.log('🔴 effect [config] chạy');
    }, [config]);

    // TODO 1b: viết effect thứ hai, log '🟢 effect [configOnDinh] chạy', deps [configOnDinh]

    return (
        <div style={{ border: '2px solid #999', padding: 12, borderRadius: 8 }}>
            <p>đếm = <strong>{n}</strong></p>
            <button onClick={() => setN((v) => v + 1)}>+1 đếm</button>
        </div>
    );
}

// ============================================================
// THÍ NGHIỆM 2 · memo bị một hàm phá sạch
// ============================================================
// `memo` bọc component lại và nói: "props không đổi thì đừng render lại tôi".
// Nhưng nó so props bằng ===. Prop là hàm → lượt nào cũng khác → memo vô dụng.
const ConCoMemo = memo(function ConCoMemo({ onBam }: { onBam: () => void }) {
    console.log('🔴 ConCoMemo render');
    return <button onClick={onBam}>con — nhận hàm thường</button>;
});

const ConCoMemo2 = memo(function ConCoMemo2({ onBam }: { onBam: () => void }) {
    console.log('🟢 ConCoMemo2 render');
    return <button onClick={onBam}>con — nhận hàm useCallback</button>;
});

function Cha() {
    const [n, setN] = useState(0);

    // Hàm mới mỗi render
    const xuLy = () => console.log('bấm');

    // TODO 2a: bọc cùng một hàm đó bằng useCallback, deps []
    // const xuLyOnDinh = ...

    return (
        <div style={{ border: '2px solid #999', padding: 12, borderRadius: 8, marginTop: 16 }}>
            <p>đếm = <strong>{n}</strong> — bấm nút này, xem Console</p>
            <button onClick={() => setN((v) => v + 1)}>+1 đếm</button>
            <div style={{ marginTop: 10, display: 'flex', gap: 8 }}>
                <ConCoMemo onBam={xuLy} />
                {/* TODO 2b: truyền xuLyOnDinh vào ConCoMemo2 */}
                <ConCoMemo2 onBam={() => { }} />
            </div>
        </div>
    );
}

// ============================================================
// THÍ NGHIỆM 3 · useMemo dùng ĐÚNG chỗ — tính toán đắt
// ============================================================
// Hai công dụng của useMemo, ĐỪNG lẫn:
//   ① giữ ĐỊA CHỈ hộp ổn định   (thí nghiệm 1 — để deps/memo hoạt động)
//   ② bỏ qua TÍNH TOÁN đắt tiền (thí nghiệm này)
// Phần lớn người dùng chỉ biết ②, rồi bọc lung tung mà không hiểu ①.
function demSoNguyenTo(gioiHan: number) {
    console.log('⚙️  đang tính... (đắt tiền)');
    let dem = 0;
    for (let i = 2; i < gioiHan; i++) {
        let la = true;
        for (let j = 2; j * j <= i; j++) if (i % j === 0) { la = false; break; }
        if (la) dem++;
    }
    return dem;
}

function TinhDatTien() {
    const [gioiHan, setGioiHan] = useState(20000);
    const [mau, setMau] = useState('#333');

    // TODO 3: bọc lời gọi này bằng useMemo, deps [gioiHan]
    //         Rồi bấm "Đổi màu" và xem dòng ⚙️ có hiện ra nữa không.
    const soLuong = demSoNguyenTo(gioiHan);

    return (
        <div style={{ border: '2px solid #999', padding: 12, borderRadius: 8, marginTop: 16 }}>
            <p style={{ color: mau }}>
                có <strong>{soLuong}</strong> số nguyên tố dưới {gioiHan}
            </p>
            <button onClick={() => setGioiHan((g) => g + 10000)}>Tăng giới hạn</button>{' '}
            <button onClick={() => setMau((c) => (c === '#333' ? '#c0392b' : '#333'))}>
                Đổi màu (KHÔNG liên quan tới phép tính)
            </button>
        </div>
    );
}

export default function MemoDemo() {
    return (
        <div style={{ maxWidth: 640, margin: '20px auto', textAlign: 'left', fontFamily: 'sans-serif' }}>
            <h2>Bài 6 · Bình đẳng tham chiếu · useMemo · useCallback · memo</h2>
            <p style={{ fontSize: 13, color: '#666' }}>
                Mở <strong>F12 → Console</strong> trước khi bấm bất cứ nút nào.
            </p>
            <DepsHong />
            <Cha />
            <TinhDatTien />
        </div>
    );
}
