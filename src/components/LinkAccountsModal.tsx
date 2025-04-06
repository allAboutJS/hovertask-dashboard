import { Modal, ModalBody, ModalContent, useDisclosure } from "@heroui/react";
import { useEffect } from "react";

export default function LinkAccountsModal() {
  const { isOpen, onOpen, onOpenChange, onClose } = useDisclosure();

  useEffect(() => {
    onOpen();
  }, []);

  return (
    <Modal isOpen={isOpen} onOpenChange={onOpenChange} onClose={onClose}>
      <ModalContent>
        {(onClose: () => any) => (
          <ModalBody className="space-y-1 pb-4">
            <img src="/images/iconoir_info-empty.png" alt="" className="block mx-auto" width={80} />
            <h4 className="font-semibold text-lg text-center">Oops</h4>
            <p className="text-sm text-zinc-700 text-center">Link your social media accounts before performing tasks</p>
            <button
              onClick={onClose}
              className="p-2 rounded-xl text-sm transition-all bg-primary text-white active:scale-95 block w-fit mx-auto"
            >
              Connect Now
            </button>
          </ModalBody>
        )}
      </ModalContent>
    </Modal>
  );
}
