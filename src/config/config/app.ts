import { registerAs } from '@nestjs/config';

export default registerAs('app', () => ({
  app_name: process.env.APP_NAME || 'Gauzy',
  app_logo: process.env.APP_LOGO || `${process.env.CLIENT_BASE_URL}/assets/images/logos/logo_Gauzy.png`,
}));
