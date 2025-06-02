import React from "react";
import {
  EuiPageHeader,
  EuiButton,
  EuiAvatar,
  EuiFlexGroup,
  EuiFlexItem,
  EuiPanel,
  EuiPageBody,
  EuiSpacer,
  EuiText,
  EuiCommentList,
  EuiCommentProps,
  EuiButtonIcon,
  EuiBadge,
  EuiGlobalToastList,
  EuiBasicTable,
} from "@elastic/eui";
import { Badge, Calendar } from "antd";
import { useAtom } from "jotai";
import { globalTraineeToastsAtom } from "../atoms/trainee";

const body = (
  <EuiText size="s">
    <p>
      Far out in the uncharted backwaters of the unfashionable end of the
      western spiral arm of the Galaxy lies a small unregarded yellow sun.
    </p>
  </EuiText>
);

const copyAction = (
  <EuiButtonIcon
    title="Custom action"
    aria-label="Custom action"
    color="text"
    iconType="copy"
  />
);

const complexEvent = (
  <EuiFlexGroup responsive={false} alignItems="center" gutterSize="xs" wrap>
    <EuiFlexItem grow={false}>added tags</EuiFlexItem>
    <EuiFlexItem grow={false}>
      <EuiBadge>case</EuiBadge>
    </EuiFlexItem>
    <EuiFlexItem grow={false}>
      <EuiBadge>phishing</EuiBadge>
    </EuiFlexItem>
    <EuiFlexItem grow={false}>
      <EuiBadge>security</EuiBadge>
    </EuiFlexItem>
  </EuiFlexGroup>
);

const comments: EuiCommentProps[] = [
  {
    username: "janed",
    timelineAvatarAriaLabel: "Jane Doe",
    event: "added a comment",
    timestamp: "on Jan 1, 2020",
    children: body,
    actions: copyAction,
  },
  {
    username: "juanab",
    timelineAvatarAriaLabel: "Juana Barros",
    actions: copyAction,
    event: "pushed incident X0Z235",
    timestamp: "on Jan 3, 2020",
  },
  {
    username: "pancho1",
    timelineAvatarAriaLabel: "Pancho Pérez",
    event: "edited case",
    timestamp: "on Jan 9, 2020",
    eventIcon: "pencil",
    eventIconAriaLabel: "edit",
  },
  {
    username: "pedror",
    timelineAvatarAriaLabel: "Pedro Rodriguez",
    actions: copyAction,
    event: complexEvent,
    timestamp: "on Jan 11, 2020",
    eventIcon: "tag",
    eventIconAriaLabel: "tag",
  },
  {
    username: "Assistant",
    timelineAvatarAriaLabel: "Assistant",
    timestamp: "on Jan 14, 2020, 1:39:04 PM",
    children: <p>An error occurred sending your message.</p>,
    actions: copyAction,
    eventColor: "danger",
  },
];

const keyLabels: Record<string, string> = {
  anh_chan_dung: "Ảnh chân dung",
  anh_chan_dung_url: "URL ảnh chân dung",
  auto_duration: "Thời gian lái tự động",
  chat_luong_anh: "Chất lượng ảnh",
  course_id: "Mã khoá học",
  created_by: "Người tạo",
  created_date: "Ngày tạo",
  dv_cap_gplx_daco: "Đơn vị cấp GPLX đã có",
  face_count: "Số lần nhận diện khuôn mặt",
  faceid_failed_count: "Số lần nhận diện khuôn mặt thất bại",
  faceid_success_count: "Số lần nhận diện khuôn mặt thành công",
  fingerprint_count: "Số lần quét vân tay",
  giay_cnsk: "Giấy CN sức khoẻ",
  gioi_tinh: "Giới tính",
  hang_daotao: "Hạng đào tạo",
  hang_gplx: "Hạng GPLX",
  hang_gplx_da_co: "Hạng GPLX đã có",
  hinh_thuc_cap: "Hình thức cấp",
  ho_ten_dem: "Họ tên đệm",
  ho_va_ten: "Họ và tên",
  ho_va_ten_in: "Họ và tên in",
  id: "ID",
  inactive_face_count: "Số lần không nhận diện khuôn mặt",
  indoor_hour: "Giờ học trong nhà",
  lms_status: "Trạng thái LMS",
  ma_dk: "Mã đăng ký",
  ma_dv_nhan_hoso: "Mã đơn vị nhận hồ sơ",
  ma_loai_hoso: "Mã loại hồ sơ",
  ma_noi_hoc_laixe: "Mã nơi học lái xe",
  ma_quoc_tich: "Mã quốc tịch",
  nam_hoc_laixe: "Năm học lái xe",
  ngay_cap_cmt: "Ngày cấp CMT",
  ngay_cap_gplx_daco: "Ngày cấp GPLX đã có",
  ngay_hh_gplx_daco: "Ngày hết hạn GPLX đã có",
  ngay_nhan_hoso: "Ngày nhận hồ sơ",
  ngay_sinh: "Ngày sinh",
  ngay_thu_nhan_anh: "Ngày thu nhận ảnh",
  ngay_tt_gplx_daco: "Ngày TT GPLX đã có",
  nguoi_nhan_hoso: "Người nhận hồ sơ",
  nguoi_thu_nhan_anh: "Người thu nhận ảnh",
  night_duration: "Thời gian lái ban đêm",
  noi_cap_cmt: "Nơi cấp CMT",
  noi_cap_gplx_daco: "Nơi cấp GPLX đã có",
  noi_ct: "Nơi cư trú",
  noi_ct_ma_dvhc: "Mã DVHC nơi cư trú",
  noi_ct_ma_dvql: "Mã DVQL nơi cư trú",
  noi_tt: "Nơi thường trú",
  noi_tt_ma_dvhc: "Mã DVHC nơi thường trú",
  noi_tt_ma_dvql: "Mã DVQL nơi thường trú",
  outdoor_distance: "Quãng đường ngoài trời",
  outdoor_hour: "Giờ học ngoài trời",
  outdoor_session_count: "Số buổi học ngoài trời",
  password: "Mật khẩu",
  rfid_card: "Mã thẻ RFID",
  rfid_card_name: "Tên thẻ RFID",
  so_cmt: "Số CCCD",
  so_gplx_da_co: "Số GPLX đã có",
  so_ho_so: "Số hồ sơ",
  so_km_antoan: "Số km an toàn",
  so_nam_laixe: "Số năm lái xe",
  so_tt: "Số thứ tự",
  status1: "Trạng thái 1",
  status2: "Trạng thái 2",
  sync_error: "Lỗi đồng bộ",
  synced: "Đã đồng bộ",
  synced_outdoor_distance: "Quãng đường ngoài trời đã đồng bộ",
  synced_outdoor_hours: "Giờ ngoài trời đã đồng bộ",
  synced_outdoor_status: "Trạng thái ngoài trời đã đồng bộ",
  synced_verified_date: "Ngày xác thực đã đồng bộ",
  ten: "Tên",
  ten_dv_cap_gplx_daco: "Tên đơn vị cấp GPLX đã có",
  ten_dv_nhan_hoso: "Tên đơn vị nhận hồ sơ",
  ten_loai_hoso: "Tên loại hồ sơ",
  ten_noi_hoc_laixe: "Tên nơi học lái xe",
  ten_quoc_tich: "Quốc tịch",
  updated_by: "Người cập nhật",
  updated_date: "Ngày cập nhật",
};

