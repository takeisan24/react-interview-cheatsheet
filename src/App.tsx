
import './App.css'
import StaleClosureDemo from './concepts/01-stale-closure/Demo';

function App() {
  return (
    <div>
      <StaleClosureDemo />
    </div>
  );
}

export default function Root() {
  return <App />;
}
