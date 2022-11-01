import { useState } from 'react';

export default function useForm(defaults) {
  const [values, setValues] = useState(defaults);
  function updateValue(e) {
    let { value } = e.target;
    if (e.target.type === 'number') {
      value = parseInt(e.target.value);
    }
    setValues({
      // copy the existing values into it
      ...values,
      // update new value that changes
      [e.target.name]: e.target.value,
    });
  }
  return { values, updateValue };
}
