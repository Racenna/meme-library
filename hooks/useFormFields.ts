import { useState, useCallback } from "react";

export const useFormFields = <T extends object>(initialValues: T) => {
  const [fields, setFields] = useState<T>(initialValues);

  const handleChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFields((prev) => ({ ...prev, [name]: value }));
  }, []);

  const setForm = (newValues: T) => setFields(newValues);

  const resetForm = () => setFields(initialValues);

  return { fields, handleChange, setForm, resetForm };
};
