
import { Acl } from 'acl';

export class Permissions {
  protected acl;

  constructor(acl: Acl) {
    this.acl = acl;
    this.setPermissions([
      this.getConfigAdmin(),
      this.getConfigStudent(),
    ]);
    this.setUserInRole();
  }

  private setPermissions(aclConfig: ACLConfig[]): void {
    this.acl.allow([...aclConfig]);
  }

  private setUserInRole(): void {
    this.acl.addUserRoles('admin', 'admin');
    this.acl.addUserRoles('student', 'student');
  }

  private getConfigAdmin(): ACLConfig {
    return {
      roles: ['admin'],
      allows: [{
        resources: '/contents.*/*',
        permissions: ['*'],
      }],
    };
  }

  private getConfigStudent(): ACLConfig {
    return {
      roles: ['student'],
      allows: [{
        resources: '/contents.*/*',
        permissions: ['GET']
      }],
    };
  }

  protected hasAccessPermission(role: string, resource: string, method: string): Promise<boolean> {
    return new Promise<boolean>((resolve) => {
      this.acl.isAllowed(role, resource, method, (error, allowed) => {
        resolve(!error && allowed);
      });
    });
  }
}

type ACLConfig = {
  roles: string[];
  allows: {
    resources: string;
    permissions: string[];
  }[];
};
