import { useContext } from 'react';
import ReactSlider from 'react-slider';

import SettingsContext from '../components/SettingsContext';
import Select from '../components/Select';
import BackButton from '../components/BackButton';

import '../style/components.css'


function Settings() {
  const settingsInfo = useContext(SettingsContext);

  return(
    <div style={{ textAlign: 'left' }}>
      <label>Training:</label>

      <Select />

      <label>work: {settingsInfo.workTime} seconds</label>

      <ReactSlider
        className={'slider'}
        thumbClassName={'thumb'}
        trackClassName={'track'}
        value={settingsInfo.workTime}
        onChange={newValue => settingsInfo.setWorkTime(newValue)}
        min={1}
        max={180}
      />

      <label>break: {settingsInfo.breakTime} seconds</label>

      <ReactSlider
        className={'slider green'}
        thumbClassName={'thumb'}
        trackClassName={'track'}
        value={settingsInfo.breakTime}
        onChange={newValue => settingsInfo.setBreakTime(newValue)}
        min={1}
        max={60}
      />

      <div style={{textAlign:'center', marginTop:'20px'}}>
        <BackButton onClick={() => settingsInfo.setShowSettings(false)} />
      </div>
    </div>
  );
}

export default Settings;
