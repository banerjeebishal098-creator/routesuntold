import type { Metadata } from 'next';
import Script from 'next/script';
import './globals.css';
export const metadata: Metadata = {
 title: 'Routes Untold | Travel Planning & Booking Services',
 description: 'Personalised itineraries for ₹349, hotel and cab booking help for ₹1,999, and hotel and flight booking help for ₹1,499. Travel costs are separate.',
 openGraph: {title:'Routes Untold | Go Beyond the Usual',description:'Your trip, our planning and booking help. Itineraries ₹349, hotels and cabs ₹1,999, hotels and flights ₹1,499. Service fees only.',type:'website',locale:'en_IN',siteName:'Routes Untold'},
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
