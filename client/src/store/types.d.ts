interface User {
  id: string;
}

interface IUserState {
  token: string;
  setToken: (token: string) => void;
  logOut: () => void;
}
