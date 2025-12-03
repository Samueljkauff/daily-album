
export interface Token {
  id: number;
  device_id: string;
  userId: string;
  refreshToken: string;
  expiresAt: Date;
  revoked: boolean;
  ipAddress?: string;
  userAgent?: string;
  createdAt: Date;
}