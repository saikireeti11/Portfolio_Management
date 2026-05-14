import PortfolioApp from "../components/PortfolioApp.jsx";
import AuthProvider from "../context/AuthProvider";
import PortfolioProvider from "../context/PortfolioProvider";

export default function Home() {
  return (
    <AuthProvider>
      <PortfolioProvider>
        <PortfolioApp />
      </PortfolioProvider>
    </AuthProvider>
  );
}
