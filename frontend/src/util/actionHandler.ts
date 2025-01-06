import { notification } from 'antd';

export const handleAction = async (
  actionName: string,
  apiCall: (...args: any[]) => Promise<any>,
  params: any[],
  callback?: () => void
) => {
  try {
    await apiCall(...params);
    notification.success({ message: `${actionName} successful!` });
    if (callback) callback();
  } catch (error) {
    console.error(`Error during ${actionName}:`, error);
    notification.error({ message: `Error during ${actionName}!` });
  }
};
