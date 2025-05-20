import React, { useState } from "react";
import {
  EuiModal,
  EuiModalHeader,
  EuiModalHeaderTitle,
  EuiModalBody,
  EuiModalFooter,
  EuiButton,
  EuiFlexGroup,
  EuiFlexItem,
  EuiDatePicker,
} from "@elastic/eui";
import moment from "moment";

const RegisterModal = ({
  isVisible,
  onClose,
}: {
  isVisible: boolean;
  onClose: () => void;
}) => {
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
  });
  const [startDate, setStartDate] = useState(moment());
  const handleInputChange = (field: string, value: string) => {
    setFormData({ ...formData, [field]: value });
  };

  const handleSubmit = () => {
    alert(
      `Registered with Username: ${formData.username}, Email: ${formData.email}`
    );
    onClose();
  };

  if (!isVisible) return null;

  const handleChange = (date: moment.Moment) => {
    setStartDate(date);
  };

  return (
    <EuiModal
      onClose={onClose}
      initialFocus="[name=username]"
      style={{ width: "500px" }}
    >
      <EuiModalHeader>
        <EuiModalHeaderTitle>Đăng ký xe sát hạch</EuiModalHeaderTitle>
      </EuiModalHeader>

      <EuiModalBody>
        <EuiFlexGroup style={{ gap: "16px" }}>
          <EuiFlexItem
            grow={false}
            style={{
              textAlign: "left",
              fontWeight: "bold",
              paddingRight: "8px",
            }}
          >
            <div style={{ marginBottom: "12px" }}>Mã bài học</div>
            <div style={{ marginBottom: "12px" }}>Thời gian bắt đầu</div>
            <div style={{ marginBottom: "12px" }}>GVHD</div>
            <div style={{ marginBottom: "12px" }}>ID GVHD</div>
          </EuiFlexItem>
          <EuiFlexItem grow={false} style={{ textAlign: "left" }}>
            <div style={{ marginBottom: "12px" }}>4165817</div>
            <div style={{ marginBottom: "12px" }}>01/01/2025</div>
            <div style={{ marginBottom: "12px" }}>LÊ TRƯỜNG YÊN</div>
            <div style={{ marginBottom: "12px" }}>1724</div>
          </EuiFlexItem>
        </EuiFlexGroup>
        <EuiDatePicker
          showTimeSelect
          showTimeSelectOnly
          selected={startDate}
          onChange={handleChange}
          dateFormat="HH:mm"
          timeFormat="HH:mm"
          excludeTimes={[
            moment().hour(12).minute(0),
            moment().hour(13).minute(30),
          ]}
        />
      </EuiModalBody>

      <EuiModalFooter>
        <EuiButton onClick={onClose} color="text">
          Huỷ
        </EuiButton>
        <EuiButton onClick={handleSubmit} fill>
          Đăng ký
        </EuiButton>
      </EuiModalFooter>
    </EuiModal>
  );
};

export default RegisterModal;
