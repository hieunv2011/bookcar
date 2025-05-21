import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { EuiFieldText, EuiFieldPassword, EuiButton, EuiForm, EuiFormRow, EuiFlexGroup, EuiFlexItem, EuiPanel, EuiText, EuiSpacer, EuiLink, EuiGlobalToastList } from '@elastic/eui';
import backgroundImage from '../assets/login_bg.jpg';
import { useTrainee } from '../hooks/useTrainee';
import { useSetAtom } from 'jotai';
import { globalToastsAtom } from '../atoms/trainee';

const Login = () => {
    const [so_cmt, setSoCmt] = useState('');
    const [password, setPassword] = useState('');
    const { login, loading, error, trainee } = useTrainee();
    const navigate = useNavigate();
    const [toasts, setToasts] = useState<any[]>([]);
    const setGlobalToasts = useSetAtom(globalToastsAtom);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            const res = await login({ so_cmt, password });
            if (res) {
                setGlobalToasts([{
                    id: 'login-success',
                    title: 'Đăng nhập thành công',
                    color: 'success',
                    iconType: 'check',
                }]);
                navigate('/home');
            }
        } catch (err) {
            console.log('Error:', err);
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
                <EuiFlexItem grow={false} style={{ maxWidth: '400px', width: '100%' }}>
                    <EuiPanel paddingSize="xl" style={{ textAlign: 'center', backgroundColor: 'rgba(255, 255, 255, 0.9)' }}>
                        <EuiText style={{fontWeight:'bold'  }}>Hệ thống đặt xe thực hành</EuiText>
                        <EuiSpacer/>
                        <EuiForm component="form" onSubmit={handleSubmit}>
                            <EuiFormRow label="CCCD">
                                <EuiFieldText
                                    placeholder="Nhập số CCCD"
                                    value={so_cmt}
                                    onChange={(e) => setSoCmt(e.target.value)}
                                    required
                                    fullWidth
                                />
                            </EuiFormRow>
                            <EuiFormRow label="Password">
                                <EuiFieldPassword
                                    placeholder="Nhập mật khẩu của bạn"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    // required
                                    fullWidth
                                    type="dual"
                                    aria-label="Password that can be toggled between hidden and shown"
                                />
                            </EuiFormRow>
                            <EuiFormRow>
                                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                    <label style={{ display: 'flex', alignItems: 'center' }}>
                                        <input type="checkbox" style={{ marginRight: '5px' }} />
                                        Ghi nhớ đăng nhập
                                    </label>
                                    <EuiLink href="/forget-password">Quên mật khẩu?</EuiLink>
                                </div>
                            </EuiFormRow>
                            {error && <EuiText color="danger">{error}</EuiText>}
                            <EuiSpacer size='xl'/>
                            <EuiButton type="submit" fill fullWidth isLoading={loading}>
                                Đăng nhập
                            </EuiButton>
                        </EuiForm>
                    </EuiPanel>
                </EuiFlexItem>
            </EuiFlexGroup>
            <EuiText color='white' size='s' style={{ position: 'absolute', bottom: '10px', right: '10px', textAlign: 'right' }}>
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