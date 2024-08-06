import React, { useState } from "react";
import Select from "react-select";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import {
  DollarSign,
  TrendingUp,
  AlertTriangle,
  Settings,
  Bell,
  MapPin,
  Building,
  Activity,
  BellOff,
} from "lucide-react";

const data = [
  {
    date: "2023-10",
    tc: 195000,
    base: 120000,
    equity: 65000,
    bonus: 10000,
    tcAfterTax: 136500,
  },
  {
    date: "2023-11",
    tc: 200000,
    base: 120000,
    equity: 70000,
    bonus: 10000,
    tcAfterTax: 140000,
  },
  {
    date: "2023-12",
    tc: 205000,
    base: 120000,
    equity: 75000,
    bonus: 10000,
    tcAfterTax: 143500,
  },
  {
    date: "2024-01",
    tc: 210000,
    base: 125000,
    equity: 75000,
    bonus: 10000,
    tcAfterTax: 147000,
  },
  {
    date: "2024-02",
    tc: 215000,
    base: 125000,
    equity: 80000,
    bonus: 10000,
    tcAfterTax: 150500,
  },
  {
    date: "2024-03",
    tc: 220000,
    base: 125000,
    equity: 85000,
    bonus: 10000,
    tcAfterTax: 154000,
  },
];

const stateTaxRates = {
  California: 0.3,
  Texas: 0.25,
  Florida: 0.2,
  NewYork: 0.35,
  Washington: 0.15,
};

const formatCurrency = (value) => {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    maximumFractionDigits: 0,
  }).format(value);
};

