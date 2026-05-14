"use client";

import { useContext } from "react";
import AuthContext from "../context/AuthContext";
import PortfolioContext from "../context/PortfolioContext";
import AuthPage from "./dashboard/AuthPage";
import DashboardLayout from "./dashboard/DashboardLayout";
import FundsPage from "./dashboard/FundsPage";
import InvestorsPage from "./dashboard/InvestorsPage";
import OverviewPage from "./dashboard/OverviewPage";
import SipsPage from "./dashboard/SipsPage";
import TransactionsPage from "./dashboard/TransactionsPage";

export default function PortfolioApp() {
  const { token, user, loading: authLoading, logout } = useContext(AuthContext);
  const portfolio = useContext(PortfolioContext);

  if (authLoading) {
    return (
      <div className="grid min-h-screen place-items-center bg-slate-100">
        <p className="text-sm font-bold text-slate-500">Loading portfolio...</p>
      </div>
    );
  }

  if (!token) {
    return <AuthPage />;
  }

  return (
    <DashboardLayout
      user={user}
      logout={logout}
      activeView={portfolio.activeView}
      setActiveView={portfolio.setActiveView}
      investors={portfolio.investors}
      selectedInvestorId={portfolio.selectedInvestorId}
      onSelectInvestor={portfolio.selectInvestor}
      loading={portfolio.loading}
      message={portfolio.message}
      error={portfolio.error}
      onRefresh={portfolio.loadDashboardData}
    >
      {portfolio.activeView === "dashboard" && (
        <OverviewPage
          investors={portfolio.investors}
          funds={portfolio.funds}
          sips={portfolio.sips}
          holdings={portfolio.holdings}
          netWorth={portfolio.netWorth}
          onOpenSips={() => portfolio.setActiveView("sips")}
        />
      )}

      {portfolio.activeView === "investors" && (
        <InvestorsPage
          investors={portfolio.investors}
          form={portfolio.investorForm}
          setForm={portfolio.setInvestorForm}
          onSubmit={portfolio.submitInvestor}
          holdings={portfolio.holdings}
          netWorth={portfolio.netWorth}
          loading={portfolio.loading}
        />
      )}

      {portfolio.activeView === "funds" && (
        <FundsPage
          funds={portfolio.funds}
          form={portfolio.fundForm}
          setForm={portfolio.setFundForm}
          navForm={portfolio.navForm}
          setNavForm={portfolio.setNavForm}
          onSubmit={portfolio.submitFund}
          onUpdateNav={portfolio.submitNavUpdate}
          loading={portfolio.loading}
        />
      )}

      {portfolio.activeView === "sips" && (
        <SipsPage
          sips={portfolio.sips}
          investors={portfolio.investors}
          funds={portfolio.funds}
          form={portfolio.sipForm}
          setForm={portfolio.setSipForm}
          onSubmit={portfolio.submitSip}
          onProcess={portfolio.processSip}
          loading={portfolio.loading}
        />
      )}

      {portfolio.activeView === "transactions" && (
        <TransactionsPage
          sips={portfolio.sips}
          selectedSipId={portfolio.selectedSipId}
          onSelectSip={portfolio.selectSip}
          transactions={portfolio.transactions}
          search={portfolio.search}
          setSearch={portfolio.setSearch}
        />
      )}
    </DashboardLayout>
  );
}
