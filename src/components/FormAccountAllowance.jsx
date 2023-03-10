import React from "react";
import { Form, Input, InputNumber, Switch } from "antd";
import {
  AccountAllowanceApproveTransaction,
  AccountAllowanceDeleteTransaction,
  Hbar,
} from "@hashgraph/sdk";
import Common from "./Common";

export default async function AllowanceApproveTransaction(values, signingAcct, sendTransaction) {
  if (import.meta.env.VITE_DEBUG) console.log("===================UpdateAccountTransaction");
  console.log("values  ");
  console.log("values  ", values);

  if (!values.hbar && !values.token) return;

  let transaction = new AccountAllowanceApproveTransaction();

  if (values.hbar)
    transaction.approveHbarAllowance(signingAcct, values.spenserId, Hbar.from(values.hbarAmount));
  if (values.token)
    transaction.approveTokenAllowance(
      values.tokenId,
      signingAcct,
      values.spenserId,
      values.tokenAmount,
    );

  await sendTransaction(transaction, signingAcct);
}

export async function AllowanceDeleteTransaction(values, signingAcct, sendTransaction) {
  if (import.meta.env.VITE_DEBUG) console.log("===================UpdateAccountTransaction");

  if (!values.dhbar && !values.dtoken) return;

  let transaction = new AccountAllowanceApproveTransaction();

  if (values.dhbar) transaction.approveHbarAllowance(signingAcct, values.spenserId, Hbar.from(0));
  if (values.dtoken)
    transaction.approveTokenAllowance(values.tokenId, signingAcct, values.spenserId, 0);

  await sendTransaction(transaction, signingAcct);
}

export const FormAllowance = ({ form, onSubmit }) => {
  return (
    <Form
      form={form}
      onFinish={onSubmit}
      labelCol={{ span: 10 }}
      initialValues={[{ tokenId: "0.0.0" }]}
    >
      <Form.Item label="HBar" name="hbar">
        <Switch />
      </Form.Item>
      <Form.Item
        noStyle
        shouldUpdate={(prevValues, currentValues) => prevValues.hbar !== currentValues.hbar}
      >
        {({ getFieldValue }) =>
          getFieldValue("hbar") ? (
            <>
              <Form.Item
                label="Spender Account Id"
                name="spenderId"
                rules={[
                  {
                    required: true,
                    pattern: new RegExp(Common.IdRegex),
                  },
                ]}
              >
                <Input />
              </Form.Item>
              <Form.Item
                label="Amount"
                name="hbarAmount"
                rules={[
                  {
                    required: true,
                  },
                ]}
              >
                <InputNumber />
              </Form.Item>
            </>
          ) : null
        }
      </Form.Item>
      <Form.Item label="Token" name="token">
        <Switch />
      </Form.Item>
      <Form.Item
        noStyle
        shouldUpdate={(prevValues, currentValues) => prevValues.token !== currentValues.token}
      >
        {({ getFieldValue }) =>
          getFieldValue("token") ? (
            <>
              <Form.Item
                label="Token Id"
                name="tokenId"
                rules={[
                  {
                    required: true,
                    pattern: new RegExp(Common.IdRegex),
                  },
                ]}
              >
                <Input />
              </Form.Item>
              <Form.Item
                label="Spender Account Id"
                name="spenderId"
                rules={[
                  {
                    required: true,
                    pattern: new RegExp(Common.IdRegex),
                  },
                ]}
              >
                <Input />
              </Form.Item>
              <Form.Item
                label="Amount"
                name="tokenAmount"
                rules={[
                  {
                    required: true,
                  },
                ]}
              >
                <InputNumber />
              </Form.Item>
            </>
          ) : null
        }
      </Form.Item>
    </Form>
  );
};

export const FormAllowanceDelete = ({ form, onSubmit }) => {
  return (
    <Form
      form={form}
      onFinish={onSubmit}
      labelCol={{ span: 10 }}
      initialValues={[{ tokenId: "0.0.0" }]}
    >
      <Form.Item label="HBar" name="dhbar">
        <Switch />
      </Form.Item>
      <Form.Item
        noStyle
        shouldUpdate={(prevValues, currentValues) => prevValues.dhbar !== currentValues.dhbar}
      >
        {({ getFieldValue }) =>
          getFieldValue("dhbar") ? (
            <>
              <Form.Item
                label="Spender Account Id"
                name="spenderId"
                rules={[
                  {
                    required: true,
                    pattern: new RegExp(Common.IdRegex),
                  },
                ]}
              >
                <Input />
              </Form.Item>
            </>
          ) : null
        }
      </Form.Item>
      <Form.Item label="Token" name="dtoken">
        <Switch />
      </Form.Item>
      <Form.Item
        noStyle
        shouldUpdate={(prevValues, currentValues) => prevValues.dtoken !== currentValues.dtoken}
      >
        {({ getFieldValue }) =>
          getFieldValue("dtoken") ? (
            <>
              <Form.Item
                label="Token Id"
                name="tokenId"
                rules={[
                  {
                    required: true,
                    pattern: new RegExp(Common.IdRegex),
                  },
                ]}
              >
                <Input />
              </Form.Item>
              <Form.Item
                label="Spender Account Id"
                name="spenderId"
                rules={[
                  {
                    required: true,
                    pattern: new RegExp(Common.IdRegex),
                  },
                ]}
              >
                <Input />
              </Form.Item>
            </>
          ) : null
        }
      </Form.Item>
    </Form>
  );
};
