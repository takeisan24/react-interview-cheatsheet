
import './App.css'
import StaleClosureDemo from './concepts/01-stale-closure/Demo';
import EventLoopDemo from './concepts/02-event-loop/Demo';

function App() {
  return (
    <div>
      <StaleClosureDemo />
      <EventLoopDemo />
    </div>
  );
}

export default function Root() {
  return <App />;
}
