import { useState } from 'react';

import Timer from './Timer';
import Settings from './Settings';
import SettingsContext from '../components/SettingsContext';

import '../style/App.css';

const App = () => {
  const [showSettings, setShowSettings] = useState(false);
  const [workTime, setWorkTime] = useState(30);
  const [breakTime, setBreakTime] = useState(30);

  return (
    <main>
      <SettingsContext.Provider value={{
        showSettings,
        setShowSettings,
        workTime,
        breakTime,
        setWorkTime,
        setBreakTime,
      }}>
        {showSettings ? <Settings /> : <Timer />}
      </SettingsContext.Provider>
    </main>
  );
}

export default App;
