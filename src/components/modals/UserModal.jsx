import { Modal } from "antd";
import { CloseOutlined } from "@ant-design/icons";

export default function UserDetailModal({ open, onClose, user, onEdit }) {
  return (
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

        <h2 className="text-lg font-bold mb-6">Lihat User</h2>

          <div className="my-8  ">
              <p className="font-semibold text-center">Foto Profil</p>
              <img
                src={`data:image/png;base64,${user?.photo}`}
                alt="Profile"
                className="rounded-full w-24 h-24 mt-1 mx-auto object-cover border border-gray-300"
              />
            </div>

        <div className="flex justify-between mb-6">
          <div className="space-y-3 text-sm">
            <div>
              <div className="font-semibold">Nama Depan</div>
              <div>{user?.first_name}</div>
            </div>
            <div>
              <div className="font-semibold">Jenis Kelamin</div>
              <div>{user?.gender}</div>
            </div>
            <div>
              <div className="font-semibold">Email</div>
              <div>{user?.email}</div>
            </div>
            <div>
              <div className="font-semibold">No. Handphone</div>
              <div>{user?.phone}</div>
            </div>
            <div>
              <div className="font-semibold">Alamat</div>
              <div>{user?.address}</div>
            </div>
          </div>

          <div className="space-y-3 text-sm text-right">
          
            <div>
              <div className="font-semibold">Nama Belakang</div>
              <div>{user?.last_name}</div>
            </div>
            <div>
              <div className="font-semibold">Tanggal Lahir</div>
              <div>{user?.date_of_birth?.split("T")[0]}</div>
            </div>
          </div>
        </div>

        <button
          onClick={() => {
            onEdit(user)
            onClose()
          }}
          className="w-full bg-orange-500 hover:bg-orange-600 text-white font-semibold py-2 rounded-md"
        >
          Edit
        </button>
      </div>
    </Modal>
  );
}
