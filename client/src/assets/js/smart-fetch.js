import * as qs from 'qs';
import { toast } from './toast';

export async function smartFetch({
  url = null,
  method = 'GET',
  params = null,
  headers = {},
  data = null,
  notifyOnSuccess = false,
  notifyOnFailure = false,
}) {
  if (url === null) {
    throw new Error('Url must be provided.');
  }

  if (params) {
    url += '?' + qs.stringify(params);
  }

  const headerObj = new Headers(headers);

  if (data) {
    headerObj.append('Content-Type', 'application/json');
  }

  headerObj.set('Accept', 'application/json');

  const response = await fetch(url, {
    method,
    headers,
    ...(data && { body: JSON.stringify(data) }),
  });

  const jsonData = await response.json();

  if (response.ok) {
    if (notifyOnSuccess) {
      toast(jsonData.message, {
        type: 'success',
      });
    }
  } else {
    // todo: analytics, log, etc...
    if (notifyOnFailure) {
      toast(jsonData.message, {
        type: 'error',
      });
    }
  }

  return jsonData;
}
