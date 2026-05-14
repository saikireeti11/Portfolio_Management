"use client";

import { useContext, useEffect, useMemo, useState } from "react";
import {
  createInvestor,
  getInvestorHoldings,
  getInvestorNetWorth,
  getInvestors
} from "../api/investorsApi";
import { createFund, getFunds, updateFundNav } from "../api/fundsApi";
import { createSip, getSips, getSipTransactions, processSip as processSipApi } from "../api/sipsApi";
import AuthContext from "./AuthContext";
import PortfolioContext from "./PortfolioContext";

const initialInvestor = {
  first_name: "",
  last_name: "",
  email: "",
  phone: "",
  pan_number: ""
};

const initialFund = {
  amc_id: "",
  fund_name: "",
  fund_type: "Open Ended",
  category: "Equity",
  latest_nav: ""
};

const initialSip = {
  investor_id: "",
  fund_id: "",
  portfolio_id: "",
  sip_amount: "",
  sip_date: "5",
  start_date: new Date().toISOString().slice(0, 10)
};

export default function PortfolioProvider({ children }) {
  const { token, authRequest } = useContext(AuthContext);
  const [activeView, setActiveView] = useState("dashboard");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  const [investors, setInvestors] = useState([]);
  const [funds, setFunds] = useState([]);
  const [sips, setSips] = useState([]);
  const [holdings, setHoldings] = useState([]);
  const [transactions, setTransactions] = useState([]);
  const [netWorth, setNetWorth] = useState(null);
  const [selectedInvestorId, setSelectedInvestorId] = useState("");
  const [selectedSipId, setSelectedSipId] = useState("");
  const [search, setSearch] = useState("");

  const [investorForm, setInvestorForm] = useState(initialInvestor);
  const [fundForm, setFundForm] = useState(initialFund);
  const [sipForm, setSipForm] = useState(initialSip);
  const [navForm, setNavForm] = useState({ fund_id: "", latest_nav: "" });

  useEffect(() => {
    if (token) {
      loadDashboardData();
    }
  }, [token]);

  async function loadDashboardData() {
    setLoading(true);
    setError("");

    try {
      const [investorResult, fundResult, sipResult] = await Promise.all([
        getInvestors(authRequest),
        getFunds(authRequest),
        getSips(authRequest)
      ]);

      const investorRows = investorResult.data || [];
      const fundRows = fundResult.data || [];
      const sipRows = sipResult.data || [];

      setInvestors(investorRows);
      setFunds(fundRows);
      setSips(sipRows);

      const investorId = selectedInvestorId || investorRows[0]?.investor_id || "";
      const sipId = selectedSipId || sipRows[0]?.sip_id || "";

      setSelectedInvestorId(investorId);
      setSelectedSipId(sipId);

      if (investorId) {
        await loadInvestorDetails(investorId);
      } else {
        setHoldings([]);
        setNetWorth(null);
      }

      if (sipId) {
        await loadSipTransactions(sipId);
      } else {
        setTransactions([]);
      }

      if (!fundForm.amc_id && fundRows[0]?.amc_id) {
        setFundForm((current) => ({ ...current, amc_id: String(fundRows[0].amc_id) }));
      }
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }

  async function loadInvestorDetails(investorId) {
    if (!investorId) return;

    const [holdingsResult, netWorthResult] = await Promise.all([
      getInvestorHoldings(authRequest, investorId),
      getInvestorNetWorth(authRequest, investorId)
    ]);

    setHoldings(holdingsResult.holdings || []);
    setNetWorth(netWorthResult);
  }

  async function loadSipTransactions(sipId) {
    if (!sipId) return;

    const result = await getSipTransactions(authRequest, sipId);
    setTransactions(result.transactions || []);
  }

  async function selectInvestor(investorId) {
    setSelectedInvestorId(investorId);
    setError("");

    try {
      await loadInvestorDetails(investorId);
    } catch (err) {
      setError(err.message);
    }
  }

  async function selectSip(sipId) {
    setSelectedSipId(sipId);
    setError("");

    try {
      await loadSipTransactions(sipId);
    } catch (err) {
      setError(err.message);
    }
  }

  async function runAction(action, successMessage, afterSuccess) {
    setLoading(true);
    setError("");
    setMessage("");

    try {
      const result = await action();
      setMessage(successMessage);

      if (afterSuccess) {
        await afterSuccess(result);
      }

      await loadDashboardData();
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }

  async function submitInvestor(event) {
    event.preventDefault();
    await runAction(
      () => createInvestor(authRequest, investorForm),
      "Investor created successfully",
      (result) => {
        setInvestorForm(initialInvestor);
        if (result.investor?.investor_id) {
          setSelectedInvestorId(result.investor.investor_id);
        }
      }
    );
  }

  async function submitFund(event) {
    event.preventDefault();
    const payload = {
      ...fundForm,
      amc_id: Number(fundForm.amc_id),
      latest_nav: Number(fundForm.latest_nav)
    };

    await runAction(
      () => createFund(authRequest, payload),
      "Fund created successfully",
      () => setFundForm({ ...initialFund, amc_id: fundForm.amc_id })
    );
  }

  async function submitNavUpdate(event) {
    event.preventDefault();
    await runAction(
      () => updateFundNav(authRequest, navForm.fund_id, Number(navForm.latest_nav)),
      "NAV updated successfully",
      () => setNavForm({ fund_id: "", latest_nav: "" })
    );
  }

  async function submitSip(event) {
    event.preventDefault();
    const payload = {
      investor_id: Number(sipForm.investor_id),
      fund_id: Number(sipForm.fund_id),
      sip_amount: Number(sipForm.sip_amount),
      sip_date: Number(sipForm.sip_date),
      start_date: sipForm.start_date
    };

    if (sipForm.portfolio_id) {
      payload.portfolio_id = Number(sipForm.portfolio_id);
    }

    await runAction(
      () => createSip(authRequest, payload),
      "SIP registered successfully",
      (result) => {
        setSipForm(initialSip);
        if (result.sip?.sip_id) {
          setSelectedSipId(result.sip.sip_id);
        }
      }
    );
  }

  async function processSip(sipId) {
    await runAction(
      () => processSipApi(authRequest, sipId),
      "SIP processed successfully",
      async () => {
        setSelectedSipId(sipId);
        await loadSipTransactions(sipId);
      }
    );
  }

  const filteredTransactions = useMemo(() => {
    const query = search.toLowerCase();

    return transactions.filter((transaction) =>
      [transaction.fund_name, transaction.transaction_type, transaction.transaction_date, transaction.amount]
        .join(" ")
        .toLowerCase()
        .includes(query)
    );
  }, [transactions, search]);

  const value = {
    activeView,
    setActiveView,
    loading,
    message,
    error,
    investors,
    funds,
    sips,
    holdings,
    transactions: filteredTransactions,
    netWorth,
    selectedInvestorId,
    selectedSipId,
    search,
    setSearch,
    investorForm,
    setInvestorForm,
    fundForm,
    setFundForm,
    sipForm,
    setSipForm,
    navForm,
    setNavForm,
    loadDashboardData,
    selectInvestor,
    selectSip,
    submitInvestor,
    submitFund,
    submitNavUpdate,
    submitSip,
    processSip
  };

  return <PortfolioContext.Provider value={value}>{children}</PortfolioContext.Provider>;
}
