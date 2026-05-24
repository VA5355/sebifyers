 import "./virtual-account.module.css";

export default function VirtualAccountLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="onedinaar-root">
      {children}
    </div>
  );
}