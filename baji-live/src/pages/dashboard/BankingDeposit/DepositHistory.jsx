import ReasonModal from "@/components/shared/Modals/ReasonModal";
import {
  useGetDepositsQuery,
  useUpdateDepositStatusMutation,
} from "@/redux/features/allApis/depositsApi/depositsApi";
import { useState } from "react";
import { IoCloudUploadOutline } from "react-icons/io5";
import { Link } from "react-router-dom";
import { useToasts } from "react-toast-notifications";

const DepositHistory = () => {
  const { data: allDeposits, isLoading, isError } = useGetDepositsQuery();
  const [updateStatus] = useUpdateDepositStatusMutation();
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedDeposit, setSelectedDeposit] = useState(null);
  const [status, setStatus] = useState("");
  const { addToast } = useToasts();

  // Pagination state
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(10); // Number of items per page

  // Search state
  const [searchQuery, setSearchQuery] = useState("");

  // Sort state
  const [sortOrder, setSortOrder] = useState("latest"); // 'latest' or 'oldest'

  if (isLoading) return <div>Loading...</div>;
  if (isError) return <div>Error loading deposits.</div>;

  // Handle status update
  const handleStatusClick = (deposit, status) => {
    setSelectedDeposit(deposit);
    setStatus(status);
    setModalOpen(true);
  };

  const handleSubmit = async (reason) => {
    const statusInfo = {
      id: selectedDeposit?._id,
      data: {
        status: status,
        reason: reason,
      },
    };
    try {
      const { data } = await updateStatus(statusInfo);
      if (data.modifiedCount > 0) {
        addToast("Status updated!", {
          appearance: "success",
          autoDismiss: true,
        });
        setModalOpen(false);
      }
    } catch (error) {
      addToast("Error updating status", {
        appearance: "error",
        autoDismiss: true,
      });
    }
  };

  const handleCloseModal = () => {
    setModalOpen(false);
  };

  // Sort deposits based on createdAt
  const sortedDeposits = [...(allDeposits || [])].sort((a, b) => {
    const dateA = new Date(a.createdAt);
    const dateB = new Date(b.createdAt);
    return sortOrder === "latest" ? dateB - dateA : dateA - dateB;
  });

  // Filter deposits based on search query
  const filteredDeposits = sortedDeposits?.filter((deposit) => {
    const username = deposit?.userInfo?.username?.toLowerCase() || "";
    const accountNumber = deposit?.accountNumber?.toLowerCase() || "";
    return (
      username.includes(searchQuery.toLowerCase()) ||
      accountNumber.includes(searchQuery.toLowerCase())
    );
  });

  // Pagination logic
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filteredDeposits?.slice(
    indexOfFirstItem,
    indexOfLastItem
  );
  const totalPages = Math.ceil(filteredDeposits?.length / itemsPerPage);

  // Change page
  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  // Handle sort order change
  const handleSortChange = (order) => {
    setSortOrder(order);
    setCurrentPage(1); // Reset to the first page when sorting changes
  };

  return (
    <div>
      <div className="bg-[#172437] flex flex-row items-center justify-between p-4 mb-2">
        <h1 className="text-2xl text-white font-bold">Deposit History</h1>
        <div className="flex items-center gap-4">
          <form className="w-1/2 md:w-1/2 flex flex-row items-center">
            <input
              type="text"
              placeholder="Type User Name or Account Number..."
              className="py-2 px-1 w-full outline-none"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </form>
          <div className="flex items-center gap-2">
            <label className="text-white">Sort by:</label>
            <select
              value={sortOrder}
              onChange={(e) => handleSortChange(e.target.value)}
              className="py-2 px-2 rounded"
            >
              <option value="latest">Latest</option>
              <option value="oldest">Oldest</option>
            </select>
          </div>
        </div>
      </div>
      <div className="overflow-x-auto">
        <table className="w-full border-collapse border border-gray-700">
          <thead>
            <tr className="bg-gray-700 text-white">
              <th className="px-4 py-2">Name</th>
              <th className="px-4 py-2">Deposit Method</th>
              <th className="px-4 py-2">Sender Inputs</th>
              <th className="px-4 py-2">Amount</th>
              <th className="px-4 py-2">Slip</th>
              <th className="px-4 py-2">Reason</th>
              <th className="px-4 py-2">Added Balance</th>
              <th className="px-4 py-2">Time & Date</th>
              <th className="px-4 py-2">Status</th>
            </tr>
          </thead>
          <tbody>
            {currentItems?.map((deposit, index) => {
              const paymentInputs = Array.isArray(deposit?.paymentInputs)
                ? deposit.paymentInputs
                : [];

              return paymentInputs.map((input, inputIndex) => (
                <tr
                  key={`${deposit?._id}-${inputIndex}`}
                  className={`${
                    index % 2 === 0 ? "bg-gray-100" : "bg-gray-200"
                  } text-black`}
                >
                  {inputIndex === 0 && (
                    <>
                      <td
                        rowSpan={paymentInputs.length || 1}
                        className="px-4 py-2 font-medium"
                      >
                        {deposit?.userInfo?.username || "N/A"}
                      </td>
                      <td
                        rowSpan={paymentInputs.length || 1}
                        className="px-4 py-2"
                      >
                        {deposit?.method || "N/A"}
                      </td>
                    </>
                  )}
                  <td className="px-4 py-4 inline-flex">
                    {Object.entries(input || {}).map(([key, value]) => {
                      const isImage =
                        typeof value === "string" &&
                        /\.(jpg|jpeg|png|gif)$/i.test(value);

                      if (isImage) {
                        return (
                          <Link
                            target="_blank"
                            rel="noreferrer noopener"
                            to={`${import.meta.env.VITE_BASE_API_URL}${value}`}
                            key={key}
                          >
                            <img
                              src={`${
                                import.meta.env.VITE_BASE_API_URL
                              }${value}`}
                              alt="Deposit Screenshot"
                              className="w-full h-24 object-cover rounded"
                            />
                          </Link>
                        );
                      }
                      return (
                        <span
                          key={key}
                          className="font-bold capitalize inline-flex"
                        >
                          {key}: {value || "N/A"}
                        </span>
                      );
                    })}
                  </td>

                  {inputIndex === 0 && (
                    <>
                      <td
                        rowSpan={paymentInputs.length || 1}
                        className="px-4 py-2"
                      >
                        {deposit?.amount || "N/A"}
                      </td>
                      <td
                        rowSpan={paymentInputs.length || 1}
                        className="px-4 py-2 text-center"
                      >
                        <IoCloudUploadOutline className="text-2xl cursor-pointer" />
                      </td>
                      <td
                        rowSpan={paymentInputs.length || 1}
                        className="px-4 py-2 text-center"
                      >
                        {deposit?.reason || "N/A"}
                      </td>
                      <td
                        rowSpan={paymentInputs.length || 1}
                        className="px-4 py-2 text-center"
                      >
                        {deposit?.addedBalance || "N/A"}
                      </td>
                      <td
                        rowSpan={paymentInputs.length || 1}
                        className="px-4 py-2"
                      >
                        {deposit?.createdAt
                          ? new Date(deposit.createdAt).toLocaleString(
                              "en-GB",
                              {
                                day: "2-digit",
                                month: "2-digit",
                                year: "2-digit",
                                hour: "2-digit",
                                minute: "2-digit",
                                hour12: true,
                              }
                            )
                          : "N/A"}
                      </td>
                      <td
                        rowSpan={paymentInputs.length || 1}
                        className="px-4 py-2 text-center"
                      >
                        {deposit?.status === "pending" ? (
                          <div className="flex flex-col gap-2">
                            <button
                              className="bg-green-500 text-white px-3 py-1 rounded-md hover:bg-green-600"
                              onClick={() =>
                                handleStatusClick(deposit, "completed")
                              }
                            >
                              Complete
                            </button>
                            <button
                              className="bg-red-500 text-white px-3 py-1 rounded-md hover:bg-red-600"
                              onClick={() =>
                                handleStatusClick(deposit, "rejected")
                              }
                            >
                              Reject
                            </button>
                          </div>
                        ) : (
                          <span
                            className={`rounded-full px-3 py-1 text-white capitalize ${
                              deposit?.status === "rejected"
                                ? "bg-red-500"
                                : "bg-green-500"
                            }`}
                          >
                            {deposit?.status}
                          </span>
                        )}
                      </td>
                    </>
                  )}
                </tr>
              ));
            })}
            {currentItems?.length === 0 && (
              <tr>
                <td colSpan="9" className="text-center py-4 text-gray-500">
                  No deposits found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Pagination Controls */}
      <div className="flex justify-center mt-4">
        <button
          onClick={() => paginate(currentPage - 1)}
          disabled={currentPage === 1}
          className="px-4 py-2 mx-1 bg-gray-300 rounded disabled:opacity-50"
        >
          Previous
        </button>
        {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
          <button
            key={page}
            onClick={() => paginate(page)}
            className={`px-4 py-2 mx-1 ${
              currentPage === page ? "bg-blue-500 text-white" : "bg-gray-300"
            } rounded`}
          >
            {page}
          </button>
        ))}
        <button
          onClick={() => paginate(currentPage + 1)}
          disabled={currentPage === totalPages}
          className="px-4 py-2 mx-1 bg-gray-300 rounded disabled:opacity-50"
        >
          Next
        </button>
      </div>

      <ReasonModal
        isOpen={modalOpen}
        onClose={handleCloseModal}
        onSubmit={handleSubmit}
        status={status}
        deposit={selectedDeposit}
      />
    </div>
  );
};

export default DepositHistory;
