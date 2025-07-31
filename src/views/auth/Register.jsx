import AuthLayout from "../../layouts/AuthLayout";
import UserForm from "../../components/forms/UserForm";
import { useNavigate } from "react-router-dom";

export default function Register() {
  const navigate = useNavigate();
  return (
    <AuthLayout variant="register">
      <div className="w-full max-w-2xl">
        <h1 className="mb-8 text-3xl font-bold">Daftar</h1>

        <UserForm onSuccess={() => navigate('/')}/>
      </div>
    </AuthLayout>
  );
}
