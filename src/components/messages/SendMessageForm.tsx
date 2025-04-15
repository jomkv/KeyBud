import { useEffect, useState } from "react";
import { Button, Form } from "react-bootstrap";
import { useSelector } from "react-redux";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "react-toastify";

import Spinner from "../Spinner";
import { RootState } from "../../state/store";
import { useSendMessageMutation } from "../../state/slices/messagesApiSlice";

const schema = z.object({
  message: z.string().nonempty("Message cannot be empty"),
});

interface IForm {
  message: string;
}

function SendMessageForm() {
  const conversation = useSelector((state: RootState) => state.conversation);

  const [buttonIcon, setButtonIcon] = useState<string>("bi-send");
  const [recipientId, setRecipientId] = useState<string | null>(null);
  const [sendMessage, { isLoading }] = useSendMessageMutation();

  const form = useForm<IForm>({
    defaultValues: {
      message: "",
    },
    resolver: zodResolver(schema),
  });

  const { register, handleSubmit, reset } = form;

  useEffect(() => {
    if (conversation.isSet && conversation.recipient) {
      setRecipientId(conversation.recipient.recipientId);
    }
  }, [conversation]);

  const onSubmit = async (formData: IForm) => {
    if (!recipientId) return;

    try {
      const data = {
        receiverId: recipientId,
        message: formData.message,
      };

      await sendMessage(data).unwrap();
      setButtonIcon("bi-send");
    } catch (error) {
      toast.warn("Failed to send message, please try again later.");
    }

    reset();
  };

  return (
    <Form
      className="d-flex p-2"
      style={{
        height: "10%",
      }}
      onSubmit={handleSubmit(onSubmit)}
    >
      <Form.Control
        size="lg"
        type="text"
        placeholder="Message goes here"
        style={{
          borderRadius: "25px",
        }}
        readOnly={!recipientId}
        {...register("message")}
      />
      <Button
        type="submit"
        disabled={!recipientId || isLoading}
        style={{
          color: "#8c52ff",
          backgroundColor: "transparent",
          border: "none",
        }}
        onMouseOver={() => {
          setButtonIcon("bi-send-fill");
        }}
        onMouseLeave={() => {
          setButtonIcon("bi-send");
        }}
      >
        {isLoading ? <Spinner /> : <i className={`bi ${buttonIcon} fs-2`}></i>}
      </Button>
    </Form>
  );
}

export default SendMessageForm;
