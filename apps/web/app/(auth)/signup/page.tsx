import { RegisterForm } from "@/components/auth/register-form";
import { requireUnauth } from "@/lib/auth/auth-utils";

const Page = async () => {
  await requireUnauth();

  return <RegisterForm />;
};

export default Page;
