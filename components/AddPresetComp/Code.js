import { useState } from "react";

const Code = (onClose) => {
  const kvps = [];
  const [nameString, onNameString] = useState("");
  const [numberString, onNumberString] = useState("");
  const [nameError, setNameError] = useState("");
  const [numberError, setNumberError] = useState("");

  const handleBackdropPress = (event) => {
    if (event.target === event.currentTarget) {
      onClose();
    }
  };

  function AddObject() {
    // Reset errors
    setNameError("");
    setNumberError("");

    let isValid = true;

    // Validate nameString
    if (!nameString.trim()) {
      setNameError("Navn er påkrævet"); // Name is required
      isValid = false;
    }

    // Validate numberString
    if (!numberString.trim()) {
      setNumberError("Nummer er påkrævet"); // Number is required
      isValid = false;
    } else if (!/^\d+$/.test(numberString)) {
      setNumberError("Kun tal er tilladt"); // Only numbers are allowed
      isValid = false;
    }

    if (isValid) {
      // Add to kvps
      kvps.push({ name: nameString, number: numberString });

      // Log for debugging
      console.log("Added Object:", kvps);

      // Clear inputs after successful submission
      onNameString("");
      onNumberString("");
    }
  }

  return {
    nameString,
    onNameString,
    numberString,
    onNumberString,
    nameError,
    numberError,
    handleBackdropPress,
    AddObject,
  };
};

export default Code;
