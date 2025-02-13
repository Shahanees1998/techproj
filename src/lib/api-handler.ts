import { NextRequest, NextResponse } from 'next/server';

export type ApiHandler = (
  req: NextRequest,
) => Promise<NextResponse>;

export const createApiHandler = (handler: ApiHandler): ApiHandler => {
  return async (req) => {
    try {
      return await handler(req);
    } catch (error) {
      console.error(error);
      return NextResponse.json(
        { error: 'Internal Server Error' },
        { status: 500 }
      );
    }
  };
}; 