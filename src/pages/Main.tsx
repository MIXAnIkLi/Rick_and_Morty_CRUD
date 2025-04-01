import { useEffect, useState } from "react";
import { Modal, Input, Spin, message, Pagination } from "antd";
import "./Main.css";
import React from "react";
import CardPersons from "../components/CardPersons";
import { deletePerson, fetchPersons, editPerson } from "../redux/action/PersonsAction";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../redux/store";
import FilterPerson from "../components/FilterPerson";
import { Space, Switch } from 'antd';
import { Link } from "react-router-dom";


type Person = {
  id: string;
  name: string;
  description: string;
  image: string;
  species: string;
  gender: string;
  status: string;
  location: { name: string };
};

const emptyPerson = {
  id: "",
  name: "",
  species: "",
  gender: "",
  status: "",
  location: { name: "" },
  image: "",
};

export default function MainPage() {
  const [messageApi, contextHolder] = message.useMessage();
  const [isModalOpen, setModalOpen] = useState(false);
  const [LikedPerson, setLikedPerson] = useState<number[]>([])
  const [isLikedPersons, setIsLikedPersons] = useState(false)
  const [editingPerson, setEditingPerson] = useState(emptyPerson);
  const [currentPage, setCurrentPage] = useState(1);
  const dispatch = useDispatch();
  const pageSize = 5;
  const { persons, loading, error } = useSelector(
    (state: RootState) => state.persons
  );

  useEffect(() => {
    if(!persons.length) {
    dispatch(fetchPersons());
    console.log('Запросили...')}
  }, [dispatch]);

  useEffect(() => {
      window.scrollTo(0, 0)
    }, [currentPage]);

  async function deletePersonOn(id) {
    try {
      // Данный API не предоставляет метод delete, однако строка ниже позволяет совершить это дайствие
      // await axios.delete(`${API}/${id}`);
      messageApi.open({
        type: "success",
        content: "This is a success delete",
      });
      dispatch(deletePerson(id));
    } catch {
      messageApi.open({
        type: "error",
        content: "This is an error delete",
      });
    }
  }

  async function editPersonOn(id, updatedPerson) {
    try {
      // await axios.put(`${API}/${id}`, updatedPerson);
      messageApi.open({
        type: "success",
        content: "This is a success edited",
      });
      dispatch(editPerson(id, updatedPerson))
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

  const handleSubmit =  () => {
    // Вызываем функцию на изменение данных и в случае успеха закрываем модальное окно и сбрасываем данные
    try {
      editPersonOn(editingPerson.id, editingPerson);
      setModalOpen(false);
      setEditingPerson(emptyPerson);
    } catch (error) {
      console.error(error);
    } finally {
      console.log('End')
    }
  };

  const handleCancel = () => {
    setModalOpen(false);
    setEditingPerson(emptyPerson);
  };

  const handleLiked = (id) => {
    setLikedPerson(LikedPerson => LikedPerson.includes(id) ? LikedPerson.filter((idNum) => id !==  idNum) :([...LikedPerson, id]))
  }

  const toggleLiked = () => {
    setIsLikedPersons(!isLikedPersons)
  }
 

  if (loading) {
    return <Spin />;
  }

  if (error) {
    return <div>Произошла ошибка при загрузке семинаров</div>;
  }

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  const filteredPersons = isLikedPersons
    ? persons.filter((person) => LikedPerson.includes(person.id))
    : persons;

  const currentData = filteredPersons.slice((currentPage - 1) * pageSize, currentPage * pageSize);



  return (
    <><FilterPerson />
    <Space direction="vertical">
    <Switch checkedChildren="♥" unCheckedChildren="♥"  onChange={() => toggleLiked()}/>
    </Space>
  
      {contextHolder}
      
      {currentData.map((person) => (
        <div key={person.id} className="card__container">
        <Link className="card__link" to={`/${person.id}`} /> 
        <CardPersons
        image={person.image}
        alt={person.id}
        name={person.name}
        status={person.status}
        gender={person.gender}
        species={person.species}
        location={person.location.name}
        onRemove={() => deletePersonOn(person.id)}
        onEdit={() => {
          showModalOpen();
          setEditingPerson(person);
        }}
        onLiked={() => handleLiked(person.id)}
        liked = {LikedPerson.includes(person.id)}
      /> 
      </div>
    ))}
      <Modal
        title="Редактирование персонажа"
        open={isModalOpen}
        onOk={handleSubmit}
        // confirmLoading={confirmLoading}
        onCancel={handleCancel}
      >
        <Input
          className="card-input"
          placeholder="Введите имя персонажа"
          value={editingPerson.name}
          onChange={(e) =>
            setEditingPerson({ ...editingPerson, name: e.target.value })
          }
        />
        <Input
          className="card-input"
          placeholder="Введите статус жизни"
          value={editingPerson.status}
          onChange={(e) =>
            setEditingPerson({ ...editingPerson, status: e.target.value })
          }
        />
        <Input
          className="card-input"
          placeholder="Введите рассу"
          value={editingPerson.species}
          onChange={(e) =>
            setEditingPerson({ ...editingPerson, species: e.target.value })
          }
        />
        <Input
          className="card-input"
          placeholder="Введите локацию"
          value={editingPerson.location.name}
          onChange={(e) =>
            setEditingPerson({ ...editingPerson, location: {...editingPerson.location, name:e.target.value} })
          }
        />
        <Input
          className="card-input"
          placeholder="Вставьте адрес изображения"
          value={editingPerson.image}
          onChange={(e) =>
            setEditingPerson({ ...editingPerson, image: e.target.value })
          }
        />
      </Modal>
      <Pagination 
        current={currentPage}
        pageSize={pageSize}
        total={filteredPersons.length}
        onChange={handlePageChange}
       />
    </>
  );
}
