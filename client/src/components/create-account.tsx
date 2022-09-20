import { useState } from 'react';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';

export default function CreateAccount(props: any) {

  const [validated, setValidated] = useState(false);

  function submitForm(event: any) {
    const password: any = document.querySelector('#password');
    const confirmPassword: any = document.querySelector('#confirmPassword');
    if(password && password.value !== confirmPassword.value) {
      confirmPassword.setCustomValidity('Password confirmation must be the same as password.')
    } else {
      confirmPassword.setCustomValidity('');
    }
    const form = event.currentTarget;
    if (form.reportValidity() === false) {
      event.preventDefault();
      event.stopPropagation();
    }

    setValidated(true);
  }

  return (
    <Form noValidate validated={validated} onSubmit={submitForm}>
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

      <div className='text-end'>
        <Button id='submit' variant='primary' type='submit'>
          Create
        </Button>
      </div>
    </Form>
  )
}
