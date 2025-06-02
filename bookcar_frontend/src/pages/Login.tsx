import React, { useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  EuiFieldText,
  EuiFieldPassword,
  EuiButton,
  EuiForm,
  EuiFormRow,
  EuiFlexGroup,
  EuiFlexItem,
  EuiPanel,
  EuiText,
  EuiSpacer,
  EuiLink,
  EuiGlobalToastList,
} from '@elastic/eui';
import backgroundImage from '../assets/login_bg.jpg';
import { useUser } from '../hooks/useUser';
import { useSetAtom } from 'jotai';
import { globalUserToastsAtom } from '../atoms/user';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { login: loginUser, loading: loadingUser, error: errorUser } = useUser();
  const setGlobalUserToasts = useSetAtom(globalUserToastsAtom);
  const [toasts, setToasts] = useState<any[]>([]);
  const navigate = useNavigate();

  // Fix for React 19 compatibility
  const formRef = useRef<HTMLFormElement>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const res = await loginUser({ email, password });
      if (res) {
        setGlobalUserToasts([
          {
            id: 'login-success',
            title: 'Đăng nhập thành công !',
            color: 'success',
            iconType: 'check',
          },
        ]);
        navigate('/user-home');
      }
    } catch (err) {
      setToasts([
        {
          id: 'login-error',
          title: 'Lỗi đăng nhập',
          color: 'danger',
          iconType: 'alert',
          text: <p>{(err as Error).message || 'Có lỗi xảy ra, vui lòng thử lại'}</p>,
        },
      ]);
      console.error('Error:', err);
    }
  };

  return (
    <>
      <div
        style={{
          backgroundImage: `url(${backgroundImage})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          height: '100vh',
        }}
      >
        <EuiFlexGroup justifyContent="center" alignItems="center" style={{ height: '100vh' }}>
          <EuiFlexItem grow={false} style={{ maxWidth: '420px', width: '100%' }}>
            <EuiPanel
              paddingSize="xl"
              style={{ textAlign: 'center', backgroundColor: 'rgba(255, 255, 255, 0.9)' }}
            >
              <EuiText style={{ fontWeight: 'bold' }}>Hệ thống đặt xe thực hành</EuiText>
              <EuiSpacer size="l" />

              <EuiForm component="form" onSubmit={handleSubmit} ref={formRef}>
                <EuiFormRow label="Email">
                  <EuiFieldText
                    placeholder="Nhập email của bạn..."
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    fullWidth
                  />
                </EuiFormRow>
                <EuiFormRow label="Mật khẩu">
                  <EuiFieldPassword
                    placeholder="Nhập mật khẩu của bạn"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    fullWidth
                    type="dual"
                    aria-label="Password that can be toggled between hidden and shown"
                  />
                </EuiFormRow>
                <EuiFormRow>
                  <div
                    style={{
                      display: 'flex',
                      justifyContent: 'space-between',
                      alignItems: 'center',
                    }}
                  >
                    <label style={{ display: 'flex', alignItems: 'center' }}>
                      <input type="checkbox" style={{ marginRight: '5px' }} />
                      Ghi nhớ đăng nhập
                    </label>
                    <EuiLink href="/forget-password">Quên mật khẩu?</EuiLink>
                  </div>
                </EuiFormRow>
                {errorUser && <EuiText color="danger">{errorUser}</EuiText>}
                <EuiSpacer size="xl" />
                <EuiButton type="submit" fill fullWidth isLoading={loadingUser}>
                  Đăng nhập
                </EuiButton>
              </EuiForm>
            </EuiPanel>
          </EuiFlexItem>
        </EuiFlexGroup>
        <EuiText
          color="white"
          size="s"
          style={{ position: 'absolute', bottom: '10px', right: '10px', textAlign: 'right' }}
        >
          Giải pháp của Toàn Phương SHLX. 0904.666.329 - 0982.911.000. Email: shlx@toanphuong.com.vn
        </EuiText>
      </div>
      <EuiGlobalToastList
        toasts={toasts}
        dismissToast={() => setToasts([])}
        toastLifeTimeMs={3000}
      />
    </>
  );
};

export default Login;
