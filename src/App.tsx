
import './App.css'
import StaleClosureDemo from './concepts/01-stale-closure/Demo';
import EventLoopDemo from './concepts/02-event-loop/Demo';
import ScopeHoistingDemo from './concepts/03-scope-hoisting-tdz/Demo';
import ReconciliationDemo from './concepts/04-vdom-reconciliation-fiber/Demo';
import BatchingDemo from './concepts/05-lifecycle-batching-react18/Demo';

function App() {
  return (
    <div>
      <StaleClosureDemo />
      <EventLoopDemo />
      <ScopeHoistingDemo />
      <ReconciliationDemo />
      <BatchingDemo />
    </div>
  );
}

export default function Root() {
  return <App />;
}
