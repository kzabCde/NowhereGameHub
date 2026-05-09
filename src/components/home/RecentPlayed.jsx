import Link from 'next/link';
export default function RecentPlayed({recent}){return <section><h3 className='font-semibold mb-2'>Recent Played</h3>{recent.length? <ul className='space-y-1'>{recent.map(g=><li key={g.id}><Link href={g.route} className='underline'>{g.title}</Link></li>)}</ul>:<p className='opacity-70'>No recent games yet.</p>}</section>}
