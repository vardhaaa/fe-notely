import { useState } from "react";
import { CirclePlus } from "lucide-react";
import { useAuth } from "../hooks/use-auth";
import Show from "./show";
import Button from "./ui/Button";
import ModalContainer from "./ui/ModalContainer";
import CreateNoteFom from "./form/CreateNoteForm";

const Header = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { userEmail, logout } = useAuth();

  const handleOpenModal = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className='relative z-50'>
      <div className='flex gap-3 items-center'>
        <div className='p-3 bg-yellow-200 w-fit border-2 rounded-t-xl shadow-[3px_3px_0px_black] '>
          <h3 className='font-bold text-lg'>Notes</h3>
        </div>
        <CirclePlus
          size={40}
          className={`cursor-pointer transition-transform rotate-0 ${isOpen && "rotate-45"
            }`}
          onClick={handleOpenModal}
        />
        <div className="w-full flex justify-end mx-4 mb-2">
          <Show
            when={!!userEmail}
            fallback={
              <p>
                Please login to see your notes
              </p>
            }>
            <div className="flex items-center gap-4">
              <span className="font-bold text-lg">{userEmail}</span>
              <Button
                onClick={logout}
                className="bg-red-500 text-white"
              >
                Logout
              </Button>
            </div>
          </Show>
        </div>
      </div>
      <hr className='border-3 relative z-100' />

      <ModalContainer
        className="-mt-1 max-w-sm absolute"
        isOpen={isOpen}
        setOpen={setIsOpen}
      >
        <CreateNoteFom />
      </ModalContainer>
    </div>
  );
};

export default Header;
