import type {Metadata} from 'next';
import './globals.css';
export const metadata:Metadata={title:'Auréa Hotels & Resorts | L’art de ralentir',description:'Une nouvelle vision de la Riviera. Découvrez Auréa et préparez votre séjour avec notre réservation de test.',icons:{icon:'/favicon.svg'}};
export default function Layout({children}:{children:React.ReactNode}){return <html lang="fr"><body>{children}</body></html>}
