import React, { useContext, useEffect, useState } from "react";
import Select from "react-select";
import { Typography } from "@mui/material";
const TimeSelectPinnedPost = (props) => {
  const status = [
    { name: "24hrs", value: 24 },
    { name: "48hrs", value: 48 },
    {
      name: "72hrs",
      value: 72,
    },
    {
      name: "7 Dias",
      value: 168,
    },
    {
      name: "2 Semanas",
      value: 360,
    },
    {
      name: "1 Mes",
      value: 720,
    },
  ];
  const detectarCambiosTimePinned = (value) => {
    props.detectarCambiosTimePinned(value);
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
        Selecciona el tiempo de anclado
      </Typography>
      <Select
        onChange={detectarCambiosTimePinned}
        className='basic-single'
        classNamePrefix='select'
        styles={customStyles}
        name='select-state'
        placeholder='Tiempo de anclado'
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

export default TimeSelectPinnedPost;
