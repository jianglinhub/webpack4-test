import { getDeployEnv } from 'carno/utils';
import { cookie, qs } from 'carno/third-party';
import { servers as serverConfigs } from 'configs';

export function getServer(servers = serverConfigs) {
  return servers[getDeployEnv(process.env.DEPLOY_ENV)];
}

// 导出
export const downFile = ({ server, url, params }) => {
  const token = {
    sid: cookie.get('sid'),
    st: cookie.get('st')
  };

  window.location.href = `${getServer()[server]}${url}?${qs.stringify(Object.assign(token, params))}`;
};