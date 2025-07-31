import { DatePicker, Form, Input, Select } from "antd";
import { useEffect, useState } from "react";
import dayjs from "dayjs";
import Button from "../Button";
import api from "../../libs/axios";
import { message } from "antd";

export default function UserForm({ isEdit = false, initialValues = {}, onSuccess }) {
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (isEdit && initialValues.date_of_birth) {
      form.setFieldsValue({
        ...initialValues,
        date_of_birth: dayjs(initialValues.date_of_birth)
      });
    } else {
      form.resetFields();
    }
  }, [initialValues, isEdit]);

  const handleFinish = async (values) => {
    const payload = {
      ...values,
      date_of_birth: values.date_of_birth.format("YYYY-MM-DD")
    };

    const formData = new FormData();
    for (const key in payload) {
      if (key === "photo" && payload[key]?.file) {
        formData.append("photo", payload[key].file);
      } else {
        formData.append(key, payload[key]);
      }
    }

    setLoading(true);

    try {
      if (isEdit) {
        await api.put(`/api/v1/admin/${initialValues.id}/update`, formData);
        message.success("Berhasil memperbarui data user.");
      } else {
        await api.post("/api/v1/auth/register", formData);
        message.success("Berhasil menambahkan user baru.");
      }

      if (onSuccess) onSuccess();
    } catch (err) {
      message.error("Terjadi kesalahan saat menyimpan data.");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Form
      form={form}
      layout="vertical"
      onFinish={handleFinish}
      initialValues={initialValues}
    >
      <div className="flex gap-4">
        <Form.Item className="w-1/2" label="Nama Depan" name="first_name" rules={[{ required: true }]}>
          <Input placeholder="Masukkan nama depan" />
        </Form.Item>
        <Form.Item className="w-1/2" label="Nama Belakang" name="last_name" rules={[{ required: true }]}>
          <Input placeholder="Masukkan nama belakang" />
        </Form.Item>
      </div>

      <div className="flex gap-4">
        <Form.Item className="w-1/2" label="Jenis Kelamin" name="gender" rules={[{ required: true }]}>
          <Select
            placeholder="Pilih jenis kelamin"
            options={[
              { value: "male", label: "Laki-laki" },
              { value: "female", label: "Perempuan" }
            ]}
          />
        </Form.Item>
        <Form.Item className="w-1/2" label="Tanggal Lahir" name="date_of_birth" rules={[{ required: true }]}>
          <DatePicker className="w-full" />
        </Form.Item>
      </div>

      <Form.Item label="Email" name="email" rules={[{ required: true, type: "email" }]}>
        <Input placeholder="Masukkan email" />
      </Form.Item>

      <Form.Item label="No. Handphone" name="phone" rules={[{ required: true }]}>
        <Input placeholder="Masukkan no handphone" />
      </Form.Item>

      <Form.Item label="Alamat" name="address" rules={[{ required: true }]}>
        <Input placeholder="Masukkan alamat" />
      </Form.Item>

      {!isEdit && (
        <div className="flex gap-4">
          <Form.Item className="w-1/2" label="Password" name="password" rules={[{ required: true }]}>
            <Input.Password placeholder="Masukkan password" />
          </Form.Item>
          <Form.Item className="w-1/2" label="Konfirmasi Password" name="confirmPassword" dependencies={['password']} rules={[
            { required: true },
            ({ getFieldValue }) => ({
              validator(_, value) {
                if (!value || getFieldValue('password') === value) return Promise.resolve();
                return Promise.reject(new Error("Password tidak cocok!"));
              },
            }),
          ]}>
            <Input.Password placeholder="Konfirmasi password" />
          </Form.Item>
        </div>
      )}

      <Form.Item label="Foto Profil" name="photo" valuePropName="file">
        <Input type="file" />
      </Form.Item>

      <Form.Item>
        <Button
          size="w-full"
          type="submit"
          loading={loading}
          text={isEdit ? "Simpan" : "Tambah"}
          variant={`${isEdit ? "bg-orange-primary hover:bg-orange-primary/90" : "bg-blue-primary hover:bg-blue-primary/90"} text-white `}
        />
      </Form.Item>
    </Form>
  );
}
