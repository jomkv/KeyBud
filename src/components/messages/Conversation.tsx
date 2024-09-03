import { Button } from "react-bootstrap";

function Conversation() {
  return (
    <div
      className="h-100 w-75"
      style={{
        borderLeft: "3px solid #000000",
      }}
    >
      <div
        className="border-bottom border-black w-100 d-flex justify-content-center align-items-center pt-2"
        style={{
          height: "10%",
        }}
      >
        <p className="fs-3">John Doe</p>
      </div>
      <div
        className="d-flex flex-column justify-content-end ps-2 pe-2"
        style={{
          height: "80%",
          maxHeight: "80%",
          overflow: "auto",
        }}
      >
        <div
          className="align-self-end"
          style={{
            maxWidth: "48%",
          }}
        >
          <p className="fs-4 p-3 rounded bg-primary">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Nam laborum
            inventore mollitia accusantium, aliquam neque sed necessitatibus
            cupiditate quaerat eos! Ut quod voluptate totam nesciunt blanditiis
            unde nulla dignissimos dolores?
          </p>
        </div>
        <div
          className="align-self-start"
          style={{
            maxWidth: "48%",
          }}
        >
          <p className="fs-4 p-3 rounded bg-primary-subtle">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Nam laborum
            inventore mollitia accusantium, aliquam neque sed necessitatibus
            cupiditate quaerat eos! Ut quod voluptate totam nesciunt blanditiis
            unde nulla dignissimos dolores?
          </p>
        </div>
      </div>
      <div
        className="d-flex"
        style={{
          height: "10%",
        }}
      >
        <input className="w-100" type="text" placeholder="Message goes here" />
        <Button>Send</Button>
      </div>
    </div>
  );
}

export default Conversation;
