import React from 'react';
import style from './Select.module.css'

const options = [];

for (let i = 10; i < 36; i++) {
  options.push({
    value: i.toString(36) + i,
    label: i.toString(36) + i,
  });
}

const handleChange = (value) => {
  console.log(`selected ${value}`);
};

const Select = ({ placeholder , customClass}) => (
  <select
    name="select"
    className={`${style.select} ${style.select_seta} ${style[customClass]}`}
    onChange={handleChange}
  >
    <option
      className={style.select_placeholder}
      disabled selected
    >
      {placeholder}
    </option>

    {
      options.map((option) => (
        <option value={option.label} key={option.label}>
          {option.value}
        </option>
      ))
    }
  </select>
);

export default Select;
