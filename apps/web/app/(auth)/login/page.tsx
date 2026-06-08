import { LoginForm } from "@/components/auth/login-form";
import { requireUnauth } from "@/lib/auth/auth-utils";

const Page = async () => {
  await requireUnauth();

  return (
    <div className="flex w-full max-w-sm flex-col gap-6">
      <LoginForm />
    </div>
  );
};

export default Page;