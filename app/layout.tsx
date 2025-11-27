import './globals.css';
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: {
    default: "AlgoVista — Interactive Algorithm Visualizer",
    template: "%s | AlgoVista"
  },
  description: "Visualize 30+ algorithms including sorting (Quick Sort, Merge Sort, Bubble Sort), pathfinding (Dijkstra, A*, BFS, DFS), and string matching (KMP, Rabin-Karp, Boyer-Moore) with real-time step-by-step animations.",
  keywords: ["algorithm visualizer", "sorting algorithms", "pathfinding algorithms", "string matching", "KMP algorithm", "Dijkstra", "A*", "BFS", "DFS", "Quick Sort", "Merge Sort", "Bubble Sort", "algorithm visualization", "data structures", "computer science"],
  authors: [{ name: "VoxHash Technologies" }],
  creator: "VoxHash Technologies",
  publisher: "VoxHash Technologies",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  metadataBase: new URL('https://algovista.voxhash.dev'),
  alternates: {
    canonical: '/',
  },
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://algovista.voxhash.dev',
    title: 'AlgoVista — Interactive Algorithm Visualizer',
    description: 'Visualize 30+ algorithms with real-time step-by-step animations. Explore sorting, pathfinding, and string matching algorithms interactively.',
    siteName: 'AlgoVista',
    images: [
      {
        url: '/og-image.png',
        width: 1200,
        height: 630,
        alt: 'AlgoVista Algorithm Visualizer',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'AlgoVista — Interactive Algorithm Visualizer',
    description: 'Visualize 30+ algorithms with real-time step-by-step animations.',
    creator: '@VoxHash',
    images: ['/og-image.png'],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  verification: {
    google: process.env.GOOGLE_VERIFICATION_CODE || undefined,
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "WebApplication",
              "name": "AlgoVista",
              "description": "Interactive algorithm visualizer with 30+ algorithms including sorting, pathfinding, and string matching algorithms",
              "url": "https://algovista.voxhash.dev",
              "applicationCategory": "EducationalApplication",
              "operatingSystem": "Web",
              "offers": {
                "@type": "Offer",
                "price": "0",
                "priceCurrency": "USD"
              },
              "author": {
                "@type": "Organization",
                "name": "VoxHash Technologies",
                "url": "https://voxhash.dev"
              },
              "aggregateRating": {
                "@type": "AggregateRating",
                "ratingValue": "5",
                "ratingCount": "1"
              },
              "featureList": [
                "30+ Algorithm Visualizations",
                "Sorting Algorithms (Quick Sort, Merge Sort, Bubble Sort, etc.)",
                "Pathfinding Algorithms (Dijkstra, A*, BFS, DFS, etc.)",
                "String Matching Algorithms (KMP, Rabin-Karp, Boyer-Moore, etc.)",
                "Real-time Step-by-step Animations",
                "Interactive Controls",
                "Performance Complexity Information"
              ]
            })
          }}
        />
      </head>
      <body>
        {children}
      </body>
    </html>
  );
}

