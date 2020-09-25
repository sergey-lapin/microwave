import React from 'react';
import { Select } from 'antd';
import { microWaveTypes } from '../models/drivers';
import { currentMicrowave } from '../models/CurrentMicrowave'
import { PubSubHook } from '../models/PubSubHook'

const { Option } = Select;

export const MicrowaveSelector = ({ onSelected }: { onSelected: Function }) => {
  let { setValue } = PubSubHook(currentMicrowave);

  return (
    <Select data-testid="select" defaultValue="Daewoo" onSelect={(option) => {
      let result = microWaveTypes.find((item2) => item2.name === option)
      result && setValue(result);
      setTimeout(() => {
        onSelected();
      }, 300);
    }} style={{ width: '100%' }}>
      {microWaveTypes.map((item) => <Option value={item.name}
      >{item.title}</Option>)}
    </Select>
  )
}