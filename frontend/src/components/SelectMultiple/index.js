//select multiple

function SelectMultiple({ options, name, label, handleChange, selectedOptions }) {

  return (
    <div className="mb-3">
      <label className="ms-2" htmlFor={name}>{label}</label>
      <select
        className="form-select"
        multiple={true}
        id={name}
        name={name}
        // style={{ backgroundColor: "red" }}
        value={selectedOptions}
        onChange={handleChange}
      >
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
    </div>
  );
};

export default SelectMultiple;
