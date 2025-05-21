import React, { ReactNode, useState, useEffect } from 'react';
import {
  EuiBasicTable,
  EuiBasicTableColumn,
  EuiButtonIcon,
  EuiBadge,
  EuiPageHeader,
  EuiPanel,
  EuiPageBody,
  EuiSpacer,
} from '@elastic/eui';
import RegisterModal from '../components/RegisterModal';
import { useDrivingLessonsByCourse } from '../hooks/useDrivingLessonsByCourse';

interface Lesson {
  id: string;
  start_date: string;
  instructor_id: string;
  instructor_name: string;
  required_time: string;
  level: string;
  order_status: ReactNode;
  action: ReactNode;
}

const items: Lesson[] = [
  {
    id: '1',
    start_date: '2025-05-01',
    instructor_id: '101',
    instructor_name: 'Nguyen Van A',
    required_time: '2 ',
    level: 'B1',
    order_status: <EuiBadge color="success">Thành công</EuiBadge>,
    action: <EuiButtonIcon iconType="pencil" aria-label="Edit" onClick={() => alert('Edit item 1')} />,
  },
  {
    id: '2',
    start_date: '2025-05-02',
    instructor_id: '102',
    instructor_name: 'Tran Thi B',
    required_time: '3 ',
    level: 'C',
    order_status: <EuiBadge color="danger">Chưa thành công</EuiBadge>,
    action: <EuiButtonIcon iconType="pencil" aria-label="Edit" onClick={() => alert('Edit item 2')} />,
  },
  {
    id: '3',
    start_date: '2025-05-03',
    instructor_id: '103',
    instructor_name: 'Le Van C',
    required_time: '1.5 ',
    level: 'D',
    order_status: <EuiBadge color="success">Thành công</EuiBadge>,
    action: <EuiButtonIcon iconType="pencil" aria-label="Edit" onClick={() => alert('Edit item 3')} />,
  },
  {
    id: '4',
    start_date: '2025-05-04',
    instructor_id: '104',
    instructor_name: 'Pham Thi D',
    required_time: '2.5 ',
    level: 'B2',
    order_status: <EuiBadge color="danger">Chưa thành công</EuiBadge>,
    action: <EuiButtonIcon iconType="pencil" aria-label="Edit" onClick={() => alert('Edit item 4')} />,
  },
  {
    id: '4',
    start_date: '2025-05-04',
    instructor_id: '104',
    instructor_name: 'Pham Thi D',
    required_time: '2.5 ',
    level: 'B2',
    order_status: <EuiBadge color="danger">Chưa thành công</EuiBadge>,
    action: <EuiButtonIcon iconType="pencil" aria-label="Edit" onClick={() => alert('Edit item 4')} />,
  },
  {
    id: '4',
    start_date: '2025-05-04',
    instructor_id: '104',
    instructor_name: 'Pham Thi D',
    required_time: '2.5 ',
    level: 'B2',
    order_status: <EuiBadge color="danger">Chưa thành công</EuiBadge>,
    action: <EuiButtonIcon iconType="pencil" aria-label="Edit" onClick={() => alert('Edit item 4')} />,
  },
  {
    id: '4',
    start_date: '2025-05-04',
    instructor_id: '104',
    instructor_name: 'Pham Thi D',
    required_time: '2.5 ',
    level: 'B2',
    order_status: <EuiBadge color="danger">Chưa thành công</EuiBadge>,
    action: <EuiButtonIcon iconType="pencil" aria-label="Edit" onClick={() => alert('Edit item 4')} />,
  },
];

const columns: Array<EuiBasicTableColumn<Lesson>> = [
  {
    field: 'id',
    name: 'ID bài học',
    sortable: true,
  },
  {
    field: 'start_date',
    name: 'Ngày diễn ra',
    sortable: true,
  },
  {
    field: 'instructor_id',
    name: 'ID giảng viên',
    sortable: true,
  },
  {
    field: 'instructor_name',
    name: 'Tên giảng viên',
  },
  {
    field: 'required_time',
    name: 'Thời gian yêu cầu (giờ)',
  },
  {
    field: 'level',
    name: 'Hạng lái xe',
  },
  {
    field: 'order_status',
    name: 'Trạng thái đặt xe',
    render: (status: ReactNode) => status,
  },
  {
    field: 'action',
    name: 'Thao tác',
    render: (action: ReactNode) => action,
  },
];

const LessionList = () => {
  const [pageIndex, setPageIndex] = useState(0);
  const [pageSize, setPageSize] = useState(5);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const { lessons, loading, error } = useDrivingLessonsByCourse(10);

  useEffect(() => {
    if (!loading && !error) {
      // console.log('Driving lessons:', lessons);
    }
  }, [lessons, loading, error]);

  const onTableChange = ({ page }: { page: { index: number; size: number } }) => {
    setPageIndex(page.index);
    setPageSize(page.size);
  };

  const pagination = {
    pageIndex,
    pageSize,
    totalItemCount: items.length,
    pageSizeOptions: [5, 10, 20],
    hidePerPageOptions: false,
  };

  const handleEditClick = () => {
    setIsModalVisible(true);
  };

  const handleCloseModal = () => {
    setIsModalVisible(false);
  };

  const itemsWithEditAction = items.map((item) => ({
    ...item,
    action: (
      <EuiButtonIcon
        iconType="pencil"
        aria-label="Edit"
        onClick={handleEditClick}
      />
    ),
  }));

  return (
    <>
      <EuiPageHeader
        pageTitle="Danh sách bài học sát hạch"
        description="Hệ thống đặt lịch sát hạch tập lái- Trung tâm SHLX AAA"
        rightSideItems={[
          <EuiButtonIcon iconType="plusInCircle" aria-label="Add new lesson" onClick={() => alert('Add new lesson')} />,
        ]}
      />
      <EuiSpacer size="l" />
      <EuiPageBody>
        <EuiPanel>
          <EuiBasicTable
            items={itemsWithEditAction.slice(pageIndex * pageSize, (pageIndex + 1) * pageSize)}
            columns={columns}
            tableCaption="Danh sách bài học sát hạch"
            pagination={pagination}
            onChange={onTableChange}
          />
        </EuiPanel>
      </EuiPageBody>
      {isModalVisible && <RegisterModal isVisible={isModalVisible} onClose={handleCloseModal} />}
    </>
  );
};

export default LessionList;