import instance from '../js/httputils';
const preUrlPath = 'api/home';
//获取账户列表
const request = {
    p: ['get,/home/index'],
    r: params => {
        return instance.get(`${preUrlPath}/index`, { params })
    }
};

//越权请求
const notAllowed = {
    p: ['get,/roles/notAllowed'],
    r: params => {
        return instance.get(`${preUrlPath}/roles/notAllowed`, { params })
    }
};

export {
    request,
    notAllowed
};