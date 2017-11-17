import request from '../utils/request';
import { apiPrefix, apiNexfix } from './config';

/* 插入 */
export function insertRow(action, config, options) {}
/* 删除 */
export function deleteRow(action, config, options) {}
/* 更新 */
export function updateRow(action, config, options) {}
/* 查看 */
export function viewedRow(action, config, options) {
  return request(action, config, {
    Url: `${apiPrefix}doctor/getDoctorInfo${apiNexfix}`,
    method: 'POST',
    body: options,
  });
}
/* 列出分页数据 */
export function listPageData(action, config, options) {}
/* 列出全部数据 */
export function listAllData(action, config, options) {
  return request(action, config, {
    Url: `${apiPrefix}doctorSch/getDoctorSchByDept${apiNexfix}`,
    method: 'POST',
    body: options,
  });
}
/* 列出全部级别数据 */
export function listTreeData(action, config, options) {}
/* 列出指定级别数据 */
export function listOneLevelData(action, config, options) {}
/* 列出用户挂号数据 */
export function listGuaHaoPre(action, config, options) {
  return request(action, config, {
    Url: `${apiPrefix}guaHaoPre/getGuaHaoPreByUserId${apiNexfix}`,
    method: 'POST',
    body: options,
  });
}
/* 获取下轮放号时间 */
export function getNextNoTime(action, config, options) {
  return request(action, config, {
    Url: `${apiPrefix}deptNextNoTime/getDeptNextNoTimeById${apiNexfix}`,
    method: 'POST',
    body: options,
  });
}
/* 获取有号日期 */
export function getHaveNoDate(action, config, options) {
  return request(action, config, {
    Url: `${apiPrefix}doctorSch/getDoctorSchByDoctor${apiNexfix}`,
    method: 'POST',
    body: options,
  });
}
/* 获取号码时间段 */
export function getNoTimeSlot(action, config, options) {
  return request(action, config, {
    Url: `${apiPrefix}doctorSch/getDoctorSchDetail${apiNexfix}`,
    method: 'POST',
    body: options,
  });
}
/* 获取预约确认信息 */
export function getOrderConfirm(action, config, options) {
  return request(action, config, {
    Url: `${apiPrefix}doctorSch/getDoctorSchConfirm${apiNexfix}`,
    method: 'POST',
    body: options,
  });
}
/* 提交预约确认信息 */
export function submitOrderConfirm(action, config, options) {
  return request(action, config, {
    Url: `${apiPrefix}guaHaoPre/getGuahaoReturnId${apiNexfix}`,
    method: 'POST',
    body: options,
  });
}
/* 预约详情 */
export function getOrderDetail(action, config, options) {
  return request(action, config, {
    Url: `${apiPrefix}guaHaoPre/getGuaHaoPreById${apiNexfix}`,
    method: 'POST',
    body: options,
  });
}
/* 取消挂号 */
export function cancelGuaHaoPre(action, config, options) {
  return request(action, config, {
    Url: `${apiPrefix}guaHaoPre/cancelGuaHaoPre${apiNexfix}`,
    method: 'POST',
    body: options,
  });
}
