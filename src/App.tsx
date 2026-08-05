
import './App.css'
import StaleClosureDemo from './concepts/01-stale-closure/Demo';
import EventLoopDemo from './concepts/02-event-loop/Demo';
import ScopeHoistingDemo from './concepts/03-scope-hoisting-tdz/Demo';
import ReconciliationDemo from './concepts/04-vdom-reconciliation-fiber/Demo';

function App() {
  return (
    <div>
      <StaleClosureDemo />
      <EventLoopDemo />
      <ScopeHoistingDemo />
      <ReconciliationDemo />
    </div>
  );
}

export default function Root() {
  return <App />;
}
