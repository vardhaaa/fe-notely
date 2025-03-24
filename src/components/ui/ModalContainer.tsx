import { X } from "lucide-react";
import Show from "../show";

interface ModalContainerProps {
  isOpen: boolean;
  onClose: () => void;
  children: React.ReactNode;
  className?: string;
  isFullScreen?: boolean;
}

const ModalContainer = ({
  isOpen,
  onClose,
  children,
  className,
  isFullScreen = false,
}: ModalContainerProps) => {
  return (
    <Show when={isOpen}>
      <div
        className={`fixed inset-0 flex items-center justify-center z-50 ${
          isFullScreen ? "bg-black/50" : ""
        }`}
        onClick={(e) => {
          // Close modal when clicking outside
          if (e.target === e.currentTarget) {
            onClose();
          }
        }}
      >
        <div
          className={`p-4 bg-white border-2 rounded-b-xl border-black shadow-[4px_4px_0px_rgba(0,0,0,1)] min-w-sm relative ${className}`}
        >
          <button
            onClick={onClose}
            className="absolute top-2 right-2 text-gray-500 hover:text-gray-700"
          >
            <X size={24} className="cursor-pointer" />
          </button>
          {children}
        </div>
      </div>
    </Show>
  );
};

export default ModalContainer;