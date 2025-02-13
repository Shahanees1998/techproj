export default function CheckEmailPage() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-4">
      <div className="max-w-md w-full space-y-8 text-center">
        <h1 className="text-3xl font-bold">Check Your Email</h1>
        <p className="text-gray-600">
          If your email is registered, you will receive a login link shortly.
          Please check your email and click the link to log in.
        </p>
        <p className="text-sm text-gray-500">
          The login link will expire in 15 minutes.
        </p>
      </div>
    </div>
  );
} 