import { PermissionConfig, Permissions } from '@/domain/permissions';

import { Acl } from 'acl';

export class Acls extends Permissions {
  protected acl;

  constructor(acl: Acl) {
    super();
    this.acl = acl;
    this.setPermissions([
      super.get('admin'),
      super.get('student'),
    ]);
    this.setUserInRole();
  }

  private setPermissions(permissionsConfig: PermissionConfig[]): void {
    this.acl.allow([...permissionsConfig]);
  }

  private setUserInRole(): void {
    this.acl.addUserRoles('admin', 'admin');
    this.acl.addUserRoles('student', 'student');
  }

  protected hasAccessPermission(role: string, resource: string, method: string): Promise<boolean> {
    return new Promise<boolean>((resolve) => {
      this.acl.isAllowed(role, resource, method, (error, allowed) => {
        resolve(!error && allowed);
      });
    });
  }
}