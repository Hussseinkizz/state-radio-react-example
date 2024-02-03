import { countChannel } from '../store';
import { useChannel } from '../useStateRadio';

export default function CounterA() {
  const [count, setCount] = useChannel(countChannel);

  return (
    <div>
      <h1>{count}</h1>
      <button onClick={() => setCount(count + 1)}>add +1</button>
    </div>
  );
}
