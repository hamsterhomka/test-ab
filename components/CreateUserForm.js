import { Button, Col, Form, Row } from 'react-bootstrap'
import { useMutation, useQueryClient } from 'react-query'
import { useForm } from 'react-hook-form'

const postUser = (user) => fetch(`${ process.env.NEXT_PUBLIC_API_URL }/users`, {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
  },
  body: JSON.stringify(user)
}).then((res) => res.json())

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
          <Form.Control
            type="text" name="registrationDate" placeholder="yyyy-mm-dd" ref={ register({ required: true }) }
          />
        </Col>
      </Form.Group>
      <Form.Group as={ Row }>
        <Form.Label column sm="2">
          Last activity date
        </Form.Label>
        <Col sm="10">
          <Form.Control
            type="text" name="lastActivityDate" placeholder="yyyy-mm-dd" ref={ register({ required: true }) }
          />
        </Col>
      </Form.Group>
      { errors.exampleRequired && <span>This field is required</span> }
      <Button variant="primary" type="submit">
        Добавить
      </Button>
    </Form>
  )
}

export default CreateUserForm
