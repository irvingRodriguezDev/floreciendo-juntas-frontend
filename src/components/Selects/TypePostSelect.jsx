import Select from "react-select";
import { Typography } from "@mui/material";
const TypePostSelect = (props) => {
  const status = [
    { name: "floreciendo-juntas", value: "floreciendo-juntas" },
    { name: "productos", value: "productos" },
    {
      name: "servicios",
      value: "servicios",
    },
  ];
  const detectarCambiosTypePost = (value) => {
    props.detectarCambiosTypePost(value);
  };

  const customStyles = {
    control: (provided, state) => ({
      ...provided,
      borderColor: state.isFocused ? "#E53888" : "#E53888",
      boxShadow: state.isFocused ? "0 0 0 1px #E53888" : "none",
      "&:hover": {
        borderColor: "#E53888",
      },
    }),
    placeholder: (provided) => ({
      ...provided,
      color: "#E53888", // color del placeholder
    }),
    singleValue: (provided) => ({
      ...provided,
      color: "black", // texto seleccionado
    }),
    dropdownIndicator: (provided, state) => ({
      ...provided,
      color: state.isFocused ? "#E53888" : "#E53888",
      "&:hover": {
        color: "#E53888",
      },
    }),
    option: (provided, state) => ({
      ...provided,
      backgroundColor: state.isSelected
        ? "#E53888"
        : state.isFocused
          ? "#f0f0f0"
          : "white",
      color: state.isSelected ? "white" : "black",
      "&:hover": {
        backgroundColor: state.isSelected ? "#E53888" : "#f5f5f5",
      },
    }),
    menu: (base) => ({
      ...base,
      zIndex: 100,
    }),
  };

  return (
    <>
      <Typography textAlign={"start"} color='#E53888'>
        Elije una comunidad en la que quieres publicar
      </Typography>
      <Select
        onChange={detectarCambiosTypePost}
        className='basic-single'
        classNamePrefix='select'
        styles={customStyles}
        name='select-state'
        placeholder='Elije la comunidad'
        options={
          status
            ? status.map((option) => ({
                label: `${option.name}`,
                value: `${option.value}`,
              }))
            : null
        }
      />
    </>
  );
};

export default TypePostSelect;
