// A simple bird logo drawn as an SVG. Change the colors (fill) to restyle it.
export default function Logo({ className = "h-9 w-9" }: { className?: string }) {
  return (
    <svg viewBox="0 0 40 40" className={className} aria-label="SocialBirds logo">
      <rect width="40" height="40" rx="11" fill="#047857" />
      <polygon points="11,22 4,17 5,27" fill="#ffffff" />
      <ellipse cx="20" cy="22" rx="10" ry="8" fill="#ffffff" />
      <circle cx="27" cy="15" r="5" fill="#ffffff" />
      <polygon points="31,14 37,16 31,18" fill="#fbbf24" />
      <path d="M11 22c4-5 10-5 14 0-4 4-10 4-14 0z" fill="#10b981" />
      <circle cx="28.5" cy="14" r="1" fill="#0f172a" />
    </svg>
  );
}
