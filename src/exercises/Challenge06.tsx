import { useState, useCallback, useMemo, memo, useRef } from 'react';

// ==========================================
// MEMOIZED CHILD COMPONENT
// ==========================================
interface ChildProps {
  onSelectItem: (id: string) => void;
  filterConfig: { category: string };
}

const ExpensiveChild = memo(function ExpensiveChild({ onSelectItem, filterConfig }: ChildProps) {
  const renderCount = useRef(1);
  renderCount.current += 1;

  return (
    <div style={{ padding: '12px', background: renderCount.current > 3 ? 'rgba(239, 68, 68, 0.1)' : 'rgba(34, 197, 94, 0.1)', border: '1px solid #cbd5e1', borderRadius: '8px', marginBottom: '12px' }}>
      <p style={{ margin: '0 0 6px 0', fontSize: '13px' }}>
        <strong>🟢 ExpensiveChild (Đã bọc React.memo)</strong> - Số lần Re-render: <strong style={{ color: renderCount.current > 3 ? '#EF4444' : '#15803D' }}>{renderCount.current}</strong>
      </p>
      <p style={{ margin: '0 0 8px 0', fontSize: '12px', color: '#64748B' }}>
        Danh mục lọc: <strong>{filterConfig.category}</strong>
      </p>
      <button onClick={() => onSelectItem('item-1')} style={{ padding: '4px 8px', cursor: 'pointer' }}>
        Chọn phần tử item-1
      </button>
    </div>
  );
});

// ==========================================
// MAIN CHALLENGE COMPONENT
// ==========================================
export default function Challenge06() {
  const [parentCounter, setParentCounter] = useState(0);
  const [selectedId, setSelectedId] = useState<string>('Chưa chọn');

  // 🐛 VẤN ĐỀ 1: Hàm handleSelect bên dưới đang tạo địa chỉ RAM mới ở mỗi lượt Parent re-render ➔ Phá vỡ React.memo của ExpensiveChild!
  // 🎯 MỤC TIÊU 1: Bọc hàm handleSelect bằng useCallback(..., []) để giữ nguyên địa chỉ RAM của hàm.
  const handleSelect = useCallback((id: string) => {
    setSelectedId(id);
  }, []);

  // 🐛 VẤN ĐỀ 2: Object config bên dưới đang tạo Object Inline mới ở mỗi lượt re-render ➔ Phá vỡ React.memo của ExpensiveChild!
  // 🎯 MỤC TIÊU 2: Bọc Object config bằng useMemo(() => ({ category: 'Laptop' }), []) để giữ nguyên địa chỉ RAM của Object.
  const filterConfig = useMemo(() => {
    return { category: 'Laptop' };
  }, []);

  return (
    <div style={{ maxWidth: '650px', margin: '20px auto', padding: '20px', border: '2px dashed #3B82F6', borderRadius: '12px', textAlign: 'left' }}>
      <h2 style={{ color: '#3B82F6', marginTop: 0 }}>🎯 THỬ THÁCH #06: KHÁNG RE-RENDER BẰNG USECALLBACK & USEMEMO</h2>
      <p style={{ fontSize: '13px', color: '#64748B' }}>
        👉 Bấm nút <code>"Tăng Parent State"</code> bên dưới. quan sát xem <code>ExpensiveChild</code> có bị Re-render thừa hay không!
      </p>

      {/* PARENT CONTROL */}
      <div style={{ padding: '12px', background: 'rgba(37, 99, 235, 0.08)', border: '1px solid rgba(37, 99, 235, 0.3)', borderRadius: '8px', marginBottom: '16px' }}>
        <p style={{ margin: '0 0 8px 0' }}>Parent State Counter: <strong>{parentCounter}</strong> | Item đã chọn: <strong>{selectedId}</strong></p>
        <button onClick={() => setParentCounter(c => c + 1)} style={{ padding: '6px 12px', cursor: 'pointer' }}>
          Tăng Parent State (+1)
        </button>
      </div>

      {/* CHILD COMPONENT */}
      <ExpensiveChild onSelectItem={handleSelect} filterConfig={filterConfig} />
    </div>
  );
}
