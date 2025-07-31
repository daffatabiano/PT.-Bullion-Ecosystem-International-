import { Modal, notification } from "antd";
import { CloseOutlined } from "@ant-design/icons";
import UserForm from "../forms/UserForm";
import { useNavigate } from "react-router-dom";

export default function EditUserModal({ open, onClose, user }) {
  const navigate = useNavigate()
  const [message,contextHolder] = notification.useNotification();


  return (
    <>
    {contextHolder}
      <Modal
        open={open}
        onCancel={onClose}
        footer={null}
        centered
        closeIcon={false}
        width={460}
      >
        <div className="p-2 relative">
          <button
            onClick={onClose}
            className="absolute top-4 right-4 text-white bg-orange-primary hover:bg-orange-primary/90 p-2 rounded-full w-8 h-8 flex justify-center"
          >
            <CloseOutlined style={{ fontSize: 18 }} />
          </button>

          <h2 className="text-lg font-bold mb-6">Edit User</h2>

          <UserForm isEdit initialValues={user} onSuccess={() => {
            onClose()
            navigate(0)
            message['success']({ message: 'Update User Success' });
          }}
            onFail={(e) => {
              const error = e.response?.data?.err_message || e.message || 'Update User Failed';
              message['error']({ message: 'Update User Failed', description: error });
            }}
          />
        </div>
      </Modal>
    </>
  );
}
