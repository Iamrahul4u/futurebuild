export default function ViewProfileLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <main className="relative flex h-[95vh] w-full overflow-hidden bg-background">
      {children}
    </main>
  );
}
