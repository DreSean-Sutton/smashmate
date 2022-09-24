import { useState } from 'react';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import axios from 'axios';

interface Profile {
  username: string,
  email: string,
  password: string
}
export default function CreateAccount(props: any) {

  const [validated, setValidated] = useState(false);

  async function handleUploadProfile(profile: Profile) {
    const url = 'http://localhost:5000/registration/add/account';
    try {
      const controller = new AbortController()
      const result = await axios.post(url, profile, {
        signal: controller.signal,
        validateStatus: () => true
      });
      if (result.status !== 200) throw new Error('Account creation failed!')
      return result.data;
    } catch (e: any) {
      return { error: e.message }
    }
  }

  function submitForm(event: any) {
    setValidated(false);
    event.preventDefault();
    const form: any = event.currentTarget;
    console.log(form.password.value)

    const password: any = form.password;
    const confirmPassword: any = form.confirmPassword;
    if(password && password.value !== confirmPassword.value) {
      confirmPassword.setCustomValidity('Passwords must be the same.')
    } else {
      confirmPassword.setCustomValidity('');
    }
    if (form.reportValidity() === false) {
      event.stopPropagation();
    } else {
      const profile: Profile = {
        username: form.username.value,
        email: form.email.value,
        password: form.password.value
      }
      handleUploadProfile(profile);
      form.reset();
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
