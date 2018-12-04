import utils from './index';
const pathUrl = '/api/user';
const requstAllList = {
    p: ['get,/user/index'],
    r: params => { return utils.get(`${pathUrl}/index?userName=${params.userName}&page=${params.page}`) }
};
//新增是获取默认信息 get
const addAndUpdateGet = {
    p: ['get,/user/add'],
    r: params => { return utils.get(`${pathUrl}/add?Id=${params.id}`, params) }
};
//提交新增/修改 post
const addAndUpdatePost = {
    p: ['post,/user/add'],
    r: params => { return utils.post(`${pathUrl}/add`, params) }
};
//删除
const remove = {
    p: ['get,/user/delete'],
    r: params => { return utils.post(`${pathUrl}/delete?id=${params.Id}`, params) }
};

export {
    requstAllList,
    addAndUpdateGet,
    addAndUpdatePost,
    remove
}
