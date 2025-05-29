import React from 'react';
import {
  EuiModal,
  EuiModalHeader,
  EuiModalHeaderTitle,
  EuiModalBody,
  EuiModalFooter,
  EuiButton,
  EuiText,
  EuiIcon,
  EuiSpacer,
  EuiFlexGroup,
  EuiFlexItem,
} from '@elastic/eui';

interface RegisterData {
  time: string;
  plateNumber: string;
  lockId: string;
}

interface RegisterSuccessProps {
  isOpen: boolean;
  onClose: () => void;
  success: boolean;
  data?: RegisterData;
  error?: string;
}

const RegisterSuccess: React.FC<RegisterSuccessProps> = ({
  isOpen,
  onClose,
  success,
  data,
  error,
}) => {
  if (!isOpen) return null;

  return (
    <EuiModal onClose={onClose} maxWidth={500}>
      <EuiModalHeader>
        <EuiModalHeaderTitle>
          {success ? 'Đăng ký thành công' : 'Đăng ký thất bại'}
        </EuiModalHeaderTitle>
      </EuiModalHeader>

      <EuiModalBody>
        <EuiFlexGroup gutterSize="m" alignItems="center">
          <EuiFlexItem grow={false}>
            <EuiIcon
              type={success ? 'checkInCircleFilled' : 'alert'}
              color={success ? 'success' : 'danger'}
              size="xl"
            />
          </EuiFlexItem>
          <EuiFlexItem>
            {success && data ? (
              <EuiText>
                <p><strong>Thời gian:</strong> {data.time}</p>
                <p><strong>Biển số xe:</strong> {data.plateNumber}</p>
                <p><strong>ID khoá:</strong> {data.lockId}</p>
              </EuiText>
            ) : (
              <EuiText color="danger">
                <p>{error || 'Đã xảy ra lỗi không xác định.'}</p>
              </EuiText>
            )}
          </EuiFlexItem>
        </EuiFlexGroup>
        <EuiSpacer size="m" />
      </EuiModalBody>

      <EuiModalFooter>
        <EuiButton onClick={onClose} fill>
          Đóng
        </EuiButton>
      </EuiModalFooter>
    </EuiModal>
  );
};

export default RegisterSuccess;
