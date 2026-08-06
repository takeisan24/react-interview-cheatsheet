import { useState } from 'react';

interface UserItem {
  uid: string;
  name: string;
}

export default function Challenge04() {
  // ==========================================
  // PHẦN 1: LIST RENDERING KEY TRAP
  // ==========================================
  const [users, setUsers] = useState<UserItem[]>([
    { uid: 'u1', name: '1. Nguyễn Văn A' },
    { uid: 'u2', name: '2. Trần Thị B' },
    { uid: 'u3', name: '3. Lê Văn C' }
  ]);

  const deleteFirstUser = () => {
    setUsers(users.slice(1));
  };

  // ==========================================
  // PHẦN 2: RESETTING STATE VIA KEY CHANGE
  // ==========================================
  const [userProfileId, setUserProfileId] = useState<string>('profile-1');

  return (
    <div style={{ maxWidth: '650px', margin: '20px auto', padding: '20px', border: '2px dashed #3B82F6', borderRadius: '12px', textAlign: 'left' }}>
      <h2 style={{ color: '#3B82F6', marginTop: 0 }}>🎯 THỬ THÁCH #04: RECONCILIATION & KEY MECHANICS</h2>

      {/* PART 1 */}
      <div style={{ padding: '12px', background: 'rgba(239, 68, 68, 0.08)', border: '1px solid rgba(239, 68, 68, 0.3)', borderRadius: '8px', marginBottom: '16px' }}>
        <h4 style={{ color: '#EF4444', marginTop: 0 }}>1. List Key Trap (Bảo vệ ô input khi xóa item)</h4>
        <button onClick={deleteFirstUser} style={{ padding: '6px 12px', cursor: 'pointer', marginBottom: '12px' }}>
          🗑️ Xóa Nguyễn Văn A ở đầu mảng
        </button>

        {users.map((user) => (
          // 🎯 key={user.uid} giúp Reconciliation định danh đúng từng element
          <div key={user.uid} style={{ marginBottom: '8px' }}>
            <span><strong>{user.name}</strong>: </span>
            <input type="text" placeholder="Gõ ghi chú vào đây..." />
          </div>
        ))}
      </div>

      {/* PART 2 */}
      <div style={{ padding: '12px', background: 'rgba(37, 99, 235, 0.08)', border: '1px solid rgba(37, 99, 235, 0.3)', borderRadius: '8px' }}>
        <h4 style={{ color: '#2563EB', marginTop: 0 }}>2. Resetting State bằng cách thay đổi thuộc tính `key`</h4>
        <p>Đang xem Profile: <strong>{userProfileId}</strong></p>
        <button
          onClick={() => setUserProfileId(prev => prev === 'profile-1' ? 'profile-2' : 'profile-1')}
          style={{ padding: '6px 12px', cursor: 'pointer', marginBottom: '8px' }}
        >
          🔄 Đổi Profile ID (Reset Form State)
        </button>

        {/* Khi key thay đổi từ profile-1 sang profile-2, React sẽ Unmount Form cũ và Mount Form mới tinh! */}
        <ProfileForm key={userProfileId} profileId={userProfileId} />
      </div>
    </div>
  );
}

function ProfileForm({ profileId }: { profileId: string }) {
  const [comment, setComment] = useState('');

  return (
    <div style={{ padding: '8px', background: '#ffffff', borderRadius: '6px', border: '1px solid #cbd5e1' }}>
      <p style={{ margin: '0 0 6px 0', fontSize: '13px' }}>Form Nhận Xét ({profileId}):</p>
      <input
        type="text"
        value={comment}
        onChange={(e) => setComment(e.target.value)}
        placeholder="Gõ nhận xét cá nhân..."
        style={{ padding: '4px 8px', width: '80%' }}
      />
    </div>
  );
}
