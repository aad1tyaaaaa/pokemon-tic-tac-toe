import Image from 'next/image';

export function MewIcon({ size = 40 }: { size?: number }) {
  return (
    <div className="relative flex items-center justify-center" style={{ width: size, height: size }}>
      <Image 
        src="/mew.png" 
        alt="Mew" 
        width={size} 
        height={size} 
        className="object-contain drop-shadow-md"
      />
    </div>
  );
}

export function BulbasaurIcon({ size = 40 }: { size?: number }) {
  return (
    <div className="relative flex items-center justify-center" style={{ width: size, height: size }}>
      <Image 
        src="/bulbasaur.png" 
        alt="Bulbasaur" 
        width={size} 
        height={size} 
        className="object-contain drop-shadow-md"
      />
    </div>
  );
}

export function TogepiSVG({ size = 40 }: { size?: number }) {
  return (
    <svg
      viewBox="0 0 40 40"
      width={size}
      height={size}
      className="drop-shadow-lg"
    >
      {/* Egg Shell Body */}
      <path
        d="M 20 10 C 12 10 10 18 10 26 C 10 34 16 38 20 38 C 24 38 30 34 30 26 C 30 18 28 10 20 10"
        fill="#FDF5E6"
        stroke="#000"
        strokeWidth="0.5"
      />
      {/* Red/Blue pattern on shell */}
      <circle cx="16" cy="22" r="3" fill="#FF4500" />
      <path d="M 24 30 L 28 30 L 26 26 Z" fill="#4169E1" />
      <rect x="15" y="30" width="4" height="4" fill="#4169E1" />
      
      {/* Head */}
      <path d="M 15 12 L 20 5 L 25 12 Z" fill="#FDF5E6" stroke="#000" strokeWidth="0.5" />
      
      {/* Eyes */}
      <circle cx="17.5" cy="16" r="1.5" fill="#000" />
      <circle cx="22.5" cy="16" r="1.5" fill="#000" />
      
      {/* Cheeks */}
      <circle cx="15.5" cy="18" r="1" fill="#FFB6C1" />
      <circle cx="24.5" cy="18" r="1" fill="#FFB6C1" />
    </svg>
  );
}

export function PikachuSVG({ size = 40 }: { size?: number }) {
  return (
    <svg
      viewBox="0 0 40 40"
      width={size}
      height={size}
      className="drop-shadow-lg"
    >
      {/* Body */}
      <circle cx="20" cy="24" r="12" fill="#FFDE00" />
      
      {/* Head */}
      <circle cx="20" cy="12" r="9" fill="#FFDE00" />
      
      {/* Ears */}
      <path d="M 12 8 L 8 0 L 14 6 Z" fill="#FFDE00" stroke="#000" strokeWidth="0.5" />
      <path d="M 28 8 L 32 0 L 26 6 Z" fill="#FFDE00" stroke="#000" strokeWidth="0.5" />
      <path d="M 8 0 L 9 2 L 10 1 Z" fill="#000" />
      <path d="M 32 0 L 31 2 L 30 1 Z" fill="#000" />
      
      {/* Eyes */}
      <circle cx="17" cy="11" r="1.5" fill="#000" />
      <circle cx="23" cy="11" r="1.5" fill="#000" />
      
      {/* Cheeks */}
      <circle cx="14" cy="14" r="2.5" fill="#FF0000" />
      <circle cx="26" cy="14" r="2.5" fill="#FF0000" />
      
      {/* Mouth */}
      <path d="M 18 14 Q 20 16 22 14" stroke="#000" strokeWidth="0.5" fill="none" />
      
      {/* Tail */}
      <path d="M 30 24 L 38 18 L 35 20 L 38 14 L 32 20 L 34 18 L 30 24" fill="#FFDE00" stroke="#000" strokeWidth="0.5" />
    </svg>
  );
}

export function CherubiSVG({ size = 30 }: { size?: number }) {
  return (
    <svg
      viewBox="0 0 40 40"
      width={size}
      height={size}
      className="drop-shadow-sm opacity-60"
    >
      {/* Main flower bulb body */}
      <circle cx="20" cy="24" r="10" fill="#FF69B4" />

      {/* Petals */}
      <ellipse cx="20" cy="8" rx="5" ry="8" fill="#FFC0CB" />
      <ellipse cx="32" cy="14" rx="6" ry="8" fill="#FFC0CB" transform="rotate(60 20 24)" />
      <ellipse cx="28" cy="32" rx="6" ry="8" fill="#FFC0CB" transform="rotate(120 20 24)" />
      <ellipse cx="12" cy="32" rx="6" ry="8" fill="#FFC0CB" transform="rotate(180 20 24)" />
      <ellipse cx="8" cy="14" rx="6" ry="8" fill="#FFC0CB" transform="rotate(240 20 24)" />

      {/* Leaf sprout */}
      <ellipse cx="10" cy="12" rx="2.5" ry="6" fill="#228B22" transform="rotate(-45 10 12)" />

      {/* Eyes - happy */}
      <circle cx="17" cy="22" r="1.5" fill="#000" />
      <circle cx="23" cy="22" r="1.5" fill="#000" />

      {/* Smile */}
      <path d="M 18 25 Q 20 26 22 25" stroke="#000" strokeWidth="0.6" fill="none" />
    </svg>
  );
}
