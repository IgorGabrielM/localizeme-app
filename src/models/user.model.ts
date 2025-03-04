export class User {
  latitude: number;
  longitude: number;
  username: string;
  friends: Friend[];
  timestamp?: number;
}

export class Friend {
  friendUuid: string;
  latitude?: number;
  longitude?: number;
  username?: string;
  timestamp?: number;
}
