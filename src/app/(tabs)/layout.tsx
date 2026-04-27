import Header from "@/components/Header";
import TabNav from "@/components/TabNav";

/**
 * Shared shell for the four inner tabs (Application, Research, Projects,
 * About). Wraps each page with the Header + TabNav so they always share the
 * same navigation surface. The home page does NOT use this layout — its
 * carousel mirrors *are* the navigation.
 */
export default function TabsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <Header />
      <main
        style={{
          maxWidth: 880,
          margin: "0 auto",
          padding: "12px 32px 60px 32px",
        }}
      >
        <TabNav />
        {children}
      </main>
    </>
  );
}
