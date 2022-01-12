import Footer from "components/Footer";
import Header from "components/Header";

interface WrapperProps {
  children: React.ReactNode;
}

function Layout({ children }: WrapperProps) {
  return (
    <div className="h-screen pt-5 px-7 bg-slate-100">
      <Header />
      <div className="flex justify-center">{children}</div>
      <Footer />
    </div>
  );
}

export default Layout;
