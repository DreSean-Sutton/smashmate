import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
export default function CreateAccount(props: any) {
  return (
    <Form>
      <Form.Group className='mb-3' controlId='formRegistrationUsername'>
        <Form.Label>Username</Form.Label>
        <Form.Control type='text' placeholder='Username' />
      </Form.Group>

      <Form.Group className='mb-3' controlId='formRegistrationEmail'>
        <Form.Label>Email</Form.Label>
        <Form.Control type='email' placeholder='Email' />
      </Form.Group>

      <Form.Group className='mb-3' controlId='formRegistrationPassword'>
        <Form.Label>Password</Form.Label>
        <Form.Control type='password' placeholder='Password' />
        <Form.Text className='text-muted'>
          Must be 8-20 characters.
        </Form.Text>
      </Form.Group>

      <Form.Group className='mb-3'>
        <Form.Label>Re-type Password</Form.Label>
        <Form.Control type='password' placeholder='Password' />
      </Form.Group>

      <div className='text-end'>
        <Button variant='primary' type='submit'>
          Create
        </Button>
      </div>
    </Form>
  )
}
