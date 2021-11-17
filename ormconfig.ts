import { AppService } from './src/app.service';
const config = new AppService().getDatabaseConfig();
export default config;