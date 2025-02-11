import Link from 'next/link'

export const metadata = {
  title: 'Pirros | Take Home',
};

export default function App(): JSX.Element {
  return (
    <div className={'container'}>
      <h1 className={'title'}>
        Pirros <br />
      </h1>
      <div>
        <p className={'description'}>
          Welcome to Pirros!
        </p>
        <Link href="/tasks">tasks</Link>
      </div>
    </div>
  );
}