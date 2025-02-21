export const API_URL = 'http://localhost:3000'
export const API_TASKS_URL = 'http://localhost:3000/tasks'
export const API_CREATE_UPDATE_TASK_URL = 'http://localhost:3000/createOrUpdateTask'
export const API_DELETE_TASK_URL = 'http://localhost:3000/deleteTask'
export const API_LOGIN_URL = 'http://localhost:3000/loginUser'

export const USER_COOKIE_KEY = 'user-info'

export const modalStyle = {
  position: 'absolute' as const,
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};