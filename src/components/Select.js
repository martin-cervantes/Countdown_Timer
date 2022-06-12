import {useContext} from 'react';

import SettingsContext from '../components/SettingsContext';

const Select = (props) => {
  const settingsInfo = useContext(SettingsContext);

  const setTime = ({ target }) => {
    const { value } = target;

    switch (value) {
      case '1':
        settingsInfo.setWorkTime(30);
        settingsInfo.setBreakTime(30);
        break;
      case '2':
        settingsInfo.setWorkTime(40);
        settingsInfo.setBreakTime(20);
        break;
      case '3':
        settingsInfo.setWorkTime(45);
        settingsInfo.setBreakTime(15);
        break;
      case '4':
        settingsInfo.setWorkTime(60);
        settingsInfo.setBreakTime(30);
        break;
      case '5':
        settingsInfo.setWorkTime(60);
        settingsInfo.setBreakTime(20);
        break;
      default:
        console.log(value);
    }
  }

  return (
    <select className={'select'} onChange={ e => setTime(e) }>
      <option value={1}>30 - 30</option>
      <option value={2}>40 - 20</option>
      <option value={3}>45 - 15</option>
      <option value={4}>60 - 30</option>
      <option value={5}>60 - 20</option>
    </select>
  );
}

export default Select;
