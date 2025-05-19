import React from 'react';
import { EuiPageHeader, EuiButton, EuiAvatar, EuiFlexGroup, EuiFlexItem, EuiPanel, EuiPageBody, EuiSpacer, EuiText, EuiComment, EuiCommentList, EuiCommentProps, EuiButtonIcon, EuiBadge } from '@elastic/eui';
import { Badge, Calendar } from 'antd';

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
    username: 'janed',
    timelineAvatarAriaLabel: 'Jane Doe',
    event: 'added a comment',
    timestamp: 'on Jan 1, 2020',
    children: body,
    actions: copyAction,
  },
  {
    username: 'juanab',
    timelineAvatarAriaLabel: 'Juana Barros',
    actions: copyAction,
    event: 'pushed incident X0Z235',
    timestamp: 'on Jan 3, 2020',
  },
  {
    username: 'pancho1',
    timelineAvatarAriaLabel: 'Pancho Pérez',
    event: 'edited case',
    timestamp: 'on Jan 9, 2020',
    eventIcon: 'pencil',
    eventIconAriaLabel: 'edit',
  },
  {
    username: 'pedror',
    timelineAvatarAriaLabel: 'Pedro Rodriguez',
    actions: copyAction,
    event: complexEvent,
    timestamp: 'on Jan 11, 2020',
    eventIcon: 'tag',
    eventIconAriaLabel: 'tag',
  },
  {
    username: 'Assistant',
    timelineAvatarAriaLabel: 'Assistant',
    timestamp: 'on Jan 14, 2020, 1:39:04 PM',
    children: <p>An error occurred sending your message.</p>,
    actions: copyAction,
    eventColor: 'danger',
  },
];

const Home = () => {
  return (
    <>
      <EuiPageHeader
        pageTitle="Xin chào Nguyễn Văn A"
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
            <EuiPanel>
              <EuiAvatar size="l" name="Cat" imageUrl="https://picsum.photos/id/40/64" />
              <span style={{ padding: '12px', fontWeight: 'bold', fontSize: '24px' }}>Nguyễn Văn A</span>
              <EuiSpacer size='m' />
              <EuiFlexGroup style={{ gap: '16px' }}>
                <EuiFlexItem grow={false} style={{ textAlign: 'left', fontWeight: 'bold', paddingRight: '8px' }}>
                  <div style={{ marginBottom: '12px' }}>Số chứng minh thư</div>
                  <div style={{ marginBottom: '12px' }}>Giới tính</div>
                  <div style={{ marginBottom: '12px' }}>Quốc tịch</div>
                  <div style={{ marginBottom: '12px' }}>Nơi thường trú</div>
                  <div style={{ marginBottom: '12px' }}>Ngày sinh</div>
                  <div>Ngày nhận hồ sơ</div>
                </EuiFlexItem>
                <EuiFlexItem grow={false} style={{ textAlign: 'left' }}>
                  <div style={{ marginBottom: '12px' }}>054079005128</div>
                  <div style={{ marginBottom: '12px' }}>Nam</div>
                  <div style={{ marginBottom: '12px' }}>Việt Nam</div>
                  <div style={{ marginBottom: '12px' }}>196/11/1A Tân Sơn Nhì</div>
                  <div style={{ marginBottom: '12px' }}>01-01-1983</div>
                  <div>2023-12-26</div>
                </EuiFlexItem>
                <EuiSpacer size='xl' />
                <EuiFlexItem grow={false} style={{ textAlign: 'left', fontWeight: 'bold', paddingRight: '8px' }}>
                  <div style={{ marginBottom: '12px' }}>Hạng GPLX đã có</div>
                  <div style={{ marginBottom: '12px' }}>Ngày cấp GPLX</div>
                  <div style={{ marginBottom: '12px' }}>Hạng đào tạo</div>
                  <div style={{ marginBottom: '12px' }}>Mã RF Card</div>
                  <div style={{ marginBottom: '12px' }}>Số hồ sơ</div>
                  <div>Mã khoá học</div>
                </EuiFlexItem>
                <EuiFlexItem grow={false} style={{ textAlign: 'left' }}>
                  <div style={{ marginBottom: '12px' }}>A1</div>
                  <div style={{ marginBottom: '12px' }}>2016-01-28</div>
                  <div style={{ marginBottom: '12px' }}>B2</div>
                  <div style={{ marginBottom: '12px' }}>017</div>
                  <div style={{ marginBottom: '12px' }}>4933</div>
                  <div>2023-12-26</div>
                </EuiFlexItem>
              </EuiFlexGroup>
            </EuiPanel>
          </EuiFlexItem>
          <EuiFlexItem grow={4}>
            <EuiPanel>
              <Calendar fullscreen={false} style={{ width: '100%' }} />
              <EuiSpacer size='l' />
              <Badge count={5}>
                <EuiBadge color="warning">Thông báo</EuiBadge>
              </Badge>
              <EuiSpacer size='l' />
              <div style={{ maxHeight: '300px', overflow: 'auto' }}>
                <EuiCommentList comments={comments} aria-label="Comment list example" />
              </div>
            </EuiPanel>
          </EuiFlexItem>
        </EuiFlexGroup>
      </EuiPageBody>
    </>
  )
}

export default Home