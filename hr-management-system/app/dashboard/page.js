import { useSession, getSession } from 'next-auth/client';

export default function Dashboard() {
  const [session, loading] = useSession();

  if (loading) return <p>Loading...</p>;
  if (!session) return <p>You are not authenticated!</p>;

  return <p>Welcome {session.user.name}</p>;
}

export async function getServerSideProps(context) {
  const session = await getSession(context);
  if (!session) {
    return {
      redirect: {
        destination: '/login',
        permanent: false,
      },
    };
  }
  return {
    props: { session },
  };
}
