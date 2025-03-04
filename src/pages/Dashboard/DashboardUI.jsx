import ChatComponent from "../Chat/ChatComponent";

const DashboardUI = () => {
  return (
    <div className="container mx-auto max-w-3xl h-full flex flex-col">
      <h1>Dashboard</h1>
      <div className="chat-container bg-gray-100 flex-1 flex flex-col border-1 overflow-auto">
        <ChatComponent />
      </div>
    </div>
  );
};

export default DashboardUI;
