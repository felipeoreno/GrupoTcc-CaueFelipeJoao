//select multiple
import Select from 'react-select';

function SelectMultiple({ handleChange, placeholder, options }) {
  const selectStyles = {
    menu: base => ({
      ...base,
      zIndex: 100
    })
  };

  // export default () => 

  return (
    <Select
      placeholder={placeholder}
      isMulti
      name={"categories"}
      options={options}
      className="basic-multi-select mb-3"
      classNamePrefix="select"
      styles={selectStyles}
      onChange={handleChange}
    />
  );
}


export default SelectMultiple