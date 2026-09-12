import type { Metadata } from 'next';
import './globals.css';
export const metadata: Metadata = {
 title: 'Routes Untold | Personalised Holidays & Travel Experiences',
 description: 'Discover personalised holidays, hidden destinations and unforgettable travel experiences with Routes Untold. Tell us where you want to go and we’ll design the journey.',
 openGraph: {title:'Routes Untold | Go Beyond the Usual',description:'Your dates. Your budget. Your kind of journey. Discover personalised holidays with Routes Untold.',type:'website',locale:'en_IN',siteName:'Routes Untold'},
 robots:{index:false,follow:false},
 icons:{icon:'/favicon.svg',shortcut:'/favicon.svg'}
};
export default function RootLayout({children}:{children:React.ReactNode}){return <html lang="en"><body>{children}</body></html>}
