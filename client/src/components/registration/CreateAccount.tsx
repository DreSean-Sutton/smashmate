import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { selectFavorites } from '../../features/favorites/favoritingSlice';
import { useAppSelector } from '../../app/hook';
import Loading from '../Loading';
import { Row } from 'react-bootstrap';
import { Col } from 'react-bootstrap';
import { Form } from 'react-bootstrap';
import { Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import axios from 'axios';

interface Profile {
  username: string,
  email: string,
  password: string,
  favorites: any
}
export default function CreateAccount() {

  const [validated, setValidated] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const favorites: any = useAppSelector(selectFavorites)

  const loadSpinner = isLoading ? <Loading /> : '';

  const controller = new AbortController()
  const headers = {
    signal: controller.signal,
    validateStatus: () => true
  }

  async function handleUploadProfile(profile: Profile) {
    const url = '/api/registration/account/add';
    try {
      const { status, data } = await axios.post(url, profile, headers);
      if(data.username) return data;
      if(data.email) return data;
      if (status !== 201) throw new Error('Account creation failed!')
      return data;
    } catch (e: any) {
      return { error: e.message }
    }
  }

  async function submitForm(event: any) {
    setValidated(false);
    event.preventDefault();
    const form: any = event.currentTarget;
    const { username, email, password, confirmPassword } = form;
    username.setCustomValidity('');
    email.setCustomValidity('');
    if(password && password.value !== confirmPassword.value) {
      confirmPassword.setCustomValidity('Passwords must be the same.')
    } else {
      confirmPassword.setCustomValidity('');
    }
    if(!form.reportValidity()) {
      event.stopPropagation();
    } else {
      console.error({favorites})
      const profile: Profile = {
        username: username.value,
        email: email.value,
        password: password.value,
        favorites: favorites
      }
      setIsLoading(true);
      const result = await handleUploadProfile(profile);
      setIsLoading(false);
      if(result.username) {
        username.setCustomValidity('Username must be unique');
      } else if(result.email) {
        email.setCustomValidity('This email has already been registered');
      } else if(result.error) {
        // Need to add a page for 500 responses
      }
      if(!form.reportValidity()) {
        event.stopPropagation();
      } else {
        navigate('/registration/sign-in');
        form.reset();
      }
    }
    setValidated(true);
  }

  return (
    <>
      { loadSpinner }
      <Form id='create-account-form' noValidate validated={validated} onSubmit={submitForm}>
        <Form.Group className='mb-3' controlId='username'>
          <Form.Label>Username</Form.Label>
          <Form.Control type='text' placeholder='Username' required />
          <Form.Control.Feedback type="invalid">
            Please choose a username.
          </Form.Control.Feedback>
        </Form.Group>

        <Form.Group className='mb-3' controlId='email'>
          <Form.Label>Email</Form.Label>
          <Form.Control type='email' placeholder='Email' required />
          <Form.Control.Feedback type="invalid">
            Please choose a valid email.
          </Form.Control.Feedback>
        </Form.Group>

        <Form.Group className='mb-3' controlId='password'>
          <Form.Label>Password</Form.Label>
          <Form.Control minLength={8} maxLength={20} type='password' placeholder='Password' required />
          <Form.Text className='text-muted'>
            Must be 8-20 characters.
          </Form.Text>
        </Form.Group>

        <Form.Group className='mb-3' controlId='confirmPassword'>
          <Form.Label>Confirm Password</Form.Label>
          <Form.Control type='password' placeholder='Password' required />
        </Form.Group>

        <Row className='justify-content-between align-items-center'>
          <Col>
            <Link className='link-primary' to={'/registration/sign-in'}>Sign In</Link>
          </Col>
          <Col className='text-end'>
            <Button id='submit' variant='primary' type='submit'>
              Create
            </Button>
          </Col>
        </Row>
      </Form>
    </>
  )
}
