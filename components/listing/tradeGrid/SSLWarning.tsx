export default function SSLWarning({ status }: any) {
  if (status !== "ssl_error") return null;

  return (
    <div className="bg-red-100 text-red-700 p-3 rounded-xl mb-4">
      ⚠️ Secure connection could not be established.
      <br />
      Please open <b>https://localhost:10000</b> and accept the certificate.
    </div>
  );
}