import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faClose } from '@fortawesome/free-solid-svg-icons';

const close = (
  <FontAwesomeIcon icon={faClose} size="2xl" style={{ color: '#292828' }} />
);

interface ModalProps {
  children: React.ReactNode;
  modalOpen: boolean;
  setModalOpen: (isOpen: boolean) => void;
}

const Modal = ({ children, modalOpen, setModalOpen }: ModalProps) => {
  return (
    <>
      {modalOpen && (
        <div className="bg-mainBlack fixed inset-0 overflow-scroll max-[300px]">
          <div className="flex justify-center items-center h-auto">
            <div className="flex flex-col  p-5">
              <div className="flex items-center justify-around rounded-lg bg-lightGreen  mb-4 ">
                <button className="" onClick={() => setModalOpen(false)}>
                  {close}
                </button>
                <h1 className="text-mainBlack font-bold  p-3">
                  Search for the food
                </h1>
              </div>
              {children}
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Modal;
