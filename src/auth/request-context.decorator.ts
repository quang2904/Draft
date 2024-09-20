import { createParamDecorator, ExecutionContext } from '@nestjs/common';

interface IObject {
  [key: string]: any;
}

export interface IIncomingRequest {
  body: IObject;
  params: IObject;
  query: IObject;
  headers: IObject;
  req?: any;
  user?: any;
}

export const RequestCtx = createParamDecorator(
  async (data: unknown, ctx: ExecutionContext): Promise<IIncomingRequest | void> => {
    // Extract the 'req' object from current execution context
    const req = ctx.switchToHttp().getRequest();

    // Extract information from the 'req' object
    const body = req.body;
    const headers = req.headers;
    const params = req.params;
    const query = req.query;
    const user = req.user;

    // Structure the extracted information info an IIncomingRequest object
    const result: IIncomingRequest = {
      body,
      headers,
      params,
      query,
      user,
    };

    // Return the structured result
    return result;
  },
);
