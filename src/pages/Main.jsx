import { useEffect, useState } from "react";
import CardSeminars from "../components/CardSeminars";
import axios from "axios";
import { Modal, Input, Spin, message } from "antd";
import "./Main.css";

const API = "http://localhost:8001/seminars";

const emptySeminar = {
  title: "",
  description: "",
  date: "",
  time: "",
  photo: "",
  id: Date.now(),
}

export default function MainPage() {
  const [seminars, setSeminars] = useState();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [messageApi, contextHolder] = message.useMessage();

  const [isModalOpen, setModalOpen] = useState(false);
  const [confirmLoading, setConfirmLoading] = useState(false);
  const [editingSeminar, setEditingSeminar] = useState(emptySeminar);

  useEffect(() => {
    // получаем данные
    async function getSeminars() {
      try {
        const response = await axios(API);
        setSeminars(response.data);
      } catch (err) {
        setError(err);
      } finally {
        setLoading(false);
      }
    }

    getSeminars();
  }, []);

  async function deleteSeminar(id) {
    //  удаляем данные
    try {
      await axios.delete(`${API}/${id}`);
      messageApi.open({
        type: "success",
        content: "This is a success delete",
      });
      setSeminars((seminars) =>
        seminars.filter((seminar) => seminar.id !== id)
      );
    } catch {
      messageApi.open({
        type: "error",
        content: "This is an error delete",
      });
    }
  }

  async function editSeminar(id, updatedSeminar) {
    // Функция для изменения данных
    try {
      await axios.put(`${API}/${id}`, updatedSeminar);
      messageApi.open({
        type: "success",
        content: "This is a success edited",
      });
      setSeminars((seminars) =>
        seminars.map((seminar) =>
          seminar.id === id ? updatedSeminar : seminar
        )
      );
    } catch (error) {
      messageApi.open({
        type: "error",
        content: "This is an error edited",
      });
      throw error;
    }
  }

  function showModalOpen() {
    setModalOpen(true);
  }

  const handleSubmit = async () => {
    // Вызываем функцию на изменение данных и в случае успеха закрываем модальное окно и сбрасываем данные
    setConfirmLoading(true);
    try {
      await editSeminar(editingSeminar.id, editingSeminar);
      setModalOpen(false);
      setEditingSeminar(emptySeminar);
    } catch (error) {
      console.error(error);
    } finally {
      setConfirmLoading(false);
    }
  };

  const handleCancel = () => {
    setModalOpen(false);
    setEditingSeminar(emptySeminar);
  };

  if (loading) {
    return <Spin />;
  }

  if (error) {
    return <div>Произошла ошибка при загрузке семинаров</div>;
  }

  return (
    <>
      {contextHolder}
      {seminars?.map((seminar) => (
        <CardSeminars
          key={seminar.id}
          src={seminar.photo}
          alt={seminar.id}
          title={seminar.title}
          description={seminar.description}
          date={seminar.date}
          time={seminar.time}
          onRemove={() => deleteSeminar(seminar.id)}
          onEdit={() => {
            showModalOpen();
            setEditingSeminar(seminar);
          }}
        />
      ))}
      <Modal
        title="Редактирование семинара"
        open={isModalOpen}
        onOk={handleSubmit}
        confirmLoading={confirmLoading}
        onCancel={handleCancel}
      >
        <Input
          className="card-input"
          placeholder="Введите название семинара"
          value={editingSeminar.title}
          onChange={(e) =>
            setEditingSeminar({ ...editingSeminar, title: e.target.value })
          }
        />
        <Input
          className="card-input"
          placeholder="Введите описание семинара"
          value={editingSeminar.description}
          onChange={(e) =>
            setEditingSeminar({ ...editingSeminar, description: e.target.value })
          }
        />
        <Input
          className="card-input"
          placeholder="Введите дату проведения семинара"
          value={editingSeminar.date}
          onChange={(e) =>
            setEditingSeminar({ ...editingSeminar, date: e.target.value })
          }
        />
        <Input
          className="card-input"
          placeholder="Введите время провеления семинара"
          value={editingSeminar.time}
          onChange={(e) =>
            setEditingSeminar({ ...editingSeminar, time: e.target.value })
          }
        />
        <Input
          className="card-input"
          placeholder="Вставьте адрес изображения"
          value={editingSeminar.photo}
          onChange={(e) =>
            setEditingSeminar({ ...editingSeminar, photo: e.target.value })
          }
        />
      </Modal>
    </>
  );
}
