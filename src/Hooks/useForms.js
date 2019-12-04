import { useState } from 'react';
import Axios from 'axios';
import { API_BASE_SCANR } from '../config/config';

const useForm = (apiName, defaultInputs = {}) => {
  const [inputs, setInputs] = useState(defaultInputs);
  const [sent, setSent] = useState(false);
  const [isSending, setIsSending] = useState(false);
  const [error, setError] = useState(false);


  const handleSubmit = (event) => {
    event.preventDefault();
    setIsSending(true);
    Axios.post(`${API_BASE_SCANR}/${apiName}`, inputs)
      .then((response) => {
        // eslint-disable-next-line
        console.log(response);
        setSent(true);
        setIsSending(false);
      }).catch(() => setError(true));
    setIsSending(false);
    setInputs(defaultInputs);
  };

  const handleInputChange = (event) => {
    event.persist();
    setInputs(() => ({ ...inputs, [event.target.name]: event.target.value }));
  };

  return {
    handleSubmit,
    handleInputChange,
    inputs,
    sent,
    isSending,
    error,
  };
};
export default useForm;
