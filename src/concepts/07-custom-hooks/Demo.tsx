import { useState } from 'react';

// ============================================================
// THÍ NGHIỆM 1 · Phá quy tắc hook — gọi useState bên trong if
// ============================================================
// React lưu hook trong một MẢNG CÓ THỨ TỰ gắn vào Fiber của component.
// Nó ĐẾM, không đọc tên biến — vì useState không hề nhận tên làm tham số.
//
// Render 1 (coEmail = true) : ô 0 → ten | ô 1 → email | ô 2 → tuoi
// Render 2 (coEmail = false): if bị bỏ qua, chỉ 2 hook được gọi
//                             useState(0) cho `tuoi` đọc ô 1 — ô của EMAIL
//                             → tuoi = "" (một CHUỖI, không phải số)
//
// Cái hook trong if không phải nạn nhân. Nạn nhân là mọi hook ĐỨNG SAU nó.
function FormHong({ coEmail }: { coEmail: boolean }) {
    const [ten] = useState("An");

    if (coEmail) {
        // 🐛 CỐ TÌNH SAI — đây là toàn bộ mục đích của thí nghiệm
        // eslint-disable-next-line react-hooks/rules-of-hooks
        useState("");
    }

    const [tuoi] = useState(0);

    // console.log chạy TRONG lúc render, tức là TRƯỚC khi React ném lỗi
    // → đây là cách duy nhất thấy được `tuoi` đã biến thành chuỗi.
    // Màn hình không bao giờ hiện ra vì lỗi ném trước bước commit.
    console.log('FormHong render — typeof tuoi =', typeof tuoi, '| tuoi =', tuoi);

    return (
        <p>
            ten = <strong>{ten}</strong>
            {' | '}tuoi = <strong>{String(tuoi)}</strong>
            {' | '}typeof tuoi = <strong>{typeof tuoi}</strong>
        </p>
    );
}

// ============================================================
// THÍ NGHIỆM 2 · Tên biến không quan trọng
// ============================================================
// Đổi `name` thành `abc`, `xyz`, bất cứ gì — rồi tải lại trang.
// State vẫn hoạt động y nguyên, vì React chưa từng biết cái tên đó.
function DoiTen() {
    const [name, setName] = useState('takei');

    return (
        <div>
            <p>name = <strong>{name}</strong></p>
            {/* ✅ setState nằm trong onClick — ĐÚNG chỗ */}
            <button onClick={() => setName((n) => n + '!')}>Thêm "!"</button>
        </div>
    );
}

// ============================================================
// ⚠️ BẢN SAI — giữ lại để đối chiếu, đừng bỏ comment
// ============================================================
// function DoiTenHong() {
//     const [name, setName] = useState('takei');
//     setName((n) => n + '!');   // ❌ gọi setState trong THÂN RENDER
//     return <p>{name}</p>;
// }
//
// Chuỗi sự kiện: React gọi DoiTenHong() → setName chạy → state đổi
//                → phải render lại → gọi DoiTenHong() → setName lại chạy → ...
// Hàm này nói với React: "mỗi lần anh gọi tôi, tôi lại xin anh gọi lại."
//   → Error: Too many re-renders. React limits the number of renders
//            to prevent an infinite loop.
//
// Chú ý: `setName((n) => n + '!')` là ĐÚNG cú pháp — chính nó dùng trong
// onClick ở trên thì chạy tốt. Sai không phải ở cú pháp mà ở VỊ TRÍ.
//
// setState gọi được ở: event handler ✅ | useEffect ✅ | callback async ✅
//                      thân render ❌

export default function CustomHooksDemo() {
    const [coEmail, setCoEmail] = useState(true);

    return (
        <div style={{ maxWidth: 640, margin: '20px auto', textAlign: 'left', fontFamily: 'sans-serif' }}>
            <h2>Bài 2 · Rules of Hooks</h2>

            <p style={{ fontSize: 13, color: '#666', lineHeight: 1.6 }}>
                Mở <strong>F12 → Console</strong> rồi bấm nút bên dưới. React sẽ ném{' '}
                <code>Rendered fewer hooks than expected</code> và trang trắng xoá — đó là
                React đang <strong>bảo vệ bạn</strong>, không phải bug của bạn. Tải lại trang
                để về trạng thái đầu.
            </p>

            <button onClick={() => setCoEmail((v) => !v)}>
                Bật/tắt coEmail — đang là <strong>{String(coEmail)}</strong>
            </button>

            <hr />
            <FormHong coEmail={coEmail} />
            <hr />
            <DoiTen />
        </div>
    );
}
