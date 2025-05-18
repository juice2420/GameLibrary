import { useState } from "react";

const ImageWithModal = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      {/* クリックでモーダル開く画像 */}
      <img
        src="example.png"
        alt="Example"
        className="w-48 h-auto cursor-pointer hover:brightness-75 transition"
        onClick={() => setIsOpen(true)}
        
      />

      {/* モーダル */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center z-50"
          onClick={() => setIsOpen(false)}
        >
          <img
            src="example.png"
            alt="Example Enlarged"
            className="max-w-full max-h-full rounded"
          />
        </div>
      )}
    </>
  );
};

export default ImageWithModal;
