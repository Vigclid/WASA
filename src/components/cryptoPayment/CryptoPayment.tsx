import * as React from "react";
import { useState } from "react";
import { ethers } from "ethers";

const CryptoPayment = () => {
  const [account, setAccount] = useState<string>("");
  const [status, setStatus] = useState<string>("");

  const receiverAddress = "TEKs7n5GsvSHAHTRCqrvcbtYSLA9FuaWax"; 

  const connectWallet = async () => {
    if ((window as any).ethereum) {
      try {
        const accounts = await (window as any).ethereum.request({
          method: "eth_requestAccounts",
        });
        setAccount(accounts[0]);
      } catch (error) {
        console.error("User denied wallet connection:", error);
      }
    } else {
      alert("Bạn cần cài đặt MetaMask!");
    }
  };

  const sendPayment = async () => {
    if (!(window as any).ethereum || !account) return;

    const provider = new ethers.BrowserProvider((window as any).ethereum);
    const signer = await provider.getSigner();

    try {
      const tx = await signer.sendTransaction({
        to: receiverAddress,
        value: ethers.parseEther("0.01"),
      });

      setStatus("Đang xử lý giao dịch...");

      await tx.wait(); 
      setStatus("Giao dịch thành công!");
    } catch (error) {
      console.error("Lỗi giao dịch:", error);
      setStatus("Giao dịch thất bại!");
    }
  };

  return (
    <div className="p-4 rounded-xl shadow-md bg-white w-[400px]">
      <h2 className="text-xl font-bold mb-4">Thanh toán bằng Crypto</h2>

      {account ? (
        <>
          <p className="mb-2">Ví: {account}</p>
          <button
            className="bg-blue-500 text-white px-4 py-2 rounded-xl"
            onClick={sendPayment}
          >
            Gửi 0.01 ETH
          </button>
        </>
      ) : (
        <button
          className="bg-green-500 text-white px-4 py-2 rounded-xl"
          onClick={connectWallet}
        >
          Kết nối ví MetaMask
        </button>
      )}

      {status && <p className="mt-4">{status}</p>}
    </div>
  );
};

export default CryptoPayment;
