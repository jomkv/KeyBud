import Select from "react-select";
import { useNavigate } from "react-router-dom";
import { Col, Row } from "react-bootstrap";
import { useState, useEffect } from "react";
import { toast } from "react-toastify";

import { useGetUsernamesAndIdsQuery } from "../../state/slices/usersApiSlice";
import { IUsernameAndId } from "../../@types/userType";

interface IOption {
  value: string;
  label: string;
}

function SearchConversation() {
  const [options, setOptions] = useState<IOption[]>([]);
  const {
    data: users,
    isSuccess,
    isError,
    isLoading,
  } = useGetUsernamesAndIdsQuery();
  const navigate = useNavigate();

  useEffect(() => {
    if (isError) {
      navigate("/");
      toast.warn("Something went wrong. Please try again later.");
    }
  }, [isError, navigate]);

  useEffect(() => {
    if (isSuccess && users) {
      const options = users.map((user: IUsernameAndId) => ({
        value: user._id,
        label: user.username,
      }));

      setOptions(options);
    }
  }, [isSuccess, users]);

  return (
    <Row className="mb-3">
      <Col
        style={{
          color: "black",
        }}
      >
        <Select
          options={options}
          isLoading={isLoading}
          isDisabled={isLoading}
          placeholder="Search for a user"
        />
      </Col>
    </Row>
  );
}

export default SearchConversation;
