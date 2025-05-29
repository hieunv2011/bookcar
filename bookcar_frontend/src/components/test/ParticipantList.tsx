import React from "react";
import { useParticipantsByTraineeId } from "../../hooks/useParticipantsByTraineeId";
import {
  EuiBasicTable,
  EuiPanel,
  EuiTitle,
  EuiSpacer,
  EuiText,
  EuiSkeletonText,
  EuiSkeletonRectangle,
} from "@elastic/eui";

const ParticipantList: React.FC = () => {
  const trainee = JSON.parse(localStorage.getItem("trainee") || "{}");
  const traineeId = Number(trainee?.id) || 0;

  const { data, isLoading, error } = useParticipantsByTraineeId(traineeId);

  const columns = [
    {
      field: "driving_lesson_id",
      name: "ID buổi học",
    },
    {
      field: "vehicle_plate",
      name: "Biển số xe",
    },
    {
      field: "actual_start_time",
      name: "Thời gian bắt đầu đặt xe",
      render: (time: string) => new Date(time).toLocaleString(),
    },
    {
      field: "actual_end_time",
      name: "Thời gian kết thúc đặt xe",
      render: (time: string) => new Date(time).toLocaleString(),
    },
  ];

  if (traineeId === 0) {
    return <EuiText>Không tìm thấy thông tin học viên.</EuiText>;
  }

  return (
    <EuiPanel paddingSize="m">
      <EuiTitle size="m">
        <h3>Danh sách giờ học đã đặt</h3>
      </EuiTitle>

      <EuiSpacer size="m" />

      {isLoading ? (
        <>
          <EuiSkeletonText lines={1} />
          <EuiSpacer size="s" />
          <EuiSkeletonRectangle height={200} />
        </>
      ) : error ? (
        <EuiText color="danger">Lỗi khi tải dữ liệu</EuiText>
      ) : (
        <EuiBasicTable items={data || []} columns={columns} tableLayout="auto" />
      )}
    </EuiPanel>
  );
};

export default ParticipantList;
