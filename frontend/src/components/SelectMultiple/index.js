//select

function Select({ label, placeholder, type, name, handleChange, value }) {
  return (
    <select className='mb-3 form-select'>
      <input
        type={type}
        placeholder={placeholder}
        className='form-control'
        id='form'
        name={name}
        // toda vez que for lidar com eventos utilizar handle
        onChange={handleChange}
        value={value}
      />
      <label for='form'>{label}</label>
    </select>
  )
}

export default Select;



import React, { useState } from "react";

const SelectMultiple = ({ options, name }) => {
  const [selectedOptions, setSelectedOptions] = useState([]);

  const handleChange = (event) => {
    const selectedOption = event.target.value;

    if (selectedOptions.includes(selectedOption)) {
      setSelectedOptions(selectedOptions.filter((option) => option !== selectedOption));
    } else {
      setSelectedOptions([...selectedOptions, selectedOption]);
    }
  };

  return (
    <select multiple
      className="my-select"
      id="my-select"
      name="my-select"
      style={{ backgroundColor: "red" }}
      value={selectedOptions}
      onChange={handleChange}
    >
      {options.map((option) => (
        <option key={option.value} value={option.value}>
          {option.label}
        </option>
      ))}
    </select>
  );
};

const options = [
  {
    value: "1",
    label: "Opção 1",
  },
  {
    value: "2",
    label: "Opção 2",
  },
  {
    value: "3",
    label: "Opção 3",
  },
];

const App = () => {
  return (
    <div>
      <SelectMultiple options={options} value={[]} />
    </div>
  );
};

export default App;
