import { useState, useEffect } from "react";
import useFetch from "./useFetch"
import { useNavigate } from 'react-router-dom';

const CreatePerson = () => {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [isEmailValid, setIsEmailValid] = useState(false);
  const [isPending, setIsPending] = useState(false);
  const [createResult, setCreateResult] = useState(null);
  const [errorMessage, setErrorMessage] = useState('');
  const { createNewPerson } = useFetch('https://localhost:7294/api/person');
  const navigateTo = useNavigate();

  const validateEmail = (mail) => {
    if (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(mail)) {
      return true;
    } else {
      return false;
    }
  }

  const handleSubmit = (event) => {
    event.preventDefault();

    const isValid = validateEmail(email);
    setIsEmailValid(isValid);
    setErrorMessage('You are writing an invalid email address!');

    setIsPending(true);
    if (isValid) {
      const newPerson = { firstName, lastName, email };

      createNewPerson(newPerson)
        .then((response) => {
            setIsPending(false);
            setCreateResult(true);
            navigateTo('/');
          })
    }
  };

  return (
    <div>
      <h2>Create Person</h2>
      {createResult !== null && (
        <p>{createResult ? 'Person created successfully' : 'Failed to create person'}</p>
      )}
      {errorMessage && <p>{errorMessage}</p>}

      <form onSubmit={handleSubmit}>
        <label> First Name: </label>
        <input
          type="text"
          required
          value={firstName}
          onChange={(event) => setFirstName(event.target.value)}
        />

        <label> Last Name: </label>
        <input
          type="text"
          required
          value={lastName}
          onChange={(event) => setLastName(event.target.value)}
        />

        <label> email: </label>
        <input
          type="text"
          required
          value={email}
          onChange={(event) => setEmail(event.target.value)}
        />
        {!isPending && <button>Add Person</button>}
        {isPending && <button disabled>Adding Person...</button>}
      </form>
    </div>
  );
};

export default CreatePerson;
