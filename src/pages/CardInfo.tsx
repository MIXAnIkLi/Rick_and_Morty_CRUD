import "./Main.css";
import { fetchPersons } from "../redux/action/PersonsAction";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../redux/store";
import { useEffect } from "react";
import { useParams } from "react-router";
import { Image } from "antd";
import React from "react";
import "./CardInfo.css";

export default function CardInfo() {
  const dispatch = useDispatch();
  const { persons, loading, error } = useSelector(
    (state: RootState) => state.persons
  );

  const params = useParams();
  useEffect(() => {
    dispatch(fetchPersons());
  }, [dispatch]);

  useEffect(() => {
    window.scrollTo(0, 0)
  }, []);

  const person = persons.find((person) => person.id == params.id);
  console.log(person)

  if (!person) {
    return null;
  }
  return (
    <div className="card">
      <Image className="card__image" width={200} src={person.image} />
      <div className="card__info">Имя: {person.name}</div>
      <div className="card__info">Статус существования: {person.status}</div>
      <div className="card__info">Пол: {person.gender}</div>
      <div className="card__info">Класс: {person.species}</div>
      <div className="card__info">Локация: {person.location.name}</div>
      {person.episode.map((episod, index) => (
        <p className="card__info" key={index}>
          Порядковый номер {index} - {episod}
        </p>
      ))}
      </div>
 
  );
}
