import AuthLayout from "../../layouts/AuthLayout";
import UserForm from "../../components/forms/UserForm";
import { useNavigate } from "react-router-dom";
import { notification } from "antd";

export default function Register() {
  const navigate = useNavigate();
  const [message, contextHolder] = notification.useNotification();
  return (
    <AuthLayout variant="register">
      {contextHolder}
      <div className="w-full max-w-2xl">
        <h1 className="mb-8 text-3xl font-bold">Daftar</h1>

        <UserForm onSuccess={() => {
          navigate('/')
          message['success']({ message: 'Register Success' });
          }} 
          onFail={(e) => {
            const error = e.response?.data?.err_message || e.message || 'Register Failed';
            message['error']({ message: 'Register Failed', description: error });
          }}
          />
      </div>
    </AuthLayout>
  );
}
