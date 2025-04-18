import AddPromotionSection from "@/components/dashboard/promotionOffer/AddPromotionSection";
import PromotionCategoriesSection from "@/components/dashboard/promotionOffer/PromotionCategoriesSection";
import PromotionOfferCard from "@/components/dashboard/promotionOffer/PromotionOfferCard";
import DeleteModal from "@/components/shared/Modals/DeleteModal";
import { deleteImage } from "@/hooks/files";
import {
  useDeletePromotionMutation,
  useGetPromotionsQuery,
} from "@/redux/features/allApis/promotionApi/promotionApi";
import { useState } from "react";
import { useToasts } from "react-toast-notifications";

const PromotionOffer = () => {
  const { data: promotions, isLoading, refetch } = useGetPromotionsQuery();
  const [deletePromotion] = useDeletePromotionMutation();
  const [item, setItem] = useState("");
  const [isOpen, setIsOpen] = useState(false);
  const { addToast } = useToasts();

  const handleDeleteButtonClick = (item) => {
    setIsOpen(true);
    setItem(item);
  };

  const handleDelete = async () => {
    try {
      const { message } = await deleteImage(item?.image);
      if (message) {
        const result = await deletePromotion(item?._id);
        if (result.data) {
          addToast("Promotion deleted successfully", {
            appearance: "success",
            autoDismiss: true,
          });
        }
        refetch();
        setIsOpen(false);
      }
    } catch (error) {
      addToast("Failed to delete promotion", {
        appearance: "success",
        autoDismiss: true,
      });
    }
  };

  return (
    <>
      <div className="rounded-md">
        <div className="bg-[#222222] flex flex-col md:flex-row items-start md:items-center justify-between p-4 mb-2">
          <div className="flex flex-row items-start justify-between w-full mb-4 md:mb-0">
            <h1 className="text-2xl text-white font-bold">Promotion Offers</h1>
            {/* <button className="bg-yellow-500 hover:bg-yellow-600 transition-all ease-in-out duration-300 text-black py-2 px-4 rounded md:w-1/4 block md:hidden">
                    Add User
                  </button> */}
          </div>

          {/* <div className="flex w-1/2 gap-4">
                  <form className="md:w-3/4 hidden md:flex flex-row items-center">
                    <input
                      type="text"
                      placeholder="Type Username / Phone / Email..."
                      className="py-2 px-1 w-full outline-none"
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                    />
                    <button className="bg-white p-3">
                      <IoIosSearch />
                    </button>
                  </form>
                  <button className="bg-yellow-500 hover:bg-yellow-600 transition-all ease-in-out duration-300 text-black py-2 px-4 rounded md:w-1/4 hidden md:block">
                    Add User
                  </button>
                </div> */}

          {/* <form className="w-full flex flex-row items-center md:hidden">
                  <input
                    type="text"
                    placeholder="Type Username or Phone Number or Email..."
                    className="py-2 px-1 w-full outline-none"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                  />
                  <button className="bg-white p-3">
                    <IoIosSearch />
                  </button>
                </form> */}
        </div>

        <div className="flex flex-col md:flex-row lg:space-x-6">
          <AddPromotionSection />
          <PromotionCategoriesSection />
        </div>

        <div className="mt-6">
          <div className="bg-[#222222] w-full mb-4 md:mb-0 p-4">
            <h1 className="text-2xl text-white font-bold">All Offers</h1>
          </div>
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-2 my-4 mt-4">
            {isLoading ? (
              <p>Loading...</p>
            ) : (
              promotions?.map((promotion) => (
                <PromotionOfferCard
                  key={promotion.id}
                  offer={promotion}
                  hidden={true}
                  handleDeleteButtonClick={handleDeleteButtonClick}
                />
              ))
            )}
          </div>
        </div>
      </div>

      <DeleteModal
        isOpen={isOpen}
        closeModal={() => setIsOpen(false)}
        handleDelete={handleDelete}
      ></DeleteModal>
    </>
  );
};

export default PromotionOffer;
