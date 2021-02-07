import { Button, Col, Form, Row } from 'react-bootstrap'
import { useMutation, useQueryClient } from 'react-query'
import { useForm } from 'react-hook-form'
import InputMask from 'react-input-mask'

const parseYear = (year) => {
  const splitYear = year.split('.')
  return `${ splitYear[2] }-${ splitYear[1] }-${ splitYear[0] }`
}

const postUser = (user) => {
  const userObj = {
    registrationDate: parseYear(user.registrationDate),
    lastActivityDate: parseYear(user.lastActivityDate),
  }

  return fetch(`${ process.env.NEXT_PUBLIC_API_URL }/users`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(userObj)
  }).then((res) => res.json())
}

const CreateUserForm = () => {
  const queryClient = useQueryClient()

  const createUserMutation = useMutation(postUser, {
    onSuccess: () => {
      queryClient.invalidateQueries('users')
    },
  })

  const { register, handleSubmit, watch, errors } = useForm()


  const onSubmit = (user) => {
    createUserMutation.mutate(user)
  }

  const onDeleteClick = (id) => {
    deleteUserMutation.mutate(id)
  }

  return (
    <Form onSubmit={ handleSubmit(onSubmit) }>
      <Form.Group as={ Row }>
        <Form.Label column sm="2">
          Registration date
        </Form.Label>
        <Col sm="10">
          <InputMask mask="99.99.9999">
            { (inputProps) => (
              <Form.Control
                type="text" name="registrationDate" placeholder="dd.mm.yyyy" ref={ register({ required: true }) }
              />
            ) }
          </InputMask>
        </Col>
      </Form.Group>
      <Form.Group as={ Row }>
        <Form.Label column sm="2">
          Last activity date
        </Form.Label>
        <Col sm="10">
          <InputMask mask="99.99.9999">
            { (inputProps) => (
              <Form.Control
                type="text" name="lastActivityDate" placeholder="dd.mm.yyyy" ref={ register({ required: true }) }
              />
            ) }
          </InputMask>
        </Col>
      </Form.Group>
      { errors.exampleRequired && <span>This field is required</span> }
      <Button variant="primary" type="submit">
        Save
      </Button>
    </Form>
  )
}

export default CreateUserForm
