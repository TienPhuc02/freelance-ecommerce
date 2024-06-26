import { Button, Form, Input, Rate, List, Avatar, Card, message } from "antd";
import React, { useState } from "react";
import type { FormProps } from "antd";
import { APICreateComment } from "../../services/api";

const onChange = (
  e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
) => {
  console.log("Change:", e.target.value);
};

type IPropComment = {
  slug: string;
  listCommentProduct: CommentProduct[];
  getListCommentProduct: () => Promise<void>;
};

const CommentProduct = ({
  slug,
  listCommentProduct,
  getListCommentProduct,
}: IPropComment) => {
  const [form] = Form.useForm();
  const [valueRating, setValueRating] = useState(3);

  type FieldType = {
    comment: string;
    rating: number;
    slug: string;
  };

  console.log("check listCommentProduct", listCommentProduct);

  const onFinish: FormProps<FieldType>["onFinish"] = async (values) => {
    const dataCreateComment = {
      productId: slug,
      rating: values.rating,
      comment: values.comment,
    };
    console.log("Success:", values);

    const res = await APICreateComment(dataCreateComment);
    console.log(res);
    if (res && res.data) {
        form.resetFields();
        message.success("Bình luận của bạn thành công!!!.")
      getListCommentProduct();
    }
  };

  const { TextArea } = Input;
  const desc = ["terrible", "bad", "normal", "good", "wonderful"];

  const onFinishFailed: FormProps<FieldType>["onFinishFailed"] = (
    errorInfo
  ) => {
    console.log("Failed:", errorInfo);
  };

  return (
    <div className="w-full">
      <h2>Bình luận sản phẩm :</h2>
      <div className="input-comment my-4">
        <Form
          form={form}
          name="basic"
          wrapperCol={{ span: 24 }}
          initialValues={{ remember: true }}
          onFinish={onFinish}
          onFinishFailed={onFinishFailed}
          autoComplete="off"
        >
          <Form.Item<FieldType>
            label="Comment"
            name="comment"
            rules={[{ required: true, message: "Please input your comment!" }]}
          >
            <TextArea
              showCount
              maxLength={100}
              onChange={onChange}
              placeholder="Nhập bình luận của bạn ở đây."
              variant="borderless"
            />
          </Form.Item>
          <Form.Item<FieldType>
            label="Rating"
            name="rating"
            rules={[{ required: true, message: "Please input your rating!" }]}
          >
            <Rate
              tooltips={desc}
              onChange={setValueRating}
              value={valueRating}
            />
          </Form.Item>
          <Form.Item wrapperCol={{ offset: 24, span: 8 }}>
            <Button type="primary" htmlType="submit">
              Bình luận
            </Button>
          </Form.Item>
        </Form>
      </div>
      <div className="list-comment">
        <List
          itemLayout="horizontal"
          dataSource={listCommentProduct}
          renderItem={(comment) => (
            <List.Item>
              <Card style={{ width: "100%" }}>
                <List.Item.Meta
                  avatar={<Avatar src={comment.user.avatar.url} />}
                  title={
                    <span>
                      {comment.user.name} - {comment.user.email}
                    </span>
                  }
                  description={comment.comment}
                />
                <div>
                  Rating: <Rate disabled value={comment.rating} />
                </div>
              </Card>
            </List.Item>
          )}
        />
      </div>
    </div>
  );
};

export default CommentProduct;
