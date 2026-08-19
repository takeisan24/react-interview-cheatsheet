import { useEffect, useState } from 'react';

// ══════════════════════════════════════════════════════════
// PHẦN A · State dẫn xuất — hai bản, cùng kết quả, khác chi phí
// ══════════════════════════════════════════════════════════

// ❌ BẢN SAI — hoTen làm state riêng, cập nhật bằng effect
function HoTenSai() {
    const [ho, setHo] = useState('Vũ');
    const [ten] = useState('Tuấn Anh');

    // TODO A1: khai báo state hoTen, khởi tạo rỗng
    const [hoten, setHoTen] = useState('');

    // CỐ TÌNH SAI. Chính ESLint cũng chặn dòng này:
    //   "Calling setState synchronously within an effect can trigger cascading renders"
    // "cascading renders" = đúng cái đo được: bấm 1 nút ra 4 dòng log thay vì 2.
    useEffect(() => {
        // eslint-disable-next-line react-hooks/set-state-in-effect
        setHoTen(ho + " " + ten);
    }, [ho, ten]);

    // TODO A2: useEffect ghép ho + ' ' + ten rồi setHoTen, deps [ho, ten]

    console.log('❌ SAI render — ho:', ho, '| hoTen:', /* TODO A3: hoTen */ hoten);

    return (
        <div style={{ border: '2px solid #ef4444', padding: 12, borderRadius: 8 }}>
            <div style={{ fontSize: 12, color: '#ef4444' }}>Bản dùng effect</div>
            <div style={{ fontSize: 18 }}>{/* TODO A4: hiện hoTen */} {hoten}</div>
            <button onClick={() => setHo(h => h === 'Vũ' ? 'Nguyễn' : 'Vũ')}>Đổi họ</button>
        </div>
    );
}

// ✅ BẢN ĐÚNG — hoTen tính thẳng khi render
function HoTenDung() {
    const [ho, setHo] = useState('Vũ');
    const [ten] = useState('Tuấn Anh');

    // TODO A5: tính hoTen bằng MỘT dòng, không state, không effect
    const hoten = ho + " " + ten;

    console.log('✅ ĐÚNG render — ho:', ho, '| hoTen:', /* TODO A6 */hoten);

    return (
        <div style={{ border: '2px solid #10b981', padding: 12, borderRadius: 8 }}>
            <div style={{ fontSize: 12, color: '#10b981' }}>Bản tính thẳng</div>
            <div style={{ fontSize: 18 }}>{/* TODO A7: hiện hoTen */}{hoten}</div>
            <button onClick={() => setHo(h => h === 'Vũ' ? 'Nguyễn' : 'Vũ')}>Đổi họ</button>
        </div>
    );
}

// ══════════════════════════════════════════════════════════
// PHẦN B · StrictMode chạy effect mấy lần?
// ══════════════════════════════════════════════════════════
function ThuStrictMode() {
    // TODO B1: useEffect deps rỗng
    //          trong effect  : console.log('🟢 effect CHẠY')
    //          trả về cleanup: console.log('🔴 cleanup CHẠY')
    useEffect(() => {
        console.log('🟢 effect CHẠY');

        return () => console.log('🔴 cleanup CHẠY');
    }, [])

    return (
        <div style={{ border: '2px solid #6366f1', padding: 12, borderRadius: 8, marginTop: 20 }}>
            <div style={{ fontSize: 12, color: '#6366f1' }}>StrictMode</div>
            <div style={{ fontSize: 13 }}>Mở Console, đếm xem 🟢 xuất hiện mấy lần khi tải trang.</div>
        </div>
    );
}

export default function UseEffectSauDemo() {
    return (
        <div style={{ maxWidth: 640, margin: '40px auto', fontFamily: 'sans-serif' }}>
            <h2>Bài 4 · useEffect cho đến tận gốc</h2>
            <p style={{ fontSize: 13, color: '#666' }}>
                Mở <strong>F12 → Console</strong>. Bấm "Đổi họ" ở từng bản và <strong>đếm số dòng log</strong>.
            </p>
            <div style={{ display: 'flex', gap: 16 }}>
                <div style={{ flex: 1 }}><HoTenSai /></div>
                <div style={{ flex: 1 }}><HoTenDung /></div>
            </div>
            <ThuStrictMode />
        </div>
    );
}
