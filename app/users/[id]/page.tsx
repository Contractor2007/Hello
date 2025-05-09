// app/users/[id]/page.tsx
import UserDetails from '@/components/UserDetails';

export default function Page({ params }: { params: { id: string } }) {
  return <UserDetails userId={params.id} />;
}
