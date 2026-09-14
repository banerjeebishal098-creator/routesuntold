import type { Metadata } from 'next';
import Script from 'next/script';
import './globals.css';
export const metadata: Metadata = {
 title: 'Routes Untold | Personalised Holidays & Travel Experiences',
 description: 'Discover personalised holidays, hidden destinations and unforgettable travel experiences with Routes Untold. Tell us where you want to go and we’ll design the journey.',
 openGraph: {title:'Routes Untold | Go Beyond the Usual',description:'Your dates. Your budget. Your kind of journey. Discover personalised holidays with Routes Untold.',type:'website',locale:'en_IN',siteName:'Routes Untold'},
 robots:{index:true,follow:true},
 icons:{icon:'/favicon.svg',shortcut:'/favicon.svg'}
};
export default function RootLayout({children}:{children:React.ReactNode}) {
 return (
  <html lang="en">
   <body>
    {children}
    <Script id="google-analytics-init" strategy="afterInteractive">
     {`
      window.dataLayer = window.dataLayer || [];
      function gtag(){dataLayer.push(arguments);}
      gtag('js', new Date());
      gtag('config', 'G-MMJEPBCT83');
     `}
    </Script>
    <Script
     id="google-analytics-loader"
     src="https://www.googletagmanager.com/gtag/js?id=G-MMJEPBCT83"
     strategy="afterInteractive"
    />
   </body>
  </html>
 );
}
