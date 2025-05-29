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
  EuiLink,
} from '@elastic/eui';
import { useNavigate } from 'react-router-dom';
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

const LessionList = () => {
  const navigate = useNavigate();

  const columns: Array<EuiBasicTableColumn<Lesson>> = [
    {
      field: 'id',
      name: 'ID bài học',
      sortable: true,
      render: (id: string, item: Lesson) => (
        <EuiLink
          onClick={() =>
            navigate(`/test`, {
              state: {
                lesson: {
                  id: item.id,
                  start_date: item.start_date,
                  instructor_id: item.instructor_id,
                  instructor_name: item.instructor_name,
                  required_time: item.required_time,
                  level: item.level,
                },
              },
            })
          }
        >
          {id}
        </EuiLink>
      ),
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

  const [pageIndex, setPageIndex] = useState(0);
  const [pageSize, setPageSize] = useState(10);

  // Lấy danh sách course_ids từ localStorage
  const trainee = React.useMemo(() => {
    const saved = localStorage.getItem('trainee');
    return saved ? JSON.parse(saved) : null;
  }, []);
  const courseIds: number[] = trainee?.course_ids || [];

  // Lấy tất cả lessons của các course_id
  const [allLessons, setAllLessons] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!courseIds.length) return;
    setLoading(true);
    setError(null);
    // Dùng API trực tiếp thay vì hook
    import('../api/drivingLessonApi').then(({ getDrivingLessonsByCourse }) => {
      Promise.all(courseIds.map(id => getDrivingLessonsByCourse(id)))
        .then(results => {
          setAllLessons(results.flat());
        })
        .catch(e => setError('Lỗi khi tải danh sách bài học'))
        .finally(() => setLoading(false));
    });
  }, [JSON.stringify(courseIds)]);

  useEffect(() => {
    if (!loading && !error) {
      // console.log('Driving lessons:', allLessons);
    }
  }, [allLessons, loading, error]);

  const onTableChange = ({ page }: { page: { index: number; size: number } }) => {
    setPageIndex(page.index);
    setPageSize(page.size);
  };


  // Chuẩn hóa dữ liệu lessons từ backend để hiển thị lên bảng, sort theo id tăng dần
  const lessonsTableData = allLessons
    .map((lesson) => {
      let statusLabel = '';
      let statusColor: 'success' | 'warning' | 'danger';
      if (lesson.status === 'scheduled') {
        statusLabel = 'Thành công';
        statusColor = 'success';
      } else if (lesson.status === 'processing') {
        statusLabel = 'Đang xử lý';
        statusColor = 'warning';
      } else {
        statusLabel = 'Chưa đặt xe';
        statusColor = 'danger';
      }
      return {
        id: lesson.id,
        start_date: lesson.lesson_date ? new Date(lesson.lesson_date).toLocaleString() : '',
        instructor_id: lesson.instructor_id || '',
        instructor_name: lesson.instructor_name || '',
        required_time: lesson.duration ? lesson.duration + ' phút' : '',
        level: lesson.level || '',
        order_status: <EuiBadge color={statusColor}>{statusLabel}</EuiBadge>,
        action: (
          <EuiButtonIcon
            iconType="pencil"
            aria-label="Edit"
          />
        ),
      };
    })
    .sort((a, b) => Number(a.id) - Number(b.id));

  const pagination = {
    pageIndex,
    pageSize,
    totalItemCount: lessonsTableData.length,
    pageSizeOptions: [10, 20, 30],
    hidePerPageOptions: false,
  };

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
            items={lessonsTableData.slice(pageIndex * pageSize, (pageIndex + 1) * pageSize)}
            columns={columns}
            tableCaption="Danh sách bài học sát hạch"
            pagination={pagination}
            onChange={onTableChange}
            loading={loading}
          />
        </EuiPanel>
      </EuiPageBody>
  
    </>
  );
};

export default LessionList;