const Dashboard = () => {
  const [timeRange, setTimeRange] = useState("1Y");
  const [showAfterTax, setShowAfterTax] = useState(false);
  const [selectedState, setSelectedState] = useState("California");
  const [email, setEmail] = useState("");
  const [notificationThreshold, setNotificationThreshold] = useState(5);
  const [notificationsEnabled, setNotificationsEnabled] = useState(true);
  const companyName = "TechCorp Inc.";

  const currentTC = data[data.length - 1];
  const taxRate = stateTaxRates[selectedState];

  const calculateAfterTax = (amount) => amount * (1 - taxRate);

  const handleNotificationSignup = (e) => {
    e.preventDefault();
    console.log(
      `Signed up for notifications: Email - ${email}, Threshold - ${notificationThreshold}%, State - ${selectedState}`
    );
    setEmail("");
    setNotificationThreshold(5);
  };

  const toggleNotifications = () => {
    setNotificationsEnabled(!notificationsEnabled);
    // Here you would update the backend about the notification preference
    console.log(
      `Notifications ${notificationsEnabled ? "disabled" : "enabled"}`
    );
  };

  // Map state options to the format react-select expects
  const stateOptions = Object.keys(stateTaxRates).map((state) => ({
    value: state,
    label: state,
  }));

  const filteredData = data.filter((entry) => {
    const date = new Date(entry.date);
    const currentDate = new Date();
    switch (timeRange) {
      case "1M":
        return (
          date >= new Date(currentDate.setMonth(currentDate.getMonth() - 1))
        );
      case "3M":
        return (
          date >= new Date(currentDate.setMonth(currentDate.getMonth() - 3))
        );
      case "6M":
        return (
          date >= new Date(currentDate.setMonth(currentDate.getMonth() - 6))
        );
      case "1Y":
        return (
          date >=
          new Date(currentDate.setFullYear(currentDate.getFullYear() - 1))
        );
      default:
        return true;
    }
  });

  return (
    <div className="bg-gray-900 text-white min-h-screen">
      <nav className="bg-gray-800 p-4">
        <div className="flex justify-between items-center">
          <h1 className="text-2xl font-bold">TC Tracker</h1>
          <div className="flex items-center space-x-4">
            <button
              className="p-2 rounded-full bg-gray-700 hover:bg-gray-600"
              onClick={toggleNotifications}
            >
              {notificationsEnabled ? (
                <Bell size={24} />
              ) : (
                <BellOff size={24} />
              )}
            </button>
            <button className="p-2 rounded-full bg-gray-700 hover:bg-gray-600">
              <Settings size={24} />
            </button>
          </div>
        </div>
      </nav>

      <main className="p-6">
        <div className="flex justify-between items-center mb-6">
          <div className="flex items-center space-x-4">
            <div className="flex items-center">
              <Building size={20} className="text-gray-400 mr-2" />
              <span className="font-semibold">{companyName}</span>
            </div>
            <MapPin size={20} className="text-gray-400 mr-2" />
            <div className="flex items-center">
              {/* Updated Dropdown */}
              <Select
                className="w-40"
                options={stateOptions}
                value={stateOptions.find(
                  (option) => option.value === selectedState
                )}
                onChange={(option) => setSelectedState(option.value)}
                isSearchable={true} // Enable search functionality
                styles={{
                  control: (base) => ({
                    ...base,
                    backgroundColor: "#2d2d2d", // Changed from bg-gray-700
                    borderColor: "transparent",
                    borderRadius: "0.5rem",
                    "&:hover": {
                      borderColor: "#3d3d3d", // Changed from bg-gray-600
                    },
                  }),
                  menu: (base) => ({
                    ...base,
                    backgroundColor: "#2d2d2d",
                    borderRadius: "0.5rem",
                  }),
                  option: (base, { isFocused }) => ({
                    ...base,
                    backgroundColor: isFocused ? "#3d3d3d" : "#2d2d2d",
                    color: isFocused ? "#fff" : "#ccc",
                  }),
                  singleValue: (base) => ({
                    ...base,
                    color: "#fff",
                  }),
                }}
              />
            </div>
          </div>
          <label className="flex items-center cursor-pointer">
            <span className="mr-2">Show After-Tax</span>
            <div className="relative">
              <input
                type="checkbox"
                className="sr-only"
                checked={showAfterTax}
                onChange={() => setShowAfterTax(!showAfterTax)}
              />
              <div
                className={`block w-14 h-8 rounded-full ${
                  showAfterTax ? "bg-green-400" : "bg-gray-600"
                }`}
              ></div>
              <div
                className={`dot absolute left-1 top-1 bg-white w-6 h-6 rounded-full transition ${
                  showAfterTax ? "transform translate-x-6" : ""
                }`}
              ></div>
            </div>
          </label>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 bg-gray-800 rounded-lg p-6">
            <h2 className="text-xl font-semibold mb-4">
              Total Compensation Over Time
            </h2>
            <div className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={filteredData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#444" />
                  <XAxis dataKey="date" stroke="#888" />
                  <YAxis stroke="#888" />
                  <Tooltip
                    contentStyle={{ backgroundColor: "#333", border: "none" }}
                  />
                  <Line
                    type="monotone"
                    dataKey={showAfterTax ? "tcAfterTax" : "tc"}
                    stroke="#8884d8"
                    strokeWidth={2}
                    dot={false}
                  />
                  <Line
                    type="monotone"
                    dataKey="base"
                    stroke="#82ca9d"
                    strokeWidth={2}
                    dot={false}
                  />
                  <Line
                    type="monotone"
                    dataKey="equity"
                    stroke="#ffc658"
                    strokeWidth={2}
                    dot={false}
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
            <div className="flex justify-center mt-4 space-x-2">
              {["1M", "3M", "6M", "1Y", "ALL"].map((range) => (
                <button
                  key={range}
                  className={`px-3 py-1 rounded ${
                    timeRange === range ? "bg-blue-600" : "bg-gray-700"
                  }`}
                  onClick={() => setTimeRange(range)}
                >
                  {range}
                </button>
              ))}
            </div>
          </div>

          <div className="space-y-6">
            <div className="bg-gray-800 rounded-lg p-6">
              <h2 className="text-xl font-semibold mb-4">
                Current TC Breakdown
              </h2>
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <span>Base Salary</span>
                  <span className="text-green-400 font-semibold">
                    {formatCurrency(
                      showAfterTax
                        ? calculateAfterTax(currentTC.base)
                        : currentTC.base
                    )}
                  </span>
                </div>
                <div className="flex justify-between items-center">
                  <span>Equity</span>
                  <span className="text-blue-400 font-semibold">
                    {formatCurrency(
                      showAfterTax
                        ? calculateAfterTax(currentTC.equity)
                        : currentTC.equity
                    )}
                  </span>
                </div>
                <div className="flex justify-between items-center">
                  <span>Bonus</span>
                  <span className="text-yellow-400 font-semibold">
                    {formatCurrency(
                      showAfterTax
                        ? calculateAfterTax(currentTC.bonus)
                        : currentTC.bonus
                    )}
                  </span>
                </div>
                <div className="flex justify-between items-center pt-2 border-t border-gray-700">
                  <span className="font-semibold">Total TC</span>
                  <span className="text-purple-400 font-bold text-xl">
                    {formatCurrency(
                      showAfterTax ? currentTC.tcAfterTax : currentTC.tc
                    )}
                  </span>
                </div>
              </div>
            </div>

            <div className="bg-gray-800 rounded-lg p-6">
              <h2 className="text-xl font-semibold mb-4">Tax Information</h2>
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <span>Effective Tax Rate</span>
                  <span className="text-red-400 font-semibold">
                    {(taxRate * 100).toFixed(1)}%
                  </span>
                </div>
                <div className="flex justify-between items-center">
                  <span>Total Tax Amount</span>
                  <span className="text-red-400 font-semibold">
                    {formatCurrency(currentTC.tc - currentTC.tcAfterTax)}
                  </span>
                </div>
                <div className="flex justify-between items-center">
                  <span>Take-Home Pay</span>
                  <span className="text-green-400 font-semibold">
                    {formatCurrency(currentTC.tcAfterTax)}
                  </span>
                </div>
              </div>
            </div>

            <div className="bg-gray-800 rounded-lg p-6">
              <h2 className="text-xl font-semibold mb-4">Quick Stats</h2>
              <div className="grid grid-cols-2 gap-4">
                <div className="bg-gray-700 p-4 rounded-lg">
                  <div className="flex items-center justify-between">
                    <DollarSign className="text-green-400" />
                    <span className="text-sm">YoY Growth</span>
                  </div>
                  <p className="text-2xl font-bold mt-2">+22.2%</p>
                </div>
                <div className="bg-gray-700 p-4 rounded-lg">
                  <div className="flex items-center justify-between">
                    <TrendingUp className="text-blue-400" />
                    <span className="text-sm">Stock Performance</span>
                  </div>
                  <p className="text-2xl font-bold mt-2">+15.7%</p>
                </div>
                <div className="bg-gray-700 p-4 rounded-lg col-span-2">
                  <div className="flex items-center justify-between">
                    <AlertTriangle className="text-yellow-400" />
                    <span className="text-sm">Next Vesting Date</span>
                  </div>
                  <p className="text-2xl font-bold mt-2">Aug 15, 2024</p>
                </div>
              </div>
            </div>

            <div className="bg-gray-800 rounded-lg p-6">
              <h2 className="text-xl font-semibold mb-4">
                Notification Settings
              </h2>
              <form onSubmit={handleNotificationSignup} className="space-y-4">
                <div>
                  <label
                    htmlFor="email"
                    className="block text-sm font-medium text-gray-400"
                  >
                    Email Address
                  </label>
                  <input
                    type="email"
                    id="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="mt-1 block w-full rounded-md bg-gray-700 border-transparent focus:border-green-500 focus:bg-gray-900 focus:ring-0 text-sm"
                    required
                  />
                </div>
                <div>
                  <label
                    htmlFor="threshold"
                    className="block text-sm font-medium text-gray-400"
                  >
                    Notification Threshold (%)
                  </label>
                  <input
                    type="number"
                    id="threshold"
                    value={notificationThreshold}
                    onChange={(e) => setNotificationThreshold(e.target.value)}
                    className="mt-1 block w-full rounded-md bg-gray-700 border-transparent focus:border-green-500 focus:bg-gray-900 focus:ring-0 text-sm"
                    min="1"
                    max="100"
                    required
                  />
                </div>
                <button
                  type="submit"
                  className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
                >
                  <Bell className="mr-2" size={18} />
                  Sign Up for Notifications
                </button>
              </form>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Dashboard;
