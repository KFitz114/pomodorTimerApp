import './App.css';
import Timer from './components/timer.js';

function App() {
  return (
    <div className="App"> 
      <h1> Pomodoro app </h1>
      <div className = 'counter'> <Timer /> </div>
    </div>
  );
}

export default App;
