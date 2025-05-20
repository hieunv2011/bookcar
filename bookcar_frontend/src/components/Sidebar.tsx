import React from 'react';
import {
  EuiCollapsibleNavGroup,
  EuiListGroup,
  EuiListGroupProps,
  EuiPinnableListGroup,
  EuiPinnableListGroupItemProps,
  EuiSpacer,
} from '@elastic/eui';

const deploymentsList: EuiListGroupProps['listItems'] = [
  {
    label: 'Học lý thuyết',
    iconType: 'logoAzureMono',
    size: 's',
  },
  {
    label: 'stack-monitoring',
    iconType: 'logoAWSMono',
    size: 's',
  },
];

const TopNavLinks: EuiPinnableListGroupItemProps[] = [
  {
    label: 'Trang chủ',
    iconType: 'home',
    isActive: true,
    pinnable: false,
    href: '/home',
  },
];

const KibanaNavLinks: EuiPinnableListGroupItemProps[] = [
  { label: 'Thông tin cá nhân' },
  { label: 'Hồ sơ cá nhân' },
];
const BookNavLinks: EuiPinnableListGroupItemProps[] = [
  { label: 'Danh sách bài học thực hành', href: '/lesson-list' },
  { label: 'Đăng ký xe thực hành' },
  { label: 'Bài học đã hoàn thành' },
];

const DeploymentsGroup = (
  <EuiCollapsibleNavGroup
    title={
      <span>
        <small style={{ fontWeight: 'normal' }}>Trung tâm SHLX XXX</small> <br />
        <strong>Hệ thống đặt xe thực hành</strong>
      </span>
    }
    iconType="logoGCPMono"
    iconSize="xl"
    isCollapsible={true}
    initialIsOpen={false}
    background="light"
  >
    <EuiListGroup listItems={deploymentsList} flush />
    <EuiSpacer size="s" />
  </EuiCollapsibleNavGroup>
);

const Sidebar = () => (
  <>
    {DeploymentsGroup}
    <EuiCollapsibleNavGroup background="light">
      <EuiPinnableListGroup
        listItems={TopNavLinks}
        onPinClick={() => {}}
        maxWidth="none"
        color="text"
        gutterSize="none"
        size="s"
      />
    </EuiCollapsibleNavGroup>
    <EuiCollapsibleNavGroup
      title="Người dùng"
      iconType="users"
      isCollapsible={true}
      initialIsOpen={true}
    >
      <EuiPinnableListGroup
        listItems={KibanaNavLinks}
        onPinClick={() => {}}
        maxWidth="none"
        color="subdued"
        gutterSize="none"
        size="s"
      />
    </EuiCollapsibleNavGroup>
    <EuiCollapsibleNavGroup
      title="Đặt lịch tập lái"
      iconType="calendar"
      isCollapsible={true}
      initialIsOpen={true}
    >
      <EuiPinnableListGroup
        listItems={BookNavLinks}
        onPinClick={() => {}}
        maxWidth="none"
        color="subdued"
        gutterSize="none"
        size="s"
      />
    </EuiCollapsibleNavGroup>
  </>
);

export default Sidebar;