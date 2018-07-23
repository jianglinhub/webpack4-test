import { Http } from 'carno/addons';
import { cookie } from 'carno/third-party';
import { getServer } from './common';

export default Http.create({
  servers: getServer(),
  contentKey: 'content',
  // 使用mock代理类别：0 - 仅使用mock数据；1 - 部分使用mock数据；2 - 不使用mock数据
  useMockProxyType: 2,
  authorityFailureCodes: ['120001', '120010', '120002'],
  query() {
    return { sid: cookie.get('sid'), st: cookie.get('st') };
  },
  dataTransform(data, options) {
    Object.assign(data, { sid: cookie.get('sid'), st: cookie.get('st') });
    return { data, options };
  },
});
