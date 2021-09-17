import { Form, Input, Button, Checkbox,Result } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory, useLocation } from 'react-router';
import { LoginForm } from '../types/user';
import { login } from '../store/actions/userActions';
import api from '../utils/api';
import showError from '../utils/showError';
import { AppState } from '../store';
import { useEffect } from 'react';
import showSuccess from '../utils/showSuccess';


function Login() {
    const history = useHistory();
    const location =useLocation<{newSignUp?:boolean}>();
    const dispatch = useDispatch();

    //kullanıcı giriş yaptığında data içerisinde username değeri olacak, başlangıç değeri boş obje, datada username varsa kullanıcı giriş yapmış demektir
    const{data,loading,error} = useSelector((state: AppState) => state.user)

    const onFinish =(values: LoginForm) =>{
        dispatch(login(values));
    }

    useEffect(() =>{
        error && showError(error) //error varsa error ekranında gösterir
    },[error]);

    useEffect(()=>{
        data.username && showSuccess("you have successfully logged in");
    },[data.username]);

    useEffect(()=>{
        const token = localStorage.getItem("token");
        if(token){
            history.push("/");
        }
    },[data]);//kullanıcı her değiştiğinde data'yı kontrol et


    // const onFinish = async (values: any) => {
    //     console.log('Success:', values);
    //     try{
    //         await api.post("/users/login", values);
    //         history.push("/");
    //     }
    //     catch(error){
    //         console.log(error);
    //     }
    // };

    // const onFinishFailed = (errorInfo: any) => {
    //     console.log('Failed:', errorInfo);
    //     showError(errorInfo);
    // };

    return (
        <Form
            name="basic"
            labelCol={{ span: 8 }}
            wrapperCol={{ span: 16 }}
            initialValues={{ remember: true }}
            onFinish={onFinish}
            //onFinishFailed={onFinishFailed}
        >
            <h2 style={{textAlign:"center", marginBottom:40}}>
                Please Login
            </h2>
            {location.state?.newSignUp && 
                <Result
                status="success"
                title="You successfully signed up. "
                subTitle="Please login using your credentials."
              />
              }
            <Form.Item
                label="Username"
                name="username"
                rules={[{ required: true, message: 'Please input your username!' }]}
            >
                <Input />
            </Form.Item>

            <Form.Item
                label="Password"
                name="password"
                rules={[{ required: true, message: 'Please input your password!' }]}
            >
                <Input.Password />
            </Form.Item>


            <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
                <Button type="primary" htmlType="submit">
                    Submit
                </Button>
            </Form.Item>
        </Form>
    );
}
export default Login;
