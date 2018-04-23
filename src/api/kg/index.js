import instance from './instance'
import {convertRESTAPI} from '../util'

/** 登出 */
function user_logout_get(opts) {
  return instance({
    method: 'get',
    url: '/user/logout',
    opts: opts
  })
}

/** 登陆 username,password */
function user_login_post(opts) {
  return instance({
    method: 'post',
    url: '/user/login',
    opts: opts
  })
}

/** 获得属性信息searchStr，10项 */
function attributes_keys(opts) {
  return instance({
    method: 'get',
    url: convertRESTAPI('/models/:mid/attributes/keys', opts),
    opts: opts
  })
}

/** 获得用户信息 */
function user_get(opts) {
  return instance({
    method: 'get',
    url: '/user',
    opts: opts
  })
}

/** 获得属性信息 */
function attributes_id_get(opts) {
  return instance({
    method: 'get',
    url: convertRESTAPI('/attributes/:id', opts),
    opts: opts
  })
}

/** 删除模型 */
function models_id_delete(opts) {
  return instance({
    method: 'delete',
    url: convertRESTAPI('/models/:id', opts),
    opts: opts
  })
}

/** 更新模型json */
function models_id_post(opts) {
  return instance({
    method: 'post',
    url: convertRESTAPI('/models/:id', opts),
    opts: opts
  })
}

/** 新建模型json */
function models_post(opts) {
  return instance({
    method: 'post',
    url: '/models',
    opts: opts
  })
}

/** 获得模型信息 */
function models_id_get(opts) {
  return instance({
    method: 'get',
    url: convertRESTAPI('/models/:id', opts),
    opts: opts
  })
}

/** 获得模型列表searchStr&page */
function models_get(opts) {
  return instance({
    method: 'get',
    url: '/models',
    opts: opts
  })
}

/** 删除实体关系 */
function relations_id_delete(opts) {
  return instance({
    method: 'delete',
    url: convertRESTAPI('/relations/:id', opts),
    opts: opts
  })
}

/** 新建实体关系json */
function entitys_id_relations_post(opts) {
  return instance({
    method: 'post',
    url: convertRESTAPI('/entitys/:id/relations', opts),
    opts: opts
  })
}

/** 获得实体关系 */
function entitys_id_relations_get(opts) {
  return instance({
    method: 'get',
    url: convertRESTAPI('/entitys/:id/relations', opts),
    opts: opts
  })
}

/** 删除实体 */
function entitys_id_delete(opts) {
  return instance({
    method: 'delete',
    url: convertRESTAPI('/entitys/:id', opts),
    opts: opts
  })
}

/** 更新实体json */
function entitys_id_post(opts) {
  return instance({
    method: 'post',
    url: convertRESTAPI('/entitys/:id', opts),
    opts: opts
  })
}

/** 新建实体json */
function entitys_post(opts) {
  return instance({
    method: 'post',
    url: '/entitys',
    opts: opts
  })
}

/** 获得实体信息 */
function entitys_id_get(opts) {
  return instance({
    method: 'get',
    url: convertRESTAPI('/entitys/:id', opts),
    opts: opts
  })
}

/** 获得实体列表searchStr&page */
function entitys_get(opts) {
  return instance({
    method: 'get',
    url: '/entitys',
    opts: opts
  })
}

/** 简历关系获得已有关系信息searchStr，10项 */
function models_id_relations_get(opts) {
  return instance({
    method: 'get',
    url: convertRESTAPI('/models/:mid/relations/keys', opts),
    opts: opts
  })
}

export {
  user_logout_get,
  user_login_post,
  user_get,
  attributes_keys,
  attributes_id_get,
  models_id_delete,
  models_id_post,
  models_post,
  models_id_get,
  models_get,
  relations_id_delete,
  entitys_id_relations_post,
  entitys_id_relations_get,
  entitys_id_delete,
  entitys_id_post,
  entitys_post,
  entitys_id_get,
  entitys_get,
  models_id_relations_get
}
