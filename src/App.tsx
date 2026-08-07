import { useState } from 'react';
import StaleClosureDemo from './concepts/01-stale-closure/Demo';
import EventLoopDemo from './concepts/02-event-loop/Demo';
import ScopeHoistingDemo from './concepts/03-scope-hoisting-tdz/Demo';
import ReconciliationDemo from './concepts/04-vdom-reconciliation-fiber/Demo';
import BatchingDemo from './concepts/05-lifecycle-batching-react18/Demo';
import ReferentialEqualityDemo from './concepts/06-referential-equality-memo/Demo';

import Challenge01 from './exercises/Challenge01';
import Challenge02 from './exercises/Challenge02';
import Challenge03 from './exercises/Challenge03';
import Challenge04 from './exercises/Challenge04';
import Challenge05 from './exercises/Challenge05';
import Challenge06 from './exercises/Challenge06';
import './App.css';

interface QuizQuestion {
  question: string;
  options: string[];
  correctIndex: number;
  explanation: string;
}

interface ConceptData {
  id: string;
  title: string;
  module: string;
  fullTheory: {
    issue: string;
    underTheHood: string[];
    comparisonTable?: { headers: string[]; rows: string[][] };
    executionFlow?: string[];
    bestPractice: string;
    interviewTrap: string[];
    mentalModel?: string[];
    docsLinks: { title: string; url: string }[];
  };
  demoComponent: React.ReactNode;
  quiz: QuizQuestion[];
}

