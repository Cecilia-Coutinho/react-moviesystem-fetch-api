import { useState, useEffect } from "react";
import useFetch from "./useFetch"
import { useNavigate } from 'react-router-dom';
import styled, { css } from 'styled-components';
import {
  Title,
  StyledButton
} from './PeopleList';

const CustomTitle = styled(Title)`
  margin-bottom: 30px;
`;

const CreatePersonForm = styled.div`
  max-width: 400px;
  margin: 0 auto;
  text-align: center;

  input {
    width: 100%;
    padding: 6px 10px;
    outline: none;
    border: 1px solid var(--color-primary-3);
    box-sizing: border-box;
    display: block;
    font-size: 14px;
    margin: 10px 0px 20px 0px;
  }
`;

const LabelStyled = styled.label`
  text-align: left;
  display: block;
  font-weight: 600;
`;

const ErrMsgStyled = styled.p`
  margin: 30px;
  color: var(--color-secondary-3);
  font-weight: 600;
`;

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
    <CreatePersonForm>
      <CustomTitle>Create Person</CustomTitle>
      {createResult !== null && (
        <ErrMsgStyled>{createResult ? 'Person created successfully' : 'Failed to create person'}</ErrMsgStyled>
      )}
      {errorMessage && <ErrMsgStyled>{errorMessage}</ErrMsgStyled>}

      <form onSubmit={handleSubmit}>
        <LabelStyled> First Name: </LabelStyled>
        <input
          type="text"
          required
          value={firstName}
          onChange={(event) => setFirstName(event.target.value)}
        />

        <LabelStyled> Last Name: </LabelStyled>
        <input
          type="text"
          required
          value={lastName}
          onChange={(event) => setLastName(event.target.value)}
        />

        <LabelStyled> email: </LabelStyled>
        <input
          type="text"
          required
          value={email}
          onChange={(event) => setEmail(event.target.value)}
        />
        {!isPending && <StyledButton>Add Person</StyledButton>}
        {isPending && <StyledButton disabled>Adding Person...</StyledButton>}
      </form>
    </CreatePersonForm>
  );
};

export default CreatePerson;
