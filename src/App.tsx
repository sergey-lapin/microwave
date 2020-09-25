import React, { useState } from "react";
import { FireContainer } from './components/Fire/FireContainer'
import { Drawer } from 'antd';
import { MicrowaveSelector } from './components/MicrowaveSelector'
import { AudioComponent } from './components/AudioComponent'
import { NumbersPanel } from './components/NumbersPanel'
import { ModesPanel } from './components/ModesPanel'
import { timer } from './models/Timer'
import { PubSubHook } from './models/PubSubHook'

import 'antd/dist/antd.css';
import './App.css';

const DoorContainer = ({ onDoorClick }: { onDoorClick: ((event: React.MouseEvent<HTMLDivElement, MouseEvent>) => void) }) => {
  return <div className="door-container">
    <div className="door">
      <div className="window-container">
        <div className="window">
          <FireContainer />
        </div>
      </div>
      <div className="handle button" onClick={onDoorClick}>
      </div>
    </div>
  </div>
}

const ControlPanel = () => {
  let { value } = PubSubHook(timer);

  let minutes = Math.floor(value / 60);
  let seconds = value % 60;

  let minutesStr = minutes < 10 ? "0" + minutes : minutes;
  let secondsStr = seconds < 10 ? "0" + seconds : seconds;
  let time = minutesStr + ":" + secondsStr

  return <div className="control-panel-container">
    <div className="control-panel">
      <div className="clock">
        <p>{time}</p>
      </div>
      <div className="controls">
        <ModesPanel />
        <NumbersPanel
          onStopClick={timer.stop} onStartClick={timer.start} />
      </div>
    </div>
  </div>
}

export const Microwave = () => {
  const [visible, setVisible] = useState(false);

  const showDrawer = () => {
    setVisible(true);
  };

  const onClose = () => {
    setVisible(false);
  };

  return (
    <div className="App">
      <div className="microwave-container">
        <div className="microwave">
          <DoorContainer onDoorClick={showDrawer} />
          <ControlPanel />
        </div>
      </div>

      <AudioComponent />

      <Drawer
        title="Type of Microwave"
        placement="right"
        closable={false}
        onClose={onClose}
        visible={visible}
      >

        <MicrowaveSelector onSelected={onClose} />
      </Drawer>
    </div>
  );
}

export default Microwave;


