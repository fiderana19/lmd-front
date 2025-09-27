import React from "react";

export const handleNumberKeyPress = async (
  e: React.KeyboardEvent<HTMLInputElement>,
) => {
  const charCode = e.which || e.keyCode;

  if (charCode < 48 || charCode > 57) {
    e.preventDefault();
  }
};

export const handleFloatKeyPress = async (
  e: React.KeyboardEvent<HTMLInputElement>,
) => {
  const charCode = e.which || e.keyCode;

  if ((charCode < 48 || charCode > 57) && charCode != 46 && charCode > 31) {
    e.preventDefault();
  }
};
