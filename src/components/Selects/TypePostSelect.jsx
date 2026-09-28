import React from "react";
import Select, { components } from "react-select";
import { Typography, Box } from "@mui/material";

// 🌸 Opciones enriquecidas con identidad visual y descripciones de la plataforma
const OPTIONS = [
  {
    value: "floreciendo-juntas",
    label: "Comunidad / Charlas",
    icon: "🌸",
    description: "Comparte experiencias, dudas o novedades con la comunidad",
  },
  {
    value: "servicios",
    label: "Servicios Profesionales",
    icon: "💼",
    description: "Anuncia tus servicios de belleza, asesorías o talleres",
  },
  {
    value: "productos",
    label: "Productos e Insumos",
    icon: "🛍️",
    description: "Muestra insumos, herramientas o material digital",
  },
];

// 🎨 Componente personalizado para renderizar cada opción en el menú
const CustomOption = (props) => {
  return (
    <components.Option {...props}>
      <Box sx={{ display: "flex", alignItems: "center", gap: 1.5, py: 0.5 }}>
        <Typography sx={{ fontSize: "1.2rem" }}>{props.data.icon}</Typography>
        <Box>
          <Typography
            fontWeight={600}
            fontSize='0.88rem'
            color={props.isSelected ? "#FFFFFF" : "#2C2C2C"}
          >
            {props.data.label}
          </Typography>
          <Typography
            fontSize='0.75rem'
            color={props.isSelected ? "rgba(255,255,255,0.85)" : "#6B7280"}
          >
            {props.data.description}
          </Typography>
        </Box>
      </Box>
    </components.Option>
  );
};

// 🌟 Componente personalizado para el valor seleccionado en la caja
const CustomSingleValue = (props) => {
  return (
    <components.SingleValue {...props}>
      <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
        <span>{props.data.icon}</span>
        <Typography fontWeight={600} fontSize='0.88rem' color='#1A1A1A'>
          {props.data.label}
        </Typography>
      </Box>
    </components.SingleValue>
  );
};

const TypePostSelect = ({ detectarCambiosTypePost, value }) => {
  const brandColor = "#D72E7A";
  const brandSoftBg = "rgba(215, 46, 122, 0.06)";

  const customStyles = {
    control: (provided, state) => ({
      ...provided,
      borderRadius: "14px",
      padding: "3px 6px",
      backgroundColor: "#FAF8F9",
      borderColor: state.isFocused ? brandColor : "rgba(215, 46, 122, 0.2)",
      borderWidth: state.isFocused ? "1.5px" : "1px",
      boxShadow: state.isFocused
        ? "0 0 0 3px rgba(215, 46, 122, 0.12)"
        : "none",
      transition: "all 0.2s ease",
      cursor: "pointer",
      "&:hover": {
        borderColor: brandColor,
        backgroundColor: "#FFFFFF",
      },
    }),
    placeholder: (provided) => ({
      ...provided,
      color: "#9CA3AF",
      fontSize: "0.88rem",
      fontWeight: 500,
    }),
    dropdownIndicator: (provided, state) => ({
      ...provided,
      color: state.isFocused ? brandColor : "#9CA3AF",
      transition: "color 0.2s ease",
      "&:hover": {
        color: brandColor,
      },
    }),
    indicatorSeparator: () => ({ display: "none" }), // Quita la barrita divisora antiestética
    menu: (provided) => ({
      ...provided,
      borderRadius: "16px",
      overflow: "hidden",
      boxShadow: "0 10px 30px rgba(0,0,0,0.12)",
      border: "1px solid rgba(215, 46, 122, 0.12)",
      zIndex: 1000,
      padding: "6px",
    }),
    menuList: (provided) => ({
      ...provided,
      padding: 0,
    }),
    option: (provided, state) => ({
      ...provided,
      borderRadius: "10px",
      margin: "2px 0",
      backgroundColor: state.isSelected
        ? brandColor
        : state.isFocused
          ? brandSoftBg
          : "transparent",
      cursor: "pointer",
      transition: "all 0.15s ease",
      active: {
        backgroundColor: state.isSelected ? brandColor : brandSoftBg,
      },
    }),
  };

  // Buscar el objeto seleccionado si nos pasan un string en `value`
  const selectedOption = OPTIONS.find((opt) => opt.value === value) || null;

  return (
    <Box sx={{ width: "100%", mb: 2 }}>
      <Typography
        variant='caption'
        fontWeight={700}
        color='#D72E7A'
        sx={{
          display: "block",
          mb: 0.8,
          fontSize: "0.82rem",
          letterSpacing: "0.2px",
        }}
      >
        ✨ ¿En qué sección quieres publicar?
      </Typography>

      <Select
        onChange={(option) => detectarCambiosTypePost(option?.value)}
        value={selectedOption}
        options={OPTIONS}
        styles={customStyles}
        placeholder='Selecciona una categoría...'
        isSearchable={false}
        components={{
          Option: CustomOption,
          SingleValue: CustomSingleValue,
        }}
      />
    </Box>
  );
};

export default TypePostSelect;