const Home = () => {
  const [toasts, setToasts] = useAtom(globalTraineeToastsAtom);
  // Lấy trainee từ localStorage thay vì atom
  const trainee = React.useMemo(() => {
    const saved = localStorage.getItem('trainee');
    return saved ? JSON.parse(saved) : null;
  }, []);

  const hiddenKeys = ["password", "id", "created_by", "updated_by"];
  const traineeData = trainee
    ? Object.entries(trainee)
        .filter(([key]) => !hiddenKeys.includes(key))
        .map(([key, value]) => ({
          key,
          value:
            key === "anh_chan_dung" && value ? (
              <img
                src={value as string}
                alt="Ảnh chân dung"
                style={{ maxWidth: 120, maxHeight: 120, borderRadius: 8 }}
              />
            ) : value === null ? (
              ""
            ) : (
              String(value)
            ),
        }))
    : [];

  const columns = [
    {
      field: "key",
      name: "Trường",
      width: "30%",
      render: (key: string) => {
        // Đổi tên trường cho dễ đọc nếu muốn
        return keyLabels[key] || key;
      },
    },
    {
      field: "value",
      name: "Giá trị",
      render: (value: any, item: any) => value,
    },
  ];

  return (
    <>
      <EuiPageHeader
        pageTitle={`Xin chào ${trainee?.ho_va_ten || ""}`}
        description="Hệ thống đặt lịch sát hạch tập lái- Trung tâm SHLX AAA"
        rightSideItems={[
          <EuiButton fill>Add something</EuiButton>,
          <EuiButton>Do something</EuiButton>,
        ]}
      />
      <EuiSpacer size="l" />
      <EuiPageBody>
        <EuiFlexGroup>
          <EuiFlexItem grow={6}>
            <EuiPanel style={{ maxHeight: 700, overflowY: "auto" }}>
              <EuiText
                style={{ fontWeight: "bold", fontSize: 20, marginBottom: 16 }}
              >
                Thông tin học viên
              </EuiText>
              <EuiBasicTable
                items={traineeData}
                columns={columns}
                tableLayout="auto"
                rowHeader="key"
              />
            </EuiPanel>
          </EuiFlexItem>
          <EuiFlexItem grow={4}>
            <EuiPanel>
              <Calendar fullscreen={false} style={{ width: "100%" }} />
              <EuiSpacer size="l" />
              <Badge count={5}>
                <EuiBadge color="warning">Thông báo</EuiBadge>
              </Badge>
              <EuiSpacer size="l" />
              <div style={{ maxHeight: "300px", overflow: "auto" }}>
                <EuiCommentList
                  comments={comments}
                  aria-label="Comment list example"
                />
              </div>
            </EuiPanel>
          </EuiFlexItem>
        </EuiFlexGroup>
      </EuiPageBody>
      <EuiGlobalToastList
        toasts={toasts}
        dismissToast={() => setToasts([])}
        toastLifeTimeMs={3000}
      />
    </>
  );
};

export default Home;
