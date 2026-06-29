import LoginLeftPanel from "../../../components/auth/LoginLeftPanel";
import RegisterForm from "../../../components/auth/RegisterForm";

function RegisterPage() {
  return (
    <div className="min-h-screen bg-slate-100 p-6">

      <div className="mx-auto flex min-h-[92vh] max-w-7xl overflow-hidden rounded-3xl bg-white shadow-2xl">

        <LoginLeftPanel />

        <RegisterForm />

      </div>

    </div>
  );
}

export default RegisterPage;