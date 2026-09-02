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
          background: '#060D18',
          backgroundImage: 'radial-gradient(circle at 50% 30%, rgba(98,126,234,0.25), transparent 60%)',
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', fontSize: 84, fontWeight: 700, fontFamily: 'sans-serif' }}>
          <span style={{ color: '#E8ECF1' }}>Flow</span>
          <span style={{ color: '#627EEA' }}>Dex</span>
          <span style={{ color: '#E8ECF1', marginLeft: 18 }}>Protocol</span>
        </div>
        <div style={{ marginTop: 24, fontSize: 32, color: '#8899AA', fontFamily: 'sans-serif' }}>
          Trade Everything. Know Everything.
        </div>
      </div>
    ),
    { ...size }
  );
}
