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
            <EuiText style={{ fontWeight: 'bold' }}>Quên mật khẩu</EuiText>
            <EuiSpacer />
            <EuiForm component="form" onSubmit={handleSubmit}>
              <EuiFormRow label="Email">
                <EuiFieldText
                  placeholder="Nhập email của bạn"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  fullWidth
                />
              </EuiFormRow>
              <EuiSpacer size='xl' />
              <EuiButton type="submit" fill fullWidth href='/reset-password'>
                Đặt lại mật khẩu
              </EuiButton>
              <EuiSpacer size='l' />
              <EuiFormRow>
                <EuiLink href="/">Đăng nhập</EuiLink>
              </EuiFormRow>
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