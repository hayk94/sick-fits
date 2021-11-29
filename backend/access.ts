import { ListAccessArgs } from "./types";
import { permissionsList } from "./schemas/fields";

// Permission functions are simple functions that return true or false

export const isSignedIn = ({ session }: ListAccessArgs): boolean =>
  Boolean(session);

const generatedPermissions = Object.fromEntries(
  permissionsList.map((permission) => [
    permission,
    ({ session }: ListAccessArgs) => Boolean(session?.data?.role?.[permission]),
  ])
);

export const permissions = {
  ...generatedPermissions,
};

// Rule based functions
// Rules can return a boolean or a filter which limits which items the user can CRUD
export const rules = {
  canManageProducts({ session }: ListAccessArgs) {
    if (!isSignedIn({ session })) {
      return false;
    }
    // Do they have permission
    if (permissions.canManageProducts({ session })) {
      return true;
    }

    //  If not, do they own this item
    return { user: { id: session.itemId } };
  },
  canReadProducts({ session }: ListAccessArgs) {
    if (!isSignedIn({ session })) {
      return false;
    }
    return (
      permissions.canManageProducts({ session }) || { status: "AVAILABLE" }
    );
  },
  canOrder({ session }: ListAccessArgs) {
    if (!isSignedIn({ session })) {
      return false;
    }
    return (
      permissions.canManageCart({ session }) || { user: { id: session.itemId } }
    );
  },
  canManageOrderItems({ session }: ListAccessArgs) {
    if (!isSignedIn({ session })) {
      return false;
    }
    return (
      permissions.canManageCart({ session }) || {
        order: { user: { id: session.itemId } },
      }
    );
  },
  canManageUsers({ session }: ListAccessArgs) {
    if (!isSignedIn({ session })) {
      return false;
    }
    return (
      permissions.canManageUsers({ session }) || {
        id: session.itemId,
      }
    );
  },
};
