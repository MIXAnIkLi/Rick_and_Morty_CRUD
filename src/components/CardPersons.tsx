import React, { useState } from "react";
import { EditOutlined, DeleteOutlined, HeartOutlined } from "@ant-design/icons";
import { Card } from "antd";
const { Meta } = Card;
import "./CardPersons.css";


interface CardMetaProps {
  name: string;
  status: string;
  species: string;
  gender: string;
  image: string;
  location: string;
  alt: string;
  liked: boolean;
  onEdit: () => void;
  onRemove: () => void;
  onLiked: () => void;
}

const CardPersons: React.FC<CardMetaProps> = ({
  name,
  status,
  species,
  gender,
  image,
  location,
  alt,
  onEdit,
  onRemove,
  onLiked,
  liked,
}) => {
  return (
    <Card
      className="card__item"
      cover={<img alt={alt} src={image} />}
      actions={[
        <EditOutlined className="card__btn" onClick={onEdit} key="edit" />,
        <DeleteOutlined className="card__btn" onClick={onRemove} key="ellipsis" />,
        <HeartOutlined
          onClick={onLiked}
          key="like"
          className={liked ? "card__like card__like_active" : "card__like"}
        />,
      ]}
      extra={location}
    >
      <Meta
        title={name}
        description={`Status: ${status}, Species: ${species}, Gender: ${gender}`}
      />
    </Card>
  );
};
export default CardPersons;
