//input group

function InputGroup({ label, placeholder, type, name, handleChange, value, atribute1, atribute1Value, atribute2, atribute2Value }) {
  return (
    <div className='mb-3 form-floating'>
      <input
        type={type}
        placeholder={placeholder}
        className='form-control'
        id='form'
        name={name}
        // toda vez que for lidar com eventos utilizar handle
        onChange={handleChange}
        value={value}
        atribute1={atribute1Value}
        atribute2={atribute2Value}
      />
      <label htmlFor='form'>{label}</label>
    </div>
  )
}

export default InputGroup;