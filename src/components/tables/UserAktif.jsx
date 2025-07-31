import { Table, Tag, Button, Pagination, Space, notification, Popconfirm } from "antd";
import {
  EyeOutlined,
  EditOutlined,
  DeleteOutlined
} from "@ant-design/icons";
import UserDetailModal from "../modals/UserModal";
import { useEffect, useState } from "react";
import EditUserModal from "../modals/EditUserModal";
import { useNavigate } from "react-router-dom";
import api from "../../libs/axios";
import {mockData} from '../../utils/mockData';
import dayjs from "dayjs";
import TableSkeleton from "../skeletons/TableSkeleton";

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

  const [data, setData] = useState(mockData);
  const [pagination, setPagination] = useState({
    offset: 0,
    limit: 5,
    total: 0
  });
  const [message, contextHolder] = notification.useNotification();
  const [loading, setLoading] = useState(false);
  const openModal = (data) => {
    fetchUserById(data.id, false)
  }
  const openModalEdit = (data) => {
    fetchUserById(data.id, true)
  }

  const confirmDelete = async (id) => {
    const res = await api.delete(`/api/v1/admin/${id}/delete`);
    if (res.status === 200) {
      message['success']({
        message: 'Success',
        description: res.data.message || 'Data berhasil dihapus'
      })
      await fetchData(pagination.offset, pagination.limit);
    }
  }

  const columns = [
    {
      title: "Account ID",
      dataIndex: "id",
      key: "id",
      render: (text) => {
      return <span className="font-medium uppercase"># {text.slice(0,5)}</span>}
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
        <Tag color="#dff5ea" className="!text-green-700 font-medium px-4 py-1 rounded-full border-none">
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
            className="!text-orange-500 font-semibold p-0"
          >
            Lihat
          </Button>
          <Button
            type="link"
            icon={<EditOutlined />}
            onClick={() => openModalEdit(record)}
            className="!text-orange-500 font-semibold p-0"
          >
            Edit
          </Button>
          <Popconfirm
            title="Delete the user"
            description="Are you sure to delete this user?"
            onConfirm={() => confirmDelete(record.id)}
            onCancel={() => {}}
            okText="Yes"
            cancelText="No"
          >
            <Button danger icon={<DeleteOutlined />}/>
          </Popconfirm>
        </Space>
      )
    }
  ];

  const fetchData = async (offset = 5, limit = 5) => {
    try {
      setLoading(true);
      const res = await api.get(`/api/v1/admin`, {
        params: { offset, limit }
      });
      setData(
        res.data?.data?.map((item, index) => ({
          key: index + 1,
          id: item._id,
          name: item.name,
          gender: item.gender,
          date: item.date_of_birth?.split('T')[0],
          status: item.status ?? "Registered"
        })) || []
      );
      setPagination({
        ...pagination,
        total: res.data.total ?? 0
      });
    } catch (err) {
      console.error("Failed to fetch data", err);
    } finally {
      setLoading(false);
    }
  };

  const fetchUserById = async (id, forEdit = false) => {
  try {
    setLoading(true);
    const res = await api.get(`/api/v1/admin/${id}`);
    const user = res.data?.data;
    const data = {
      ...user,
      date_of_birth: user.date_of_birth ? dayjs(user.date_of_birth, 'YYYY-MM-DD') : null
    }

    if (forEdit) {
      setModalEdit({
        open: true,
        user : data
      });
    } else {
      setModal({
        open: true,
        user
      });
    }
  } catch (err) {
    console.error("Failed to fetch user by ID", err);
  } finally {
    setLoading(false);
  }
};

  useEffect(() => {
    fetchData(pagination.offset, pagination.limit);
  }, []);

  return (
    <div className="">
      {contextHolder}
      <div className="mb-4 bg-white shadow-md rounded-md p-6 flex justify-between">
        <h1 className="text-2xl font-semibold ">User Aktif</h1>
        <button className="px-4 py-2 rounded-lg bg-orange-primary text-white" type="button" onClick={() => navigate('/register')}>Tambah User</button>
      </div>

      <div className="bg-white shadow-md rounded-md p-6">
        {loading ? (
          <TableSkeleton />
        ) : (
          <Table
            columns={columns}
            dataSource={data}
            pagination={false}
            rowClassName={(_, index) =>
              index % 2 === 0 ? "bg-orange-50" : ""
            }
          />
        )}
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

      <UserDetailModal open={modal.open} onClose={() => setModal({ ...modal, open: false, user: null })} user={modal.user} onEdit={() => {
        setModal({ open: false, user: null });
        const userModal = {...modal.user, date_of_birth: dayjs(modal.user.date_of_birth, 'YYYY-MM-DD')};
        setModalEdit({ open: true, user: userModal });
        }}/>
      <EditUserModal open={modalEdit.open} onClose={() => setModalEdit({ ...modal, open: false, user: null })} user={modalEdit.user} />
    </div>
  );
}
