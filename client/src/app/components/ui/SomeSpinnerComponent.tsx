// app/components/ui/SomeSpinnerComponent.tsx
'use client';

const SomeSpinnerComponent = () => {
  return (
    <div style={{
      display: 'flex',
      flexDirection: 'column', // To stack spinner and text
      justifyContent: 'center',
      alignItems: 'center',
      height: '100vh',
      width: '100vw',
      position: 'fixed',
      top: 0,
      left: 0,
      backgroundColor: 'var(--background, #1a1a1a)', // Use your app's background color
      zIndex: 9999,
      color: 'var(--main-heading-white, #ffffff)', // Use your app's text color
    }}>
      <div style={{
        border: '6px solid #f3f3f3', // Light grey
        borderTop: '6px solid #3498db', // Blue - or your brand color
        borderRadius: '50%',
        width: '50px',
        height: '50px',
        animation: 'spin 1s linear infinite'
      }}></div>
      <p style={{ marginTop: '20px', fontSize: '1rem' }}>Loading Remityn...</p>
      <style jsx global>{`
        @keyframes spin {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }
        body:has(div[style*="animation: spin 1s linear infinite"]) {
          overflow: hidden; // Prevent scrolling when spinner is visible
        }
      `}</style>
    </div>
  );
};

export default SomeSpinnerComponent;