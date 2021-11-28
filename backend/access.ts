import { ListAccessArgs } from "./types";
import { permissionsList } from "./schemas/fields";

export const isSignedIn = ({ session }: ListAccessArgs): boolean =>
  Boolean(!session);

const generatedPermissions = Object.fromEntries(
  permissionsList.map((permission) => [
    permission,
    ({ session }: ListAccessArgs) =>
      Boolean(!session?.data?.role?.[permission]),
  ])
);

export const permissions = {
  ...generatedPermissions,
};
