import LoginLeftPanel from "../../../components/auth/LoginLeftPanel";
import LoginForm from "../../../components/auth/LoginForm";

function LoginPage() {
  return (
    <div className="min-h-screen bg-slate-100 p-2"
    style={{ zoom: "95%" }}
    >
      <div className="mx-auto flex min-h-[92vh] max-w-7xl overflow-hidden rounded-3xl bg-white shadow-2xl">

        <LoginLeftPanel />

        <LoginForm />

      </div>
    </div>
  );
}

export default LoginPage;