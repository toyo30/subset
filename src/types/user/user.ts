export interface UserDto {
  uid: string;
  email: string;
  password: string;
}

export interface UserInstance {
  uid: string;
  name?: string;
  email: string;
  groups?: string[];
  // profile: file;
  fcmToken?: string;
}
