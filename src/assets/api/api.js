// 统一的接口
// api.js就是存放服务端的接口的;
import axios from "axios";

const getpostConfig = function () {
    return {
        headers: {
            contentType: 'application/json',
            authorization: sessionStorage.getItem("token"),
        },
    }
}

/**
 * @description 获取验证码
 * **/
const baseURL = '/api'
export const getCaptchaApi = function () {
    return `${baseURL}/captcha?${Math.random()}`
}



/**
 * @description 获取用户信息
 ***/
export const getUserInfoApi = function (payload = {}) {
    return axios.post('/api/user/info', payload, getpostConfig())
}

/**
 * @description 获取用户信息
 ***/
export const getUserListApi = function (payload = {}) {
    return axios.post('/api/user/list', payload, getpostConfig())
}


/**
 * @description 登录接口
 * @param payload <Object>
 * @param payload.username  用户名
 * @param payload.password  密码
 * @param payload.captcha   验证码
 * @author Wbl
 * **/
export const loginApi = function (payload = {}) {
    return axios.post('/api/user/login', payload, getpostConfig())
}



/**
 * @description 注册接口
 * @param payload <Object>
 * @param payload.username  用户名
 * @param payload.password  密码
 * @param payload.email     邮箱
 * @param payload.phone     手机号
 * @param payload.captcha   验证码
 * @author Wbl
 * **/
export const registerApi = function (payload = {}) {
    return axios.post('/api/user/register', payload,)
}

/**
 * @description 退出接口
 * @author Wbl
 * **/
export const logoutApi = function () {
    var params = {}
    return axios.post('/api/user/logout', params,)
}

/**
 * @description 查询题库列表
 * @param payload <Object>
 * @param payload.type       必填 题目类型
 * @param payload.pagination 非必填 是否需要分页
 * @param payload.pageSize   非必填 每页获取几条数据
 * @param payload.pageNum    非必填 想获取第几页的数据
 * **/
export const getQuestionListApi = function (payload = {}) {
    return axios.post('api/question/list', payload, getpostConfig())
}

/**
 * @description 创建题
 * @param patyload <Object>
 * @param payload.type      题目类型
 * @param payload.title     题目标题
 * @param payload.questionA 选项A
 * @param payload.questionB 选项B
 * @param payload.questionC 非必填 选项C
 * @param payload.questionD 非必填 选项D
 * @param payload.answer    答案
 * @param payload.lever     难度系数
 * **/
export const getQuestionCreateApi = function (payload = {}) {
    return axios.post('api/question/create', payload, getpostConfig())
}

/**
 * @description 修改题
 * @param patyload <Object>
 * @param patyload.id       必填 题目id
 * @param payload.type      必填 题目类型
 * @param payload.title     非必填 题目标题
 * @param payload.questionA 选项A
 * @param payload.questionB 选项B
 * @param payload.questionC 非必填 选项C
 * @param payload.questionD 非必填 选项D
 * @param payload.answer    答案
 * @param payload.lever     难度系数
 * @param 注释： 修改的入参，必传项是id,和type, 其它的参数是修改哪个传哪个，入参的key的数量必须  >= 3；
 * **/
export const getQuestionUpdateApi = function (payload = {}) {
    return axios.post('api/question/update', payload, getpostConfig())
}

/**
 * @description 删除题
 * @param payload <Object>
 * @param patyload.id       必填 题目id
 * **/
export const getQuestionDeleteApi = function (payload = {}) {
    return axios.post('api/question/delete', payload, getpostConfig())
}


/**
 * @description 修改个人信息
 * @param payload.phone        手机号
 * @param payload.email        邮箱
 * @param payload.sex          性别
 * @param payload.avatarName   昵称
 * @param payload.name         真实姓名
 * @param payload.provinceNo   省
 * @param payload.cityNo       市
 * @param payload.area         区
 * @param payload.desc         个人介绍
 * **/

export const getUserUpdateApi = function (payload = {}) {
    return axios.post('api/user/update', payload, getpostConfig())
}

/**
 * @description 创建任务
 * @param payload.name         任务名称
 * @param payload.desc         任务描述
 * @param payload.duration     任务时长
 * **/

export const getTaskCreateApi = function (payload = {}) {
    return axios.post('api/task/create', payload, getpostConfig())
}

/**
 * @description 发布任务
 * **/

export const getTaskReleaseApi = function (payload = {}) {
    return axios.post('api/task/release', payload, getpostConfig())
}

/**
 * @description 查询任务
 * **/

export const getTaskListApi = function (payload = {}) {
    return axios.post('api/task/list', payload, getpostConfig())
}

/**
 * @description 查询任务详情
 * **/

export const getTaskDetailApi = function (payload = {}) {
    return axios.post('api/task/detail', payload, getpostConfig())
}

/**
 * @description 创建角色
 * **/

export const getRoleCreateApi = function (payload = {}) {
    return axios.post('api/role/create', payload, getpostConfig())
}
/**
 * @description 角色分组列表
 * **/

export const getRoleGroupListApi = function (payload = {}) {
    return axios.post('api/roleGroup/list', payload, getpostConfig())
}
/**
 * @description 角色列表
 * **/

export const getRoleListApi = function (payload = {}) {
    return axios.post('api/role/list', payload, getpostConfig())
}
/**
 * @description 角色列表
 * **/

