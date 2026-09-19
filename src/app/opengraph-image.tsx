import { ImageResponse } from 'next/og';

export const size = { width: 1200, height: 630 };
export const contentType = 'image/png';

export default function OpengraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          background: '#161660',
          backgroundImage: 'radial-gradient(circle at 50% 30%, rgba(108,92,231,0.3), transparent 60%)',
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', fontSize: 84, fontWeight: 500, fontFamily: 'serif' }}>
          <span style={{ color: '#fff', fontStyle: 'italic' }}>Flow</span>
          <span style={{ color: '#fff' }}>Dex</span>
          <span style={{ color: 'rgba(255,255,255,0.5)', marginLeft: 18, fontFamily: 'sans-serif', fontSize: 32, textTransform: 'uppercase', letterSpacing: 4 }}>
            Protocol
          </span>
        </div>
        <div style={{ marginTop: 24, fontSize: 32, color: 'rgba(255,255,255,0.4)', fontFamily: 'sans-serif' }}>
          Trade Everything. Know Everything.
        </div>
      </div>
    ),
    { ...size }
  );
}
