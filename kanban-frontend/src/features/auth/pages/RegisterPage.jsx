import LoginLeftPanel from "../../../components/auth/LoginLeftPanel";
import RegisterForm from "../../../components/auth/RegisterForm";

function RegisterPage() {
  return (
    <div className="min-h-screen bg-slate-100 p-6 flex items-center justify-center">
      <div className="mx-auto flex min-h-[92vh] w-full max-w-7xl rounded-3xl bg-white shadow-2xl overflow-hidden">
        <LoginLeftPanel />
        <RegisterForm />
      </div>
    </div>
  );
}

export default RegisterPage;