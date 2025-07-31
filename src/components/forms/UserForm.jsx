import { DatePicker, Form, Input, notification, Select } from "antd";
import { useEffect, useState } from "react";
import Button from "../Button";
import api from "../../libs/axios";
import { handleHash } from "../../utils/hashPassword";
import dayjs from "dayjs";
import { showMessage } from "../../utils/showMessage";
import { convertToBase64 } from "../../utils/baseTo64";

export default function UserForm({ isEdit = false, initialValues = {}, onSuccess }) {
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (isEdit && initialValues) {
      form.setFieldsValue({...initialValues, date_of_birth: dayjs(initialValues.date_of_birth)});
    } else {
      form.resetFields();
    }
  }, [form, initialValues, isEdit]);

  const handleFinish = async (values) => {
    const photoFile = values.photo;
    const payload = {
      ...values,
      password: handleHash(values.password),
      date_of_birth: values.date_of_birth?.format("DD-MM-YYYY"),
      photo: photoFile ? await convertToBase64(photoFile) : null
    };

    const formData = new FormData();
    for (const key in payload) {
      if (key === "photo" && payload[key]?.file) {
        formData.append("photo", payload[key].file.originFileObj);
      } else {
        formData.append(key, payload[key]);
      }
    }

    setLoading(true);

    try {
      if (isEdit) {
        await api.put(`/api/v1/admin/${initialValues.id}/update`, formData);
        showMessage({
          type: "success",
          title: "Success",
          description: "Data user berhasil disimpan."
        })
      } else {
        await api.post("/api/v1/auth/register", formData);
        showMessage({
          type: "success",
          title: "Success",
          description: "Data user berhasil disimpan."
        })
      }

      if (onSuccess) onSuccess();
    } catch (err) {
      console.log(err.response);
      notification.error({
        message: 'Error',
        description: err.response.data.message || 'Data user gagal disimpan.'
      })
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
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
            <Form.Item 
            className="w-1/2" 
            label="Password" 
            name="password"  
            rules={[
                {
                  required: true,
                  message: 'Password tidak boleh kosong',
                },
                {
                  min: 8,
                  message: 'Password minimal 8 karakter',
                },
                {
                  pattern: /^(?=.*[a-zA-Z])(?=.*\d)(?=.*[A-Z]).{8,}$/,
                  message: 'Password harus mengandung huruf, angka, dan 1 huruf kapital',
                },
              ]}>
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
          <Input type="file" onChange={(e) => {
    const file = e.target.files[0];
    form.setFieldsValue({ photo: file });
  }}/>
        </Form.Item>

        <Form.Item>
          <Button
            size="w-full"
            type="submit"
            disabled={loading}
            text={isEdit ? "Simpan" : "Tambah"}
            variant={`${isEdit ? "bg-orange-primary hover:bg-orange-primary/90" : "bg-blue-primary hover:bg-blue-primary/90"} text-white `}
          />
        </Form.Item>
      </Form>
    </>
  );
}
