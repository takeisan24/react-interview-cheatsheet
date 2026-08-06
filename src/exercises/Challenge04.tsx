import { useState } from 'react';

interface UserItem {
  uid: string;
  name: string;
}

export default function Challenge04() {
  const [users, setUsers] = useState<UserItem[]>([
    { uid: 'u1', name: 'Nguyễn Văn A' },
    { uid: 'u2', name: 'Trần Thị B' },
    { uid: 'u3', name: 'Lê Văn C' }
  ]);

  const deleteFirstUser = () => {
    setUsers(users.slice(1));
  };

  return (
    <div style={{ maxWidth: '650px', margin: '20px auto', padding: '20px', border: '2px dashed #3B82F6', borderRadius: '12px', textAlign: 'left' }}>
      <h2 style={{ color: '#3B82F6', marginTop: 0 }}>🎯 THỬ THÁCH #04: FIX BẪY KEY TRONG RECONCILIATION</h2>
      <p style={{ fontSize: '13px', color: '#64748B' }}>
        👉 Hãy gõ chữ <code>"Dev Senior"</code> vào ô input của Nguyễn Văn A. Sau đó mở file <code>src/exercises/Challenge04.tsx</code> để sửa <code>key={index}</code> thành <code>key={user.uid}</code> chuẩn!
      </p>

      <button onClick={deleteFirstUser} style={{ padding: '8px 14px', backgroundColor: '#EF4444', color: '#fff', border: 'none', borderRadius: '6px', cursor: 'pointer', marginBottom: '12px' }}>
        🗑️ Xóa Nguyễn Văn A ở đầu mảng
      </button>

      <div>
        {/* 🐛 VẤN ĐỀ: Khi bấm xóa người dùng ở đầu mảng, ô input bị tráo đổi dữ liệu do dùng key sai. */}
        {/* 🎯 MỤC TIÊU: Hãy sửa thuộc tính key={index} bên dưới để định danh đúng từng item trong mảng. */}
        {/* ✍️ GIẢI THÍCH: [Viết comment giải thích tại sao sửa key lại fix được bug] */}
        {users.map((user, index) => (
          <div key={index} style={{ marginBottom: '10px', padding: '10px', background: 'rgba(239, 68, 68, 0.08)', border: '1px solid rgba(239, 68, 68, 0.3)', borderRadius: '6px' }}>
            <span><strong>{user.name}</strong>: </span>
            <input type="text" placeholder="Gõ vai trò vào đây..." />
          </div>
        ))}
      </div>
    </div>
  );
}
