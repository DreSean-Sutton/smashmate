import { useState } from 'react';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';

export default function CreateAccount(props: any) {

  const [validated, setValidated] = useState(false);

  function submitForm(event: any) {
    console.log(event.currentTarget);
    const form = event.currentTarget;
    if (form.checkValidity() === false) {
      event.preventDefault();
      event.stopPropagation();
    }

    setValidated(true);
  }

  return (
    <Form noValidate validated={validated} onSubmit={submitForm}>
      <Form.Group className='mb-3' controlId='formRegistrationUsername'>
        <Form.Label>Username</Form.Label>
        <Form.Control required type='text' placeholder='Username' />
        {/* <Form.Control.Feedback>Looks good!</Form.Control.Feedback> */}
        <Form.Control.Feedback type="invalid">
          Please choose a username.
        </Form.Control.Feedback>
      </Form.Group>

      <Form.Group className='mb-3' controlId='formRegistrationEmail'>
        <Form.Label>Email</Form.Label>
        <Form.Control required type='email' placeholder='Email' />
        <Form.Control.Feedback type="invalid">
          Please choose a valid email.
        </Form.Control.Feedback>
      </Form.Group>

      <Form.Group className='mb-3' controlId='formRegistrationPassword'>
        <Form.Label>Password</Form.Label>
        <Form.Control required type='password' placeholder='Password' />
        <Form.Text className='text-muted'>
          Must be 8-20 characters.
        </Form.Text>
      </Form.Group>

      <Form.Group className='mb-3'>
        <Form.Label>Re-type Password</Form.Label>
        <Form.Control required type='password' placeholder='Password' />
      </Form.Group>

      <div className='text-end'>
        <Button variant='primary' type='submit'>
          Create
        </Button>
      </div>
    </Form>
  )
}
