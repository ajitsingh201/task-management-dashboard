import { avatarBg, avatarFg } from '../../utils/helpers';

const Avatar = ({ userId, size = 32 }) => (
  <div
    style={{
      width: size,
      height: size,
      borderRadius: '50%',
      background: avatarBg(userId),
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      fontSize: size * 0.38,
      fontWeight: 700,
      color: avatarFg(userId),
      flexShrink: 0,
      userSelect: 'none',
    }}
    aria-label={`User ${userId} avatar`}
  >
    {userId}
  </div>
);

export default Avatar;
