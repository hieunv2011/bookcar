import React, { useState } from 'react';
import { EuiFieldText, EuiFieldPassword, EuiButton, EuiForm, EuiFormRow, EuiFlexGroup, EuiFlexItem, EuiPanel, EuiText, EuiSpacer, EuiLink } from '@elastic/eui';
import backgroundImage from '../assets/login_bg.jpg';
const ForgetPassword = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Email:', email);
    console.log('Password:', password);
  };

  return (
    <div
      style={{
        backgroundImage: `url(${backgroundImage})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        height: '100vh',
      }}
    >
      <EuiFlexGroup justifyContent="center" alignItems="center" style={{ height: '100vh' }}>
        <EuiFlexItem grow={false} style={{ maxWidth: '400px', width: '100%' }}>
          <EuiPanel paddingSize="xl" style={{ textAlign: 'center', backgroundColor: 'rgba(255, 255, 255, 0.9)' }}>
            <EuiText style={{ fontWeight: 'bold' }}>Đặt lại mật khẩu</EuiText>
            <EuiFormRow>
              <EuiText size='xs'>Đổi mật khẩu mới cho tài khoản <EuiLink>nguyenviethieu@shlx.vn</EuiLink></EuiText>
            </EuiFormRow>
            <EuiSpacer size='m' />
            <EuiForm component="form" onSubmit={handleSubmit}>
              <EuiFormRow label="Nhập mật khẩu mới">
                <EuiFieldPassword
                  placeholder="Nhập mật khẩu mới của bạn"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  fullWidth
                  type="dual"
                  aria-label="Password that can be toggled between hidden and shown"
                />
              </EuiFormRow>
              <EuiFormRow label="Xác nhận mật khẩu mới">
                <EuiFieldPassword
                  placeholder="Xác nhận mật khẩu mới của bạn"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  fullWidth
                  type="dual"
                  aria-label="Password that can be toggled between hidden and shown"
                />
              </EuiFormRow>
              <EuiSpacer size='xl' />
              <EuiButton type="submit" fill fullWidth href='Login'>
                Xác nhận
              </EuiButton>
              <EuiSpacer size='l' />
            </EuiForm>
          </EuiPanel>
        </EuiFlexItem>
      </EuiFlexGroup>
      <EuiText color='white' size='s' style={{ position: 'absolute', bottom: '10px', right: '10px', textAlign: 'right' }}>
        Giải pháp của Toàn Phương SHLX. 0904.666.329 - 0982.911.000. Email: shlx@toanphuong.com.vn
      </EuiText>
    </div>
  );
};

export default ForgetPassword;