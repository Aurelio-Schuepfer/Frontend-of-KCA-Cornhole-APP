export interface AuthModel {
  username: string;
  email: string;
  password: string;
  confirmPassword: string;
  rememberMe?: boolean;
}