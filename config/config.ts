import dotenv from 'dotenv';

dotenv.config();

interface DbConfig {
  server: string;
  port: number;
  pool: {
    max: number;
    min: number;
    idleTimeoutMillis: number;
  };
  options: {
    encrypt: boolean;
    database: string;
    trustServerCertificate: boolean;
  };
  authentication: {
    type: string;
    options: {
      userName: string;
      password: string;
    };
  };
}

const config: {
  port: string | undefined;
  dbconfig: DbConfig;
} = {
  port: process.env.PORT,
  dbconfig: {
    server: process.env.DB_DEV_SERVER || 'DB_DEV_SERVER',
    port: parseInt(process.env.DB_DEV_PORT || 'DB_DEV_PORT'),
    pool: {
      max: 5,
      min: 1,
      idleTimeoutMillis: 30000,
    },
    options: {
      encrypt: true,
      database: process.env.DB_DEV_DATABASE || 'DB_DEV_DATABASE',
      trustServerCertificate: true,
    },
    authentication: {
      type: 'default',
      options: {
        userName: process.env.DB_DEV_USERNAME || 'DB_DEV_USERNAME',
        password: process.env.DB_DEV_PASSWORD || 'DB_DEV_PASSWORD',
      },
    },
  },
};

export default config;
