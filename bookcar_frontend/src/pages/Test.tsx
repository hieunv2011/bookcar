import React, { useState, useEffect, useMemo } from "react";
import { useLocation } from "react-router-dom";
import {
  EuiDataGrid,
  EuiDataGridColumn,
  EuiBadge,
  EuiButton,
  EuiGlobalToastList,
  EuiSkeletonRectangle,
  EuiSpacer,
  EuiCallOut,
} from "@elastic/eui";
import { useDrivingLessonParticipant } from "../hooks/useDrivingLesssonParticipants";
import { DrivingLessonParticipant } from "../api/drivingLessonApi";
import { useRegisterDrivingLessonParticipants } from "../hooks/useRegisterDrivingLessonParticipant";
import ParticipantList from "../components/Test/ParticipantList";

type SelectedCells = Record<string, boolean>;

function generateTimeSlots() {
  const slots: string[] = [];
  let start = 8 * 60;
  const end = 17 * 60;
  while (start < end) {
    const h1 = String(Math.floor(start / 60)).padStart(2, "0");
    const m1 = String(start % 60).padStart(2, "0");
    const h2 = String(Math.floor((start + 30) / 60)).padStart(2, "0");
    const m2 = String((start + 30) % 60).padStart(2, "0");
    slots.push(`${h1}h${m1} - ${h2}h${m2}`);
    start += 30;
  }
  return slots;
}

const timeSlots = generateTimeSlots();
const columns: EuiDataGridColumn[] = [
  { id: "xe", display: "Xe" },
  ...timeSlots.map((slot) => ({ id: slot, display: slot })),
];

function parseSlotToTimes(slot: string, dateString: string) {
  const [startPart, endPart] = slot.split(" - ");
  const startTime = startPart.replace("h", ":");
  const endTime = endPart.replace("h", ":");
  const startDateTime = new Date(`${dateString}T${startTime}:00`);
  const endDateTime = new Date(`${dateString}T${endTime}:00`);
  const formatter = new Intl.DateTimeFormat("en-US", {
    timeZone: "Asia/Ho_Chi_Minh",
    hour12: false,
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
  });
  const formatToISO = (date: Date) => {
    const parts = formatter.formatToParts(date);
    const year = parts.find((p) => p.type === "year")?.value;
    const month = parts.find((p) => p.type === "month")?.value;
    const day = parts.find((p) => p.type === "day")?.value;
    const hour = parts.find((p) => p.type === "hour")?.value;
    const minute = parts.find((p) => p.type === "minute")?.value;
    const second = parts.find((p) => p.type === "second")?.value;
    return `${year}-${month}-${day}T${hour}:${minute}:${second}+07:00`;
  };
  return {
    startDateTime: formatToISO(startDateTime),
    endDateTime: formatToISO(endDateTime),
  };
}

