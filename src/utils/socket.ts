// import { ApiConst } from '@/configs';
import { storage } from '@/utils';

async function generateQuery(fcmToken) {
  const { authToken } = await storage.getUserToken();
  // const query = ApiConst.getDefaultHeader();

  const result = {
    // ...query,
    isMobile: 'false',
    token: authToken,
    // deviceModel: query.browserName,
    fcmToken,
  };

  return result;
}

export default { generateQuery };
