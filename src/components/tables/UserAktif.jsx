import { Table, Tag, Button, Pagination, Space } from "antd";
import {
  EyeOutlined,
  EditOutlined
} from "@ant-design/icons";
import UserDetailModal from "../modals/UserModal";
import { useEffect, useState } from "react";
import EditUserModal from "../modals/EditUserModal";
import { useNavigate } from "react-router-dom";
import api from "../../libs/axios";
import {mockData} from '../../utils/mockData';

export default function UserAktif() {
  const navigate = useNavigate();
  const [modal, setModal] = useState({
    open: false,
    user: null
  });
  const [modalEdit, setModalEdit] = useState({
    open: false,
    user: null
  });
  const [data, setData] = useState([]);
  const [pagination, setPagination] = useState({
    offset: 0,
    limit: 5,
    total: 0
  });

  const openModal = (data) => {
    fetchUserById(data.id, false)
  }
  const openModalEdit = (data) => {
    fetchUserById(data.id, true)
  }
  const columns = [
    {
      title: "Account ID",
      dataIndex: "id",
      key: "id",
      render: (text) => <span className="font-medium">{text}</span>
    },
    {
      title: "Name",
      dataIndex: "name",
      key: "name"
    },
    {
      title: "Date",
      dataIndex: "date",
      key: "date"
    },
    {
      title: "Status",
      dataIndex: "status",
      key: "status",
      render: (status) => (
        <Tag color="#dff5ea" className="text-green-700 font-medium px-4 py-1 rounded-full border-none">
          {status}
        </Tag>
      )
    },
    {
      title: "Action",
      key: "action",
      render: (_, record) => (
        <Space>
          <Button
            type="link"
            icon={<EyeOutlined />}
            onClick={() => openModal(record)}
            className="text-orange-500 font-semibold p-0"
          >
            Lihat
          </Button>
          <Button
            type="link"
            icon={<EditOutlined />}
            onClick={() => openModalEdit(record)}
            className="text-red-500 font-semibold p-0"
          >
            Edit
          </Button>
        </Space>
      )
    }
  ];

  const fetchData = async (offset = 0, limit = 5) => {
    try {
      const res = await api.get(`/api/v1/admin`, {
        params: { offset, limit }
      });
      setData(
        res.data?.data?.map((item, index) => ({
          key: item.id,
          id: item.id,
          name: item.name,
          date: item.created_at?.slice(0, 10),
          status: item.status ?? "Registered"
        })) || []
      );
      setPagination({
        ...pagination,
        total: res.data.total ?? 0
      });
    } catch (err) {
      console.error("Failed to fetch data", err);
    }
  };

  const fetchUserById = async (id, forEdit = false) => {
  try {
    const res = await api.get(`/api/v1/admin/${id}`);
    const user = res.data?.data;

    if (forEdit) {
      setModalEdit({
        open: true,
        user
      });
    } else {
      setModal({
        open: true,
        user
      });
    }
  } catch (err) {
    console.error("Failed to fetch user by ID", err);
  }
};

  useEffect(() => {
    fetchData(pagination.offset, pagination.limit);
  }, []);

  return (
    <div className="">
      <div className="mb-4 bg-white shadow-md rounded-md p-6 flex justify-between">
        <h1 className="text-2xl font-semibold ">User Aktif</h1>
        <button className="px-4 py-2 rounded-lg bg-orange-primary text-white" type="button" onClick={() => navigate('/register')}>Tambah User</button>
      </div>

      <div className="bg-white shadow-md rounded-md p-6">
        <Table
          columns={columns}
          dataSource={data.length > 0 ? data : mockData}
          pagination={false}
          rowClassName={(_, index) =>
            index % 2 === 0 ? "bg-orange-50" : ""
          }
        />
        <div className="flex justify-end mt-4">
          <Pagination
            current={pagination.offset / pagination.limit + 1}
            total={pagination.total}
            pageSize={pagination.limit}
            onChange={(page) => {
              const newOffset = (page - 1) * pagination.limit;
              setPagination({ ...pagination, offset: newOffset });
              fetchData(newOffset, pagination.limit);
            }}
            itemRender={(page, type, originalElement) => {
              if (type === "prev") {
                return <button className="text-orange-primary!">Prev</button>;
              }
              if (type === "next") {
                return <button className="text-orange-primary!">Next</button>;
              }
              return (
                <button
                  className={`rounded-md w-full ${pagination.offset / pagination.limit + 1 === page
                      ? "bg-orange-primary text-white"
                      : "bg-gray-100 text-gray-800"
                    } hover:bg-orange-100 transition`}
                >
                  {page}
                </button>
              );
            }}
          />
        </div>

      </div>

      <UserDetailModal open={modal.open} onClose={() => setModal({ ...modal, open: false, user: null })} user={modal.user} />
      <EditUserModal open={modalEdit.open} onClose={() => setModalEdit({ ...modal, open: false, user: null })} user={modalEdit.user} />
    </div>
  );
}
