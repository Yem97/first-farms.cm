export default function FirstFarmsStudioLogo() {
  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: '8px', padding: '2px 0' }}>
      <div style={{
        background: '#1B5E20',
        borderRadius: '8px',
        width: '30px',
        height: '30px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        flexShrink: 0,
      }}>
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
          <path d="M7 20h10" />
          <path d="M10 20c5.5-2.5.8-6.4 3-10" />
          <path d="M9.5 9.4c1.1.8 1.8 2.2 2.3 3.7-2 .4-3.5.4-4.8-.3-1.2-.6-2.3-1.9-3-4.2 2.8-.5 4.4 0 5.5.8z" />
          <path d="M14.1 6a7 7 0 0 0-1.1 4c1.9-.1 3.3-.6 4.3-1.4 1-1 1.6-2.3 1.7-4.6-2.7.1-4 1-4.9 2z" />
        </svg>
      </div>
      <div style={{ lineHeight: 1.1 }}>
        <span style={{ fontFamily: 'sans-serif', fontWeight: 700, color: '#1B5E20', fontSize: '13px', display: 'block' }}>
          Firstfarms Cameroon
        </span>
        <span style={{ fontFamily: 'sans-serif', fontWeight: 500, color: '#F9A825', fontSize: '10px', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
          Admin Studio
        </span>
      </div>
    </div>
  )
}
