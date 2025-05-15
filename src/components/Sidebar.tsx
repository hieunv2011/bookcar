import {
  EuiSideNav,
  EuiIcon,
  EuiText,
} from '@elastic/eui';

const Sidebar = () => {
  const items = [
    {
      name: 'SYSTEM',
      id: 'root',
      icon: <EuiIcon type="logoElastic" size="s" />, // Logo icon
      items: [
        {
          name: 'Trang chủ',
          id: 'home',
          href: '/',
        },
        {
          name: 'Người dùng',
          id: 'user',
          items: [
            {
              name: 'Thông tin cá nhân',
              id: 'personal-info',
              href: '/user/personal-info',
              icon: <EuiIcon type="user" />,
            },
            {
              name: 'Hồ sơ cá nhân',
              id: 'profile',
              href: '/user/profile',
              icon: <EuiIcon type="document" />,
            },
          ],
        },
        {
          name: 'Đặt lịch tập lái',
          id: 'schedule',
          items: [
            {
              name: 'Danh sách bài học thực hành',
              id: 'lessons',
              href: '/schedule/lessons',
              icon: <EuiIcon type="calendar" />,
            },
            {
              name: 'Trạng thái đăng ký',
              id: 'registration-status',
              href: '/schedule/registration-status',
              icon: <EuiIcon type="check" />,
            },
            {
              name: 'Đã hoàn thành',
              id: 'completed',
              href: '/schedule/completed',
              icon: <EuiIcon type="checkInCircleFilled" />,
            },
          ],
        },
        {
          name: 'Lịch sát hạch',
          id: 'exam',
          items: [
            {
              name: 'Thông tin lịch sát hạch gần nhất',
              id: 'exam-info',
              href: '/exam/info',
              icon: <EuiIcon type="clock" />,
            },
          ],
        },
        {
          name: 'Cài đặt',
          id: 'settings',
          href: '/settings',
        },
      ],
    },
  ];

  return (
    <div style={{height: '100vh', backgroundColor: '#f5f5f5'}}>
      <EuiSideNav
        items={items}
        mobileTitle="User Sidebar"
        toggleOpenOnMobile={() => {}}
      />
    </div>
  );
};

export default Sidebar;