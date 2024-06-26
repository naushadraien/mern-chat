export type LoginType = {
  message: string;
  success: boolean;
  data: {
    createdAt: string;
    fullName: string;
    gender: string;
    imgUrl: string;
    password: string;
    updatedAt: string;
    email: string;
    _id: string;
  };
};
export type RegisterType = {
  message: string;
  success: boolean;
  data: {
    createdAt: string;
    fullName: string;
    gender: string;
    imgUrl: string;
    password: string;
    updatedAt: string;
    email: string;
    _id: string;
  };
};

export type UserTypes = {
  createdAt: string;
  fullName: string;
  gender: string;
  imgUrl: string;
  password: string;
  updatedAt: string;
  email: string;
  _id: string;
};

export type MessageType = {
  _id: string;
  message: string;
  senderId: string;
  receiverId: string;
  createdAt: string;
  updatedAt: string;
};
