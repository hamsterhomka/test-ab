import { Table } from 'react-bootstrap'
import { useMutation, useQuery, useQueryClient } from 'react-query'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTrashAlt } from '@fortawesome/free-solid-svg-icons'
import styles from '../styles/UsersTable.module.css'

const getUsers = () => fetch(`${ process.env.NEXT_PUBLIC_API_URL }/users`).then((res) => res.json())

const deleteUser = (id) => fetch(`${ process.env.NEXT_PUBLIC_API_URL }/users/${ id }`, {
  method: 'DELETE',
})

const UsersTable = () => {
  const queryClient = useQueryClient()
  const { data: users } = useQuery('users', getUsers)
  const deleteUserMutation = useMutation(deleteUser, {
    onSuccess: () => {
      queryClient.invalidateQueries('users')
    },
  })

  const onRemoveClick = (id) => {
    deleteUserMutation.mutate(id)
  }

  if (!users) {
    return null
  }

  return (
    <Table striped bordered hover>
      <thead>
      <tr>
        <th>#</th>
        <th>Registration date</th>
        <th colSpan={ 2 }>Last activity date</th>
      </tr>
      </thead>
      <tbody>
      { users.map((user) => (
        <tr key={ user.id }>
          <td>{ user.id }</td>
          <td>{ user.registrationDate }</td>
          <td>{ user.lastActivityDate }</td>
          <td className={ styles.removeTd }>
            <FontAwesomeIcon onClick={ () => onRemoveClick(user.id) } icon={ faTrashAlt } />
          </td>
        </tr>
      )) }
      </tbody>
    </Table>
  )
}

export default UsersTable
