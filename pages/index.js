import Head from 'next/head'
import styles from '../styles/Home.module.css'
import { Button, Container } from 'react-bootstrap'
import CreateUserForm from '../components/CreateUserForm'
import UsersTable from '../components/UsersTable'
import { useQuery } from 'react-query'

const getRollingRetention = () => fetch(`${ process.env.NEXT_PUBLIC_API_URL }/users/rollingRetention`).then((res) => res.json())

export default function Home() {
  const { data: rollingRetention, refetch: fetchRollingRetention, } = useQuery('rollingRetention', getRollingRetention, { enabled: false, })

  return (
    <div className={ styles.container }>
      <Head>
        <title>Test task AB test=)</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={ styles.main }>
        <Container className={ styles.container }>
          <h2 className="mb-4">Добавить пользователя</h2>
          <CreateUserForm />

          <Button className="mt-5" onClick={ fetchRollingRetention } variant="primary" type="button">Рассчитать</Button>
          { rollingRetention && (
            <div className={ styles.retentionText }>Rolling Retention 7 day: { rollingRetention.rollingRetention }</div>
          ) }

          <h2 className="mt-5">Пользователи</h2>
          <UsersTable />
        </Container>
      </main>
    </div>
  )
}
