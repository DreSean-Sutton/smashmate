import { useState } from 'react';
import Row from 'react-bootstrap/esm/Row';
import Col from 'react-bootstrap/esm/Col';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import { Link } from 'react-router-dom';
import axios from 'axios';

export default function SignIn (props: any) {

  const [validated, setValidated] = useState(false);

  function submitForm(event: any) {
    event.preventDefault()
    const form = event.currentTarget;
    form.reset()
  }
  return (
    <Form noValidate validated={validated} onSubmit={submitForm}>
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
    </Form>
  )
}