const CONCEPTS_DATA: ConceptData[] = [
  // LESSONS
  {
    id: '01-stale-closure',
    title: '01. Stale Closure trong useEffect',
    module: 'Module 1: JS Core Under The Hood',
    fullTheory: {
      issue: 'Khi dùng setInterval (hoặc setTimeout, event listener) trong useEffect với mảng phụ thuộc rỗng [], biến state (vd: count) không tăng dần mà bị mắc kẹt ở giá trị 1 mãi mãi.',
      underTheHood: [
        'Closure trong JS: Hàm callback trong setInterval khi khởi tạo ở render 1 đã "chụp ảnh" (capture) giá trị count = 0.',
        'Dependency Array []: Khai báo [] khiến useEffect chỉ chạy đúng 1 lần khi mount. Callback không bao giờ được tạo lại để "chụp" giá trị count mới.',
        'State is a Snapshot: Biến state trong 1 lần render là hằng số cố định (const count = 0).'
      ],
      executionFlow: [
        'Render 1 (count=0) ➔ Trình duyệt vẽ h1 = 0 ➔ useEffect kích hoạt setInterval.',
        'setInterval tạo closure ôm biến count=0 ➔ Sau 1s gọi setCount(0 + 1).',
        'Render 2 (count=1) ➔ Trình duyệt vẽ h1 = 1 ➔ useEffect KHÔNG chạy lại do deps=[].',
        'Sau 2s: setInterval cũ nổ ➔ Vẫn gọi setCount(0 + 1) ➔ State tiếp tục là 1 ➔ Kẹt số 1 mãi mãi!'
      ],
      bestPractice: 'Dùng Functional Update: setCount(prevCount => prevCount + 1). React sẽ tự động truyền giá trị state mới nhất từ Queue vào prevCount, bỏ qua biến count bị kẹt ở closure ngoài.',
      interviewTrap: [
        'Đoán nhầm là do hàm clearInterval làm xóa bộ đếm.',
        'Thêm [count] vào dependency array gây ra chi phí hủy và tạo lại timer liên tục mỗi giây.'
      ],
      mentalModel: [
        'State trong React là Snapshot của từng lần render (hằng số).',
        'Updater Function (prev => prev + 1) gửi một CÔNG THỨC vào Queue thay vì gửi một GIÁ TRỊ TÍNH SẴN.'
      ],
      docsLinks: [
        { title: 'React.dev: State as a Snapshot', url: 'https://react.dev/learn/state-as-a-snapshot' },
        { title: 'React.dev: Queueing a Series of State Updates', url: 'https://react.dev/learn/queueing-a-series-of-state-updates' }
      ]
    },
    demoComponent: <StaleClosureDemo />,
    quiz: [
      {
        question: 'Tại sao setCount(count + 1) ba lần liên tiếp trong useEffect với deps=[] lại chỉ tăng state lên 1?',
        options: [
          'A. Do useEffect bị lỗi cú pháp',
          'B. Do callback setInterval chỉ chụp ảnh giá trị count = 0 ban đầu trong Closure',
          'C. Do clearInterval xóa mất bộ đếm'
        ],
        correctIndex: 1,
        explanation: 'Chính xác! Closure đóng gói biến count = 0 từ render đầu tiên. Muốn lấy state mới nhất hãy dùng Functional Update (prev => prev + 1).'
      }
    ]
  },
  {
    id: '02-event-loop',
    title: '02. Event Loop & Micro/Macrotask',
    module: 'Module 1: JS Core Under The Hood',
    fullTheory: {
      issue: 'JavaScript là ngôn ngữ đơn luồng (Single-threaded). Làm sao JS xử lý các tác vụ bất đồng bộ (API, Timer) mà không làm đóng băng giao diện?',
      underTheHood: [
        '1. Call Stack (Code đồng bộ): Chạy trước tiên, từ trên xuống dưới.',
        '2. Microtask Queue (Promise.then, queueMicrotask, async/await): Chạy ngay khi Call Stack rỗng. Event Loop sẽ VÉT SẠCH 100% mảng này trước khi chuyển bước.',
        '3. Render / Paint UI: Trình duyệt cập nhật lại giao diện (mỗi 16.6ms ở màn hình 60Hz).',
        '4. Macrotask Queue (setTimeout, setInterval, I/O): Chạy SAU KHI Microtask đã rỗng. Mỗi chu kỳ chỉ lấy ĐÚNG 1 TÁC VỤ ra chạy.'
      ],
      comparisonTable: {
        headers: ['Loại tác vụ', 'Ví dụ điển hình', 'Thứ tự ưu tiên'],
        rows: [
          ['Code Đồng Bộ', 'Khai báo biến, vòng lặp for, console.log, thân new Promise()', 'Ưu tiên 1 (Chạy ngay trên Call Stack)'],
          ['Microtask Queue', 'Promise.then(), async/await, queueMicrotask()', 'Ưu tiên 2 (Vét sạch khi Stack rỗng)'],
          ['Paint UI', 'Recalculate Style, Reflow Layout, Repaint Pixels', 'Ưu tiên 3 (Mỗi 16.6ms)'],
          ['Macrotask Queue', 'setTimeout(), setInterval(), Network I/O, User Events', 'Ưu tiên 4 (Lấy 1 tác vụ sau cùng)']
        ]
      },
      bestPractice: 'Hiểu rõ Promise (Microtask) luôn chạy TRƯỚC setTimeout (Macrotask). Tránh block Call Stack bằng vòng lặp nặng vì sẽ chặn bước Paint UI gây đóng băng giao diện.',
      interviewTrap: [
        'Đoán setTimeout(..., 0) chạy trước Promise.then() vì có số 0ms.',
        'Đoán code bên trong thân new Promise(...) là bất đồng bộ (thực chất nó chạy ĐỒNG BỘ ngay lập tức!).'
      ],
      mentalModel: [
        'Call Stack = Thớt làm việc đồng bộ.',
        'Microtask Queue = Hàng VIP (xử lý hết sạch mới nghỉ).',
        'Macrotask Queue = Hàng thường (mỗi lần chỉ làm 1 việc).'
      ],
      docsLinks: [
        { title: 'MDN: Event Loop Guide', url: 'https://developer.mozilla.org/en-US/docs/Web/JavaScript/Event_loop' },
        { title: 'javascript.info: Event loop microtasks and macrotasks', url: 'https://javascript.info/event-loop' }
      ]
    },
    demoComponent: <EventLoopDemo />,
    quiz: [
      {
        question: 'Thứ tự in ra của code: console.log(1); setTimeout(() => console.log(2), 0); Promise.resolve().then(() => console.log(3)); console.log(4);',
        options: [
          'A. 1 -> 2 -> 3 -> 4',
          'B. 1 -> 4 -> 3 -> 2',
          'C. 1 -> 3 -> 4 -> 2'
        ],
        correctIndex: 1,
        explanation: 'Chính xác! 1 và 4 là code đồng bộ (Call Stack) -> 3 là Microtask (Promise) -> 2 là Macrotask (setTimeout).'
      }
    ]
  },
  {
    id: '03-scope-hoisting-tdz',
    title: '03. Scope, Hoisting & TDZ',
    module: 'Module 1: JS Core Under The Hood',
    fullTheory: {
      issue: 'Khác biệt giữa var vs let vs const? Tại sao gọi biến trước khi khai báo bằng var thì ra undefined, còn bằng let thì bị ReferenceError?',
      underTheHood: [
        '1. Creation Phase (Khởi tạo): Scan file, nhấc các khai báo biến lên đầu Scope (Hoisting). var gán mặc định = undefined. let/const giữ trạng thái Chưa khởi tạo (Uninitialized).',
        '2. Execution Phase (Thực thi): Chạy code từng dòng từ trên xuống dưới.',
        '3. Scope: var có Function Scope (bỏ qua ngoặc {}). let/const có Block Scope (bị giới hạn trong ngoặc {}).'
      ],
      comparisonTable: {
        headers: ['Tiêu chí', 'var', 'let', 'const'],
        rows: [
          ['Scope', 'Function Scope', 'Block Scope {}', 'Block Scope {}'],
          ['Hoisting', 'Có (= undefined)', 'Có (Bị dính TDZ)', 'Có (Bị dính TDZ)'],
          ['Truy cập trước khai báo', 'Ra undefined', 'Báo ReferenceError', 'Báo ReferenceError'],
          ['Gán lại (Re-assign)', 'Có thể', 'Có thể', '❌ CẤM (TypeError)']
        ]
      },
      bestPractice: 'Ưu tiên const > let > Tuyệt đối KHÔNG dùng var trong dự án thực tế. Nắm rõ Mutability (obj.a = 1 được) vs Re-assignment (obj = {} bị lỗi với const).',
      interviewTrap: [
        'Nghĩ let/const không bị Hoisting (thực tế CÓ bị Hoisting nhưng bị chặn bởi TDZ).',
        'Nghĩ gọi Function Expression trước khai báo bị ReferenceError (thực chất bị TypeError: bar is not a function do var bar = undefined).'
      ],
      mentalModel: [
        'TDZ = Vùng chết tạm thời từ đầu Scope đến dòng khai báo let/const thực sự.',
        'Function Declaration (function f(){}) hoist cả tên + thân hàm.',
        'Function Expression (var f = function(){}) chỉ hoist tên f = undefined.'
      ],
      docsLinks: [
        { title: 'MDN: Temporal Dead Zone (TDZ)', url: 'https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/let#temporal_dead_zone_tdz' }
      ]
    },
    demoComponent: <ScopeHoistingDemo />,
    quiz: [
      {
        question: 'Vùng Temporal Dead Zone (TDZ) kết thúc tại thời điểm nào?',
        options: [
          'A. Ngay ở đầu file JavaScript',
          'B. Khi hàm chứa biến bắt đầu chạy',
          'C. Tại dòng lệnh khai báo thực sự của biến let/const'
        ],
        correctIndex: 2,
        explanation: 'Chính xác! TDZ kéo dài từ đầu Scope cho tới khi JS Engine chạy đến dòng lệnh khai báo biến đó.'
      }
    ]
  },
  {
    id: '04-vdom-reconciliation-fiber',
    title: '04. Virtual DOM & Key Trap',
    module: 'Module 2: React Engine & Re-render Mechanics',
    fullTheory: {
      issue: 'Virtual DOM là gì? Tại sao truyền key={index} khi render mảng lại gây bug tráo đổi dữ liệu nghiêm trọng?',
      underTheHood: [
        'Real DOM: Mỗi HTML Element chứa 300+ thuộc tính C++, sửa trực tiếp gây Reflow & Repaint tốn chi phí.',
        'Virtual DOM: Chỉ là 1 Plain JS Object thuần túy trong RAM đại diện cho UI ({ type: "h1", props: {...} }).',
        'Reconciliation: Diffing algorithm O(n) so sánh 2 cây VDOM. Nếu trùng key=index khi xóa item đầu mảng, React lầm tưởng item mới chính là item cũ nên giữ nguyên State nội bộ/ô input cũ!',
        'React Fiber Architecture: Chuyển VDOM thành cấu trúc Linked List, cho phép TẠM DỪNG, CHIA NHỎ và ĐẶT ƯU TIÊN cho các tác vụ re-render.'
      ],
      bestPractice: 'Luôn dùng key={item.id} (ID cố định duy nhất của dữ liệu).',
      interviewTrap: [
        'Trả lời Virtual DOM luôn nhanh hơn Real DOM (thực ra VDOM tốn RAM giữ cây ảo, lợi ích lớn nhất là Developer Experience & Batching DOM updates).',
        'Lạm dụng key={index} cho danh sách có tính năng xóa/sắp xếp.'
      ],
      mentalModel: [
        'VDOM = Bản vẽ thiết kế trên giấy (rất nhẹ). Real DOM = Ngôi nhà bê tông thực tế (rất nặng).',
        'Fiber = Bộ điều phối giao thông cho phép ngắt/nghỉ ưu tiên cú gõ phím của User.'
      ],
      docsLinks: [
        { title: 'React.dev: Rendering Lists (Keys)', url: 'https://react.dev/learn/rendering-lists' },
        { title: 'React.dev: Preserving and Resetting State', url: 'https://react.dev/learn/preserving-and-resetting-state' }
      ]
    },
    demoComponent: <ReconciliationDemo />,
    quiz: [
      {
        question: 'Tại sao KHÔNG NÊN dùng key={index} khi render danh sách có thể thêm/xóa phần tử?',
        options: [
          'A. Vì index làm code chạy chậm hơn',
          'B. Vì khi mảng thay đổi, index bị xáo trộn làm React nhầm lẫn và giữ lại State/UI cũ cho phần tử mới',
          'C. Vì React không cho phép dùng chỉ số mảng làm key'
        ],
        correctIndex: 1,
        explanation: 'Chính xác! index thay đổi làm Reconciliation gán sai State nội bộ của item cũ cho item mới.'
      }
    ]
  },
  {
    id: '05-lifecycle-batching-react18',
    title: '05. Automatic Batching (React 18)',
    module: 'Module 2: React Engine & Re-render Mechanics',
    fullTheory: {
      issue: 'State Batching là gì? Sự khác biệt giữa React 17 và React 18 về Batching?',
      underTheHood: [
        'State Batching: Gom nhiều lệnh setState trong cùng 1 chu kỳ sự kiện thành 1 lượt Re-render duy nhất.',
        'React 17: Chỉ batching trong React Event Handlers đồng bộ. Trong setTimeout/Promise KHÔNG batching (re-render từng dòng).',
        'React 18 Automatic Batching: Gom nhóm TỰ ĐỘNG ở MỌI NƠI (Sync, Async, setTimeout, Promise).'
      ],
      comparisonTable: {
        headers: ['Trường hợp gọi setState', 'React 17 (Cũ)', 'React 18 (Automatic Batching)'],
        rows: [
          ['onClick Handler đồng bộ', 'Có Batching (1 re-render)', 'Có Batching (1 re-render)'],
          ['Trong setTimeout / setInterval', '❌ KHÔNG Batching (Re-render từng dòng)', 'Có Batching (1 re-render)'],
          ['Trong Promise.then() / fetch', '❌ KHÔNG Batching (Re-render từng dòng)', 'Có Batching (1 re-render)'],
          ['Trong Native addEventListener', '❌ KHÔNG Batching (Re-render từng dòng)', 'Có Batching (1 re-render)']
        ]
      },
      bestPractice: 'Dùng flushSync(() => { setState(...) }) từ react-dom khi muốn TẮT Batching và ÉP React Re-render DOM ngay lập tức.',
      interviewTrap: [
        'Nghĩ gọi setCount 3 lần trong setTimeout ở React 18 vẫn re-render 3 lần (thực tế React 18 gom thành 1 lần).',
        'Nhầm lẫn giữa gán trực tiếp setCount(count + 1) (ra 1) vs Updater Function setCount(c => c + 1) (ra 3).'
      ],
      mentalModel: [
        'Batching = Xe buýt gom hành khách (state updates) đi 1 chuyến thay vì mỗi hành khách đi 1 chuyến taxi riêng.',
        'flushSync = Xe cấp cứu được đi ngay lập tức không cần chờ gom buýt.'
      ],
      docsLinks: [
        { title: 'React.dev: Queueing a Series of State Updates', url: 'https://react.dev/learn/queueing-a-series-of-state-updates' },
        { title: 'React 18 Working Group: Automatic Batching', url: 'https://github.com/reactwg/react-18/discussions/21' }
      ]
    },
    demoComponent: <BatchingDemo />,
    quiz: [
      {
        question: 'Muốn ép React 18 re-render và cập nhật Real DOM ngay lập tức giữa các dòng code, ta dùng API nào?',
        options: [
          'A. forceUpdate()',
          'B. flushSync() từ react-dom',
          'C. useLayoutEffect()'
        ],
        correctIndex: 1,
        explanation: 'Chính xác! flushSync(() => { setState(...) }) sẽ ép React thực hiện re-render và update DOM ngay lập tức.'
      }
    ]
  },
  {
    id: '06-referential-equality-memo',
    title: '06. React.memo, useCallback & useMemo',
    module: 'Module 2: React Engine & Re-render Mechanics',
    fullTheory: {
      issue: 'Mặc định khi Parent re-render, TOÀN BỘ Component con sẽ bị re-render theo. Tại sao truyền prop hàm onClick={() => {}} hoặc object {} lại làm PHÁ VỠ React.memo(Child)?',
      underTheHood: [
        '1. Referential Equality trong JS RAM: Function, Object, Array so sánh theo ĐỊA CHỈ Ô NHỚ RAM.',
        '2. Parent re-render làm hàm onClick = () => {} được khởi tạo lại với ĐỊA CHỈ RAM MỚI TINH.',
        '3. React.memo dùng Object.is(oldProps, newProps). Vì địa chỉ RAM mới khác địa chỉ RAM cũ ➔ Object.is trả về false ➔ Child VẪN BỊ RE-RENDER THỪA!',
        '4. useCallback(fn, deps) giữ ổn định địa chỉ RAM của HÀM. useMemo(() => val, deps) giữ ổn định địa chỉ RAM của OBJECT/ARRAY.'
      ],
      comparisonTable: {
        headers: ['Công cụ', 'Mục đích chính', 'Phép so sánh ngầm'],
        rows: [
          ['React.memo(Component)', 'Bọc Component con để bỏ qua re-render thừa', 'Object.is(prevProps, nextProps)'],
          ['useCallback(fn, deps)', 'Giữ ổn định địa chỉ RAM của Hàm', 'Mảng phụ thuộc deps'],
          ['useMemo(() => val, deps)', 'Giữ ổn định địa chỉ RAM Object hoặc cache tính toán', 'Mảng phụ thuộc deps']
        ]
      },
      bestPractice: 'Chỉ bọc useCallback/useMemo khi truyền prop xuống Component con ĐÃ ĐƯỢC BỌC React.memo hoặc khi tính toán thuật toán nặng.',
      interviewTrap: [
        'Bọc useCallback ở khắp mọi nơi kể cả khi truyền xuống HTML Tag native như <button onClick={useCallback(...)}> (Over-optimization Trap!).',
        'Quên bọc React.memo cho Child nhưng lại bọc useCallback cho Callback ở Parent.'
      ],
      mentalModel: [
        'React.memo = Tấm lá chắn chống re-render thừa.',
        'useCallback = Keo dán giữ cố định địa chỉ ô nhớ RAM của Hàm.',
        'Over-optimization = Tốn RAM lưu mảng deps mà không đem lại lợi ích nào.'
      ],
      docsLinks: [
        { title: 'React.dev: React.memo Guide', url: 'https://react.dev/reference/react/memo' },
        { title: 'React.dev: useCallback Guide', url: 'https://react.dev/reference/react/useCallback' },
        { title: 'React.dev: useMemo Guide', url: 'https://react.dev/reference/react/useMemo' }
      ]
    },
    demoComponent: <ReferentialEqualityDemo />,
    quiz: [
      {
        question: 'Tại sao truyền onClick={() => handleClick()} xuống <Child /> đã bọc React.memo lại vẫn làm Child bị re-render thừa?',
        options: [
          'A. Do React.memo bị lỗi',
          'B. Do mỗi lần Parent re-render, arrow function mới được tạo ra với ĐỊA CHỈ Ô NHỚ RAM MỚI TINH làm Object.is(old, new) trả về false',
          'C. Do onClick là thuộc tính bắt buộc của React'
        ],
        correctIndex: 1,
        explanation: 'Chính xác! Kiểu dữ liệu tham chiếu (Function/Object) so sánh theo địa chỉ RAM. Hàm mới có địa chỉ RAM mới làm phá vỡ React.memo. Cần dùng useCallback để khắc phục!'
      }
    ]
  },

  // HANDS-ON EXERCISES SUITE
  {
    id: 'challenge-01',
    title: '🎯 THỬ THÁCH #01: Stale Closure & Deps',
    module: 'HANDS-ON EXERCISES SUITE',
    fullTheory: {
      issue: 'Mở file src/exercises/Challenge01.tsx để sửa lỗi Stale Closure Timer và quan sát luồng chạy của Dependency Array [] vs [count]!',
      underTheHood: [
        'Stale Closure xảy ra khi callback capture biến state cũ. Dùng Functional Update (prev => prev + 1) để lấy state từ Queue.',
        'Cleanup function của useEffect chạy trước khi Effect lượt sau kích hoạt.'
      ],
      bestPractice: 'Dùng Functional Update và quản lý đúng mảng phụ thuộc deps.',
      interviewTrap: ['Đoán nhầm clearInterval làm mất bộ đếm.'],
      docsLinks: [
        { title: 'React.dev: State as a Snapshot', url: 'https://react.dev/learn/state-as-a-snapshot' }
      ]
    },
    demoComponent: <Challenge01 />,
    quiz: [
      {
        question: 'Sửa Bug 1 (Timer kẹt số 1) trong Challenge01.tsx bằng cách nào?',
        options: ['A. setSeconds(seconds + 2)', 'B. setSeconds(prev => prev + 1)', 'C. setSeconds(1)'],
        correctIndex: 1,
        explanation: 'Chính xác! Dùng Functional Update (prev => prev + 1) để lấy state mới nhất từ React State Queue.'
      }
    ]
  },
  {
    id: 'challenge-02',
    title: '🎯 THỬ THÁCH #02: Dự Đoán Event Loop',
    module: 'HANDS-ON EXERCISES SUITE',
    fullTheory: {
      issue: 'Mở file src/exercises/Challenge02.tsx để đọc code và điền thứ tự dự đoán in ra của Synchronous vs Promise Body vs Microtask vs Macrotask!',
      underTheHood: [
        'Call Stack Sync & thân new Promise() chạy trước ➔ Promise.then() (Microtask Queue) ➔ setTimeout 0ms (Macrotask Queue).'
      ],
      bestPractice: 'Luôn nhớ thân new Promise() chạy ĐỒNG BỘ trên Call Stack.',
      interviewTrap: ['Đoán setTimeout 0ms chạy trước Promise.then() vì lầm tưởng 0ms là chạy ngay.'],
      docsLinks: [
        { title: 'MDN: Event Loop Guide', url: 'https://developer.mozilla.org/en-US/docs/Web/JavaScript/Event_loop' }
      ]
    },
    demoComponent: <Challenge02 />,
    quiz: [
      {
        question: 'Thứ tự đúng của Challenge02 khi bấm nút là gì?',
        options: ['A. Call Stack Sync -> Microtask -> Macrotask', 'B. Macrotask -> Microtask -> Call Stack', 'C. Microtask -> Macrotask -> Call Stack'],
        correctIndex: 0,
        explanation: 'Chính xác! Call Stack đồng bộ chạy trước ➔ Microtask Promise ➔ Macrotask setTimeout.'
      }
    ]
  },
  {
    id: 'challenge-03',
    title: '🎯 THỬ THÁCH #03: Scope, Hoisting & TDZ',
    module: 'HANDS-ON EXERCISES SUITE',
    fullTheory: {
      issue: 'Mở file src/exercises/Challenge03.tsx để thực thi thử nghiệm trọn bộ Scope, Hoisting & TDZ và Mutability của const!',
      underTheHood: [
        'var có Function Scope (lọt ra ngoài {}), let/const có Block Scope (bị nhốt trong {}).',
        'var hoist = undefined, let/const hoist dính TDZ ReferenceError, Function Declaration hoist cả tên + thân hàm.',
        'const cấm gán lại (TypeError) nhưng cho phép sửa thuộc tính Object (Mutation).'
      ],
      bestPractice: 'Dùng const > let > Cấm dùng var.',
      interviewTrap: ['Nghĩ const Object không cho phép sửa thuộc tính bên trong.'],
      docsLinks: [
        { title: 'MDN: Temporal Dead Zone (TDZ)', url: 'https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/let#temporal_dead_zone_tdz' }
      ]
    },
    demoComponent: <Challenge03 />,
    quiz: [
      {
        question: 'Sửa var i trong vòng lặp for thành let i giúp giải quyết vấn đề gì?',
        options: ['A. Giúp vòng lặp chạy nhanh hơn', 'B. Tạo ô nhớ i độc lập cho từng lượt lặp thay vì dùng chung 1 biến var i', 'C. Làm cho setTimeout nổ ngay lập tức'],
        correctIndex: 1,
        explanation: 'Chính xác! let có Block Scope giúp binding biến i mới cho mỗi lượt lặp.'
      }
    ]
  },
  {
    id: 'challenge-04',
    title: '🎯 THỬ THÁCH #04: Reconciliation & Key',
    module: 'HANDS-ON EXERCISES SUITE',
    fullTheory: {
      issue: 'Mở file src/exercises/Challenge04.tsx để kiểm tra Key Trap key={user.uid} và cơ chế Resetting State Form bằng thuộc tính key!',
      underTheHood: [
        'key={item.id} giúp Reconciliation định danh đúng từng phần tử.',
        'Thay đổi key của Component ép React Unmount cây cũ và Mount cây mới tinh (Reset Form State).'
      ],
      bestPractice: 'Luôn dùng key={item.id} cố định.',
      interviewTrap: ['Lạm dụng key={index} cho danh sách có tính năng thêm/xóa.'],
      docsLinks: [
        { title: 'React.dev: Rendering Lists', url: 'https://react.dev/learn/rendering-lists' }
      ]
    },
    demoComponent: <Challenge04 />,
    quiz: [
      {
        question: 'Muốn Reset hoàn toàn State nội bộ của 1 Component Form khi đổi ID, ta truyền thuộc tính nào?',
        options: ['A. ref', 'B. key={id}', 'C. id'],
        correctIndex: 1,
        explanation: 'Chính xác! Thay đổi key của Component sẽ ép React Unmount component cũ và Mount component mới với state sạch ban đầu.'
      }
    ]
  },
  {
    id: 'challenge-05',
    title: '🎯 THỬ THÁCH #05: Batching & flushSync',
    module: 'HANDS-ON EXERCISES SUITE',
    fullTheory: {
      issue: 'Mở file src/exercises/Challenge05.tsx để thử nghiệm Automatic Batching trong React 18 và dùng flushSync() để ép Sync DOM render!',
      underTheHood: [
        'React 18 gom nhiều lệnh setState trong setTimeout thành 1 lượt re-render.',
        'flushSync() ngắt batching và ép React Fiber thực hiện Commit Phase ngay tại chỗ.'
      ],
      bestPractice: 'Dùng flushSync khi thực sự cần đọc kích thước DOM mới nhất ngay lập tức.',
      interviewTrap: ['Lạm dụng flushSync ở mọi nơi gây lãng phí hiệu năng.'],
      docsLinks: [
        { title: 'React 18 Working Group: Automatic Batching', url: 'https://github.com/reactwg/react-18/discussions/21' }
      ]
    },
    demoComponent: <Challenge05 />,
    quiz: [
      {
        question: 'Hàm flushSync lấy từ gói nào?',
        options: ['A. react', 'B. react-dom', 'C. react-router-dom'],
        correctIndex: 1,
        explanation: 'Chính xác! flushSync là API được xuất từ gói react-dom.'
      }
    ]
  },
  {
    id: 'challenge-06',
    title: '🎯 THỬ THÁCH #06: Fix Re-render Thừa',
    module: 'HANDS-ON EXERCISES SUITE',
    fullTheory: {
      issue: 'Mở file src/exercises/Challenge06.tsx trên VS Code để bọc useCallback và useMemo giúp ExpensiveChild (bọc React.memo) kháng Re-render thừa dứt điểm!',
      underTheHood: [
        'Component con bọc React.memo vẫn bị re-render nếu prop callback/object không dùng useCallback/useMemo vì bị đổi địa chỉ RAM.',
        'useCallback(fn, []) giữ nguyên địa chỉ RAM của Hàm. useMemo(() => obj, []) giữ nguyên địa chỉ RAM của Object.'
      ],
      bestPractice: 'Chỉ bọc useCallback/useMemo khi truyền prop xuống Component con ĐÃ ĐƯỢC BỌC React.memo.',
      interviewTrap: ['Bọc useCallback cho hàm truyền xuống native <button> (Over-optimization Trap!).'],
      docsLinks: [
        { title: 'React.dev: useCallback Guide', url: 'https://react.dev/reference/react/useCallback' }
      ]
    },
    demoComponent: <Challenge06 />,
    quiz: [
      {
        question: 'Muốn giữ nguyên địa chỉ ô nhớ RAM của một callback truyền xuống Component con bọc React.memo, ta dùng Hook nào?',
        options: ['A. useMemo', 'B. useCallback', 'C. useRef'],
        correctIndex: 1,
        explanation: 'Chính xác! useCallback(fn, deps) được thiết kế chuyên biệt để bảo toàn tham chiếu ô nhớ RAM của Hàm giữa các lượt render.'
      }
    ]
  }
];

