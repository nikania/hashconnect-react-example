import React from "react";
import { Form, Input } from "antd";

const FormCreateToken = ({ form, onSubmit }) => {
  return (
    <Form form={form} onFinish={onSubmit} labelCol={{ span: 10 }}>
      <Form.Item required label="ProjectName" name="projectName">
        <Input />
      </Form.Item>
      <Form.Item required label="Project Type" name="projectType">
        <Input />
      </Form.Item>
      <Form.Item required label="Vintage" name="vintage">
        <Input />
      </Form.Item>
      <Form.Item required label="Vallidation date" name="date">
        <Input />
      </Form.Item>
    </Form>
  );
};

export default FormCreateToken;
