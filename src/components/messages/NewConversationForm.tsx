import { Button, Form } from "react-bootstrap";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { useDispatch } from "react-redux";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { IUsernameAndId } from "../../@types/userType";
import { useGetUsernamesAndIdsQuery } from "../../state/slices/usersApiSlice";
import { useSendMessageMutation } from "../../state/slices/messagesApiSlice";
import { resetState } from "../../state/slices/conversationSlice";
import Spinner from "../Spinner";

const schema = z.object({
  recipient: z.string().min(1, "Please select a recipient"),
  message: z.string().min(1, "Message cannot be empty"),
});

interface IForm {
  recipient: string;
  message: string;
}

function NewConversationForm() {
  const {
    data: users,
    isLoading,
    isError,
    isSuccess,
  } = useGetUsernamesAndIdsQuery();

  const [sendMessage, { isLoading: isSubmitting }] = useSendMessageMutation();

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const form = useForm<IForm>({
    defaultValues: {
      recipient: "",
      message: "",
    },
    resolver: zodResolver(schema),
  });

  const { register, handleSubmit, formState, reset } = form;
  const { errors } = formState;

  useEffect(() => {
    if (isError) {
      navigate("/");
      toast.warn("Something went wrong. Please try again later.");
    }
  }, [isError]);

  const onSubmit = async (formData: IForm) => {
    try {
      const data = {
        receiverId: formData.recipient,
        message: formData.message,
      };

      await sendMessage(data).unwrap();
      dispatch(resetState());
    } catch (error) {
      toast.warn("Failed to send message, please try again later.");
    }

    reset();
  };

  return (
    <Form
      className="m-5 mt-2"
      style={{
        color: "white",
      }}
      onSubmit={handleSubmit(onSubmit)}
    >
      <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
        <Form.Label>Recipient</Form.Label>
        <Form.Select
          aria-label="Default select example"
          {...register("recipient")}
          isInvalid={errors.recipient?.message ? true : false}
        >
          <option defaultChecked value="">
            Select Recipient
          </option>
          {isSuccess &&
            users &&
            users.map((user: IUsernameAndId) => (
              <option value={user._id}>{user.username}</option>
            ))}
        </Form.Select>
        <Form.Control.Feedback type="invalid">
          {errors.recipient?.message}
        </Form.Control.Feedback>
      </Form.Group>
      <Form.Group className="mb-3">
        <Form.Label>Message</Form.Label>
        <Form.Control
          as="textarea"
          rows={3}
          {...register("message")}
          isInvalid={errors.message?.message ? true : false}
        />
        <Form.Control.Feedback type="invalid">
          {errors.message?.message}
        </Form.Control.Feedback>
      </Form.Group>
      <div className="w-100 d-flex justify-content-end">
        <Button
          style={{
            width: "14rem",
            height: "3rem",
            color: "white",
          }}
          type="submit"
          className="fw-bold"
          disabled={isLoading || isSubmitting}
        >
          {isSubmitting ? <Spinner /> : "Submit"}
        </Button>
      </div>
    </Form>
  );
}

export default NewConversationForm;
