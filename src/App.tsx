import { useState } from 'react';
import StaleClosureDemo from './concepts/01-stale-closure/Demo';
import EventLoopDemo from './concepts/02-event-loop/Demo';
import ScopeHoistingDemo from './concepts/03-scope-hoisting-tdz/Demo';
import ReconciliationDemo from './concepts/04-vdom-reconciliation-fiber/Demo';
import BatchingDemo from './concepts/05-lifecycle-batching-react18/Demo';
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
  theory: {
    problem: string;
    underTheHood: string[];
    syntaxBestPractice: string;
    interviewTrap: string;
    docsLink: string;
  };
  demoComponent: React.ReactNode;
  quiz: QuizQuestion[];
}

const CONCEPTS_DATA: ConceptData[] = [
  {
    id: '01-stale-closure',
    title: '01. Stale Closure trong useEffect',
    module: 'Module 1: JS Core Under The Hood',
    theory: {
      problem: 'Khi dùng setInterval/setTimeout trong useEffect với mảng phụ thuộc rỗng [], biến state bị kẹt ở giá trị khởi tạo ban đầu mãi mãi.',
      underTheHood: [
        'Closure trong JS: Hàm callback trong setInterval khi tạo ra ở render 1 đã "chụp ảnh" (capture) giá trị count = 0.',
        'State is a Snapshot: Biến state trong 1 lần render là hằng số cố định.',
        'Dependency Array []: Khiến useEffect chỉ chạy 1 lần khi mount, callback không bao giờ được tạo lại để chụp ảnh mới.'
      ],
      syntaxBestPractice: 'Dùng Functional Update: setCount(prevCount => prevCount + 1). React tự lấy state mới nhất từ Queue.',
      interviewTrap: 'Đoán nhầm do clearInterval làm mất bộ đếm. Cần giải thích đúng về JS Closure & State Snapshot.',
      docsLink: 'https://react.dev/learn/state-as-a-snapshot'
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
    theory: {
      problem: 'Làm sao JavaScript đơn luồng (Single-threaded) xử lý các tác vụ bất đồng bộ mà không đóng băng UI?',
      underTheHood: [
        '1. Call Stack: Chạy code đồng bộ từ trên xuống dưới.',
        '2. Microtask Queue (Promise.then, async/await): Vét sạch 100% khi Call Stack trống.',
        '3. UI Render/Paint: Vẽ lại màn hình mỗi 16.6ms (60Hz).',
        '4. Macrotask Queue (setTimeout, setInterval, I/O): Lấy đúng 1 tác vụ chạy sau khi Microtask rỗng.'
      ],
      syntaxBestPractice: 'Luôn hiểu rõ Promise (Microtask) chạy TRƯỚC setTimeout (Macrotask). Tránh block Call Stack bằng vòng lặp nặng.',
      interviewTrap: 'Đoán setTimeout(..., 0) chạy trước Promise.then() hoặc đoán code bên trong new Promise(...) là bất đồng bộ.',
      docsLink: 'https://developer.mozilla.org/en-US/docs/Web/JavaScript/Event_loop'
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
    theory: {
      problem: 'Khác biệt giữa var vs let vs const? Tại sao gọi biến trước khi khai báo bằng var ra undefined, còn bằng let thì bị ReferenceError?',
      underTheHood: [
        'Creation Phase: Scan file, nhấc các khai báo biến lên đầu Scope (Hoisting). var gán mặc định = undefined. let/const không gán giá trị (Uninitialized).',
        'Temporal Dead Zone (TDZ): Khoảng không gian từ đầu Scope tới dòng khai báo let/const. Truy cập ở đây bị ném ReferenceError.',
        'Block Scope: let/const bị giới hạn trong ngoặc {}. var có Function Scope nên lọt ra ngoài ngoặc {}.'
      ],
      syntaxBestPractice: 'Ưu tiên dùng const > let > Tuyệt đối không dùng var trong dự án thực tế.',
      interviewTrap: 'Nghĩ let/const không bị Hoisting (thực ra CÓ bị Hoisting nhưng bị dính TDZ) hoặc nghĩ const làm Object thành Immutable.',
      docsLink: 'https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/let#temporal_dead_zone_tdz'
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
    theory: {
      problem: 'Virtual DOM là gì? Tại sao truyền key={index} khi render mảng lại gây bug tráo đổi dữ liệu nghiêm trọng?',
      underTheHood: [
        'Real DOM: Mỗi HTML Element chứa 300+ thuộc tính C++, sửa trực tiếp gây Reflow & Repaint tốn chi phí.',
        'Virtual DOM: Chỉ là 1 Plain JS Object thuần túy trong RAM đại diện cho UI.',
        'Reconciliation: Diffing algorithm O(n) so sánh 2 cây VDOM. Nếu trùng key=index khi xóa item đầu mảng, React lầm tưởng item mới chính là item cũ nên giữ nguyên State nội bộ/ô input cũ!'
      ],
      syntaxBestPractice: 'Luôn dùng key={item.id} (ID cố định duy nhất của dữ liệu).',
      interviewTrap: 'Trả lời Virtual DOM luôn nhanh hơn Real DOM (thực ra VDOM tốn RAM giữ cây ảo, lợi ích lớn nhất là Developer Experience & Batching updates).',
      docsLink: 'https://react.dev/learn/rendering-lists'
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
    theory: {
      problem: 'State Batching là gì? Sự khác biệt giữa React 17 và React 18 về Batching?',
      underTheHood: [
        'State Batching: Gom nhiều lệnh setState trong cùng 1 chu kỳ sự kiện thành 1 lượt Re-render duy nhất.',
        'React 17: Chỉ batching trong React Event Handlers đồng bộ. Trong setTimeout/Promise KHÔNG batching (re-render từng dòng).',
        'React 18 Automatic Batching: Gom nhóm TỰ ĐỘNG ở MỌI NƠI (Sync, Async, setTimeout, Promise).'
      ],
      syntaxBestPractice: 'Dùng flushSync(() => { setState(...) }) khi muốn TẮT Batching và ÉP React Re-render DOM ngay lập tức.',
      interviewTrap: 'Nghĩ gọi setCount 3 lần trong setTimeout ở React 18 vẫn re-render 3 lần (thực tế React 18 gom thành 1 lần).',
      docsLink: 'https://react.dev/learn/queueing-a-series-of-state-updates'
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
  }
];

export default function App() {
  const [selectedConceptId, setSelectedConceptId] = useState<string>('01-stale-closure');
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
          <div className="sidebar-section-title">MASTER ROADMAP (5/12 SESSIONS)</div>
          <nav className="concept-menu">
            {CONCEPTS_DATA.map((concept) => (
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
              📖 1. Lý thuyết & Syntax
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

          {/* TAB 1: THEORY & SYNTAX */}
          {activeTab === 'theory' && (
            <div className="tab-content theory-tab">
              <section className="theory-block problem-block">
                <h3>❓ 1. Vấn đề là gì? (Problem Statement)</h3>
                <p>{currentConcept.theory.problem}</p>
              </section>

              <section className="theory-block hood-block">
                <h3>🧠 2. Bản chất Under The Hood (Why it happens?)</h3>
                <ul>
                  {currentConcept.theory.underTheHood.map((item, idx) => (
                    <li key={idx}>{item}</li>
                  ))}
                </ul>
              </section>

              <section className="theory-block practice-block">
                <h3>💡 3. Cú pháp & Best Practice (How to fix?)</h3>
                <div className="code-snippet-box">
                  <code>{currentConcept.theory.syntaxBestPractice}</code>
                </div>
              </section>

              <section className="theory-block trap-block">
                <h3>⚠️ 4. Bẫy phỏng vấn (Interview Trap & Junior Signal)</h3>
                <p>{currentConcept.theory.interviewTrap}</p>
              </section>

              <div className="docs-link-box">
                🔗 <strong>Tài liệu chính thức: </strong>
                <a href={currentConcept.theory.docsLink} target="_blank" rel="noreferrer">
                  {currentConcept.theory.docsLink}
                </a>
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