export const Test: React.FC = () => {
  const location = useLocation();
  const lesson = location.state?.lesson;
  const [selectedCells, setSelectedCells] = useState<SelectedCells>({});
  const [toasts, setToasts] = useState<any[]>([]);
  const { data: participant = [], isLoading, error } = useDrivingLessonParticipant(lesson?.id);
  const registerMutation = useRegisterDrivingLessonParticipants();

  // Tính toán bookedCells và carPlates từ participant
  const { bookedCells, carPlates } = useMemo(() => {
    const booked: SelectedCells = {};
    const plates: string[] = [];
    if (participant && Array.isArray(participant)) {
      const grouped = participant.reduce((acc, item: DrivingLessonParticipant) => {
        if (!item.vehicle_plate) return acc;
        if (!acc[item.vehicle_plate]) acc[item.vehicle_plate] = [];
        acc[item.vehicle_plate].push(item);
        return acc;
      }, {} as Record<string, DrivingLessonParticipant[]>);
      Object.keys(grouped).forEach((plate) => plates.push(plate));
      Object.entries(grouped).forEach(([vehicle_plate, items]) => {
        items.forEach((item) => {
          if (item.actual_start_time && item.actual_end_time) {
            let current = new Date(item.actual_start_time);
            const endTime = new Date(item.actual_end_time);
            while (current < endTime) {
              const h1 = String(current.getHours()).padStart(2, "0");
              const m1 = String(current.getMinutes()).padStart(2, "0");
              const next = new Date(current.getTime() + 30 * 60 * 1000);
              if (next > endTime) break;
              const h2 = String(next.getHours()).padStart(2, "0");
              const m2 = String(next.getMinutes()).padStart(2, "0");
              const slot = `${h1}h${m1} - ${h2}h${m2}`;
              booked[`${vehicle_plate}_${slot}`] = true;
              current = next;
            }
          }
        });
      });
    }
    return { bookedCells: booked, carPlates: plates };
  }, [participant]);

  // Khi participant thay đổi, reset selectedCells (chỉ giữ bookedCells)
  useEffect(() => {
    setSelectedCells({ ...bookedCells });
  }, [bookedCells]);

  const addToast = (title: string, color: string) => {
    setToasts((prev) => [...prev, { id: `${Date.now()}`, title, color }]);
  };
  const removeToast = (removedToast: any) => {
    setToasts((prev) => prev.filter((toast) => toast.id !== removedToast.id));
  };

  if (isLoading) {
    return (
      <div style={{ width: "100%", overflowX: "auto" }}>
        <table style={{ width: "100%", borderCollapse: "collapse" }}>
          <thead>
            <tr>
              {columns.map((col) => (
                <th key={col.id} style={{ padding: "8px", textAlign: "left" }}>
                  <EuiSkeletonRectangle width="100px" height="16px" borderRadius="s" />
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {Array.from({ length: 5 }).map((_, rowIdx) => (
              <tr key={rowIdx}>
                {columns.map((col) => (
                  <td key={col.id} style={{ padding: "8px" }}>
                    <EuiSkeletonRectangle width="100%" height="24px" borderRadius="s" />
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    );
  }

  if (error) {
    return <EuiCallOut title="Có lỗi xảy ra khi tải dữ liệu." color="danger" />;
  }

  const rows = carPlates.map((car) => {
    const row: { [key: string]: string } = { xe: car };
    timeSlots.forEach((slot) => {
      row[slot] = selectedCells[`${car}_${slot}`] ? "Đã chọn" : "";
    });
    return row;
  });

  const handleCellClick = (rowIndex: number, columnId: string) => {
    const car = rows[rowIndex].xe;
    const key = `${car}_${columnId}`;
    if (bookedCells[key]) return;
    setSelectedCells((prev) => ({
      ...prev,
      [key]: !prev[key],
    }));
  };

  const renderCellValue = ({ rowIndex, columnId }: any) => {
    const car = rows[rowIndex].xe;
    const key = `${car}_${columnId}`;
    const selected = selectedCells[key];
    const isBooked = bookedCells[key];
    let bgColor = "white";
    if (isBooked) bgColor = "#FACB3D";
    else if (selected) bgColor = "#008A5E";
    return (
      <div
        style={{
          backgroundColor: bgColor,
          width: "100%",
          height: "100%",
          cursor: columnId !== "xe" && !isBooked ? "pointer" : "default",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
        onClick={() =>
          columnId !== "xe" && !isBooked && handleCellClick(rowIndex, columnId)
        }
      >
        {columnId === "xe" ? car : selected ? "✔" : ""}
      </div>
    );
  };

  const handleConfirm = async () => {
    if (!lesson) return;
    const startDateOnly = new Date(lesson.start_date);
    const year = startDateOnly.getFullYear();
    const month = (startDateOnly.getMonth() + 1).toString().padStart(2, "0");
    const day = startDateOnly.getDate().toString().padStart(2, "0");
    const dateString = `${year}-${month}-${day}`;
    const newSelectedEntries = Object.entries(selectedCells).filter(
      ([key, value]) => value && !bookedCells[key]
    );
    const grouped: Record<string, string[]> = {};
    newSelectedEntries.forEach(([key]) => {
      const underscoreIndex = key.indexOf("_");
      const vehicle_plate = key.substring(0, underscoreIndex);
      const slot = key.substring(underscoreIndex + 1);
      if (!grouped[vehicle_plate]) grouped[vehicle_plate] = [];
      grouped[vehicle_plate].push(slot);
    });
    const trainee = JSON.parse(localStorage.getItem("trainee") || "{}");
    const trainee_id = Number(trainee?.id) || 0;
    const results = Object.entries(grouped).flatMap(([vehicle_plate, slots]) =>
      slots.sort().map((slot) => {
        const { startDateTime, endDateTime } = parseSlotToTimes(slot, dateString);
        return {
          trainee_id,
          vehicle_plate,
          actual_start_time: startDateTime,
          actual_end_time: endDateTime,
          driving_lesson_id: Number(lesson?.id),
        };
      })
    );
    registerMutation.mutate(results, {
      onSuccess: () => addToast("Đăng ký thành công", "success"),
      onError: () => addToast("Đăng ký thất bại", "danger"),
    });
  };

  return (
    <div>
      <EuiDataGrid
        aria-label="Lịch chọn xe"
        columns={columns}
        rowCount={rows.length}
        renderCellValue={renderCellValue}
        columnVisibility={{
          visibleColumns: columns.map((c) => c.id),
          setVisibleColumns: () => {},
        }}
        toolbarVisibility={{
          showColumnSelector: false,
          showKeyboardShortcuts: false,
          showDisplaySelector: { allowDensity: true, allowRowHeight: false },
          additionalControls: (
            <div style={{ fontWeight: 500, marginLeft: 16 }}>
              <EuiBadge color="warning">Đã được đặt</EuiBadge>
              <EuiBadge color="success">Đã được chọn</EuiBadge>
              <EuiBadge>{lesson?.start_date}</EuiBadge>
            </div>
          ),
        }}
        gridStyle={{
          border: "all",
          stripes: false,
          rowHover: "highlight",
          header: "shade",
          fontSize: "s",
          cellPadding: "l",
        }}
      />
      <div style={{ marginTop: 24, display: "flex", gap: 8, justifyContent: "flex-end" }}>
        <EuiButton iconType="refresh" color="primary" onClick={() => window.location.reload()}>
          Tải lại
        </EuiButton>
        <EuiButton fill onClick={handleConfirm}>
          Xác nhận
        </EuiButton>
      </div>
      <EuiSpacer size="l" />
      <ParticipantList />
      <EuiGlobalToastList toasts={toasts} dismissToast={removeToast} toastLifeTimeMs={6000} />
    </div>
  );
};

export default Test;
