import axios from 'axios';
import { getAPIBaseUrls, isValidETHAddress, walletToPCAIP10 } from '../helpers';
import Constants from '../constants';
import { IFeeds } from '../types';
import { getInboxLists } from './helpers';

export type RequestOptionsType = {
  account: string;
  pgpPrivateKey?: string;
  toDecrypt?: boolean;
  env?: string;
};

export const requests = async (
  options: RequestOptionsType
): Promise<IFeeds[]> => {
  const { account, pgpPrivateKey, env = Constants.ENV.PROD, toDecrypt = false } = options || {};
  const user = walletToPCAIP10(account);
  const API_BASE_URL = getAPIBaseUrls(env);
  const apiEndpoint = `${API_BASE_URL}/v1/chat/users/${user}/requests`;
  try {
    if (!isValidETHAddress(user)) {
      throw new Error(`Invalid address!`);
    }
    const response = await axios.get(apiEndpoint);
    const requests: IFeeds[] = response.data.requests;
    const Feeds: IFeeds[] = await getInboxLists({
      lists: requests,
      user,
      toDecrypt,
      pgpPrivateKey,
      env,
    });

    return Feeds;
  } catch (err) {
    console.error(`[Push SDK] - API ${requests.name}: `, err);
    throw Error(`[Push SDK] - API ${requests.name}: ${err}`);
  }
};