export default function App() {
  const [selectedConceptId, setSelectedConceptId] = useState<string>('06-referential-equality-memo');
  const [activeTab, setActiveTab] = useState<'theory' | 'demo' | 'quiz'>('theory');
  const [selectedAnswers, setSelectedAnswers] = useState<Record<string, number>>({});
  const [theme, setTheme] = useState<'dark' | 'light'>('dark');

  const currentConcept = CONCEPTS_DATA.find(c => c.id === selectedConceptId) || CONCEPTS_DATA[0];

  const handleSelectAnswer = (quizIdx: number, optionIdx: number) => {
    setSelectedAnswers({
      ...selectedAnswers,
      [`${currentConcept.id}-${quizIdx}`]: optionIdx
    });
  };

  const toggleTheme = () => {
    setTheme(prev => (prev === 'dark' ? 'light' : 'dark'));
  };

  return (
    <div className={`cheatsheet-app ${theme}`}>
      {/* HEADER */}
      <header className="app-header">
        <div>
          <div className="header-brand">
            <span className="brand-badge">2026 EDITION</span>
            <h1>React & JS Interview Cheatsheet</h1>
          </div>
          <p className="header-subtitle">Hệ thống Luyện tập & Đóng gói Kiến thức Under The Hood cho Frontend Engineer</p>
        </div>

        <button className="theme-toggle-btn" onClick={toggleTheme} title="Chuyển đổi giao diện Sáng/Tối">
          {theme === 'dark' ? '☀️ Light Mode' : '🌙 Dark Mode'}
        </button>
      </header>

      {/* MAIN LAYOUT */}
      <div className="app-container">
        {/* SIDEBAR NAVIGATION */}
        <aside className="app-sidebar">
          <div className="sidebar-section-title">ROADMAP LESSONS (6/12 SESSIONS)</div>
          <nav className="concept-menu">
            {CONCEPTS_DATA.filter(c => !c.id.startsWith('challenge')).map((concept) => (
              <button
                key={concept.id}
                className={`menu-item ${concept.id === selectedConceptId ? 'active' : ''}`}
                onClick={() => {
                  setSelectedConceptId(concept.id);
                  setActiveTab('theory');
                }}
              >
                <div className="menu-item-module">{concept.module.split(':')[0]}</div>
                <div className="menu-item-title">{concept.title}</div>
              </button>
            ))}
          </nav>

          <div className="sidebar-section-title" style={{ marginTop: '20px' }}>🎯 HANDS-ON EXERCISES SUITE</div>
          <nav className="concept-menu">
            {CONCEPTS_DATA.filter(c => c.id.startsWith('challenge')).map((concept) => (
              <button
                key={concept.id}
                className={`menu-item ${concept.id === selectedConceptId ? 'active' : ''}`}
                onClick={() => {
                  setSelectedConceptId(concept.id);
                  setActiveTab('theory');
                }}
              >
                <div className="menu-item-module" style={{ color: '#F59E0B' }}>PRACTICE EXERCISE</div>
                <div className="menu-item-title">{concept.title}</div>
              </button>
            ))}
          </nav>
        </aside>

        {/* MAIN CONTENT AREA */}
        <main className="app-content">
          {/* CONCEPT HEADER */}
          <div className="concept-header-card">
            <span className="module-tag">{currentConcept.module}</span>
            <h2>{currentConcept.title}</h2>
          </div>

          {/* TAB SWITCHER */}
          <div className="tab-switcher">
            <button
              className={`tab-btn ${activeTab === 'theory' ? 'active' : ''}`}
              onClick={() => setActiveTab('theory')}
            >
              📖 1. Lý thuyết & Syntax Chi Tiết
            </button>
            <button
              className={`tab-btn ${activeTab === 'demo' ? 'active' : ''}`}
              onClick={() => setActiveTab('demo')}
            >
              ⚡ 2. Live Demo (Bad vs Best)
            </button>
            <button
              className={`tab-btn ${activeTab === 'quiz' ? 'active' : ''}`}
              onClick={() => setActiveTab('quiz')}
            >
              🎯 3. Thử thách Thực hành ({currentConcept.quiz.length} câu)
            </button>
          </div>

          {/* TAB 1: THEORY & SYNTAX (FULL DETAILED VERSION) */}
          {activeTab === 'theory' && (
            <div className="tab-content theory-tab">
              <section className="theory-block problem-block">
                <h3>❓ 1. Vấn đề cốt lõi (Problem Statement)</h3>
                <p>{currentConcept.fullTheory.issue}</p>
              </section>

              <section className="theory-block hood-block">
                <h3>🧠 2. Bản chất Under The Hood (Why it happens?)</h3>
                <ul>
                  {currentConcept.fullTheory.underTheHood.map((item, idx) => (
                    <li key={idx}>{item}</li>
                  ))}
                </ul>
              </section>

              {/* BẢNG SO SÁNH NẾU CÓ */}
              {currentConcept.fullTheory.comparisonTable && (
                <section className="theory-block table-block">
                  <h3>📊 3. Bảng So Sánh Chi Tiết</h3>
                  <div className="table-responsive">
                    <table className="theory-table">
                      <thead>
                        <tr>
                          {currentConcept.fullTheory.comparisonTable.headers.map((h, i) => (
                            <th key={i}>{h}</th>
                          ))}
                        </tr>
                      </thead>
                      <tbody>
                        {currentConcept.fullTheory.comparisonTable.rows.map((row, rIdx) => (
                          <tr key={rIdx}>
                            {row.map((cell, cIdx) => (
                              <td key={cIdx}>{cell}</td>
                            ))}
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </section>
              )}

              {/* LUỒNG VẬN HÀNH NẾU CÓ */}
              {currentConcept.fullTheory.executionFlow && (
                <section className="theory-block flow-block">
                  <h3>🔄 4. Luồng Vận Hành Từng Bước (Execution Flow)</h3>
                  <ol>
                    {currentConcept.fullTheory.executionFlow.map((step, sIdx) => (
                      <li key={sIdx}>{step}</li>
                    ))}
                  </ol>
                </section>
              )}

              <section className="theory-block practice-block">
                <h3>💡 5. Cú pháp & Best Practice (How to fix?)</h3>
                <div className="code-snippet-box">
                  <code>{currentConcept.fullTheory.bestPractice}</code>
                </div>
              </section>

              {currentConcept.fullTheory.mentalModel && (
                <section className="theory-block mental-block">
                  <h3>🧩 6. Mental Model (Tư duy ngầm để nhớ lâu)</h3>
                  <ul>
                    {currentConcept.fullTheory.mentalModel.map((m, mIdx) => (
                      <li key={mIdx}>{m}</li>
                    ))}
                  </ul>
                </section>
              )}

              <section className="theory-block trap-block">
                <h3>⚠️ 7. Bẫy phỏng vấn (Interview Trap & Junior Signal)</h3>
                <ul>
                  {currentConcept.fullTheory.interviewTrap.map((trap, tIdx) => (
                    <li key={tIdx}>{trap}</li>
                  ))}
                </ul>
              </section>

              <div className="docs-link-box">
                🔗 <strong>Tài liệu chính thức (React / MDN Docs): </strong>
                <ul>
                  {currentConcept.fullTheory.docsLinks.map((link, lIdx) => (
                    <li key={lIdx}>
                      <a href={link.url} target="_blank" rel="noreferrer">
                        {link.title} ({link.url})
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          )}

          {/* TAB 2: LIVE DEMO */}
          {activeTab === 'demo' && (
            <div className="tab-content demo-tab">
              {currentConcept.demoComponent}
            </div>
          )}

          {/* TAB 3: QUIZ & PRACTICE */}
          {activeTab === 'quiz' && (
            <div className="tab-content quiz-tab">
              <h3>🎯 Kiểm tra phản xạ kiến thức (Active Recall Quiz)</h3>
              {currentConcept.quiz.map((q, qIdx) => {
                const answerKey = `${currentConcept.id}-${qIdx}`;
                const userChoice = selectedAnswers[answerKey];
                const isAnswered = userChoice !== undefined;
                const isCorrect = userChoice === q.correctIndex;

                return (
                  <div key={qIdx} className="quiz-card">
                    <p className="quiz-question"><strong>Câu {qIdx + 1}:</strong> {q.question}</p>
                    <div className="quiz-options">
                      {q.options.map((opt, optIdx) => (
                        <button
                          key={optIdx}
                          className={`quiz-option-btn ${
                            userChoice === optIdx 
                              ? (isCorrect ? 'correct' : 'incorrect') 
                              : ''
                          }`}
                          onClick={() => handleSelectAnswer(qIdx, optIdx)}
                        >
                          {opt}
                        </button>
                      ))}
                    </div>

                    {isAnswered && (
                      <div className={`quiz-feedback ${isCorrect ? 'correct-feedback' : 'incorrect-feedback'}`}>
                        {isCorrect ? '🎉 ĐÚNG RỒI! ' : '❌ CHƯA CHÍNH XÁC! '}
                        {q.explanation}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          )}
        </main>
      </div>
    </div>
  );
}
