export default function NotFound() {
  return (
    <html lang="en">
      <body>
        <div style={{ 
          display: 'flex', 
          justifyContent: 'center', 
          alignItems: 'center', 
          height: '100vh',
          fontFamily: 'system-ui, sans-serif'
        }}>
          <div style={{ textAlign: 'center' }}>
            <h1 style={{ fontSize: '2rem', marginBottom: '1rem' }}>404</h1>
            <p>Page not found</p>
          </div>
        </div>
      </body>
    </html>
  );
}

