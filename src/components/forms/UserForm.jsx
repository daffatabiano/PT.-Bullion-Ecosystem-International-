import { DatePicker, Form, Input, Select } from "antd";
import { useEffect, useState } from "react";
import Button from "../Button";
import api from "../../libs/axios";
import { handleHash } from "../../utils/hashPassword";
import dayjs from "dayjs";
import { showMessage } from "../../utils/showMessage";

export default function UserForm({ isEdit = false, initialValues = {}, onSuccess, onFail }) {
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);
  const [selectedFile, setSelectedFile] = useState(null);

  useEffect(() => {
  if (isEdit && initialValues) {
    form.setFieldsValue({
      ...initialValues,
      date_of_birth: dayjs(initialValues.date_of_birth),
    });
  }

   if (initialValues.photo) {
      setSelectedFile(initialValues.photo);
    }
}, [isEdit, initialValues.id]);


  const handleFinish = async (values) => {
  if (!selectedFile) {
    showMessage({
      type: "error",
      title: "Foto Profil dibutuhkan",
      description: "Silakan unggah foto profil terlebih dahulu."
    });
    return;
  }

  const formData = new FormData();
  formData.append("first_name", values.first_name);
  formData.append("last_name", values.last_name);
  formData.append("gender", values.gender);
  formData.append("date_of_birth", values.date_of_birth.format("DD-MM-YYYY"));
  formData.append("email", values.email);
  formData.append("phone", values.phone);
  formData.append("address", values.address);

  if (!isEdit) {
    formData.append("password", handleHash(values.password));
  }

  formData.append("photo", selectedFile);

  setLoading(true);
  try {
    let res;
    if (isEdit) {
      res = await api.put(`/api/v1/admin/${initialValues.id}/update`, formData);
    } else {
      res = await api.post("/api/v1/auth/register", formData);
    }

    if (res.status === 200) {
      const message = res.data.data.message || "Data berhasil disimpan";
      onSuccess(message);
    }
  } catch (err) {
    onFail(err);
  } finally {
    setLoading(false);
  }
};

  const handleFileChange = (e) => {
  const file = e.target.files[0];
  if (!file) return;

  const isJpgOrJpeg = file.type === 'image/jpeg' || file.type === 'image/jpg';
  const isLt5MB = file.size / 1024 / 1024 < 5;

  if (!isJpgOrJpeg) {
    showMessage({ type: "error", title: "Format tidak didukung", description: "Hanya JPG/JPEG yang diperbolehkan." });
    return;
  }

  if (!isLt5MB) {
    showMessage({ type: "error", title: "Ukuran terlalu besar", description: "Maksimal 5MB." });
    return;
  }

  setSelectedFile(file);
};


  return (
    <>
      <Form
        form={form}
        layout="vertical"
        onFinish={handleFinish}
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

        <Form.Item label="Foto Profil" required help={!selectedFile ? "Foto wajib diunggah" : ""} validateStatus={!selectedFile ? "error" : ""}>
  <Input type="file" accept=".jpg,.jpeg" onChange={handleFileChange} />
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
