import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAppDispatch } from '../../app/hook';
import { setUser } from '../../features/account/userSlice';
import Loading from '../Loading';
import { Row } from 'react-bootstrap';
import { Col } from 'react-bootstrap';
import { Form } from 'react-bootstrap';
import { Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import axios from 'axios';
import './signIn.css';

interface QueryResult {
  error?: string,
  token?: string,
  payload?: {
    id: string
    username: string,
    email: string,
  }
}

export default function SignIn () {
  const dispatch = useAppDispatch();

  const [validated, setValidated] = useState(false);
  const [isloading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const loadSpinner = isloading ? <Loading /> : '';
  const url = `/api/registration/account/sign-in`;
  const controller = new AbortController();
  const headers = {
    signal: controller.signal,
    validateStatus: () => true
  };

  async function handleFetchProfile(query: any) {
    try {
      const { status, data }: any = await axios.post(url, query, headers);
      if (status !== 200) throw data.error;
      return data;
    } catch (e) {
      return { error: e };
    }
  }

  async function handleDemo() {
    const myQuery = {
      email: 'demoaccount@gmail.com'
    }
    setIsLoading(true);
    const result: QueryResult = await handleFetchProfile(myQuery);
    dispatch(setUser(result));
    navigate('/');
    setIsLoading(false);
  }

  async function submitForm(event: any) {

    setValidated(false);
    event.preventDefault();
    const form = event.currentTarget;
    const { email, password } = form;
    email.setCustomValidity('');
    password.setCustomValidity('');
    const myQuery = {
      email: email.value
    }
    setIsLoading(true);
    const result: QueryResult = await handleFetchProfile(myQuery);
    setIsLoading(false);
    if(result.error) {
      if(result.error === 'Invalid email') {
        email.setCustomValidity(result.error);
      } else if(result.error === 'Invalid password') {
        password.setCustomValidity(result.error);
      } else {
        // Need to add a page for 500 responses
      }
    }
    if (!form.reportValidity()) {
      event.stopPropagation();
    } else {
      dispatch(setUser(result));
      navigate('/');
      form.reset();
    }
    setValidated(true);
  }

  return (
    <>
      { loadSpinner }
      <Form data-testid='sign-in-form' id='sign-in-form' noValidate validated={validated} onSubmit={submitForm}>
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

        <Row className='justify-content-between align-items-center'>
          <Col>
            <Link className='link-primary' to={'/registration/create-account'}>Create Account</Link>
          </Col>
          <Col className='text-end'>
            <Button id='submit' variant='primary' type='submit'>
              Sign In
            </Button>
          </Col>
        </Row>
        <Row className='sign-in-divider justify-content-center mt-4 pt-3 ms-3 me-3'>
          <Col xs={10} className='text-center guest-column'>
            <p>
              <a onClick={handleDemo} className='text-primary demo-account'>Demo</a>
            </p>
          </Col>
          <Col xs={10} className='text-center'>
            <p>
              Or continue as <Link to={'/'} className='link-primary guest-button'>Guest</Link>
            </p>
          </Col>
        </Row>
      </Form>
    </>
  )
}
