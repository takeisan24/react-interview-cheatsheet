// ============ 1. Closure NHỚ được ============
function taoBoDem() {
    // TODO: khai báo n = 0, trả về một hàm tăng n rồi trả n
    let n = 0;
    return function () {
        n++;
        return n;
    }
}

const dem1 = taoBoDem();
const dem2 = taoBoDem();

// DỰ ĐOÁN (viết trước khi chạy): 1: 1, 2, 3, 1
console.log("1:", dem1(), dem1(), dem1(), dem2());

// ============ 2. Dùng THAM SỐ thì hỏng ============
function taoBoDemHong() {
    // TODO: giống trên, NHƯNG hàm trả về nhận n làm THAM SỐ
    let n = 0;
    return function (n) {
        n++;
        return n;
    }
}

const hong = taoBoDemHong();

// DỰ ĐOÁN: 2: 1, 6, 6?
// NaN 6 6                      → tham số che mất n, mất trí nhớ hoàn toàn
console.log("2:", hong(), hong(5), hong(5));

// ============ 3. Hai đường vào: khe cửa & cửa sổ ============
function taoLoiChao(ten) {
    // TODO: trả về hàm nhận loi, ghép "loi, ten!"
    return function (loi) {
        return (loi + ", " + ten + "!");
    }
}

const chaoAn = taoLoiChao("An");
const chaoBinh = taoLoiChao("Bình");

// DỰ ĐOÁN: ______________________
console.log("3:", chaoAn("Xin chào")); // Xin chào, An!
console.log("3:", chaoBinh("Hello")); // Hello, Bình!
console.log("3:", chaoAn("Chào buổi sáng")); // Chào buổi sáng, An!

// ============ 4. Giữ HỘP hay giữ ẢNH CHỤP? ============
function taoHam() {
    let so = 10;
    const cong = (them) => so + them;
    so = 100;                    // đổi ruột hộp SAU khi tạo closure
    return cong;
}

const f = taoHam();

// DỰ ĐOÁN: 4: 105, 101
console.log("4:", f(5), f(1));