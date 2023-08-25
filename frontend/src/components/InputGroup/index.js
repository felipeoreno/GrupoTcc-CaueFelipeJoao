//input group

function InputGroup({ label, placeholder, type, name, handleChange, value }) {
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
      />
      <label for='form'>{label}</label>
    </div>
  )
}

export default InputGroup