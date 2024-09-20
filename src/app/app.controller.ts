import { Controller, Get, HttpCode, HttpStatus } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Public } from '@/common';

@Controller()
@Public() // This seems to be a custom decorator indicating that this controller's endpoints are public
export class AppController {
  constructor(private readonly _configService: ConfigService) {}

  /**
   * This is a controller method for handling the HTTP GET request to the root endpoint ('/').
   * It is decorated with @HttpCode, @Get, and @Public decorators.
   */
  @HttpCode(HttpStatus.OK) // Set the HTTP response code to 200 OK
  @Get('/') // Define that this method handles GET requests for the root endpoint
  async getAppStatus() {
    /**
     * Retrieve Application Name from Configuration Service
     *
     * This code snippet represents the retrieval of the application name from a configuration service.
     * It uses the `_configService` to get the application name and performs a type assertion to indicate
     * that the retrieved value is treated as a string.
     *
     * @returns {string} The application name retrieved from the configuration service.
     */
    const app_name = <string>this._configService.get<string>('app.app_name');

    // Return a JSON object with status and message
    return {
      status: HttpStatus.OK,
      message: `${app_name} API`,
    };
  }
}
