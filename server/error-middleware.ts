import ClientError from './client-error'

export default function errorMiddleware(err: any, req: any, res: any, next: any) {
  if (err instanceof ClientError) {
    res.status(err.status).json({
      error: err.message
    });
  } else {
    console.error('500 Client error: ', err);
    res.status(500).json({
      error: 'an unexpected error occurred'
    });
  }
}
