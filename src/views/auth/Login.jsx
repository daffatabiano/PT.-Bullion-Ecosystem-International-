import { Form, Input, notification} from "antd";
import AuthLayout from "../../layouts/AuthLayout";
import Button from "../../components/Button";
import { useForm } from "antd/es/form/Form";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../../libs/axios";
import { handleHash } from "../../utils/hashPassword";

export default function Login() {
    const [form] = useForm();
    const [loading, setLoading] = useState(false);
    const [message, contextHolder] = notification.useNotification();
    const navigate = useNavigate();
    const handleSubmit = async () => {
        try {
            const values = await form.validateFields();
            setLoading(true);

            const res = await api.post('/api/v1/auth/login', {...values,
                password: handleHash(values.password),
            });

            if(res.status === 200) {
                localStorage.setItem('token', res.data.data.token);
                navigate('/')
            }
        } catch (err) {
            message['error']({
                 message: 'Login Error',
      description:
                err.message || 'Invalid Credential !'
            })
        } finally {
            setLoading(false);
        }
    }
    return (
        <AuthLayout variant="login">
            {contextHolder}
            <div className="w-full max-w-md">
                <h1 className="mb-8 text-2xl font-bold !text-start">Login Admin</h1>
                <Form
                    name="basic"
                    wrapperCol={{ span: 16 }}
                    style={{ maxWidth: 600 }}
                    initialValues={{ remember: true }}
                    autoComplete="off"
                    layout="vertical"
                    form={form}
                >
                    <Form.Item
                        label="Email"
                        name="email"

                        rules={[{ required: true, message: 'Silahkan Masukkan Email Anda', },
                        { type: "email", message: "Format email tidak valid!" },
                        ]}
                    >
                        <Input disabled={loading}/>
                    </Form.Item>

                    <Form.Item
                        label="Password"
                        name="password"
                        rules={[{ required: true, message: 'Silahkan Masukkan Password Anda!' },
                        { min: 8, message: "Password Minimal 8 Karakter !" },
                        ]}
                    >
                        <Input.Password disabled={loading}/>
                    </Form.Item>

                    <Form.Item label={null}>
                        <Button size="w-full" type="button" disabled={loading} onClick={handleSubmit} variant="bg-orange-primary text-white hover:bg-orange-primary/90" text={loading ? "Loading..." : "Masuk"} />
                    </Form.Item>
                </Form>
            </div>
        </AuthLayout>
    )
}