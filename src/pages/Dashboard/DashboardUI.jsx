import ChatComponent from "../Chat/ChatComponent";

const DashboardUI = () => {
  return (
    <div className="container mx-auto flex h-full max-w-4xl flex-col">
      <div className="chat-container mb-10 flex flex-1 flex-col overflow-auto bg-gray-100">
        <ChatComponent />
      </div>
    </div>
  );
};

export default DashboardUI;
