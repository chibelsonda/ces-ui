import { notifications } from '@mantine/notifications';
// import classes from '../assets/css/notification.module.css';

export const notify = (
  type: 'info' | 'success' | 'warning' | 'error',
  message: string | string[]
) => {
  const colorMap = {
    info: 'blue',
    success: 'green',
    warning: 'yellow',
    error: 'red',
  };

  notifications.show({
    color: colorMap[type],
    message: Array.isArray(message) ? message.join(', ') : message,
  });
};
