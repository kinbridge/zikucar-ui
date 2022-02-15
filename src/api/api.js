const baseUrl = '/think/';
export default {
    user: {
        register: baseUrl + 'user/register',
        login: baseUrl + 'user/login',
        list: baseUrl + 'user/list',
        pageList: baseUrl + 'user/pageList',
        getById: baseUrl + 'user/getById',
        edit: baseUrl + 'user/edit',
        editUserStatus: baseUrl + 'user/editUserStatus'
    },
    attach: {
        list: baseUrl + 'attach/list',
        pageList: baseUrl + 'attach/pageList',
        getById: baseUrl + 'attach/getById',
        add: baseUrl + 'attach/add',
        update: baseUrl + 'attach/update',
        upload: baseUrl + 'attach/upload',
        deleteById: baseUrl + 'attach/deleteById'
    },
    dept: {
        list: baseUrl + 'dept/list',
        pageList: baseUrl + 'dept/pageList',
        getById: baseUrl + 'dept/getById',
        add: baseUrl + 'dept/add',
        update: baseUrl + 'dept/update',
        deleteById: baseUrl + 'dept/deleteById'
    },
    position: {
        list: baseUrl + 'position/list',
        pageList: baseUrl + 'position/pageList',
        getById: baseUrl + 'position/getById',
        add: baseUrl + 'position/add',
        update: baseUrl + 'position/update',
        deleteById: baseUrl + 'position/deleteById'
    },
    thinkBaseInfo: {
        list: baseUrl + 'thinkBaseInfo/list',
        pageList: baseUrl + 'thinkBaseInfo/pageList',
        getById: baseUrl + 'thinkBaseInfo/getById',
        add: baseUrl + 'thinkBaseInfo/add',
        update: baseUrl + 'thinkBaseInfo/update',
        deleteById: baseUrl + 'thinkBaseInfo/deleteById'
    },
    thinkType: {
        list: baseUrl + 'thinkType/list',
        pageList: baseUrl + 'thinkType/pageList',
        getById: baseUrl + 'thinkType/getById',
        add: baseUrl + 'thinkType/add',
        update: baseUrl + 'thinkType/update',
        deleteById: baseUrl + 'thinkType/deleteById'
    },
    website: {
        queryWebsiteNum: baseUrl + 'website/queryWebsiteNum',
    }

}
