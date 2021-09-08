import { useState } from "react";

export default function useForm(initial = {}) {
  const [inputs, setInputs] = useState(initial);

  function handleChange(e) {
    let { value, name, type } = e.target;

    if (type === "number") {
      value = parseInt(value);
    }

    if (type === "file") {
      [value] = e.target.files;
    }

    setInputs({
      ...inputs,
      [name]: value,
    });
  }

  function resetForm() {
    setInputs(initial);
  }

  function clearForm() {
    const blankState = {};
    // eslint-disable-next-line no-restricted-syntax
    for (const key in initial) {
      // eslint-disable-next-line no-prototype-builtins
      if (initial.hasOwnProperty(key)) {
        blankState[key] = "";
      }
    }
    setInputs(blankState);
  }

  return {
    inputs,
    handleChange,
    resetForm,
    clearForm,
  };
}
