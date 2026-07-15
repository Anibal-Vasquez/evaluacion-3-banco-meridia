export function createSession(user, extra = {}) {
  if (!user) return null;
  return {
    uid: user.uid,
    nombre: extra.nombre || user.displayName || user.email?.split('@')[0] || 'cliente',
    email: user.email || '',
    roles: extra.roles || ['cliente'],
  };
}
