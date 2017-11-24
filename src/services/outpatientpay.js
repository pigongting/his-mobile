import request from '../utils/request';
import { apiPrefix, apiNexfix } from './config';

/* 插入 */
export function insertRow(action, config, options) {}
/* 删除 */
export function deleteRow(action, config, options) {}
/* 更新 */
export function updateRow(action, config, options) {
  return request(action, config, {
    Url: `${apiPrefix}doorOrder/updateDoorOrder${apiNexfix}`,
    method: 'POST',
    body: options,
  });
}
/* 查看 */
export function viewedRow(action, config, options) {
  return request(action, config, {
    Url: `${apiPrefix}doorOrder/getDoorOrderById${apiNexfix}`,
    method: 'POST',
    body: options,
  });
}
/* 列出分页数据 */
export function listPageData(action, config, options) {}
/* 列出全部数据 */
export function listAllData(action, config, options) {
  return request(action, config, {
    Url: `${apiPrefix}doorOrder/getDoorOrderByVisitNo${apiNexfix}`,
    method: 'POST',
    body: options,
  });
}
/* 列出全部级别数据 */
export function listTreeData(action, config, options) {}
/* 列出指定级别数据 */
export function listOneLevelData(action, config, options) {}
/* 列出缴费明细 */
export function listDetailList(action, config, options) {
  return request(action, config, {
    Url: `${apiPrefix}doorOrderDetail/getDoorOrderDetailByOrderNo${apiNexfix}`,
    method: 'POST',
    body: options,
  });
}