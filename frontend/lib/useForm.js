import { useCallback, useEffect, useState } from "react";

export default function useForm(initial = {}) {
  const [inputs, setInputs] = useState(initial);

  const initialValues = Object.values(initial).join("");

  useEffect(() => {
    setInputs(initial);
    // initialValues takes care for the initial
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [initialValues, setInputs]);

  const handleChange = useCallback(
    (e) => {
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
    },
    [inputs]
  );

  const resetForm = useCallback(() => {
    setInputs(initial);
  }, [initial]);

  const clearForm = useCallback(() => {
    const blankState = {};
    // eslint-disable-next-line no-restricted-syntax
    for (const key in initial) {
      // eslint-disable-next-line no-prototype-builtins
      if (initial.hasOwnProperty(key)) {
        blankState[key] = "";
      }
    }
    setInputs(blankState);
  }, [initial]);

  return {
    inputs,
    handleChange,
    resetForm,
    clearForm,
  };
}
