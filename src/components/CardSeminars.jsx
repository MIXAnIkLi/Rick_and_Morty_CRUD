import React from "react";
import { EditOutlined, DeleteOutlined } from "@ant-design/icons";
import { Card } from "antd";
const { Meta } = Card;
import './CardSeminars.css'

export default function CardSeminars({
  src,
  title,
  description,
  date,
  time,
  alt,
  onEdit,
  onRemove,
}) {
  return (
    <Card
    className="card"
      cover={<img alt={alt} src={src} />}
      actions={[
        <EditOutlined onClick={onEdit} key="edit" />,
        <DeleteOutlined onClick={onRemove} key="ellipsis" />,
      ]}
      extra={`${date} - ${time}`}
    >
      <Meta title={title} description={description} />
    </Card>
  );
}
