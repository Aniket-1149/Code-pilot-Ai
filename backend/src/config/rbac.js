const roles = {
  admin: ['*'],
  user: [
    'project:read',
    'project:write',
    'file:read',
    'file:write',
    'ai:invoke',
    'agent:invoke',
    'debug:invoke'
  ]
};

function hasPermission(role, permission) {
  if (!role) return false;
  if (roles[role]?.includes('*')) return true;
  return roles[role]?.includes(permission) || false;
}

module.exports = { roles, hasPermission };
