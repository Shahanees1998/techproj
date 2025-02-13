import { NextRequest, NextResponse } from 'next/server';

export type ApiHandler = (
  req: NextRequest,
  { params }: { params: Promise<object> }
) => Promise<NextResponse>;

export const createApiHandler = (handler: ApiHandler): ApiHandler => {
  return async (req, { params }) => {
    try {
      return await handler(req, { params });
    } catch (error) {
      console.log(error);
      return NextResponse.json(
        { error: 'Internal Server Error' },
        { status: 500 }
      );
    }
  };
}; 