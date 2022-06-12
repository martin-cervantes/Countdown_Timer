import { useContext, useState, useEffect, useRef } from 'react';
import { CircularProgressbar, buildStyles } from 'react-circular-progressbar';

import PlayButton from '../components/PlayButton';
import PauseButton from '../components/PauseButton';
import SettingsButton from '../components/SettingsButton';
import SettingsContext from '../components/SettingsContext';

import AlarmTone from '../audio/alarm_tone.mp3';

import 'react-circular-progressbar/dist/styles.css';
const red = '#f54e4e';
const green = '#4aec8c';

const Timer = () => {
  const settingsInfo = useContext(SettingsContext);

  const [isPaused, setIsPaused] = useState(true);
  const [mode, setMode] = useState('work');
  const [secondsLeft, setSecondsLeft] = useState(0);

  const secondsLeftRef = useRef(secondsLeft);
  const isPausedRef = useRef(isPaused);
  const modeRef = useRef(mode);

  const tick = () => {
    secondsLeftRef.current--;
    setSecondsLeft(secondsLeftRef.current);
  }

  useEffect(() => {
    const switchMode = () => {
      const nextMode = modeRef.current === 'work' ? 'break' : 'work';
      const nextSeconds = (nextMode === 'work' ? settingsInfo.workTime : settingsInfo.breakTime);

      setMode(nextMode);
      modeRef.current = nextMode;

      setSecondsLeft(nextSeconds);
      secondsLeftRef.current = nextSeconds;
    }

    secondsLeftRef.current = settingsInfo.workTime;
    setSecondsLeft(secondsLeftRef.current);

    const interval = setInterval(() => {
      if (isPausedRef.current) {
        return;
      }
      if (secondsLeftRef.current === 0) {
        const audio = new Audio(AlarmTone);
        audio.play();
        return switchMode();
      }

      tick();
    }, 1000);

    return () => clearInterval(interval);
  }, [settingsInfo]);

  const totalSeconds = mode === 'work'
    ? settingsInfo.workTime
    : settingsInfo.breakTime;
  const percentage = Math.round(secondsLeft / totalSeconds * 100);

  let seconds = secondsLeft;
  if(seconds < 10) seconds = '0' + seconds;

  return (
    <div>
      <CircularProgressbar
        value={percentage}
        text={seconds}
        styles={buildStyles({
        textColor:'#fff',
        pathColor:mode === 'work' ? red : green,
        tailColor:'rgba(255,255,255,.2)',
      })} />

      <div style={{marginTop:'20px'}}>
        {isPaused
          ? <PlayButton onClick={() => { setIsPaused(false); isPausedRef.current = false; }} />
          : <PauseButton onClick={() => { setIsPaused(true); isPausedRef.current = true; }} />}
      </div>

      <div style={{marginTop:'20px'}}>
        <SettingsButton onClick={() => settingsInfo.setShowSettings(true)} />
      </div>
    </div>
  );
}

export default Timer;
