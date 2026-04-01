export default function PhoneFrame({ children }: { children: React.ReactNode }) {
  return (
    <div className="phone-frame mx-auto my-6">
      <div className="phone-frame-notch" />
      <div className="phone-frame-screen">{children}</div>
    </div>
  );
}
