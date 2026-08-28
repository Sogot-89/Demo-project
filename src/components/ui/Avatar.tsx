interface AvatarProps {
  name: string;
  src?: string;
  size?: 'sm' | 'lg';
  className?: string;
}

const SIZES: Record<NonNullable<AvatarProps['size']>, string> = {
  sm: 'h-9 w-9 text-sm',
  lg: 'h-24 w-24 text-2xl',
};

export const Avatar = ({ name, src, size = 'sm', className = '' }: AvatarProps) => {
  const base = `flex shrink-0 items-center justify-center overflow-hidden rounded-full bg-indigo-100 font-semibold text-indigo-700 ${SIZES[size]} ${className}`;

  if (src) {
    return (
      <img
        src={src}
        alt={`${name} avatar`}
        data-testid="avatar-image"
        className={`${base} object-cover`}
      />
    );
  }

  return (
    <span data-testid="avatar-fallback" className={base} aria-label={`${name} avatar`}>
      {(name || 'G').charAt(0).toUpperCase()}
    </span>
  );
};
