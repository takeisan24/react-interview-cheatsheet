import { useState, useCallback, useMemo, memo, useRef } from 'react';

// ==========================================
// 1. UNMEMOIZED CHILD (Mặc định re-render theo Parent)
// ==========================================
function UnmemoizedChild({ label }: { label: string }) {
  const renderCount = useRef(1);
  renderCount.current += 1;

  return (
    <div style={{ padding: '10px', background: 'rgba(239, 68, 68, 0.1)', border: '1px solid #EF4444', borderRadius: '6px', marginBottom: '8px' }}>
      <p style={{ margin: 0, fontSize: '13px', color: '#EF4444' }}>
        ❌ <strong>{label} (Không dùng React.memo)</strong> - Re-render: <strong>{renderCount.current}</strong> lần
      </p>
    </div>
  );
}

// ==========================================
// 2. MEMOIZED CHILD (Bọc React.memo)
// ==========================================
interface MemoizedChildProps {
  label: string;
  onClick: () => void;
  config?: { theme: string };
}

const MemoizedChild = memo(function MemoizedChild({ label, onClick, config }: MemoizedChildProps) {
  const renderCount = useRef(1);
  renderCount.current += 1;

  return (
    <div style={{ padding: '10px', background: 'rgba(34, 197, 94, 0.1)', border: '1px solid #22C55E', borderRadius: '6px', marginBottom: '8px' }}>
      <p style={{ margin: '0 0 6px 0', fontSize: '13px', color: '#15803D' }}>
        🟢 <strong>{label} (Đã bọc React.memo)</strong> - Re-render: <strong>{renderCount.current}</strong> lần
      </p>

      {config && (
        <p style={{ margin: '0 0 6px 0', fontSize: '12px', color: '#475569' }}>
          Config Theme: <strong>{config.theme}</strong>
        </p>
      )}

      <button onClick={onClick} style={{ padding: '4px 8px', fontSize: '12px', cursor: 'pointer' }}>
        Bấm nút con
      </button>
    </div>
  );
});

// ==========================================
// MAIN DEMO COMPONENT
// ==========================================
export default function ReferentialEqualityDemo() {
  const [parentCount, setParentCount] = useState(0);
  const [otherState, setOtherState] = useState(0);

  // ❌ BAD PRACTICE 1: Tạo hàm mới mỗi lần Parent re-render (Thay đổi Địa chỉ RAM)
  const handleClickBad = () => {
    console.log('Bad Click');
  };

  // ✅ BEST PRACTICE 1: Dùng useCallback giữ nguyên Địa chỉ ô nhớ RAM của hàm
  const handleClickGood = useCallback(() => {
    console.log('Good Click');
  }, []);

  // ❌ BAD PRACTICE 2: Tạo Object mới Inline mỗi lần re-render
  // const configBad = { theme: 'dark' }; -> Làm phá vỡ React.memo!

  // ✅ BEST PRACTICE 2: Dùng useMemo giữ nguyên Địa chỉ ô nhớ RAM của Object
  const configGood = useMemo(() => {
    return { theme: 'dark' };
  }, []);

  return (
    <div style={{ textAlign: 'left' }}>
      <div style={{ padding: '16px', background: 'rgba(37, 99, 235, 0.08)', border: '1px solid rgba(37, 99, 235, 0.3)', borderRadius: '8px', marginBottom: '16px' }}>
        <h3 style={{ margin: '0 0 8px 0', color: '#2563EB' }}>📦 Parent Component State</h3>
        <p style={{ margin: '0 0 12px 0', fontSize: '14px' }}>
          Parent State Count: <strong>{parentCount}</strong> | Other State: <strong>{otherState}</strong>
        </p>

        <div style={{ display: 'flex', gap: '8px' }}>
          <button onClick={() => setParentCount(c => c + 1)} style={{ padding: '6px 12px', cursor: 'pointer' }}>
            Tăng Parent State (+1)
          </button>
          <button onClick={() => setOtherState(o => o + 1)} style={{ padding: '6px 12px', cursor: 'pointer' }}>
            Tăng Other State (+1)
          </button>
        </div>
      </div>

      <h4 style={{ marginBottom: '12px' }}>🧪 Kết Quả Re-Render Của Các Component Con:</h4>

      {/* 1. Unmemoized */}
      <UnmemoizedChild label="Child 1: Thuần túy" />

      {/* 2. Memoized nhưng bị phá vỡ bởi hàm không useCallback */}
      <MemoizedChild
        label="Child 2: Bị phá vỡ memo do prop onClick KHÔNG dùng useCallback"
        onClick={handleClickBad}
      />

      {/* 3. Memoized thành công nhờ useCallback & useMemo */}
      <MemoizedChild
        label="Child 3: Kháng Re-render THÀNH CÔNG nhờ useCallback & useMemo!"
        onClick={handleClickGood}
        config={configGood}
      />
    </div>
  );
}
