import { Modal } from "antd";
import React, { useEffect, useState } from "react";

const AntdModal = (props) => {
  const { isOpen, onClose, header, width, component } = props;
  const [modalOpen, setModalOpen] = useState(false);
  useEffect(() => {
    setModalOpen(isOpen);
  }, [isOpen]);
  return (
    <Modal
      open={isOpen}
      onCancel={onClose}
      title={header}
      width={width ? width : 800}
      footer={null}
    >
      {modalOpen && component}
    </Modal>
  );
};
export default AntdModal;
