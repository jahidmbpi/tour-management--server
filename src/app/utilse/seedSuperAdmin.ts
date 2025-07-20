import { IAuthProvider, IUser, Role } from "../../user/user.interface";
import { User } from "../../user/user.model";
import { envVars } from "../config/env";
import bcryptjs from "bcryptjs";

export const seedSuperAdmin = async () => {
  try {
    const isSuperAdminExist = await User.findOne({
      email: envVars.SUPER_ADMIN_EMAIL,
    });

    if (isSuperAdminExist) {
      console.log("Super admin already exists.");
      return;
    }

    const hashedPassword = await bcryptjs.hash(
      envVars.SUPER_ADMIN_PASSWORD,
      10
    );
    const authProvider: IAuthProvider = {
      provider: "credential",
      providerID: envVars.SUPER_ADMIN_EMAIL,
    };
    const payload: IUser = {
      name: "Super Admin",
      role: Role.SUPER_ADMIN,
      email: envVars.SUPER_ADMIN_EMAIL,
      password: hashedPassword,
      auths: [authProvider],
      isVerified: true,
    };

    const superAdmin = await User.create(payload);

    console.log("✅ Super admin seeded:", superAdmin.email);
  } catch (error) {
    console.error("❌ Error seeding super admin:", error);
  }
};
