export default function OrientationLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div>
      <h1 className="text-xl font-semibold mb-3">Orientation</h1>
      <p className="font-light">
        Lorem ipsum, dolor sit amet consectetur adipisicing elit. Ex aliquam
        quibusdam, ipsum in maxime eius et eveniet atque harum facilis nemo.
        Tenetur officiis adipisci earum ipsum ratione ducimus, nihil corrupti.
      </p>
      <div>{children}</div>
    </div>
  );
}
