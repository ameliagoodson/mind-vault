import ChatComponent from "../Chat/ChatComponent";

const DashboardUI = () => {
  return (
    <div className="container mx-auto max-w-3xl flex-1 flex flex-col h-full">
      <h1>Dashboard</h1>
      <div className="chat-container flex-1 h-full bg-gray-100">
        <ChatComponent />
      </div>

    </div>
  );
};

export default DashboardUI;
