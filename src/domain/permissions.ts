export class Permissions {
  private permissions: Map<string, PermissionConfig> = new Map([
    ['admin', {
      roles: ['admin'],
      allows: [{
        resources: '/contents.*/*',
        permissions: ['*']
      }]
    }],
    ['student', {
      roles: ['student'],
      allows: [{
        resources: '/contents.*/*',
        permissions: ['GET']
      }]
    }],
  ]);

  get(role: string): PermissionConfig {
    return this.permissions.get(role) || this.permissions.get('student') as PermissionConfig;
  }
}

export type PermissionConfig = {
  roles: string[];
  allows: {
    resources: string;
    permissions: string[];
  }[];
};
